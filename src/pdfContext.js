// Compact curriculum context for all subjects and grades.

function makeContext({ title, author, totalPages, description, chapters, lecture }) {
  return {
    title,
    author,
    totalPages,
    description,
    chapters,
    lectures: [lecture]
  };
}

export const pdfContext = {
  math_10: makeContext({
    title: 'Toán học 10 - Kết nối tri thức với cuộc sống',
    author: 'Nhà xuất bản Giáo dục Việt Nam',
    totalPages: 208,
    description: 'Mệnh đề, tập hợp, hàm số, phương trình, bất phương trình, hệ thức lượng, vector và tổ hợp.',
    chapters: [
      { id: 't10_ch1', title: 'Chương 1: Mệnh đề và tập hợp', pages: '1-15', content: 'Mệnh đề, phủ định, kéo theo, tương đương, giao hợp hiệu và phần bù.' },
      { id: 't10_ch2', title: 'Chương 2: Hàm số bậc nhất và bậc hai', pages: '16-35', content: 'Đồ thị, tính đơn điệu, đỉnh parabol, GTLN và GTNN.' }
    ],
    lecture: {
      chapterId: 't10_ch2',
      title: 'Tổng hợp kiến thức Toán 10 từ cơ bản đến nâng cao',
      basic: `### Cơ bản
*   Mệnh đề: chỉ nhận đúng hoặc sai.
*   Hàm bậc nhất: y = ax + b; hàm bậc hai: y = ax^2 + bx + c.
*   Tổ hợp: không xét thứ tự; chỉnh hợp: có xét thứ tự.
`,
      advanced: `### Nâng cao
*   Quy bài toán đếm về quy tắc cộng và quy tắc nhân.
*   Với phương trình, luôn xét điều kiện xác định trước khi biến đổi.
*   Với parabol, dùng tọa độ đỉnh để xét GTLN/GTNN trên đoạn.
`,
      examples: `### Ví dụ
*   Nếu đề nói "chọn 3 bạn không phân công nhiệm vụ" -> tổ hợp.
*   Nếu đề nói "chọn lớp trưởng, lớp phó" -> chỉnh hợp.`
    }
  }),

  physics_10: makeContext({
    title: 'Vật lý 10 - Động học và Động lực học',
    author: 'Bộ tài liệu THPT',
    totalPages: 150,
    description: 'Chuyển động thẳng đều, biến đổi đều, lực, Newton và các bài toán cơ học nền tảng.',
    chapters: [
      { id: 'p10_ch1', title: 'Chương 1: Động học chất điểm', pages: '1-5', content: 'Vận tốc, gia tốc, quãng đường và rơi tự do.' },
      { id: 'p10_ch2', title: 'Chương 2: Động lực học chất điểm', pages: '6-10', content: 'Ba định luật Newton, lực ma sát, lực đàn hồi, trọng lực.' }
    ],
    lecture: {
      chapterId: 'p10_ch1',
      title: 'Tổng hợp kiến thức Vật lý 10 từ cơ bản đến nâng cao',
      basic: `### Cơ bản
*   v = v0 + at.
*   s = v0t + 1/2at^2.
*   F = ma và P = mg là hai công thức trọng tâm.
`,
      advanced: `### Nâng cao
*   Khi thiếu thời gian, dùng v^2 - v0^2 = 2as.
*   Phân tích dấu của a để biết nhanh dần hay chậm dần.
*   Luôn vẽ sơ đồ lực trước khi áp dụng định luật Newton.
`,
      examples: `### Ví dụ
*   Xe hãm phanh thường dùng hệ thức độc lập thời gian.
*   Bài lò xo cần liên hệ lực đàn hồi với độ biến dạng.`
    }
  }),

  chemistry_10: makeContext({
    title: 'Hoá học 10 - Lý thuyết và Bài tập Cơ bản đến Nâng cao',
    author: 'Trường THPT Số 1 Nghĩa Hành',
    totalPages: 17,
    description: 'Cấu tạo nguyên tử, bảng tuần hoàn, liên kết hóa học và phản ứng oxi hóa - khử.',
    chapters: [
      { id: 'h10_ch1', title: 'Chương 1: Nguyên tử và đồng vị', pages: '1-6', content: 'Proton, nơtron, electron, số hiệu nguyên tử, số khối.' },
      { id: 'h10_ch2', title: 'Chương 2: Phản ứng oxi hóa - khử', pages: '15-17', content: 'Số oxi hóa, chất khử, chất oxi hóa và cân bằng electron.' }
    ],
    lecture: {
      chapterId: 'h10_ch1',
      title: 'Tổng hợp kiến thức Hóa 10 từ cơ bản đến nâng cao',
      basic: `### Cơ bản
*   Z = p = e với nguyên tử trung hòa.
*   A = Z + N.
*   Chất khử nhường electron, chất oxi hóa nhận electron.
`,
      advanced: `### Nâng cao
*   Bài đồng vị thường giải bằng hệ phương trình.
*   Bài oxi hóa - khử nên cân bằng theo phương pháp electron.
*   Kết hợp bảo toàn khối lượng khi đề thiếu dữ kiện.
`,
      examples: `### Ví dụ
*   Clo có hai đồng vị 35 và 37, nguyên tử khối trung bình 35.5.
*   Bài thăng bằng phản ứng luôn bắt đầu từ sự thay đổi số oxi hóa.`
    }
  }),

  english_10: makeContext({
    title: 'Tiếng Anh 10 - Chuyên đề Từ vựng & Giao tiếp',
    author: 'Rawdon Wyatt (A & C Black London)',
    totalPages: 83,
    description: 'Từ vựng giao tiếp, công nghệ và nền tảng đọc hiểu tiếng Anh.',
    chapters: [
      { id: 'e10_ch1', title: 'Chương 1: Từ vựng về Sự thay đổi', pages: '1-3', content: 'Amend, broaden, reduce, streamline, deteriorate.' },
      { id: 'e10_ch2', title: 'Chương 2: Từ vựng máy tính & công nghệ', pages: '5-6', content: 'Database, software, hardware, access code, virus.' }
    ],
    lecture: {
      chapterId: 'e10_ch1',
      title: 'Tổng hợp kiến thức Tiếng Anh 10 từ cơ bản đến nâng cao',
      basic: `### Cơ bản
*   Học từ theo cụm và theo chủ đề.
*   Phân biệt từ loại để điền đúng vào câu.
*   Ưu tiên nắm nghĩa gốc trước khi học sắc thái nghĩa.
`,
      advanced: `### Nâng cao
*   Luyện paraphrase để tránh lặp từ khi viết.
*   Phân biệt các cặp từ gần nghĩa theo ngữ cảnh.
*   Khi đọc, luôn xác định từ khóa và collocation.
`,
      examples: `### Ví dụ
*   amend -> sửa đổi văn bản/hợp đồng.
*   streamline -> tinh giản quy trình.`
    }
  }),

  math_11: makeContext({
    title: 'Toán học 11 - Hàm số lượng giác và Cấp số',
    author: 'NXB Giáo dục Việt Nam',
    totalPages: 185,
    description: 'Lượng giác, dãy số, cấp số cộng, cấp số nhân, giới hạn và đạo hàm.',
    chapters: [
      { id: 't11_ch1', title: 'Chương 1: Hàm số và phương trình lượng giác', pages: '1-25', content: 'sin, cos, tan, cot và phương trình lượng giác.' },
      { id: 't11_ch2', title: 'Chương 2: Dãy số và cấp số', pages: '40-60', content: 'Dãy số, cấp số cộng, cấp số nhân và tổng n số hạng.' }
    ],
    lecture: {
      chapterId: 't11_ch1',
      title: 'Tổng hợp kiến thức Toán 11 từ cơ bản đến nâng cao',
      basic: `### Cơ bản
*   sin x = 0 -> x = kπ.
*   u_n = u_1 + (n-1)d.
*   v_n = u_1 q^(n-1).
`,
      advanced: `### Nâng cao
*   Quy phương trình lượng giác về ẩn phụ khi cần.
*   Với giới hạn, ưu tiên rút gọn bậc cao nhất.
*   Với đạo hàm, phải xét dấu để tìm đơn điệu và cực trị.
`,
      examples: `### Ví dụ
*   cos x = 1/2 -> x = ±π/3 + 2kπ.
*   Cấp số nhân: biết u1 và u4 có thể suy q.`
    }
  }),

  physics_11: makeContext({
    title: 'Vật lý 11 - Dao động điều hòa & Điện trường',
    author: 'NXB Giáo dục Việt Nam',
    totalPages: 160,
    description: 'Dao động cơ, sóng, điện trường, từ trường và tụ điện.',
    chapters: [
      { id: 'p11_ch1', title: 'Chương 1: Dao động cơ', pages: '1-22', content: 'Dao động điều hòa, con lắc lò xo, con lắc đơn.' },
      { id: 'p11_ch2', title: 'Chương 2: Điện trường', pages: '23-40', content: 'Điện tích, lực Coulomb, cường độ điện trường.' }
    ],
    lecture: {
      chapterId: 'p11_ch1',
      title: 'Tổng hợp kiến thức Vật lý 11 từ cơ bản đến nâng cao',
      basic: `### Cơ bản
*   x = A cos(ωt + φ).
*   F = k|q1q2|/r^2.
*   T = 2π√(l/g) cho con lắc đơn dao động nhỏ.
`,
      advanced: `### Nâng cao
*   Dùng A^2 = x^2 + v^2/ω^2 khi thiếu thời gian.
*   Với tụ điện, nhớ W = 1/2CU^2.
*   Phân tích pha để xác định sớm/trễ pha.
`,
      examples: `### Ví dụ
*   Biên độ luôn là hệ số đứng trước cos.
*   Hệ thức độc lập thời gian giúp rút gọn bài dao động.`
    }
  }),

  chemistry_11: makeContext({
    title: 'Hóa học 11 - Cân bằng hóa học & Hóa hữu cơ',
    author: 'NXB Giáo dục Việt Nam',
    totalPages: 145,
    description: 'Sự điện li, cân bằng hóa học, pH và đại cương hữu cơ.',
    chapters: [
      { id: 'h11_ch1', title: 'Chương 1: Cân bằng hóa học & Sự điện li', pages: '1-18', content: 'Axit, bazơ, chất điện li mạnh/yếu, pH, pOH.' }
    ],
    lecture: {
      chapterId: 'h11_ch1',
      title: 'Tổng hợp kiến thức Hóa 11 từ cơ bản đến nâng cao',
      basic: `### Cơ bản
*   pH = -log[H+].
*   pH + pOH = 14 (ở 25°C).
*   Chất điện li mạnh phân li hoàn toàn, chất điện li yếu phân li một phần.
`,
      advanced: `### Nâng cao
*   Dùng K_w để đổi nhanh giữa [H+] và [OH-].
*   Bài trộn dung dịch phải tính số mol ion trước.
*   Cân bằng hóa học phụ thuộc nồng độ, áp suất và nhiệt độ.
`,
      examples: `### Ví dụ
*   HNO3 là chất điện li mạnh.
*   Trộn axit và bazơ phải xét chất dư để suy ra pH.`
    }
  }),

  physics_12: makeContext({
    title: 'Vật lý 12 - Dao động, Sóng & Mạch xoay chiều RLC',
    author: 'NXB Giáo dục Việt Nam',
    totalPages: 210,
    description: 'Dao động cơ, sóng, điện xoay chiều RLC và một phần quang - hạt nhân.',
    chapters: [
      { id: 'p12_ch1', title: 'Chương 1: Dòng điện xoay chiều RLC', pages: '10-45', content: 'Cảm kháng, dung kháng, tổng trở và cộng hưởng điện.' }
    ],
    lecture: {
      chapterId: 'p12_ch1',
      title: 'Tổng hợp kiến thức Vật lý 12 từ cơ bản đến nâng cao',
      basic: `### Cơ bản
*   Z_L = ωL.
*   Z_C = 1/(ωC).
*   Z = √(R^2 + (Z_L - Z_C)^2).
`,
      advanced: `### Nâng cao
*   Cộng hưởng khi Z_L = Z_C.
*   P = UI cosφ là công thức công suất hiệu dụng.
*   Khi thiếu dữ kiện, ưu tiên suy luận từ pha và tần số góc.
`,
      examples: `### Ví dụ
*   Mạch RLC cộng hưởng -> Z nhỏ nhất.
*   Tăng tần số thường làm Z_L tăng và Z_C giảm.`
    }
  }),

  chemistry_12: makeContext({
    title: 'Hóa học 12 - Hóa hữu cơ nâng cao & Đại cương kim loại',
    author: 'NXB Giáo dục Việt Nam',
    totalPages: 180,
    description: 'Este, lipit, cacbohiđrat, amin, kim loại và các bài toán bảo toàn.',
    chapters: [
      { id: 'h12_ch1', title: 'Chương 1: Este - Lipit & Chất béo', pages: '1-20', content: 'Thủy phân, xà phòng hóa, chất béo và bài toán bảo toàn.' }
    ],
    lecture: {
      chapterId: 'h12_ch1',
      title: 'Tổng hợp kiến thức Hóa 12 từ cơ bản đến nâng cao',
      basic: `### Cơ bản
*   Este no, đơn chức, mạch hở: CnH2nO2.
*   Thủy phân trong kiềm gọi là xà phòng hóa.
*   Chất béo là trieste của glixerol.
`,
      advanced: `### Nâng cao
*   Bài chất béo thường dùng bảo toàn khối lượng.
*   Kết hợp số mol NaOH và glixerol để tìm sản phẩm.
*   Với este phức tạp, phân tích riêng môi trường axit/kiềm.
`,
      examples: `### Ví dụ
*   Etyl axetat + NaOH -> muối + ancol.
*   Muốn ra muối khan, thường cần số mol và khối lượng mol.`
    }
  }),

  english_11: makeContext({
    title: 'Tiếng Anh 11 - Từ vựng & Đọc hiểu IELTS',
    author: 'Cambridge University Press',
    totalPages: 112,
    description: 'Từ vựng học thuật và kỹ năng đọc hiểu theo chủ đề môi trường, xã hội và giáo dục.',
    chapters: [
      { id: 'e11_ch1', title: 'Chương 1: Nature & Environment', pages: '10-15', content: 'Deforestation, conservation, biodegradable, sustainable.' }
    ],
    lecture: {
      chapterId: 'e11_ch1',
      title: 'Tổng hợp kiến thức Tiếng Anh 11 từ cơ bản đến nâng cao',
      basic: `### Cơ bản
*   Học từ theo cụm và theo chủ đề.
*   Nhận diện topic sentence để hiểu đoạn văn nhanh.
*   Ghi nhớ collocation phổ biến.
`,
      advanced: `### Nâng cao
*   Luyện paraphrase để tránh lặp từ.
*   Đọc hiểu cần chú ý nguyên nhân - kết quả và đối lập.
*   Viết đoạn ngắn rõ bố cục.
`,
      examples: `### Ví dụ
*   deforestation -> phá rừng.
*   conservation -> sự bảo tồn.`
    }
  }),

  english_12: makeContext({
    title: 'Tiếng Anh 12 - Học thuật Nâng cao (IELTS & SAT Prep)',
    author: 'Cambridge & Oxford Press',
    totalPages: 130,
    description: 'Từ vựng học thuật, kỹ năng viết và chủ đề xã hội - môi trường.',
    chapters: [
      { id: 'e12_ch1', title: 'Chương 1: Global Issues', pages: '1-15', content: 'Carbon footprint, sustainability, geopolitics, depletion.' }
    ],
    lecture: {
      chapterId: 'e12_ch1',
      title: 'Tổng hợp kiến thức Tiếng Anh 12 từ cơ bản đến nâng cao',
      basic: `### Cơ bản
*   Ôn từ vựng học thuật theo chủ đề.
*   Học cách viết câu rõ ý và đúng ngữ pháp.
*   Nắm cách đọc nhanh từ khóa của câu hỏi.
`,
      advanced: `### Nâng cao
*   Luyện viết đoạn nghị luận ngắn.
*   Phân tích sắc thái từ vựng trước khi dùng.
*   Khi đọc, chú ý quan hệ nguyên nhân - kết quả.
`,
      examples: `### Ví dụ
*   carbon footprint -> dấu chân carbon.
*   sustainability -> tính bền vững.`
    }
  })
};
