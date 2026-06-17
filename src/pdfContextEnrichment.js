import { pdfContext } from './pdfContext';

const enrichmentTemplates = {
  english: {
    10: {
      title: 'Tổng ôn tiếng Anh 10: Từ vựng, ngữ pháp và giao tiếp',
      basic: `### Tổng quan cơ bản
*   Ôn cách đoán nghĩa từ theo ngữ cảnh, nhận biết từ loại và cấu trúc câu.
*   Nắm chắc các cụm từ thông dụng trong giao tiếp học đường, công việc và công nghệ.
*   Ghi nhớ từ vựng theo chủ đề, ví dụ và các cặp từ dễ nhầm.
*   Mẹo học nhanh: học theo cụm từ thay vì học từng từ rời rạc.`,
      advanced: `### Nâng cao
*   Phân biệt sắc thái nghĩa giữa các từ gần giống nhau để dùng đúng ngữ cảnh học thuật.
*   Luyện viết câu kết hợp liên từ, mệnh đề quan hệ và cụm động từ để câu tự nhiên hơn.
*   Tập tóm tắt đoạn văn ngắn bằng tiếng Anh để rèn kỹ năng đọc hiểu và diễn đạt.
*   Khi làm bài, ưu tiên đọc câu hỏi trước để xác định từ khóa cần tìm.`,
      examples: `### Ví dụ luyện nhanh
*   Viết lại câu: "We should make the process simpler" -> "We should streamline the process."
*   Nếu gặp từ lạ, hãy nhìn tiền tố/hậu tố và phần còn lại của từ để đoán nghĩa trước khi tra từ điển.`
    },
    11: {
      title: 'Tổng ôn tiếng Anh 11: Academic vocabulary và reading skills',
      basic: `### Tổng quan cơ bản
*   Ôn nhóm từ học thuật về môi trường, xã hội, giáo dục và sức khỏe.
*   Rèn kỹ năng nhận diện chủ đề đoạn văn và câu chủ đề (topic sentence).
*   Nắm collocation cơ bản để viết câu chính xác và tự nhiên hơn.`,
      advanced: `### Nâng cao
*   Luyện paraphrase: thay thế từ gốc bằng từ đồng nghĩa đúng sắc thái.
*   Học cách phân tích câu hỏi reading: ý chính, suy luận, từ thay thế, thông tin chi tiết.
*   Viết đoạn 80-120 từ có mở đoạn, thân đoạn và kết luận ngắn gọn.`,
      examples: `### Ví dụ luyện nhanh
*   Deforestation -> phá rừng, biodiversity loss -> suy giảm đa dạng sinh học.
*   Khi làm reading, hãy gạch chân các từ chỉ thời gian, nguyên nhân, kết quả và sự so sánh.`
    },
    12: {
      title: 'Tổng ôn tiếng Anh 12: Học thuật, SAT/IELTS và kỹ năng viết',
      basic: `### Tổng quan cơ bản
*   Ôn từ vựng học thuật về môi trường, kinh tế, công nghệ, sức khỏe và xã hội.
*   Nhớ các cụm diễn đạt thường dùng trong bài viết nghị luận và báo cáo.
*   Luyện nhận biết từ loại để tránh lỗi ngữ pháp cơ bản.`,
      advanced: `### Nâng cao
*   Rèn viết đoạn và bài ngắn theo bố cục rõ ràng: ý chính, giải thích, ví dụ.
*   Luyện chọn từ có sắc thái học thuật phù hợp với bối cảnh trang trọng.
*   Khi đọc hiểu, ưu tiên kiểm tra quan hệ nguyên nhân - kết quả, đối lập và nhượng bộ.`,
      examples: `### Ví dụ luyện nhanh
*   carbon footprint -> lượng phát thải carbon do hoạt động con người.
*   sustainability -> tính bền vững, hướng tới phát triển lâu dài.`
    }
  },
  math: {
    10: {
      title: 'Tổng ôn Toán 10: Mệnh đề, hàm số, phương trình và tổ hợp',
      basic: `### Tổng quan cơ bản
*   Phân biệt mệnh đề, phủ định, kéo theo và tương đương.
*   Nắm chắc hàm số bậc nhất, bậc hai và cách đọc đồ thị.
*   Ôn công thức tổ hợp, chỉnh hợp, hoán vị và các phép đếm cơ bản.`,
      advanced: `### Nâng cao
*   Giải bài toán nhiều bước bằng cách tách trường hợp rồi dùng quy tắc cộng/nhân.
*   Khi gặp phương trình hoặc bất phương trình, ưu tiên quy về dạng chuẩn và xét điều kiện.
*   Với bài hình, luôn xác định dữ kiện đã biết, dữ kiện thiếu và đại lượng cần tìm trước khi biến đổi.`,
      examples: `### Ví dụ luyện nhanh
*   Nếu đề có "không phân biệt thứ tự" thì thường là tổ hợp.
*   Nếu đề yêu cầu lập số, xếp chỗ, phân vai thì thường là chỉnh hợp.`
    },
    11: {
      title: 'Tổng ôn Toán 11: Lượng giác, dãy số, giới hạn và đạo hàm',
      basic: `### Tổng quan cơ bản
*   Ôn các giá trị lượng giác đặc biệt và công thức biến đổi cơ bản.
*   Nắm cấp số cộng, cấp số nhân và công thức số hạng tổng quát.
*   Nhớ quy tắc đạo hàm của hàm sơ cấp và cách tính giới hạn đơn giản.`,
      advanced: `### Nâng cao
*   Quy đổi phương trình lượng giác về ẩn phụ khi cần.
*   Với giới hạn vô cực, chia cả tử và mẫu cho lũy thừa cao nhất của biến.
*   Khi xét cực trị và đơn điệu, luôn lập bảng biến thiên để tránh bỏ sót trường hợp.`,
      examples: `### Ví dụ luyện nhanh
*   sin x = 0 -> x = k\pi.
*   u_n = u_1 + (n-1)d, v_n = u_1 q^{n-1}.`
    },
    12: {
      title: 'Tổng ôn Toán 12: Hàm số, tích phân và Oxyz',
      basic: `### Tổng quan cơ bản
*   Ôn khảo sát hàm số, tiệm cận, cực trị và GTLN - GTNN.
*   Nắm nguyên hàm, tích phân và ý nghĩa diện tích cơ bản.
*   Nhớ công thức vector, đường thẳng, mặt phẳng trong Oxyz.`,
      advanced: `### Nâng cao
*   Với bài tích phân từng phần, chọn u theo mức ưu tiên: lô - đa - lượng - mũ.
*   Bài Oxyz thường cần viết phương trình mặt phẳng/đường thẳng rồi tính khoảng cách hoặc góc.
*   Khi tối ưu, hãy xét đạo hàm trên từng khoảng và tại điểm biên của đoạn.`,
      examples: `### Ví dụ luyện nhanh
*   \int x\ln x\,dx -> dùng tích phân từng phần.
*   Mặt phẳng Ax + By + Cz + D = 0 có vector pháp tuyến (A; B; C).`
    }
  },
  physics: {
    10: {
      title: 'Tổng ôn Vật lý 10: Động học, lực và cân bằng',
      basic: `### Tổng quan cơ bản
*   Ôn chuyển động thẳng đều, biến đổi đều, rơi tự do và gia tốc.
*   Nhớ các định luật Newton và ý nghĩa của lực ma sát, lực đàn hồi, trọng lực.
*   Vẽ sơ đồ lực trước khi giải các bài động lực học.`,
      advanced: `### Nâng cao
*   Dùng hệ thức độc lập thời gian khi đề thiếu t.
*   Phân tích chiều dương, dấu của gia tốc và trạng thái nhanh dần/chậm dần.
*   Với bài lò xo, liên hệ độ biến dạng và lực đàn hồi bằng định luật Hooke.`,
      examples: `### Ví dụ luyện nhanh
*   v^2 - v_0^2 = 2as thường dùng khi không biết thời gian.
*   F = ma giúp nối lực với gia tốc và khối lượng.`
    },
    11: {
      title: 'Tổng ôn Vật lý 11: Điện trường, dao động và mạch cơ bản',
      basic: `### Tổng quan cơ bản
*   Ôn lực Coulomb, điện trường, điện thế, tụ điện và dòng điện không đổi.
*   Nắm dao động điều hòa, con lắc đơn, con lắc lò xo và các đại lượng đặc trưng.
*   Hiểu điện tích, cường độ điện trường, biên độ, chu kỳ, tần số và pha ban đầu.`,
      advanced: `### Nâng cao
*   Khi thiếu thời gian, dùng công thức năng lượng hoặc hệ thức độc lập giữa x - v.
*   Với tụ điện, chú ý công thức q = CU và W = 1/2 CU^2.
*   Trong bài điện trường, luôn xác định chiều lực điện theo dấu của điện tích.`,
      examples: `### Ví dụ luyện nhanh
*   x = A cos(\omega t + \varphi) -> A là biên độ.
*   F = k|q_1q_2|/r^2 là định luật Coulomb.`
    },
    12: {
      title: 'Tổng ôn Vật lý 12: Dao động, sóng và mạch RLC',
      basic: `### Tổng quan cơ bản
*   Ôn cảm kháng, dung kháng, tổng trở và độ lệch pha trong mạch RLC.
*   Nhớ công thức cộng hưởng điện và điều kiện Z_L = Z_C.
*   Hệ thống lại các dạng bài dao động cơ và sóng điện từ nếu cần.`,
      advanced: `### Nâng cao
*   Bài mạch xoay chiều thường kết hợp U, I, Z và cos\varphi.
*   Khi thiếu Z_L hoặc Z_C, hãy suy luận từ tần số góc và đặc tính mạch.
*   Với bài con lắc và dao động điều hòa, ưu tiên hệ thức độc lập thời gian để rút gọn bước giải.`,
      examples: `### Ví dụ luyện nhanh
*   Z_L = \omega L, Z_C = 1/(\omega C).
*   P = UI\cos\varphi là công thức công suất hiệu dụng.`
    }
  },
  chemistry: {
    10: {
      title: 'Tổng ôn Hóa 10: Nguyên tử, bảng tuần hoàn và phản ứng',
      basic: `### Tổng quan cơ bản
*   Ôn cấu tạo nguyên tử, số hiệu nguyên tử, số khối và đồng vị.
*   Nhớ quy luật bảng tuần hoàn, cấu hình electron và liên kết hóa học cơ bản.
*   Học cách xác định số oxi hóa và phân loại phản ứng.`,
      advanced: `### Nâng cao
*   Với bài đồng vị, luôn lập hệ để tìm thành phần % hoặc nguyên tử khối trung bình.
*   Phản ứng oxi hóa - khử nên làm theo phương pháp electron để tránh sai hệ số.
*   Khi thiếu dữ kiện, hãy kết hợp bảo toàn khối lượng và bảo toàn electron.`,
      examples: `### Ví dụ luyện nhanh
*   Z = p = e với nguyên tử trung hòa.
*   Chất khử nhường e, chất oxi hóa nhận e.`
    },
    11: {
      title: 'Tổng ôn Hóa 11: Cân bằng, điện li và pH',
      basic: `### Tổng quan cơ bản
*   Ôn axit - bazơ, chất điện li mạnh/yếu, pH và pOH.
*   Nắm cân bằng hóa học, nguyên lý chuyển dịch cân bằng Le Chatelier.
*   Nhớ các dạng phản ứng thường gặp và cách viết phương trình ion rút gọn.`,
      advanced: `### Nâng cao
*   Với dung dịch hỗn hợp, tính theo số mol ion trước rồi mới đổi sang nồng độ.
*   Khi cân bằng bị tác động, xem yếu tố nào tăng giảm sẽ quyết định chiều chuyển dịch.
*   Dùng công thức K_w để liên hệ [H+] và [OH-] khi cần tính nhanh pH.`,
      examples: `### Ví dụ luyện nhanh
*   pH = -log[H+].
*   pH + pOH = 14 ở 25°C.`
    },
    12: {
      title: 'Tổng ôn Hóa 12: Este - lipit và đại cương hữu cơ',
      basic: `### Tổng quan cơ bản
*   Ôn este, lipit, phản ứng thủy phân và xà phòng hóa.
*   Nhớ công thức chất béo, axit béo no - không no và ancol đa chức.
*   Hệ thống hóa các dạng bài nhận biết, viết PTHH và tính toán số mol.`,
      advanced: `### Nâng cao
*   Bài chất béo thường dùng bảo toàn khối lượng, bảo toàn nguyên tố và tỉ lệ mol.
*   Khi không biết gốc axit béo, hãy khai thác dữ kiện khối lượng kiềm và sản phẩm phụ.
*   Với este phức tạp, xác định sản phẩm thủy phân trong môi trường axit và kiềm riêng biệt.`,
      examples: `### Ví dụ luyện nhanh
*   RCOOR' + NaOH -> RCOONa + R'OH.
*   Chất béo là trieste của glixerol.`
    }
  }
};

Object.entries(pdfContext).forEach(([subjectKey, context]) => {
  const [baseSubject, grade] = subjectKey.split('_');
  const template = enrichmentTemplates[baseSubject]?.[grade];

  if (!template || !context?.chapters || !context?.lectures) return;

  const enrichmentChapterId = `tong_on_${baseSubject}_${grade}`;
  const alreadyExists = context.chapters.some((chapter) => chapter.id === enrichmentChapterId)
    || context.lectures.some((lecture) => lecture.chapterId === enrichmentChapterId);

  if (alreadyExists) return;

  context.chapters.push({
    id: enrichmentChapterId,
    title: template.title,
    pages: 'Tổng ôn',
    content: 'Kiến thức nền tảng, nâng cao và phương pháp giải nhanh cho toàn bộ chủ đề.'
  });

  context.lectures.push({
    chapterId: enrichmentChapterId,
    title: template.title,
    basic: template.basic,
    advanced: template.advanced,
    examples: template.examples
  });
});
