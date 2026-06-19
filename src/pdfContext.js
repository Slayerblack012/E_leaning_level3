import { newSubjects } from './pdfContextNewSubjects';

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

export const pdfContext = {
  // ================= TOÁN HỌC =================
  math_10: makeContext({
    title: 'Toán học 10 - Kết nối tri thức với cuộc sống',
    author: 'Nhà xuất bản Giáo dục Việt Nam',
    totalPages: 208,
    description: 'Mệnh đề, tập hợp, bất phương trình, hệ thức lượng, vector, thống kê, hàm số và tổ hợp.',
    chapters: [
      { id: 't10_ch1', title: 'Chương 1: Mệnh đề và tập hợp', pages: '1-15', content: 'Mệnh đề, phủ định, kéo theo, tương đương, giao, hợp, hiệu và phần bù.' },
      { id: 't10_ch2', title: 'Chương 2: Bất phương trình và hệ bất phương trình bậc nhất 2 ẩn', pages: '16-30', content: 'Biểu diễn miền nghiệm, bài toán tối ưu.' },
      { id: 't10_ch3', title: 'Chương 3: Hệ thức lượng trong tam giác', pages: '31-45', content: 'Định lý sin, cosin, công thức diện tích tam giác.' },
      { id: 't10_ch4', title: 'Chương 4: Vector', pages: '46-65', content: 'Các phép toán vector, tích vô hướng.' },
      { id: 't10_ch5', title: 'Chương 5: Hàm số và Đồ thị', pages: '66-85', content: 'Hàm số bậc nhất, bậc hai, tính đơn điệu, đỉnh parabol.' },
      { id: 't10_ch6', title: 'Chương 6: Đại số tổ hợp', pages: '86-110', content: 'Quy tắc cộng, quy tắc nhân, hoán vị, chỉnh hợp, tổ hợp.' },
      { id: 't10_ch7', title: 'Chương 7: Phương pháp tọa độ trong mặt phẳng', pages: '111-135', content: 'Phương trình đường thẳng, đường tròn, đường conic.' }
    ],
    lectures: [
      {
        chapterId: 't10_ch1',
        title: 'Bài giảng Chương 1: Mệnh đề và tập hợp',
        basic: `### Lý thuyết nền tảng
*   **Mệnh đề** là một câu khẳng định chỉ có thể ĐÚNG hoặc SAI. Không có mệnh đề vừa đúng vừa sai hoặc không xác định được tính đúng sai.
*   **Mệnh đề phủ định**: Phủ định của mệnh đề $P$ là $\\overline{P}$. Nếu $P$ đúng thì $\\overline{P}$ sai và ngược lại.
*   **Mệnh đề kéo theo ($P \\Rightarrow Q$)**: Chỉ sai khi $P$ đúng và $Q$ sai. Các cách phát biểu: "$P$ kéo theo $Q$", "Nếu $P$ thì $Q$", "$P$ là điều kiện đủ để có $Q$", "$Q$ là điều kiện cần để có $P$".
*   **Mệnh đề tương đương ($P \\Leftrightarrow Q$)**: Đúng khi cả hai cùng đúng hoặc cùng sai.
*   **Tập hợp và các phép toán**:
    *   Giao: $A \\cap B = \\{x \\in \\mathbb{R} \\mid x \\in A \\text{ và } x \\in B\\}$ (lấy phần chung).
    *   Hợp: $A \\cup B = \\{x \\in \\mathbb{R} \\mid x \\in A \\text{ hoặc } x \\in B\\}$ (lấy tất cả).
    *   Hiệu: $A \\setminus B = \\{x \\in \\mathbb{R} \\mid x \\in A \\text{ và } x \\notin B\\}$.
    *   Phần bù: $C_U A$ khi $A \\subset U$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Khi nào dùng Chứng minh phản chứng?**: Khi mệnh đề cần chứng minh ở dạng phủ định (ví dụ: "không tồn tại", "vô tỉ", "không chia hết") hoặc có cấu trúc phức tạp. Phương pháp là giả sử kết luận sai, từ đó dùng lập luận toán học dẫn tới sự mâu thuẫn với giả thiết hoặc các định lý đã biết.
*   **Sử dụng Biểu đồ Venn giải bài toán đếm**: Khi có nhiều tập hợp giao nhau (ví dụ: học sinh giỏi các môn khác nhau). Công thức tổng quát cho 3 tập hợp:
    $|A \\cup B \\cup C| = |A| + |B| + |C| - |A \\cap B| - |B \\cap C| - |C \\cap A| + |A \\cap B \\cap C|$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Chứng minh rằng $\\sqrt{2}$ là số vô tỉ bằng phản chứng.
    *   *Giải*: Giả sử $\\sqrt{2}$ là số hữu tỉ $\\Rightarrow \\sqrt{2} = \\frac{a}{b}$ với $a, b \\in \\mathbb{Z}^+$ và $\\text{UCLN}(a,b) = 1$ (phân số tối giản).
    *   Bình phương 2 vế: $2 = \\frac{a^2}{b^2} \\Rightarrow a^2 = 2b^2 \\Rightarrow a^2$ là số chẵn $\\Rightarrow a$ là số chẵn.
    *   Đặt $a = 2k \\Rightarrow (2k)^2 = 2b^2 \\Rightarrow 4k^2 = 2b^2 \\Rightarrow b^2 = 2k^2 \\Rightarrow b^2$ chẵn $\\Rightarrow b$ chẵn.
    *   Vì cả $a$ và $b$ đều chẵn nên chia hết cho 2, mâu thuẫn với giả thiết $\\text{UCLN}(a,b) = 1$. Vậy $\\sqrt{2}$ phải là số vô tỉ.`
      },
      {
        chapterId: 't10_ch2',
        title: 'Bài giảng Chương 2: Bất phương trình & Quy hoạch tuyến tính',
        basic: `### Lý thuyết nền tảng
*   **Bất phương trình bậc nhất hai ẩn**: Có dạng tổng quát $ax + by < c$ (hoặc $\\le, >, \\ge$).
*   **Miền nghiệm**: Là nửa mặt phẳng (kể cả hoặc không kể bờ là đường thẳng $d: ax + by = c$).
*   **Cách biểu diễn miền nghiệm**:
    1. Vẽ đường thẳng $d: ax + by = c$.
    2. Chọn điểm thử $M(x_0, y_0) \\notin d$ (thường chọn gốc tọa độ $O(0,0)$ nếu $c \\ne 0$).
    3. Tính $ax_0 + by_0$ so sánh với $c$. Nếu đúng thì nửa mặt phẳng chứa $M$ là miền nghiệm. Nếu sai, nửa mặt phẳng không chứa $M$ là miền nghiệm.
*   **Hệ bất phương trình**: Miền nghiệm là phần giao của các miền nghiệm của từng bất phương trình trong hệ.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tại sao GTLN/GTNN của hàm mục tiêu $F(x,y) = ax + by$ luôn đạt tại các đỉnh?**
    Miền nghiệm của hệ bất phương trình bậc nhất hai ẩn luôn là một đa giác lồi (nếu giới hạn). Đường thẳng $ax + by = F$ tịnh tiến song song trong không gian tọa độ. Điểm cuối cùng nó tiếp xúc với đa giác trước khi rời khỏi miền nghiệm luôn luôn là một trong các đỉnh của đa giác đó. Do đó, chỉ cần kiểm tra giá trị của $F$ tại các đỉnh của miền đa giác nghiệm.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Tìm giá trị nhỏ nhất và lớn nhất của $F(x,y) = 2x + 1.5y$ trên miền nghiệm giới hạn bởi các đỉnh $A(0, 4), B(3, 3), C(4, 0), D(0, 0)$.
    *   *Giải*: Ta tính giá trị của $F(x,y)$ tại 4 đỉnh:
        *   Tại $D(0,0): F(0,0) = 2(0) + 1.5(0) = 0$.
        *   Tại $C(4,0): F(4,0) = 2(4) + 1.5(0) = 8$.
        *   Tại $B(3,3): F(3,3) = 2(3) + 1.5(3) = 10.5$.
        *   Tại $A(0,4): F(0,4) = 2(0) + 1.5(4) = 6$.
    *   *Kết luận*: Giá trị nhỏ nhất là $0$ tại $D(0,0)$, giá trị lớn nhất là $10.5$ tại $B(3,3)$.`
      },
      {
        chapterId: 't10_ch3',
        title: 'Bài giảng Chương 3: Hệ thức lượng trong tam giác',
        basic: `### Lý thuyết nền tảng
Cho tam giác $ABC$ có các cạnh tương ứng là $a, b, c$, nửa chu vi $p$, bán kính đường tròn ngoại tiếp $R$, bán kính đường tròn nội tiếp $r$.
*   **Định lý Cosin**:
    $$a^2 = b^2 + c^2 - 2bc \\cos A$$
    $$\\cos A = \\frac{b^2 + c^2 - a^2}{2bc}$$
*   **Định lý Sin**:
    $$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$$
*   **Các công thức tính diện tích tam giác $S$**:
    1. $S = \\frac{1}{2} a h_a = \\frac{1}{2} b h_b = \\frac{1}{2} c h_c$
    2. $S = \\frac{1}{2} bc \\sin A = \\frac{1}{2} ac \\sin B = \\frac{1}{2} ab \\sin C$
    3. $S = \\frac{abc}{4R}$
    4. $S = pr$
    5. Công thức Heron: $S = \\sqrt{p(p-a)(p-b)(p-c)}$`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Cách chọn định lý để giải tam giác**:
    *   Dùng **Định lý Cosin** khi biết: 2 cạnh và góc xen giữa (để tìm cạnh thứ 3), hoặc biết cả 3 cạnh (để tìm góc).
    *   Dùng **Định lý Sin** khi biết: 1 cạnh và 2 góc kề (để tìm các cạnh còn lại), hoặc biết 2 cạnh và 1 góc đối diện (lưu ý trường hợp góc tù).
*   *Mẹo*: Khi dùng định lý Sin tìm góc, luôn kiểm tra xem góc đó có thể tù hay không vì $\\sin A = \\sin(180^\\circ - A)$. Định lý Cosin cho kết quả góc duy nhất vì giá trị $\\cos$ âm biểu thị góc tù, dương biểu thị góc nhọn.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Cho tam giác $ABC$ có $b = 8\\text{ cm}, c = 5\\text{ cm}$ và góc $A = 60^\\circ$. Tính độ dài cạnh $a$ và diện tích $S$ của tam giác.
    *   *Giải*:
        *   Áp dụng định lý Cosin để tính $a$:
            $a^2 = b^2 + c^2 - 2bc \\cos A = 8^2 + 5^2 - 2 \\cdot 8 \\cdot 5 \\cdot \\cos 60^\\circ$
            $a^2 = 64 + 25 - 80 \\cdot 0.5 = 89 - 40 = 49 \\Rightarrow a = 7\\text{ cm}$.
        *   Tính diện tích $S$:
            $S = \\frac{1}{2} bc \\sin A = \\frac{1}{2} \\cdot 8 \\cdot 5 \\cdot \\sin 60^\\circ = 20 \\cdot \\frac{\\sqrt{3}}{2} = 10\\sqrt{3}\\text{ cm}^2$.`
      },
      {
        chapterId: 't10_ch4',
        title: 'Bài giảng Chương 4: Vector',
        basic: `### Lý thuyết nền tảng
*   **Vector** là một đoạn thẳng có hướng. Ký hiệu là $\\vec{AB}$ (điểm đầu $A$, điểm cuối $B$) hoặc $\\vec{a}$.
*   **Quy tắc cộng vector**:
    *   Quy tắc 3 điểm: $\\vec{AB} + \\vec{BC} = \\vec{AC}$.
    *   Quy tắc hình bình hành: Nếu $ABCD$ là hình bình hành thì $\\vec{AB} + \\vec{AD} = \\vec{AC}$.
*   **Quy tắc hiệu**: $\\vec{OB} - \\vec{OA} = \\vec{AB}$.
*   **Tích vô hướng của hai vector**:
    $$\\vec{a} \\cdot \\vec{b} = |\\vec{a}| \\cdot |\\vec{b}| \\cdot \\cos(\\vec{a}, \\vec{b})$$
*   **Tính chất**: $\\vec{a} \\perp \\vec{b} \\Leftrightarrow \\vec{a} \\cdot \\vec{b} = 0$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Kỹ thuật phân tích (biểu diễn) vector**: Để phân tích một vector $\\vec{x}$ theo hai vector không cùng phương $\\vec{a}$ và $\\vec{b}$, ta sử dụng quy tắc chèn điểm liên tiếp để đưa các điểm trung gian về các đỉnh của hình đã cho (như tam giác, hình bình hành).
*   *Mẹo*: Khi gặp bài toán chứng minh 3 điểm $A, B, C$ thẳng hàng, hãy chứng minh tồn tại số thực $k \\ne 0$ sao cho $\\vec{AB} = k\\vec{AC}$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Cho tam giác $ABC$. Gọi $M$ là trung điểm của $BC$. Hãy biểu diễn vector $\\vec{AM}$ theo $\\vec{AB}$ và $\\vec{AC}$.
    *   *Giải*:
        *   Vì $M$ là trung điểm của $BC$ nên $\\vec{MB} + \\vec{MC} = \\vec{0} \\Rightarrow \\vec{MB} = -\\vec{MC}$.
        *   Ta chèn điểm $M$ vào hai vector:
            $\\vec{AB} = \\vec{AM} + \\vec{MB}$
            $\\vec{AC} = \\vec{AM} + \\vec{MC}$
        *   Cộng hai vế: $\\vec{AB} + \\vec{AC} = 2\\vec{AM} + (\\vec{MB} + \\vec{MC}) = 2\\vec{AM}$.
        *   Suy ra: $\\vec{AM} = \\frac{1}{2}(\\vec{AB} + \\vec{AC})$.`
      },
      {
        chapterId: 't10_ch5',
        title: 'Bài giảng Chương 5: Hàm số và Đồ thị',
        basic: `### Lý thuyết nền tảng
*   **Hàm số bậc hai**: $y = ax^2 + bx + c$ ($a \\ne 0$).
*   **Đồ thị**: Là một đường Parabol có:
    *   Tọa độ đỉnh: $I\\left(-\\frac{b}{2a}; -\\frac{\\Delta}{4a}\\right)$ với $\\Delta = b^2 - 4ac$.
    *   Trục đối xứng: Đường thẳng $x = -\\frac{b}{2a}$.
    *   Bề lõm quay lên trên nếu $a > 0$, quay xuống dưới nếu $a < 0$.
*   **Sự biến thiên**:
    *   Nếu $a > 0$: Hàm số nghịch biến trên $\\left(-\\infty; -\\frac{b}{2a}\\right)$ và đồng biến trên $\\left(-\\frac{b}{2a}; +\\infty\\right)$.
    *   Nếu $a < 0$: Hàm số đồng biến trên $\\left(-\\infty; -\\frac{b}{2a}\\right)$ và nghịch biến trên $\\left(-\\frac{b}{2a}; +\\infty\\right)$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Bài toán tìm cực trị hàm số bậc hai trên đoạn $[\\alpha, \\beta]$**:
    *   Bước 1: Tính hoành độ đỉnh $x_0 = -\\frac{b}{2a}$.
    *   Bước 2: Kiểm tra xem $x_0$ có thuộc đoạn $[\\alpha, \\beta]$ hay không.
    *   Bước 3:
        *   Nếu $x_0 \\in [\\alpha, \\beta]$, tính các giá trị $f(\\alpha), f(\\beta), f(x_0)$. So sánh để tìm Max, Min.
        *   Nếu $x_0 \\notin [\\alpha, \\beta]$, chỉ cần tính và so sánh $f(\\alpha), f(\\beta)$. Cực trị luôn nằm ở một trong hai đầu biên.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số $y = x^2 - 4x + 3$ trên đoạn $[0, 3]$.
    *   *Giải*:
        *   Hệ số $a = 1 > 0$, parabol quay bề lõm lên trên. Hoành độ đỉnh $x_0 = -\\frac{b}{2a} = -\\frac{-4}{2(1)} = 2$.
        *   Nhận xét: Đỉnh $2 \\in [0, 3]$.
        *   Tính các giá trị:
            $y(0) = 0^2 - 4(0) + 3 = 3$.
            $y(3) = 3^2 - 4(3) + 3 = 0$.
            $y(2) = 2^2 - 4(2) + 3 = -1$.
        *   So sánh: Giá trị nhỏ nhất là $-1$ tại $x=2$, giá trị lớn nhất là $3$ tại $x=0$.`
      },
      {
        chapterId: 't10_ch6',
        title: 'Bài giảng Chương 6: Đại số tổ hợp',
        basic: `### Lý thuyết nền tảng
*   **Quy tắc cộng**: Thực hiện một công việc có $k$ phương án độc lập. Phương án 1 có $m_1$ cách, phương án 2 có $m_2$ cách... Tổng số cách là $m_1 + m_2 + ... + m_k$.
*   **Quy tắc nhân**: Thực hiện một công việc gồm $k$ giai đoạn liên tiếp. Giai đoạn 1 có $n_1$ cách, giai đoạn 2 có $n_2$ cách... Tổng số cách là $n_1 \\cdot n_2 \\cdot ... \\cdot n_k$.
*   **Hoán vị ($P_n$)**: Sắp xếp thứ tự $n$ phần tử khác nhau: $P_n = n!$.
*   **Chỉnh hợp ($A_n^k$)**: Chọn $k$ phần tử từ $n$ phần tử và sắp xếp thứ tự: $A_n^k = \\frac{n!}{(n-k)!}$.
*   **Tổ hợp ($C_n^k$)**: Chọn $k$ phần tử từ $n$ phần tử không sắp xếp thứ tự: $C_n^k = \\frac{n!}{k!(n-k)!}$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Mẹo phân biệt nhanh Chỉnh hợp ($A$) và Tổ hợp ($C$)**:
    *   Hỏi câu hỏi: "Nếu đổi chỗ hai phần tử đã chọn, kết quả có thay đổi hay tạo ra trường hợp mới không?"
        *   Nếu **CÓ**: Dùng Chỉnh hợp $A_n^k$ (ví dụ: bầu lớp trưởng - lớp phó, lập số tự nhiên, xếp hàng ghế).
        *   Nếu **KHÔNG**: Dùng Tổ hợp $C_n^k$ (ví dụ: bốc bi từ hộp, chọn nhóm học sinh đi lao động).
*   **Phương pháp phần bù (Complementary)**: Rất hiệu quả khi đề bài có từ khóa "có ít nhất", "có tối đa". Công thức: $\\text{Số cách thỏa mãn} = \\text{Tổng số cách} - \\text{Số cách không thỏa mãn}$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Có bao nhiêu cách chọn ra một ban đại diện gồm 3 người từ một nhóm gồm 5 nam và 4 nữ, sao cho trong ban đại diện phải có ít nhất 1 nữ?
    *   *Giải*:
        *   Tổng số người là $5 + 4 = 9$ người.
        *   Số cách chọn 3 người bất kì từ 9 người là: $C_9^3 = \\frac{9!}{3!6!} = 84$ cách.
        *   Số cách chọn 3 người mà không có thành viên nữ nào (tức cả 3 người đều là nam) là: $C_5^3 = 10$ cách.
        *   Số cách thỏa mãn yêu cầu đề bài (có ít nhất 1 nữ): $84 - 10 = 74$ cách.`
      },
      {
        chapterId: 't10_ch7',
        title: 'Bài giảng Chương 7: Phương pháp tọa độ trong mặt phẳng',
        basic: `### Lý thuyết nền tảng
*   **Đường thẳng**:
    *   Phương trình tổng quát: $Ax + By + C = 0$ (với vector pháp tuyến $\\vec{n} = (A, B)$).
    *   Phương trình tham số: $\\begin{cases} x = x_0 + u_1 t \\\\ y = y_0 + u_2 t \\end{cases}$ (với vector chỉ phương $\\vec{u} = (u_1, u_2)$).
    *   Khoảng cách từ $M(x_0, y_0)$ đến $d: Ax + By + C = 0$: $d(M, d) = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}$.
*   **Đường tròn**:
    *   Phương trình: $(x-a)^2 + (y-b)^2 = R^2$ (tâm $I(a,b)$, bán kính $R$).
*   **Đường Conic**:
    *   Elip: $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ ($a > b > 0$). Tiêu cự $2c = 2\\sqrt{a^2-b^2}$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Mối liên hệ giữa Vector pháp tuyến $\\vec{n}$ và Vector chỉ phương $\\vec{u}$**:
    Chúng luôn vuông góc với nhau $\\vec{n} \\cdot \\vec{u} = 0$. Do đó nếu có $\\vec{n} = (A, B)$, ta suy ra ngay chỉ phương $\\vec{u} = (-B, A)$ hoặc $(B, -A)$ bằng cách đổi chỗ hai tọa độ và thêm một dấu trừ.
*   **Bài toán tiếp tuyến đường tròn**: Đường thẳng $d$ tiếp xúc với đường tròn tâm $I$, bán kính $R$ khi và chỉ khi khoảng cách từ tâm $I$ đến $d$ đúng bằng bán kính $R$: $d(I, d) = R$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Viết phương trình tiếp tuyến của đường tròn $(C): (x-1)^2 + (y-2)^2 = 25$ biết tiếp tuyến song song với đường thẳng $d: 3x - 4y + 1 = 0$.
    *   *Giải*:
        *   Đường tròn $(C)$ có tâm $I(1, 2)$ và bán kính $R = 5$.
        *   Vì tiếp tuyến song song với $d: 3x - 4y + 1 = 0$ nên tiếp tuyến $\\Delta$ có dạng: $3x - 4y + C = 0$ ($C \\ne 1$).
        *   Vì $\\Delta$ là tiếp tuyến nên: $d(I, \\Delta) = R \\Leftrightarrow \\frac{|3(1) - 4(2) + C|}{\\sqrt{3^2 + (-4)^2}} = 5 \\Leftrightarrow \\frac{|C-5|}{5} = 5 \\Leftrightarrow |C-5| = 25$.
        *   Trường hợp 1: $C-5 = 25 \\Rightarrow C = 30 \\Rightarrow \\Delta_1: 3x - 4y + 30 = 0$.
        *   Trường hợp 2: $C-5 = -25 \\Rightarrow C = -20 \\Rightarrow \\Delta_2: 3x - 4y - 20 = 0$.`
      }
    ]
  }),

  math_11: makeContext({
    title: 'Toán học 11 - Hàm số lượng giác, Dãy số và Đạo hàm',
    author: 'NXB Giáo dục Việt Nam',
    totalPages: 215,
    description: 'Lượng giác, dãy số, cấp số cộng, cấp số nhân, giới hạn, đạo hàm và hình học không gian.',
    chapters: [
      { id: 't11_ch1', title: 'Chương 1: Hàm số lượng giác và phương trình lượng giác', pages: '1-35', content: 'Đồ thị sin, cos, tan, cot; phương trình lượng giác cơ bản.' },
      { id: 't11_ch2', title: 'Chương 2: Dãy số, Cấp số cộng và Cấp số nhân', pages: '36-60', content: 'Số hạng tổng quát, tính tăng giảm, tổng n số hạng đầu tiên.' },
      { id: 't11_ch3', title: 'Chương 3: Giới hạn và hàm số liên tục', pages: '61-90', content: 'Giới hạn dãy số, giới hạn hàm số, các dạng vô định.' },
      { id: 't11_ch4', title: 'Chương 4: Đạo hàm', pages: '91-120', content: 'Quy tắc tính đạo hàm, đạo hàm hàm hợp, ý nghĩa hình học của đạo hàm.' },
      { id: 't11_ch5', title: 'Chương 5: Quan hệ song song trong không gian', pages: '121-160', content: 'Đường thẳng song song mặt phẳng, mặt phẳng song song mặt phẳng.' },
      { id: 't11_ch6', title: 'Chương 6: Quan hệ vuông góc trong không gian', pages: '161-190', content: 'Góc giữa đường thẳng và mặt phẳng, hai mặt phẳng vuông góc, khoảng cách.' }
    ],
    lectures: [
      {
        chapterId: 't11_ch1',
        title: 'Bài giảng Chương 1: Hàm số và Phương trình lượng giác',
        basic: `### Lý thuyết nền tảng
*   **Các công thức lượng giác cơ bản**: $\\sin^2 x + \\cos^2 x = 1$, $\\tan x = \\frac{\\sin x}{\\cos x}$ (điều kiện $\\cos x \\ne 0$).
*   **Phương trình lượng giác cơ bản**:
    *   $\\sin x = \\sin \\alpha \\Leftrightarrow \\begin{cases} x = \\alpha + k2\\pi \\\\ x = \\pi - \\alpha + k2\\pi \\end{cases}$ ($k \\in \\mathbb{Z}$).
    *   $\\cos x = \\cos \\alpha \\Leftrightarrow x = \\pm \\alpha + k2\\pi$ ($k \\in \\mathbb{Z}$).
    *   $\\tan x = \\tan \\alpha \\Leftrightarrow x = \\alpha + k\\pi$ ($k \\in \\mathbb{Z}$).
*   **Chu kỳ**: Hàm $\\sin, \\cos$ tuần hoàn chu kỳ $2\\pi$; hàm $\\tan, \\cot$ tuần hoàn chu kỳ $\\pi$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Giải phương trình bậc nhất đối với $\\sin x$ và $\\cos x$: $a\\sin x + b\\cos x = c$**:
    *   Điều kiện có nghiệm: $a^2 + b^2 \\ge c^2$.
    *   Phương pháp: Chia cả hai vế cho $\\sqrt{a^2 + b^2}$, đưa phương trình về dạng: $\\sin(x + \\theta) = \\frac{c}{\\sqrt{a^2+b^2}}$ với $\\cos \\theta = \\frac{a}{\\sqrt{a^2+b^2}}$ và $\\sin \\theta = \\frac{b}{\\sqrt{a^2+b^2}}$.
*   *Mẹo*: Đừng quên đặt điều kiện xác định cho mẫu số khi giải phương trình lượng giác chứa $\\tan x$ hoặc $\\cot x$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Giải phương trình $\\sqrt{3}\\sin x - \\cos x = 1$.
    *   *Giải*: Ta thấy $a = \\sqrt{3}, b = -1, c = 1$. Thử điều kiện: $(\\sqrt{3})^2 + (-1)^2 = 4 \\ge 1^2$ (phương trình có nghiệm).
    *   Chia hai vế cho $\\sqrt{a^2+b^2} = 2$:
        $\\frac{\\sqrt{3}}{2}\\sin x - \\frac{1}{2}\\cos x = \\frac{1}{2}$
    *   Đưa về dạng hình thức lượng giác: Nhớ $\\cos\\frac{\\pi}{6} = \\frac{\\sqrt{3}}{2}$ và $\\sin\\frac{\\pi}{6} = \\frac{1}{2}$.
        $\\sin x \\cos\\frac{\\pi}{6} - \\cos x \\sin\\frac{\\pi}{6} = \\frac{1}{2} \\Leftrightarrow \\sin\\left(x - \\frac{\\pi}{6}\\right) = \\sin\\frac{\\pi}{6}$
    *   Trường hợp 1: $x - \\frac{\\pi}{6} = \\frac{\\pi}{6} + k2\\pi \\Rightarrow x = \\frac{\\pi}{3} + k2\\pi$.
    *   Trường hợp 2: $x - \\frac{\\pi}{6} = \\pi - \\frac{\\pi}{6} + k2\\pi \\Rightarrow x = \\pi + k2\\pi$ ($k \\in \\mathbb{Z}$).`
      },
      {
        chapterId: 't11_ch2',
        title: 'Bài giảng Chương 2: Dãy số và Cấp số',
        basic: `### Lý thuyết nền tảng
*   **Cấp số cộng (CSC)**:
    *   Định nghĩa: $u_{n+1} = u_n + d$ ($d$ là công sai).
    *   Số hạng tổng quát: $u_n = u_1 + (n-1)d$.
    *   Tổng $n$ số hạng đầu: $S_n = \\frac{n(u_1 + u_n)}{2} = \\frac{n[2u_1 + (n-1)d]}{2}$.
*   **Cấp số nhân (CSN)**:
    *   Định nghĩa: $u_{n+1} = u_n \\cdot q$ ($q$ là công bội).
    *   Số hạng tổng quát: $u_n = u_1 \\cdot q^{n-1}$.
    *   Tổng $n$ số hạng đầu: $S_n = u_1 \\frac{1 - q^n}{1 - q}$ ($q \\ne 1$).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phương pháp chứng minh quy nạp toán học**: Để chứng minh một mệnh đề $P(n)$ đúng với mọi $n \\ge 1$:
    1. Bước cơ sở: Chứng minh mệnh đề đúng với $n=1$.
    2. Bước quy nạp: Giả sử mệnh đề đúng với $n=k$ ($k \\ge 1$), chứng minh mệnh đề cũng đúng với $n=k+1$.
*   *Mẹo giải nhanh*: Với 3 số hạng liên tiếp tạo thành CSC, ta luôn có $u_{k-1} + u_{k+1} = 2u_k$. Nếu tạo thành CSN, ta có $u_{k-1} \\cdot u_{k+1} = u_k^2$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Tìm $u_1$ và công sai $d$ của cấp số cộng thỏa mãn hệ: $\\begin{cases} u_1 + u_5 = 10 \\\\ u_2 + u_6 = 14 \\end{cases}$.
    *   *Giải*: Biểu diễn các số hạng qua $u_1$ và $d$:
        $u_5 = u_1 + 4d$, $u_2 = u_1 + d$, $u_6 = u_1 + 5d$.
    *   Thế vào hệ phương trình:
        $\\begin{cases} u_1 + (u_1 + 4d) = 10 \\\\ (u_1 + d) + (u_1 + 5d) = 14 \\end{cases} \\Leftrightarrow \\begin{cases} 2u_1 + 4d = 10 \\\\ 2u_1 + 6d = 14 \\end{cases}$
    *   Trừ phương trình dưới cho phương trình trên ta được:
        $2d = 4 \\Rightarrow d = 2$.
    *   Thế lại tìm $u_1$: $2u_1 + 4(2) = 10 \\Rightarrow 2u_1 = 2 \\Rightarrow u_1 = 1$.`
      },
      {
        chapterId: 't11_ch3',
        title: 'Bài giảng Chương 3: Giới hạn và Hàm số liên tục',
        basic: `### Lý thuyết nền tảng
*   **Giới hạn của dãy số**: $\\lim_{n \\to \\infty} \\frac{1}{n^k} = 0$ ($k > 0$). Nếu $|q| < 1$ thì $\\lim_{n \\to \\infty} q^n = 0$.
*   **Giới hạn hàm số**: $\\lim_{x \\to x_0} f(x) = L$.
*   **Các dạng vô định thường gặp**: $\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $\\infty - \\infty$.
*   **Hàm số liên tục**: Hàm số $y = f(x)$ liên tục tại $x_0$ khi và chỉ khi $\\lim_{x \\to x_0} f(x) = f(x_0)$. Hàm số liên tục trên một khoảng nếu nó liên tục tại mọi điểm thuộc khoảng đó.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phương pháp khử dạng vô định**:
    *   Dạng $\\frac{\\infty}{\\infty}$ (phân thức chứa đa thức): Chia cả tử và mẫu cho lũy thừa cao nhất của biến $x$.
    *   Dạng $\\frac{0}{0}$ hoặc $\\infty - \\infty$ chứa căn thức: Sử dụng phương pháp **nhân liên hợp** để xuất hiện nhân tử chung nhằm triệt tiêu bộ phận làm cho biểu thức bằng $0$ hoặc vô cùng.
*   *Mẹo*: Định lý Bolzano-Cauchy: Nếu hàm số $f(x)$ liên tục trên đoạn $[a, b]$ và $f(a) \\cdot f(b) < 0$ thì phương trình $f(x) = 0$ có ít nhất một nghiệm thuộc khoảng $(a, b)$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Tính giới hạn $\\lim_{x \\to 1} \\frac{\\sqrt{x+3} - 2}{x-1}$.
    *   *Giải*: Thay $x=1$ thấy có dạng vô định $\\frac{0}{0}$. Nhân liên hợp cho tử số:
        $\\lim_{x \\to 1} \\frac{(\\sqrt{x+3} - 2)(\\sqrt{x+3} + 2)}{(x-1)(\\sqrt{x+3} + 2)} = \\lim_{x \\to 1} \\frac{(x+3) - 4}{(x-1)(\\sqrt{x+3} + 2)}$
        $= \\lim_{x \\to 1} \\frac{x-1}{(x-1)(\\sqrt{x+3} + 2)} = \\lim_{x \\to 1} \\frac{1}{\\sqrt{x+3} + 2}$
        $= \\frac{1}{\\sqrt{1+3} + 2} = \\frac{1}{4}$.`
      },
      {
        chapterId: 't11_ch4',
        title: 'Bài giảng Chương 4: Đạo hàm',
        basic: `### Lý thuyết nền tảng
*   **Công thức đạo hàm cơ bản**:
    *   $(x^n)' = n x^{n-1}$, $(\\sqrt{x})' = \\frac{1}{2\\sqrt{x}}$ ($x > 0$).
    *   $(\\sin x)' = \\cos x$, $(\\cos x)' = -\\sin x$, $(\\tan x)' = \\frac{1}{\\cos^2 x} = 1 + \\tan^2 x$.
*   **Đạo hàm hàm hợp**: $[f(u)]' = u' \\cdot f'(u)$.
*   **Ý nghĩa hình học của đạo hàm**: Hệ số góc của tiếp tuyến của đồ thị hàm số $y = f(x)$ tại điểm $M_0(x_0, y_0)$ là $k = f'(x_0)$.
*   **Phương trình tiếp tuyến**:
    $$y - y_0 = f'(x_0)(x - x_0)$$`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tại sao cần đạo hàm hàm hợp $u'$?**: Đạo hàm đo lường tốc độ thay đổi. Khi biến số trong hàm là một hàm số khác $u(x)$, tốc độ thay đổi của toàn hàm phụ thuộc cả vào tốc độ thay đổi của $u$ theo $x$ (là $u'$) và tốc độ thay đổi của hàm chính theo $u$ (là $f'(u)$).
*   *Mẹo giải nhanh tiếp tuyến*:
    *   Nếu tiếp tuyến song song với đường thẳng $y = ax + b$, ta có $f'(x_0) = a$. Giải phương trình này để tìm hoành độ tiếp điểm $x_0$.
    *   Nếu tiếp tuyến vuông góc với đường thẳng $y = ax + b$ ($a \\ne 0$), ta có $f'(x_0) = -\\frac{1}{a}$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Viết phương trình tiếp tuyến của đồ thị hàm số $y = x^3 - 3x + 2$ tại điểm có hoành độ $x_0 = 2$.
    *   *Giải*:
        *   Tìm tung độ tiếp điểm $y_0 = y(2) = 2^3 - 3(2) + 2 = 8 - 6 + 2 = 4$.
        *   Tính đạo hàm: $y' = 3x^2 - 3$.
        *   Tính hệ số góc của tiếp tuyến tại $x_0 = 2$: $k = y'(2) = 3(2)^2 - 3 = 9$.
        *   Phương trình tiếp tuyến tại điểm $M_0(2, 4)$ là:
            $y - 4 = 9(x - 2) \\Leftrightarrow y = 9x - 14$.`
      },
      {
        chapterId: 't11_ch5',
        title: 'Bài giảng Chương 5: Quan hệ song song trong không gian',
        basic: `### Lý thuyết nền tảng
*   **Đường thẳng song song mặt phẳng ($d \\parallel (P)$)**:
    Nếu đường thẳng $d$ không nằm trong mặt phẳng $(P)$ và song song với một đường thẳng $a$ nằm trong $(P)$ thì $d$ song song với $(P)$.
*   **Hai mặt phẳng song song ($(P) \\parallel (Q)$)**:
    Nếu mặt phẳng $(P)$ chứa hai đường thẳng cắt nhau $a, b$ và cả hai cùng song song với mặt phẳng $(Q)$ thì $(P)$ song song với $(Q)$.
*   **Định lý giao tuyến song song**:
    Nếu hai mặt phẳng song song lần lượt cắt mặt phẳng thứ ba thì hai giao tuyến của chúng song song với nhau.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phương pháp tìm thiết diện song song**:
    Để dựng thiết diện cắt bởi mặt phẳng $(\\alpha)$ đi qua một điểm và song song với hai đường thẳng chéo nhau cho trước: Ta lần lượt kẻ các đường thẳng song song với các đường thẳng đó nằm trong các mặt bên của hình chóp/lăng trụ cho đến khi tạo thành một đa giác khép kín.
*   *Mẹo*: Luôn vẽ nét đứt cho đường bị che khuất và nét liền cho đường nhìn thấy được trong hình học không gian.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành tâm $O$. Gọi $M$ là trung điểm của $SC$. Chứng minh rằng đường thẳng $OM$ song song với mặt phẳng $(SAD)$.
    *   *Giải*:
        *   Xét tam giác $SAC$ có $O$ là trung điểm của $AC$ (tính chất hình bình hành) và $M$ là trung điểm của $SC$ (giả thiết).
        *   Suy ra $OM$ là đường trung bình của tam giác $SAC \\Rightarrow OM \\parallel SA$.
        *   Ta thấy: $SA \\subset (SAD)$ và $OM \\notin (SAD)$.
        *   Do đó, theo định lý đường thẳng song song mặt phẳng, ta suy ra $OM \\parallel (SAD)$.`
      },
      {
        chapterId: 't11_ch6',
        title: 'Bài giảng Chương 6: Quan hệ vuông góc trong không gian',
        basic: `### Lý thuyết nền tảng
*   **Đường thẳng vuông góc mặt phẳng ($d \\perp (P)$)**:
    Nếu đường thẳng $d$ vuông góc với hai đường thẳng cắt nhau $a$ và $b$ cùng nằm trong mặt phẳng $(P)$ thì $d \\perp (P)$.
*   **Định lý ba đường vuông góc**:
    Cho đường thẳng $a$ nằm trong mặt phẳng $(P)$ và đường thẳng $b$ không vuông góc với $(P)$, gọi $b'$ là hình chiếu của $b$ trên $(P)$. Khi đó, $a \\perp b \\Leftrightarrow a \\perp b'$.
*   **Góc giữa đường thẳng và mặt phẳng**: Là góc giữa đường thẳng đó và hình chiếu của nó trên mặt phẳng.
*   **Hai mặt phẳng vuông góc ($(P) \\perp (Q)$)**:
    Nếu một mặt phẳng chứa một đường thẳng vuông góc với mặt phẳng kia thì hai mặt phẳng đó vuông góc với nhau.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Kỹ thuật xác định góc giữa đường xiên và mặt đáy (Phương pháp 3 nét)**:
    Giả sử cần tìm góc giữa cạnh bên $SD$ và mặt đáy $(ABCD)$ có $SA \\perp \\text{đáy}$.
    *   Nét 1: Xác định giao điểm của đường thẳng và mặt phẳng $\\Rightarrow$ Điểm $D$.
    *   Nét 2: Tìm chân đường vuông góc từ đỉnh còn lại xuống mặt đáy $\\Rightarrow$ Điểm $A$ (vì $SA \\perp \\text{đáy}$).
    *   Nét 3: Nối chân đường vuông góc với giao điểm $\\Rightarrow$ Đường thẳng $AD$.
    *   *Kết luận*: Góc cần tìm là góc $\\widehat{SDA}$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Cho hình chóp $S.ABC$ có đáy $ABC$ là tam giác vuông tại $B$, cạnh bên $SA$ vuông góc với mặt phẳng đáy $(ABC)$. Chứng minh rằng mặt phẳng $(SBC)$ vuông góc với mặt phẳng $(SAB)$.
    *   *Giải*:
        *   Ta cần tìm một đường thẳng vuông góc với mặt phẳng. Xét đường thẳng $BC$.
        *   Ta có: $BC \\perp AB$ (vì tam giác $ABC$ vuông tại $B$).
        *   Ta lại có: $BC \\perp SA$ (vì $SA \\perp (ABC)$ mà $BC \\subset (ABC)$).
        *   Do $AB$ và $SA$ cắt nhau tại $A$ trong mặt phẳng $(SAB)$, nên ta suy ra $BC \\perp (SAB)$.
        *   Mặt khác $BC \\subset (SBC)$, do đó theo định lý hai mặt phẳng vuông góc, ta suy ra $(SBC) \\perp (SAB)$.`
      }
    ]
  }),

  math_12: makeContext({
    title: 'Toán học 12 - Khảo sát hàm số, Tích phân & Oxyz',
    author: 'NXB Giáo dục Việt Nam',
    totalPages: 240,
    description: 'Ứng dụng đạo hàm, hàm số lũy thừa - mũ - logarit, tích phân, số phức và hình học giải tích.',
    chapters: [
      { id: 't12_ch1', title: 'Chương 1: Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số', pages: '1-45', content: 'Tính đơn điệu, cực trị, GTLN-GTNN, đường tiệm cận, tương giao đồ thị.' },
      { id: 't12_ch2', title: 'Chương 2: Hàm số lũy thừa, hàm số mũ và hàm số logarit', pages: '46-80', content: 'Tính chất mũ, logarit, phương trình và bất phương trình mũ - logarit.' },
      { id: 't12_ch3', title: 'Chương 3: Nguyên hàm, Tích phân và Ứng dụng', pages: '81-115', content: 'Bảng nguyên hàm, phương pháp đổi biến, từng phần, diện tích và thể tích.' },
      { id: 't12_ch4', title: 'Chương 4: Số phức', pages: '116-135', content: 'Phép toán số phức, phương trình bậc hai trên tập số phức.' },
      { id: 't12_ch5', title: 'Chương 5: Khối đa diện và khối tròn xoay', pages: '136-170', content: 'Thể tích lăng trụ, chóp, diện tích xung quanh nón, trụ, cầu.' },
      { id: 't12_ch6', title: 'Chương 6: Phương pháp tọa độ trong không gian (Oxyz)', pages: '171-210', content: 'Tọa độ điểm, vector, phương trình mặt phẳng, đường thẳng và mặt cầu.' }
    ],
    lectures: [
      {
        chapterId: 't12_ch1',
        title: 'Bài giảng Chương 1: Ứng dụng đạo hàm',
        basic: `### Lý thuyết nền tảng
*   **Tính đơn điệu**:
    *   Hàm số $y = f(x)$ đồng biến trên K nếu $f'(x) \\ge 0$ với mọi $x \\in K$ (dấu bằng xảy ra tại hữu hạn điểm).
    *   Hàm số nghịch biến trên K nếu $f'(x) \\le 0$ với mọi $x \\in K$.
*   **Cực trị**: Hàm số đạt cực trị tại $x_0$ nếu $f'(x_0) = 0$ (hoặc không xác định) và $f'(x)$ đổi dấu khi đi qua điểm $x_0$.
*   **Tiệm cận**:
    *   Tiệm cận ngang $y = y_0$ nếu $\\lim_{x \\to \\pm \\infty} f(x) = y_0$.
    *   Tiệm cận đứng $x = x_0$ nếu $\\lim_{x \\to x_0^\\pm} f(x) = \\pm \\infty$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Bài toán biện luận số nghiệm bằng Tương giao đồ thị**:
    Để giải phương trình phức tạp $A(x) = m$:
    1. Cô lập tham số $m$ về một vế: $f(x) = m$.
    2. Khảo sát và vẽ bảng biến thiên của hàm số $y = f(x)$.
    3. Vẽ đường thẳng nằm ngang $y = m$ và di chuyển nó tịnh tiến lên xuống.
    *   *Kết luận*: Số giao điểm của đường thẳng $y=m$ và đồ thị $y=f(x)$ chính là số nghiệm thực của phương trình.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Tìm các giá trị của tham số $m$ để phương trình $x^3 - 3x - m = 0$ có 3 nghiệm thực phân biệt.
    *   *Giải*:
        *   Biến đổi phương trình thành dạng tương giao: $x^3 - 3x = m$.
        *   Xét hàm số $f(x) = x^3 - 3x$. Đạo hàm $f'(x) = 3x^2 - 3 = 0 \\Leftrightarrow x = \\pm 1$.
        *   Tính giá trị cực đại và cực tiểu:
            $f(1) = 1^3 - 3(1) = -2$ (giá trị cực tiểu).
            $f(-1) = (-1)^3 - 3(-1) = 2$ (giá trị cực đại).
        *   Để phương trình có 3 nghiệm phân biệt, đường thẳng $y=m$ phải cắt đồ thị tại 3 điểm, tức là nằm giữa cực tiểu và cực đại: $-2 < m < 2$.`
      },
      {
        chapterId: 't12_ch2',
        title: 'Bài giảng Chương 2: Hàm số Mũ và Logarit',
        basic: `### Lý thuyết nền tảng
*   **Công thức lũy thừa & logarit quan trọng**:
    *   $\\log_a(xy) = \\log_a x + \\log_a y$ ($x, y, a > 0, a \\ne 1$).
    *   $\\log_a \\left(\\frac{x}{y}\\right) = \\log_a x - \\log_a y$.
    *   $\\log_a (x^n) = n \\log_a x$.
    *   Công thức đổi cơ số: $\\log_a x = \\frac{\\log_b x}{\\log_b a}$.
*   **Tính đơn điệu**:
    *   Hàm số $y = a^x$ và $y = \\log_a x$ đồng biến nếu $a > 1$, nghịch biến nếu $0 < a < 1$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Lưu ý cực kỳ quan trọng khi giải Bất phương trình Mũ/Logarit**:
    *   Luôn tìm **Điều kiện xác định** của biểu thức dưới dấu logarit trước tiên (lõi logarit phải dương).
    *   Khi bỏ cơ số $a$ ở hai vế:
        *   Nếu $a > 1$: Giữ nguyên chiều bất đẳng thức (ví dụ: $\\log_a f(x) > \\log_a g(x) \\Leftrightarrow f(x) > g(x)$).
        *   Nếu $0 < a < 1$: Bắt buộc phải **đảo ngược chiều** bất đẳng thức. Quy luật này rất nhiều học sinh quên dẫn tới mất điểm.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Giải bất phương trình $\\log_{0.5}(2x-4) > -1$.
    *   *Giải*:
        *   Bước 1: Tìm điều kiện xác định: $2x - 4 > 0 \\Leftrightarrow x > 2$.
        *   Bước 2: Giải bất phương trình. Vì cơ số là $0.5 < 1$, ta đảo chiều:
            $\\log_{0.5}(2x-4) > \\log_{0.5}(0.5^{-1}) \\Leftrightarrow 2x - 4 < 0.5^{-1}$
        *   Nhớ $0.5^{-1} = \\left(\\frac{1}{2}\\right)^{-1} = 2$.
            $2x - 4 < 2 \\Leftrightarrow 2x < 6 \\Leftrightarrow x < 3$.
        *   Bước 3: Kết hợp điều kiện xác định ta được tập nghiệm: $2 < x < 3$.`
      },
      {
        chapterId: 't12_ch3',
        title: 'Bài giảng Chương 3: Nguyên hàm và Tích phân',
        basic: `### Lý thuyết nền tảng
*   **Bảng nguyên hàm cơ bản**:
    *   $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$ ($n \\ne -1$), $\\int \\frac{1}{x} dx = \\ln|x| + C$.
    *   $\\int e^x dx = e^x + C$, $\\int a^x dx = \\frac{a^x}{\\ln a} + C$.
    *   $\\int \\cos x dx = \\sin x + C$, $\\int \\sin x dx = -\\cos x + C$.
*   **Phương pháp Tích phân từng phần**:
    $$\\int u \\, dv = uv - \\int v \\, du$$`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Quy tắc đặt $u$ trong Tích phân từng phần (Nhất lô, nhì đa, tam lượng, tứ mũ)**:
    Khi tính tích phân của tích hai hàm số khác nhau, ta ưu tiên chọn $u$ theo thứ tự từ trái sang phải:
    1. Hàm **Logarit** (lô)
    2. Hàm **Đa thức** (đa)
    3. Hàm **Lượng giác** (lượng)
    4. Hàm **Mũ** (mũ)
    Phần còn lại luôn đặt là $dv$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Tính nguyên hàm $\\int x \\ln x \\, dx$.
    *   *Giải*: Theo quy tắc ưu tiên, ta thấy có hàm đa thức $x$ và hàm logarit $\\ln x$. Do đó đặt:
        $u = \\ln x \\Rightarrow du = \\frac{1}{x} dx$.
        $dv = x \\, dx \\Rightarrow v = \\frac{x^2}{2}$.
    *   Áp dụng công thức từng phần:
        $\\int x \\ln x \\, dx = \\ln x \\cdot \\frac{x^2}{2} - \\int \\frac{x^2}{2} \\cdot \\frac{1}{x} dx$
        $= \\frac{x^2}{2} \\ln x - \\frac{1}{2} \\int x \\, dx = \\frac{x^2}{2} \\ln x - \\frac{x^2}{4} + C$.`
      },
      {
        chapterId: 't12_ch4',
        title: 'Bài giảng Chương 4: Số phức',
        basic: `### Lý thuyết nền tảng
*   **Định nghĩa**: Số phức $z = a + bi$ ($a, b \\in \\mathbb{R}$, $i^2 = -1$). Trong đó $a$ là phần thực, $b$ là phần ảo.
*   **Số phức liên hợp**: $\\overline{z} = a - bi$.
*   **Môđun của số phức**: $|z| = \\sqrt{a^2 + b^2}$.
*   **Các phép toán**:
    *   Cộng/Trừ: $(a+bi) \\pm (c+di) = (a \\pm c) + (b \\pm d)i$.
    *   Nhân: $(a+bi)(c+di) = (ac - bd) + (ad + bc)i$.
    *   Chia: Nhân cả tử và mẫu với số phức liên hợp của mẫu số.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Biểu diễn hình học và Tập hợp điểm**:
    Số phức $z = x + yi$ được biểu diễn bởi điểm $M(x, y)$ trên mặt phẳng tọa độ $Oxy$.
    *   Nếu biểu thức có dạng $|z - (a + bi)| = R$, tập hợp điểm biểu diễn $z$ là một **đường tròn** có tâm $I(a, b)$ và bán kính $R$.
    *   Nếu $|z - z_1| = |z - z_2|$, tập hợp điểm biểu diễn $z$ là đường **trung trực** của đoạn thẳng nối hai điểm biểu diễn $z_1$ và $z_2$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Tìm tập hợp các điểm biểu diễn số phức $z$ thỏa mãn điều kiện $|z - 1 + 2i| = 3$.
    *   *Giải*:
        *   Gọi $z = x + yi$ ($x, y \\in \\mathbb{R}$).
        *   Thế vào biểu thức: $|(x - 1) + (y + 2)i| = 3$.
        *   Tính môđun: $\\sqrt{(x-1)^2 + (y+2)^2} = 3$.
        *   Bình phương hai vế ta được: $(x-1)^2 + (y+2)^2 = 9$.
        *   *Kết luận*: Tập hợp các điểm biểu diễn số phức $z$ là đường tròn tâm $I(1, -2)$ và bán kính $R = 3$.`
      },
      {
        chapterId: 't12_ch5',
        title: 'Bài giảng Chương 5: Khối đa diện và khối tròn xoay',
        basic: `### Lý thuyết nền tảng
*   **Thể tích khối chóp**: $V = \\frac{1}{3} S_{\\text{đáy}} \\cdot h$.
*   **Thể tích khối lăng trụ**: $V = S_{\\text{đáy}} \\cdot h$.
*   **Hình nón**: Diện tích xung quanh $S_{xq} = \\pi r l$, Thể tích $V = \\frac{1}{3} \\pi r^2 h$ ($l$ là đường sinh).
*   **Hình trụ**: Diện tích xung quanh $S_{xq} = 2\\pi r h$, Thể tích $V = \\pi r^2 h$.
*   **Hình cầu**: Diện tích mặt cầu $S = 4\\pi R^2$, Thể tích khối cầu $V = \\frac{4}{3} \\pi R^3$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Công thức tỉ số thể tích Simpson (Chỉ áp dụng cho chóp tam giác)**:
    Cho khối chóp $S.ABC$. Một mặt phẳng cắt các cạnh $SA, SB, SC$ lần lượt tại $A', B', C'$. Ta luôn có:
    $$\\frac{V_{S.A'B'C'}}{V_{S.ABC}} = \\frac{SA'}{SA} \\cdot \\frac{SB'}{SB} \\cdot \\frac{SC'}{SC}$$
    *Lưu ý học sinh*: Định lý này tuyệt đối không áp dụng trực tiếp cho chóp tứ giác. Muốn dùng cho chóp tứ giác, ta phải chia đôi chóp thành hai chóp tam giác rồi cộng thể tích lại.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Cho hình chóp tam giác $S.ABC$ có đáy $ABC$ là tam giác đều cạnh $a$. Cạnh bên $SA$ vuông góc với mặt phẳng đáy và $SA = a\\sqrt{3}$. Tính thể tích $V$ của khối chóp.
    *   *Giải*:
        *   Diện tích đáy $ABC$ (tam giác đều cạnh $a$): $S_{\\text{đáy}} = \\frac{a^2\\sqrt{3}}{4}$.
        *   Chiều cao của khối chóp là độ dài đoạn $SA = a\\sqrt{3}$ (vì $SA \\perp \\text{đáy}$).
        *   Thể tích khối chóp là:
            $V = \\frac{1}{3} S_{\\text{đáy}} \\cdot h = \\frac{1}{3} \\left(\\frac{a^2\\sqrt{3}}{4}\\right) \\cdot (a\\sqrt{3}) = \\frac{3a^3}{12} = \\frac{a^3}{4}$.`
      },
      {
        chapterId: 't12_ch6',
        title: 'Bài giảng Chương 6: Phương pháp tọa độ trong không gian (Oxyz)',
        basic: `### Lý thuyết nền tảng
*   **Phương trình mặt phẳng**: $A(x-x_0) + B(y-y_0) + C(z-z_0) = 0$ (pháp vector $\\vec{n} = (A, B, C)$).
*   **Phương trình đường thẳng**:
    *   Phương trình tham số: $\\begin{cases} x = x_0 + at \\\\ y = y_0 + bt \\\\ z = z_0 + ct \\end{cases}$ (chỉ phương $\\vec{u} = (a, b, c)$).
*   **Phương trình mặt cầu**: $(x-a)^2 + (y-b)^2 + (z-c)^2 = R^2$ (tâm $I(a,b,c)$, bán kính $R$).
*   **Khoảng cách từ điểm $M(x_0, y_0, z_0)$ đến mặt phẳng $(P): Ax + By + Cz + D = 0$**:
    $$d(M, P) = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}$$`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phương pháp tọa độ hóa hình học không gian (Oxyz hóa)**:
    Khi gặp bài toán tính khoảng cách hoặc góc của khối hình học cổ điển (như lập phương, chóp có đường cao vuông góc đáy và các cạnh đáy vuông góc nhau). Ta có thể dựng hệ trục tọa độ vuông góc bằng cách đặt gốc tọa độ $O(0,0,0)$ tại chân đường cao, các trục $Ox, Oy, Oz$ trùng với các cạnh vuông góc của hình. Sau đó chuyển bài toán hình học sang tính toán tọa độ thuần túy để tránh phải suy nghĩ dựng hình phụ phức tạp.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Viết phương trình mặt phẳng $(P)$ đi qua điểm $A(1, -2, 3)$ và vuông góc với đường thẳng $d: \\frac{x-1}{2} = \\frac{y+1}{-1} = \\frac{z}{3}$.
    *   *Giải*:
        *   Vì mặt phẳng $(P)$ vuông góc với đường thẳng $d$ nên vector chỉ phương của đường thẳng $d$ chính là vector pháp tuyến của mặt phẳng $(P)$.
        *   Đường thẳng $d$ có vector chỉ phương là $\\vec{u} = (2, -1, 3) \\Rightarrow \\vec{n}_{(P)} = (2, -1, 3)$.
        *   Phương trình mặt phẳng $(P)$ đi qua $A(1, -2, 3)$ có dạng:
            $2(x - 1) - 1(y + 2) + 3(z - 3) = 0$
            $\\Leftrightarrow 2x - 2 - y - 2 + 3z - 9 = 0 \\Leftrightarrow 2x - y + 3z - 13 = 0$.`
      }
    ]
  }),

  // ================= VẬT LÝ =================
  physics_10: makeContext({
    title: 'Vật lý 10 - Cơ học và Nhiệt học',
    author: 'Bộ tài liệu THPT',
    totalPages: 180,
    description: 'Động học, Động lực học, Các định luật Newton, Các định luật bảo toàn và Nhiệt động lực học.',
    chapters: [
      { id: 'p10_ch1', title: 'Chương 1: Động học chất điểm', pages: '1-30', content: 'Chuyển động thẳng đều, biến đổi đều, rơi tự do, chuyển động tròn đều.' },
      { id: 'p10_ch2', title: 'Chương 2: Động lực học chất điểm', pages: '31-65', content: 'Ba định luật Newton, lực ma sát, lực đàn hồi, lực hấp dẫn, lực hướng tâm.' },
      { id: 'p10_ch3', title: 'Chương 3: Cân bằng và chuyển động của vật rắn', pages: '66-85', content: 'Momen lực, quy tắc hợp lực song song, trọng tâm.' },
      { id: 'p10_ch4', title: 'Chương 4: Các định luật bảo toàn', pages: '86-115', content: 'Động lượng, công, công suất, động năng, thế năng, bảo toàn cơ năng.' },
      { id: 'p10_ch5', title: 'Chương 5: Chất khí', pages: '116-140', content: 'Thuyết động học phân tử, định luật Boyle-Mariotte, Charles, Gay-Lussac, phương trình trạng thái.' },
      { id: 'p10_ch6', title: 'Chương 6: Cơ sở nhiệt động lực học', pages: '141-160', content: 'Nội năng, nguyên lý I và II nhiệt động lực học.' }
    ],
    lectures: [
      {
        chapterId: 'p10_ch1',
        title: 'Bài giảng Chương 1: Động học chất điểm',
        basic: `### Lý thuyết nền tảng
*   **Chuyển động thẳng biến đổi đều**: Vận tốc thay đổi đều đặn theo thời gian.
    *   Công thức vận tốc: $v = v_0 + at$.
    *   Phương trình quãng đường: $s = v_0t + \\frac{1}{2}at^2$.
    *   Công thức độc lập thời gian: $v^2 - v_0^2 = 2as$.
*   **Rơi tự do**: Là chuyển động thẳng nhanh dần đều dưới tác dụng của trọng lực, vận tốc ban đầu bằng 0.
    *   $v = gt$, $s = \\frac{1}{2}gt^2$, $v^2 = 2gs$ (với $g \\approx 9.8\\text{ m/s}^2$).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Khi nào dùng công thức độc lập thời gian $v^2 - v_0^2 = 2as$?**:
    Khi bài toán không cho dữ kiện về thời gian ($t$) và cũng không yêu cầu tính thời gian. Đây là lối đi tắt giúp giảm số bước giải phương trình.
*   **Quy ước dấu của gia tốc $a$**:
    *   Chuyển động nhanh dần đều: $a$ và $v_0$ cùng dấu.
    *   Chuyển động chậm dần đều: $a$ và $v_0$ trái dấu (ví dụ xe hãm phanh thì $a < 0$ nếu chọn chiều dương là chiều chuyển động).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Một đoàn tàu đang chạy với vận tốc $36\\text{ km/h}$ thì hãm phanh, chuyển động chậm dần đều sau $10\\text{ s}$ thì dừng hẳn. Tính gia tốc và quãng đường tàu đi được từ lúc hãm phanh đến khi dừng lại.
    *   *Giải*:
        *   Đổi đơn vị: $v_0 = 36\\text{ km/h} = 10\\text{ m/s}$. Tàu dừng hẳn $\\Rightarrow v = 0$.
        *   Tính gia tốc: $a = \\frac{v - v_0}{t} = \\frac{0 - 10}{10} = -1\\text{ m/s}^2$.
        *   Tính quãng đường: Sử dụng công thức độc lập thời gian:
            $v^2 - v_0^2 = 2as \\Rightarrow 0^2 - 10^2 = 2(-1)s \\Rightarrow -100 = -2s \\Rightarrow s = 50\\text{ m}$.`
      },
      {
        chapterId: 'p10_ch2',
        title: 'Bài giảng Chương 2: Động lực học chất điểm',
        basic: `### Lý thuyết nền tảng
*   **Định luật II Newton**: Gia tốc của một vật tỉ lệ thuận với lực tác dụng và tỉ lệ nghịch với khối lượng của vật:
    $$\\vec{F} = m\\vec{a}$$
*   **Lực ma sát trượt**: Xuất hiện ở mặt tiếp xúc khi vật trượt trên bề mặt vật khác:
    $$F_{ms} = \\mu N$$
    (với $\\mu$ là hệ số ma sát trượt, $N$ là áp lực của vật lên bề mặt).
*   **Lực đàn hồi của lò xo (Định luật Hooke)**: $F_{dh} = k \\cdot |\\Delta l|$ (với $k$ là độ cứng, $\\Delta l$ là độ biến dạng).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Quy trình 3 bước giải bài toán động lực học**:
    1. Vẽ sơ đồ phân tích các lực tác dụng lên vật (Trọng lực $\\vec{P}$, Phản lực/Áp lực $\\vec{N}$, Lực kéo $\\vec{F}_k$, Lực ma sát $\\vec{F}_{ms}$).
    2. Viết phương trình định luật II Newton dưới dạng vector: $\\vec{F}_k + \\vec{F}_{ms} + \\vec{P} + \\vec{N} = m\\vec{a}$.
    3. Chọn hệ trục tọa độ Oxy (Ox trùng với chiều chuyển động, Oy vuông góc với mặt tiếp xúc hướng lên). Chiếu phương trình lên 2 trục để tìm gia tốc $a$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Một vật khối lượng $m = 2\\text{ kg}$ đặt trên mặt bàn nằm ngang. Tác dụng lực kéo $F = 6\\text{ N}$ song song mặt bàn. Hệ số ma sát trượt giữa vật và bàn là $\\mu = 0.2$. Tính gia tốc của vật. Lấy $g = 10\\text{ m/s}^2$.
    *   *Giải*:
        *   Chiếu lên trục Oy: $N - P = 0 \\Rightarrow N = P = mg = 2 \\cdot 10 = 20\\text{ N}$.
        *   Tính lực ma sát trượt: $F_{ms} = \\mu N = 0.2 \\cdot 20 = 4\\text{ N}$.
        *   Chiếu lên trục Ox: $F_k - F_{ms} = ma \\Rightarrow 6 - 4 = 2 \\cdot a \\Rightarrow 2a = 2 \\Rightarrow a = 1\\text{ m/s}^2$.`
      },
      {
        chapterId: 'p10_ch3',
        title: 'Bài giảng Chương 3: Cân bằng và chuyển động của vật rắn',
        basic: `### Lý thuyết nền tảng
*   **Momen lực**: Đại lượng đặc trưng cho tác dụng làm quay của lực:
    $$M = F \\cdot d$$
    (với $d$ là cánh tay đòn - khoảng cách từ tâm quay đến đường thẳng chứa vector lực).
*   **Quy tắc momen lực**: Một vật có trục quay cố định ở trạng thái cân bằng khi tổng các momen lực làm vật quay theo chiều kim đồng hồ bằng tổng các momen lực làm vật quay ngược chiều kim đồng hồ.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Xác định cánh tay đòn $d$ chính xác**:
    Lỗi phổ biến của học sinh là lấy khoảng cách từ tâm quay đến điểm đặt lực làm cánh tay đòn. Đúng quy tắc vật lý: Phải vẽ đường thẳng chứa lực (giá của lực), rồi kẻ đường vuông góc từ trục quay đến đường thẳng đó.
*   *Mẹo*: Khi làm bài toán thanh chắn/bập bênh, luôn chọn điểm tựa làm trục quay để triệt tiêu momen của phản lực tại điểm tựa đó (do $d=0$).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Một thanh chắn AB dài $2\\text{ m}$ có khối lượng không đáng kể, có trục quay tại đầu A. Người ta tác dụng một lực vuông góc hướng lên tại đầu B là $F_1 = 10\\text{ N}$. Hỏi phải treo một vật có trọng lượng $P_2$ bằng bao nhiêu tại điểm C cách A là $0.5\\text{ m}$ để thanh nằm cân bằng nằm ngang?
    *   *Giải*:
        *   Trục quay tại A. Lực $F_1$ làm thanh quay ngược chiều kim đồng hồ, cánh tay đòn $d_1 = AB = 2\\text{ m}$. Momen lực: $M_1 = F_1 \\cdot AB$.
        *   Trọng lực $P_2$ của vật treo tại C làm thanh quay theo chiều kim đồng hồ, cánh tay đòn $d_2 = AC = 0.5\\text{ m}$. Momen lực: $M_2 = P_2 \\cdot AC$.
        *   Để thanh cân bằng: $M_1 = M_2 \\Leftrightarrow F_1 \\cdot AB = P_2 \\cdot AC \\Leftrightarrow 10 \\cdot 2 = P_2 \\cdot 0.5 \\Rightarrow P_2 = 40\\text{ N}$.`
      },
      {
        chapterId: 'p10_ch4',
        title: 'Bài giảng Chương 4: Các định luật bảo toàn',
        basic: `### Lý thuyết nền tảng
*   **Động lượng**: $\\vec{p} = m\\vec{v}$. Hệ kín là hệ không chịu tác dụng của ngoại lực (hoặc các ngoại lực triệt tiêu nhau). Định luật bảo toàn động lượng: $\\vec{p}_1 + \\vec{p}_2 = \\vec{p}'_1 + \\vec{p}'_2$.
*   **Động năng**: $W_d = \\frac{1}{2}mv^2$.
*   **Thế năng trọng trường**: $W_t = mgz$ (với $z$ là độ cao so với mốc thế năng).
*   **Cơ năng**: $W = W_d + W_t = \\frac{1}{2}mv^2 + mgz$.
*   **Định luật bảo toàn cơ năng**: Khi vật chuyển động trong trọng trường chỉ chịu tác dụng của trọng lực, cơ năng của vật là một đại lượng bảo toàn.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **So sánh Bảo toàn Động lượng và Bảo toàn Cơ năng**:
    *   Dùng **Bảo toàn Động lượng** khi hệ xảy ra các quá trình va chạm (va chạm mềm, va chạm đàn hồi) hoặc đạn nổ trong thời gian cực ngắn.
    *   Dùng **Bảo toàn Cơ năng** khi vật chuyển động trên quỹ đạo phức tạp (máng cong, ném xiên) không có lực cản/ma sát.
*   *Mẹo*: Khi có ma sát, cơ năng không bảo toàn. Ta dùng định lý biến thiên cơ năng: $W_2 - W_1 = A_{ms}$ (với $A_{ms}$ là công lực cản/ma sát, luôn âm).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Một vật được ném thẳng đứng lên cao từ mặt đất với vận tốc ban đầu $v_0 = 10\\text{ m/s}$. Bỏ qua sức cản không khí. Lấy $g = 10\\text{ m/s}^2$. Tính độ cao cực đại mà vật đạt được.
    *   *Giải*:
        *   Chọn mốc thế năng tại mặt đất.
        *   Cơ năng tại vị trí ném (mặt đất): $W_1 = W_{d1} + W_{t1} = \\frac{1}{2}mv_0^2 + 0 = \\frac{1}{2}m(10^2) = 50m$.
        *   Cơ năng tại đỉnh cực đại (vận tốc bằng 0): $W_2 = W_{d2} + W_{t2} = 0 + mgh_{max} = 10m h_{max}$.
        *   Áp dụng định luật bảo toàn cơ năng: $W_1 = W_2 \\Leftrightarrow 50m = 10m h_{max} \\Rightarrow h_{max} = 5\\text{ m}$.`
      },
      {
        chapterId: 'p10_ch5',
        title: 'Bài giảng Chương 5: Chất khí',
        basic: `### Lý thuyết nền tảng
*   **Định luật Boyle-Mariotte (Quá trình đẳng nhiệt)**: Nhiệt độ không đổi:
    $$p_1 V_1 = p_2 V_2 \\Rightarrow p \\sim \\frac{1}{V}$$
*   **Định luật Charles (Quá trình đẳng tích)**: Thể tích không đổi:
    $$\\frac{p_1}{T_1} = \\frac{p_2}{T_2} \\Rightarrow p \\sim T$$
*   **Phương trình trạng thái của khí lý tưởng**:
    $$\\frac{p_1 V_1}{T_1} = \\frac{p_2 V_2}{T_2}$$
    (Nhiệt độ $T$ tính theo thang Kelvin: $T = t^\\circ\\text{C} + 273$).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Cách nhớ các định luật chất khí**:
    Hãy nhớ phương trình tổng quát $\\frac{pV}{T} = \\text{const}$. Khi gặp một đẳng quá trình nào, hãy "che" đại lượng đó đi. Ví dụ:
    *   Đẳng nhiệt $\\Rightarrow$ Che $T \\Rightarrow pV = \\text{const}$ (Định luật Boyle-Mariotte).
    *   Đẳng tích $\\Rightarrow$ Che $V \\Rightarrow \\frac{p}{T} = \\text{const}$ (Định luật Charles).
*   *Mẹo*: Luôn đổi nhiệt độ xenxi $t^\\circ\\text{C}$ sang Kelvin bằng cách cộng thêm $273$. Quên đổi đơn vị này là lỗi phổ biến nhất dẫn tới tính sai kết quả.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Một khối khí có thể tích $10\\text{ lít}$ ở nhiệt độ $27^\\circ\\text{C}$ và áp suất $1\\text{ atm}$. Nén khối khí này đến thể tích $5\\text{ lít}$ và nhiệt độ tăng lên đến $57^\\circ\\text{C}$. Tính áp suất lúc sau của khối khí.
    *   *Giải*:
        *   Trạng thái 1: $V_1 = 10\\text{ l}, T_1 = 27 + 273 = 300\\text{ K}, p_1 = 1\\text{ atm}$.
        *   Trạng thái 2: $V_2 = 5\\text{ l}, T_2 = 57 + 273 = 330\\text{ K}, p_2 = ?$.
        *   Áp dụng phương trình trạng thái:
            $\\frac{p_1 V_1}{T_1} = \\frac{p_2 V_2}{T_2} \\Rightarrow \\frac{1 \\cdot 10}{300} = \\frac{p_2 \\cdot 5}{330}$
            $\\Rightarrow \\frac{1}{30} = \\frac{5 p_2}{330} \\Rightarrow 5 p_2 = 11 \\Rightarrow p_2 = 2.2\\text{ atm}$.`
      },
      {
        chapterId: 'p10_ch6',
        title: 'Bài giảng Chương 6: Cơ sở nhiệt động lực học',
        basic: `### Lý thuyết nền tảng
*   **Nội năng**: Là tổng động năng chuyển động nhiệt của các phân tử cấu tạo nên vật và thế năng tương tác giữa chúng. Nội năng phụ thuộc vào nhiệt độ và thể tích vật.
*   **Nguyên lý I Nhiệt động lực học**: Độ biến thiên nội năng của hệ bằng tổng công và nhiệt lượng mà hệ nhận được:
    $$\\Delta U = A + Q$$
*   **Quy ước dấu**:
    *   $Q > 0$: Hệ nhận nhiệt lượng; $Q < 0$: Hệ truyền nhiệt lượng.
    *   $A > 0$: Hệ nhận công; $A < 0$: Hệ thực hiện công (sinh công).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Cách ghi nhớ quy ước dấu bằng phép ẩn dụ**:
    Hãy đóng vai là "Hệ khí".
    *   Nhiệt lượng $Q$: Nhận được năng lượng từ bên ngoài $\\Rightarrow$ Có lợi $\\Rightarrow$ Mang dấu cộng ($Q > 0$). Phát tán nhiệt ra ngoài $\\Rightarrow$ Mất năng lượng $\\Rightarrow$ Mang dấu trừ ($Q < 0$).
    *   Công $A$: Bị lực bên ngoài nén lại $\\Rightarrow$ Nhận công $\\Rightarrow$ Mang dấu cộng ($A > 0$). Giãn nở đẩy piston ra ngoài $\\Rightarrow$ Phải tiêu tốn sức để làm việc $\\Rightarrow$ Sinh công $\\Rightarrow$ Mang dấu trừ ($A < 0$).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Người ta truyền cho khí trong xilanh một nhiệt lượng $100\\text{ J}$. Khí nở ra thực hiện công $70\\text{ J}$ đẩy piston lên. Tính độ biến thiên nội năng của khí.
    *   *Giải*:
        *   Hệ nhận nhiệt lượng: $Q = +100\\text{ J}$.
        *   Khí thực hiện công (sinh công): $A = -70\\text{ J}$.
        *   Áp dụng nguyên lý I:
            $\\Delta U = A + Q = -70 + 100 = 30\\text{ J}$.
        *   *Kết luận*: Nội năng của hệ tăng thêm $30\\text{ J}$.`
      }
    ]
  }),

  physics_11: makeContext({
    title: 'Vật lý 11 - Điện, Từ và Quang học',
    author: 'NXB Giáo dục Việt Nam',
    totalPages: 200,
    description: 'Điện tích điện trường, dòng điện không đổi, từ trường, cảm ứng điện từ và quang học.',
    chapters: [
      { id: 'p11_ch1', title: 'Chương 1: Điện tích. Điện trường', pages: '1-30', content: 'Định luật Coulomb, cường độ điện trường, điện thế, tụ điện.' },
      { id: 'p11_ch2', title: 'Chương 2: Dòng điện không đổi', pages: '31-60', content: 'Định luật Ohm toàn mạch, nguồn điện, ghép nguồn.' },
      { id: 'p11_ch3', title: 'Chương 3: Dòng điện trong các môi trường', pages: '61-90', content: 'Kim loại, chất điện phân, chất khí, bán dẫn.' },
      { id: 'p11_ch4', title: 'Chương 4: Từ trường', pages: '91-120', content: 'Lực từ, cảm ứng từ, lực Lorentz.' },
      { id: 'p11_ch5', title: 'Chương 5: Cảm ứng điện từ', pages: '121-145', content: 'Từ thông, suất điện động cảm ứng, tự cảm.' },
      { id: 'p11_ch6', title: 'Chương 6: Quang hình học', pages: '146-180', content: 'Khúc xạ ánh sáng, phản xạ toàn phần, lăng kính, thấu kính, mắt và các dụng cụ quang.' }
    ],
    lectures: [
      {
        chapterId: 'p11_ch1',
        title: 'Bài giảng Chương 1: Điện tích - Điện trường',
        basic: `### Lý thuyết nền tảng
*   **Định luật Coulomb**: Lực hút hoặc đẩy giữa hai điện tích điểm đặt trong chân không:
    $$F = k \\frac{|q_1 q_2|}{r^2}$$
    (với $k = 9 \\cdot 10^9\\text{ N.m}^2\\text{/C}^2$, $r$ là khoảng cách). Trong môi trường điện môi, lực giảm đi $\\varepsilon$ lần: $F = k \\frac{|q_1 q_2|}{\\varepsilon r^2}$.
*   **Cường độ điện trường**: Đại lượng đặc trưng cho tác dụng lực của điện trường:
    $$E = \\frac{F}{|q|} = k \\frac{|Q|}{\\varepsilon r^2}$$
*   **Tụ điện**: Tích lũy điện tích. Công thức điện dung: $C = \\frac{Q}{U}$. Năng lượng tụ điện: $W = \\frac{1}{2}CU^2$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Nguyên lý chồng chất điện trường**:
    Khi có nhiều điện tích tạo ra các điện trường $\\vec{E}_1, \\vec{E}_2...$ tại một điểm, cường độ điện trường tổng hợp được tính theo quy tắc cộng vector: $\\vec{E} = \\vec{E}_1 + \\vec{E}_2 + ...$.
*   *Mẹo*: Vẽ đúng chiều vector điện trường. Điện trường $\\vec{E}$ do điện tích dương tạo ra hướng ra xa điện tích; do điện tích âm tạo ra hướng về phía điện tích.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Hai điện tích điểm $q_1 = 2 \\cdot 10^{-8}\\text{ C}$ và $q_2 = -2 \\cdot 10^{-8}\\text{ C}$ đặt tại hai điểm A và B cách nhau $10\\text{ cm}$ trong không khí. Tính cường độ điện trường tại trung điểm M của đoạn thẳng AB.
    *   *Giải*:
        *   Khoảng cách từ A và B đến M là $r = 5\\text{ cm} = 0.05\\text{ m}$.
        *   Điện tích $q_1 > 0 \\Rightarrow \\vec{E}_1$ hướng từ A sang M (hướng sang phải).
            $E_1 = 9 \\cdot 10^9 \\frac{2 \\cdot 10^{-8}}{0.05^2} = 72000\\text{ V/m}$.
        *   Điện tích $q_2 < 0 \\Rightarrow \\vec{E}_2$ hướng từ M sang B (hướng sang phải).
            $E_2 = 9 \\cdot 10^9 \\frac{|-2 \\cdot 10^{-8}|}{0.05^2} = 72000\\text{ V/m}$.
        *   Vì $\\vec{E}_1$ và $\\vec{E}_2$ cùng chiều nên: $E = E_1 + E_2 = 144000\\text{ V/m}$ hướng từ A sang B.`
      },
      {
        chapterId: 'p11_ch2',
        title: 'Bài giảng Chương 2: Dòng điện không đổi',
        basic: `### Lý thuyết nền tảng
*   **Dòng điện**: Dòng dịch chuyển có hướng của các hạt mang điện. Cường độ dòng điện $I = \\frac{\\Delta q}{\\Delta t}$.
*   **Định luật Ohm cho đoạn mạch chỉ có điện trở**: $I = \\frac{U}{R}$.
*   **Định luật Ohm cho toàn mạch**:
    $$I = \\frac{\\mathcal{E}}{R_N + r}$$
    (với $\\mathcal{E}$ là suất điện động của nguồn, $r$ là điện trở trong, $R_N$ là điện trở mạch ngoài).
*   **Công suất tiêu thụ của mạch ngoài**: $P = I^2 R_N = U I$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Hiện tượng đoản mạch**:
    Xảy ra khi nối hai cực của nguồn điện bằng một dây dẫn có điện trở rất nhỏ ($R_N \\approx 0$). Lúc này dòng điện trong mạch đạt cực đại: $I_{max} = \\frac{\\mathcal{E}}{r}$. Dòng điện quá lớn này tỏa nhiệt mạnh làm hỏng nguồn điện và có thể gây cháy nổ. Do đó cầu chì luôn được lắp trong mạch điện để ngắt điện khi có đoản mạch.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Một nguồn điện có suất điện động $\\mathcal{E} = 6\\text{ V}$ và điện trở trong $r = 1\\text{ }\\Omega$. Mạch ngoài là một bóng đèn có điện trở $R = 5\\text{ }\\Omega$. Tính cường độ dòng điện trong mạch và hiệu điện thế mạch ngoài.
    *   *Giải*:
        *   Áp dụng định luật Ohm toàn mạch:
            $I = \\frac{\\mathcal{E}}{R + r} = \\frac{6}{5 + 1} = 1\\text{ A}$.
        *   Hiệu điện thế mạch ngoài (hiệu điện thế hai đầu bóng đèn):
            $U = I \\cdot R = 1 \\cdot 5 = 5\\text{ V}$ (hoặc dùng $U = \\mathcal{E} - I \\cdot r = 6 - 1 \\cdot 1 = 5\\text{ V}$).`
      },
      {
        chapterId: 'p11_ch3',
        title: 'Bài giảng Chương 3: Dòng điện trong các môi trường',
        basic: `### Lý thuyết nền tảng
*   **Trong kim loại**: Hạt tải điện là các electron tự do. Điện trở của kim loại tăng khi nhiệt độ tăng: $\\rho = \\rho_0 [1 + \\alpha(t - t_0)]$.
*   **Trong chất điện phân**: Hạt tải điện là các ion dương và ion âm.
    *   Định luật Faraday về điện phân:
        $$m = \\frac{1}{F} \\cdot \\frac{A}{n} \\cdot I \\cdot t$$
        (với $F = 96500\\text{ C/mol}$, $A$ là khối lượng mol, $n$ là hóa trị, $I$ tính bằng ampe, $t$ tính bằng giây).
*   **Trong chất bán dẫn**: Hạt tải điện là electron tự do và lỗ trống. Bán dẫn loại p có hạt tải điện chủ yếu là lỗ trống, loại n chủ yếu là electron.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tại sao điện trở của kim loại lại tăng khi nhiệt độ tăng?**:
    Nhiệt độ tăng làm các ion ở nút mạng tinh thể kim loại dao động mạnh hơn, cản trở chuyển động có hướng của các electron tự do, làm tăng tần suất va chạm dẫn tới tăng điện trở.
*   *Mẹo*: Khi tính toán định luật Faraday, luôn đảm bảo đơn vị của thời gian $t$ là giây. Nếu đề cho phút hoặc giờ thì phải đổi ra giây trước khi lắp vào công thức.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Tiến hành điện phân dung dịch muối đồng sunfat ($CuSO_4$) với cực dương bằng đồng. Cường độ dòng điện qua bình điện phân là $I = 2\\text{ A}$. Tính khối lượng đồng bám vào cực âm sau thời gian $16\\text{ phút } 5\\text{ giây}$. Cho đồng có $A = 64, n = 2$.
    *   *Giải*:
        *   Đổi thời gian: $t = 16 \\cdot 60 + 5 = 965\\text{ s}$.
        *   Áp dụng định luật Faraday:
            $m = \\frac{1}{96500} \\cdot \\frac{64}{2} \\cdot 2 \\cdot 965$
            $m = \\frac{965}{96500} \\cdot 32 \\cdot 2 = 0.01 \\cdot 64 = 0.64\\text{ g}$.`
      },
      {
        chapterId: 'p11_ch4',
        title: 'Bài giảng Chương 4: Từ trường',
        basic: `### Lý thuyết nền tảng
*   **Từ trường**: Môi trường vật chất đặc biệt xung quanh dòng điện hoặc nam châm, tác dụng lực từ lên dòng điện hoặc điện tích chuyển động đặt trong nó.
*   **Lực từ tác dụng lên đoạn dây dẫn mang dòng điện**:
    $$F = B \\cdot I \\cdot l \\cdot \\sin\\alpha$$
    (với $\\alpha = (\\vec{B}, \\vec{l})$).
*   **Lực Lorentz (Lực tác dụng lên điện tích chuyển động)**:
    $$f = |q| \\cdot v \\cdot B \\cdot \\sin\\theta$$
    (với $\\theta = (\\vec{v}, \\vec{B})$).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Quy tắc bàn tay trái xác định lực Lorentz**:
    Đặt bàn tay trái sao cho các đường cảm ứng từ $\\vec{B}$ xuyên vào lòng bàn tay, chiều từ cổ tay đến ngón tay giữa chỉ chiều của vận tốc $\\vec{v}$. Khi đó:
    *   Nếu điện tích $q > 0$: Ngón tay cái chĩa ra $90^\\circ$ chỉ chiều của lực Lorentz $\\vec{f}$.
    *   Nếu điện tích $q < 0$: Lực Lorentz $\\vec{f}$ có chiều ngược lại với chiều ngón cái chỉ.
*   *Lưu ý*: Học sinh rất hay quên lật ngược chiều lực khi gặp điện tích âm (như hạt electron).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Một hạt electron bay vào trong từ trường đều có cảm ứng từ $B = 0.2\\text{ T}$ với vận tốc $v = 10^6\\text{ m/s}$ theo phương vuông góc với các đường sức từ. Tính độ lớn lực Lorentz tác dụng lên electron. Cho điện tích electron là $q = -1.6 \\cdot 10^{-19}\\text{ C}$.
    *   *Giải*:
        *   Vì vận tốc vuông góc với từ trường nên $\\theta = 90^\\circ \\Rightarrow \\sin\\theta = 1$.
        *   Độ lớn lực Lorentz:
            $f = |q| \\cdot v \\cdot B \\cdot \\sin 90^\\circ = |-1.6 \\cdot 10^{-19}| \\cdot 10^6 \\cdot 0.2 \\cdot 1$
            $f = 1.6 \\cdot 10^{-19} \\cdot 2 \\cdot 10^5 = 3.2 \\cdot 10^{-14}\\text{ N}$.`
      },
      {
        chapterId: 'p11_ch5',
        title: 'Bài giảng Chương 5: Cảm ứng điện từ',
        basic: `### Lý thuyết nền tảng
*   **Từ thông**: $\\Phi = B \\cdot S \\cdot \\cos\\alpha$ (với $\\alpha$ là góc giữa vector pháp tuyến $\\vec{n}$ của mặt phẳng vòng dây và cảm ứng từ $\\vec{B}$). Đơn vị của từ thông là Weber (Wb).
*   **Hiện tượng cảm ứng điện từ**: Khi từ thông qua một mạch kín biến thiên, trong mạch xuất hiện dòng điện cảm ứng.
*   **Suất điện động cảm ứng (Định luật Faraday)**:
    $$e_c = -\\frac{\\Delta\\Phi}{\\Delta t}$$
    (Độ lớn: $|e_c| = \\left|\\frac{\\Delta\\Phi}{\\Delta t}\\right|$).
*   **Định luật Lenz**: Dòng điện cảm ứng có chiều sao cho từ trường do nó sinh ra có tác dụng chống lại sự biến thiên của từ thông sinh ra nó.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Giải thích dấu trừ (-) trong định luật Faraday**:
    Dấu trừ biểu thị định luật Lenz (sự chống lại sự biến thiên).
    *   Nếu từ thông tăng ($\\Delta\\Phi > 0$): Từ trường cảm ứng $\\vec{B}_c$ sẽ ngược chiều với từ trường ngoài $\\vec{B}$ để ngăn cản sự tăng.
    *   Nếu từ thông giảm ($\\Delta\\Phi < 0$): Từ trường cảm ứng $\\vec{B}_c$ sẽ cùng chiều với từ trường ngoài $\\vec{B}$ để bổ trợ ngăn cản sự giảm.
*   *Mẹo*: Hiện tượng tự cảm là trường hợp riêng của cảm ứng điện từ khi sự biến thiên từ thông được gây ra bởi chính sự biến thiên của cường độ dòng điện trong mạch: $e_{tc} = -L \\frac{\\Delta i}{\\Delta t}$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Một khung dây phẳng có diện tích $S = 20\\text{ cm}^2$ đặt trong từ trường đều. Cảm ứng từ $B$ biến thiên đều từ $0.1\\text{ T}$ đến $0.6\\text{ T}$ trong khoảng thời gian $0.1\\text{ s}$. Vectơ pháp tuyến của khung dây cùng hướng với vectơ cảm ứng từ. Tính độ lớn suất điện động cảm ứng trong khung dây.
    *   *Giải*:
        *   Đổi đơn vị diện tích: $S = 20\\text{ cm}^2 = 20 \\cdot 10^{-4}\\text{ m}^2 = 2 \\cdot 10^{-3}\\text{ m}^2$.
        *   Vì $\\vec{n} \\parallel \\vec{B} \\Rightarrow \\alpha = 0^\\circ \\Rightarrow \\cos\\alpha = 1$.
        *   Từ thông ban đầu: $\\Phi_1 = B_1 S \\cos 0^\\circ = 0.1 \\cdot 2 \\cdot 10^{-3} = 2 \\cdot 10^{-4}\\text{ Wb}$.
        *   Từ thông lúc sau: $\\Phi_2 = B_2 S  \\cos 0^\\circ = 0.6 \\cdot 2 \\cdot 10^{-3} = 12 \\cdot 10^{-4}\\text{ Wb}$.
        *   Độ biến thiên từ thông: $\\Delta\\Phi = \\Phi_2 - \\Phi_1 = 10 \\cdot 10^{-4} = 10^{-3}\\text{ Wb}$.
        *   Độ lớn suất điện động cảm ứng: $|e_c| = \\frac{\\Delta\\Phi}{\\Delta t} = \\frac{10^{-3}}{0.1} = 0.01\\text{ V} = 10\\text{ mV}$.`
      },
      {
        chapterId: 'p11_ch6',
        title: 'Bài giảng Chương 6: Quang hình học',
        basic: `### Lý thuyết nền tảng
*   **Định luật khúc xạ ánh sáng**:
    $$n_1 \\sin i = n_2 \\sin r$$
    (với $i$ là góc tới, $r$ là góc khúc xạ, $n_1, n_2$ là chiết suất của môi trường 1 và 2).
*   **Hiện tượng phản xạ toàn phần**: Ánh sáng bị phản xạ toàn bộ trở lại môi trường chứa tia tới.
    *   Điều kiện:
        1. Ánh sáng truyền từ môi trường chiết quang hơn sang môi trường kém chiết quang hơn ($n_1 > n_2$).
        2. Góc tới lớn hơn hoặc bằng góc giới hạn phản xạ toàn phần: $i \\ge i_{gh}$ với $\\sin i_{gh} = \\frac{n_2}{n_1}$.
*   **Công thức thấu kính**:
    $$\\frac{1}{f} = \\frac{1}{d} + \\frac{1}{d'}$$
    (Độ phóng đại ảnh: $k = -\\frac{d'}{d}$).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Quy ước dấu trong công thức thấu kính**:
    *   Tiêu cự $f$: Thấu kính hội tụ $f > 0$; Thấu kính phân kỳ $f < 0$.
    *   Khoảng cách vật $d$: Vật thật $d > 0$.
    *   Khoảng cách ảnh $d'$: Ảnh thật $d' > 0$ (ảnh ngược chiều vật); Ảnh ảo $d' < 0$ (ảnh cùng chiều vật).
*   *Mẹo*: Khi đề cho "ảnh cao gấp $3$ lần vật và là ảnh ảo", ta suy ra ngay $k = +3 \\Rightarrow -\\frac{d'}{d} = 3 \\Rightarrow d' = -3d$. Nếu là ảnh thật thì $k = -3 \\Rightarrow d' = 3d$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Một thấu kính hội tụ có tiêu cự $f = 20\\text{ cm}$. Một vật sáng đặt trước thấu kính và cách thấu kính $30\\text{ cm}$. Xác định vị trí và tính chất của ảnh.
    *   *Giải*:
        *   Ta có: $f = 20\\text{ cm} > 0$ (thấu kính hội tụ), $d = 30\\text{ cm}$.
        *   Áp dụng công thức thấu kính:
            $\\frac{1}{f} = \\frac{1}{d} + \\frac{1}{d'} \\Rightarrow \\frac{1}{20} = \\frac{1}{30} + \\frac{1}{d'}$
            $\\Rightarrow \\frac{1}{d'} = \\frac{1}{20} - \\frac{1}{30} = \\frac{3-2}{60} = \\frac{1}{60} \\Rightarrow d' = 60\\text{ cm}$.
        *   Vì $d' = 60\\text{ cm} > 0$ nên ảnh thu được là **ảnh thật**, cách thấu kính $60\\text{ cm}$ và ngược chiều với vật.`
      }
    ]
  }),

  physics_12: makeContext({
    title: 'Vật lý 12 - Dao động, Sóng, Điện xoay chiều & Lượng tử',
    author: 'NXB Giáo dục Việt Nam',
    totalPages: 260,
    description: 'Dao động cơ, sóng cơ, dòng điện xoay chiều, sóng điện từ, sóng ánh sáng, lượng tử và hạt nhân.',
    chapters: [
      { id: 'p12_ch1', title: 'Chương 1: Dao động cơ', pages: '1-45', content: 'Dao động điều hòa, con lắc lò xo, con lắc đơn, dao động tắt dần, cưỡng bức, tổng hợp dao động.' },
      { id: 'p12_ch2', title: 'Chương 2: Sóng cơ và Sóng âm', pages: '46-80', content: 'Phương trình sóng, giao thoa sóng, sóng dừng, đặc trưng vật lý và sinh lý của âm.' },
      { id: 'p12_ch3', title: 'Chương 3: Dòng điện xoay chiều', pages: '81-125', content: 'Đại lượng hiệu dụng, mạch RLC nối tiếp, công suất, máy phát điện, động cơ, máy biến áp.' },
      { id: 'p12_ch4', title: 'Chương 4: Dao động và Sóng điện từ', pages: '126-150', content: 'Mạch dao động LC, điện từ trường, truyền thông tin bằng sóng vô tuyến.' },
      { id: 'p12_ch5', title: 'Chương 5: Sóng ánh sáng', pages: '151-180', content: 'Tán sắc, nhiễu xạ, giao thoa ánh sáng (khe Y-âng), quang phổ.' },
      { id: 'p12_ch6', title: 'Chương 6: Lượng tử ánh sáng', pages: '181-205', content: 'Hiện tượng quang điện, thuyết lượng tử, mẫu nguyên tử Bohr.' },
      { id: 'p12_ch7', title: 'Chương 7: Hạt nhân nguyên tử', pages: '206-240', content: 'Tính chất hạt nhân, độ hụt khối, năng lượng liên kết, phóng xạ, phản ứng phân hạch và nhiệt hạch.' }
    ],
    lectures: [
      {
        chapterId: 'p12_ch1',
        title: 'Bài giảng Chương 1: Dao động cơ học',
        basic: `### Lý thuyết nền tảng
*   **Phương trình dao động điều hòa**:
    $$x = A \\cos(\\omega t + \\varphi)$$
    (với $x$ là li độ, $A$ là biên độ, $\\omega$ là tần số góc, $\\varphi$ là pha ban đầu).
*   **Mối liên hệ giữa vận tốc, gia tốc và li độ**:
    *   Vận tốc: $v = x' = -\\omega A \\sin(\\omega t + \\varphi)$ (nhanh pha hơn $x$ góc $\\frac{\\pi}{2}$).
    *   Gia tốc: $a = v' = x'' = -\\omega^2 A \\cos(\\omega t + \\varphi) = -\\omega^2 x$ (ngược pha với $x$).
*   **Hệ thức độc lập thời gian**:
    $$A^2 = x^2 + \\frac{v^2}{\\omega^2} = \\frac{a^2}{\\omega^4} + \\frac{v^2}{\\omega^2}$$`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phương pháp đường tròn lượng giác tính thời gian nhanh**:
    Mọi dao động điều hòa li độ $x$ đều có thể quy đổi thành hình chiếu của một chuyển động tròn đều có bán kính bằng biên độ $A$, tốc độ góc bằng $\\omega$.
    *   Bước 1: Vẽ đường tròn, xác định các điểm pha đầu và pha cuối dựa vào vị trí $x$.
    *   Bước 2: Xác định góc quét $\\Delta \\alpha$ giữa hai vị trí.
    *   Bước 3: Tính thời gian đi được: $\\Delta t = \\frac{\\Delta \\alpha}{\\omega}$.
    Phương pháp này loại bỏ hoàn toàn các phép tích phân lượng giác phức tạp.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Một vật dao động điều hòa với phương trình $x = 4 \\cos(10\\pi t)\\text{ cm}$. Tính vận tốc cực đại và gia tốc cực đại của vật.
    *   *Giải*:
        *   Từ phương trình, ta có Biên độ $A = 4\\text{ cm} = 0.04\\text{ m}$, tần số góc $\\omega = 10\\pi\\text{ rad/s}$.
        *   Vận tốc cực đại của vật:
            $v_{max} = \\omega A = 10\\pi \\cdot 4 = 40\\pi\\text{ cm/s} \\approx 1.25\\text{ m/s}$.
        *   Gia tốc cực đại của vật:
            $a_{max} = \\omega^2 A = (10\\pi)^2 \\cdot 4 = 100 \\cdot 10 \\cdot 4 = 4000\\text{ cm/s}^2 = 40\\text{ m/s}^2$ (lấy $\\pi^2 \\approx 10$).`
      },
      {
        chapterId: 'p12_ch2',
        title: 'Bài giảng Chương 2: Sóng cơ và Sóng âm',
        basic: `### Lý thuyết nền tảng
*   **Sóng cơ**: Sự lan truyền dao động cơ trong môi trường vật chất theo thời gian. Sóng cơ không truyền được trong chân không.
*   **Các đại lượng**:
    *   Bước sóng $\\lambda$: Quãng đường sóng truyền đi được trong một chu kỳ: $\\lambda = v T = \\frac{v}{f}$.
*   **Giao thoa sóng (Hai nguồn cùng pha)**:
    *   Cực đại giao thoa: $d_2 - d_1 = k \\lambda$ ($k \\in \\mathbb{Z}$).
    *   Cực tiểu giao thoa: $d_2 - d_1 = (k + 0.5) \\lambda$.
*   **Sóng dừng (Dây có hai đầu cố định)**:
    *   Điều kiện có sóng dừng: $L = k \\frac{\\lambda}{2}$ (với $k$ là số bụng sóng, $k+1$ là số nút sóng).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Sự khác biệt giữa Đặc trưng Vật lý và Sinh lý của âm**:
    Học sinh rất hay nhầm lẫn hai nhóm khái niệm này:
    *   **Đặc trưng vật lý** (đo lường được): Tần số âm ($f$), Cường độ âm ($I$) và Mức cường độ âm ($L$), Đồ thị dao động âm.
    *   **Đặc trưng sinh lý** (cảm nhận của tai người): Độ cao (gắn liền với tần số), Độ to (gắn liền với mức cường độ âm), Âm sắc (gắn liền với đồ thị dao động âm - giúp phân biệt tiếng đàn bầu với tiếng đàn piano dù cùng một nốt nhạc).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Trên một sợi dây dài $1.2\\text{ m}$ hai đầu cố định đang có sóng dừng với 3 bụng sóng. Biết tần số dao động của dây là $50\\text{ Hz}$. Tính tốc độ truyền sóng trên dây.
    *   *Giải*:
        *   Vì hai đầu cố định và có 3 bụng sóng nên ta có $k = 3$.
        *   Áp dụng điều kiện sóng dừng:
            $L = k \\frac{\\lambda}{2} \\Rightarrow 1.2 = 3 \\cdot \\frac{\\lambda}{2} \\Rightarrow \\lambda = 0.8\\text{ m}$.
        *   Tốc độ truyền sóng:
            $v = \\lambda \\cdot f = 0.8 \\cdot 50 = 40\\text{ m/s}$.`
      },
      {
        chapterId: 'p12_ch3',
        title: 'Bài giảng Chương 3: Dòng điện xoay chiều',
        basic: `### Lý thuyết nền tảng
*   **Mạch RLC mắc nối tiếp**:
    *   Cảm kháng: $Z_L = \\omega L$. Dung kháng: $Z_C = \\frac{1}{\\omega C}$.
    *   Tổng trở: $Z = \\sqrt{R^2 + (Z_L - Z_C)^2}$.
    *   Định luật Ohm: $I = \\frac{U}{Z}$.
    *   Độ lệch pha $\\varphi$ giữa $u$ và $i$: $\\tan\\varphi = \\frac{Z_L - Z_C}{R}$.
*   **Công suất tiêu thụ**: $P = U I \\cos\\varphi = I^2 R$ (với $\\cos\\varphi = \\frac{R}{Z}$ là hệ số công suất).
*   **Hiện tượng cộng hưởng điện**:
    Xảy ra khi $Z_L = Z_C \\Leftrightarrow \\omega = \\frac{1}{\\sqrt{LC}}$. Lúc này $Z_{min} = R$, dòng điện $I_{max} = \\frac{U}{R}$ và hệ số công suất đạt cực đại $\\cos\\varphi = 1$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tại sao điện áp xoay chiều không thể cộng đại số?**:
    Vì điện áp trên các phần tử $R, L, C$ không cùng pha. Điện áp $u_R$ cùng pha với $i$, $u_L$ sớm pha hơn $i$ góc $90^circ$, $u_C$ trễ pha hơn $i$ góc $90^circ$. Do đó, ta phải sử dụng giản đồ vector (phương pháp hình học) hoặc số phức để cộng các đại lượng này: $\\vec{U} = \\vec{U}_R + \\vec{U}_L + \\vec{U}_C$.
*   *Mẹo*: Khi làm toán trắc nghiệm RLC biến thiên, hãy nhớ công thức cộng hưởng để giải quyết nhanh các bài toán cho công suất cực đại.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Cho mạch điện RLC nối tiếp có $R = 30\\text{ }\\Omega$, cuộn cảm có cảm kháng $Z_L = 80\\text{ }\\Omega$ và tụ điện có dung kháng $Z_C = 40\\text{ }\\Omega$. Đặt vào hai đầu đoạn mạch hiệu điện thế hiệu dụng $U = 100\\text{ V}$. Tính tổng trở của mạch và công suất tiêu thụ của mạch.
    *   *Giải*:
        *   Tính tổng trở $Z$:
            $Z = \\sqrt{R^2 + (Z_L - Z_C)^2} = \\sqrt{30^2 + (80 - 40)^2} = \\sqrt{30^2 + 40^2} = 50\\text{ }\\Omega$.
        *   Cường độ dòng điện hiệu dụng: $I = \\frac{U}{Z} = \\frac{100}{50} = 2\\text{ A}$.
        *   Công suất tiêu thụ của mạch:
            $P = I^2 \\cdot R = 2^2 \\cdot 30 = 120\\text{ W}$.`
      },
      {
        chapterId: 'p12_ch4',
        title: 'Bài giảng Chương 4: Dao động và Sóng điện từ',
        basic: `### Lý thuyết nền tảng
*   **Mạch dao động LC**: Gồm một cuộn cảm $L$ mắc nối tiếp với một tụ điện $C$ tạo thành mạch kín.
    *   Tần số góc riêng: $\\omega = \\frac{1}{\\sqrt{LC}}$.
    *   Chu kỳ riêng: $T = 2\\pi\\sqrt{LC}$.
*   **Sóng điện từ**: Là điện từ trường lan truyền trong không gian. Sóng điện từ là sóng ngang, truyền được trong chân không với tốc độ bằng tốc độ ánh sáng ($c = 3 \\cdot 10^8\\text{ m/s}$).
*   Bước sóng điện từ trong chân không: $\\lambda = c T = 2\\pi c \\sqrt{LC}$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Sự tương đồng giữa Dao động cơ và Dao động điện từ**:
    Để giúp học sinh dễ nhớ bài, ta thiết lập bảng tương quan:
    *   Li độ $x$ tương ứng với Điện tích bản tụ $q$.
    *   Vận tốc $v$ tương ứng với Cường độ dòng điện $i$.
    *   Khối lượng $m$ tương ứng với Độ tự cảm $L$.
    *   Độ cứng $k$ tương ứng với Nghịch đảo điện dung $\\frac{1}{C}$.
    *   Động năng $W_d$ tương ứng với Năng lượng từ trường $W_L = \\frac{1}{2}Li^2$.
    *   Thế năng $W_t$ tương ứng với Năng lượng điện trường $W_C = \\frac{1}{2}\\frac{q^2}{C}$.
    Từ đây suy ra mọi công thức biến đổi năng lượng của mạch LC giống hệt con lắc lò xo.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Một mạch dao động LC lí tưởng gồm cuộn cảm có độ tự cảm $L = 2\\text{ mH}$ và tụ điện có điện dung $C = 8\\text{ }\\mu\\text{F}$. Tính chu kỳ dao động riêng và tần số góc của mạch.
    *   *Giải*:
        *   Đổi đơn vị: $L = 2 \\cdot 10^{-3}\\text{ H}, C = 8 \\cdot 10^{-6}\\text{ F}$.
        *   Tần số góc riêng:
            $\\omega = \\frac{1}{\\sqrt{LC}} = \\frac{1}{\\sqrt{2 \\cdot 10^{-3} \\cdot 8 \\cdot 10^{-6}}} = \\frac{1}{\\sqrt{16 \\cdot 10^{-9}}} = \\frac{1}{4 \\cdot 10^{-4.5}}$
            $\\omega = \\frac{1}{4 \\cdot 10^{-4} \\sqrt{10}} = \\frac{10000}{4\\sqrt{10}} = 2500\\sqrt{10}\\text{ rad/s} \\approx 7905.7\\text{ rad/s}$.
        *   Chu kỳ dao động:
            $T = 2\\pi\\sqrt{LC} = 2\\pi \\sqrt{16 \\cdot 10^{-9}} = 8\\pi \\cdot 10^{-4.5} \\approx 7.95 \\cdot 10^{-4}\\text{ s}$.`
      },
      {
        chapterId: 'p12_ch5',
        title: 'Bài giảng Chương 5: Sóng ánh sáng',
        basic: `### Lý thuyết nền tảng
*   **Tán sắc ánh sáng**: Hiện tượng chùm ánh sáng phức tạp bị phân tích thành các chùm ánh sáng đơn sắc khi đi qua lăng kính.
*   **Giao thoa ánh sáng (Khe Y-âng)**:
    *   Khoảng vân (khoảng cách giữa hai vân sáng hoặc hai vân tối liên tiếp):
        $$i = \\frac{\\lambda D}{a}$$
        (với $\\lambda$ là bước sóng, $D$ là khoảng cách từ mặt phẳng chứa hai khe đến màn, $a$ là khoảng cách giữa hai khe sáng).
    *   Vị trí vân sáng: $x_s = k i = k \\frac{\\lambda D}{a}$ ($k \\in \\mathbb{Z}$).
    *   Vị trí vân tối: $x_t = (k + 0.5) i = (k + 0.5) \\frac{\\lambda D}{a}$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Bản chất của hiện tượng tán sắc**:
    Chiết suất của một môi trường trong suốt đối với các ánh sáng đơn sắc khác nhau là khác nhau. Chiết suất tăng dần từ ánh sáng đỏ đến ánh sáng tím: $n_{đỏ} < n_{cam} < n_{vàng} < n_{lục} < n_{lam} < n_{chàm} < n_{tím}$. Do đó khi đi qua lăng kính, ánh sáng tím bị lệch nhiều nhất, ánh sáng đỏ bị lệch ít nhất, tạo thành dải phổ 7 màu cầu vồng.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Trong thí nghiệm giao thoa ánh sáng dùng khe Y-âng, khoảng cách giữa hai khe là $a = 1\\text{ mm}$, khoảng cách từ khe đến màn là $D = 2\\text{ m}$. Chiếu vào khe ánh sáng đơn sắc có bước sóng $\\lambda = 0.5\\text{ }\\mu\\text{m}$. Tính khoảng vân và khoảng cách từ vân sáng trung tâm đến vân sáng bậc 3.
    *   *Giải*:
        *   Đổi đơn vị chuẩn: $a = 1\\text{ mm} = 10^{-3}\\text{ m}$, $D = 2\\text{ m}$, $\\lambda = 0.5\\text{ }\\mu\\text{m} = 0.5 \\cdot 10^{-6}\\text{ m}$.
        *   Khoảng vân $i$:
            $i = \\frac{\\lambda D}{a} = \\frac{0.5 \\cdot 10^{-6} \\cdot 2}{10^{-3}} = 10^{-3}\\text{ m} = 1\\text{ mm}$.
        *   Vị trí vân sáng bậc 3 ứng với $k = 3$:
            $x_{s3} = 3 i = 3 \\cdot 1\\text{ mm} = 3\\text{ mm}$.`
      },
      {
        chapterId: 'p12_ch6',
        title: 'Bài giảng Chương 6: Lượng tử ánh sáng',
        basic: `### Lý thuyết nền tảng
*   **Thuyết lượng tử ánh sáng (Einstein)**: Ánh sáng được cấu tạo bởi các hạt gọi là photon. Mỗi photon của ánh sáng đơn sắc có năng lượng xác định:
    $$\\varepsilon = h f = \\frac{h c}{\\lambda}$$
    (với $h = 6.625 \\cdot 10^{-34}\\text{ J.s}$ là hằng số Planck, $c = 3 \\cdot 10^8\\text{ m/s}$).
*   **Giới hạn quang điện**: Hiện tượng quang điện xảy ra khi bước sóng của ánh sáng kích thích nhỏ hơn hoặc bằng giới hạn quang điện của kim loại đó:
    $$\\lambda \\le \\lambda_0$$
    (với $\\lambda_0 = \\frac{hc}{A}$, $A$ là công thoát của electron).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Sự sụp đổ của thuyết sóng ánh sáng cổ điển**:
    Theo thuyết sóng, nếu cường độ ánh sáng chiếu vào đủ mạnh thì electron phải bật ra bất kể bước sóng nào. Tuy nhiên thực nghiệm chứng minh: nếu bước sóng lớn hơn $\\lambda_0$ (ví dụ chiếu tia hồng ngoại vào kẽm), electron không bao giờ bật ra cho dù chiếu cả ngày. Thuyết lượng tử giải quyết điều này bằng cách coi tương tác là sự va chạm 1-1 giữa 1 photon và 1 electron. Electron chỉ bứt ra khi photon truyền cho nó một năng lượng lớn hơn công thoát $A$.
*   *Mẹo*: Đổi đơn vị năng lượng từ eV sang Joule: $1\\text{ eV} = 1.6 \\cdot 10^{-19}\\text{ J}$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Tính công thoát $A$ của electron khỏi kim loại natri bằng đơn vị eV, biết giới hạn quang điện của natri là $\\lambda_0 = 0.5\\text{ }\\mu\\text{m}$.
    *   *Giải*:
        *   Đổi $\\lambda_0 = 0.5 \\cdot 10^{-6}\\text{ m}$.
        *   Công thoát $A$ tính theo Joule:
            $A = \\frac{hc}{\\lambda_0} = \\frac{6.625 \\cdot 10^{-34} \\cdot 3 \\cdot 10^8}{0.5 \\cdot 10^{-6}} = 3.975 \\cdot 10^{-19}\\text{ J}$.
        *   Đổi sang eV:
            $A = \\frac{3.975 \\cdot 10^{-19}}{1.6 \\cdot 10^{-19}} \\approx 2.48\\text{ eV}$.`
      },
      {
        chapterId: 'p12_ch7',
        title: 'Bài giảng Chương 7: Hạt nhân nguyên tử',
        basic: `### Lý thuyết nền tảng
*   **Cấu tạo hạt nhân**: Ký hiệu hạt nhân $^A_Z X$ có $Z$ hạt proton và $N = A - Z$ hạt nơtron ($A$ là số khối).
*   **Độ hụt khối**: Khối lượng hạt nhân luôn nhỏ hơn tổng khối lượng của các hạt cấu tạo nên nó:
    $$\\Delta m = (Z \\cdot m_p + (A-Z) \\cdot m_n) - m_{hn}$$
*   **Năng lượng liên kết**: $W_{lk} = \\Delta m \\cdot c^2$ (đơn vị MeV, với $1\\text{ u} \\cdot c^2 \\approx 931.5\\text{ MeV}$).
*   **Năng lượng liên kết riêng**: $W_{lkr} = \\frac{W_{lk}}{A}$ (Đại lượng đặc trưng cho mức độ bền vững của hạt nhân. Hạt nhân có năng lượng liên kết riêng càng lớn thì càng bền vững).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Định luật phóng xạ**: Phóng xạ là phản ứng hạt nhân tự phát, hoàn toàn ngẫu nhiên và không chịu bất kỳ tác động nào của môi trường ngoài (nhiệt độ, áp suất, phản ứng hóa học).
    *   Công thức khối lượng chất phóng xạ còn lại sau thời gian $t$:
        $$m(t) = m_0 \\cdot 2^{-\\frac{t}{T}} = m_0 e^{-\\lambda t}$$
        (với $T$ là chu kỳ bán rã, $\\lambda = \\frac{\\ln 2}{T}$ là hằng số phóng xạ).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Một chất phóng xạ có chu kỳ bán rã $T = 8\\text{ ngày}$. Ban đầu có $100\\text{ g}$ chất này. Hỏi sau $24\\text{ ngày}$, khối lượng chất phóng xạ còn lại là bao nhiêu?
    *   *Giải*:
        *   Thời gian phân rã: $t = 24\\text{ ngày}$.
        *   Số chu kỳ bán rã đã trôi qua: $\\frac{t}{T} = \\frac{24}{8} = 3$.
        *   Khối lượng còn lại:
            $m = m_0 \\cdot 2^{-\\frac{t}{T}} = 100 \\cdot 2^{-3} = 100 \\cdot \\frac{1}{8} = 12.5\\text{ g}$.`
      }
    ]
  }),

  // ================= HÓA HỌC =================
  chemistry_10: makeContext({
    title: 'Hoá học 10 - Cấu tạo chất và Bảng tuần hoàn',
    author: 'NXB Giáo dục Việt Nam',
    totalPages: 160,
    description: 'Cấu tạo nguyên tử, bảng tuần hoàn, liên kết hóa học, phản ứng hóa học, nhóm Halogen và Oxi-Lưu huỳnh.',
    chapters: [
      { id: 'h10_ch1', title: 'Chương 1: Nguyên tử', pages: '1-25', content: 'Thành phần nguyên tử, hạt nhân, lớp vỏ electron, cấu hình electron.' },
      { id: 'h10_ch2', title: 'Chương 2: Bảng tuần hoàn các nguyên tố hóa học', pages: '26-50', content: 'Cấu tạo bảng tuần hoàn, sự biến đổi tính chất (bán kính, độ âm điện).' },
      { id: 'h10_ch3', title: 'Chương 3: Liên kết hóa học', pages: '51-80', content: 'Liên kết ion, liên kết cộng hóa trị, lai hóa, tinh thể.' },
      { id: 'h10_ch4', title: 'Chương 4: Phản ứng oxi hóa - khử', pages: '81-100', content: 'Chất khử, chất oxi hóa, số oxi hóa, cân bằng phản ứng.' },
      { id: 'h10_ch5', title: 'Chương 5: Nhóm Halogen', pages: '101-130', content: 'Clo, Brom, Iot, Flo và các hợp chất (HCl, muối halogenua).' },
      { id: 'h10_ch6', title: 'Chương 6: Nhóm Oxi - Lưu huỳnh', pages: '131-150', content: 'Oxi, Ozon, Lưu huỳnh, H2S, SO2, H2SO4.' },
      { id: 'h10_ch7', title: 'Chương 7: Tốc độ phản ứng và cân bằng hóa học', pages: '151-160', content: 'Đại cương về tốc độ, các yếu tố ảnh hưởng.' }
    ],
    lectures: [
      {
        chapterId: 'h10_ch1',
        title: 'Bài giảng Chương 1: Nguyên tử',
        basic: `### Lý thuyết nền tảng
*   **Thành phần nguyên tử**:
    *   Hạt nhân (ở tâm): Gồm các hạt proton mang điện tích dương ($p, q_p = +1$) và hạt nơtron không mang điện ($n$).
    *   Vỏ nguyên tử: Gồm các hạt electron mang điện tích âm ($e, q_e = -1$) chuyển động quanh hạt nhân.
    *   Vì nguyên tử trung hòa về điện nên: Số proton ($Z$) = Số electron ($E$).
*   **Số khối ($A$)**: $A = Z + N$ (với $N$ là số nơtron).
*   **Cấu hình electron**: Phân bố các electron vào các lớp ($n = 1, 2, 3, 4...$) và phân lớp ($s, p, d, f$). Số lượng electron tối đa: lớp $s$ chứa tối đa 2e, $p$ chứa 6e, $d$ chứa 10e, $f$ chứa 14e.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Quy tắc Klechkovski về phân bố mức năng lượng**:
    Electron được điền vào phân lớp có mức năng lượng từ thấp đến cao: $1s \\to 2s \\to 2p \\to 3s \\to 3p \\to 4s \\to 3d \\to 4p...$
    *Lưu ý học sinh*: Rất nhiều học sinh nhầm lẫn giữa cấu hình electron và phân bố mức năng lượng.
    Ví dụ sắt ($Z=26$):
    - Phân bố năng lượng: $1s^2 2s^2 2p^6 3s^2 3p^6 4s^2 3d^6$.
    - Cấu hình electron thực tế (phải xếp lại các phân lớp thuộc cùng một lớp đứng cạnh nhau): $1s^2 2s^2 2p^6 3s^2 3p^6 3d^6 4s^2$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Viết cấu hình electron của nguyên tử đồng ($Cu, Z = 29$).
    *   *Giải*:
        *   Mức năng lượng theo Klechkovski: $1s^2 2s^2 2p^6 3s^2 3p^6 4s^2 3d^9$.
        *   *Hiện tượng bão hòa*: Do phân lớp $3d$ đạt trạng thái bền vững hơn khi đầy electron ($3d^{10}$ - bão hòa). Do đó, 1 electron từ phân lớp $4s$ sẽ nhảy sang phân lớp $3d$.
        *   Phân bố năng lượng thực tế: $1s^2 2s^2 2p^6 3s^2 3p^6 4s^1 3d^{10}$.
        *   Sắp xếp lại cấu hình electron của Cu: $1s^2 2s^2 2p^6 3s^2 3p^6 3d^{10} 4s^1$.`
      },
      {
        chapterId: 'h10_ch2',
        title: 'Bài giảng Chương 2: Bảng tuần hoàn các nguyên tố hóa học',
        basic: `### Lý thuyết nền tảng
*   **Nguyên tắc sắp xếp**:
    1. Các nguyên tố được xếp theo chiều tăng dần của điện tích hạt nhân nguyên tử.
    2. Các nguyên tố có cùng số lớp electron được xếp vào cùng một hàng (Chu kỳ).
    3. Các nguyên tố có cùng số electron hóa trị được xếp vào cùng một cột (Nhóm).
*   **Quy luật biến thiên tính chất trong một Chu kỳ (từ trái sang phải)**:
    *   Điện tích hạt nhân tăng dần $\\Rightarrow$ Lực hút của hạt nhân với electron lớp ngoài cùng mạnh hơn $\\Rightarrow$ Bán kính nguyên tử giảm dần $\\Rightarrow$ Tính kim loại giảm, tính phi kim tăng dần. Độ âm điện tăng dần.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Định hướng xác định vị trí nguyên tố dựa vào cấu hình electron**:
    Cho cấu hình electron lớp ngoài cùng.
    *   Số lớp electron = Số thứ tự chu kỳ.
    *   Số electron hóa trị = Số thứ tự nhóm (Đối với nhóm A: electron ngoài cùng là $s$ hoặc $p$. Đối với nhóm B: có phân lớp sát ngoài cùng $d$ chưa bão hòa).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Nguyên tố X có cấu hình electron lớp ngoài cùng là $3s^2 3p^5$. Xác định vị trí của X trong bảng tuần hoàn.
    *   *Giải*:
        *   Cấu hình electron đầy đủ của X là: $1s^2 2s^2 2p^6 3s^2 3p^5$.
        *   X có 3 lớp electron $\\Rightarrow$ X thuộc chu kỳ 3.
        *   X có phân lớp ngoài cùng là $p$ (nguyên tố $p$), số electron lớp ngoài cùng là $2 + 5 = 7 \\Rightarrow$ X thuộc nhóm VIIA.
        *   Tổng số electron là $2+2+6+2+5 = 17 \\Rightarrow$ X ở ô số 17 (là nguyên tố Clo - phi kim mạnh).`
      },
      {
        chapterId: 'h10_ch3',
        title: 'Bài giảng Chương 3: Liên kết hóa học',
        basic: `### Lý thuyết nền tảng
*   **Quy tắc bát tử (Octet)**: Khi hình thành liên kết hóa học, nguyên tử có xu hướng nhường, nhận hoặc góp chung electron để đạt cấu hình electron bền vững của khí hiếm với 8 electron ở lớp ngoài cùng (hoặc 2 đối với Heli).
*   **Liên kết ion**: Hình thành do lực hút tĩnh điện giữa các ion mang điện tích trái dấu (thường là kim loại điển hình và phi kim điển hình).
*   **Liên kết cộng hóa trị**: Hình thành bằng các cặp electron dùng chung giữa các nguyên tử phi kim.
    *   Không phân cực: Cặp electron dùng chung nằm chính giữa hai nguyên tử (ví dụ: $H_2, Cl_2$).
    *   Phân cực: Cặp electron bị lệch về phía nguyên tử có độ âm điện lớn hơn (ví dụ: $HCl, H_2O$).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Sử dụng hiệu độ âm điện để dự đoán loại liên kết**:
    Gọi $\\Delta \\chi$ là hiệu độ âm điện của hai nguyên tử tham gia liên kết.
    *   Nếu $0 \\le \\Delta \\chi < 0.4$: Liên kết cộng hóa trị không phân cực.
    *   Nếu $0.4 \\le \\Delta \\chi < 1.7$: Liên kết cộng hóa trị phân cực.
    *   Nếu $\\Delta \\chi \\ge 1.7$: Liên kết ion (ngoại lệ một số chất như $HF$ tuy $\\Delta \\chi > 1.7$ nhưng là cộng hóa trị phân cực mạnh).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Dự đoán loại liên kết trong các hợp chất $NaCl$ và $H_2S$. Cho độ âm điện của Cl là 3.16, Na là 0.93, H là 2.2, S là 2.58.
    *   *Giải*:
        *   Với $NaCl$: $\\Delta \\chi = 3.16 - 0.93 = 2.23 > 1.7 \\Rightarrow$ Liên kết trong $NaCl$ là liên kết ion.
        *   Với $H_2S$: $\\Delta \\chi = 2.58 - 2.20 = 0.38 < 0.4 \\Rightarrow$ Liên kết trong $H_2S$ là liên kết cộng hóa trị không phân cực (hoặc phân cực vô cùng yếu).`
      },
      {
        chapterId: 'h10_ch4',
        title: 'Bài giảng Chương 4: Phản ứng oxi hóa - khử',
        basic: `### Lý thuyết nền tảng
*   **Số oxi hóa**: Điện tích giả định của nguyên tử trong phân tử nếu giả sử liên kết hoàn toàn là liên kết ion.
*   **Chất khử** (chất bị oxi hóa): Là chất **nhường** electron $\\Rightarrow$ Số oxi hóa **tăng** sau phản ứng.
*   **Chất oxi hóa** (chất bị khử): Là chất **nhận** electron $\\Rightarrow$ Số oxi hóa **giảm** sau phản ứng.
*   Khẩu quyết: *"Khử cho - O nhận; Khử tăng - O giảm"*.
*   **Phương pháp thăng bằng electron**: Dựa trên định luật bảo toàn: Tổng số electron do chất khử nhường bằng tổng số electron chất oxi hóa nhận.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Quy trình 4 bước cân bằng phản ứng oxi hóa - khử phức tạp**:
    1. Xác định số oxi hóa của các nguyên tố để tìm ra chất khử và chất oxi hóa.
    2. Viết các quá trình oxi hóa (nhường e) và quá trình khử (nhận e).
    3. Tìm hệ số thích hợp cho hai quá trình sao cho: Tổng số e nhường = Tổng số e nhận (tìm bội chung nhỏ nhất).
    4. Đưa hệ số vào phương trình và kiểm tra lại theo thứ tự: Kim loại $\\to$ Phi kim/Gốc axit $\\to$ Hydro $\\to$ Kiểm tra Oxi cuối cùng để đối chiếu.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Cân bằng phản ứng sau bằng phương pháp thăng bằng electron: $Cu + HNO_3 \\to Cu(NO_3)_2 + NO + H_2O$.
    *   *Giải*:
        *   Bước 1: Xác định số oxi hóa thay đổi: $Cu^0 \\to Cu^{+2}$ và $N^{+5} \\to N^{+2}$.
        *   Bước 2: Viết các quá trình:
            $Cu^0 \\to Cu^{+2} + 2e$  (Quá trình oxi hóa)
            $N^{+5} + 3e \\to N^{+2}$  (Quá trình khử)
        *   Bước 3: Nhân chéo hệ số (BCNN của 2 và 3 là 6):
            $3 \\times (Cu^0 \\to Cu^{+2} + 2e)$
            $2 \\times (N^{+5} + 3e \\to N^{+2})$
        *   Bước 4: Đưa hệ số vào phương trình:
            $3Cu + 8HNO_3 \\to 3Cu(NO_3)_2 + 2NO + 4H_2O$. (Nhẩm gốc $NO_3^-$: có 6 gốc trong muối + 2 trong khí NO = 8 gốc $\\Rightarrow$ 8 $HNO_3$).`
      },
      {
        chapterId: 'h10_ch5',
        title: 'Bài giảng Chương 5: Nhóm Halogen',
        basic: `### Lý thuyết nền tảng
*   **Đặc điểm nhóm Halogen (VIIA)**: Gồm $F, Cl, Br, I$. Cấu hình electron ngoài cùng là $ns^2 np^5 \\Rightarrow$ Có xu hướng nhận thêm 1e để đạt cấu hình bát tử bền vững $\\Rightarrow$ Tính chất hóa học đặc trưng là tính **oxi hóa mạnh**. Tính oxi hóa giảm dần từ Flo đến Iot.
*   **Axit Halogenhidric**: $HF, HCl, HBr, HI$. Tính axit tăng dần từ $HF$ (axit yếu) đến $HI$ (axit siêu mạnh). Riêng $HF$ có khả năng ăn mòn thủy tinh:
    $$SiO_2 + 4HF \\to SiF_4 + 2H_2O$$`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phản ứng đặc trưng nhận biết muối Halogenua**:
    Dùng dung dịch bạc nitrat ($AgNO_3$):
    *   $NaF$ không tạo kết tủa.
    *   $NaCl \\to AgCl \\downarrow$ màu trắng.
    *   $NaBr \\to AgBr \\downarrow$ màu vàng nhạt (nhạy sáng, phân hủy ra bạc làm đen phim ảnh).
    *   $NaI \\to AgI \\downarrow$ màu vàng đậm.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Nhận biết 3 dung dịch mất nhãn sau bằng phương pháp hóa học: $NaCl, NaBr, NaNO_3$.
    *   *Giải*:
        *   Trích mẫu thử của từng dung dịch.
        *   Nhỏ vài giọt dung dịch Bạc Nitrat ($AgNO_3$) vào từng mẫu thử.
        *   *Hiện tượng*:
            - Xuất hiện kết tủa trắng: Mẫu thử ban đầu là $NaCl$.
              $AgNO_3 + NaCl \\to AgCl \\downarrow (trắng) + NaNO_3$.
            - Xuất hiện kết tủa màu vàng nhạt: Mẫu thử ban đầu là $NaBr$.
              $AgNO_3 + NaBr \\to AgBr \\downarrow (vàng\\ nhạt) + NaNO_3$.
            - Không có hiện tượng kết tủa: Mẫu thử ban đầu là $NaNO_3$.`
      },
      {
        chapterId: 'h10_ch6',
        title: 'Bài giảng Chương 6: Nhóm Oxi - Lưu huỳnh',
        basic: `### Lý thuyết nền tảng
*   **Nhóm Oxi - Lưu huỳnh (VIA)**: Cấu hình electron lớp ngoài cùng là $ns^2 np^4 \\Rightarrow$ Xu hướng nhận thêm 2e.
*   **Lưu huỳnh ($S$)**: Vừa có tính khử (khi gặp oxi, chất oxi hóa mạnh) vừa có tính oxi hóa (khi gặp kim loại, hydro). Các trạng thái số oxi hóa thường gặp: $-2, 0, +4, +6$.
*   **Axit Sunfuric ($H_2SO_4$)**:
    *   Loãng: Tính axit mạnh, chỉ phản ứng với các kim loại đứng trước Hydro giải phóng khí $H_2$.
    *   Đặc, nóng: Tính oxi hóa rất mạnh, phản ứng được với hầu hết kim loại (trừ Au, Pt) sinh ra khí chứa lưu huỳnh ($SO_2, S, H_2S$) và nước. Có tính háo nước mạnh (gây bỏng da nặng).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Hiện tượng thụ động hóa của kim loại**:
    Các kim loại sắt ($Fe$), nhôm ($Al$), và crom ($Cr$) bị thụ động hóa trong axit sunfuric đặc nguội ($H_2SO_4$ đặc nguội) và axit nitric đặc nguội. Một lớp màng oxit mỏng, mịn, rất bền được tạo ra trên bề mặt kim loại ngăn cản không cho kim loại tiếp tục phản ứng. Do đó, người ta có thể dùng bồn bằng thép hoặc nhôm để vận chuyển các axit này ở trạng thái đặc nguội.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Cho $6.4\\text{ g}$ đồng ($Cu$) tác dụng hoàn toàn với dung dịch $H_2SO_4$ đặc, nóng dư. Tính thể tích khí $SO_2$ thoát ra ở điều kiện tiêu chuẩn (đktc). Cho $Cu = 64$.
    *   *Giải*:
        *   Số mol đồng: $n_{Cu} = \\frac{6.4}{64} = 0.1\\text{ mol}$.
        *   Phương trình hóa học:
            $Cu + 2H_2SO_4 (đặc, nóng) \\to CuSO_4 + SO_2 \\uparrow + 2H_2O$.
        *   Theo phương trình: $n_{SO_2} = n_{Cu} = 0.1\\text{ mol}$.
        *   Thể tích khí $SO_2$ thoát ra ở đktc:
            $V_{SO_2} = 0.1 \\cdot 22.4 = 2.24\\text{ lít}$.`
      },
      {
        chapterId: 'h10_ch7',
        title: 'Bài giảng Chương 7: Tốc độ phản ứng và cân bằng hóa học',
        basic: `### Lý thuyết nền tảng
*   **Tốc độ phản ứng**: Đại lượng đặc trưng cho độ nhanh hay chậm của phản ứng hóa học. Các yếu tố ảnh hưởng: Nồng độ, nhiệt độ, áp suất (đối với chất khí), diện tích tiếp xúc (chất rắn), chất xúc tác.
*   **Phản ứng thuận nghịch**: Là phản ứng diễn ra đồng thời theo hai chiều trái ngược nhau trong cùng một điều kiện.
*   **Cân bằng hóa học**: Trạng thái của phản ứng thuận nghịch khi tốc độ phản ứng thuận bằng tốc độ phản ứng nghịch ($v_t = v_n$). Cân bằng hóa học là cân bằng động.
*   **Nguyên lý chuyển dịch cân bằng Le Chatelier**: Một phản ứng thuận nghịch đang ở trạng thái cân bằng, khi ta tác động một yếu tố từ bên ngoài (nồng độ, nhiệt độ, áp suất) thì cân bằng sẽ dịch chuyển theo chiều chống lại tác động đó.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Cách suy luận chiều dịch chuyển cân bằng theo Le Chatelier**:
    *   Tác động tăng nhiệt độ $\\Rightarrow$ Cân bằng dịch chuyển theo chiều thu nhiệt (làm giảm nhiệt độ).
    *   Tác động tăng áp suất $\\Rightarrow$ Cân bằng dịch chuyển theo chiều làm giảm số phân tử khí (làm giảm áp suất).
    *   Tác động tăng nồng độ chất A $\\Rightarrow$ Cân bằng dịch chuyển theo chiều tiêu thụ bớt chất A (chiều thuận nếu A là chất tham gia).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Cho phản ứng tổng hợp amoniac trong công nghiệp:
    $$N_2 (k) + 3H_2 (k) \\rightleftharpoons 2NH_3 (k) \\quad \\Delta H < 0$$
    Để tăng hiệu suất thu khí $NH_3$, ta nên tăng hay giảm nhiệt độ và áp suất?
    *   *Giải*:
        *   Xét yếu tố nhiệt độ: Phản ứng có $\\Delta H < 0$ là phản ứng tỏa nhiệt. Theo Le Chatelier, để cân bằng dịch chuyển theo chiều thuận (tỏa nhiệt), ta cần **giảm nhiệt độ** của hệ.
        *   Xét yếu tố áp suất: Vế trái có $1 + 3 = 4\\text{ mol}$ khí. Vế phải có $2\\text{ mol}$ khí. Chiều thuận làm giảm số mol khí. Do đó để cân bằng dịch chuyển theo chiều thuận, ta cần **tăng áp suất** của hệ.`
      }
    ]
  }),

  chemistry_11: makeContext({
    title: 'Hóa học 11 - Sự điện li & Đại cương Hữu cơ',
    author: 'NXB Giáo dục Việt Nam',
    totalPages: 210,
    description: 'Sự điện li, Nitơ-Photpho, Cacbon-Silic, Đại cương Hóa hữu cơ, Hiđrocacbon và Dẫn xuất.',
    chapters: [
      { id: 'h11_ch1', title: 'Chương 1: Sự điện li', pages: '1-30', content: 'Chất điện li, axit, bazơ, muối, pH, phản ứng trao đổi ion.' },
      { id: 'h11_ch2', title: 'Chương 2: Nitơ - Photpho', pages: '31-65', content: 'Nitơ, Amoniac, muối amoni, axit nitric, photpho và phân bón hóa học.' },
      { id: 'h11_ch3', title: 'Chương 3: Cacbon - Silic', pages: '66-85', content: 'Cacbon, CO, CO2, axit cacbonic, silic, công nghiệp silicat.' },
      { id: 'h11_ch4', title: 'Chương 4: Đại cương về Hóa học hữu cơ', pages: '86-110', content: 'Công thức phân tử, công thức cấu tạo, đồng phân, danh pháp.' },
      { id: 'h11_ch5', title: 'Chương 5: Hiđrocacbon no, không no và thơm', pages: '111-160', content: 'Ankan, Anken, Ankin, Benzen và đồng đẳng.' },
      { id: 'h11_ch6', title: 'Chương 6: Dẫn xuất Halogen - Ancol - Phenol', pages: '161-185', content: 'Cấu tạo, tính chất, phương pháp điều chế.' },
      { id: 'h11_ch7', title: 'Chương 7: Anđehit - Xeton - Axit cacboxylic', pages: '186-210', content: 'Nhóm cacbonyl, phản ứng tráng bạc, tính axit của axit cacboxylic.' }
    ],
    lectures: [
      {
        chapterId: 'h11_ch1',
        title: 'Bài giảng Chương 1: Sự điện li',
        basic: `### Lý thuyết nền tảng
*   **Sự điện li**: Quá trình phân li các chất thành ion khi tan trong nước.
    *   Chất điện li mạnh: Phân li hoàn toàn thành ion (axit mạnh: $HCl, HNO_3, H_2SO_4$; bazơ mạnh: $NaOH, KOH, Ba(OH)_2$; và hầu hết các muối).
    *   Chất điện li yếu: Chỉ phân li một phần (axit yếu: $CH_3COOH, H_2S$; bazơ yếu: $NH_3$).
*   **Định nghĩa pH**: Đo mức độ axit hay bazơ của dung dịch:
    $$pH = -\\log[H^+] \\Rightarrow [H^+] = 10^{-pH}$$
*   Tích số ion của nước ở $25^\\circ\\text{C}$: $[H^+][OH^-] = 10^{-14}$.
*   Môi trường trung tính $pH = 7$; Axit $pH < 7$; Bazơ $pH > 7$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Định luật bảo toàn điện tích trong dung dịch**:
    Trong một dung dịch, tổng số mol điện tích dương luôn luôn bằng tổng số mol điện tích âm:
    $$\\sum n_{\\text{ion dương}} \\cdot z_+ = \\sum n_{\\text{ion âm}} \\cdot z_-$$
    (với $z$ là trị số điện tích của ion). Đây là công cụ cực kỳ mạnh mẽ giúp tìm nhanh nồng độ ion chưa biết mà không cần viết phương trình phản ứng hóa học chi tiết.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Trộn $100\\text{ ml}$ dung dịch $HCl\\text{ }0.1\\text{ M}$ với $100\\text{ ml}$ dung dịch $NaOH\\text{ }0.12\\text{ M}$. Tính pH của dung dịch sau khi trộn.
    *   *Giải*:
        *   Tính số mol ban đầu:
            $n_{H^+} = n_{HCl} = 0.1 \\cdot 0.1 = 0.01\\text{ mol}$.
            $n_{OH^-} = n_{NaOH} = 0.1 \\cdot 0.12 = 0.012\\text{ mol}$.
        *   Phản ứng trung hòa: $H^+ + OH^- \\to H_2O$.
        *   So sánh tỉ lệ thấy $OH^-$ dư:
            $n_{OH^- \\text{ dư}} = 0.012 - 0.01 = 0.002\\text{ mol}$.
        *   Thể tích dung dịch sau khi trộn: $V = 100 + 100 = 200\\text{ ml} = 0.2\\text{ lít}$.
        *   Nồng độ $OH^-$ dư: $[OH^-] = \\frac{0.002}{0.2} = 0.01\\text{ M} = 10^{-2}\\text{ M}$.
        *   Suy ra $pOH = -\\log(10^{-2}) = 2 \\Rightarrow pH = 14 - pOH = 12$.`
      },
      {
        chapterId: 'h11_ch2',
        title: 'Bài giảng Chương 2: Nitơ - Photpho',
        basic: `### Lý thuyết nền tảng
*   **Nitơ ($N_2$)**: Ở nhiệt độ thường rất trơ hóa học do có liên kết ba bền vững ($N \\equiv N$). Ở nhiệt độ cao, Nitơ phản ứng với oxy tạo thành khí $NO$, khí này gặp không khí lập tức chuyển sang màu nâu đỏ ($NO_2$).
*   **Amoniac ($NH_3$)**: Chất khí mùi khai, tan cực tốt trong nước tạo môi trường bazơ yếu.
*   **Axit Nitric ($HNO_3$)**: Axit có tính oxi hóa cực mạnh. Nó hòa tan hầu hết các kim loại (trừ vàng, bạch kim) và không giải phóng khí $H_2$, thay vào đó sinh ra các sản phẩm khử của nitơ như $NO_2$ (nâu đỏ), $NO$ (không màu hóa nâu), $N_2O$ (khí cười), $N_2$, hoặc $NH_4NO_3$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Nhận biết sản phẩm khử của $HNO_3$ và bẫy Amoni Nitrat ($NH_4NO_3$)**:
    Khi cho các kim loại mạnh như Magie ($Mg$), Nhôm ($Al$), Kẽm ($Zn$) tác dụng với dung dịch $HNO_3$ loãng. Đề thi rất hay bẫy học sinh bằng cách cho "không có khí thoát ra" hoặc "thu được khí X và dung dịch Y". Dung dịch Y thường chứa muối $NH_4NO_3$ - sản phẩm khử ở dạng muối tan, không bay hơi. Để tìm khối lượng muối, bắt buộc phải dùng bảo toàn electron để kiểm tra xem có $NH_4NO_3$ hay không.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Cho $2.4\\text{ g}$ magie ($Mg$) tác dụng hoàn toàn với dung dịch $HNO_3$ loãng dư, thu được $0.896\\text{ lít}$ khí $NO$ duy nhất ở đktc. Tính khối lượng muối thu được sau phản ứng. Cho $Mg = 24$.
    *   *Giải*:
        *   Số mol $Mg$: $n_{Mg} = \\frac{2.4}{24} = 0.1\\text{ mol}$.
        *   Số mol khí $NO$: $n_{NO} = \\frac{0.896}{22.4} = 0.04\\text{ mol}$.
        *   Kiểm tra bảo toàn electron:
            - Mol e nhường: $n_{e\\text{ nhường}} = 2 \\cdot n_{Mg} = 2 \\cdot 0.1 = 0.2\\text{ mol}$.
            - Mol e nhận tính theo khí NO: $n_{e\\text{ nhận}} = 3 \\cdot n_{NO} = 3 \\cdot 0.04 = 0.12\\text{ mol}$.
            Ta thấy: $n_{e\\text{ nhường}} > n_{e\\text{ nhận}} \\Rightarrow$ Có muối $NH_4NO_3$ sinh ra.
        *   Số mol e nhận bởi $NH_4NO_3$: $n_{e\\text{ nhận } (NH_4NO_3)} = 0.2 - 0.12 = 0.08\\text{ mol}$.
        *   Vì $N^{+5} + 8e \\to N^{-3} (NH_4NO_3) \\Rightarrow n_{NH_4NO_3} = \\frac{0.08}{8} = 0.01\\text{ mol}$.
        *   Khối lượng muối trong dung dịch gồm: $Mg(NO_3)_2$ ($0.1\\text{ mol}$) và $NH_4NO_3$ ($0.01\\text{ mol}$).
            $m_{muối} = 0.1 \\cdot 148 + 0.01 \\cdot 80 = 14.8 + 0.8 = 15.6\\text{ g}$.`
      },
      {
        chapterId: 'h11_ch3',
        title: 'Bài giảng Chương 3: Cacbon - Silic',
        basic: `### Lý thuyết nền tảng
*   **Cacbon ($C$)**: Các dạng thù hình: Kim cương (rất cứng), than chì (dẫn điện tốt), cacbon vô định hình.
*   **Cacbon oxit ($CO$)**: Chất khí không màu, không mùi, cực kỳ độc vì liên kết bền với hemoglobin trong máu ngăn cản vận chuyển oxi. Có tính khử mạnh ở nhiệt độ cao (được dùng để luyện kim).
*   **Cacbon đioxit ($CO_2$)**: Khí carbonic, gây hiệu ứng nhà kính. Khi dẫn vào dung dịch kiềm tạo ra muối cacbonat ($CO_3^{2-}$) hoặc muối hidrocacbonat ($HCO_3^-$).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Bài toán sục khí $CO_2$ vào dung dịch kiềm $Ca(OH)_2$ hoặc $Ba(OH)_2$**:
    Lập tỉ lệ số mol: $T = \\frac{n_{OH^-}}{n_{CO_2}}$.
    *   Nếu $T \\le 1$: Chỉ tạo muối axit $HCO_3^-$.
    *   Nếu $T \\ge 2$: Chỉ tạo muối trung hòa $CO_3^{2-}$.
    *   Nếu $1 < T < 2$: Tạo đồng thời hai muối $HCO_3^-$ và $CO_3^{2-}$.
    *Mẹo*: Trong vùng tạo 2 muối, ta có công thức giải nhanh số mol kết tủa: $n_{CO_3^{2-} \\text{ (kết tủa)}} = n_{OH^-} - n_{CO_2}$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Sục từ từ $2.24\\text{ lít}$ khí $CO_2$ ở đktc vào $150\\text{ ml}$ dung dịch $Ca(OH)_2\\text{ }0.5\\text{ M}$. Tính khối lượng kết tủa thu được.
    *   *Giải*:
        *   Số mol $CO_2$: $n_{CO_2} = \\frac{2.24}{22.4} = 0.1\\text{ mol}$.
        *   Số mol $Ca(OH)_2$: $n_{Ca(OH)_2} = 0.15 \\cdot 0.5 = 0.075\\text{ mol} \\Rightarrow n_{OH^-} = 2 \\cdot n_{Ca(OH)_2} = 0.15\\text{ mol}$.
        *   Tính tỉ số: $T = \\frac{n_{OH^-}}{n_{CO_2}} = \\frac{0.15}{0.1} = 1.5$.
        *   Vì $1 < T < 2$ nên tạo ra cả 2 muối.
        *   Áp dụng công thức tính nhanh số mol kết tủa:
            $n_{CaCO_3} = n_{OH^-} - n_{CO_2} = 0.15 - 0.1 = 0.05\\text{ mol}$.
        *   Khối lượng kết tủa thu được: $m_{CaCO_3} = 0.05 \\cdot 100 = 5\\text{ g}$.`
      },
      {
        chapterId: 'h11_ch4',
        title: 'Bài giảng Chương 4: Đại cương về Hóa học hữu cơ',
        basic: `### Lý thuyết nền tảng
*   **Hợp chất hữu cơ**: Hợp chất của Cacbon (trừ các oxit, muối cacbonat, muối cacbua).
*   **Độ bất bão hòa ($k$)**: Số liên kết $\\pi$ và vòng trong phân tử hợp chất hữu cơ có công thức $C_x H_y O_z N_t$:
    $$k = \\frac{2x + 2 - y + t}{2}$$
    *   $k = 0$: Hợp chất mạch hở, chỉ có liên kết đơn (no).
    *   $k = 1$: Có 1 liên kết đôi hoặc 1 vòng.
    *   $k = 2$: Có 2 liên kết đôi, hoặc 1 liên kết ba, hoặc 2 vòng.
*   **Đồng phân**: Những hợp chất khác nhau có cùng công thức phân tử nhưng cấu tạo hóa học khác nhau.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tư duy xác định công thức phân tử dựa vào phản ứng đốt cháy**:
    Khi đốt cháy hoàn toàn hợp chất hữu cơ chứa C, H, O. Ta luôn quy về số mol nguyên tố:
    *   $n_C = n_{CO_2}$.
    *   $n_H = 2 \\cdot n_{H_2O}$.
    *   $n_O = \\frac{m_{\\text{hợp chất}} - m_C - m_H}{16}$.
    *   Lập tỉ lệ tìm công thức đơn giản nhất: $x : y : z = n_C : n_H : n_O$. Sau đó kết hợp phân tử khối để ra công thức phân tử.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Đốt cháy hoàn toàn $3\\text{ g}$ một chất hữu cơ X thu được $4.4\\text{ g}$ khí $CO_2$ và $1.8\\text{ g}$ nước. Tỉ khối hơi của X so với helium là 15. Tìm công thức phân tử của X.
    *   *Giải*:
        *   Phân tử khối của X: $M_X = 15 \\cdot 4 = 60\\text{ g/mol}$.
        *   Tính khối lượng nguyên tố:
            $n_C = n_{CO_2} = \\frac{4.4}{44} = 0.1\\text{ mol} \\Rightarrow m_C = 0.1 \\cdot 12 = 1.2\\text{ g}$.
            $n_H = 2 \\cdot n_{H_2O} = 2 \\cdot \\frac{1.8}{18} = 0.2\\text{ mol} \\Rightarrow m_H = 0.2 \\cdot 1 = 0.2\\text{ g}$.
            $m_O = 3.0 - (1.2 + 0.2) = 1.6\\text{ g} \\Rightarrow n_O = \\frac{1.6}{16} = 0.1\\text{ mol}$.
        *   Tỉ lệ số mol: $n_C : n_H : n_O = 0.1 : 0.2 : 0.1 = 1 : 2 : 1 \\Rightarrow$ Công thức đơn giản nhất là $(CH_2O)_n$.
        *   Ta có: $M_X = 30n = 60 \\Rightarrow n = 2 \\Rightarrow$ Công thức phân tử của X là $C_2H_4O_2$.`
      },
      {
        chapterId: 'h11_ch5',
        title: 'Bài giảng Chương 5: Hiđrocacbon no, không no và thơm',
        basic: `### Lý thuyết nền tảng
*   **Ankan** ($C_n H_{2n+2}$, $n \\ge 1$): Hiđrocacbon no, mạch hở. Tính chất đặc trưng là phản ứng thế halogen ($Cl_2, Br_2$) ánh sáng.
*   **Anken** ($C_n H_{2n}$, $n \\ge 2$): Hiđrocacbon không no, có 1 liên kết đôi $C=C$. Phản ứng đặc trưng là phản ứng cộng ($H_2, Br_2, HX$) làm mất màu dung dịch brom.
*   **Ankin** ($C_n H_{2n-2}$, $n \\ge 2$): Có 1 liên kết ba $C \\equiv C$. Ankin-1 (nối ba đầu mạch) phản ứng được với $AgNO_3/NH_3$ tạo kết tủa vàng nhạt.
*   **Benzen** ($C_6H_6$): Cấu trúc vòng lục giác đều rất bền, có tính chất "dễ thế, khó cộng" và trơ với dung dịch thuốc tím ở nhiệt độ thường.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Quy tắc Markovnikov trong phản ứng cộng**:
    Khi cộng tác nhân bất đối xứng ($HX$ như $HCl, H_2O$) vào anken bất đối xứng (ví dụ Propilen $CH_3-CH=CH_2$), nguyên tử hydro ($H$) sẽ ưu tiên cộng vào carbon mang liên kết đôi có nhiều hydro hơn (nhiều H hơn $\\Rightarrow$ dễ liên kết hơn), còn gốc axit hay nhóm chức ($X$) sẽ cộng vào carbon có ít hydro hơn tạo ra sản phẩm chính.
*   *Mẹo*: Đọc nhớ quy tắc: *"Giàu càng thêm giàu"* (H cộng vào C có nhiều H sẵn).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Viết phương trình hóa học và xác định sản phẩm chính của phản ứng cộng giữa propilen ($CH_3-CH=CH_2$) với axit clohidric ($HCl$).
    *   *Giải*:
        *   Propilen có hai carbon ở liên kết đôi: Carbon số 1 ($=CH_2$, có 2 H) và Carbon số 2 ($-CH=$, có 1 H).
        *   Theo quy tắc Markovnikov, H của $HCl$ cộng vào C số 1, Cl cộng vào C số 2.
        *   Phương trình:
            $CH_3-CH=CH_2 + HCl \\to CH_3-CHCl-CH_3$ (sản phẩm chính: 2-clopropan).`
      },
      {
        chapterId: 'h11_ch6',
        title: 'Bài giảng Chương 6: Dẫn xuất Halogen - Ancol - Phenol',
        basic: `### Lý thuyết nền tảng
*   **Ancol**: Hợp chất hữu cơ có nhóm hydroxyl ($-OH$) liên kết trực tiếp với nguyên tử carbon no. Tính chất: Tác dụng với kim loại kiềm giải phóng $H_2$, phản ứng este hóa với axit, tách nước tạo anken hoặc ete.
*   **Phenol** ($C_6H_5OH$): Nhóm $-OH$ liên kết trực tiếp với carbon của vòng benzen. Phenol có tính axit yếu (tác dụng với $NaOH$ nhưng không làm đổi màu quỳ tím). Phản ứng thế vào vòng benzen dễ hơn benzen, tạo kết tủa trắng với nước brom.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tại sao Phenol lại có tính axit và dễ thế vòng hơn Ancol?**:
    Do hiệu ứng liên hợp, cặp electron tự do trên nguyên tử Oxi của nhóm $-OH$ bị hút về phía vòng benzen. Điều này làm cho liên kết $O-H$ phân cực mạnh hơn, dễ phân li ra ion $H^+$ (thể hiện tính axit). Đồng thời, mật độ electron ở các vị trí *ortho* và *para* trên vòng benzen tăng lên, làm cho phản ứng thế halogen vào vòng benzen xảy ra rất dễ dàng ngay ở điều kiện thường mà không cần xúc tác.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Nhận biết 3 dung dịch sau mất nhãn bằng phương pháp hóa học: Ancol etylic ($C_2H_5OH$), Phenol ($C_6H_5OH$ lỏng), và Nước.
    *   *Giải*:
        *   Cho nước brom dư vào các mẫu thử:
            - Mẫu thử nào xuất hiện kết tủa trắng là Phenol:
              $C_6H_5OH + 3Br_2 \\to C_6H_2(OH)Br_3 \\downarrow (trắng) + 3HBr$.
            - Hai mẫu còn lại không có hiện tượng kết tủa.
        *   Dùng mẫu kim loại Natri ($Na$) thả vào 2 mẫu thử còn lại:
            - Mẫu sủi bọt khí mạnh là Ancol etylic:
              $2C_2H_5OH + 2Na \\to 2C_2H_5ONa + H_2 \\uparrow$.
            - Nước phản ứng cực kỳ mãnh liệt giải phóng khí hydro (hoặc có thể dùng độ hòa tan để phân biệt trước vì ancol tan vô hạn).`
      },
      {
        chapterId: 'h11_ch7',
        title: 'Bài giảng Chương 7: Anđehit - Xeton - Axit cacboxylic',
        basic: `### Lý thuyết nền tảng
*   **Anđehit**: Có nhóm chức $-CHO$. Tính chất đặc trưng là phản ứng tráng bạc với phức bạc nitrat trong amoniac ($AgNO_3/NH_3$):
    $$R-CHO + 2AgNO_3 + 3NH_3 + H_2O \\to R-COONH_4 + 2Ag \\downarrow + 2NH_4NO_3$$
*   **Xeton**: Có nhóm chức $-CO-$ liên kết với hai gốc hiđrocacbon. Không có phản ứng tráng bạc.
*   **Axit cacboxylic**: Có nhóm chức $-COOH$. Tính axit yếu nhưng đầy đủ tính chất của một axit: làm quỳ tím hóa đỏ, tác dụng với kim loại trước hydro, tác dụng với oxit bazơ, bazơ và muối cacbonat.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phản ứng este hóa**:
    Là phản ứng thuận nghịch giữa axit cacboxylic và ancol có xúc tác $H_2SO_4$ đặc, nóng:
    $$R-COOH + R'-OH \\rightleftharpoons R-COOR' + H_2O$$
    *Lưu ý sư phạm*: Đây là phản ứng thuận nghịch nên hiệu suất luôn nhỏ hơn 100%. Vai trò của $H_2SO_4$ đặc vừa làm chất xúc tác, vừa có tính hút nước mạnh giúp chuyển dịch cân bằng hóa học sang chiều thuận (tạo este).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Cho $6.0\\text{ g}$ axit axetic ($CH_3COOH$) tác dụng với lượng dư ancol etylic ($C_2H_5OH$) có mặt $H_2SO_4$ đặc làm xúc tác. Sau khi phản ứng đạt cân bằng thu được $6.6\\text{ g}$ este etyl axetat ($CH_3COOC_2H_5$). Tính hiệu suất của phản ứng este hóa. Cho $C=12, H=1, O=16$.
    *   *Giải*:
        *   Số mol axit axetic ban đầu: $n_{axit} = \\frac{6.0}{60} = 0.1\\text{ mol}$.
        *   Theo lý thuyết, nếu phản ứng hoàn toàn (hiệu suất 100%), số mol este thu được phải bằng số mol axit: $n_{este\\text{ lí thuyết}} = 0.1\\text{ mol}$.
        *   Khối lượng este thu được theo lí thuyết: $m_{este\\text{ lí thuyết}} = 0.1 \\cdot 88 = 8.8\\text{ g}$.
        *   Hiệu suất thực tế của phản ứng:
            $H = \\frac{m_{este\\text{ thực tế}}}{m_{este\\text{ lí thuyết}}} \\cdot 100\\% = \\frac{6.6}{8.8} \\cdot 100\\% = 75\\%$.`
      }
    ]
  }),

  chemistry_12: makeContext({
    title: 'Hóa học 12 - Hóa hữu cơ Nâng cao & Đại cương kim loại',
    author: 'NXB Giáo dục Việt Nam',
    totalPages: 200,
    description: 'Este, Lipit, Cacbohiđrat, Amin, Polime, Đại cương kim loại, Kiềm, Kiềm thổ, Nhôm, Sắt.',
    chapters: [
      { id: 'h12_ch1', title: 'Chương 1: Este - Lipit', pages: '1-25', content: 'Danh pháp, tính chất thủy phân este, xà phòng hóa chất béo.' },
      { id: 'h12_ch2', title: 'Chương 2: Cacbohiđrat', pages: '26-45', content: 'Glucozơ, Fructozơ, Saccarozơ, Tinh bột, Xenlulozơ.' },
      { id: 'h12_ch3', title: 'Chương 3: Amin, Amino axit và Protein', pages: '46-70', content: 'Tính bazơ của amin, tính lưỡng tính của amino axit, peptit.' },
      { id: 'h12_ch4', title: 'Chương 4: Polime và Vật liệu polime', pages: '71-85', content: 'Chất dẻo, tơ, cao su, keo dán.' },
      { id: 'h12_ch5', title: 'Chương 5: Đại cương về Kim loại', pages: '86-120', content: 'Dãy điện hóa, tính chất chung của kim loại, ăn mòn, điều chế.' },
      { id: 'h12_ch6', title: 'Chương 6: Kim loại kiềm, Kiềm thổ và Nhôm', pages: '121-150', content: 'Đặc điểm, hợp chất quan trọng, nước cứng.' },
      { id: 'h12_ch7', title: 'Chương 7: Sắt và một số kim loại quan trọng', pages: '151-180', content: 'Tính chất của Sắt, Crom, Đồng và hợp chất.' }
    ],
    lectures: [
      {
        chapterId: 'h12_ch1',
        title: 'Bài giảng Chương 1: Este - Lipit',
        basic: `### Lý thuyết nền tảng
*   **Este**: Hợp chất tạo thành khi thay thế nhóm $-OH$ ở nhóm carboxyl của axit cacboxylic bằng nhóm $-OR'$. Công thức tổng quát đơn chức no: $C_n H_{2n} O_2$ ($n \\ge 2$).
    *   Thủy phân trong môi trường axit: Phản ứng thuận nghịch.
    *   Thủy phân trong môi trường kiềm (Xà phòng hóa): Phản ứng một chiều:
        $$R-COOR' + NaOH \\to R-COONa + R'-OH$$
*   **Chất béo (Lipit)**: Trieste của glixerol với các axit béo (axit đơn chức có mạch cacbon dài không phân nhánh). Công thức chung: $(R-COO)_3 C_3H_5$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phản ứng thủy phân tạo anđehit/xeton (Bẫy lý thuyết)**:
    Nếu gốc rượu $R'$ có liên kết đôi dính trực tiếp vào nguyên tử Oxi liên kết (ví dụ Vinyl axetat $CH_3COOCH=CH_2$), khi thủy phân sẽ không tạo ra ancol mà tạo ra anđehit:
    $$CH_3COOCH=CH_2 + NaOH \\to CH_3COONa + CH_3CHO$$
    Do ancol không bền có nhóm $-OH$ đính trên carbon không no ($CH_2=CH-OH$) lập tức chuyển vị thành anđehit bền hơn.
*   *Mẹo*: Đề bài cho este tráng gương $\\Rightarrow$ Có dạng $HCOOR'$. Nếu sản phẩm thủy phân cũng tráng gương $\\Rightarrow$ Este có dạng $HCOOCH=CH-R''$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Xà phòng hóa hoàn toàn $8.8\\text{ g}$ etyl axetat ($CH_3COOC_2H_5$) bằng $100\\text{ ml}$ dung dịch $NaOH\\text{ }1\\text{ M}$. Cô cạn dung dịch sau phản ứng thu được bao nhiêu gam chất rắn khan? Cho $C=12, H=1, O=16, Na=23$.
    *   *Giải*:
        *   Số mol este: $n_{este} = \\frac{8.8}{88} = 0.1\\text{ mol}$.
        *   Số mol $NaOH$: $n_{NaOH} = 0.1 \\cdot 1 = 0.1\\text{ mol}$.
        *   Phương trình phản ứng:
            $CH_3COOC_2H_5 + NaOH \\to CH_3COONa + C_2H_5OH$.
        *   Tỉ lệ phản ứng vừa đủ: $n_{muối} = 0.1\\text{ mol}$.
        *   Khi cô cạn, ancol etylic bay hơi hết, chất rắn thu được chỉ gồm muối $CH_3COONa$.
        *   Khối lượng chất rắn khan: $m = 0.1 \\cdot 82 = 8.2\\text{ g}$.`
      },
      {
        chapterId: 'h12_ch2',
        title: 'Bài giảng Chương 2: Cacbohiđrat',
        basic: `### Lý thuyết nền tảng
*   **Cacbohiđrat**: Hợp chất hữu cơ tạp chức, thường có công thức chung $C_n(H_2O)_m$.
*   **Phân loại**:
    *   Monosaccarit (không thủy phân): Glucozơ và Fructozơ ($C_6H_{12}O_6$).
    *   Disaccarit (thủy phân ra 2 monosaccarit): Saccarozơ ($C_{12}H_{22}O_{11}$).
    *   Polisaccarit (mạch polyme dài): Tinh bột và Xenlulozơ ($(C_6H_{10}O_5)_n$).
*   **Tính chất**: Glucozơ có nhiều nhóm $-OH$ kề nhau (tác dụng với $Cu(OH)_2$ tạo dung dịch xanh lam) và có nhóm $-CHO$ (tráng bạc tạo $2Ag$, làm mất màu nước Brom).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tại sao Fructozơ không có nhóm $-CHO$ vẫn có khả năng tham gia phản ứng tráng bạc?**:
    Trong môi trường kiềm (dung dịch amoniac $NH_3$), Fructozơ tự động chuyển hóa thành Glucozơ qua trạng thái trung gian enol. Do đó, Fructozơ vẫn tham gia phản ứng tráng bạc và phản ứng với $Cu(OH)_2$ tạo kết tủa đỏ gạch khi đun nóng.
    *Lưu ý sư phạm*: Nước Brom có môi trường axit yếu, Fructozơ không thể chuyển hóa thành Glucozơ $\\Rightarrow$ Fructozơ không làm mất màu nước Brom. Đây là hóa chất duy nhất dùng để phân biệt nhanh Glucozơ và Fructozơ.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Lên men $18\\text{ g}$ glucozơ thành ancol etylic với hiệu suất phản ứng đạt $80\\%$. Toàn bộ lượng khí $CO_2$ sinh ra được hấp thụ hết vào dung dịch nước vôi trong dư thu được bao nhiêu gam kết tủa?
    *   *Giải*:
        *   Số mol glucozơ: $n = \\frac{18}{180} = 0.1\\text{ mol}$.
        *   Phương trình lên men: $C_6H_{12}O_6 \\xrightarrow{\\text{lên men}} 2C_2H_5OH + 2CO_2 \\uparrow$.
        *   Theo lý thuyết: $n_{CO_2} = 2 \\cdot n_{\\text{glucozơ}} = 0.2\\text{ mol}$.
        *   Do hiệu suất phản ứng $80\\%$ nên số mol khí thực tế thu được:
            $n_{CO_2\\text{ thực tế}} = 0.2 \\cdot 80\\% = 0.16\\text{ mol}$.
        *   Phản ứng tạo kết tủa với nước vôi trong dư: $CO_2 + Ca(OH)_2 \\to CaCO_3 \\downarrow + H_2O$.
        *   Số mol kết tủa bằng số mol $CO_2$: $n_{CaCO_3} = 0.16\\text{ mol}$.
        *   Khối lượng kết tủa: $m = 0.16 \\cdot 100 = 16\\text{ g}$.`
      },
      {
        chapterId: 'h12_ch3',
        title: 'Bài giảng Chương 3: Amin, Amino axit và Protein',
        basic: `### Lý thuyết nền tảng
*   **Amin**: Thay thế nguyên tử $H$ trong phân tử $NH_3$ bằng gốc hiđrocacbon. Amin có tính bazơ yếu (làm xanh quỳ tím, trừ anilin $C_6H_5NH_2$ tính bazơ quá yếu không đổi màu quỳ).
*   **Amino axit**: Hợp chất hữu cơ lưỡng tính chứa đồng thời nhóm amino ($-NH_2$) và nhóm carboxyl ($-COOH$).
    *   Công thức tổng quát: $(H_2N)_x - R - (COOH)_y$.
*   **Peptit**: Hợp chất chứa từ 2 đến 50 gốc $\\alpha$-amino axit liên kết với nhau bằng liên kết peptit ($-CO-NH-$). Tripeptit trở lên tác dụng với $Cu(OH)_2$ tạo phức màu tím (phản ứng Biure).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tư duy xác định sự đổi màu quỳ tím của dung dịch Amino Axit**:
    Xét hợp chất $(H_2N)_x - R - (COOH)_y$:
    *   Nếu $x = y$: Dung dịch có môi trường gần như trung tính $\\Rightarrow$ Không làm đổi màu quỳ tím (ví dụ: Glyxin, Alanin, Valin).
    *   Nếu $x > y$: Nhóm amin chiếm ưu thế $\\Rightarrow$ Dung dịch có tính bazơ $\\Rightarrow$ Làm quỳ tím hóa xanh (ví dụ: Lysin có 2 nhóm $-NH_2$, 1 nhóm $-COOH$).
    *   Nếu $x < y$: Nhóm carboxyl chiếm ưu thế $\\Rightarrow$ Dung dịch có tính axit $\\Rightarrow$ Làm quỳ tím hóa đỏ (ví dụ: Axit glutamic có 1 nhóm $-NH_2$, 2 nhóm $-COOH$).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Cho $7.5\\text{ g}$ glyxin ($H_2N-CH_2-COOH$) phản ứng hoàn toàn với dung dịch $HCl$ dư. Tính khối lượng muối thu được sau khi cô cạn. Cho $C=12, H=1, O=16, N=14, Cl=35.5$.
    *   *Giải*:
        *   Số mol glyxin: $n = \\frac{7.5}{75} = 0.1\\text{ mol}$.
        *   Phương trình phản ứng:
            $H_2N-CH_2-COOH + HCl \\to ClH_3N-CH_2-COOH$ (muối clorua).
        *   Theo định luật bảo toàn khối lượng (hoặc tính theo số mol muối tỉ lệ 1:1):
            $m_{muối} = n_{muối} \\cdot M_{muối} = 0.1 \\cdot (75 + 35.5) = 0.1 \\cdot 110.5 = 11.05\\text{ g}$.`
      },
      {
        chapterId: 'h12_ch4',
        title: 'Bài giảng Chương 4: Polime và Vật liệu polime',
        basic: `### Lý thuyết nền tảng
*   **Polime**: Hợp chất có phân tử khối rất lớn do nhiều mắt xích (monome) liên kết với nhau.
*   **Phương pháp điều chế**:
    *   Trùng hợp: Kết hợp nhiều phân tử nhỏ giống nhau có chứa liên kết bội hoặc vòng kém bền mở ra (ví dụ: nhựa PE, PVC, cao su buna).
    *   Trùng ngưng: Kết hợp nhiều phân tử nhỏ có ít nhất hai nhóm chức phản ứng giải phóng phân tử nhỏ khác như nước (ví dụ: tơ nilon-6,6, tơ lapsan).
*   **Vật liệu**: Chất dẻo, tơ (thiên nhiên, bán tổng hợp/nhân tạo, tổng hợp), cao su, keo dán.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Cách nhận diện và phân loại Tơ nhân tạo**:
    Học sinh rất hay nhầm lẫn giữa Tơ nhân tạo và Tơ tổng hợp.
    *   **Tơ thiên nhiên**: Bông, len, tơ tằm.
    *   **Tơ tổng hợp** (100% hóa chất chế tạo): Nilon-6,6, tơ nitron/olon.
    *   **Tơ nhân tạo** (hoặc tơ bán tổng hợp - lấy nguồn xenlulozơ thiên nhiên rồi đem chế hóa thêm bằng hóa chất): Chỉ có 2 loại chính trong SGK là **Tơ visco** và **Tơ axetat**. Nhớ kĩ 2 loại này để làm trắc nghiệm loại trừ.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Trùng hợp hoàn toàn $5.6\\text{ lít}$ khí etilen ($C_2H_4$) ở đktc thu được bao nhiêu gam nhựa polietilen (PE) nếu hiệu suất phản ứng đạt $90\\%$?
    *   *Giải*:
        *   Số mol etilen: $n = \\frac{5.6}{22.4} = 0.25\\text{ mol}$.
        *   Khối lượng monome ban đầu: $m = 0.25 \\cdot 28 = 7.0\\text{ g}$.
        *   Áp dụng định luật bảo toàn khối lượng cho phản ứng trùng hợp: Khối lượng polime sinh ra theo lý thuyết bằng khối lượng monome phản ứng.
        *   Do hiệu suất phản ứng là $90\\%$ nên khối lượng nhựa PE thực tế thu được:
            $m_{PE} = 7.0 \\cdot 90\\% = 6.3\\text{ g}$.`
      },
      {
        chapterId: 'h12_ch5',
        title: 'Bài giảng Chương 5: Đại cương về Kim loại',
        basic: `### Lý thuyết nền tảng
*   **Tính chất vật lý chung của kim loại**: Tính dẻo, dẫn điện, dẫn nhiệt, có ánh kim. Tất cả do các electron tự do trong tinh thể kim loại gây ra.
    *   Dẫn điện tốt nhất: $Ag > Cu > Au > Al > Fe$.
    *   Dẻo nhất: Vàng ($Au$). Cứng nhất: Crom ($Cr$). Nhiệt độ nóng chảy cao nhất: Vônfram ($W$).
*   **Tính chất hóa học chung**: Tính khử (nhường electron): $M \\to M^{n+} + ne$.
*   **Dãy điện hóa**: Giúp so sánh tính oxi hóa - khử của các cặp kim loại. Quy tắc $\\alpha$ xác định chiều phản ứng: Chất oxi hóa mạnh nhất tác dụng với chất khử mạnh nhất sinh ra chất oxi hóa yếu hơn và chất khử yếu hơn.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Quy tắc Alpha ($\\alpha$) trong giải toán Dãy điện hóa**:
    Sắp xếp các cặp oxi hóa/khử theo đúng thứ tự tăng dần tính oxi hóa của ion (từ trái sang phải):
    $$\\frac{Fe^{2+}}{Fe} \\quad \\text{và} \\quad \\frac{Cu^{2+}}{Cu} \\quad \\text{và} \\quad \\frac{Ag^+}{Ag}$$
    Vẽ hình chữ $\\alpha$: $Cu^{2+}$ tác dụng với $Fe$ sinh ra $Fe^{2+}$ và $Cu$.
    *Lưu ý bẫy sắt dư*: Nếu cho $Fe$ dư vào dung dịch chứa $AgNO_3$, sản phẩm cuối cùng chỉ là muối sắt (II) $Fe(NO_3)_2$. Nếu $AgNO_3$ dư thì sắt bị oxi hóa lên tận cùng muối sắt (III) $Fe(NO_3)_3$.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Nhúng một lá sắt ($Fe$) nặng $50\\text{ g}$ vào $200\\text{ ml}$ dung dịch $CuSO_4\\text{ }0.5\\text{ M}$. Sau một thời gian, lấy lá sắt ra cân lại thấy nặng $50.8\\text{ g}$. Tính khối lượng đồng bám vào lá sắt (giả sử đồng bám hoàn toàn vào lá sắt). Cho $Fe=56, Cu=64$.
    *   *Giải*:
        *   Gọi số mol sắt tham gia phản ứng là $x\\text{ mol}$.
        *   Phương trình phản ứng: $Fe + CuSO_4 \\to FeSO_4 + Cu \\downarrow$.
        *   Số mol đồng sinh ra bám vào thanh sắt là $x\\text{ mol}$.
        *   Độ tăng khối lượng của thanh sắt:
            $\\Delta m = m_{Cu\\text{ bám}} - m_{Fe\\text{ tan}} = 64x - 56x = 8x\\text{ g}$.
        *   Theo đề bài: $\\Delta m = 50.8 - 50 = 0.8\\text{ g}$.
        *   Suy ra: $8x = 0.8 \\Rightarrow x = 0.1\\text{ mol}$ (thỏa mãn nhỏ hơn mol $CuSO_4$ ban đầu là $0.1$ mol).
        *   Khối lượng đồng bám vào lá sắt: $m_{Cu} = 0.1 \\cdot 64 = 6.4\\text{ g}$.`
      },
      {
        chapterId: 'h12_ch6',
        title: 'Bài giảng Chương 6: Kim loại kiềm, Kiềm thổ và Nhôm',
        basic: `### Lý thuyết nền tảng
*   **Kim loại kiềm (IA)**: $Li, Na, K...$, cấu hình ngoài cùng $ns^1$. Rất mềm, nhiệt độ nóng chảy thấp, phản ứng mãnh liệt với nước tạo dung dịch kiềm mạnh và khí $H_2$.
*   **Kim loại kiềm thổ (IIA)**: $Be, Mg, Ca, Ba...$, cấu hình ngoài cùng $ns^2$.
*   **Nước cứng**: Nước chứa nhiều ion $Ca^{2+}$ và $Mg^{2+}$. Tác hại: làm giảm bọt xà phòng, đóng cặn nồi hơi gây nổ, làm hỏng quần áo. Phương pháp làm mềm: đun sôi, dùng hóa chất ($Na_2CO_3, Na_3PO_4$) để kết tủa các ion này.
*   **Nhôm ($Al$)**: Kim loại có tính khử mạnh sau kim loại kiềm và kiềm thổ. Oxit $Al_2O_3$ và hydroxit $Al(OH)_3$ có tính **lưỡng tính** (tác dụng với cả axit và bazơ mạnh).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Bài toán sục khí $CO_2$ dư vào dung dịch muối Aluminate ($AlO_2^-$) hoặc nhỏ từ từ axit đến dư**:
    *   Khi sục $CO_2$ dư vào muối $NaAlO_2$: Xuất hiện kết tủa keo trắng và kết tủa **không bị hòa tan** lại do axit cacbonic $H_2CO_3$ là axit quá yếu, không phản ứng được với $Al(OH)_3$.
    *   Khi nhỏ từ từ dung dịch $HCl$ vào $NaAlO_2$: Lúc đầu xuất hiện kết tủa tăng dần đến cực đại, sau đó kết tủa bị hòa tan dần đến hết tạo dung dịch trong suốt do axit $HCl$ mạnh hòa tan được hydroxit lưỡng tính.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Trộn dung dịch chứa $0.1\\text{ mol } AlCl_3$ với dung dịch chứa $0.35\\text{ mol } NaOH$. Tính khối lượng kết tủa thu được sau phản ứng. Cho $Al=27, O=16, H=1$.
    *   *Giải*:
        *   Tỉ lệ phản ứng: $n_{OH^-} / n_{Al^{3+}} = 0.35 / 0.1 = 3.5$.
        *   Vì $3 < 3.5 < 4$ nên xảy ra hai quá trình: tạo kết tủa và hòa tan một phần kết tủa.
        *   Áp dụng công thức giải nhanh số mol kết tủa:
            $n_{Al(OH)_3} = 4 n_{Al^{3+}} - n_{OH^-} = 4(0.1) - 0.35 = 0.05\\text{ mol}$.
        *   Khối lượng kết tủa thu được:
            $m_{Al(OH)_3} = 0.05 \\cdot 78 = 3.9\\text{ g}$.`
      },
      {
        chapterId: 'h12_ch7',
        title: 'Bài giảng Chương 7: Sắt và một số kim loại quan trọng',
        basic: `### Lý thuyết nền tảng
*   **Sắt ($Fe$, $Z=26$)**: Là kim loại chuyển tiếp nhóm VIIIB. Có các trạng thái số oxi hóa phổ biến: $+2$ (tính khử) và $+3$ (tính oxi hóa).
    *   Tác dụng với phi kim trung bình ($S, HCl...$) tạo muối sắt (II) ($Fe^{2+}$).
    *   Tác dụng với phi kim mạnh ($Cl_2, HNO_3, H_2SO_4$ đặc nóng) tạo muối sắt (III) ($Fe^{3+}$).
*   **Hợp chất quan trọng**:
    *   Quặng sắt tự nhiên: Magnetit ($Fe_3O_4$), Hematit ($Fe_2O_3$), Pirit sắt ($FeS_2$).
    *   Hợp chất Crom: $Cr_2O_3$ lưỡng tính, $CrO_3$ oxit axit có tính oxi hóa cực mạnh tự cháy khi gặp chất hữu cơ.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phương pháp giải toán quy đổi oxit sắt bằng bảo toàn electron**:
    Hỗn hợp oxit sắt ($FeO, Fe_2O_3, Fe_3O_4$) phản ứng với axit oxi hóa ($HNO_3$).
    *   Tư duy quy đổi: Coi hỗn hợp oxit sắt ban đầu chỉ gồm hai nguyên tố độc lập là sắt nguyên chất ($Fe$) và oxi nguyên chất ($O$).
    *   Lập hệ phương trình:
        1. Khối lượng hỗn hợp: $m_{hh} = 56 \\cdot n_{Fe} + 16 \\cdot n_O$.
        2. Bảo toàn electron: $3 \\cdot n_{Fe} = 2 \\cdot n_O + n_{e \\text{ nhận của sản phẩm khử}}$ (ví dụ $3 \\cdot n_{NO}$).
    Phương pháp này giải quyết triệt để tất cả các bài toán oxit sắt phức tạp chỉ bằng hệ 2 ẩn.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài toán 1**: Hòa tan hoàn toàn $11.6\\text{ g}$ hỗn hợp gồm $FeO, Fe_2O_3$ và $Fe_3O_4$ bằng dung dịch $HNO_3$ dư, thu được $0.224\\text{ lít}$ khí $NO$ duy nhất ở đktc. Tính khối lượng muối sắt (III) thu được.
    *   *Giải*:
        *   Quy đổi hỗn hợp về $Fe$ ($x\\text{ mol}$) và $O$ ($y\\text{ mol}$).
        *   Ta có phương trình khối lượng: $56x + 16y = 11.6$ (1).
        *   Số mol $NO$: $n_{NO} = 0.01\\text{ mol}$.
        *   Áp dụng bảo toàn electron: $3x = 2y + 3 \\cdot 0.01 \\Leftrightarrow 3x - 2y = 0.03$ (2).
        *   Giải hệ phương trình (1) và (2) ta được: $x = 0.15\\text{ mol}, y = 0.2\\text{ mol}$.
        *   Vì toàn bộ sắt chuyển thành muối $Fe(NO_3)_3$ nên $n_{Fe(NO_3)_3} = n_{Fe} = x = 0.15\\text{ mol}$.
        *   Khối lượng muối thu được: $m = 0.15 \\cdot 242 = 36.3\\text{ g}$.`
      }
    ]
  }),

  // ================= TIẾNG ANH =================
  english_10: makeContext({
    title: 'Tiếng Anh 10 - Giao tiếp, Cuộc sống & Công nghệ',
    author: 'Cambridge & Bộ GD-ĐT',
    totalPages: 120,
    description: 'Từ vựng chủ đề gia đình, sở thích, âm nhạc, công nghệ và cấu trúc ngữ pháp nền tảng (Thì, câu bị động, câu điều kiện).',
    chapters: [
      { id: 'e10_ch1', title: 'Unit 1 & 2: Family Life & Your Body and You', pages: '1-20', content: 'Chore, split, skeleton, respiratory, nerves. Thì Hiện tại đơn, HT Tiếp diễn.' },
      { id: 'e10_ch2', title: 'Unit 3 & 4: Music & For a better community', pages: '21-45', content: 'Judge, pop, volunteer, dedicate. Câu ghép, V-ing, To-V.' },
      { id: 'e10_ch3', title: 'Unit 5 & 6: Inventions & Gender Equality', pages: '46-70', content: 'Patent, smartphone, discrimination, gender. Quá khứ đơn, Câu bị động.' },
      { id: 'e10_ch4', title: 'Unit 7 & 8: Cultural Diversity & New Ways to Learn', pages: '71-95', content: 'Superstition, ritural, digital, portable. So sánh, Câu điều kiện loại 1.' },
      { id: 'e10_ch5', title: 'Unit 9 & 10: Preserving the Environment & Ecotourism', pages: '96-120', content: 'Deforestation, footprint, eco-friendly, impact. Mệnh đề quan hệ.' }
    ],
    lectures: [
      {
        chapterId: 'e10_ch1',
        title: 'Bài giảng Unit 1 & 2: Cuộc sống Gia đình và Sức khỏe',
        basic: `### Lý thuyết nền tảng
*   **Vocabulary**:
    *   *Family life*: breadwinner (người trụ cột), homemaker (người nội trợ), chores (việc nhà), split (chia sẻ), share the financial burden.
    *   *Body*: respiratory system (hệ hô hấp), nervous system (hệ thần kinh), skeleton (bộ xương), acupuncture (châm cứu).
*   **Grammar**:
    *   **Present Simple (Hiện tại đơn)**: Diễn tả thói quen, chân lý. Công thức: $S + V(s/es)$.
    *   **Present Continuous (Hiện tại tiếp diễn)**: Diễn tả hành động đang xảy ra tại thời điểm nói. Công thức: $S + am/is/are + V\text{-ing}$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phân biệt cách dùng đặc biệt của Present Simple và Present Continuous**:
    *   Hiện tại đơn dùng với các trạng từ chỉ tần suất (always, usually, rarely) để chỉ tần suất thói quen.
    *   Hiện tại tiếp diễn đi kèm với trạng từ "always" để diễn tả **sự phàn nàn, bực bội** về một hành động lặp đi lặp lại gây phiền hà.
    *   *Ví dụ*: "He is always losing his keys!" (Anh ta cứ làm mất chìa khóa suốt - phàn nàn).
*   *Mẹo*: Không dùng thì tiếp diễn với các động từ chỉ trạng thái cảm xúc, nhận thức (stative verbs) như *love, hate, like, know, understand, believe*.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài tập**: Chia động từ trong ngoặc: "I (know) ______ her address, but she (always forget) ______ mine."
    *   *Giải*:
        *   Động từ "know" là động từ chỉ trạng thái nhận thức $\\Rightarrow$ không dùng tiếp diễn $\\Rightarrow$ chia Hiện tại đơn: **know**.
        *   Vế sau thể hiện sự phàn nàn về một thói quen xấu lặp đi lặp lại $\\Rightarrow$ dùng Hiện tại tiếp diễn với always: **is always forgetting**.
        *   *Đáp án*: **know / is always forgetting**.`
      },
      {
        chapterId: 'e10_ch2',
        title: 'Bài giảng Unit 3 & 4: Âm nhạc và Cộng đồng',
        basic: `### Lý thuyết nền tảng
*   **Vocabulary**:
    *   *Music*: judge (giám khảo), debut album (album đầu tay), audience (khán giả), pop, classical, idol, instrument.
    *   *Community*: volunteer (tình nguyện viên), dedicate (cống hiến), donate (quyên góp), disadvantaged (thiệt thòi).
*   **Grammar (Gerunds & Infinitives)**:
    *   Động từ thêm **To-V** đứng sau các từ: *decide, want, hope, promise, refuse, plan, offer, agree*.
    *   Động từ thêm **V-ing** đứng sau các từ: *avoid, mind, enjoy, practice, postphone, suggest, dislike*.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Sự thay đổi nghĩa của các động từ đi với cả To-V và V-ing**:
    *   **Remember / Forget / Regret**:
        *   $+$ **To-V**: Nhớ/Quên/Tiếc sẽ phải làm một việc gì đó (hành động chưa xảy ra).
        *   $+$ **V-ing**: Nhớ/Quên/Tiếc đã làm một việc gì đó trong quá khứ (hành động đã xảy ra).
    *   **Stop**:
        *   $+$ **To-V**: Dừng lại để thực hiện một hành động khác.
        *   $+$ **V-ing**: Từ bỏ, dừng hẳn hành động đang làm.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài tập**: Điền dạng đúng của động từ: "Please remember (lock) ______ the door before (go) ______ out."
    *   *Giải*:
        *   "Remember to lock": Nhớ phải khóa cửa (hành động khóa cửa chưa xảy ra, dặn dò tương lai) $\\Rightarrow$ dùng **to lock**.
        *   Sau giới từ "before", động từ bắt buộc phải ở dạng danh động từ $\\Rightarrow$ dùng **going**.
        *   *Đáp án*: **to lock / going**.`
      },
      {
        chapterId: 'e10_ch3',
        title: 'Bài giảng Unit 5 & 6: Phát minh và Bình đẳng giới',
        basic: `### Lý thuyết nền tảng
*   **Vocabulary**:
    *   *Inventions*: patent (bằng sáng chế), smartphone, generator, portable (tiện lợi, di động), high-tech.
    *   *Gender Equality*: discrimination (sự phân biệt đối xử), gender bias (định kiến giới), priority (sự ưu tiên), domestic violence.
*   **Grammar**:
    *   **Past Simple (Quá khứ đơn)**: Diễn tả hành động đã xảy ra và chấm dứt trong quá khứ. Công thức: $S + V2/ed$.
    *   **Passive Voice (Câu bị động)**: Nhấn mạnh vào đối tượng chịu tác động. Công thức chung: $S + be + V3/ed$.
        *   Bị động thì Quá khứ đơn: $S + was/were + V3/ed$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Quy trình chuyển đổi câu chủ động sang bị động**:
    1. Xác định Tân ngữ (O) của câu chủ động để đưa lên làm Chủ ngữ (S) của câu bị động.
    2. Xác định thì của câu chủ động để chia động từ "to be" tương ứng cùng thì đó.
    3. Chuyển động từ chính về dạng Quá khứ phân từ (V3/ed).
    4. Đưa Chủ ngữ cũ về cuối câu sau từ "by" (lưu ý lược bỏ by him, by them, by people nếu không cần thiết).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài tập**: Chuyển câu sau sang bị động: "Alexander Graham Bell invented the telephone in 1876."
    *   *Giải*:
        *   Chủ ngữ: *Alexander Graham Bell*, Động từ: *invented* (Quá khứ đơn), Tân ngữ: *the telephone*.
        *   Đưa tân ngữ lên làm chủ ngữ mới: *The telephone*.
        *   Chia "to be" ở quá khứ đơn phù hợp chủ ngữ số ít: *was*.
        *   Động từ V3: *invented*.
        *   *Đáp án*: **The telephone was invented by Alexander Graham Bell in 1876**.`
      },
      {
        chapterId: 'e10_ch4',
        title: 'Bài giảng Unit 7 & 8: Đa dạng văn hóa và Cách học mới',
        basic: `### Lý thuyết nền tảng
*   **Vocabulary**:
    *   *Cultural Diversity*: superstition (sự mê tín), ritual (nghi lễ), wedding, ancestral worship, custom, tradition.
    *   *New Ways to Learn*: digital learning, portable device, distance learning, blended learning, interactive.
*   **Grammar**:
    *   **Comparisons (So sánh của tính từ/trạng từ)**:
        *   So sánh hơn: ngắn ($adj\\text{-er} + than$), dài ($more + adj + than$).
        *   So sánh nhất: ngắn ($the + adj\\text{-est}$), dài ($the + most + adj$).
    *   **Conditional Sentence Type 1 (Câu điều kiện loại 1)**: Diễn tả giả thuyết có thể xảy ra ở hiện tại hoặc tương lai.
        *   Công thức: $If + S + V\\text{ (Hiện tại đơn)}, S + will/can/must + V\\text{ (Nguyên thể)}$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Các tính từ bất quy tắc đặc biệt**:
    Học sinh cần ghi nhớ bảng tính từ bất quy tắc khi chuyển sang so sánh hơn/nhất để tránh viết thêm -er hoặc more:
    *   *good/well* $\\to$ better $\\to$ the best.
    *   *bad/badly* $\\to$ worse $\\to$ the worst.
    *   *far* $\\to$ farther (khoảng cách địa lý) / further (thông tin sâu hơn) $\\to$ the farthest/furthest.
    *   *many/much* $\\to$ more $\\to$ the most.
    *   *little* $\\to$ less $\\to$ the least.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài tập**: Viết lại câu sử dụng câu điều kiện loại 1: "Hurry up or you will be late for the online class."
    *   *Giải*:
        *   Bản chất của câu là: Nếu bạn không nhanh lên, bạn sẽ bị muộn.
        *   Viết với If: "If you don't hurry up, you will be late for the online class."
        *   Hoặc viết với Unless (Nếu không): "Unless you hurry up, you will be late for the online class."`
      },
      {
        chapterId: 'e10_ch5',
        title: 'Bài giảng Unit 9 & 10: Môi trường và Du lịch sinh thái',
        basic: `### Lý thuyết nền tảng
*   **Vocabulary**:
    *   *Environment*: deforestation (sự phá rừng), carbon footprint (dấu chân carbon), eco-friendly (thân thiện môi trường), preserve.
    *   *Ecotourism*: impact (sự tác động), destination, flora and fauna (hệ thực vật và động vật), sustainable.
*   **Grammar (Relative Clauses - Mệnh đề quan hệ)**:
    Sử dụng các đại từ quan hệ để thay thế danh từ đứng trước:
    *   **Who**: Thay cho người, đóng vai trò chủ ngữ.
    *   **Whom**: Thay cho người, đóng vai trò tân ngữ.
    *   **Which**: Thay cho vật/sự việc.
    *   **That**: Thay cho cả người và vật trong mệnh đề xác định (không đứng sau dấu phẩy và giới từ).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phân biệt Mệnh đề quan hệ xác định và không xác định**:
    *   **Xác định (Defining)**: Không có dấu phẩy. Cung cấp thông tin bắt buộc để hiểu danh từ đứng trước là ai/cái gì.
    *   **Không xác định (Non-defining)**: Có dấu phẩy ngăn cách. Cung cấp thông tin bổ sung thêm cho danh từ đã rõ ràng (tên riêng, có danh từ chỉ định như *this, my*). Trong mệnh đề này, **không bao giờ được dùng đại từ "that"** và không được lược bỏ đại từ quan hệ làm tân ngữ.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài tập**: Kết hợp hai câu sử dụng đại từ quan hệ thích hợp: "The tour guide was very knowledgeable. We met him yesterday."
    *   *Giải*:
        *   Danh từ lặp lại là: *The tour guide* (người) và *him* (đóng vai trò tân ngữ ở câu sau).
        *   Sử dụng đại từ quan hệ *whom* (hoặc *who/that* vì là mệnh đề xác định) đặt ngay sau danh từ nó bổ nghĩa:
        *   *Đáp án*: **The tour guide whom/who/that we met yesterday was very knowledgeable**.`
      }
    ]
  }),

  english_11: makeContext({
    title: 'Tiếng Anh 11 - Từ vựng & Đọc hiểu IELTS, Xã hội học',
    author: 'Cambridge & Bộ GD-ĐT',
    totalPages: 135,
    description: 'Từ vựng học thuật về môi trường, thành phố tương lai, lối sống lành mạnh và ngữ pháp nâng cao (Đảo ngữ, Mệnh đề phân từ).',
    chapters: [
      { id: 'e11_ch1', title: 'Unit 1 & 2: The Generation Gap & Relationships', pages: '1-25', content: 'Conflict, nuclear family, sympathetic, argument. Động từ khuyết thiếu (Must, should, ought to).' },
      { id: 'e11_ch2', title: 'Unit 3 & 4: Becoming Independent & Caring for those in need', pages: '26-50', content: 'Self-reliant, time-management, physical impairment. Động từ nguyên thể có To.' },
      { id: 'e11_ch3', title: 'Unit 5 & 6: Being part of ASEAN & Global Warming', pages: '51-75', content: 'Charter, bloc, carbon footprint, catastrophic. Phân từ hoàn thành (Having + V3).' },
      { id: 'e11_ch4', title: 'Unit 7 & 8: Further Education & Our World Heritage Sites', pages: '76-100', content: 'Academic, vocational, intact, archaeology. Câu chẻ (Cleft sentences).' },
      { id: 'e11_ch5', title: 'Unit 9 & 10: Cities of the Future & Healthy Lifestyle', pages: '101-130', content: 'Sustainable, livable, life expectancy, remedy. Câu hỏi đuôi, Câu điều kiện loại 2, 3.' }
    ],
    lectures: [
      {
        chapterId: 'e11_ch1',
        title: 'Bài giảng Unit 1 & 2: Khoảng cách thế hệ và Các mối quan hệ',
        basic: `### Lý thuyết nền tảng
*   **Vocabulary**:
    *   *Generation gap*: generation gap (khoảng cách thế hệ), nuclear family (gia đình hạt nhân), extended family (gia đình đa thế hệ), conflict (mâu thuẫn), value.
    *   *Relationships*: sympathetic (thông cảm), romantic relationship, argue (tranh luận), peer pressure.
*   **Grammar (Modal Verbs)**:
    *   **Must**: Bắt buộc (do luật lệ hoặc ý chí chủ quan). Phủ định *Mustn't* chỉ sự cấm đoán.
    *   **Should / Ought to**: Nên (khuyên bảo).
    *   **Have to**: Phải làm (bắt buộc khách quan do tình huống bên ngoài).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Phân biệt kĩ giữa Mustn't và Don't have to**:
    Rất nhiều học sinh chọn sai do dịch nghĩa tiếng Việt gần giống nhau.
    *   **Mustn't**: Cấm làm. Làm là vi phạm quy định hoặc nguy hiểm.
        *   *Ví dụ*: "You mustn't smoke here." (Cấm hút thuốc ở đây).
    *   **Don't/Doesn't have to**: Không bắt buộc phải làm. Làm hay không là tùy ý.
        *   *Ví dụ*: "Tomorrow is Sunday, so I don't have to wake up early." (Mai là chủ nhật nên tôi không cần dậy sớm - dậy hay không tùy tôi).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài tập**: Chọn từ thích hợp: "In Vietnam, you (must/have to) ______ wear a helmet when riding a motorbike."
    *   *Giải*: Việc đội mũ bảo hiểm khi đi xe máy là luật lệ bắt buộc từ chính phủ (khách quan) $\\Rightarrow$ dùng **have to**.
    *   *Đáp án*: **have to**.`
      },
      {
        chapterId: 'e11_ch2',
        title: 'Bài giảng Unit 3 & 4: Tự lập và Chăm sóc người khác',
        basic: `### Lý thuyết nền tảng
*   **Vocabulary**:
    *   *Independence*: self-reliant (tự lực cánh sinh), time-management, priority (sự ưu tiên), self-study.
    *   *Caring*: physical impairment (sự khuyết tật thể chất), visual impairment (khiếm thị), donation, charity.
*   **Grammar**:
    *   **To-infinitive (To-V)**: Đóng vai trò làm chủ ngữ, hoặc đi sau các tính từ để cấu tạo cụm tính từ: $S + be + adj + to\\text{-}V$.
        *   *Ví dụ*: "It is difficult to master English in one year."`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Cấu trúc câu chẻ (Cleft sentences) nhấn mạnh**:
    Dùng để làm nổi bật một đối tượng cụ thể trong câu (Chủ ngữ, Tân ngữ, hoặc Trạng ngữ).
    *   Công thức: **It is / was + thành phần cần nhấn mạnh + that + phần còn lại của câu**.
    *   *Ví dụ câu thường*: "My father bought this computer yesterday."
    *   Nhấn mạnh chủ ngữ: "It was my father that bought this computer yesterday."
    *   Nhấn mạnh tân ngữ: "It was this computer that my father bought yesterday."
    *   Nhấn mạnh trạng ngữ: "It was yesterday that my father bought this computer."`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài tập**: Viết lại câu sau sử dụng cấu trúc câu chẻ nhấn mạnh trạng ngữ: "We met our favorite teacher at the library."
    *   *Giải*:
        *   Trạng ngữ cần nhấn mạnh: *at the library*.
        *   Vì động từ "met" ở quá khứ nên dùng *It was*.
        *   *Đáp án*: **It was at the library that we met our favorite teacher**.`
      },
      {
        chapterId: 'e11_ch3',
        title: 'Bài giảng Unit 5 & 6: ASEAN và Sự nóng lên toàn cầu',
        basic: `### Lý thuyết nền tảng
*   **Vocabulary**:
    *   *ASEAN*: charter (hiến chương), bloc (khối liên kết), solidarity (sự đoàn kết), cooperation.
    *   *Global Warming*: carbon footprint (dấu chân carbon), greenhouse gas, catastrophic (thảm khốc), deforestation.
*   **Grammar (Perfect Participles - Phân từ hoàn thành)**:
    *   Công thức: **Having + V3/ed**.
    *   Cách dùng: Dùng để rút gọn hai mệnh đề có cùng chủ ngữ, nhấn mạnh một hành động đã hoàn thành trước khi hành động kia bắt đầu.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Quy trình rút gọn mệnh đề bằng Phân từ**:
    Khi hai mệnh đề trong câu ghép có cùng chủ ngữ:
    *   Bỏ liên từ và chủ ngữ của mệnh đề đầu tiên.
    *   Nếu hành động xảy ra đồng thời hoặc nối tiếp đơn giản $\\Rightarrow$ Đổi động từ đầu tiên thành **V-ing** (Present Participle).
    *   Nếu hành động đầu tiên đã xảy ra xong hoàn toàn rồi mới đến hành động sau $\\Rightarrow$ Đổi động từ đầu tiên thành **Having + V3/ed** (Perfect Participle).
    *   Nếu mang nghĩa bị động $\\Rightarrow$ Dùng **Having been + V3/ed** hoặc đơn giản chỉ là **V3/ed**.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài tập**: Rút gọn câu sau sử dụng phân từ hoàn thành: "After she had finished her homework, she went to bed."
    *   *Giải*:
        *   Hai vế cùng chủ ngữ "she". Hành động làm bài tập đã kết thúc hoàn toàn trước khi đi ngủ.
        *   Bỏ "After" và "she", chuyển "had finished" thành "Having finished".
        *   *Đáp án*: **Having finished her homework, she went to bed**.`
      },
      {
        chapterId: 'e11_ch4',
        title: 'Bài giảng Unit 7 & 8: Giáo dục bậc cao và Di sản',
        basic: `### Lý thuyết nền tảng
*   **Vocabulary**:
    *   *Education*: academic (thuộc học thuật), vocational (thuộc dạy nghề), tuition fee, tertiary education (giáo dục đại học).
    *   *Heritage*: intact (còn nguyên vẹn), archaeology (khảo cổ học), preserve, historic monument.
*   **Grammar**:
    *   **Passive voice with modal verbs**: $S + modal\\_verb + be + V3/ed$.
    *   **Reporting verbs**: Động từ tường thuật đi kèm To-V (agree, refuse, promise) hoặc V-ing (admit, deny, apologize for).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Kỹ thuật rút gọn mệnh đề quan hệ bằng To-V**:
    Mệnh đề quan hệ thông thường được rút gọn thành cụm V-ing hoặc V3/ed. Tuy nhiên, ta bắt buộc phải rút gọn thành dạng **To-V** trong các trường hợp:
    *   Danh từ đi trước có các từ bổ nghĩa mang tính thứ tự độc nhất: *the first, the second, the only, the last*, hoặc dạng so sánh nhất (*the tallest, the best*).
    *   *Ví dụ*: "He is the first man who set foot on the Moon." $\\to$ "He is the first man to set foot on the Moon."`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài tập**: Rút gọn mệnh đề quan hệ trong câu: "Neil Armstrong was the first person who walked on the Moon."
    *   *Giải*: Danh từ đi trước là "the first person" $\\Rightarrow$ Rút gọn mệnh đề quan hệ "who walked" thành "to walk".
    *   *Đáp án*: **Neil Armstrong was the first person to walk on the Moon**.`
      },
      {
        chapterId: 'e11_ch5',
        title: 'Bài giảng Unit 9 & 10: Thành phố tương lai và Lối sống',
        basic: `### Lý thuyết nền tảng
*   **Vocabulary**:
    *   *Cities*: sustainable (bền vững), livable (đáng sống), infrastructure, urban planner, sensor.
    *   *Lifestyle*: life expectancy (tuổi thọ), remedy (phương thuốc), nutritious, immune system.
*   **Grammar**:
    *   **Tag Questions (Câu hỏi đuôi)**: Hỏi xác nhận. Quy luật: Vế đầu khẳng định $\\to$ đuôi phủ định; vế đầu phủ định $\\to$ đuôi khẳng định.
    *   **Conditional Type 2 & 3**:
        *   Loại 2 (trái thực tế hiện tại): $If + S + V2/ed, S + would/could + V$.
        *   Loại 3 (trái thực tế quá khứ): $If + S + had + V3/ed, S + would\\_have + V3/ed$.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Đảo ngữ của câu điều kiện (Inversion of Conditionals)**:
    Giúp câu văn trang trọng hơn, đặc biệt hữu ích trong phần viết luận:
    *   Loại 1: Bỏ If, đưa Should lên đầu: **Should + S + V...**
    *   Loại 2: Bỏ If, đưa Were lên đầu: **Were + S + to-V...** (hoặc Were + S + Danh từ/Tính từ).
    *   Loại 3: Bỏ If, đưa Had lên đầu: **Had + S + V3/ed...**`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài tập**: Viết lại câu điều kiện loại 3 sau bằng cấu trúc đảo ngữ: "If I had known you were in hospital, I would have visited you."
    *   *Giải*:
        *   Đây là câu điều kiện loại 3. Lược bỏ "If" và đảo "Had" lên trước chủ ngữ "I".
        *   *Đáp án*: **Had I known you were in hospital, I would have visited you**.`
      }
    ]
  }),

  english_12: makeContext({
    title: 'Tiếng Anh 12 - Học thuật, IELTS/SAT Prep & Ôn thi THPT Quốc gia',
    author: 'Cambridge, Oxford & Bộ GD-ĐT',
    totalPages: 160,
    description: 'Từ vựng chuyên sâu đa lĩnh vực, văn hóa, trí tuệ nhân tạo, sự nghiệp và ôn tập toàn diện ngữ pháp luyện thi THPT QG.',
    chapters: [
      { id: 'e12_ch1', title: 'Unit 1 & 2: Life Stories & Urbanisation', pages: '1-30', content: 'Biography, distinguished, urbanization, slum. Quá khứ đơn vs. Quá khứ hoàn thành.' },
      { id: 'e12_ch2', title: 'Unit 3 & 4: The Green Movement & The Mass Media', pages: '31-60', content: 'Depletion, pathway, cyberbullying, subscribe. Đảo ngữ, Mạo từ A/An/The.' },
      { id: 'e12_ch3', title: 'Unit 5 & 6: Cultural Identity & Endangered Species', pages: '61-90', content: 'Assimilation, diversity, biodiversity, poaching. Câu bị động kép, So sánh kép.' },
      { id: 'e12_ch4', title: 'Unit 7 & 8: Artificial Intelligence & The World of Work', pages: '91-120', content: 'Algorithm, exterminate, candidate, prioritize. Câu tường thuật (Reported Speech).' },
      { id: 'e12_ch5', title: 'Unit 9 & 10: Choosing a Career & Lifelong Learning', pages: '121-150', content: 'Apprenticeship, workload, self-directed, facilitate. Mệnh đề nhượng bộ (Although, Despite).' }
    ],
    lectures: [
      {
        chapterId: 'e12_ch1',
        title: 'Bài giảng Unit 1 & 2: Tiểu sử và Đô thị hóa',
        basic: `### Lý thuyết nền tảng
*   **Vocabulary**:
    *   *Life stories*: biography (tiểu sử), distinguished (xuất chúng), perseverance (sự kiên trì), figure.
    *   *Urbanisation*: urbanisation (đô thị hóa), slum (khu ổ chuột), migration (sự di cư), overload, infrastructure.
*   **Grammar**: Phối hợp thì giữa Quá khứ đơn (hành động xen vào) và Quá khứ tiếp diễn (hành động đang xảy ra); hoặc Quá khứ đơn (hành động sau) và Quá khứ hoàn thành (hành động xảy ra trước đó).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Dấu hiệu nhận biết sự phối hợp giữa Quá khứ đơn và Quá khứ hoàn thành**:
    Học sinh cần ghi nhớ các liên từ chỉ thứ tự thời gian trong câu:
    *   **By the time + S + V (quá khứ đơn), S + V (quá khứ hoàn thành)**: Vào lúc hành động A xảy ra thì hành động B đã kết thúc rồi.
    *   *Ví dụ*: "By the time we arrived at the cinema, the film had already started." (Lúc chúng tôi đến rạp thì phim đã chiếu mất rồi).`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài tập**: Chia động từ trong ngoặc: "After they (finish) ______ their dinner, they (go) ______ out for a walk."
    *   *Giải*: Hành động ăn tối xong xảy ra trước hành động đi dạo $\\Rightarrow$ ăn tối chia Quá khứ hoàn thành, đi dạo chia Quá khứ đơn.
    *   *Đáp án*: **had finished / went**.`
      },
      {
        chapterId: 'e12_ch2',
        title: 'Bài giảng Unit 3 & 4: Phong trào Xanh và Truyền thông',
        basic: `### Lý thuyết nền tảng
*   **Vocabulary**:
    *   *Green movement*: depletion (sự cạn kiệt), decompose (phân hủy), fossil fuel, single-use plastic.
    *   *Mass media*: cyberbullying (bắt nạt trên mạng), subscribe (đăng ký), mass media, social network.
*   **Grammar**:
    *   **Inversion (Đảo ngữ)**: Đảo trợ động từ lên trước chủ ngữ khi có cụm từ phủ định đứng đầu câu.
    *   **Articles (Mạo từ A, An, The)**: Cách dùng mạo từ xác định và không xác định.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Các cấu trúc đảo ngữ kinh điển thường gặp trong đề thi THPT QG**:
    *   **Never / Seldom / Rarely + trợ động từ + S + V...**
    *   **Hardly / Scarcely + had + S + V3/ed + when + S + V2/ed** (Vừa mới... thì...).
    *   **No sooner + had + S + V3/ed + than + S + V2/ed** (Vừa mới... thì...).
    *   **Not only + trợ động từ + S + V... but also...** (Không những... mà còn...).
    *Lưu ý*: Cặp liên từ đi đôi: *Hardly* đi với *when*, còn *No sooner* đi với *than*. Không được hoán đổi nhầm lẫn hai cặp này.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài tập**: Viết lại câu sau sử dụng cấu trúc đảo ngữ với "No sooner": "As soon as she entered the house, the phone rang."
    *   *Giải*:
        *   Hành động cô ấy bước vào nhà xảy ra trước $\\Rightarrow$ dùng quá khứ hoàn thành đảo ngữ. Hành động điện thoại reo xảy ra sau $\\Rightarrow$ dùng quá khứ đơn.
        *   *Đáp án*: **No sooner had she entered the house than the phone rang**.`
      },
      {
        chapterId: 'e12_ch3',
        title: 'Bài giảng Unit 5 & 6: Bản sắc văn hóa và Loài tuyệt chủng',
        basic: `### Lý thuyết nền tảng
*   **Vocabulary**:
    *   *Cultural Identity*: assimilation (sự đồng hóa), cultural identity (bản sắc văn hóa), preserve, custom.
    *   *Endangered Species*: biodiversity (đa dạng sinh học), poaching (sự săn bắn trộm), extinction, habitat loss.
*   **Grammar**:
    *   **Double Comparative (So sánh kép)**: Càng... thì càng...
        *   Công thức: **The + so sánh hơn + S + V, the + so sánh hơn + S + V**.
    *   **Double Passive (Câu bị động kép)**: Bị động với động từ chỉ ý kiến (say, believe, report).`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Cách làm câu Bị động kép chính xác (2 dạng biến đổi)**:
    Cho câu: *People say that he works hard.*
    *   Dạng 1 (Chủ ngữ giả): **It + is + V3/ed (của động từ trước) + that + vế sau giữ nguyên**.
        $\\to$ *It is said that he works hard.*
    *   Dạng 2 (Đưa chủ ngữ vế sau lên): **S2 + be + V3/ed (động từ trước) + to-V (nếu cùng thì) / to have V3 (nếu lệch thì)**.
        $\\to$ *He is said to work hard.*`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài tập**: Chuyển câu sau sang dạng bị động thứ hai: "People believed that the pyramid was built by giants."
    *   *Giải*:
        *   Chủ ngữ vế sau: *the pyramid*. Động từ trước: *believed* (quá khứ). Động từ sau: *was built* (quá khứ, cùng thì với động từ trước).
        *   Đưa *The pyramid* lên đầu, chia bị động của *believed* ở quá khứ số ít: *was believed*.
        *   Vì cùng thì quá khứ nên nối bằng *to be built*.
        *   *Đáp án*: **The pyramid was believed to be built by giants**.`
      },
      {
        chapterId: 'e12_ch4',
        title: 'Bài giảng Unit 7 & 8: Trí tuệ nhân tạo và Công việc',
        basic: `### Lý thuyết nền tảng
*   **Vocabulary**:
    *   *AI*: algorithm (thuật toán), artificial intelligence, automate, machine learning, virtual assistant.
    *   *Work*: candidate (ứng viên), prioritize (ưu tiên), workload, job security, curriculum vitae (CV).
*   **Grammar (Reported Speech - Câu gián tiếp)**:
    *   Quy tắc lùi 1 thì (Hiện tại đơn $\\to$ Quá khứ đơn, Hiện tại hoàn thành $\\to$ Quá khứ hoàn thành, Will $\\to$ Would).
    *   Đổi trạng ngữ chỉ thời gian/nơi chốn: *here $\\to$ there*, *now $\\to$ then*, *today $\\to$ that day*, *yesterday $\\to$ the day before*.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Tường thuật gián tiếp sử dụng động từ đặc biệt (Reporting Verbs with structure)**:
    Thay vì dịch máy móc "He said that...", đề thi THPT QG thường kiểm tra cách dùng các động từ tường thuật đi kèm giới từ:
    *   **S + offered + to-V**: Đề nghị giúp đỡ.
    *   **S + apologized to someone + for V-ing**: Xin lỗi vì việc gì.
    *   **S + accused someone + of V-ing**: Buộc tội ai làm gì.
    *   **S + suggested + V-ing**: Gợi ý cùng làm gì.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài tập**: Viết lại câu tường thuật sau sử dụng động từ "apologize": "I'm sorry I didn't call you yesterday," John said to Mary.
    *   *Giải*:
        *   Áp dụng cấu trúc: *S + apologized to O + for (not) V-ing*.
        *   *yesterday* đổi thành *the day before* hoặc *the previous day*.
        *   *Đáp án*: **John apologized to Mary for not calling her the day before**.`
      },
      {
        chapterId: 'e12_ch5',
        title: 'Bài giảng Unit 9 & 10: Hướng nghiệp và Học tập trọn đời',
        basic: `### Lý thuyết nền tảng
*   **Vocabulary**:
    *   *Career*: apprenticeship (thực tập nghề), career path, recruit, entrepreneur (nhà khởi nghiệp).
    *   *Learning*: lifelong learning, self-directed (tự định hướng), facilitate (tạo điều kiện), critical thinking.
*   **Grammar**:
    *   **Concession clauses (Mệnh đề nhượng bộ)**:
        *   *Although / Even though / Though* $+$ Mệnh đề (S + V).
        *   *Despite / In spite of* $+$ Cụm danh từ / V-ing.`,
        advanced: `### Phương pháp sư phạm & Tư duy giải quyết
*   **Kỹ thuật chuyển đổi từ Although sang Despite/In spite of nhanh**:
    *   Trường hợp 1 (Cùng chủ ngữ): Lược bỏ chủ ngữ vế đầu và chuyển động từ thành **V-ing**.
        *   *Ví dụ*: Although he is poor, he studies well. $\\to$ Despite **being** poor, he studies well.
    *   Trường hợp 2 (Khác chủ ngữ): Đổi mệnh đề $S+V$ thành cụm Danh từ bằng cách chuyển tính từ lên trước danh từ hoặc dùng từ chỉ sở hữu.
        *   *Ví dụ*: Although the rain was heavy, they went camping. $\\to$ Despite **the heavy rain**, they went camping.`,
        examples: `### Thực chiến & Hướng dẫn giải chi tiết
*   **Bài tập**: Viết lại câu sau sử dụng "In spite of": "Although she was ill, she went to work."
    *   *Giải*:
        *   Hai vế cùng chủ ngữ "she". Động từ vế đầu là "was" (be).
        *   Chuyển "was" thành "being" đứng sau "In spite of".
        *   *Đáp án*: **In spite of being ill, she went to work**.`
      }
    ]
  }),
  ...newSubjects
};
