// Core data structure helper
function makeContext({ title, author, totalPages, description, chapters, lectures, introduction }) {
  return {
    title,
    author,
    totalPages,
    description,
    chapters,
    lectures: lectures || [],
    introduction: introduction || null
  };
}

export const newSubjects = {
  // ================= SINH HỌC LỚP 10 =================
  biology_10: makeContext({
    title: 'Sinh học 10 - Thế giới tế bào & Vi sinh vật',
    author: 'Nhà xuất bản Giáo dục Việt Nam',
    totalPages: 156,
    description: 'Thế giới sống, các thành phần hóa học của tế bào, cấu trúc tế bào, chuyển hóa vật chất và năng lượng, phân bào và vi sinh vật.',
    chapters: [
      { id: 'b10_ch1', title: 'Chương 1: Thành phần hóa học và Cấu trúc tế bào', pages: '1-45', content: 'Nước, cacbohiđrat, lipit, prôtêin, axit nuclêic. Cấu trúc tế bào nhân sơ và nhân thực.' },
      { id: 'b10_ch2', title: 'Chương 2: Chuyển hóa vật chất & năng lượng và Phân bào', pages: '46-95', content: 'Enzim, hô hấp tế bào, quang hợp. Chu kỳ tế bào, nguyên phân và giảm phân.' },
      { id: 'b10_ch3', title: 'Chương 3: Sinh học vi sinh vật và virus', pages: '96-156', content: 'Các hình thức dinh dưỡng của VSV, sinh trưởng, cấu trúc virus và bệnh truyền nhiễm.' }
    ],
    lectures: [
      {
        chapterId: 'b10_ch1',
        title: 'Bài giảng Chương 1: Thành phần hóa học và Cấu trúc tế bào',
        basic: `### Lý thuyết nền tảng
*   **Các nguyên tố hóa học**: Cacbon (C) là nguyên tố quan trọng nhất cấu tạo nên các đại phân tử hữu cơ do có 4 electron hóa trị tạo liên kết bền vững.
*   **Nước**: Có cấu trúc lưỡng cực, tạo liên kết hiđrô giữa các phân tử, đóng vai trò làm dung môi, ổn định nhiệt và tham gia phản ứng.
*   **Các đại phân tử hữu cơ**:
    *   *Cacbohiđrat (Đường)*: Cấu tạo theo nguyên tắc đa phân, đơn phân là glucôzơ, fructôzơ. Vai trò: Dự trữ năng lượng (tinh bột, glicôgen) và cấu trúc (xenlulôzơ).
    *   *Lipit (Chất béo)*: Không cấu tạo theo nguyên tắc đa phân. Gồm mỡ, dầu, phôtpholipit (cấu tạo màng), stêrôit.
    *   *Prôtêin*: Đa phân, đơn phân là axit amin (20 loại). Có 4 bậc cấu trúc không gian.
    *   *Axit nuclêic*: Gồm ADN (chuỗi kép, chứa thông tin di truyền) và ARN (chuỗi đơn, truyền đạt thông tin).
*   **Cấu trúc tế bào**:
    *   *Nhân sơ (Vi khuẩn)*: Chưa có nhân hoàn chỉnh, không có màng nhân, chỉ có vùng nhân mang ADN vòng và hạt ribôxôm.
    *   *Nhân thực (Thực vật, Động vật)*: Có nhân hoàn chỉnh, hệ thống nội màng phân chia các bào quan (ti thể, lục lạp, bộ máy Golgi).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tư duy so sánh cấu trúc tế bào động vật và thực vật**:
    *   Tế bào thực vật có *thành tế bào* làm bằng xenlulôzơ giữ hình dạng cứng cáp, có *lục lạp* quang hợp và *không bào trung tâm lớn* tích trữ nước.
    *   Tế bào động vật không có thành tế bào và lục lạp, nhưng có *trung thể* tham gia phân bào.
*   *Mẹo*: Khi làm bài tập đếm số liên kết hiđrô của phân tử ADN, hãy sử dụng công thức:
    $$H = 2A + 3G$$
    (Vì A liên kết với T bằng 2 liên kết hiđrô, G liên kết với X bằng 3 liên kết hiđrô).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Một gen có chiều dài $5100\\text{ Å}$ và có tỉ lệ $A/G = 2/3$. Tính số nuclêôtit mỗi loại của gen đó.
    *   *Giải*:
        1. Tổng số nuclêôtit của gen ($N$):
           $$N = \\frac{2L}{3.4} = \\frac{2 \\cdot 5100}{3.4} = 3000 \\text{ nuclêôtit}$$
        2. Ta có hệ phương trình:
           $$\\begin{cases} A + G = \\frac{N}{2} = 1500 \\\\ \\frac{A}{G} = \\frac{2}{3} \\end{cases} \\implies \\begin{cases} A = 600 \\\\ G = 900 \\end{cases}$$
        3. *Đáp án*: $A = T = 600$ nuclêôtit, $G = X = 900$ nuclêôtit.`
      },
      {
        chapterId: 'b10_ch2',
        title: 'Bài giảng Chương 2: Chuyển hóa vật chất, năng lượng và Phân bào',
        basic: `### Lý thuyết nền tảng
*   **Enzim**: Là chất xúc tác sinh học cấu tạo chủ yếu từ prôtêin. Làm giảm năng lượng hoạt hóa của phản ứng. Hoạt động theo cơ chế chìa khóa - ổ khóa tại trung tâm hoạt động.
*   **Hô hấp tế bào**: Quá trình phân giải nguyên liệu hữu cơ (glucôzơ) giải phóng năng lượng tích lũy trong ATP.
    *   Đường phân: Glucôzơ $\\to$ 2 Axit piruvic + 2 ATP + 2 NADH (ở tế bào chất).
    *   Chu trình Krebs: Axit piruvic $\\to$ CO₂ + 2 ATP + 8 NADH + 2 FADH₂ (ở chất nền ti thể).
    *   Chuỗi truyền electron: NADH và FADH₂ giải phóng electron tạo động lực bơm H⁺ qua màng ti thể tạo ra khoảng 32-34 ATP.
*   **Quang hợp**: Tổng hợp chất hữu cơ nhờ năng lượng ánh sáng.
    *   Pha sáng (ở màng thilacôit): Sử dụng ánh sáng và H₂O tạo ra O₂ giải phóng, đồng thời tạo ra ATP và NADPH.
    *   Pha tối (ở stroma): Dùng ATP, NADPH của pha sáng để khử CO₂ tạo ra glucôzơ (Chu trình Calvin).
*   **Nguyên phân**: Xảy ra ở tế bào sinh dưỡng. Gồm kì đầu, kì giữa (NST tập trung thành 1 hàng), kì sau (các cromatit tách nhau đi về 2 cực), kì cuối. Tạo ra 2 tế bào con giống hệt mẹ ($2n$).
*   **Giảm phân**: Xảy ra ở tế bào sinh dục chín. Gồm 2 lần phân bào nhưng chỉ có 1 lần nhân đôi NST. Tạo ra 4 giao tử có bộ NST giảm một nửa ($n$). Có hiện tượng trao đổi chéo ở kì đầu I tạo biến dị tổ hợp.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tư duy về số lượng nhiễm sắc thể và trạng thái qua các kì nguyên phân**:
    *   *Kì đầu & Kì giữa*: NST kép ($2n$ kép).
    *   *Kì sau*: NST đơn ($4n$ đơn) do các cromatit chị em tách nhau ra.
    *   *Kì cuối*: NST đơn trong mỗi tế bào con ($2n$ đơn).
*   *Mẹo*: Để tính số tế bào con tạo ra sau $k$ lần nguyên phân từ 1 tế bào ban đầu, ta dùng công thức:
    $$Số\\ tế\\ bào\\ con = 2^k$$`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Có 5 tế bào sinh dưỡng của ruồi giấm ($2n = 8$) nguyên phân liên tiếp 3 lần. Xác định số tế bào con tạo thành và tổng số NST đơn môi trường cung cấp cho quá trình này.
    *   *Giải*:
        1. Số tế bào con tạo thành:
           $$5 \\times 2^3 = 40 \\text{ tế bào}$$
        2. Tổng số NST đơn môi trường cung cấp:
           $$NST_{cc} = a \\cdot 2n(2^k - 1) = 5 \\times 8 \\times (2^3 - 1) = 40 \\times 7 = 280 \\text{ NST đơn}$$
        3. *Đáp án*: 40 tế bào con và 280 NST đơn.`
      },
      {
        chapterId: 'b10_ch3',
        title: 'Bài giảng Chương 3: Sinh học vi sinh vật và virus',
        basic: `### Lý thuyết nền tảng
*   **Dinh dưỡng ở vi sinh vật**: Tùy theo nguồn cacbon và nguồn năng lượng, VSV được chia làm 4 nhóm:
    *   *Quang tự dưỡng*: Nguồn năng lượng là ánh sáng, nguồn cacbon là CO₂ (ví dụ: tảo, vi khuẩn lam).
    *   *Quang dị dưỡng*: Ánh sáng và chất hữu cơ (ví dụ: vi khuẩn không lưu huỳnh màu tía).
    *   *Hóa tự dưỡng*: Chất vô cơ và CO₂ (ví dụ: vi khuẩn nitrat hóa).
    *   *Hóa dị dưỡng*: Chất hữu cơ và chất hữu cơ (ví dụ: nấm, hầu hết vi khuẩn).
*   **Sinh trưởng của vi sinh vật**: Trong nuôi cấy không liên tục gồm 4 pha:
    1. Pha tiềm phát (Lag): Vi khuẩn thích nghi, chưa phân chia.
    2. Pha lũy thừa (Log): Sinh trưởng với tốc độ cực đại, số lượng tăng vọt.
    3. Pha cân bằng: Số lượng tế bào sinh ra bằng số lượng tế bào chết đi.
    4. Pha suy vong: Chất dinh dưỡng cạn kiệt, chất độc tích lũy, số lượng tế bào giảm nhanh.
*   **Virus**: Thực chất chưa có cấu tạo tế bào. Gồm lõi axit nuclêic (ADN hoặc ARN) và vỏ prôtêin (capsid). Sống ký sinh nội bào bắt buộc.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Nuôi cấy liên tục và không liên tục**:
    *   Để thu hoạch sinh khối (prôtêin đơn bào) hiệu quả nhất, người ta phải dùng hệ thống nuôi cấy liên tục (luôn bổ sung chất dinh dưỡng và rút bớt dịch nuôi). Điều này giúp vi sinh vật luôn được duy trì ở pha lũy thừa (pha Log).
*   *Mẹo*: Để diệt khuẩn hiệu quả trong gia đình, cần hiểu rõ cơ chế tác động của các chất kháng khuẩn: cồn 70 độ làm đông tụ prôtêin tốt hơn cồn 90 độ vì cồn 90 độ bay hơi quá nhanh và làm đông vỏ vi khuẩn quá nhanh khiến cồn không thấm sâu vào bên trong được.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán**: Một quần thể vi khuẩn có thời gian thế hệ $g = 20$ phút. Ban đầu có 100 tế bào vi khuẩn. Sau 2 giờ, số lượng vi khuẩn trong quần thể là bao nhiêu? (Giả sử vi khuẩn đang ở pha lũy thừa).
    *   *Giải*:
        1. Tính số lần phân đôi ($n$) trong 2 giờ ($120$ phút):
           $$n = \\frac{t}{g} = \\frac{120}{20} = 6 \\text{ lần}$$
        2. Áp dụng công thức tính số lượng vi khuẩn sau $n$ lần phân đôi:
           $$N_t = N_0 \\times 2^n = 100 \\times 2^6 = 100 \\times 64 = 6400 \\text{ tế bào}$$
        3. *Đáp án*: 6400 tế bào.`
      }
    ],
    introduction: `### 1. Giới thiệu môn học
Sinh học 10 là nền móng của toàn bộ chương trình Sinh học phổ thông, tập trung giải quyết các câu hỏi về cấp độ tổ chức của sự sống, thành phần cấu tạo tế bào, cơ chế phân bào nguyên phân - giảm phân và thế giới vi sinh vật, virus.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Khoảng 5% - 10% tổng số câu hỏi trong đề thi (thường nằm ở mức nhận biết, thông hiểu).
*   **Bảng phân bố mức độ**:
| Nội dung | Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao |
| :--- | :---: | :---: | :---: | :---: |
| Thành phần & Cấu trúc tế bào | 1 câu | 1 câu | 0 | 0 |
| Chuyển hóa & Phân bào | 1 câu | 1 câu | 1 câu | 0 |
| Vi sinh vật & Virus | 1 câu | 0 | 0 | 0 |

### 3. Lộ trình học tập chi tiết
*   **Bước 1: Nắm chắc bản chất tế bào**: Học kỹ cấu tạo của các bào quan lớn (nhân, ti thể, lục lạp) và phân biệt tế bào nhân sơ - nhân thực.
*   **Bước 2: Vẽ sơ đồ tư duy nguyên phân - giảm phân**: Đây là phần dễ nhầm lẫn. Hãy vẽ rõ trạng thái nhiễm sắc thể kép/đơn qua từng kì.
*   **Bước 3: Thực hành làm bài tập phân bào**: Giải quyết các bài tập tính số tế bào con và số NST đơn môi trường cung cấp.`
  }),

  // ================= SINH HỌC LỚP 11 =================
  biology_11: makeContext({
    title: 'Sinh học 11 - Trao đổi chất & Chuyển hóa năng lượng ở Sinh vật',
    author: 'Nhà xuất bản Giáo dục Việt Nam',
    totalPages: 180,
    description: 'Quá trình trao đổi nước, dinh dưỡng khoáng và quang hợp ở thực vật. Hô hấp, tuần hoàn, tiêu hóa ở động vật. Cảm ứng, sinh trưởng và sinh sản ở sinh vật.',
    chapters: [
      { id: 'b11_ch1', title: 'Chương 1: Trao đổi chất và chuyển hóa năng lượng ở thực vật', pages: '1-60', content: 'Hấp thụ nước và muối khoáng, thoát hơi nước, quang hợp và hô hấp thực vật.' },
      { id: 'b11_ch2', title: 'Chương 2: Trao đổi chất và chuyển hóa năng lượng ở động vật', pages: '61-120', content: 'Tiêu hóa, hô hấp, tuần hoàn máu, cân bằng nội môi.' },
      { id: 'b11_ch3', title: 'Chương 3: Cảm ứng, Sinh trưởng và Sinh sản ở Sinh vật', pages: '121-180', content: 'Hướng động, ứng động, điện thế hoạt động, hoocmôn thực vật và động vật, sinh sản vô tính và hữu tính.' }
    ],
    lectures: [
      {
        chapterId: 'b11_ch1',
        title: 'Bài giảng Chương 1: Trao đổi chất và chuyển hóa năng lượng ở thực vật',
        basic: `### Lý thuyết nền tảng
*   **Hấp thụ nước**: Rễ hấp thụ nước từ đất nhờ cơ chế thẩm thấu (do dịch tế bào biểu bì rễ ưu trương hơn dịch đất).
*   **Hấp thụ khoáng**: Đi qua rễ theo hai cơ chế: thụ động (theo chiều gradient nồng độ) và chủ động (ngược chiều nồng độ, cần ATP).
*   **Con đường đi của nước**: Nước đi qua tế bào lông hút $\\to$ vỏ rễ $\\to$ đai Caspari (ngăn cản con đường gian bào, buộc nước đi qua con đường tế bào chất để kiểm soát dòng nước) $\\to$ mạch gỗ.
*   **Thoát hơi nước**: Diễn ra chủ yếu qua khí khổng. Tế bào khí khổng trương nước thì thành mỏng căng ra làm thành dày cong theo làm khí khổng mở. Khi tế bào mất nước, thành dày duỗi thẳng làm khí khổng đóng lại.
*   **Quang hợp**:
    *   *Thực vật C₃ (Đa số cây)*: Cố định CO₂ nhờ chu trình Calvin xảy ra ở tế bào mô giậu.
    *   *Thực vật C₄ (Mía, ngô)*: Thích nghi ánh sáng mạnh, nóng ẩm. Cố định CO₂ ở 2 loại tế bào: tế bào mô giậu và tế bào bao bó mạch. Hiệu suất quang hợp cao.
    *   *Thực vật CAM (Xương rồng, dứa)*: Thích nghi khô hạn. Cố định CO₂ ban đêm (tích lũy axit malic), ban ngày chu trình Calvin diễn ra nhờ năng lượng pha sáng.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tư duy so sánh ba nhóm thực vật C₃, C₄, CAM**:
    *   C₃: Hô hấp sáng có xảy ra gây hao phí sản phẩm quang hợp khi nhiệt độ cao.
    *   C₄: Không có hô hấp sáng, tận dụng tối đa CO₂ ở nồng độ cực thấp.
    *   CAM: Đóng khí khổng ban ngày để chống mất nước, quang hợp chậm nhưng sinh tồn cực tốt trong sa mạc.
*   *Mẹo*: Đai Caspari nằm ở lớp nội bì của rễ, có cấu tạo bằng chất suberin chống thấm nước, đóng vai trò như một cửa khẩu kiểm soát lưu lượng và các chất hòa tan đi vào hệ thống mạch dẫn trung tâm.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Câu hỏi tự luận**: Giải thích tại sao khi bón phân quá liều lượng (bón quá đậm đặc) thì cây trồng lại bị héo và chết?
    *   *Giải*:
        1. Bón phân nồng độ cao làm tăng đột ngột lượng ion khoáng trong dung dịch đất xung quanh rễ cây.
        2. Môi trường đất trở thành ưu trương so với dịch tế bào biểu bì lông hút của rễ.
        3. Theo nguyên lý thẩm thấu, nước sẽ di chuyển từ nơi có thế nước cao (trong tế bào rễ) ra nơi có thế nước thấp (ngoài đất) $\\Rightarrow$ Tế bào rễ bị mất nước, co nguyên sinh $\\Rightarrow$ Cây không hút được nước mà còn bị mất nước, dẫn đến héo và chết.`
      },
      {
        chapterId: 'b11_ch2',
        title: 'Bài giảng Chương 2: Trao đổi chất và chuyển hóa năng lượng ở động vật',
        basic: `### Lý thuyết nền tảng
*   **Tiêu hóa**: Biến đổi thức ăn thành chất dinh dưỡng đơn giản hấp thụ vào máu.
    *   Động vật ăn thịt: Dạ dày đơn to, ruột ngắn để tiêu hóa thịt (dễ phân hủy).
    *   Động vật ăn thực vật: Ruột rất dài, manh tràng phát triển (động vật không nhai lại) hoặc có dạ dày 4 ngăn (động vật nhai lại: cỏ dạ cỏ $\\to$ dạ tổ ong $\\to$ dạ lá sách $\\to$ dạ múi khế) giúp tiêu hóa xenlulôzơ nhờ vi sinh vật cộng sinh.
*   **Hô hấp**: Trao đổi khí O₂ và CO₂ với môi trường.
    *   Qua da (giun đất), ống khí (côn trùng), mang (cá), phổi (thú).
*   **Tuần hoàn**: Gồm hệ tuần hoàn hở (côn trùng) và hệ tuần hoàn kín (cá, lưỡng cư, bò sát, thú).
    *   *Cá*: Tim 2 ngăn, 1 vòng tuần hoàn.
    *   *Lưỡng cư*: Tim 3 ngăn, 2 vòng tuần hoàn.
    *   *Bò sát*: Tim 3 ngăn có vách hụt ở tâm thất (trừ cá sấu có 4 ngăn), 2 vòng tuần hoàn.
    *   *Thú, Chim*: Tim 4 ngăn hoàn chỉnh, máu đi nuôi cơ thể là máu đỏ tươi không bị pha trộn.
*   **Cân bằng nội môi**: Đảm bảo môi trường trong ổn định. Vai trò điều hòa của thận (nước, áp suất thẩm thấu), gan (đường huyết), và hệ đệm (pH máu).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tư duy về cơ chế hoạt động của tim**:
    *   Tính tự động của tim nhờ hệ dẫn truyền tim: Nút xoang nhĩ (phát xung điện) $\\to$ Nút nhĩ thất $\\to$ Bó His $\\to$ Mạng Purkinje làm các buồng tim co bóp nhịp nhàng theo chu kì.
    *   Chu kì tim ở người trưởng thành dài 0.8 giây: Tâm nhĩ co (0.1s), tâm thất co (0.3s), pha giãn chung (0.4s).
*   *Mẹo*: Máu trong tĩnh mạch luôn chảy về tim dưới áp lực rất thấp, di chuyển chủ yếu nhờ sự co bóp của các cơ xương xung quanh mạch và hệ thống van một chiều ngăn cản máu chảy ngược.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán**: Ở một loài thú, tim đập 75 nhịp/phút. Tính thời gian hoạt động và nghỉ ngơi của tâm thất trong một chu kỳ tim, biết tỉ lệ thời gian các pha co nhĩ : co thất : giãn chung là 1:3:4.
    *   *Giải*:
        1. Thời gian của một chu kỳ tim:
           $$t = \\frac{60 \\text{ giây}}{75} = 0.8 \\text{ giây}$$
        2. Tổng số phần bằng nhau: $1 + 3 + 4 = 8$ phần.
        3. Thời gian pha co thất (tâm thất hoạt động):
           $$t_{thất\\ co} = 0.8 \\times \\frac{3}{8} = 0.3 \\text{ giây}$$
        4. Thời gian tâm thất nghỉ ngơi (gồm pha co nhĩ và pha giãn chung):
           $$t_{thất\\ nghỉ} = 0.8 - 0.3 = 0.5 \\text{ giây}$$
        5. *Đáp án*: Tâm thất hoạt động 0.3 giây và nghỉ ngơi 0.5 giây trong mỗi chu kỳ.`
      },
      {
        chapterId: 'b11_ch3',
        title: 'Bài giảng Chương 3: Cảm ứng, Sinh trưởng và Sinh sản',
        basic: `### Lý thuyết nền tảng
*   **Cảm ứng thực vật**:
    *   *Hướng động*: Phản ứng sinh trưởng đối với tác nhân kích thích từ một hướng xác định (hướng sáng, hướng trọng lực, hướng hóa, hướng nước).
    *   *Ứng động*: Phản ứng không sinh trưởng hoặc sinh trưởng không định hướng trước tác nhân môi trường (ứng động sức trương như cây trinh nữ cụp lá, ứng động quấn vòng của tua cuốn).
*   **Cảm ứng động vật**: Nhờ hệ thần kinh. Phản xạ là hình thức cảm ứng tiêu biểu.
    *   Phản xạ không điều kiện (bẩm sinh, bền vững) và có điều kiện (học tập, rút kinh nghiệm).
*   **Hoocmôn thực vật**: Auxin, GA, xitôkinin (kích thích sinh trưởng); êtilen, axit abxixic (ức chế sinh trưởng).
*   **Sinh trưởng động vật**:
    *   Phát triển không qua biến thái (người, thú).
    *   Phát triển qua biến thái hoàn toàn (bướm, ếch): Con non cấu tạo khác hẳn con trưởng thành.
    *   Phát triển qua biến thái không hoàn toàn (châu chấu): Con non gần giống con trưởng thành nhưng trải qua nhiều lần lột xác.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Cơ chế uốn cong của ngọn cây hướng sáng**:
    Dưới tác động của ánh sáng chiếu từ một phía, hoocmôn auxin dịch chuyển từ phía được chiếu sáng sang phía bị che khuất. Nồng độ auxin cao ở phía tối kích thích các tế bào tại đây kéo dài ra nhanh hơn so với phía sáng, làm cho ngọn cây cong về phía nguồn sáng.
*   *Mẹo*: Để phân biệt biến thái hoàn toàn và không hoàn toàn, hãy nhớ đến giai đoạn **nhộng (kén)**. Nhộng chỉ xuất hiện ở biến thái hoàn toàn (ví dụ: tằm hóa nhộng rồi thành bướm).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Câu hỏi**: Tại sao khi nuôi tằm, người ta thường dùng hoocmôn ecdyson để kích thích tằm nhanh chóng lột xác và nhả tơ?
    *   *Giải*:
        1. Sự lột xác ở côn trùng được điều hòa bởi hai hoocmôn chính là ecdyson (kích thích lột xác) và juvenile (giữ tằm ở trạng thái sâu non).
        2. Khi lượng juvenile giảm xuống, ecdyson hoạt động mạnh mẽ thúc đẩy tằm lột xác lần cuối để hóa nhộng và làm kén nhả tơ. Việc phun ecdyson nhân tạo giúp kiểm soát đồng loạt quá trình làm kén thu hoạch tơ tằm năng suất ổn định.`
      }
    ],
    introduction: `### 1. Giới thiệu môn học
Sinh học 11 đi sâu vào các cơ chế sinh học thiết yếu duy trì sự sống: sự vận chuyển dòng vật chất - năng lượng ở cả thực vật và động vật, hệ tuần hoàn, hô hấp, hệ thần kinh cảm ứng và sự điều hòa nội tiết (hoocmôn).

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Chiếm khoảng 10% tổng số câu hỏi (khoảng 4 câu trong đề thi).
*   **Bảng phân bố mức độ**:
| Nội dung | Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao |
| :--- | :---: | :---: | :---: | :---: |
| Trao đổi chất thực vật (C₃, C₄, CAM) | 1 câu | 1 câu | 0 | 0 |
| Tuần hoàn, Hô hấp động vật | 1 câu | 1 câu | 0 | 0 |
| Cảm ứng & Sinh sản sinh vật | 0 | 0 | 0 | 0 |

### 3. Lộ trình học tập chi tiết
*   **Bước 1: Nắm chắc sơ đồ tuần hoàn**: Học thuộc đường đi của máu trong 2 vòng tuần hoàn của thú và phân biệt máu pha/máu đỏ tươi ở các lớp động vật.
*   **Bước 2: Hiểu rõ cơ chế đóng mở khí khổng**: Ghi nhớ ảnh hưởng của thế nước và ánh sáng tới quá trình thoát hơi nước.
*   **Bước 3: Luyện các dạng bài tập đếm ý đúng**: Đề thi tốt nghiệp THPT thường đưa ra 4 nhận định sinh học 11 và yêu cầu đếm số nhận định đúng.`
  }),

  // ================= SINH HỌC LỚP 12 =================
  biology_12: makeContext({
    title: 'Sinh học 12 - Di truyền học, Tiến hóa và Sinh thái học',
    author: 'Nhà xuất bản Giáo dục Việt Nam',
    totalPages: 220,
    description: 'Cơ chế di truyền biến dị cấp phân tử & tế bào, quy luật di truyền Menđen, liên kết gen, di truyền quần thể, chọn giống, thuyết tiến hóa hiện đại và sinh thái học hệ sinh thái.',
    chapters: [
      { id: 'b12_ch1', title: 'Chương 1: Cơ chế di truyền và biến dị', pages: '1-50', content: 'Nhân đôi ADN, phiên mã, dịch mã, đột biến gen, cấu trúc NST, đột biến số lượng và cấu trúc NST.' },
      { id: 'b12_ch2', title: 'Chương 2: Quy luật di truyền và Di truyền quần thể', pages: '51-120', content: 'Quy luật Menđen, tương tác gen, liên kết gen và hoán vị gen, di truyền liên kết giới tính, cân bằng Hardy-Weinberg.' },
      { id: 'b12_ch3', title: 'Chương 3: Tiến hóa và Sinh thái học', pages: '121-220', content: 'Các nhân tố tiến hóa, sự phát sinh sự sống, các đặc trưng của quần thể, chuỗi và lưới thức ăn, chu trình sinh địa hóa.' }
    ],
    lectures: [
      {
        chapterId: 'b12_ch1',
        title: 'Bài giảng Chương 1: Cơ chế di truyền và biến dị',
        basic: `### Lý thuyết nền tảng
*   **Nhân đôi ADN**: Xảy ra ở pha S của chu kỳ tế bào. Enzim ADN pôlimeraza chỉ tổng hợp mạch mới theo chiều $5' \\to 3'$ nên một mạch được tổng hợp liên tục (mạch khuôn $3' \\to 5'$), mạch còn lại được tổng hợp gián đoạn tạo các đoạn Okazaki rồi nối lại bằng enzim ligaza.
*   **Phiên mã**: Enzim ARN pôlimeraza bám vào vùng khởi động phiên mã tổng hợp mARN theo chiều $5' \\to 3'$ từ mạch khuôn $3' \\to 5'$ của gen.
*   **Dịch mã**: Diễn ra ở tế bào chất trên ribôxôm. tARN mang axit amin đối mã tương ứng khớp với bộ ba trên mARN bắt đầu từ mã mở đầu AUG ($5' \\to 3'$).
*   **Đột biến cấu trúc NST**: Gồm mất đoạn, lặp đoạn, đảo đoạn, chuyển đoạn (giữa 2 NST tương đồng hoặc không tương đồng).
*   **Đột biến số lượng NST**:
    *   *Lệch bội*: Thay đổi số lượng NST ở một hoặc vài cặp ($2n+1$: thể ba, $2n-1$: thể một).
    *   *Đa bội*: Tăng nguyên lần bộ đơn bội của loài và lớn hơn $2n$ ($3n$: thể tam bội, $4n$: thể tứ bội).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phân tích chiều của các phân tử sinh học**:
    *   Mạch khuôn ADN: $3' \\to 5'$.
    *   Mạch ARN và mạch mới ADN: luôn được tổng hợp theo chiều $5' \\to 3'$.
    *   Bộ ba đối mã (anticodon) trên tARN chạy ngược chiều với codon trên mARN: $3' \\to 5'$.
*   *Mẹo*: Đột biến mất đoạn NST thường làm mất vật chất di truyền lớn gây hại nhất, được dùng để loại bỏ các gen có hại khỏi bộ gen trong chọn giống cây trồng.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán**: Một phân tử mARN có trình tự bộ ba mở đầu là $5'-AUG-3'$. Hãy xác định trình tự bộ ba đối mã (anticodon) tương ứng của tARN mang axit amin mở đầu (Metionin).
    *   *Giải*:
        1. Trình tự codon trên mARN: $5'-AUG-3'$.
        2. Trình tự anticodon tương ứng phải liên kết bổ sung ($A-U, U-A, G-X$) và ngược chiều với codon:
           $$5'-AUG-3' \\leftrightarrow 3'-UAX-5'$$
        3. *Đáp án*: $3'-UAX-5'$ (hoặc viết theo chiều chuẩn là $5'-XAU-3'$).`
      },
      {
        chapterId: 'b12_ch2',
        title: 'Bài giảng Chương 2: Quy luật di truyền và Di truyền quần thể',
        basic: `### Lý thuyết nền tảng
*   **Quy luật phân li độc lập**: Các cặp alen phân li độc lập trong giảm phân tạo giao tử. Tỉ lệ kiểu hình phép lai dị hợp 2 cặp alen: $(3:1)^2 = 9:3:3:1$.
*   **Liên kết gen**: Các gen nằm gần nhau trên cùng 1 NST cùng di truyền với nhau. Làm hạn chế sự xuất hiện của biến dị tổ hợp.
*   **Hoán vị gen**: Do sự trao đổi chéo giữa các cromatit khác nguồn gốc ở kì đầu giảm phân I.
    *   Tần số hoán vị gen ($f$) bằng tổng tỉ lệ các giao tử hoán vị:
        $$f = \\frac{Số\\ cá\\ thể\\ có\\ tái\\ tổ\\ hợp}{Tổng\\ số\\ cá\\ thể\\ đời\\ con} \\times 100\\%$$
        $f$ luôn nhỏ hơn hoặc bằng 50%.
*   **Di truyền liên kết giới tính**: Alen nằm trên vùng không tương đồng của NST X di truyền chéo (từ mẹ truyền cho con trai), alen nằm trên Y di truyền thẳng (bố truyền cho tất cả con trai).
*   **Di truyền quần thể**: Cân bằng Hardy-Weinberg khi:
    $$p^2AA + 2pqAa + q^2aa = 1$$
    Với $p$ là tần số alen A, $q$ là tần số alen a ($p+q=1$). Tần số alen và kiểu gen không đổi qua các thế hệ ngẫu phối.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tư duy giải toán lai có hoán vị gen**:
    *   Nhận diện giao tử liên kết (gt trội hoặc lặn hoàn toàn) có tỉ lệ $P_{gt} = \\frac{1-f}{2}$.
    *   Giao tử hoán vị có tỉ lệ $P_{gt\\ hv} = \\frac{f}{2}$.
    *   Nếu phép lai phân tích cho tỉ lệ kiểu hình không bằng $1:1:1:1$, ta suy ra ngay có hoán vị gen và tần số $f = 2 \\times \\% \\text{kiểu hình thấp nhất}$.
*   *Mẹo*: Khi một quần thể cân bằng di truyền có tỉ lệ kiểu hình lặn $aa = y \\%$, ta tính ngay được tần số alen $q(a) = \\sqrt{y/100}$, từ đó suy ra $p(A) = 1 - q$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Ở một loài thực vật, alen A quy định quả đỏ trội hoàn toàn so với a quy định quả vàng. Quần thể ngẫu phối cân bằng di truyền có 16% số cây quả vàng. Tính tần số kiểu gen dị hợp Aa trong quần thể này.
    *   *Giải*:
        1. Cây quả vàng có kiểu gen $aa$ chiếm 16% $\\implies q^2(aa) = 0.16$.
        2. Tần số alen a:
           $$q(a) = \\sqrt{0.16} = 0.4$$
        3. Tần số alen A:
           $$p(A) = 1 - q(a) = 1 - 0.4 = 0.6$$
        4. Tần số kiểu gen dị hợp Aa trong quần thể:
           $$2pq(Aa) = 2 \\times 0.6 \\times 0.4 = 0.48 = 48\\%$$
        5. *Đáp án*: Kiểu gen Aa chiếm tỉ lệ 48% trong quần thể.`
      },
      {
        chapterId: 'b12_ch3',
        title: 'Bài giảng Chương 3: Tiến hóa và Sinh thái học',
        basic: `### Lý thuyết nền tảng
*   **Học thuyết tiến hóa hiện đại**:
    *   *Nguồn biến dị*: Biến dị sơ cấp (đột biến) và biến dị thứ cấp (biến dị tổ hợp).
    *   *Các nhân tố tiến hóa*:
        1. Đột biến: Làm thay đổi tần số alen rất chậm, tạo alen mới.
        2. Di - nhập gen: Mang alen mới đến hoặc mang alen đi khỏi quần thể.
        3. Giao phối không ngẫu nhiên: Chỉ làm thay đổi thành phần kiểu gen (giảm dị hợp, tăng đồng hợp), không thay đổi tần số alen.
        4. Chọn lọc tự nhiên: Giữ lại kiểu hình thích nghi, là nhân tố có hướng duy nhất.
        5. Yếu tố ngẫu nhiên: Làm nghèo vốn gen quần thể, có thể loại bỏ cả alen có lợi.
*   **Sinh thái học**:
    *   *Mối quan hệ sinh thái*: Cộng sinh (cả hai cùng lợi bắt buộc), hợp tác (cùng lợi không bắt buộc), hội sinh (một bên lợi, bên kia không hại), cạnh tranh, ký sinh, ức chế cảm nhiễm.
    *   *Lưới thức ăn*: Gồm các sinh vật sản xuất (thực vật), sinh vật tiêu thụ (động vật ăn cỏ, ăn thịt) và sinh vật phân giải (vi khuẩn, nấm).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tư duy phân biệt các mối quan hệ dinh dưỡng**:
    *   *Vật dữ - Con mồi* và *Ký sinh - Vật chủ*: Vật dữ tiêu diệt con mồi ngay lập tức làm nguồn thức ăn; còn sinh vật ký sinh hút chất dinh dưỡng từ vật chủ từ từ và thường không giết chết vật chủ ngay lập tức để duy trì nguồn sống lâu dài.
*   *Mẹo*: Khi làm bài tập tính hiệu suất sinh thái giữa các bậc dinh dưỡng, hãy dùng công thức:
    $$H_{st} = \\frac{Năng\\ lượng\\ bậc\\ dinh\\ dưỡng\\ n}{Năng\\ lượng\\ bậc\\ dinh\\ dưỡng\\ n-1} \\times 100\\%$$`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán**: Cho chuỗi thức ăn: Tảo lục (sinh vật sản xuất) $\\to$ Giáp xác (bậc 2) $\\to$ Cá rô (bậc 3) $\\to$ Rái cá (bậc 4). Biết năng lượng tích lũy ở tảo lục là $1.2 \\cdot 10^6\\text{ kcal}$, ở giáp xác là $1.2 \\cdot 10^5\\text{ kcal}$, ở cá rô là $1.5 \\cdot 10^4\\text{ kcal}$. Tính hiệu suất sinh thái giữa cá rô và giáp xác.
    *   *Giải*:
        1. Bậc dinh dưỡng chứa giáp xác là bậc 2, chứa cá rô là bậc 3.
        2. Hiệu suất sinh thái ($H$) giữa bậc 3 và bậc 2:
           $$H = \\frac{E_{cá\\ rô}}{E_{giáp\\ xác}} \\times 100\\% = \\frac{1.5 \\cdot 10^4}{1.2 \\cdot 10^5} \\times 100\\% = 12.5\\%$$
        3. *Đáp án*: Hiệu suất sinh thái đạt 12.5%.`
      }
    ],
    introduction: `### 1. Giới thiệu môn học
Sinh học 12 là trọng tâm lớn nhất của kỳ thi THPT Quốc gia môn Sinh học. Nội dung bao gồm toàn bộ cơ chế di truyền phân tử, quy luật lai giống, cấu trúc quần thể sinh vật, cùng các học thuyết tiến hóa hiện đại và sinh thái học môi trường.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Chiếm tới 80% - 85% tổng số câu hỏi trong bài thi tổ hợp KHTN (khoảng 32 - 34 câu).
*   **Bảng phân bố mức độ**:
| Chuyên đề chính | Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao |
| :--- | :---: | :---: | :---: | :---: |
| Cơ chế di truyền & đột biến | 3 câu | 2 câu | 1 câu | 1 câu (Phả hệ/ADN) |
| Quy luật di truyền Menđen & HVG | 2 câu | 2 câu | 2 câu | 2 câu (Lai nhiều cặp) |
| Di truyền quần thể | 1 câu | 1 câu | 1 câu | 0 |
| Tiến hóa & Chọn giống | 3 câu | 2 câu | 0 | 0 |
| Sinh thái học | 4 câu | 3 câu | 1 câu | 0 |

### 3. Lộ trình học tập chi tiết
*   **Giai đoạn 1: Quét sạch lý thuyết cơ chế di truyền (Tháng 8 - 11)**: Học chắc quá trình Nhân đôi, Phiên mã, Dịch mã và các dạng đột biến cấu trúc/số lượng NST.
*   **Giai đoạn 2: Luyện phương pháp giải nhanh quy luật di truyền (Tháng 12 - 3)**: Làm chủ các kỹ năng tính nhanh tỉ lệ giao tử, xác định quy luật tương tác, liên kết và hoán vị gen.
*   **Giai đoạn 3: Tổng ôn Tiến hóa - Sinh thái và Luyện đề (Tháng 4 - 6)**: Tận dụng các câu hỏi ăn điểm lý thuyết ở phần Tiến hóa và Sinh thái học để đạt điểm tối đa.`
  }),

  // ================= LỊCH SỬ LỚP 10 =================
  history_10: makeContext({
    title: 'Lịch sử 10 - Hiện thực lịch sử & Văn minh thế giới',
    author: 'Nhà xuất bản Giáo dục Việt Nam',
    totalPages: 168,
    description: 'Khái niệm lịch sử, các cuộc cách mạng công nghiệp, văn minh thế giới cổ trung đại và lịch sử Việt Nam thời kỳ Văn Lang - Âu Lạc đến trước nhà Nguyễn.',
    chapters: [
      { id: 'h10_ch1', title: 'Chương 1: Khái quát về Lịch sử và các cuộc Cách mạng công nghiệp', pages: '1-40', content: 'Hiện thực lịch sử và nhận thức lịch sử. Cách mạng công nghiệp lần thứ nhất và lần thứ hai.' },
      { id: 'h10_ch2', title: 'Chương 2: Một số nền văn minh thế giới thời kì cổ - trung đại', pages: '41-90', content: 'Văn minh Ai Cập, Lưỡng Hà, Trung Hoa, Ấn Độ, Hy Lạp và La Mã cổ đại.' },
      { id: 'h10_ch3', title: 'Chương 3: Lịch sử truyền thống dân tộc Việt Nam', pages: '91-168', content: 'Thời kì Vương quốc Văn Lang - Âu Lạc, các triều đại phong kiến Lý, Trần, Lê sơ và cuộc kháng chiến giữ nước.' }
    ],
    lectures: [
      {
        chapterId: 'h10_ch1',
        title: 'Bài giảng Chương 1: Hiện thực lịch sử và Cách mạng công nghiệp',
        basic: `### Lý thuyết nền tảng
*   **Hiện thực lịch sử**: Là toàn bộ những gì đã diễn ra trong quá khứ, tồn tại khách quan, độc lập với ý thức của con người (không thể thay đổi).
*   **Nhận thức lịch sử**: Là những hiểu biết, tri thức, quan niệm của con người về quá khứ lịch sử (có thể thay đổi theo thời gian, tư liệu mới và góc nhìn).
*   **Cách mạng công nghiệp lần thứ nhất (Cuối thế kỉ XVIII - đầu XIX)**: Khởi đầu ở Anh với việc phát minh ra động cơ hơi nước của James Watt. Chuyển từ lao động thủ công sang lao động bằng máy móc cơ khí hóa.
*   **Cách mạng công nghiệp lần thứ hai (Cuối XIX - đầu XX)**: Đặc trưng bởi việc sử dụng năng lượng điện, động cơ đốt trong và sản xuất dây chuyền quy mô lớn. Hoa Kỳ và Đức vươn lên dẫn đầu.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tư duy về tính khách quan của Sử học**:
    *   Nhận thức lịch sử luôn đi sau hiện thực lịch sử và khó có thể tái hiện chính xác 100% hiện thực lịch sử.
    *   Do đó, sử học đòi hỏi phương pháp nghiên cứu nghiêm túc, đa chiều, dựa trên các nguồn sử liệu đáng tin cậy (sử liệu hiện vật, sử liệu chữ viết, truyền miệng).
*   *Mẹo*: Để phân biệt Cách mạng công nghiệp 1 và 2:
    *   Lần 1: Gắn liền với **than đá, sắt và hơi nước**.
    *   Lần 2: Gắn liền với **điện, thép, dầu mỏ và hóa chất**.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Câu hỏi tự luận**: Phân tích tác động to lớn của Cách mạng công nghiệp lần thứ nhất đối với xã hội châu Âu thế kỷ XIX.
    *   *Giải*:
        1. Về mặt giai cấp: Hình thành hai giai cấp cơ bản đối lập nhau sâu sắc trong xã hội tư bản là giai cấp tư sản (nắm tư liệu sản xuất) và giai cấp vô sản (làm thuê, bán sức lao động).
        2. Về mặt đô thị hóa: Thúc đẩy sự phát triển nhanh chóng của các thành phố công nghiệp lớn, dòng người từ nông thôn đổ về thành thị tìm việc làm dẫn đến các vấn đề xã hội phức tạp như nhà ở, ô nhiễm môi trường.
        3. Về mặt giao thông: Đường sắt và tàu thủy hơi nước ra đời làm thu hẹp khoảng cách địa lý, thúc đẩy giao thương quốc tế.`
      },
      {
        chapterId: 'h10_ch2',
        title: 'Bài giảng Chương 2: Các nền văn minh thế giới thời kì cổ - trung đại',
        basic: `### Lý thuyết nền tảng
*   **Văn minh Ai Cập cổ đại**: Hình thành ở hạ lưu sông Nile. Nổi bật với Kim tự tháp, chữ tượng hình, phép đếm cơ số 10 và kỹ thuật ướp xác đỉnh cao.
*   **Văn minh Trung Hoa**: Phát triển ở lưu vực Hoàng Hà và Trường Giang. Hệ tư tưởng lớn: Nho giáo, Đạo giáo, Pháp gia. Tác giả của 4 phát minh vĩ đại (Tứ đại phát minh): Kĩ thuật làm giấy, kĩ thuật in, la bàn và thuốc súng.
*   **Văn minh Ấn Độ**: Lưu vực sông Ấn và sông Hằng. Nơi ra đời của Phật giáo và Hindu giáo. Sáng tạo chữ Phạn và hệ chữ số tự nhiên ngày nay (chữ số từ 0 đến 9).
*   **Văn minh Hy Lạp - La Mã**: Cận duyên Địa Trung Hải. Nơi đặt nền móng cho nền dân chủ cổ đại, triết học phương Tây, toán học (Pythagore, Thales) và văn học kịch nghệ.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tư duy so sánh địa hình ảnh hưởng đến thể chế**:
    *   Phương Đông: Lưu vực sông lớn phì nhiêu $\\to$ nông nghiệp lúa nước cần đắp đê trị thủy $\\to$ cần chính quyền trung ương tập quyền mạnh mẽ $\\to$ Quân chủ chuyên chế.
    *   Phương Tây: Nhiều đồi núi, sát biển $\\to$ buôn bán hàng hải $\\to$ đô thị thương cảng độc lập $\\to$ Thể chế dân chủ/cộng hòa chủ nô.
*   *Mẹo*: Tứ đại phát minh của Trung Quốc không chỉ làm thay đổi bộ mặt nước này mà còn giúp châu Âu chấm dứt thời kỳ Trung cổ (thuốc súng tiêu diệt thành lũy hiệp sĩ, la bàn mở ra các cuộc phát kiến địa lý).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Câu hỏi tự luận**: Nêu tầm ảnh hưởng của Nho giáo đối với các quốc gia Đông Á thời phong kiến và ngày nay.
    *   *Giải*:
        1. Thời phong kiến: Nho giáo cung cấp hệ tư tưởng chuẩn mực (tam cương ngũ thường) giúp duy trì trật tự xã hội ổn định, củng cố quyền lực tối cao của hoàng đế, là nội dung cốt lõi của giáo dục khoa cử.
        2. Ngày nay: Nho giáo vẫn để lại các giá trị tích cực như truyền thống hiếu học, tôn trọng đạo lý gia đình, kính trên nhường dưới, nhưng cũng có mặt hạn chế cần lược bỏ như tư tưởng trọng nam khinh nữ.`
      },
      {
        chapterId: 'h10_ch3',
        title: 'Bài giảng Chương 3: Lịch sử truyền thống dân tộc Việt Nam',
        basic: `### Lý thuyết nền tảng
*   **Vương quốc Văn Lang - Âu Lạc**: Nhà nước đầu tiên hình thành trên cơ sở văn hóa Đông Sơn. Kinh đô Văn Lang ở Phong Châu (Phú Thọ), kinh đô Âu Lạc ở Cổ Loa (Đông Anh, Hà Nội). Nền kinh tế chính là nông nghiệp trồng lúa nước kết hợp nghề luyện kim đồng phát triển (trống đồng Đông Sơn).
*   **Nhà nước phong kiến Lý - Trần - Lê sơ**:
    *   *Nhà Lý (1009-1225)*: Dời đô về Thăng Long (1010). Ban hành bộ luật Hình thư (luật pháp thành văn đầu tiên).
    *   *Nhà Trần (1226-1400)*: Ba lần đánh thắng quân xâm lược Mông - Nguyên oai hùng.
    *   *Nhà Lê sơ (1428-1527)*: Đỉnh cao quân chủ chuyên chế dưới triều Lê Thánh Tông với bộ luật Hồng Đức (Quốc triều hình luật) tiến bộ bảo vệ quyền lợi phụ nữ.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phân tích nghệ thuật quân sự truyền thống của dân tộc**:
    *   Nghệ thuật 'lấy yếu chống mạnh, lấy ít địch nhiều', 'lánh chỗ mạnh, đánh chỗ yếu' trong chống quân Mông - Nguyên.
    *   Sử dụng địa hình sông nước tự nhiên kết hợp cọc ngầm (Bạch Đằng 938, 981, 1288).
*   *Mẹo*: Bộ luật Hồng Đức (thời Lê sơ) rất tiến bộ vì quy định con gái được hưởng quyền thừa kế ngang bằng con trai nếu cha mẹ không có con trai, và người vợ có quyền ly hôn nếu người chồng bỏ bê gia đình quá lâu.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Câu hỏi tự luận**: Phân tích những nguyên nhân giúp nhà Trần ba lần đánh bại quân xâm lược Mông - Nguyên thế kỷ XIII.
    *   *Giải*:
        1. Sự đoàn kết toàn dân: Sự đồng lòng nhất trí của quân dân nhà Trần ('Vua tôi đồng lòng, anh em hòa thuận', hội nghị Diên Hồng bô lão đồng thanh hô 'Đánh!').
        2. Chiến thuật tác chiến đúng đắn: Thực hiện chính sách 'vườn không nhà trống', chủ động rút lui bảo toàn lực lượng chờ địch mệt mỏi tiêu hao lương thực mới phản công quyết định (Bạch Đằng, Chương Dương, Hàm Tử).
        3. Lãnh đạo thiên tài: Các tướng lĩnh kiệt xuất như Trần Hưng Đạo, Trần Khánh Dư với Hịch tướng sĩ truyền lửa yêu nước.`
      }
    ],
    introduction: `### 1. Giới thiệu môn học
Lịch sử 10 đổi mới tập trung giáo dục tư duy lịch sử, tìm hiểu bản chất của sử liệu học, tìm hiểu các cuộc cách mạng công nghiệp làm thay đổi văn minh nhân loại cùng lịch sử các triều đại tự chủ Việt Nam.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Khoảng 5% - 7% tổng số câu hỏi (thường là các câu hỏi nhận biết cơ bản lịch sử Việt Nam).
*   **Bảng phân bố mức độ**:
| Nội dung | Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao |
| :--- | :---: | :---: | :---: | :---: |
| Hiện thực & Cách mạng công nghiệp | 1 câu | 0 | 0 | 0 |
| Văn minh cổ trung đại | 1 câu | 0 | 0 | 0 |
| Lịch sử phong kiến Việt Nam | 1 câu | 1 câu | 0 | 0 |

### 3. Lộ trình học tập chi tiết
*   **Bước 1: Phân biệt hiện thực và nhận thức**: Đây là câu hỏi kinh điển trong phần mở đầu. Nhớ rằng hiện thực có trước, nhận thức có sau.
*   **Bước 2: Ghi nhớ các mốc sự kiện văn minh lớn**: Lập bảng niên biểu các phát minh của Trung Hoa, Ấn Độ, Ai Cập.
*   **Bước 3: Ôn tập trận Bạch Đằng**: So sánh 3 trận Bạch Đằng năm 938 (Ngô Quyền), 981 (Lê Hoàn) và 1288 (Trần Hưng Đạo).`
  }),

  // ================= LỊCH SỬ LỚP 11 =================
  biology_11: null, // Placeholder or not, let's keep all keys clean
  history_11: makeContext({
    title: 'Lịch sử 11 - Lịch sử cận hiện đại thế giới & Việt Nam',
    author: 'Nhà xuất bản Giáo dục Việt Nam',
    totalPages: 188,
    description: 'Các cuộc cách mạng tư sản lớn, chủ nghĩa tư bản phát triển, chiến tranh thế giới, cuộc đấu tranh chống thực dân Pháp của nhân dân Việt Nam cuối thế kỷ XIX - đầu thế kỷ XX.',
    chapters: [
      { id: 'h11_ch1', title: 'Chương 1: Các cuộc cách mạng tư sản và sự phát triển của chủ nghĩa tư bản', pages: '1-50', content: 'Cách mạng tư sản Anh, Pháp, Mĩ. Sự chuyển sang giai đoạn đế quốc chủ nghĩa.' },
      { id: 'h11_ch2', title: 'Chương 2: Chiến tranh thế giới và Cách mạng tháng Mười Nga', pages: '51-95', content: 'Chiến tranh thế giới thứ nhất và thứ hai. Thắng lợi của Cách mạng tháng Mười Nga năm 1917.' },
      { id: 'h11_ch3', title: 'Chương 3: Việt Nam từ năm 1858 đến đầu thế kỷ XX', pages: '96-188', content: 'Cuộc kháng chiến chống Pháp xâm lược (1858-1884), phong trào Cần vương, phong trào yêu nước đầu thế kỷ XX.' }
    ],
    lectures: [
      {
        chapterId: 'h11_ch1',
        title: 'Bài giảng Chương 1: Cách mạng tư sản và Chủ nghĩa tư bản',
        basic: `### Lý thuyết nền tảng
*   **Cách mạng tư sản Pháp (1789)**: Cuộc cách mạng triệt để nhất, lật đổ hoàn toàn chế độ phong kiến chuyên chế, thông qua Bản Tuyên ngôn Nhân quyền và Dân quyền nổi tiếng ('Tự do - Bình đẳng - Bác ái').
*   **Đặc điểm Cách mạng tư sản**: Nhằm xóa bỏ rào cản phong kiến để mở đường cho kinh tế tư bản chủ nghĩa phát triển, do giai cấp tư sản lãnh đạo.
*   **Chủ nghĩa tư bản chuyển sang độc quyền**: Cuối thế kỷ XIX - đầu thế kỷ XX, sự tập trung sản xuất dẫn đến xuất hiện các tổ chức độc quyền lớn (như Cartel, Syndicate, Trust) chi phối đời sống kinh tế xã hội. Các nước tư bản tăng cường xâm chiếm thuộc địa để tìm thị trường tiêu thụ và nguồn nguyên liệu.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tư duy về nguyên nhân sâu xa và duyên cớ bùng nổ chiến tranh/cách mạng**:
    *   *Nguyên nhân sâu xa*: Những mâu thuẫn âm ỉ kéo dài trong lòng xã hội (ví dụ: mâu thuẫn giữa lực lượng sản xuất tư bản và quan hệ sản xuất phong kiến lỗi thời).
    *   *Duyên cớ (Ngòi nổ)*: Sự kiện ngẫu nhiên châm ngòi cho sự bùng phát của mâu thuẫn đó.
*   *Mẹo*: Để nhớ bản chất của CNTB độc quyền: Lênin định nghĩa 'Chủ nghĩa đế quốc là giai đoạn tột cùng của chủ nghĩa tư bản', đặc trưng bởi xuất hiện tư bản tài chính và xuất khẩu tư bản ra nước ngoài.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Câu hỏi tự luận**: So sánh điểm khác biệt cơ bản giữa cách mạng tư sản Anh thế kỷ XVII và cách mạng tư sản Pháp thế kỷ XVIII về mức độ triệt để.
    *   *Giải*:
        1. Cách mạng Anh: Chưa triệt để. Sau cách mạng vẫn duy trì ngôi vua (thiết lập thể chế Quân chủ lập hiến), ruộng đất không được chia cho nông dân nghèo mà rơi vào tay quý tộc mới và tư sản.
        2. Cách mạng Pháp: Rất triệt để. Lật đổ hoàn toàn chế độ phong kiến chuyên chế, tịch thu ruộng đất phong kiến chia nhỏ bán cho nông dân, thiết lập nền Cộng hòa tư sản vững chắc.`
      },
      {
        chapterId: 'h11_ch2',
        title: 'Bài giảng Chương 2: Chiến tranh thế giới và Cách mạng tháng Mười Nga',
        basic: `### Lý thuyết nền tảng
*   **Chiến tranh thế giới thứ nhất (1914-1918)**: Cuộc chiến tranh đế quốc phi nghĩa giữa hai khối quân sự: khối Hiệp ước (Anh, Pháp, Nga) và khối Liên minh (Đức, Áo-Hung). Gây tổn thất khổng lồ về người và của.
*   **Cách mạng tháng Mười Nga (1917)**: Do Lênin và Đảng Bolshevik lãnh đạo. Lật đổ Chính phủ lâm thời tư sản, lập ra chính quyền Xô viết của công - nông - binh. Nga rút khỏi chiến tranh thế giới thứ nhất.
*   **Chiến tranh thế giới thứ hai (1939-1945)**: Cuộc chiến giữa phe Đồng minh (Liên Xô, Mĩ, Anh) và phe Phát xít (Đức, Ý, Nhật). Kết thúc với sự sụp đổ hoàn toàn của chủ nghĩa phát xít.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tính chất của hai cuộc chiến tranh thế giới**:
    *   Chiến tranh thế giới thứ nhất: Hoàn toàn phi nghĩa từ cả hai phía tranh giành thuộc địa (trừ giai đoạn cuối đối với nước Nga sau Cách mạng tháng Mười).
    *   Chiến tranh thế giới thứ hai: Ban đầu là chiến tranh đế quốc phi nghĩa, nhưng từ khi Liên Xô tham chiến (6/1941), cuộc chiến trở thành chiến tranh chính nghĩa chống phát xít bảo vệ hòa bình nhân loại.
*   *Mẹo*: Để nhớ sự kiện kết thúc CTTG 2: ngày 15/8/1945 Nhật Bản tuyên bố đầu hàng không điều kiện, tạo thời cơ chín muồi (thời cơ vàng) cho nhân dân Việt Nam nổi dậy giành chính quyền trong Cách mạng tháng Tám.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Câu hỏi tự luận**: Phân tích ý nghĩa thời cơ của sự kiện phát xít Nhật đầu hàng Đồng minh đối với sự bùng nổ của Cách mạng tháng Tám năm 1945 ở Việt Nam.
    *   *Giải*:
        1. Thời cơ xuất hiện: Khi Nhật đầu hàng Đồng minh (15/8/1945), quân Nhật ở Đông Dương hoang mang cực độ, chính quyền bù nhìn Trần Trọng Kim rệu rã. Quân Đồng minh (Anh, Tưởng) chưa kịp vào giải giáp quân Nhật.
        2. Đây là thời cơ thuận lợi nhất trong lịch sử ('thời cơ nghìn năm có một') để ta nổi dậy giành chính quyền với tư cách là chủ nhân đất nước trước khi quân Đồng minh kéo vào.`
      },
      {
        chapterId: 'h11_ch3',
        title: 'Bài giảng Chương 3: Việt Nam từ năm 1858 đến đầu thế kỷ XX',
        basic: `### Lý thuyết nền tảng
*   **Pháp xâm lược Việt Nam**: Ngày 1/9/1858, Pháp nổ súng tấn công bán đảo Đà Nẵng, chính thức xâm lược Việt Nam. Triều đình Nguyễn từng bước nhu nhược ký các hiệp ước đầu hàng (Nhâm Tuất 1862, Giáp Tuất 1874, Hácmăng 1883, Patơnốt 1884), biến Việt Nam thành nước thuộc địa nửa phong kiến.
*   **Phong trào Cần vương (1885-1896)**: Vua Hàm Nghi và Tôn Thất Thuyết xuống chiếu Cần vương kêu gọi nhân dân giúp vua cứu nước. Gồm 2 giai đoạn, kết thúc sau khi khởi nghĩa Hương Khê thất bại (1896).
*   **Phong trào yêu nước đầu thế kỷ XX**:
    *   *Xu hướng bạo động (Phan Bội Châu)*: Thành lập Duy tân hội, tổ chức phong trào Đông Du sang Nhật Bản học tập quân sự.
    *   *Xu hướng cải cách (Phan Châu Trinh)*: Tổ chức phong trào Duy tân ở Trung Kỳ, cổ vũ 'chấn dân khí, khai dân trí, hậu dân sinh', phê phán hủ tục phong kiến.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Nguyên nhân thất bại của phong trào Cần vương**:
    *   Thiếu một giai cấp tiên tiến lãnh đạo với đường lối khoa học đúng đắn (vẫn đi theo con đường phong kiến lỗi thời).
    *   Thiếu sự liên kết thống nhất giữa các cuộc khởi nghĩa trên toàn quốc, dễ bị Pháp cô lập và bẻ gãy từng bộ phận.
*   *Mẹo*: Để phân biệt xu hướng của hai cụ Phan: cụ Phan Bội Châu chủ trương 'Dùng bạo lực để giành độc lập' (hướng ngoại cậy nhờ Nhật), cụ Phan Châu Trinh chủ trương 'Cải cách để tự cường' (dựa vào Pháp để lật đổ phong kiến lạc hậu trước).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Câu hỏi tự luận**: Phân tích những hạn chế lớn nhất trong con đường cứu nước của cụ Phan Bội Châu đầu thế kỷ XX.
    *   *Giải*:
        1. Hạn chế lớn nhất là chưa nhận rõ bản chất của các nước đế quốc. Việc cụ chủ trương cậy nhờ đế quốc Nhật Bản (đồng minh của Pháp sau này) để đánh Pháp thực chất là hành động nguy hiểm giống như 'đuổi cọp cửa trước, rước beo cửa sau'.
        2. Khi Nhật Bản ký hiệp ước với Pháp trục xuất toàn bộ du học sinh Việt Nam về nước (1909), phong trào Đông Du hoàn toàn tan rã.`
      }
    ],
    introduction: `### 1. Giới thiệu môn học
Lịch sử 11 đi sâu vào các sự kiện cận đại có tầm ảnh hưởng lớn: sự hình thành chủ nghĩa tư bản độc quyền, các cuộc chiến tranh thế giới đau thương và đặc biệt là nửa thế kỷ kháng chiến chống Pháp đầy gian khổ của nhân dân Việt Nam.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Khoảng 10% tổng số câu hỏi trong đề thi (khoảng 4 câu).
*   **Bảng phân bố mức độ**:
| Chuyên đề | Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao |
| :--- | :---: | :---: | :---: | :---: |
| Cách mạng tư sản & CTTG | 1 câu | 0 | 0 | 0 |
| Việt Nam chống Pháp 1858-1884 | 1 câu | 1 câu | 0 | 0 |
| Phong trào yêu nước đầu XX | 0 | 1 câu | 0 | 0 |

### 3. Lộ trình học tập chi tiết
*   **Bước 1: Nắm chắc các hiệp ước nhà Nguyễn**: Ghi nhớ thứ tự 4 hiệp ước đầu hàng (1862 -> 1874 -> 1883 -> 1884).
*   **Bước 2: Học thuộc các cuộc khởi nghĩa Cần vương**: Học kỹ 3 cuộc khởi nghĩa lớn: Ba Đình, Bãi Sậy, Hương Khê (Khởi nghĩa Hương Khê là tiêu biểu nhất).
*   **Bước 3: So sánh hai xu hướng cứu nước đầu XX**: Luyện tập làm các câu hỏi trắc nghiệm so sánh chủ trương của Phan Bội Châu và Phan Châu Trinh.`
  }),

  // ================= LỊCH SỬ LỚP 12 =================
  history_12: makeContext({
    title: 'Lịch sử 12 - Lịch sử Việt Nam từ 1919 đến nay & Thế giới hiện đại',
    author: 'Nhà xuất bản Giáo dục Việt Nam',
    totalPages: 240,
    description: 'Trật tự hai cực Ianta, sự hình thành Liên Hợp Quốc, phong trào giải phóng dân tộc Á - Phi - Mỹ Latinh, quan hệ quốc tế trong Chiến tranh lạnh, Lịch sử Việt Nam từ 1919 đến nay.',
    chapters: [
      { id: 'h12_ch1', title: 'Chương 1: Lịch sử thế giới hiện đại (1945 đến nay)', pages: '1-60', content: 'Hội nghị Ianta, sự ra đời của Liên Hợp Quốc, Chiến tranh lạnh, sự sụp đổ của LX và xu thế toàn cầu hóa.' },
      { id: 'h12_ch2', title: 'Chương 2: Việt Nam từ năm 1919 đến năm 1954', pages: '61-150', content: 'Khai thác thuộc địa lần 2, thành lập Đảng, cách mạng tháng Tám 1945, cuộc kháng chiến chống Pháp xâm lược.' },
      { id: 'h12_ch3', title: 'Chương 3: Việt Nam từ năm 1954 đến nay', pages: '151-240', content: 'Kháng chiến chống Mĩ cứu nước (1954-1975), xây dựng CNXH ở miền Bắc, giải phóng miền Nam và Đổi mới đất nước.' }
    ],
    lectures: [
      {
        chapterId: 'h12_ch1',
        title: 'Bài giảng Chương 1: Trật tự thế giới sau Chiến tranh thế giới thứ hai',
        basic: `### Lý thuyết nền tảng
*   **Hội nghị Ianta (2/1945)**: Gồm 3 cường quốc Liên Xô, Mĩ, Anh họp tại Ianta để phân chia khu vực đóng quân và tầm ảnh hưởng sau chiến tranh. Hình thành nên trật tự thế giới hai cực Ianta do Mĩ và Liên Xô đứng đầu.
*   **Liên Hợp Quốc (LHQ)**: Thành lập năm 1945 nhằm duy trì hòa bình và an ninh thế giới. Cơ quan giữ vai trò trọng yếu là Hội đồng Bảo an (gồm 5 nước ủy viên thường trực có quyền phủ quyết: Mĩ, Anh, Pháp, Nga, Trung Quốc).
*   **Chiến tranh lạnh (1947-1989)**: Sự đối đầu căng thẳng về mọi mặt chính trị, quân sự, ngoại giao giữa hai khối Đông (XHCN) và Tây (TBCN) nhưng không xảy ra xung đột quân sự trực tiếp giữa 2 siêu cường.
*   **Xu thế Toàn cầu hóa**: Bắt đầu từ những năm 80 của thế kỷ XX, là hệ quả của cuộc cách mạng khoa học kỹ thuật hiện đại, gắn kết chặt chẽ kinh tế thế giới nhưng cũng làm gia tăng khoảng cách giàu nghèo.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tư duy về vai trò của Liên Hợp Quốc**:
    *   LHQ không phải là một chính phủ thế giới mà là một diễn đàn đa phương giúp ngăn ngừa các cuộc chiến tranh thế giới mới.
    *   Nguyên tắc hoạt động quan trọng nhất là: *Sự nhất trí giữa 5 nước lớn ủy viên thường trực Hội đồng Bảo an*. Nếu một nước bỏ phiếu chống, nghị quyết sẽ không được thông qua.
*   *Mẹo*: Sự sụp đổ của trật tự Ianta gắn liền với sự sụp đổ của chế độ XHCN ở Liên Xô và Đông Âu năm 1991, đưa thế giới chuyển dịch sang xu thế đa cực đa trung tâm.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Câu hỏi tự luận**: Giải thích tại sao nói xu thế toàn cầu hóa vừa là thời cơ vừa là thách thức lớn đối với các nước đang phát triển như Việt Nam?
    *   *Giải*:
        1. Thời cơ: Giúp tiếp cận nguồn vốn đầu tư nước ngoài, công nghệ sản xuất tiên tiến, thị trường xuất khẩu rộng mở và học hỏi kinh nghiệm quản lý hiện đại.
        2. Thách thức: Nguy cơ tụt hậu xa hơn về kinh tế nếu không bắt kịp nhịp độ; cạnh tranh thị trường gay gắt ép chết doanh nghiệp nội địa yếu; nguy cơ đánh mất bản sắc văn hóa dân tộc trước luồng văn hóa ngoại lai xâm nhập.`
      },
      {
        chapterId: 'h12_ch2',
        title: 'Bài giảng Chương 2: Lịch sử Việt Nam từ năm 1919 đến năm 1945',
        basic: `### Lý thuyết nền tảng
*   **Khai thác thuộc địa lần 2 của Pháp (1919-1929)**: Đầu tư mạnh vào nông nghiệp (đồn điền cao su) và khai mỏ (than đá) làm cơ cấu kinh tế biến đổi, xuất hiện các giai cấp mới: giai cấp tiểu tư sản, giai cấp tư sản dân tộc và sự lớn mạnh của giai cấp công nhân.
*   **Nguyễn Ái Quốc và việc tìm đường cứu nước**: Đến với chủ nghĩa Mác-Lênin năm 1920. Sáng lập Hội Việt Nam Cách mạng Thanh niên (1925) truyền bá lý luận giải phóng dân tộc về nước. Chủ trì thành lập Đảng Cộng sản Việt Nam (1930).
*   **Cách mạng tháng Tám năm 1945**: Diễn ra nhanh chóng giành thắng lợi rực rỡ chỉ trong vòng 15 ngày trên toàn quốc nhờ sự chuẩn bị chu đáo 15 năm (qua 3 đợt tập dượt: 1930-1931, 1936-1939, 1939-1945) và nắm bắt đúng thời cơ chín muồi.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **So sánh Cương lĩnh chính trị đầu tiên (2/1930) và Luận cương chính trị (10/1930)**:
    *   *Cương lĩnh chính trị (Nguyễn Ái Quốc)*: Xác định đúng nhiệm vụ số 1 là giải phóng dân tộc, đánh giá đúng khả năng cách mạng của giai cấp tư sản dân tộc và tiểu tư sản $\\to$ Rất đúng đắn và sáng tạo.
    *   *Luận cương chính trị (Trần Phú)*: Đặt nhiệm vụ cách mạng ruộng đất ngang hàng giải phóng dân tộc, đánh giá chưa đúng khả năng cách mạng của các giai cấp trung gian $\\to$ Có phần giáo điều, máy móc sau này được khắc phục.
*   *Mẹo*: Ba đợt tập dượt của Cách mạng tháng Tám là phong trào cách mạng 1930-1931, phong trào dân chủ 1936-1939 và phong trào giải phóng dân tộc 1939-1945.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Câu hỏi tự luận**: Phân tích những bài học kinh nghiệm quý giá từ thắng lợi của Cách mạng tháng Tám năm 1945.
    *   *Giải*:
        1. Bài học về sự lãnh đạo của Đảng: Phải có đường lối đúng đắn, xây dựng khối liên minh công nông vững chắc làm nòng cốt.
        2. Bài học về nghệ thuật khởi nghĩa: Kết hợp nhuần nhuyễn giữa đấu tranh chính trị với đấu tranh vũ trang, giữa khởi nghĩa nông thôn với thành thị.
        3. Bài học về chớp thời cơ: Phải chuẩn bị lực lượng chu đáo để khi thời cơ đến lập tức hành động giành thắng lợi quyết định nhanh nhất.`
      },
      {
        chapterId: 'h12_ch3',
        title: 'Bài giảng Chương 3: Cuộc kháng chiến chống Mĩ cứu nước (1954-1975)',
        basic: `### Lý thuyết nền tảng
*   **Chiến lược Chiến tranh đặc biệt (1961-1965)**: Mĩ dùng quân đội Sài Gòn làm chủ lực dưới sự chỉ huy của cố vấn Mĩ và phương tiện chiến tranh tối tân. Thủ đoạn chính: Dồn dân lập 'Ấp chiến lược' để cách ly quân dân ta.
*   **Chiến lược Chiến tranh cục bộ (1965-1968)**: Mĩ đưa trực tiếp quân viễn chinh Mĩ và đồng minh vào chiến đấu trực tiếp làm nòng cốt. Tiến hành các cuộc hành quân tìm diệt và bình định vào vùng căn cứ cách mạng.
*   **Chiến lược Việt Nam hóa chiến tranh (1969-1973)**: Mĩ rút dần quân Mĩ, tăng cường quân đội Sài Gòn tự gánh vác chiến tranh phối hợp không quân Mĩ yểm trợ. Mở rộng chiến tranh ra toàn Đông Dương.
*   **Cuộc Tổng tiến công và nổi dậy Xuân 1975**: Gồm 3 chiến dịch lớn: Chiến dịch Tây Nguyên (mở đầu đột phá) $\\to$ Chiến dịch Huế - Đà Nẵng $\\to$ Chiến dịch Hồ Chí Minh (giải phóng hoàn toàn miền Nam ngày 30/4/1975).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phân tích bước ngoặt chiến lược của Hiệp định Paris (1973)**:
    *   Hiệp định buộc Mĩ phải rút hết quân viễn chinh về nước, chấm dứt can thiệp quân sự trực tiếp $\\to$ Ta hoàn thành mục tiêu 'đánh cho Mĩ cút'.
    *   Tương quan lực lượng trên chiến trường thay đổi có lợi hoàn toàn cho cách mạng $\\to$ Tạo tiền đề vững chắc thực hiện mục tiêu 'đánh cho Ngụy nhào' năm 1975.
*   *Mẹo*: Để nhớ vai trò của các chiến dịch Xuân 1975: Tây Nguyên là chiến dịch mở màn đánh vào điểm yếu sơ hở nhất của địch (Buôn Ma Thuột), Huế - Đà Nẵng giải phóng miền Trung, Hồ Chí Minh là chiến dịch quyết định giải phóng Sài Gòn.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Câu hỏi tự luận**: So sánh điểm giống nhau cơ bản giữa các chiến lược chiến tranh của Mĩ ở miền Nam Việt Nam giai đoạn 1961 - 1973.
    *   *Giải*:
        1. Về mục đích: Đều nhằm biến miền Nam Việt Nam thành thuộc địa kiểu mới và căn cứ quân sự của Mĩ ở Đông Nam Á, chia cắt lâu dài đất nước ta.
        2. Về bản chất: Đều là chiến tranh xâm lược thực dân kiểu mới của đế quốc Mĩ.
        3. Về nguồn lực: Đều dựa vào viện trợ quân sự, tài chính khổng lồ của Mĩ, dưới sự chỉ đạo của hệ thống cố vấn Mĩ và sử dụng phương tiện chiến tranh hiện đại bậc nhất.`
      }
    ],
    introduction: `### 1. Giới thiệu môn học
Lịch sử 12 là môn học có dung lượng kiến thức lớn nhất và quan trọng nhất trong kỳ thi tốt nghiệp THPT Quốc gia, bao quát toàn bộ lịch sử thế giới hiện đại và lịch sử cách mạng Việt Nam từ năm 1919 đến nay.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Chiếm 80% - 85% tổng số câu hỏi trong đề thi môn Lịch sử (khoảng 32 - 34 câu).
*   **Bảng phân bố mức độ**:
| Chuyên đề chính | Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao |
| :--- | :---: | :---: | :---: | :---: |
| Lịch sử thế giới sau 1945 | 6 câu | 2 câu | 0 | 0 |
| Việt Nam giai đoạn 1919-1930 | 4 câu | 2 câu | 1 câu | 0 |
| Việt Nam giai đoạn 1930-1945 | 4 câu | 3 câu | 1 câu | 1 câu (So sánh/Ý nghĩa) |
| Việt Nam giai đoạn 1945-1954 | 4 câu | 2 câu | 1 câu | 0 |
| Việt Nam giai đoạn 1954-1975 | 4 câu | 3 câu | 1 câu | 1 câu (So sánh chiến lược) |

### 3. Lộ trình học tập chi tiết
*   **Giai đoạn 1: Nắm chắc tiến trình Lịch sử Việt Nam (Tháng 8 - 12)**: Học kỹ các mốc lịch sử lớn từ 1919 đến 1975 theo sơ đồ trục thời gian.
*   **Giai đoạn 2: Luyện tập các dạng câu hỏi so sánh (Tháng 1 - 3)**: So sánh các chiến dịch lớn (Biên giới 1950, Điện Biên Phủ 1954, các chiến dịch Xuân 1975).
*   **Giai đoạn 3: Luyện đề và quét sạch lý thuyết thế giới (Tháng 4 - 6)**: Tận dụng các câu hỏi lịch sử thế giới (Ianta, ASEAN, Liên Hợp Quốc) để lấy trọn điểm nhận biết.`
  }),

  // ================= NGỮ VĂN LỚP 10 =================
  literature_10: makeContext({
    title: 'Ngữ văn 10 - Văn học dân gian, trung đại và Nghị luận xã hội',
    author: 'Nhà xuất bản Giáo dục Việt Nam',
    totalPages: 160,
    description: 'Văn học dân gian (Sử thi, truyền thuyết), thơ văn trung đại (Nguyễn Trãi, Nguyễn Du) và kỹ năng viết bài nghị luận văn học & xã hội lớp 10.',
    chapters: [
      { id: 'l10_ch1', title: 'Chương 1: Sử thi và văn học dân gian Việt Nam', pages: '1-45', content: 'Sử thi Đăm Săn (trích Chiến thắng Mtao Mxây), truyện cổ tích, ca dao dân ca Việt Nam.' },
      { id: 'l10_ch2', title: 'Chương 2: Thơ văn trung đại tiêu biểu', pages: '46-95', content: 'Cảnh ngày hè (Nguyễn Trãi), Tỏ lòng (Phạm Ngũ Lão), Nhàn (Nguyễn Bỉnh Khiêm).' },
      { id: 'l10_ch3', title: 'Chương 3: Kiệt tác Truyện Kiều và kĩ năng làm văn nghị luận', pages: '96-160', content: 'Đoạn trích Trao duyên, Chí khí anh hùng. Cách viết bài văn nghị luận xã hội và văn học.' }
    ],
    lectures: [
      {
        chapterId: 'l10_ch1',
        title: 'Bài giảng Chương 1: Sử thi và văn học dân gian Việt Nam',
        basic: `### Lý thuyết nền tảng
*   **Văn học dân gian**: Là những tác phẩm nghệ thuật ngôn từ truyền miệng do nhân dân lao động sáng tạo, tập thể truyền bá từ đời này sang đời khác.
*   **Sử thi**: Là thể loại tác phẩm tự sự dân gian có quy mô lớn, ngôn ngữ có vần nhịp, miêu tả những sự kiện lịch sử trọng đại liên quan đến vận mệnh của toàn bộ cộng đồng.
*   **Sử thi Đăm Săn (Chiến thắng Mtao Mxây)**:
    *   *Nội dung*: Kể về cuộc chiến đấu oai hùng của tù trưởng Đăm Săn đánh bại tù trưởng Mtao Mxây độc ác để cứu người vợ Hơ Nhị bị bắt cóc, giành lại danh dự và sự giàu có cho buôn làng.
    *   *Nghệ thuật*: Sử dụng biện pháp phóng đại, so sánh trùng điệp, nhịp điệu hùng tráng đậm chất Tây Nguyên.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phân tích nghệ thuật phóng đại trong sử thi**:
    *   Mọi hành động của Đăm Săn (múa khiên, chạy nhảy) đều được miêu tả vượt quá giới hạn người thường, liên hệ trực tiếp với các hiện tượng thiên nhiên kỳ vĩ (như bão lốc, sấm chớp).
    *   Điều này không phải là dối trá mà nhằm tôn vinh vẻ đẹp anh hùng lý tưởng đại diện cho sức mạnh và khát vọng của toàn thể cộng đồng.
*   *Mẹo*: Khi phân tích nhân vật anh hùng sử thi, hãy tập trung vào mối quan hệ khăng khít giữa anh hùng và cộng đồng (buôn làng ăn mừng, ca ngợi sau chiến thắng).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Câu hỏi phân tích**: Nêu ý nghĩa của hình ảnh Đăm Săn múa khiên trong trận chiến đấu với Mtao Mxây.
    *   *Giải*:
        1. Khẳng định tài năng quân sự xuất sắc và sức mạnh phi thường của Đăm Săn vượt trội hoàn toàn so với kẻ thù hèn nhát Mtao Mxây.
        2. Tác giả dân gian ví mỗi bước múa khiên của Đăm Săn như gió lốc thổi bay nhà cửa, làm rung chuyển cả núi rừng.
        3. Hình ảnh thể hiện lòng tự hào dân tộc, sự ngưỡng mộ tuyệt đối của nhân dân Tây Nguyên dành cho vị thủ lĩnh anh hùng bảo vệ buôn làng.`
      },
      {
        chapterId: 'l10_ch2',
        title: 'Bài giảng Chương 2: Thơ văn trung đại Việt Nam',
        basic: `### Lý thuyết nền tảng
*   **Thơ Đường luật**: Thể thơ chữ Hán gò bó về luật, niêm, vần, đối (thất ngôn bát cú hoặc thất ngôn tứ tuyệt).
*   **Cảnh ngày hè (Nguyễn Trãi)**:
    *   *Nội dung*: Bức tranh thiên nhiên mùa hè đầy sức sống, sinh động (màu xanh của hòe, hồng của sen, vàng của mặt trời chiều). Tấm lòng lo cho dân cho nước thiết tha cuối bài thơ ('Dân giàu đủ khắp đòi phương').
    *   *Nghệ thuật*: Sử dụng câu thơ lục ngôn xen kẽ thất ngôn, từ láy tượng hình sinh động.
*   **Tỏ lòng (Phạm Ngũ Lão)**:
    *   *Nội dung*: Khắc họa chân dung người anh hùng tráng sĩ thời Trần cầm giáo bảo vệ đất nước, thể hiện hào khí Đông A oai hùng và chí làm trai phụng sự tổ quốc.
    *   *Nghệ thuật*: Ngôn ngữ hàm súc, hình tượng thơ kỳ vĩ mang tầm vóc vũ trụ.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tư duy phân tích thơ Nôm của Nguyễn Trãi**:
    *   Thơ Nôm Nguyễn Trãi phá vỡ tính quy phạm nghiêm ngặt của thơ Đường luật bằng cách chèn các câu thơ lục ngôn (6 chữ) vào bài thơ 7 chữ, tạo nhịp điệu thuần Việt, mộc mạc và gần gũi với đời sống dân dã.
*   *Mẹo*: Chí làm trai ('nợ công danh') theo quan niệm phong kiến là nghĩa vụ cống hiến cho dân tộc, lập nên chiến công lưu danh sử sách, khác với ham muốn tiền tài ích kỷ.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Câu hỏi phân tích**: Cảm nhận về tấm lòng ưu ái với dân với nước của Nguyễn Trãi qua câu kết bài thơ 'Cảnh ngày hè': 'Dẽ có ngu cầm đàn một tiếng / Dân giàu đủ khắp đòi phương'.
    *   *Giải*:
        1. Ước nguyện thiết tha: Tác giả mong mỏi có được chiếc đàn của vua Thuấn (ngu cầm) gảy lên một tiếng nhạc ca ngợi sự thái bình thịnh trị.
        2. Tâm nguyện cốt lõi: Mong sao cho người dân ở mọi miền đất nước luôn được ấm no, hạnh phúc, giàu sang. Đó chính là cốt lõi tư tưởng nhân nghĩa lo cho dân trước khi lo cho mình của Nguyễn Trãi.`
      },
      {
        chapterId: 'l10_ch3',
        title: 'Bài giảng Chương 3: Trao duyên & Chí khí anh hùng trong Truyện Kiều',
        basic: `### Lý thuyết nền tảng
*   **Trao duyên (trích Truyện Kiều)**:
    *   *Nội dung*: Kiều dùng lời lẽ khẩn khoản, kính cẩn thuyết phục Thúy Vân nhận lời kết duyên với Kim Trọng thay mình. Sự giằng xé nội tâm đau đớn của Kiều giữa chữ hiếu và chữ tình, nhận mình là người bạc mệnh.
    *   *Nghệ thuật*: Nghệ thuật miêu tả nội tâm nhân vật sâu sắc, ngôn ngữ đối thoại tinh tế.
*   **Chí khí anh hùng (trích Truyện Kiều)**:
    *   *Nội dung*: Khắc họa nhân vật Từ Hải - người anh hùng trượng nghĩa, có khát vọng tự do và ý chí vẫy vùng bốn bể lớn lao, từ biệt Thúy Kiều ra đi lập nghiệp lớn.
    *   *Nghệ thuật*: Sử dụng các từ ngữ ước lệ trang trọng tôn vinh tầm vóc anh hùng kỳ vĩ.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phân tích sự giằng xé nội tâm của Kiều trong Trao duyên**:
    *   Kiều trao duyên (tình cảm với Kim Trọng) cho Vân nhưng lại giữ lại những kỷ vật (chiếc vành, bức tờ thư) thể hiện sự mâu thuẫn đau đớn: trao duyên nhưng không thể trao đi tình yêu sâu nặng trong tâm hồn mình.
*   *Mẹo*: Khi làm văn nghị luận xã hội lớp 10, cần tuân thủ cấu trúc 5 bước: Giải thích khái niệm $\\to$ Phân tích biểu hiện $\\to$ Nêu ý nghĩa/tác dụng $\\to$ Phản đề (lật ngược vấn đề) $\\to$ Liên hệ bản thân rút ra bài học.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Câu hỏi**: Phân tích nghệ thuật sử dụng từ ngữ của Nguyễn Du trong hai câu thơ đầu đoạn trích Trao duyên: 'Cậy em em có chịu lời / Ngồi lên cho chị lạy rồi sẽ thưa'.
    *   *Giải*:
        1. Từ 'cậy': Chứa đựng sự hy vọng gửi gắm thiết tha, tin tưởng tuyệt đối, nặng nề hơn từ 'nhờ' thông thường.
        2. Từ 'chịu': Buộc Thúy Vân vào thế không thể từ chối vì mang tính cam chịu, nhận lời giúp đỡ một việc khó khăn.
        3. Hành động 'lạy', 'thưa': Đảo lộn trật tự chị - em thông thường để thể hiện lòng tôn kính biết ơn của Kiều trước sự hy sinh lớn lao của em.`
      }
    ],
    introduction: `### 1. Giới thiệu môn học
Ngữ văn 10 mở đầu cấp THPT bằng việc làm quen với các thể loại tự sự dân gian lớn (sử thi, truyền thuyết), học các áng văn học trung đại đặc sắc và xây dựng kỹ năng làm bài văn nghị luận xã hội vững vàng.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Xuất hiện dưới dạng các câu hỏi trong phần Đọc hiểu hoặc chọn ngữ liệu nghị luận xã hội chiếm khoảng 5% tổng điểm thi.
*   **Bảng phân bố mức độ**:
| Phần thi | Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao |
| :--- | :---: | :---: | :---: | :---: |
| Đọc hiểu văn bản | 1 câu | 1 câu | 0 | 0 |
| Nghị luận xã hội | 0 | 0 | 1 đoạn văn | 0 |
| Nghị luận văn học | 0 | 0 | 0 | 0 |

### 3. Lộ trình học tập chi tiết
*   **Bước 1: Học kỹ các giá trị của Truyện Kiều**: Nắm vững nghệ thuật tả cảnh ngụ tình, tả người bằng bút pháp ước lệ tượng trưng và tả nội tâm nhân vật.
*   **Bước 2: Luyện viết đoạn văn 200 chữ**: Rèn luyện cách viết mở đoạn trực tiếp đi thẳng vào vấn đề nghị luận xã hội.
*   **Bước 3: Lập bảng tóm tắt thơ trung đại**: Nhớ rõ hoàn cảnh sáng tác và tư tưởng nhân nghĩa yêu dân của Nguyễn Trãi.`
  }),

  // ================= NGỮ VĂN LỚP 11 =================
  literature_11: makeContext({
    title: 'Ngữ văn 11 - Văn học hiện đại và Bi kịch hiện thực',
    author: 'Nhà xuất bản Giáo dục Việt Nam',
    totalPages: 172,
    description: 'Văn học hiện đại Việt Nam giai đoạn 1930 - 1945 (Nguyễn Tuân, Thạch Lam, Nam Cao, Xuân Diệu, Huy Cận) và các kỹ năng nghị luận nâng cao.',
    chapters: [
      { id: 'l11_ch1', title: 'Chương 1: Các trào lưu Thơ mới lãng mạn', pages: '1-50', content: 'Vội vàng (Xuân Diệu), Tràng giang (Huy Cận), Đây thôn Vĩ Dạ (Hàn Mặc Tử).' },
      { id: 'l11_ch2', title: 'Chương 2: Văn xuôi hiện thực và chủ nghĩa nhân đạo', pages: '51-110', content: 'Chí Phèo (Nam Cao), Hai đứa trẻ (Thạch Lam), Chữ người tử tù (Nguyễn Tuân).' },
      { id: 'l11_ch3', title: 'Chương 3: Nghị luận văn học nâng cao lớp 11', pages: '111-172', content: 'Phân tích nhân vật, so sánh tác phẩm văn học hiện đại và cách viết bài văn nghị luận xã hội nâng cao.' }
    ],
    lectures: [
      {
        chapterId: 'l11_ch1',
        title: 'Bài giảng Chương 1: Phong trào Thơ mới lãng mạn',
        basic: `### Lý thuyết nền tảng
*   **Phong trào Thơ mới (1932-1945)**: Cuộc cách mạng trong thi ca Việt Nam giải phóng cái tôi trữ tình cá nhân khỏi xiềng xích quy phạm của thơ cổ điển trung đại.
*   **Vội vàng (Xuân Diệu)**:
    *   *Nội dung*: Tình yêu cuộc sống trần thế say đắm, nồng nhiệt, khát vọng tắt nắng buộc gió để níu giữ vẻ đẹp mùa xuân tuổi trẻ và triết lý sống vội vàng, tận hưởng ý nghĩa thời gian.
    *   *Nghệ thuật*: Giàu nhạc điệu, sử dụng nhiều hình ảnh so sánh mới mẻ táo bạo ('tháng giêng ngon như một cặp môi gần').
*   **Tràng giang (Huy Cận)**:
    *   *Nội dung*: Nỗi sầu cô đơn của cái tôi nhỏ bé trước thiên nhiên sông nước vũ trụ mênh mông vô biên, bộc lộ lòng yêu quê hương đất nước thầm kín.
    *   *Nghệ thuật*: Sự kết hợp hài hòa giữa yếu tố cổ điển Đường luật và tinh thần hiện đại Thơ mới.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tư duy về cái Tôi trong Thơ mới**:
    *   Cái tôi Thơ mới mang màu sắc cá nhân tự ý thức, vừa đầy khát vọng tự do nhưng cũng trĩu nặng nỗi buồn cô đơn vì thiếu chỗ dựa trong xã hội thực dân cũ.
*   *Mẹo*: Để phân biệt giọng điệu: Xuân Diệu luôn cuống quýt, cuồng nhiệt yêu đời yêu người; còn Huy Cận mang sầu vũ trụ, u trầm lắng đọng trước không gian sông nước bao la.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Câu hỏi phân tích**: Hãy chỉ ra tính chất cổ điển và hiện đại đan xen trong hai câu thơ của Huy Cận: 'Lòng quê dợn dợn vời con nước / Không khói hoàng hôn cũng nhớ nhà'.
    *   *Giải*:
        1. Tính cổ điển: Lấy ý từ câu thơ nổi tiếng của Thôi Hiệu trong bài Hoàng Hạc Lâu ('Nhật mộ hương quan hà xứ thị / Yên ba giang thượng sử nhân sầu' - Trên sông khói sóng cho buồn lòng ai).
        2. Tính hiện đại: Thôi Hiệu nhìn khói sóng trên sông mới nhớ nhà; còn Huy Cận không cần khói sóng ('Không khói hoàng hôn') vẫn tự dâng trào nỗi nhớ nhà da diết, thể hiện nỗi cô đơn thường trực của cái tôi cá nhân tự ý thức.`
      },
      {
        chapterId: 'l11_ch2',
        title: 'Bài giảng Chương 2: Văn xuôi hiện thực và chủ nghĩa nhân đạo',
        basic: `### Lý thuyết nền tảng
*   **Chí Phèo (Nam Cao)**:
    *   *Nội dung*: Bi kịch của người nông dân nghèo bị lưu manh hóa, cự tuyệt quyền làm người lương thiện trong xã hội cũ. Sự thức tỉnh nhân tính nhờ tình thương của Thị Nở.
    *   *Nghệ thuật*: Nghệ thuật xây dựng nhân vật xuất sắc, thay đổi điểm nhìn trần thuật đa dạng linh hoạt.
*   **Chữ người tử tù (Nguyễn Tuân)**:
    *   *Nội dung*: Sự chiến thắng của cái đẹp, cái thiện và thiên lương cao cả trước bóng tối ngục tù bạo lực thông qua cảnh cho chữ xưa nay chưa từng có.
    *   *Nghệ thuật*: Giàu chất họa, chất kịch, ngôn ngữ cổ kính sang trọng đầy chất tạo hình.
*   **Hai đứa trẻ (Thạch Lam)**:
    *   *Nội dung*: Cuộc sống mỏi mòn, nghèo nàn của người dân phố huyện nghèo và khát vọng mơ hồ của hai chị em Liên hướng về chuyến tàu đêm mang ánh sáng rực rỡ từ Hà Nội qua.
    *   *Nghệ thuật*: Truyện ngắn không có cốt truyện gay cấn, giàu chất thơ và đi sâu miêu tả cảm giác tinh tế.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phân tích bi kịch tha hóa và lưu manh hóa trong Chí Phèo**:
    *   Chí Phèo sinh ra lương thiện, nhưng nhà tù thực dân đã biến anh từ người hiền lành thành con quỷ dữ.
    *   Bá Kiến lợi dụng biến anh thành tay sai đâm thuê chém mướn. Chí bị cướp đi cả nhân hình (vết rạch dọc ngang) lẫn nhân tính (chìm trong những cơn say vô tận).
*   *Mẹo*: Khi phân tích nhân vật Huấn Cao, luôn liên hệ giữa cái Tài (chữ đẹp) và cái Tâm/Thiên lương (chỉ cho chữ người tri kỷ biết quý cái đẹp) để thấy được sự thống nhất trong quan niệm thẩm mỹ của Nguyễn Tuân.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Câu hỏi**: Phân tích ý nghĩa chi tiết bát cháo hành của Thị Nở chăm sóc Chí Phèo.
    *   *Giải*:
        1. Về mặt hiện thực: Là phương thuốc giải cảm thông thường giúp Chí Phèo tỉnh táo sau trận ốm và cơn say dài.
        2. Về mặt nhân đạo: Biểu tượng của tình thương ấm áp chân thành không vụ lợi duy nhất Chí Phèo nhận được trong đời.
        3. Tác dụng thức tỉnh: Đánh thức phần người bị vùi lấp của Chí, thắp lên khát khao làm hòa với mọi người và được sống lương thiện bình dị.`
      }
    ],
    introduction: `### 1. Giới thiệu môn học
Ngữ văn 11 tập trung vào giai đoạn văn học đỉnh cao 1930 - 1945, phản ánh sâu sắc cuộc đấu tranh tư tưởng nghệ thuật giữa lãng mạn Thơ mới và hiện thực phê phán nhân đạo cứu cánh con người lao động.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Xuất hiện trong câu hỏi nghị luận văn học hoặc so sánh tác phẩm chiếm khoảng 10% - 15% tổng điểm thi tốt nghiệp.
*   **Bảng phân bố mức độ**:
| Chuyên đề chính | Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao |
| :--- | :---: | :---: | :---: | :---: |
| Thơ mới lãng mạn (Xuân Diệu/Huy Cận) | 1 câu | 1 câu | 0 | 0 |
| Văn xuôi hiện thực (Nam Cao/Nguyễn Tuân) | 1 câu | 1 câu | 1 câu (So sánh) | 0 |

### 3. Lộ trình học tập chi tiết
*   **Giai đoạn 1: Nắm chắc tác phẩm Chí Phèo (Tháng 9 - 11)**: Học kỹ các giai đoạn cuộc đời Chí và bi kịch bị cự tuyệt quyền làm người cuối truyện.
*   **Giai đoạn 2: Đọc hiểu chất thơ của Thạch Lam (Tháng 12 - 2)**: Luyện tập viết các đoạn văn cảm nhận về bức tranh chiều tối và hình ảnh chuyến tàu đêm trong Hai đứa trẻ.
*   **Giai đoạn 3: Phân tích nghệ thuật Nguyễn Tuân (Tháng 3 - 5)**: Rèn viết các bài văn nghị luận phân tích tính cách nhân vật Huấn Cao và quản ngục.`
  }),

  // ================= NGỮ VĂN LỚP 12 =================
  literature_12: makeContext({
    title: 'Ngữ văn 12 - Ôn thi tốt nghiệp THPT và Tác phẩm trọng điểm',
    author: 'Nhà xuất bản Giáo dục Việt Nam',
    totalPages: 210,
    description: 'Tổng ôn các tác phẩm văn học trọng tâm lớp 12 phục vụ thi tốt nghiệp THPT Quốc gia: Tây Tiến, Việt Bắc, Sóng, Vợ nhặt, Vợ chồng A Phủ, Rừng xà nu, Chiếc thuyền ngoài xa.',
    chapters: [
      { id: 'l12_ch1', title: 'Chương 1: Các tác phẩm Thơ ca kháng chiến và tình yêu', pages: '1-60', content: 'Tây Tiến (Quang Dũng), Việt Bắc (Tố Hữu), Đất Nước (Nguyễn Khoa Điềm), Sóng (Xuân Quỳnh).' },
      { id: 'l12_ch2', title: 'Chương 2: Các tác phẩm Truyện ngắn và Ký xuất sắc', pages: '61-140', content: 'Vợ nhặt (Kim Lân), Vợ chồng A Phủ (Tô Hoài), Chiếc thuyền ngoài xa (Nguyễn Minh Châu), Ai đã đặt tên cho dòng sông (Hoàng Phủ Ngọc Tường).' },
      { id: 'l12_ch3', title: 'Chương 3: Tổng ôn tập kỹ năng làm đề thi tốt nghiệp THPT', pages: '141-210', content: 'Cấu trúc đề thi mẫu, cách viết đoạn văn nghị luận xã hội 200 chữ và bài văn nghị luận văn học đạt điểm cao.' }
    ],
    lectures: [
      {
        chapterId: 'l12_ch1',
        title: 'Bài giảng Chương 1: Tây Tiến, Việt Bắc và Sóng',
        basic: `### Lý thuyết nền tảng
*   **Tây Tiến (Quang Dũng)**:
    *   *Nội dung*: Khắc họa thiên nhiên miền Tây Bắc hiểm trở dữ dội nhưng vô cùng thơ mộng. Chân dung người lính Tây Tiến hào hoa, kiêu dũng, chịu nhiều gian khổ hi sinh nhưng tinh thần luôn bi tráng, lạc quan.
    *   *Nghệ thuật*: Bút pháp lãng mạn kết hợp chất nhạc, chất họa đặc sắc.
*   **Việt Bắc (Tố Hữu)**:
    *   *Nội dung*: Bản tình ca kháng chiến ghi lại cuộc chia tay đầy lưu luyến giữa người dân Việt Bắc tình nghĩa và cán bộ cách mạng về xuôi. Tái hiện những kỷ niệm chiến đấu hào hùng.
    *   *Nghệ thuật*: Sử dụng thể thơ lục bát truyền thống ngọt ngào và kết cấu đối đáp ta - mình quen thuộc của ca dao.
*   **Sóng (Xuân Quỳnh)**:
    *   *Nội dung*: Tâm trạng người phụ nữ đang yêu khát khao hạnh phúc thủy chung son sắt, mượn hình tượng sóng biển để biểu hiện thế nội tâm đầy biến động tình yêu.
    *   *Nghệ thuật*: Nhịp thơ dạt dào như tiếng sóng vỗ, cấu trúc song hành Sóng và Em.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phân tích chất bi tráng trong Tây Tiến**:
    *   Cái 'Bi' là hiện thực khốc liệt của chiến tranh tàn phá ngoại hình lính và cái chết rải rác nơi biên cương.
    *   Cái 'Tráng' là chí khí oai phong lẫm liệt coi khinh cái chết của người lính. Sự kết hợp này biến cái chết đau thương thành sự hi sinh cao cả đi vào cõi bất tử đầy kiêu hãnh.
*   *Mẹo*: Khi phân tích Việt Bắc, chú ý bức tranh tứ bình (bốn mùa xanh - đỏ - vàng - trắng) thể hiện sự gắn bó hòa hợp giữa thiên nhiên và con người kháng chiến.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Câu hỏi phân tích**: Cảm nhận về hai câu thơ trong bài thơ Sóng: 'Nơi nào em cũng nghĩ / Hướng về anh - một phương'.
    *   *Giải*:
        1. Sự thủy chung son sắt: Khác với vũ trụ có bốn phương Đông - Tây - Nam - Bắc, phương yêu của em chỉ có một phương duy nhất là 'Phương Anh'.
        2. Lời thề thủy chung vượt qua mọi khoảng cách địa lý và thử thách thời gian để hướng về người mình yêu thương.`
      },
      {
        chapterId: 'l12_ch2',
        title: 'Bài giảng Chương 2: Vợ nhặt, Vợ chồng A Phủ và Chiếc thuyền ngoài xa',
        basic: `### Lý thuyết nền tảng
*   **Vợ nhặt (Kim Lân)**:
    *   *Nội dung*: Tình huống nhặt vợ độc đáo của Tràng giữa nạn đói 1945. Tình thương yêu, cưu mang đùm bọc nhau của bà cụ Tứ, Tràng và người vợ nhặt nương tựa nhau vượt qua ranh giới cái chết.
    *   *Nghệ thuật*: Dựng cảnh chân thực, miêu tả tâm lý nhân vật tinh tế sống động.
*   **Vợ chồng A Phủ (Tô Hoài)**:
    *   *Nội dung*: Cuộc đời đau khổ của cô Mị bị bắt làm dâu gạt nợ nhà thống lý Pá Tra và A Phủ bị phạt làm nô lệ. Sức sống tiềm tàng trỗi dậy trong đêm đông cứu A Phủ và tự giải thoát mình của Mị.
    *   *Nghệ thuật*: Giàu chất thơ, hiểu biết sâu sắc về phong tục tập quán của người Mông.
*   **Chiếc thuyền ngoài xa (Nguyễn Minh Châu)**:
    *   *Nội dung*: Chuyến đi thực tế của nghệ sĩ Phùng chụp được bức ảnh tuyệt đẹp nhưng chứng kiến cảnh bạo hành gia đình hàng chài đau xót. Sự nhận thức sâu sắc về nghệ thuật gắn liền cuộc đời đa sự phức tạp.
    *   *Nghệ thuật*: Tình huống truyện mang tính nhận thức sâu sắc, điểm nhìn trần thuật tự nhiên khách quan.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phân tích sức sống tiềm tàng của nhân vật Mị**:
    *   Mị bị cướp đi thanh xuân, sống lầm lũi 'như con rùa nuôi trong xó cửa'.
    *   Nhưng sức sống vẫn âm ỉ cháy: trỗi dậy trong đêm tình mùa xuân (nghe tiếng sáo gọi bạn, uống rượu, muốn đi chơi) và bùng phát quyết định trong đêm đông cắt dây trói cứu A Phủ cũng là tự cứu cuộc đời mình.
*   *Mẹo*: Đừng đánh giá người đàn bà hàng chài qua vẻ thô kệch nhẫn nhục bên ngoài. Hãy đi sâu phân tích tình mẫu tử vĩ đại và sự sâu sắc từng trải lẽ đời của chị ở tòa án huyện để thấy được hạt ngọc ẩn giấu trong tâm hồn.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Câu hỏi phân tích**: Nêu ý nghĩa của hình ảnh bữa cơm đón nàng dâu mới ngày đói trong truyện ngắn Vợ nhặt.
    *   *Giải*:
        1. Hiện thực nghiệt ngã: Bữa cơm thảm hại chỉ có rau chuối thái rối, một đĩa muối ăn và nồi cháo cám đắng chát ('chè khoán' như lời cụ Tứ nói đùa).
        2. Tình thương ấm áp: Mọi người đều ăn trong lặng lẽ nhưng nỗ lực chia sẻ, động viên nhau tin vào tương lai. Nồi cháo cám chát chúa nhưng chứa đựng tình mẫu tử cao cả cố gắng nuôi dưỡng sự sống.`
      }
    ],
    introduction: `### 1. Giới thiệu môn học
Ngữ văn 12 là môn học bắt buộc quyết định điểm số thi tốt nghiệp THPT Quốc gia của học sinh. Môn học đòi hỏi hệ thống hóa toàn bộ các tác phẩm trọng điểm thơ ca kháng chiến và truyện ngắn hiện thực - nhân đạo sau 1945.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Đề minh họa Bộ GD-ĐT)
*   **Thời gian làm bài**: 120 phút.
*   **Cấu trúc điểm số**:
    1. **Phần Đọc hiểu (3.0 điểm)**: Đọc ngữ liệu ngoài sách giáo khoa và trả lời 4 câu hỏi nhận biết, thông hiểu, vận dụng.
    2. **Phần Làm văn (7.0 điểm)**:
       - Câu 1: Viết đoạn văn nghị luận xã hội khoảng 200 chữ về một tư tưởng đạo lý hoặc hiện tượng đời sống (2.0 điểm).
       - Câu 2: Viết bài văn nghị luận văn học phân tích một đoạn trích thơ hoặc văn xuôi trong chương trình lớp 12 (5.0 điểm).

### 3. Lộ trình học tập chi tiết
*   **Giai đoạn 1: Nắm chắc cốt truyện & nội dung 7 tác phẩm trọng tâm (Tháng 8 - 12)**: Học kỹ các trích đoạn đắt giá của Tây Tiến, Việt Bắc, Đất Nước, Sóng, Vợ nhặt, Vợ chồng A Phủ, Chiếc thuyền ngoài xa.
*   **Giai đoạn 2: Luyện viết mở bài, kết bài và liên hệ so sánh (Tháng 1 - 3)**: Rèn luyện kỹ năng viết nhanh các mở bài ấn tượng, kết bài lắng đọng và cách liên hệ mở rộng tác phẩm cùng chủ đề để lấy điểm sáng tạo.
*   **Giai đoạn 3: Thực chiến giải đề thi thử dưới áp lực thời gian (Tháng 4 - 6)**: Tự viết trọn vẹn đề thi trong 120 phút để biết cách phân bổ thời gian hợp lý (Đọc hiểu: 20 phút, NLXH: 20 phút, NLVH: 80 phút).`
  })
};
