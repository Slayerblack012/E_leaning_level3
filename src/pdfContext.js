// Context data extracted from learning materials, structured by Grade 10, 11, 12, with detailed basic & advanced lectures, variables explanation, scenarios and combined formulas.

export const pdfContext = {
  // ==================== GRADE 10 ====================
  english_10: {
    title: "Tiếng Anh 10 - Chuyên đề Từ vựng & Giao tiếp (TOEIC Vocab)",
    author: "Rawdon Wyatt (A & C Black London)",
    totalPages: 83,
    description: "Chương trình ôn tập và rèn luyện từ vựng Tiếng Anh nâng cao cấp lớp 10 theo định hướng giao tiếp thương mại và TOEIC.",
    chapters: [
      { id: "changes", title: "Chương 1: Từ vựng về Sự Thay đổi (Changes)", pages: "1-3", topics: ["amended", "broaden", "build up", "reduce", "streamline"] },
      { id: "computers", title: "Chương 2: Từ vựng Máy tính & Công nghệ (Computers)", pages: "5-6", topics: ["access code", "database", "hardware", "software", "virus"] }
    ],
    lectures: [
      {
        chapterId: "changes",
        title: "Bài giảng Chương 1: Từ vựng về Sự Thay đổi (Changes)",
        basic: `### Lý thuyết cơ bản (Basic Vocabulary)
*   **Amend** (v): Sửa đổi, bổ sung (thường dùng cho văn bản pháp lý, hợp đồng, điều luật).
    *   *Tại sao dùng*: Khi một hợp đồng cũ cần cập nhật điều khoản mới mà không muốn hủy bỏ toàn bộ, ta dùng 'amend'.
    *   *Ví dụ*: The contract was amended to reflect the new delivery schedule. (Hợp đồng được sửa đổi để phản ánh lịch giao hàng mới.)
*   **Broaden** (v): Mở rộng phạm vi, kiến thức, tầm nhìn.
    *   *Tiền tố/Gốc từ*: Gốc từ 'broad' (rộng) + hậu tố '-en' (làm cho...). 'Broaden' nghĩa là làm cho rộng ra.
    *   *Ví dụ*: We need to broaden our product range to attract more customers. (Chúng ta cần mở rộng danh mục sản phẩm để thu hút nhiều khách hàng hơn.)
*   **Reduce** (v): Giảm bớt, cắt giảm (về lượng, kích thước, giá cả).
    *   *Ví dụ*: The company is trying to reduce operating costs. (Công ty đang cố gắng cắt giảm chi phí vận hành.)`,
        advanced: `### Chuyên đề nâng cao (Advanced Vocabulary - TOEIC/IELTS Band 6.5+)
*   **Deterioration** (n): Sự suy thoái, xấu đi (về chất lượng, sức khỏe, tình trạng).
    *   *Gốc từ*: Động từ 'deteriorate' (suy giảm, tệ đi) + hậu tố danh từ '-ation'.
    *   *Ví dụ*: A rapid deterioration in economic conditions. (Sự suy thoái nhanh chóng của các điều kiện kinh tế.)
*   **Downsizing** (n): Sự cắt giảm nhân lực để tinh gọn bộ máy.
    *   *Ý nghĩa*: Thường diễn ra khi doanh nghiệp gặp khó khăn tài chính hoặc muốn tự động hóa quy trình.
    *   *Ví dụ*: The management announced a downsizing plan next month. (Ban quản lý đã công bố kế hoạch cắt giảm nhân sự vào tháng tới.)
*   **Streamline** (v): Tối giản hóa, tinh giản (quy trình hoạt động để tăng hiệu suất).
    *   *Hình ảnh*: 'Streamline' nguyên nghĩa là dòng khí động học giúp xe cộ chạy nhanh hơn. Trong kinh doanh, nó có nghĩa là loại bỏ các bước thừa thãi để quy trình trôi chảy hơn.`,
        examples: `### Ví dụ minh họa & Giải chi tiết
*   **Bài tập mẫu**: Chọn từ phù hợp điền vào chỗ trống:
    "The manager decided to _________ the office procedures to eliminate unnecessary steps."
    *   A. downsize
    *   B. amend
    *   C. streamline
    *   D. deteriorate
    *   *Đáp án đúng*: **C. streamline**
    *   *Giải thích*: 'Streamline' có nghĩa là tinh giản quy trình (loại bỏ các bước không cần thiết - eliminate unnecessary steps), phù hợp nhất với ngữ cảnh của câu. 'Downsize' là cắt giảm nhân sự, 'amend' là sửa đổi hợp đồng, còn 'deteriorate' là tệ đi (nội động từ, không dùng ở thể chủ động tác động lên vật khác ở đây).`
      }
    ]
  },
  chemistry_10: {
    title: "Hoá học 10 - Lý thuyết và Bài tập Cơ bản đến Nâng cao",
    author: "Trường THPT Số 1 Nghĩa Hành",
    totalPages: 17,
    description: "Hệ thống hóa toàn bộ kiến thức Hóa học lớp 10 theo chương trình bám sát SGK. Tập trung vào cấu tạo chất, bảng tuần hoàn và các phản ứng cốt lõi.",
    chapters: [
      { id: "lop10_ch1", title: "Chương 1: Nguyên tử (Atom Structure)", pages: "1-6", content: "Cấu tạo nguyên tử (vỏ electron, hạt nhân: proton & nơtron), đồng vị, cấu hình electron." },
      { id: "lop10_ch4", title: "Chương 2: Phản ứng oxi hóa - khử (Redox Reactions)", pages: "15-17", content: "Xác định số oxi hóa, chất khử, chất oxi hóa, lập phương trình hóa học bằng phương pháp thăng bằng electron." }
    ],
    lectures: [
      {
        chapterId: "lop10_ch1",
        title: "Bài giảng Chương 1: Cấu tạo Nguyên tử",
        basic: `### Lý thuyết cơ bản (Basic Theory)
Nguyên tử là hạt vô cùng nhỏ và trung hòa về điện. Cấu tạo nguyên tử gồm:
1.  **Hạt nhân ở tâm**: Gồm các hạt **Proton** ($p$) mang điện dương ($+1$) và **Nơtron** ($n$) không mang điện tích.
2.  **Vỏ nguyên tử**: Gồm các hạt **Electron** ($e$) chuyển động rất nhanh mang điện âm ($-1$).
*   **Nguyên tắc trung hòa điện**: Trong nguyên tử, số lượng proton tích điện dương luôn cân bằng với số lượng electron tích điện âm.
    $$P = E = Z$$
    *(Với $Z$ là số hiệu nguyên tử, đại diện cho vị trí của nguyên tố trong bảng tuần hoàn).*
*   **Số khối ($A$)**: Đại diện cho tổng số hạt nặng nằm trong hạt nhân (do electron có khối lượng quá nhỏ không đáng kể):
    $$A = Z + N$$
    *Giải thích tiền tố*:
    *   $A$: Số khối (Mass number) - đơn vị là amu.
    *   $Z$: Số hiệu nguyên tử (Atomic number/số proton).
    *   $N$: Số hạt nơtron (Neutron number).`,
        advanced: `### Chuyên đề nâng cao (Advanced Chemistry)
*   **Đồng vị**: Các nguyên tử có cùng số proton ($Z$) nhưng khác số nơtron ($N$), dẫn tới số khối ($A$) khác nhau.
*   **Công thức tính nguyên tử khối trung bình ($A_{tb}$)**:
    $$A_{tb} = \frac{x_1 \cdot A_1 + x_2 \cdot A_2 + ... + x_n \cdot A_n}{100}$$
    *Trong đó*:
    *   $A_1, A_2, ...$: Số khối của các đồng vị thứ 1, thứ 2...
    *   $x_1, x_2, ...$: Phần trăm số nguyên tử tương ứng của mỗi đồng vị (tổng các $x$ phải bằng 100%).
*   **Phương pháp giải khi thiếu thông tin (Combined Logic)**:
    Nếu bài toán yêu cầu tìm phần trăm của hai đồng vị ($x_1$ và $x_2$) khi chỉ biết nguyên tử khối trung bình $A_{tb}$ và số khối của hai đồng vị ($A_1$ và $A_2$):
    *   *Bước 1*: Thiết lập hệ phương trình hai ẩn:
        $$\begin{cases} x_1 + x_2 = 100 \\ \frac{A_1 \cdot x_1 + A_2 \cdot x_2}{100} = A_{tb} \end{cases}$$
    *   *Bước 2*: Sử dụng phương pháp thế hoặc trừ đại số để tìm ra $x_1, x_2$.
    *   *Mẹo giải nhanh*: Có thể dùng quy tắc đường chéo để tính tỉ lệ:
        $$\frac{x_1}{x_2} = \frac{|A_2 - A_{tb}|}{|A_1 - A_{tb}|}$$`,
        examples: `### Ví dụ minh họa & Giải chi tiết
*   **Bài toán**: Clo trong tự nhiên gồm hai đồng vị bền là $^{35}Cl$ và $^{37}Cl$. Biết nguyên tử khối trung bình của Clo là 35,5. Hãy tính phần trăm số nguyên tử của đồng vị $^{35}Cl$.
*   **Lời giải chi tiết**:
    1. Gọi phần trăm số nguyên tử của đồng vị $^{35}Cl$ là $x$ (%). Khi đó phần trăm của $^{37}Cl$ là $100 - x$ (%).
    2. Áp dụng công thức nguyên tử khối trung bình:
       $$A_{tb} = \frac{35 \cdot x + 37 \cdot (100 - x)}{100} = 35,5$$
    3. Giải phương trình tìm $x$:
       $$35x + 3700 - 37x = 3550 \implies -2x = 3550 - 3700 \implies -2x = -150 \implies x = 75$$
    *Kết luận*: Phần trăm số nguyên tử của đồng vị $^{35}Cl$ là 75%, đồng vị $^{37}Cl$ chiếm 25%.`
      }
    ]
  },
  physics_10: {
    title: "Vật lý 10 - Tóm tắt Lý thuyết & Công thức Cơ học",
    author: "Thầy Hải Nguyễn",
    totalPages: 15,
    description: "Đề cương tóm tắt các định luật Cơ học và công thức tính toán trọng tâm của chương trình Vật lý lớp 10 THPT mới.",
    chapters: [
      { id: "ch1", title: "Chương 1: Động học chất điểm", pages: "1-5", content: "Chuyển động thẳng đều, thẳng biến đổi đều, rơi tự do." },
      { id: "ch2", title: "Chương 2: Động lực học chất điểm", pages: "6-10", content: "Ba định luật Newton, các lực cơ học: lực hấp dẫn, lực đàn hồi, lực ma sát." }
    ],
    lectures: [
      {
        chapterId: "ch1",
        title: "Bài giảng Chương 1: Động học chất điểm",
        basic: `### Lý thuyết cơ bản (Basic Physics)
Chuyển động thẳng biến đổi đều là chuyển động thẳng có gia tốc không đổi theo thời gian.
*   **Gia tốc ($a$)**: Đặc trưng cho sự biến thiên nhanh hay chậm của vận tốc:
    $$a = \frac{v - v_0}{t}$$
    *Giải thích ký hiệu*:
    *   $a$: Gia tốc (m/s²).
    *   $v_0$: Vận tốc ban đầu tại thời điểm $t_0 = 0$ (m/s).
    *   $v$: Vận tốc tức thời tại thời điểm $t$ (m/s).
    *   $t$: Khoảng thời gian chuyển động (s).
*   **Ý nghĩa của gia tốc**: Nếu $a > 0$, vận tốc tăng dần theo thời gian. Nếu $a < 0$, vận tốc giảm dần.
*   **Công thức tính quãng đường đi được ($s$)**:
    $$s = v_0 \cdot t + \frac{1}{2} a \cdot t^2$$
    *Ý nghĩa*: Quãng đường phụ thuộc bậc hai vào thời gian $t$.`,
        advanced: `### Chuyên đề nâng cao (Advanced Physics)
*   **Hệ thức độc lập đối với thời gian (Hệ thức liên hệ)**:
    Khi bài toán **thiếu/không cho thời gian $t$**, ta dùng công thức độc lập này để liên kết vận tốc tức thời, vận tốc đầu, gia tốc và quãng đường:
    $$v^2 - v_0^2 = 2 \cdot a \cdot s$$
*   **Phương pháp phân tích trường hợp (Case Analysis)**:
    1.  **Trường hợp 1: Chuyển động nhanh dần đều**:
        Vận tốc và gia tốc cùng chiều. Chọn chiều dương là chiều chuyển động thì:
        $$v_0 > 0 \quad \text{và} \quad a > 0$$
    2.  **Trường hợp 2: Chuyển động chậm dần đều**:
        Vận tốc và gia tốc ngược chiều. Chọn chiều dương là chiều chuyển động thì:
        $$v_0 > 0 \quad \text{và} \quad a < 0$$
        *Lưu ý*: Khi vật dừng lại hẳn, vận tốc cuối $v = 0$.
*   **Kết hợp công thức khi thiếu thông số**:
    *   *Nếu thiếu $a$*: Hãy tính $a$ từ công thức độc lập $a = \frac{v^2 - v_0^2}{2s}$ trước, rồi thế vào công thức thời gian $t = \frac{v - v_0}{a}$.
    *   *Nếu thiếu $v$*: Dùng $s = v_0 \cdot t + \frac{1}{2} a \cdot t^2$ để tìm quãng đường hoặc gia tốc trước, tránh dùng công thức chứa $v$.`,
        examples: `### Ví dụ minh họa & Giải chi tiết
*   **Bài toán**: Một đoàn tàu đang chạy với vận tốc 36 km/h thì hãm phanh chuyển động chậm dần đều để vào ga. Sau khi đi được quãng đường 100 m thì tàu dừng hẳn. Tính gia tốc của tàu và thời gian từ lúc hãm phanh đến lúc dừng.
*   **Lời giải chi tiết**:
    1.  *Đổi đơn vị*: Vận tốc đầu $v_0 = 36\ km/h = 10\ m/s$. Tàu dừng hẳn nên vận tốc cuối $v = 0\ m/s$. Quãng đường $s = 100\ m$.
    2.  *Phân tích thông số thiếu*: Bài toán chưa cho gia tốc $a$ và thời gian $t$.
    3.  *Tìm gia tốc $a$*: Áp dụng hệ thức độc lập thời gian (do chưa biết $t$):
        $$v^2 - v_0^2 = 2as \implies 0^2 - 10^2 = 2 \cdot a \cdot 100$$
        $$-100 = 200a \implies a = -0,5\ (m/s^2)$$
        *Nhận xét*: Gia tốc $a$ âm vì tàu chuyển động chậm dần đều ngược chiều dương.
    4.  *Tìm thời gian $t$*: Sử dụng công thức định nghĩa gia tốc:
        $$v = v_0 + at \implies 0 = 10 - 0,5 \cdot t \implies 0,5t = 10 \implies t = 20\ (giây)$$
    *Đáp số*: Gia tốc của tàu là $-0,5\ m/s^2$, thời gian dừng xe là 20 giây.`
      }
    ]
  },
  math_10: {
    title: "Toán học 10 - Kết nối tri thức với cuộc sống",
    author: "Nhà xuất bản Giáo dục Việt Nam",
    totalPages: 208,
    description: "Bộ sách giáo khoa Toán học lớp 10 bám sát chương trình mới Kết nối tri thức, bao gồm Mệnh đề tập hợp và Đại số tổ hợp.",
    chapters: [
      { id: "t1_ch1", title: "Chương 1: Mệnh đề và tập hợp", pages: "1-12", content: "Mệnh đề toán học, tập hợp, các phép toán trên tập hợp: giao, hợp, hiệu." },
      { id: "t2_ch8", title: "Chương 2: Đại số tổ hợp", pages: "80-95", content: "Quy tắc đếm, hoán vị, chỉnh hợp, tổ hợp." }
    ],
    lectures: [
      {
        chapterId: "t2_ch8",
        title: "Bài giảng Chương 2: Đại số tổ hợp (Hoán vị, Chỉnh hợp, Tổ hợp)",
        basic: `### Lý thuyết cơ bản (Basic Combinatorics)
*   **Hoán vị ($P_n$)**: Sắp xếp thứ tự của $n$ phần tử khác nhau vào $n$ vị trí.
    $$P_n = n! = n \cdot (n-1) \cdot (n-2) ... 2 \cdot 1$$
    *Ý nghĩa*: Số cách xếp hàng, xếp ghế cho $n$ người.
*   **Chỉnh hợp ($A_n^k$)**: Chọn ra $k$ phần tử từ nhóm $n$ phần tử, sau đó **sắp xếp** thứ tự $k$ phần tử đó.
    $$A_n^k = \frac{n!}{(n-k)!}$$
*   **Tổ hợp ($C_n^k$)**: Chỉ chọn ra $k$ phần tử từ nhóm $n$ phần tử mà **không quan tâm** đến thứ tự sắp xếp của chúng.
    $$C_n^k = \frac{n!}{k!(n-k)!}$$
    *Giải thích ký hiệu*:
    *   $n$: Tổng số phần tử có sẵn trong tập hợp ban đầu ($n \ge 1$).
    *   $k$: Số phần tử được chọn ra ($0 \le k \le n$).
    *   $!$: Ký hiệu giai thừa (Factorial).`,
        advanced: `### Chuyên đề nâng cao (Advanced Combinatorics)
*   **Phân biệt Chỉnh hợp ($A$) và Tổ hợp ($C$)**:
    *   *Tổ hợp ($C$)*: Chọn đội hình, chọn tổ đi trực nhật, chọn quả cầu cùng màu... (Không phân biệt vị trí, vai trò).
    *   *Chỉnh hợp ($A$)*: Chọn ban cán sự (1 lớp trưởng, 1 lớp phó - có vai trò khác nhau), lập số tự nhiên từ các chữ số (thay đổi vị trí chữ số tạo ra số mới)... (Có phân biệt thứ tự).
*   **Mối liên hệ giữa Chỉnh hợp và Tổ hợp**:
    $$A_n^k = k! \cdot C_n^k$$
    *Ý nghĩa*: Việc lập chỉnh hợp tương đương hai bước: Bước 1 chọn ra $k$ phần tử (tổ hợp $C_n^k$), Bước 2 hoán vị $k$ phần tử đó ($k!$).
*   **Kết hợp các công thức trong bài toán phức tạp**:
    Nếu bài toán yêu cầu chọn một nhóm gồm nhiều đối tượng khác loại (ví dụ chọn học sinh từ cả khối 10 và khối 11):
    *   *Bước 1*: Dùng tổ hợp chọn riêng lẻ từng nhóm đối tượng: $C_{n_1}^{k_1}$ và $C_{n_2}^{k_2}$.
    *   *Bước 2*: Kết hợp các kết quả bằng **Quy tắc nhân** (nếu các hành động liên tiếp):
        $$N = C_{n_1}^{k_1} \cdot C_{n_2}^{k_2}$$
    *   Nếu chia nhiều trường hợp độc lập, tính số cách của mỗi trường hợp rồi kết hợp bằng **Quy tắc cộng**:
        $$N = N_1 + N_2$$`,
        examples: `### Ví dụ minh họa & Giải chi tiết
*   **Bài toán**: Một nhóm học tập gồm 5 học sinh nam và 6 học sinh nữ. Hỏi có bao nhiêu cách chọn ra một ban đại diện gồm 3 học sinh sao cho trong ban đại diện phải có ít nhất 1 học sinh nam và ít nhất 1 học sinh nữ?
*   **Lời giải chi tiết**:
    Vì ban đại diện gồm 3 học sinh, để có cả nam và nữ ta phân tích các trường hợp sau:
    *   **Trường hợp 1**: Ban đại diện gồm 1 nam và 2 nữ.
        *   Chọn 1 nam từ 5 nam: $C_5^1 = 5$ cách.
        *   Chọn 2 nữ từ 6 nữ: $C_6^2 = 15$ cách.
        *   Theo quy tắc nhân, số cách chọn cho TH1 là: $N_1 = C_5^1 \cdot C_6^2 = 5 \cdot 15 = 75$ cách.
    *   **Trường hợp 2**: Ban đại diện gồm 2 nam và 1 nữ.
        *   Chọn 2 nam từ 5 nam: $C_5^2 = 10$ cách.
        *   Chọn 1 nữ từ 6 nữ: $C_6^1 = 6$ cách.
        *   Theo quy tắc nhân, số cách chọn cho TH2 là: $N_2 = C_5^2 \cdot C_6^1 = 10 \cdot 6 = 60$ cách.
    *   **Kết hợp**: Hai trường hợp này độc lập với nhau, áp dụng quy tắc cộng:
        $$N = N_1 + N_2 = 75 + 60 = 135\ (cách)$$
    *Đáp số*: Có 135 cách chọn thỏa mãn yêu cầu.`
      }
    ]
  },

  // ==================== GRADE 11 ====================
  english_11: {
    title: "Tiếng Anh 11 - Từ vựng & Đọc hiểu IELTS",
    author: "Cambridge University Press",
    totalPages: 112,
    description: "Tập trung nâng cao vốn từ vựng học thuật (Academic Vocabulary) và kỹ năng đọc hiểu phục vụ kỳ thi IELTS cho học sinh lớp 11.",
    chapters: [
      { id: "nature", title: "Chương 1: Nature & Environment (Môi trường sống)", pages: "10-15", topics: ["biodegradable", "ecosystem", "deforestation", "conservation", "sustainable"] }
    ],
    lectures: [
      {
        chapterId: "nature",
        title: "Bài giảng Chương 1: Nature & Environment",
        basic: `### Lý thuyết cơ bản (Basic Vocabulary)
*   **Deforestation** (n): Sự phá rừng, tàn phá rừng diện rộng.
    *   *Tiền tố*: Tiền tố 'de-' mang nghĩa phủ định, loại bỏ, làm giảm + danh từ gốc 'forest' (rừng) + hậu tố '-ation' tạo danh từ chỉ quá trình. 'Deforestation' là quá trình triệt phá rừng.
    *   *Ví dụ*: Deforestation is a major contributor to global warming. (Phá rừng là nhân tố đóng góp lớn vào hiện tượng ấm lên toàn cầu.)
*   **Conservation** (n): Sự bảo tồn (môi trường, năng lượng, di tích).
    *   *Tại sao dùng*: Dùng để chỉ các hành động bảo vệ tài nguyên thiên nhiên khỏi bị cạn kiệt hoặc hủy hoại.
    *   *Ví dụ*: Water conservation is necessary in dry seasons. (Bảo tồn nguồn nước là cần thiết vào mùa khô.)`,
        advanced: `### Chuyên đề nâng cao (Advanced Vocabulary - IELTS Band 7.0+)
*   **Biodegradable** (adj): Có thể phân hủy sinh học (thân thiện môi trường).
    *   *Tiền tố/Gốc từ*: 'bio-' (liên quan đến sự sống/sinh học) + 'degrade' (phân hủy, làm suy biến chất lượng) + hậu tố tính từ '-able' (có thể). 'Biodegradable' nghĩa là có thể bị phân hủy bởi các sinh vật sống một cách tự nhiên.
    *   *Ví dụ*: We should use biodegradable packaging. (Chúng ta nên sử dụng bao bì tự phân hủy sinh học.)
*   **Sustainable development** (collocation): Phát triển bền vững.
    *   *Ý nghĩa*: Sự phát triển đáp ứng nhu cầu hiện tại mà không làm tổn hại đến khả năng đáp ứng nhu cầu của các thế hệ tương lai.`,
        examples: `### Ví dụ minh họa & Giải chi tiết
*   **Bài tập mẫu**: Chọn từ đúng:
    "We need to find alternative energy resources due to the rapid __________ of fossil fuels."
    *   A. conservation
    *   B. depletion
    *   C. rehabilitation
    *   D. automation
    *   *Đáp án đúng*: **B. depletion**
    *   *Giải thích*: 'Depletion of fossil fuels' là sự cạn kiệt nhiên liệu hóa thạch. Câu này có nghĩa: 'Chúng ta cần tìm các nguồn năng lượng thay thế do sự cạn kiệt nhanh chóng của nhiên liệu hóa thạch'. Phương án B là hợp ngữ cảnh nhất.`
      }
    ]
  },
  chemistry_11: {
    title: "Hóa học 11 - Cân bằng hóa học & Hóa hữu cơ",
    author: "NXB Giáo dục Việt Nam",
    totalPages: 145,
    description: "Nội dung trọng tâm lớp 11 bám sát chương trình mới, giới thiệu về sự điện li, cân bằng hóa học và các hợp chất hữu cơ cơ bản.",
    chapters: [
      { id: "can_bang", title: "Chương 1: Cân bằng hóa học & Sự điện li", pages: "1-18", content: "Khái niệm phản ứng thuận nghịch, hằng số cân bằng Kc, sự điện li, chất điện li mạnh/yếu, định nghĩa pH." }
    ],
    lectures: [
      {
        chapterId: "can_bang",
        title: "Bài giảng Chương 1: Cân bằng hóa học & Sự điện li",
        basic: `### Lý thuyết cơ bản (Basic Theory)
Sự điện li là quá trình phân li các chất trong nước ra các ion trái dấu (cation mang điện dương và anion mang điện âm).
*   **Chất điện li mạnh**: Axit mạnh (HCl, $HNO_3$, $H_2SO_4$), Bazơ mạnh (NaOH, KOH, $Ba(OH)_2$), và hầu hết các muối tan. Chúng phân li hoàn toàn (sử dụng mũi tên một chiều $\to$).
*   **Chất điện li yếu**: Axit yếu ($CH_3COOH$, $H_2S$), Bazơ yếu. Chúng phân li một phần (sử dụng mũi tên thuận nghịch $\rightleftharpoons$).
*   **Định nghĩa chỉ số pH**: Là đại lượng đặc trưng cho nồng độ ion $H^+$ trong dung dịch để đánh giá độ axit hay bazơ:
    $$\text{pH} = -\log[H^+]$$
    *Giải thích ký hiệu*:
    *   $[H^+]$: Nồng độ mol của ion hydro (M).
    *   $\log$: Lôgarit cơ số 10.
*   **Ý nghĩa của pH**: Dung dịch trung tính có $\text{pH} = 7$. Dung dịch axit có $\text{pH} < 7$. Dung dịch kiềm có $\text{pH} > 7$.`,
        advanced: `### Chuyên đề nâng cao (Advanced Chemistry)
*   **Tích số ion của nước ($K_w$)**: Ở $25^\circ C$, nước tự điện li rất yếu theo cân bằng: $H_2O \rightleftharpoons H^+ + OH^-$. Tích số nồng độ hai ion này luôn là một hằng số:
    $$K_w = [H^+] \cdot [OH^-] = 10^{-14}$$
*   **Công thức liên hệ tính nhanh pH dung dịch kiềm (bazơ mạnh)**:
    Khi dung dịch chỉ cung cấp nồng độ $OH^-$ (thiếu $[H^+]$), ta có hai phương pháp để tính pH:
    *   *Phương pháp 1: Tìm $[H^+]$ trước*:
        $$[H^+] = \frac{10^{-14}}{[OH^-]} \implies \text{pH} = -\log[H^+]$$
    *   *Phương pháp 2: Sử dụng chỉ số pOH*:
        $$\text{pOH} = -\log[OH^-]$$
        Sau đó áp dụng công thức kết hợp:
        $$\text{pH} + \text{pOH} = 14 \implies \text{pH} = 14 - \text{pOH}$$
*   **Cách giải khi hệ có nhiều axit hoặc bazơ (Hỗn hợp)**:
    *   *Bước 1*: Tính tổng số mol ion $H^+$ (hoặc $OH^-$) do tất cả các chất phân li ra.
    *   *Bước 2*: Tính nồng độ mol tổng: $[H^+]_{tổng} = \frac{\Sigma n_{H^+}}{V_{tổng}}$.
    *   *Bước 3*: Áp dụng công thức tính pH thông thường.`,
        examples: `### Ví dụ minh họa & Giải chi tiết
*   **Bài toán**: Tính pH của dung dịch thu được khi trộn lẫn 100 ml dung dịch HCl 0,1 M với 100 ml dung dịch NaOH 0,08 M.
*   **Lời giải chi tiết**:
    1.  *Tính số mol các ion phản ứng*:
        *   HCl là axit mạnh: $n_{H^+} = n_{HCl} = 0,1 \cdot 0,1 = 0,01$ mol.
        *   NaOH là bazơ mạnh: $n_{OH^-} = n_{NaOH} = 0,1 \cdot 0,08 = 0,008$ mol.
    2.  *Phản ứng trung hòa*:
        $$H^+ + OH^- \to H_2O$$
        Nhận thấy $n_{H^+} = 0,01 > n_{OH^-} = 0,008 \implies$ Ion $H^+$ dư sau phản ứng.
    3.  *Tính số mol H+ dư*:
        $$n_{H^+\ dư} = 0,01 - 0,008 = 0,002$ mol.
    4.  *Tính nồng độ H+ dư (Chú ý thể tích tổng)*:
        Thể tích dung dịch sau khi trộn: $V_{tổng} = 100\ ml + 100\ ml = 200\ ml = 0,2$ lít.
        $$[H^+]_{dư} = \frac{0,002}{0,2} = 0,01\ M = 10^{-2}\ M$$
    5.  *Tính pH*:
        $$\text{pH} = -\log[H^+] = -\log(10^{-2}) = 2$$
    *Đáp số*: pH của dung dịch sau khi trộn bằng 2.`
      }
    ]
  },
  physics_11: {
    title: "Vật lý 11 - Dao động điều hòa & Điện trường",
    author: "NXB Giáo dục Việt Nam",
    totalPages: 160,
    description: "Học phần chi tiết về các loại Dao động cơ học cơ bản, Sóng và kiến thức điện trường, từ trường lớp 11.",
    chapters: [
      { id: "dao_dong", title: "Chương 1: Dao động cơ học", pages: "1-22", content: "Dao động điều hòa, con lắc lò xo, con lắc đơn, các đại lượng đặc trưng hình sin." }
    ],
    lectures: [
      {
        chapterId: "dao_dong",
        title: "Bài giảng Chương 1: Dao động điều hòa",
        basic: `### Lý thuyết cơ bản (Basic Theory)
Dao động điều hòa là dao động trong đó li độ của vật là một hàm cosin hoặc sin theo thời gian.
*   **Phương trình li độ**:
    $$x = A \cdot \cos(\omega t + \varphi)$$
    *Giải thích ký hiệu*:
    *   $x$: Li độ (vị trí tức thời của vật so với vị trí cân bằng, cm hoặc m).
    *   $A$: Biên độ dao động ($A > 0$). Đây là độ lệch lớn nhất của vật khỏi vị trí cân bằng.
    *   $\omega$: Tần số góc (rad/s). Đặc trưng cho tốc độ biến thiên của pha dao động.
    *   $\varphi$: Pha ban đầu (rad). Xác định trạng thái của vật tại thời điểm $t = 0$.
    *   $(\omega t + \varphi)$: Pha dao động tại thời điểm $t$ (rad). Xác định trạng thái dao động ở thời điểm bất kỳ.
*   **Vận tốc ($v$) và Gia tốc ($a$)**:
    *   Vận tốc biến thiên điều hòa nhanh pha $\pi/2$ so với li độ: $v = x' = -\omega A \sin(\omega t + \varphi)$.
    *   Gia tốc biến thiên điều hòa ngược pha so với li độ: $a = v' = -\omega^2 x$.`,
        advanced: `### Chuyên đề nâng cao (Advanced Physics)
*   **Hệ thức độc lập thời gian (Định luật bảo toàn năng lượng)**:
    Khi bài toán **không cho thời gian $t$**, ta áp dụng công thức sau để tìm biên độ $A$, li độ $x$ hoặc vận tốc $v$:
    $$A^2 = x^2 + \frac{v^2}{\omega^2}$$
    *Giải thích tại sao dùng*: Công thức này rút ra từ hệ thức lượng giác $\sin^2\alpha + \cos^2\alpha = 1$. Nó cho biết li độ và vận tốc luôn vuông pha với nhau.
*   **Con lắc lò xo treo thẳng đứng (Combined Formulas)**:
    Khi treo vật vào lò xo thẳng đứng, ở vị trí cân bằng lò xo đã bị giãn một đoạn $\Delta l_0$. Ta có mối liên hệ:
    $$F_{đh} = P \implies k \cdot \Delta l_0 = m \cdot g \implies \frac{k}{m} = \frac{g}{\Delta l_0}$$
    Từ đó, tần số góc của con lắc lò xo treo thẳng đứng có thể tính theo gia tốc trọng trường $g$:
    $$\omega = \sqrt{\frac{k}{m}} = \sqrt{\frac{g}{\Delta l_0}}$$
*   **Phương pháp giải khi thiếu khối lượng $m$**:
    Nếu bài toán yêu cầu tính chu kỳ $T$ nhưng không cho khối lượng $m$ và độ cứng $k$, hãy tìm độ giãn của lò xo ở vị trí cân bằng $\Delta l_0$. Sau đó áp dụng công thức kết hợp:
    $$T = 2\pi \sqrt{\frac{\Delta l_0}{g}}$$`,
        examples: `### Ví dụ minh họa & Giải chi tiết
*   **Bài toán**: Một con lắc lò xo treo thẳng đứng dao động điều hòa. Tại vị trí cân bằng, lò xo giãn 4 cm. Lấy $g = 10\ m/s^2$ (lấy $\pi^2 \approx 10$). Hãy tính chu kỳ dao động $T$ của con lắc này.
*   **Lời giải chi tiết**:
    1.  *Phân tích thông số*: Bài toán không cung cấp khối lượng $m$ của vật hay độ cứng $k$ của lò xo. Tuy nhiên, ta biết độ giãn ở vị trí cân bằng $\Delta l_0 = 4\ cm = 0,04\ m$.
    2.  *Áp dụng công thức kết hợp*: Do thiếu cả $m$ và $k$, ta thay thế $\frac{m}{k}$ bằng $\frac{\Delta l_0}{g}$:
        $$T = 2\pi \sqrt{\frac{\Delta l_0}{g}} = 2\pi \sqrt{\frac{0,04}{10}}$$
    3.  *Tính toán*:
        $$T = 2\pi \sqrt{0,004} = 2\pi \cdot \frac{0,2}{\sqrt{10}}$$
        Vì đề bài cho $\sqrt{10} \approx \pi$, ta rút gọn được:
        $$T \approx 2\pi \cdot \frac{0,2}{\pi} = 2 \cdot 0,2 = 0,4\ (giây)$$
    *Đáp số*: Chu kỳ dao động của con lắc lò xo là 0,4 giây.`
      }
    ]
  },

  // ==================== GRADE 12 ====================
  english_12: {
    title: "Tiếng Anh 12 - Học thuật Nâng cao (IELTS & SAT Prep)",
    author: "Cambridge & Oxford Press",
    totalPages: 130,
    description: "Bộ học liệu từ vựng nâng cao chuyên sâu định hướng học thuật cao cấp và luyện kỹ năng làm bài thi SAT/IELTS thực tế.",
    chapters: [
      { id: "global_issues", title: "Chương 1: Global Issues (Các vấn đề toàn cầu)", pages: "1-15", topics: ["carbon footprint", "sustainability", "geopolitics", "depletion", "rehabilitation"] }
    ],
    lectures: [
      {
        chapterId: "global_issues",
        title: "Bài giảng Chương 1: Global Issues",
        basic: `### Lý thuyết cơ bản (Basic Vocabulary)
*   **Carbon footprint** (n): Dấu chân carbon (lượng khí nhà kính phát thải trực tiếp hoặc gián tiếp từ hoạt động con người).
    *   *Tại sao dùng*: Dùng trong các bài viết về môi trường để đo lường mức độ ảnh hưởng của một cá nhân, tổ chức đối với biến đổi khí hậu.
    *   *Ví dụ*: Buying local food helps lower your carbon footprint. (Mua thực phẩm địa phương giúp giảm dấu chân carbon.)
*   **Sustainability** (n): Sự bền vững, phát triển lâu dài không hủy hoại môi trường.
    *   *Gốc từ*: Động từ 'sustain' (duy trì, chống đỡ) + hậu tố tính từ '-able' + hậu tố danh từ '-ity'.`,
        advanced: `### Chuyên đề nâng cao (Advanced Vocabulary - SAT Level)
*   **Depletion** (n): Sự cạn kiệt, suy giảm nghiêm trọng nguồn tài nguyên.
    *   *Gốc từ*: Động từ 'deplete' (làm cạn kiệt) + hậu tố '-tion' chỉ hành động/kết quả.
    *   *Ví dụ*: The depletion of the ozone layer is alarming. (Sự cạn kiệt tầng ozone rất đáng báo động.)
*   **Rehabilitation** (n): Sự phục hồi, cải tạo (đất đai bị tàn phá, sức khỏe sau chấn thương).
    *   *Ví dụ*: A project aiming at the rehabilitation of coastal wetlands. (Dự án nhằm phục hồi các vùng đất ngập nước ven biển.)`,
        examples: `### Ví dụ minh họa & Giải chi tiết
*   **Bài tập mẫu**: Chọn từ thích hợp điền vào chỗ trống:
    "Governments are funding projects for the _________ of industrial lands to turn them back into green spaces."
    *   A. depletion
    *   B. rehabilitation
    *   C. disruption
    *   D. fluctuation
    *   *Đáp án đúng*: **B. rehabilitation**
    *   *Giải thích*: 'Rehabilitation' nghĩa là phục hồi/cải tạo. Việc biến các khu đất công nghiệp cũ trở lại thành không gian xanh (turn them back into green spaces) tương ứng với hành động phục hồi cải tạo.`
      }
    ]
  },
  chemistry_12: {
    title: "Hóa học 12 - Hóa học Hữu cơ nâng cao & Đại cương Kim loại",
    author: "NXB Giáo dục Việt Nam",
    totalPages: 180,
    description: "Chương trình Hóa học 12 bám sát cấu trúc đề thi tốt nghiệp THPT Quốc gia, bao gồm các chuyên đề este-lipit và kim loại phức tạp.",
    chapters: [
      { id: "este_lipit", title: "Chương 1: Este - Lipit & Chất béo", pages: "1-20", content: "Định nghĩa este, danh pháp, tính chất vật lý và phản ứng thủy phân (xà phòng hóa), chất béo tốt/xấu." }
    ],
    lectures: [
      {
        chapterId: "este_lipit",
        title: "Bài giảng Chương 1: Este - Lipit & Chất béo",
        basic: `### Lý thuyết cơ bản (Basic Theory)
Este là dẫn xuất của axit cacboxylic khi thay thế nhóm $-OH$ ở nhóm cacboxyl bằng nhóm $-OR'$ của ancol.
*   **Công thức este no, đơn chức, mạch hở**:
    $$C_nH_{2n}O_2 \quad (n \ge 2)$$
*   **Phản ứng thủy phân trong môi trường axit (Thuận nghịch)**:
    $$RCOOR' + H_2O \rightleftharpoons RCOOH + R'OH$$
*   **Phản ứng thủy phân trong môi trường kiềm (Một chiều - Phản ứng xà phòng hóa)**:
    $$RCOOR' + NaOH \to RCOONa + R'OH$$
    *Ý nghĩa*: Tạo ra xà phòng (muối natri của axit béo) và ancol.`,
        advanced: `### Chuyên đề nâng cao (Advanced Chemistry)
*   **Chất béo (Triglycerit)**: Là trieste của glixerol với các axit béo. Công thức tổng quát: $(RCOO)_3C_3H_5$.
*   **Phản ứng xà phòng hóa chất béo**:
    $$(RCOO)_3C_3H_5 + 3NaOH \to 3RCOONa + C_3H_5(OH)_3$$
*   **Phương pháp giải nhanh bằng Định luật Bảo toàn khối lượng**:
    Khi giải bài toán thủy phân chất béo phức tạp, thay vì viết phương trình chi tiết của từng este vốn rất mất thời gian, ta sử dụng mối liên kết số mol và bảo toàn khối lượng:
    *   *Công thức 1 (Tỉ lệ mol)*:
        $$n_{NaOH} = 3 \cdot n_{glixerol} = 3 \cdot n_{chất\ béo}$$
    *   *Công thức 2 (Bảo toàn khối lượng)*:
        $$m_{chất\ béo} + m_{NaOH} = m_{muối\ (xà\ phòng)} + m_{glixerol}$$
*   **Hướng dẫn khi thiếu thông tin công thức axit béo**:
    Nếu đề bài yêu cầu tìm khối lượng muối $m_{muối}$ thu được nhưng không cho biết gốc axit béo $R$ là gì:
    *   *Bước 1*: Dựa vào lượng kiềm phản ứng để tính số mol glixerol sinh ra: $n_{glixerol} = \frac{1}{3} n_{NaOH}$.
    *   *Bước 2*: Tính khối lượng kiềm phản ứng: $m_{NaOH} = n_{NaOH} \cdot 40$.
    *   *Bước 3*: Tính khối lượng glixerol sinh ra: $m_{glixerol} = n_{glixerol} \cdot 92$.
    *   *Bước 4*: Thay tất cả số liệu vào công thức bảo toàn khối lượng để tính ra $m_{muối}$ mà không cần biết công thức phân tử chất béo.`,
        examples: `### Ví dụ minh họa & Giải chi tiết
*   **Bài toán**: Xà phòng hóa hoàn toàn 17,24 gam chất béo cần dùng vừa đủ dung dịch chứa 0,06 mol NaOH. Cô cạn dung dịch sau phản ứng thu được bao nhiêu gam muối khan (xà phòng)?
*   **Lời giải chi tiết**:
    1.  *Phân tích đề*: Đề bài chưa cho biết công thức phân tử cụ thể của chất béo hay gốc axit béo $R$. Do đó ta không thể tính trực tiếp khối lượng muối theo công thức cấu tạo.
    2.  *Áp dụng tỉ lệ mol để tìm số mol glixerol*:
        $$n_{glixerol} = \frac{1}{3} n_{NaOH} = \frac{1}{3} \cdot 0,06 = 0,02\ (mol)$$
    3.  *Tính khối lượng các chất đã biết*:
        *   Khối lượng NaOH tham gia phản ứng: $m_{NaOH} = 0,06 \cdot 40 = 2,4$ gam.
        *   Khối lượng glixerol sinh ra: $m_{glixerol} = 0,02 \cdot 92 = 1,84$ gam.
    4.  *Áp dụng định luật bảo toàn khối lượng*:
        $$m_{chất\ béo} + m_{NaOH} = m_{muối} + m_{glixerol}$$
        $$\implies 17,24 + 2,4 = m_{muối} + 1,84$$
        $$\implies 19,64 = m_{muối} + 1,84 \implies m_{muối} = 19,64 - 1,84 = 17,8\ (gam)$$
    *Đáp số*: Khối lượng muối khan thu được là 17,8 gam.`
      }
    ]
  },
  physics_12: {
    title: "Vật lý 12 - Dao động, Sóng & Mạch xoay chiều RLC",
    author: "NXB Giáo dục Việt Nam",
    totalPages: 210,
    description: "Tài liệu học tập trọng tâm lớp 12 chuẩn bị cho kỳ thi tốt nghiệp THPT, tập trung vào Điện xoay chiều RLC và Lượng tử ánh sáng.",
    chapters: [
      { id: "dien_xoay_chieu", title: "Chương 1: Dòng điện xoay chiều RLC", pages: "10-45", content: "Định nghĩa dòng điện xoay chiều, cảm kháng, dung kháng, tổng trở mạch RLC nối tiếp, độ lệch pha." }
    ],
    lectures: [
      {
        chapterId: "dien_xoay_chieu",
        title: "Bài giảng Chương 1: Dòng điện xoay chiều RLC",
        basic: `### Lý thuyết cơ bản (Basic Theory)
Mạch xoay chiều nối tiếp gồm 3 linh kiện: Điện trở thuần $R$, cuộn cảm thuần $L$ và tụ điện $C$.
*   **Trở kháng của các phần tử (Cản trở dòng điện)**:
    *   Điện trở: $R$ ($\Omega$). Không phụ thuộc vào tần số dòng điện.
    *   Cảm kháng của cuộn cảm: $Z_L = \omega \cdot L$ ($\Omega$). Cản trở AC, tăng khi tần số tăng.
    *   Dung kháng của tụ điện: $Z_C = \frac{1}{\omega \cdot C}$ ($\Omega$). Cản trở AC, giảm khi tần số tăng.
*   **Tổng trở của đoạn mạch nối tiếp ($Z$)**:
    $$Z = \sqrt{R^2 + (Z_L - Z_C)^2}$$
    *Giải thích ký hiệu*:
    *   $Z$: Tổng trở toàn mạch ($\Omega$).
    *   $R$: Điện trở thuần ($\Omega$).
    *   $Z_L, Z_C$: Cảm kháng và dung kháng ($\Omega$).
*   **Ý nghĩa của Tổng trở**: Đại lượng tương đương như điện trở trong mạch một chiều, đặc trưng cho mức độ cản trở dòng điện xoay chiều của toàn mạch RLC.`,
        advanced: `### Chuyên đề nâng cao (Advanced Physics)
*   **Độ lệch pha giữa điện áp tức thời hai đầu mạch ($u$) và cường độ dòng điện ($i$)**:
    $$\tan\varphi = \frac{Z_L - Z_C}{R}$$
    *Phân tích trường hợp (Case Analysis)*:
    1.  **Trường hợp 1: $Z_L > Z_C \implies \varphi > 0$**: Điện áp $u$ sớm pha hơn dòng điện $i$. Mạch có tính **cảm kháng**.
    2.  **Trường hợp 2: $Z_L < Z_C \implies \varphi < 0$**: Điện áp $u$ trễ pha hơn dòng điện $i$. Mạch có tính **dung kháng**.
    3.  **Trường hợp 3: $Z_L = Z_C \implies \varphi = 0$**: Hiện tượng **cộng hưởng điện** xảy ra.
*   **Hệ quả của hiện tượng cộng hưởng điện (Resonance Condition)**:
    Khi xảy ra cộng hưởng ($Z_L = Z_C$):
    *   Tần số góc thỏa mãn: $\omega^2 \cdot L \cdot C = 1 \implies f = \frac{1}{2\pi\sqrt{LC}}$
    *   Tổng trở đạt giá trị nhỏ nhất: $Z_{min} = R$
    *   Cường độ dòng điện hiệu dụng đạt cực đại: $I_{max} = \frac{U}{R}$
    *   Công suất tiêu thụ đạt cực đại: $P_{max} = I^2 \cdot R = \frac{U^2}{R}$
*   **Phương pháp giải khi thiếu tham số cảm kháng/dung kháng (Combined Formulas)**:
    Nếu bài toán yêu cầu tìm công suất $P$ nhưng chưa cho biết $Z_L$ hay $Z_C$, thay vào đó lại cung cấp độ lệch pha $\varphi$ hoặc hệ số công suất $\cos\varphi$:
    *   *Bước 1*: Sử dụng công thức liên hệ công suất qua hệ số công suất:
        $$P = U \cdot I \cdot \cos\varphi$$
    *   *Bước 2*: Kết hợp với định luật Ohm $I = \frac{U}{Z}$ và hệ thức $\cos\varphi = \frac{R}{Z}$ để viết lại:
        $$P = \frac{U^2}{Z} \cdot \cos\varphi = \frac{U^2 \cdot \cos^2\varphi}{R}$$
    *   *Ý nghĩa*: Công thức này giúp tính trực tiếp $P$ mà không cần quan tâm đến trị số của $L$ hay $C$, miễn là biết độ lệch pha $\varphi$ và điện trở $R$.`,
        examples: `### Ví dụ minh họa & Giải chi tiết
*   **Bài toán**: Đặt một điện áp xoay chiều hiệu dụng $U = 200$ V vào hai đầu đoạn mạch RLC nối tiếp có điện trở $R = 100\ \Omega$. Biết điện áp hai đầu mạch lệch pha $\pi/3$ so với cường độ dòng điện chạy trong mạch. Hãy tính công suất tiêu thụ của đoạn mạch này.
*   **Lời giải chi tiết**:
    1.  *Phân tích đề*: Bài toán không cho biết tần số góc $\omega$, độ tự cảm $L$ hay điện dung $C$. Do đó ta không thể tính trực tiếp cảm kháng $Z_L$, dung kháng $Z_C$ hay tổng trở $Z$.
    2.  *Áp dụng công thức kết hợp*: Nhờ có độ lệch pha $\varphi = \pi/3$, ta sử dụng công thức tính nhanh công suất tiêu thụ:
        $$P = \frac{U^2 \cdot \cos^2\varphi}{R}$$
    3.  *Thay số tính toán*:
        *   $\cos\varphi = \cos(\pi/3) = 0,5$.
        $$P = \frac{200^2 \cdot (0,5)^2}{100} = \frac{40000 \cdot 0,25}{100} = \frac{10000}{100} = 100\ (W)$$
    *Đáp số*: Công suất tiêu thụ của đoạn mạch là 100 W.`
      }
    ]
  },
  math_12: {
    title: "Toán học 12 - Khảo sát hàm số & Tích phân, Hình học Oxyz",
    author: "Bộ sách Kết nối tri thức",
    totalPages: 250,
    description: "Giải tích 12 nâng cao gồm khảo sát sự biến thiên của đồ thị hàm số, tích phân giải tích và hình học tọa độ Oxyz.",
    chapters: [
      { id: "khao_sat", title: "Chương 1: Ứng dụng đạo hàm khảo sát hàm số", pages: "1-40", content: "Tính đơn điệu, cực trị, giá trị lớn nhất, giá trị nhỏ nhất, đường tiệm cận của đồ thị hàm số." },
      { id: "tich_phan", title: "Chương 2: Nguyên hàm và Tích phân", pages: "60-95", content: "Định nghĩa nguyên hàm, các phương pháp tính tích phân (đổi biến số, từng phần) và ứng dụng." }
    ],
    lectures: [
      {
        chapterId: "tich_phan",
        title: "Bài giảng Chương 2: Phương pháp Tích phân từng phần",
        basic: `### Lý thuyết cơ bản (Basic Integration)
Tích phân từng phần là phương pháp tính tích phân dựa trên đạo hàm của tích hai hàm số.
*   **Công thức tích phân từng phần**:
    $$\int_a^b u\ dv = \left. (u \cdot v) \right|_a^b - \int_a^b v\ du$$
    *Giải thích ký hiệu*:
    *   $u, v$: Các hàm số khả vi theo biến $x$.
    *   $du$: Vi phân của hàm $u$, tính bằng $du = u'(x)dx$.
    *   $dv$: Vi phân của hàm $v$, tính bằng $dv = v'(x)dx \implies v = \int dv$.
*   **Tại sao dùng phương pháp này**: Khi biểu thức dưới dấu tích phân là tích của hai hàm số thuộc hai loại khác nhau (ví dụ: một hàm đa thức nhân với một hàm lượng giác), ta không thể dùng phương pháp đổi biến số thông thường mà phải dùng tích phân từng phần để đưa về tích phân đơn giản hơn.`,
        advanced: `### Chuyên đề nâng cao (Advanced Integration)
*   **Quy tắc đặt ẩn ưu tiên (Priority Rule for choosing $u$)**:
    Để tích phân từng phần thành công và không bị xoay vòng luẩn quẩn, ta đặt $u$ theo thứ tự ưu tiên sau (Câu khẩu quyết: **"Nhất lô, nhì đa, tam lượng, tứ mũ"**):
    1.  **Lô**: Hàm Lôgarit ($\ln x$, $\log_a x$).
    2.  **Đa**: Hàm đa thức, lũy thừa ($x$, $x^2 + 1$,...).
    3.  **Lượng**: Hàm lượng giác ($\sin x$, $\cos x$,...).
    4.  **Mũ**: Hàm mũ ($e^x$, $2^x$,...).
    *Cách đặt*: Phần nào ưu tiên cao hơn thì đặt làm $u$. Toàn bộ phần còn lại kèm $dx$ sẽ đặt làm $dv$.
*   **Phương pháp giải khi gặp tích phân luân hồi (Tích phân xoay vòng)**:
    Khi tính tích phân có chứa cả lượng giác và mũ (ví dụ $I = \int e^x \sin x\ dx$):
    *   *Bước 1*: Thực hiện tích phân từng phần lần 1, thu được biểu thức chứa tích phân mới là $\int e^x \cos x\ dx$.
    *   *Bước 2*: Thực hiện tích phân từng phần lần 2 đối với tích phân mới này, ta sẽ thu được lại biểu thức ban đầu chứa tích phân $I$.
    *   *Bước 3*: Thiết lập phương trình ẩn $I$ dưới dạng: $I = f(x) - I \implies 2I = f(x) \implies I = \frac{1}{2} f(x)$.`,
        examples: `### Ví dụ minh họa & Giải chi tiết
*   **Bài toán**: Tính tích phân sau: $I = \int_1^e x \ln x\ dx$.
*   **Lời giải chi tiết**:
    1.  *Chọn u và dv*: Biểu thức gồm hàm đa thức $x$ và hàm lôgarit $\ln x$. Theo khẩu quyết "Nhất lô, nhì đa", ta đặt:
        $$\begin{cases} u = \ln x \\ dv = x\ dx \end{cases}$$
    2.  *Tính du và v*:
        *   Vi phân $du$: $du = (\ln x)' dx = \frac{1}{x} dx$.
        *   Nguyên hàm $v$: Chọn $v = \int x\ dx = \frac{x^2}{2}$.
    3.  *Áp dụng công thức tích phân từng phần*:
        $$I = \left. \left( \ln x \cdot \frac{x^2}{2} \right) \right|_1^e - \int_1^e \frac{x^2}{2} \cdot \frac{1}{x}\ dx$$
        $$I = \left( \frac{e^2}{2} \ln e - \frac{1^2}{2} \ln 1 \right) - \frac{1}{2} \int_1^e x\ dx$$
        Vì $\ln e = 1$ và $\ln 1 = 0$:
        $$I = \frac{e^2}{2} - \left. \frac{1}{2} \left( \frac{x^2}{2} \right) \right|_1^e = \frac{e^2}{2} - \frac{1}{4} (e^2 - 1^2)$$
        $$I = \frac{e^2}{2} - \frac{e^2}{4} + \frac{1}{4} = \frac{e^2 + 1}{4}$$
    *Đáp số*: Giá trị tích phân là $\frac{e^2 + 1}{4}$.`
      }
    ]
  },
  math_11: {
    title: "Toán học 11 - Hàm số lượng giác và Cấp số",
    author: "NXB Giáo dục Việt Nam",
    totalPages: 185,
    description: "Tập trung vào Chuyên đề lượng giác nâng cao, các phương trình lượng giác và kiến thức Cấp số cộng, Cấp số nhân lớp 11.",
    chapters: [
      { id: "luong_giac_11", title: "Chương 1: Hàm số và phương trình lượng giác", pages: "1-25", content: "Định nghĩa hàm số lượng giác sin, cos, tan, cot, các công thức lượng giác cơ bản và phương trình lượng giác." },
      { id: "cap_so_11", title: "Chương 2: Dãy số, Cấp số cộng và Cấp số nhân", pages: "40-60", content: "Định nghĩa dãy số, công sai, công bội, công thức số hạng tổng quát và tổng n số hạng đầu." }
    ],
    lectures: [
      {
        chapterId: "luong_giac_11",
        title: "Bài giảng Chương 1: Phương trình lượng giác cơ bản & nâng cao",
        basic: `### Lý thuyết cơ bản (Basic Theory)
Các phương trình lượng giác cơ bản và tập nghiệm tương ứng:
1.  **Phương trình $\\sin x = a$**:
    *   Nếu $|a| > 1$: Phương trình vô nghiệm.
    *   Nếu $|a| \\le 1$: Gọi $\\alpha$ là góc sao cho $\\sin\\alpha = a$. Nghiệm là:
        $$x = \\alpha + k2\\pi \\quad \\text{hoặc} \\quad x = \\pi - \\alpha + k2\\pi \\quad (k \\in \\mathbb{Z})$$
2.  **Phương trình $\\cos x = a$**:
    *   Nếu $|a| > 1$: Phương trình vô nghiệm.
    *   Nếu $|a| \\le 1$: Gọi $\\alpha$ là góc sao cho $\\cos\\alpha = a$. Nghiệm là:
        $$x = \\pm\\alpha + k2\\pi \\quad (k \\in \\mathbb{Z})$$
3.  **Phương trình $\\tan x = a$**: (Điều kiện: $x \\neq \\frac{\\pi}{2} + k\\pi$)
    *   Nghiệm luôn tồn tại với mọi $a$:
        $$x = \\arctan(a) + k\\pi \\quad (k \\in \\mathbb{Z})$$`,
        advanced: `### Chuyên đề nâng cao (Advanced Trigonometry)
*   **Phương trình bậc hai đối với một hàm số lượng giác**:
    Dạng phương trình $A \\cdot \\sin^2 x + B \\cdot \\sin x + C = 0$. Ta giải bằng cách đặt ẩn phụ $t = \\sin x$ (điều kiện $|t| \\le 1$) để quy về phương trình bậc hai thông thường.
*   **Phương trình cổ điển dạng $A \\cdot \\sin x + B \\cdot \\cos x = C$**:
    *   *Điều kiện có nghiệm*:
        $$A^2 + B^2 \\ge C^2$$
    *   *Phương pháp giải*: Chia cả hai vế của phương trình cho $\\sqrt{A^2 + B^2}$ để đưa về phương trình lượng giác cơ bản bằng cách áp dụng công thức cộng:
        $$\\frac{A}{\\sqrt{A^2 + B^2}} \\cdot \\sin x + \\frac{B}{\\sqrt{A^2 + B^2}} \\cdot \\cos x = \\frac{C}{\\sqrt{A^2 + B^2}}$$
        Đặt $\\cos\\alpha = \\frac{A}{\\sqrt{A^2 + B^2}}$ và $\\sin\\alpha = \\frac{B}{\\sqrt{A^2 + B^2}}$. Khi đó phương trình trở thành:
        $$\\sin(x + \\alpha) = \\frac{C}{\\sqrt{A^2 + B^2}}$$
*   **Cách giải khi thiếu hệ thức trực tiếp (Biến đổi công thức)**:
    Khi gặp phương trình chứa cả $\\sin^2 x$ và $\\cos^2 x$ mà không đưa được ngay về cùng một hàm lượng giác, hãy sử dụng hệ thức lượng giác cơ bản:
    $$\\sin^2 x + \\cos^2 x = 1 \\implies \\sin^2 x = 1 - \\cos^2 x \\quad \\text{hoặc} \\quad \\cos^2 x = 1 - \\sin^2 x$$
    để thế đại lượng này theo đại lượng kia, loại bỏ biến thừa trước khi lập phương trình bậc hai.`,
        examples: `### Ví dụ minh họa & Giải chi tiết
*   **Bài toán**: Giải phương trình lượng giác: $2\\sin^2 x + 5\\cos x - 4 = 0$.
*   **Lời giải chi tiết**:
    1.  *Phân tích phương trình*: Phương trình chứa cả $\\sin^2 x$ và $\\cos x$. Đây là dạng hỗn hợp hai hàm lượng giác khác nhau.
    2.  *Biến đổi để quy về cùng 1 biến*: Sử dụng công thức lượng giác cơ bản để khử $\\sin^2 x$ theo $\\cos x$:
        $$\\sin^2 x = 1 - \\cos^2 x$$
    3.  *Thay vào phương trình*:
        $$2(1 - \\cos^2 x) + 5\\cos x - 4 = 0$$
        $$\\implies 2 - 2\\cos^2 x + 5\\cos x - 4 = 0 \\implies -2\\cos^2 x + 5\\cos x - 2 = 0$$
    4.  *Đặt ẩn phụ*: Đặt $t = \\cos x$ (điều kiện $|t| \\le 1$). Ta có phương trình bậc hai:
        $$-2t^2 + 5t - 2 = 0 \\implies (t - 2)(-2t + 1) = 0 \\implies t = 2 \\quad \\text{hoặc} \\quad t = 0,5$$
        *   $t = 2$ (loại vì không thỏa mãn điều kiện $|t| \\le 1$).
        *   $t = 0,5$ (nhận).
    5.  *Giải nghiệm cuối*:
        $$\\cos x = 0,5 \\implies \\cos x = \\cos\\left(\\frac{\\pi}{3}\\right) \\implies x = \\pm\\frac{\\pi}{3} + k2\\pi \\quad (k \\in \\mathbb{Z})$$
    *Đáp số*: $x = \\pm\\frac{\\pi}{3} + k2\\pi \\quad (k \\in \\mathbb{Z})$`
      }
    ]
  }
};
