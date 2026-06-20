const config = require('../config/config');

async function gradeEssay(req, res) {
  const { question, studentAnswer, sampleAnswer, subject, image } = req.body;
  if (!question || !sampleAnswer || (!studentAnswer && !image)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Only use server-side API key — never accept key from client request
  const activeKey = process.env.GEMINI_API_KEY;

  if (!activeKey) {
    const score = calculateOfflineScore(studentAnswer || '', sampleAnswer);
    const feedback = getOfflineFeedback(studentAnswer || '', sampleAnswer, score, subject);
    return res.json({ score, feedback, ocrText: image ? '[Lưu ý: Server chưa cấu hình GEMINI_API_KEY, không thể chấm điểm AI hay nhận diện ảnh]' : '', isOffline: true });
  }

  try {
    let imagePart = null;
    if (image && image.startsWith('data:')) {
      const match = image.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        imagePart = {
          inlineData: {
            mimeType: match[1],
            data: match[2]
          }
        };
      }
    }

    let prompt = `Bạn là Giáo viên chuyên môn giảng dạy THPT vô cùng nghiêm khắc, công tâm và áp dụng phương pháp sư phạm gợi mở.
Môn học/Chủ đề: ${subject || 'Chung'}
Câu hỏi: "${question}"
Đáp án mẫu: "${sampleAnswer}"
`;

    if (imagePart) {
      prompt += `Học sinh đã chụp ảnh bài làm viết tay của mình.
1. Hãy thực hiện nhận diện văn bản (OCR) chính xác từ ảnh chụp bài làm viết tay này, bao gồm cả các công thức toán/lý/hóa (dùng ký hiệu LaTeX) hoặc văn bản tiếng Việt. Trả về phần văn bản này trong khối [OCR_TEXT].
2. Hãy chấm điểm bài làm viết tay của học sinh dựa trên nội dung OCR được và đối chiếu với đáp án mẫu. Nếu học sinh có nhập thêm nội dung ở ô nhập liệu: "${studentAnswer || ''}", hãy kết hợp cả hai.
`;
    } else {
      prompt += `Bài làm của học sinh: "${studentAnswer || ''}"
Hãy chấm điểm bài làm của học sinh dựa trên nội dung này và đối chiếu với đáp án mẫu.
`;
    }

    prompt += `
YÊU CẦU QUAN TRỌNG:
1. Chấm điểm theo thang điểm 10 (chấp nhận số thập phân như 7.5, 8.0). Trừ điểm nặng nếu học sinh sai kiến thức cơ bản, thiếu logic hoặc diễn đạt rườm rà.
2. Viết nhận xét chi tiết bằng tiếng Việt. Chỉ rõ lỗi sai kiến thức, giải thích rõ các công thức và biến số.
3. Ở cuối phần nhận xét, BẮT BUỘC phải đặt ra 1-2 CÂU HỎI GỢI MỞ (Socratic questioning) để kích thích học sinh tự tư duy sâu hơn về bản chất vấn đề hoặc tự nhận ra lỗi sai của mình.
4. Định dạng câu trả lời bắt buộc phải tuân theo cấu trúc thẻ sau đây (giữ nguyên các nhãn thẻ viết hoa):
[SCORE] số_điểm_ở_đây
${imagePart ? '[OCR_TEXT] văn_bản_được_trích_xuất_từ_ảnh_ở_đây\n' : ''}[FEEDBACK] nhận_xét_chi_tiết_và_câu_hỏi_gợi_mở_ở_đây`;

    const parts = [{ text: prompt }];
    if (imagePart) {
      parts.push(imagePart);
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${activeKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: parts }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 4096
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
    let score = scoreMatch ? parseFloat(scoreMatch[1]) : 7.0;
    if (isNaN(score)) score = 7.0;
    score = Math.max(0, Math.min(10, score)); // Clamp between 0 and 10

    let ocrText = '';
    if (reply.includes('[OCR_TEXT]')) {
      const ocrStart = reply.indexOf('[OCR_TEXT]') + '[OCR_TEXT]'.length;
      const ocrEnd = reply.includes('[FEEDBACK]') ? reply.indexOf('[FEEDBACK]') : reply.length;
      ocrText = reply.substring(ocrStart, ocrEnd).trim();
    }

    let feedback = '';
    if (reply.includes('[FEEDBACK]')) {
      feedback = reply.substring(reply.indexOf('[FEEDBACK]') + '[FEEDBACK]'.length).trim();
    } else {
      feedback = reply.replace(/\[SCORE\]\s*[0-9.]+/i, '').replace(/\[OCR_TEXT\][\s\S]*?(?=\[FEEDBACK\]|$)/i, '').trim();
    }

    return res.json({
      score,
      feedback: feedback || 'Không có nhận xét chi tiết.',
      ocrText: ocrText,
      isOffline: false
    });

  } catch (e) {
    console.error('Essay grading error', e);
    const score = calculateOfflineScore(studentAnswer || '', sampleAnswer);
    const feedback = `[Hệ thống chấm điểm dự phòng do lỗi kết nối AI]: ${e.message}\n\nNhận xét: ${getOfflineFeedback(studentAnswer || '', sampleAnswer, score, subject)}`;
    res.json({ score, feedback, ocrText: '', isOffline: true });
  }
}

async function chatProxy(req, res) {
  const { subject, message, history = [], performanceSummary = '' } = req.body;
  if (!message) return res.status(400).json({ error: 'message required' });

  // Only use server-side API key — never accept key from client request
  const activeKey = process.env.GEMINI_API_KEY;

  if (!activeKey) {
    return res.json({ reply: 'Server chưa cấu hình GEMINI_API_KEY. Vui lòng liên hệ quản trị viên để kích hoạt tính năng AI.' });
  }

  try {
    const systemInstruction = buildSystemInstruction(subject, performanceSummary);

    // Map history to Gemini's expected format (role: 'user' | 'model', parts: [{text: ...}])
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.text || msg.content || '' }]
    }));

    // Add the current user message
    formattedHistory.push({ role: 'user', parts: [{ text: message }] });

    const requestBody = {
      contents: formattedHistory,
      generationConfig: { temperature: 0.7, maxOutputTokens: 4096 }
    };

    if (systemInstruction) {
      requestBody.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${activeKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
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

function buildSystemInstruction(subject, performanceSummary) {
  if (!subject) return '';

  const parts = subject.split('_');
  const baseSubject = parts[0];
  const grade = parts[1] || '10';

  const formulaGuidelines = `
[QUY TẮC BẮT BUỘC KHI GIẢNG DẠY CÔNG THỨC & KIẾN THỨC]:
1. Khi áp dụng bất kỳ công thức toán, lý, hóa hay sinh học nào, phải giải thích rõ ràng TẠI SAO lại dùng công thức đó.
2. Nếu công thức thiếu tiền tố đơn vị hoặc hằng số, chỉ rõ cách tìm và tính lại.
3. Luôn kèm theo một ví dụ cụ thể, tính toán từng bước rõ ràng.`;

  let instruction = '';
  switch (baseSubject) {
    case 'english':
      instruction = `You are Mr. Wyatt, a professional TOEIC/IELTS vocabulary tutor for Grade ${grade}. Be highly motivating, explain English words clearly in Vietnamese and English, provide sample sentences, and help students practice.`;
      break;
    case 'chemistry':
      instruction = `Bạn là Cô Hoa, giáo viên dạy Hoá học THPT chuyên nghiệp và thân thiện cho học sinh Lớp ${grade}. Hãy giải thích các hiện tượng hoá học, phương trình phản ứng và định luật hoá học một cách trực quan bằng tiếng Việt.\n${formulaGuidelines}`;
      break;
    case 'physics':
      instruction = `Bạn là Thầy Hải, giáo viên Vật lý THPT nhiệt huyết cho học sinh Lớp ${grade}. Hãy giải thích các định luật vật lý và giải bài tập bằng tiếng Việt thật dễ hiểu. Chia bài giải thành: Phân tích, Thiết lập công thức, Tính toán.\n${formulaGuidelines}`;
      break;
    case 'math':
      instruction = `Bạn là Thầy Nam, giáo viên Toán THPT mẫu mực cho học sinh Lớp ${grade}. Hãy hướng dẫn học sinh tư duy toán học, định nghĩa rõ ràng, giải thích các bước biến đổi chi tiết bằng tiếng Việt.\n${formulaGuidelines}`;
      break;
    case 'biology':
      instruction = `Bạn là Cô Linh, giáo viên dạy Sinh học THPT ân cần cho học sinh Lớp ${grade}. Hãy giải thích các khái niệm Sinh học về di truyền, tế bào, tiến hóa, sinh thái bằng tiếng Việt trực quan, dễ nhớ.\n${formulaGuidelines}`;
      break;
    case 'history':
      instruction = `Bạn là Thầy Bình, giáo viên Lịch sử THPT giàu lòng yêu nước cho học sinh Lớp ${grade}. Hãy kể về các sự kiện lịch sử, phân tích nguyên nhân, diễn biến và ý nghĩa bằng tiếng Việt sống động.`;
      break;
    case 'literature':
      instruction = `Bạn là Cô Mai, giáo viên Ngữ văn THPT lãng mạn và sâu sắc cho học sinh Lớp ${grade}. Hãy hướng dẫn học sinh phân tích tác phẩm văn học, làm văn nghị luận bằng tiếng Việt truyền cảm.`;
      break;
    case 'global':
    default:
      instruction = `Bạn là Ban Cố vấn Học tập THPT cấp cao cho học sinh Lớp ${grade}. Nhiệm vụ của bạn là giải đáp các thắc mắc chung về học tập, tư vấn phương pháp ôn thi hiệu quả bằng tiếng Việt lịch sự, thân thiện, truyền cảm hứng.`;
  }

  if (performanceSummary) {
    instruction += '\n' + performanceSummary;
  }

  return instruction;
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
