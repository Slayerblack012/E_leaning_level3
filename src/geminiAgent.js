import { pdfContext } from './pdfContext';
import api from './api';

// Clean query string to match keyword
function cleanText(text) {
  return text.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "")
    .trim();
}

// Get student performance overview from localStorage for AI personalization
function getStudentPerformanceSummary() {
  let summary = "";
  try {
    const subjects = {
      math: "Toán học",
      physics: "Vật lý",
      chemistry: "Hóa học",
      english: "Tiếng Anh"
    };
    const performance = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('stats_')) {
        const parts = key.split('_'); // stats_math_10_easy
        const subj = parts[1];
        const data = JSON.parse(localStorage.getItem(key) || '{"answered": 0, "correct": 0}');
        if (data.answered > 0) {
          if (!performance[subj]) performance[subj] = { answered: 0, correct: 0 };
          performance[subj].answered += data.answered;
          performance[subj].correct += data.correct;
        }
      }
    }

    const items = [];
    for (const [subj, data] of Object.entries(performance)) {
      const rate = Math.round((data.correct / data.answered) * 100);
      const label = subjects[subj] || subj;
      items.push(`- Môn ${label}: làm ${data.answered} câu, đúng ${data.correct} câu (${rate}% chính xác)`);
    }
    if (items.length > 0) {
      summary = "\n[THÔNG TIN THÀNH TÍCH CỦA HỌC SINH HIỆN TẠI TRÊN HỆ THỐNG]:\n" + items.join('\n') + "\n(Hãy tận dụng thông tin này để đưa ra phản hồi cá nhân hóa hơn. Nếu thấy điểm yếu ở một môn nào đó (< 50%), hãy ân cần khuyên học sinh tập trung cải thiện. Nếu thấy điểm mạnh (> 80%), hãy tán dương tinh thần học tập xuất sắc của các em!)";
    }
  } catch (e) {
    console.warn('Error reading performance stats for AI summary:', e);
  }
  return summary;
}

// Simulated offline tutor responses
export function getOfflineResponse(subject, query) {
  const parts = subject.split('_');
  const baseSubject = parts[0];
  const grade = parts[1] || '10';

  const cleanQuery = cleanText(query);
  const context = pdfContext[subject];

  if (baseSubject === 'global') {
    return `[Ban Cố vấn Học tập THPT - Chế độ Ngoại tuyến]:\n\nChào em! Cố vấn Học tập sẵn sàng giúp em lập kế hoạch ôn tập liên môn lớp ${grade}.\n\n**Lời khuyên học tập cốt lõi lớp ${grade}:**\n- **Toán học:** Ôn kỹ định lý và mệnh đề trước khi đi vào giải bài toán vận dụng cao.\n- **Vật lý:** Học cách vẽ sơ đồ lực và phân tích hiện tượng trước khi áp dụng công thức.\n- **Hóa học:** Luyện kỹ năng viết phương trình ion thu gọn và cân bằng electron.\n- **Tiếng Anh:** Tăng cường đọc báo học thuật (như BBC, CNN) để mở rộng vốn từ TOEIC/IELTS.`;
  }

  if (!context) {
    return "Chào em, Thầy/Cô rất vui được hỗ trợ em. Hiện tại hệ thống đang ở chế độ ngoại tuyến, em vui lòng chọn đúng môn học nhé!";
  }

  // 1. Search mock QAs if any
  if (context.mockQAs) {
    for (const qa of context.mockQAs) {
      if (cleanQuery.includes(cleanText(qa.q)) || cleanText(qa.q).includes(cleanQuery)) {
        return `[Trợ lý Ngoại tuyến - Trả lời nhanh]:\n\n${qa.a}`;
      }
    }
  }

  // 2. Search Formulas (Math, Physics, Chemistry)
  if (context.formulas) {
    for (const f of context.formulas) {
      if (cleanQuery.includes(cleanText(f.name)) || (cleanQuery.includes("cong thuc") && cleanQuery.includes(cleanText(f.name).split(" ")[0]))) {
        return `[Trợ lý Ngoại tuyến - Công thức ${f.name}]:\n\nKiến thức: **${f.formula}**\n*Ghi chú: ${f.note}*`;
      }
    }
  }

  // 3. Search Vocabulary (English)
  if (context.vocabularySample) {
    for (const v of context.vocabularySample) {
      if (cleanQuery.includes(cleanText(v.word))) {
        return `[Trợ lý Ngoại tuyến - Từ vựng ${v.word}]:\n\n**${v.word}**: ${v.definition}\n*Ví dụ: ${v.example}* (Môn: ${v.subject})`;
      }
    }
  }

  // 4. Default subject response with outlines
  let response = `Chào em! Thầy/Cô đang ở chế độ Ngoại tuyến. Dưới đây là một số thông tin từ tài liệu **"${context.title}"** lớp ${grade} mà em có thể tham khảo:\n\n`;

  response += `**Giới thiệu môn học:** ${context.description}\n\n`;
  response += `**Các chương học chính:**\n`;
  context.chapters.forEach(ch => {
    response += `- **${ch.title}** (Trang: ${ch.pages}): ${ch.content || ch.topics?.join(", ") || 'Lý thuyết & Bài tập'}\n`;
  });

  return response;
}

/**
 * Call AI via the backend server proxy (keeps API key server-side).
 * Falls back to offline response if server returns an error.
 */
export async function askGeminiAgent(subject, query, _apiKeyIgnored, chatHistory = []) {
  // Keep last 6 exchanges to avoid token overflow
  const trimmedHistory = chatHistory.slice(-12);

  try {
    const res = await api.post('/api/chat', {
      subject,
      message: query,
      history: trimmedHistory,
      performanceSummary: getStudentPerformanceSummary()
    });
    return res.data?.reply || 'Trợ lý học tập không phản hồi nội dung. Bạn hãy thử đặt lại câu hỏi rõ ràng hơn nhé.';
  } catch (error) {
    if (error.response?.data?.reply) {
      return error.response.data.reply;
    }
    console.warn('AI chat proxy error, falling back to offline:', error.message);
    return getOfflineResponse(subject, query);
  }
}
