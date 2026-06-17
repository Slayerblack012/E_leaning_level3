import { pdfContext } from './pdfContext';

// Clean query string to match keyword
function cleanText(text) {
  return text.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "")
    .trim();
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
        return `[Gia sư Ngoại tuyến - Trả lời nhanh]:\n\n${qa.a}`;
      }
    }
  }

  // 2. Search Formulas (Math, Physics, Chemistry)
  if (context.formulas) {
    for (const f of context.formulas) {
      if (cleanQuery.includes(cleanText(f.name)) || (cleanQuery.includes("cong thuc") && cleanQuery.includes(cleanText(f.name).split(" ")[0]))) {
        return `[Gia sư Ngoại tuyến - Công thức ${f.name}]:\n\nKiến thức: **${f.formula}**\n*Ghi chú: ${f.note}*`;
      }
    }
  }

  // 3. Search Vocabulary (English)
  if (context.vocabularySample) {
    for (const v of context.vocabularySample) {
      if (cleanQuery.includes(cleanText(v.word))) {
        return `[Gia sư Ngoại tuyến - Từ vựng ${v.word}]:\n\n**${v.word}**: ${v.definition}\n*Ví dụ: ${v.example}* (Môn: ${v.subject})`;
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

// Call live Gemini API with dynamic system instructions per subject
export async function askGeminiAgent(subject, query, apiKey, chatHistory = []) {
  if (!apiKey || apiKey.trim() === "") {
    return getOfflineResponse(subject, query);
  }

  // Extract baseSubject and grade
  const parts = subject.split('_');
  const baseSubject = parts[0];
  const grade = parts[1] || '10';

  const context = pdfContext[subject];

  // Craft a subject-specific system instruction based on the PDF context
  let systemInstruction = "";
  if (baseSubject === "english") {
    const contextInfo = context ? `dựa trên tài liệu "${context.title}"` : "";
    systemInstruction = `You are Mr. Wyatt, a professional TOEIC/IELTS vocabulary tutor for Grade ${grade} ${contextInfo}. 
You should be highly motivating, explain English words clearly in Vietnamese and English, provide sample sentences, and help students practice.
Be encouraging and explain terms using real business and academic contexts. Detail both basic and advanced usage of vocabulary.`;
  } else if (baseSubject === "chemistry") {
    const contextInfo = context ? `dựa trên cuốn "${context.title}"` : "";
    systemInstruction = `Bạn là Cô Hoa, giáo viên dạy Hoá học THPT chuyên nghiệp và thân thiện cho học sinh Lớp ${grade} ${contextInfo}.
Hãy giải thích các hiện tượng hoá học, phương trình phản ứng và định luật hoá học một cách trực quan, dễ hiểu bằng tiếng Việt, từ cấp độ cơ bản đến các bài toán vận dụng nâng cao.
Với các bài toán hoá học, hãy hướng dẫn từng bước giải chi tiết sử dụng các định luật bảo toàn (khối lượng, electron...).`;
  } else if (baseSubject === "physics") {
    const contextInfo = context ? `dựa trên tài liệu "${context.title}"` : "";
    systemInstruction = `Bạn là Thầy Hải, giáo viên Vật lý THPT nhiệt huyết và giàu kinh nghiệm cho học sinh Lớp ${grade} ${contextInfo}.
Hãy giải thích các định luật vật lý, phân tích các hiện tượng tự nhiên và giải các bài tập vật lý bằng tiếng Việt thật dễ hiểu.
Chia bài giải thành: Phân tích hiện tượng, Thiết lập công thức và Tính toán kết quả. Dẫn dắt học sinh từ cơ bản đến nâng cao.`;
  } else if (baseSubject === "math") {
    const contextInfo = context ? `dựa trên giáo án "${context.title}"` : "";
    systemInstruction = `Bạn là Thầy Nam, giáo viên Toán THPT mẫu mực và vui tính cho học sinh Lớp ${grade} ${contextInfo}.
Hãy hướng dẫn học sinh tư duy toán học, định nghĩa rõ ràng các mệnh đề, đại số, giải tích, hình học từ cơ bản đến các bài toán vận dụng cao bằng tiếng Việt.
Hãy giải thích các bước biến đổi chi tiết, trình bày rõ ràng bằng công thức toán học và đưa ra lời khuyên nhớ nhanh công thức.`;
  } else if (baseSubject === "global") {
    systemInstruction = `Bạn là Ban Cố vấn Học tập THPT cấp cao cho học sinh Lớp ${grade}. 
Nhiệm vụ của bạn là giải đáp các thắc mắc chung về học tập, tư vấn phương pháp ôn thi hiệu quả, lập kế hoạch học tập cá nhân hóa, kết hợp kiến thức liên môn (Toán, Lý, Hóa, Tiếng Anh). 
Hãy trả lời bằng tiếng Việt lịch sự, thân thiện, truyền cảm hứng và thúc đẩy tinh thần học tập của học sinh.`;
  } else {
    systemInstruction = `Bạn là Trợ lý Học tập THPT Lớp ${grade}. Hãy trả lời các câu hỏi về học tập của học sinh bằng tiếng Việt dễ hiểu, chi tiết và chính xác.`;
  }

  // Format messages for Gemini API chat history
  const formattedContents = [];
  
  // Add history (keep last 6 exchanges to avoid token overflow)
  chatHistory.slice(-6).forEach(msg => {
    formattedContents.push({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    });
  });

  // Add current query if not already in history
  const lastHistoryMsg = chatHistory[chatHistory.length - 1];
  if (!lastHistoryMsg || lastHistoryMsg.text !== query) {
    formattedContents.push({
      role: "user",
      parts: [{ text: query }]
    });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: formattedContents,
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = errorData.error?.message || `HTTP ${response.status}`;
      return `Lỗi kết nối Gemini API: ${errorMsg}. Vui lòng kiểm tra lại API Key trong phần cấu hình hoặc kết nối mạng của bạn.`;
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (replyText) {
      return replyText;
    } else {
      return "Gia sư AI không phản hồi nội dung. Bạn hãy thử đặt lại câu hỏi rõ ràng hơn nhé.";
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Lỗi mạng khi kết nối với Agent: ${error.message}. Bạn có thể tạm thời tắt/xóa API Key để sử dụng chế độ Ngoại tuyến.`;
  }
}
