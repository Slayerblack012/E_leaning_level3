const config = require('../config/config');

async function gradeEssay(req, res) {
  const { question, studentAnswer, sampleAnswer, subject, apiKey } = req.body;
  if (!question || !studentAnswer || !sampleAnswer) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const activeKey = apiKey || process.env.GEMINI_API_KEY;

  if (!activeKey) {
    const score = calculateOfflineScore(studentAnswer, sampleAnswer);
    const feedback = getOfflineFeedback(studentAnswer, sampleAnswer, score, subject);
    return res.json({ score, feedback, isOffline: true });
  }

  try {
    const prompt = `Bạn là Giáo viên giảng dạy THPT. Hãy chấm điểm bài làm tự luận của học sinh sau đây:
Môn học/Chủ đề: ${subject || 'Chung'}
Câu hỏi: "${question}"
Đáp án mẫu: "${sampleAnswer}"
Bài làm của học sinh: "${studentAnswer}"

YÊU CẦU QUAN TRỌNG:
1. Chấm điểm theo thang điểm 10 (từ 0 đến 10, chấp nhận số thập phân ví dụ 7.5, 8.0, 9.5).
2. Viết nhận xét chi tiết bằng tiếng Việt thân thiện, động viên học sinh. Chỉ ra những chỗ làm đúng, những chỗ làm sai, giải thích rõ các công thức và biến số trong bài (đặc biệt đối với các môn tính toán Toán, Lý, Hóa khi thiếu biến hay biến đổi công thức).
3. Định dạng câu trả lời bắt buộc phải tuân theo cấu trúc thẻ sau đây:
[SCORE] số_điểm_ở_đây
[FEEDBACK] nhận_xét_chi_tiết_ở_đây`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${activeKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1024
        }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(502).json({ error: 'Gemini API error during grading', details: err });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!reply) {
      throw new Error('Empty response from Gemini');
    }

    // Parse using regex/tags
    const scoreMatch = reply.match(/\[SCORE\]\s*([0-9.]+)/i);
    const score = scoreMatch ? parseFloat(scoreMatch[1]) : 7.0;
    
    let feedback = '';
    if (reply.includes('[FEEDBACK]')) {
      feedback = reply.substring(reply.indexOf('[FEEDBACK]') + '[FEEDBACK]'.length).trim();
    } else {
      feedback = reply.replace(/\[SCORE\]\s*[0-9.]+/i, '').trim();
    }

    return res.json({
      score: isNaN(score) ? 7.0 : score,
      feedback: feedback || 'Không có nhận xét chi tiết.',
      isOffline: false
    });

  } catch (e) {
    console.error('Essay grading error', e);
    const score = calculateOfflineScore(studentAnswer, sampleAnswer);
    const feedback = `[Hệ thống chấm điểm dự phòng do lỗi kết nối AI]: ${e.message}\n\nNhận xét: ${getOfflineFeedback(studentAnswer, sampleAnswer, score, subject)}`;
    res.json({ score, feedback, isOffline: true });
  }
}

async function chatProxy(req, res) {
  const { subject, message } = req.body;
  if (!message) return res.status(400).json({ error: 'message required' });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.json({ reply: 'Server is in offline mode. Set GEMINI_API_KEY on the server to enable AI responses.' });
  }

  try {
    const formatted = [{ role: 'user', parts: [{ text: message }] }];
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: formatted, generationConfig: { temperature: 0.7, maxOutputTokens: 1024 } })
    });
    if (!response.ok) {
      const err = await response.text();
      return res.status(502).json({ error: 'Gemini API error', details: err });
    }
    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No reply from agent';
    res.json({ reply });
  } catch (e) {
    console.error('Chat proxy error', e);
    res.status(500).json({ error: 'Chat proxy failed', details: e.message });
  }
}

function calculateOfflineScore(studentAnswer, sampleAnswer) {
  if (!studentAnswer || studentAnswer.trim().length < 5) return 0;
  
  const studentClean = studentAnswer.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const sampleClean = sampleAnswer.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const words = sampleClean.split(/\s+/).filter(w => w.length > 2);
  let matched = 0;
  for (const word of words) {
    if (studentClean.includes(word)) {
      matched++;
    }
  }

  const ratio = words.length > 0 ? matched / words.length : 0;
  let score = 3 + ratio * 7;
  if (studentAnswer.length > sampleAnswer.length * 1.5) {
    score = Math.min(10, score + 1);
  }
  if (studentClean.length < 15) {
    score = Math.min(score, 5);
  }
  return Math.round(score * 10) / 10;
}

function getOfflineFeedback(studentAnswer, sampleAnswer, score, subject) {
  if (score === 0) return 'Em chưa viết câu trả lời hoặc câu trả lời quá ngắn. Hãy suy nghĩ và giải chi tiết từng bước nhé!';
  
  let feedback = `[Kết quả Chấm điểm Ngoại tuyến - Điểm số: ${score}/10]\n\n`;
  if (score >= 8) {
    feedback += 'Bài làm rất tốt! Em đã nắm vững kiến thức trọng tâm và trình bày đầy đủ các bước giải quyết vấn đề.';
  } else if (score >= 5) {
    feedback += 'Bài làm khá ổn. Tuy nhiên, em cần bổ sung thêm các bước lập luận, chú thích rõ các ký hiệu/biến số và trình bày rõ ràng hơn.';
  } else {
    feedback += 'Bài làm chưa đạt yêu cầu. Em hãy xem kỹ đáp án mẫu để ôn lại cách biến đổi và áp dụng các công thức liên quan.';
  }

  if (subject && (subject.includes('math') || subject.includes('physics') || subject.includes('chemistry'))) {
    feedback += `\n\n*Lưu ý từ Gia sư môn tính toán:* Khi giải tự luận các môn tính toán, nếu bài toán thiếu biến (ví dụ thiếu gia tốc, thiếu nồng độ ban đầu), em cần tìm các đại lượng trung gian bằng cách biến đổi và liên kết các công thức phụ trước khi áp dụng công thức chính.`;
  }
  
  return feedback;
}

module.exports = {
  gradeEssay,
  chatProxy
};
