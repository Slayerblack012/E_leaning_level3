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
  },
  biology: {
    10: {
      title: 'Tổng ôn Sinh học 10: Cấu trúc tế bào & Chuyển hóa năng lượng',
      basic: `### Tổng quan cơ bản
*   Ôn nguyên tố hóa học, đại phân tử hữu cơ (prôtêin, axit nuclêic), ti thể, lục lạp.
*   Nắm cấu trúc tế bào nhân sơ - nhân thực và các bào quan chính.
*   Ôn các kì phân bào của nguyên phân và giảm phân.`,
      advanced: `### Nâng cao
*   Giải nhanh bài tập đếm liên kết hiđrô, số lượng nuclêôtit của phân tử ADN.
*   Tính số tế bào con tạo thành và số NST đơn môi trường cung cấp sau k lần nguyên phân.
*   Hiểu rõ hoạt động của pha sáng và pha tối quang hợp.`,
      examples: `### Ví dụ luyện nhanh
*   H = 2A + 3G là số liên kết H.
*   Tế bào 2n nguyên phân k lần tạo ra 2^k tế bào con.`
    },
    11: {
      title: 'Tổng ôn Sinh học 11: Chuyển hóa vật chất & năng lượng ở sinh vật',
      basic: `### Tổng quan cơ bản
*   Ôn cơ chế hấp thụ nước, con đường đi của nước qua rễ và vai trò đai Caspari.
*   Nắm quang hợp ở thực vật C3, C4, CAM và cơ chế đóng mở khí khổng.
*   Ôn tiêu hóa ở động vật ăn thực vật (dạ dày 4 ngăn) và hệ tuần hoàn ở các lớp động vật.`,
      advanced: `### Nâng cao
*   Phân tích cơ chế duy trì cân bằng nội môi của thận, gan trong điều hòa áp suất thẩm thấu.
*   Hiểu cơ chế truyền tin qua xináp hóa học và chu kì hoạt động của tim thú.`,
      examples: `### Ví dụ luyện nhanh
*   Nước di chuyển từ thế nước cao (trong đất) vào rễ nhờ cơ chế thẩm thấu.
*   Động lực dòng mạch gỗ chủ yếu do lực kéo thoát hơi nước ở lá.`
    },
    12: {
      title: 'Tổng ôn Sinh học 12: Di truyền học, Tiến hóa và Sinh thái học',
      basic: `### Tổng quan cơ bản
*   Ôn cơ chế phiên mã, dịch mã, đột biến gen và cấu trúc nhiễm sắc thể.
*   Nắm vững quy luật phân li độc lập, liên kết gen và hoán vị gen.
*   Ôn cân bằng di truyền quần thể, thuyết tiến hóa hiện đại và cấu trúc hệ sinh thái.`,
      advanced: `### Nâng cao
*   Luyện phương pháp giải bài tập phả hệ di truyền phức tạp.
*   Tính nhanh tỉ lệ kiểu hình trong bài toán hoán vị gen nhiều cặp alen.
*   Phân tích các nhân tố tiến hóa (chọn lọc tự nhiên, yếu tố ngẫu nhiên).`,
      examples: `### Ví dụ luyện nhanh
*   p^2 AA + 2pq Aa + q^2 aa = 1 (cân bằng Hardy-Weinberg).
*   Giao phối không ngẫu nhiên không làm thay đổi tần số alen.`
    }
  },
  history: {
    10: {
      title: 'Tổng ôn Lịch sử 10: Cách mạng công nghiệp & Văn minh cổ trung đại',
      basic: `### Tổng quan cơ bản
*   Phân biệt hiện thực lịch sử (khách quan) và nhận thức lịch sử (chủ quan).
*   Nắm đặc điểm các nền văn minh phương Đông (Ai Cập, Trung Hoa) và phương Tây (Hy Lạp, La Mã).
*   Ôn lịch sử thời kỳ Văn Lang - Âu Lạc và triều đại phong kiến Việt Nam.`,
      advanced: `### Nâng cao
*   So sánh thể chế quân chủ chuyên chế phương Đông và dân chủ chủ nô phương Tây.
*   Phân tích nguyên nhân thắng lợi và ý nghĩa lịch sử của chiến thắng Bạch Đằng năm 938.`,
      examples: `### Ví dụ luyện nhanh
*   James Watt phát minh động cơ hơi nước khơi mào CMCN lần thứ nhất.
*   Hồ Quý Ly phát hành tiền giấy đầu tiên cuối triều Trần.`
    },
    11: {
      title: 'Tổng ôn Lịch sử 11: Lịch sử cận đại & Phong trào yêu nước Việt Nam',
      basic: `### Tổng quan cơ bản
*   Ôn cách mạng tư sản Pháp, Duy tân Minh Trị ở Nhật Bản.
*   Nắm diễn biến Chiến tranh thế giới thứ nhất, thứ hai và Cách mạng tháng Mười Nga.
*   Ôn cuộc kháng chiến chống Pháp (1858-1884), phong trào Cần vương và yêu nước đầu thế kỷ XX.`,
      advanced: `### Nâng cao
*   So sánh xu hướng cứu nước của cụ Phan Bội Châu (bạo động) và cụ Phan Châu Trinh (cải cách).
*   Phân tích thời cơ vàng của Cách mạng tháng Tám năm 1945 sau khi Nhật đầu hàng.`,
      examples: `### Ví dụ luyện nhanh
*   Ngày 1/9/1858, liên quân Pháp - Tây Ban Nha nổ súng tấn công Đà Nẵng.
*   Chiếu Cần vương do vua Hàm Nghi xuống dụ kêu gọi giúp vua cứu nước.`
    },
    12: {
      title: 'Tổng ôn Lịch sử 12: Lịch sử cách mạng Việt Nam & Thế giới hiện đại',
      basic: `### Tổng quan cơ bản
*   Ôn trật tự hai cực Ianta, vai trò Liên Hợp Quốc và xu thế toàn cầu hóa.
*   Nắm mốc thành lập Đảng, thắng lợi Cách mạng tháng Tám và Kháng chiến chống Pháp (1945-1954).
*   Ôn kháng chiến chống Mĩ cứu nước (1954-1975) và đường lối Đổi mới đất nước (1986).`,
      advanced: `### Nâng cao
*   So sánh các chiến lược chiến tranh của Mĩ ở miền Nam (Đặc biệt, Cục bộ, Việt Nam hóa chiến tranh).
*   Phân tích ý nghĩa lịch sử hiệp định Paris năm 1973 và chiến dịch Hồ Chí Minh 1975.`,
      examples: `### Ví dụ luyện nhanh
*   Chiến thắng Điện Biên Phủ 1954 đập tan hoàn toàn kế hoạch Navarre.
*   Đại hội VI của Đảng (12/1986) quyết định đổi mới toàn diện đất nước.`
    }
  },
  literature: {
    10: {
      title: 'Tổng ôn Ngữ văn 10: Văn học dân gian, thơ văn trung đại & nghị luận',
      basic: `### Tổng quan cơ bản
*   Nắm đặc điểm sử thi Đăm Săn (Chiến thắng Mtao Mxây).
*   Ôn các tác phẩm trung đại tiêu biểu: Cảnh ngày hè (Nguyễn Trãi), Tỏ lòng (Phạm Ngũ Lão), Nhàn (Nguyễn Bỉnh Khiêm).
*   Hiểu giá trị nhân đạo và hiện thực của đoạn trích Trao duyên (Truyện Kiều).`,
      advanced: `### Nâng cao
*   Phân tích nghệ thuật phóng đại sử thi và ngôn ngữ ước lệ trung đại.
*   Rèn kĩ năng viết bài văn nghị luận xã hội chuẩn cấu trúc 5 bước.`,
      examples: `### Ví dụ luyện nhanh
*   Bình Ngô đại cáo của Nguyễn Trãi được xem là bản Tuyên ngôn Độc lập thứ hai.
*   'Cậy em em có chịu lời' thể hiện sự cầu khẩn chân thành của Thúy Kiều.`
    },
    11: {
      title: 'Tổng ôn Ngữ văn 11: Thơ mới lãng mạn & Văn xuôi hiện thực phê phán',
      basic: `### Tổng quan cơ bản
*   Nắm tinh thần Thơ mới qua Vội vàng (Xuân Diệu), Tràng giang (Huy Cận).
*   Ôn các tác phẩm văn xuôi hiện thực: Chí Phèo (Nam Cao), Chữ người tử tù (Nguyễn Tuân), Hai đứa trẻ (Thạch Lam).`,
      advanced: `### Nâng cao
*   Phân tích bi kịch tha hóa, bị cự tuyệt quyền làm người của nhân vật Chí Phèo.
*   Cảm nhận vẻ đẹp thiên lương khí phách của Huấn Cao và cái tôi cô độc trước vũ trụ của Huy Cận.`,
      examples: `### Ví dụ luyện nhanh
*   Bát cháo hành của Thị Nở là chi tiết nhân đạo đánh thức nhân tính bị vùi lấp của Chí Phèo.
*   Cảnh cho chữ trong Chữ người tử tù là 'một cảnh tượng xưa nay chưa từng có'.`
    },
    12: {
      title: 'Tổng ôn Ngữ văn 12: Tác phẩm trọng điểm & kỹ năng thi THPT',
      basic: `### Tổng quan cơ bản
*   Ôn các tác phẩm thơ cách mạng: Tây Tiến, Việt Bắc, Đất Nước, Sóng.
*   Nắm chắc truyện ngắn và ký trọng tâm: Vợ nhặt, Vợ chồng A Phủ, Chiếc thuyền ngoài xa, Ai đã đặt tên cho dòng sông.
*   Hệ thống cấu trúc làm bài văn nghị luận văn học và đoạn văn nghị luận xã hội 200 chữ.`,
      advanced: `### Nâng cao
*   Rèn kỹ năng viết mở bài gián tiếp cuốn hút và kết bài sâu sắc gợi mở.
*   Phân tích sức sống tiềm tàng của Mị, tình người trong nạn đói qua Vợ nhặt và nhận thức nghệ thuật cuộc đời qua Chiếc thuyền ngoài xa.`,
      examples: `### Ví dụ luyện nhanh
*   Người lính Tây Tiến mang vẻ đẹp kiêu hùng bi tráng hào hoa dưới ngòi bút Quang Dũng.
*   Nồi cháo cám đắng chát trong Vợ nhặt ngời sáng tình mẫu tử cao cả và niềm tin tương lai.`
    }
  }
};

const defaultIntroductions = {
  math: {
    10: `### 1. Giới thiệu môn học
Toán học 10 cung cấp nền tảng tư duy logic thông qua các chương về Mệnh đề, Tập hợp, Hàm số bậc nhất & bậc hai, Hình học Vector và Đại số tổ hợp sơ cấp.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Khoảng 10% tổng số câu (5 câu ở mức Nhận biết, Thông hiểu).
*   **Bảng phân bố mức độ**:
| Nội dung | Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao |
| :--- | :---: | :---: | :---: | :---: |
| Mệnh đề & Tập hợp | 1 câu | 0 | 0 | 0 |
| Hàm số & Đồ thị | 1 câu | 1 câu | 0 | 0 |
| Đại số tổ hợp | 1 câu | 1 câu | 0 | 0 |

### 3. Lộ trình học tập chi tiết
*   **Bước 1**: Nắm chắc các quy tắc đếm (Cộng, Nhân, Tổ hợp, Chỉnh hợp).
*   **Bước 2**: Luyện kĩ năng vẽ đồ thị Parabol và tìm tập nghiệm bất phương trình.`,
    11: `### 1. Giới thiệu môn học
Toán học 11 đi sâu vào các phần lượng giác, giới hạn dãy số/hàm số và phép tính đạo hàm - công cụ đắc lực giải quyết các bài toán chuyển động và tối ưu.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Khoảng 10% tổng số câu (5 câu ở mức Nhận biết, Thông hiểu).
*   **Bảng phân bố mức độ**:
| Nội dung | Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao |
| :--- | :---: | :---: | :---: | :---: |
| Lượng giác | 1 câu | 1 câu | 0 | 0 |
| Giới hạn & Đạo hàm | 1 câu | 2 câu | 0 | 0 |

### 3. Lộ trình học tập chi tiết
*   **Bước 1**: Thuộc lòng bảng công thức lượng giác cơ bản và tập nghiệm lượng giác.
*   **Bước 2**: Luyện các dạng đạo hàm hàm sơ cấp và bài tập viết phương trình tiếp tuyến.`,
    12: `### 1. Giới thiệu môn học
Toán học 12 là nội dung cốt lõi của đề thi THPT Quốc gia, bao quát Khảo sát hàm số, Nguyên hàm - Tích phân và Hình học không gian Oxyz.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Chiếm tới 80% tổng số câu (40 câu từ cơ bản đến vận dụng cao).
*   **Bảng phân bố mức độ**:
| Nội dung | Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao |
| :--- | :---: | :---: | :---: | :---: |
| Khảo sát hàm số | 4 câu | 3 câu | 2 câu | 1 câu |
| Tích phân & Nguyên hàm | 3 câu | 2 câu | 1 câu | 1 câu |
| Hình học Oxyz | 4 câu | 3 câu | 2 câu | 0 |

### 3. Lộ trình học tập chi tiết
*   **Bước 1**: Học sớm chuyên đề hàm số và tích phân trước học kì 2.
*   **Bước 2**: Luyện đề tổng hợp kết hợp ôn tập công thức Oxyz.`
  },
  physics: {
    10: `### 1. Giới thiệu môn học
Vật lý 10 nghiên cứu động học, lực, cân bằng lực và các định luật bảo toàn.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Khoảng 5% tổng số câu (2 câu Nhận biết).

### 3. Lộ trình học tập chi tiết
*   **Bước 1**: Vẽ sơ đồ lực trước khi áp dụng định luật II Newton.
*   **Bước 2**: Dùng hệ thức độc lập thời gian khi giải toán động học.`,
    11: `### 1. Giới thiệu môn học
Vật lý 11 bao gồm Điện tích, Điện trường, Dòng điện không đổi và Dao động cơ học cơ bản.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Khoảng 10% tổng số câu (4 câu).

### 3. Lộ trình học tập chi tiết
*   **Bước 1**: Nắm chắc lực tĩnh điện Coulomb và công thức tụ điện.
*   **Bước 2**: Thuộc các công thức con lắc lò xo và con lắc đơn.`,
    12: `### 1. Giới thiệu môn học
Vật lý 12 là trọng tâm thi tốt nghiệp, tập trung vào Dao động cơ học nâng cao, Sóng âm, Dòng điện xoay chiều RLC và Vật lý hạt nhân.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Chiếm 80% - 85% tổng số câu (32 - 34 câu).
*   **Bảng phân bố mức độ**:
| Nội dung | Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao |
| :--- | :---: | :---: | :---: | :---: |
| Dao động cơ | 3 câu | 2 câu | 1 câu | 1 câu |
| Sóng cơ & Sóng âm | 2 câu | 2 câu | 1 câu | 0 |
| Dòng điện xoay chiều | 3 câu | 3 câu | 2 câu | 1 câu |

### 3. Lộ trình học tập chi tiết
*   **Bước 1**: Vẽ giản đồ vector khi giải mạch xoay chiều RLC.
*   **Bước 2**: Ôn tập kĩ lý thuyết phần sóng và vật lý hạt nhân.`
  },
  chemistry: {
    10: `### 1. Giới thiệu môn học
Hóa học 10 nghiên cứu cấu tạo nguyên tử, định luật tuần hoàn, liên kết hóa học và phản ứng oxi hóa khử.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Khoảng 5% tổng số câu.

### 3. Lộ trình học tập chi tiết
*   **Bước 1**: Thuộc cách viết cấu hình electron lớp ngoài cùng.
*   **Bước 2**: Cân bằng phản ứng oxi hóa khử bằng thăng bằng electron.`,
    11: `### 1. Giới thiệu môn học
Hóa học 11 nghiên cứu Cân bằng hóa học, Sự điện li của axit/bazơ/muối, pH dung dịch và hóa học hữu cơ đại cương.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Khoảng 10% tổng số câu.

### 3. Lộ trình học tập chi tiết
*   **Bước 1**: Nắm chắc công thức tính pH = -log[H+].
*   **Bước 2**: Học kĩ phản ứng trao đổi ion trong dung dịch.`,
    12: `### 1. Giới thiệu môn học
Hóa học 12 là trọng tâm thi tốt nghiệp, gồm Este, Lipit, Cacbohiđrat, Amin, Peptit, Polime và Đại cương kim loại.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Chiếm 80% - 85% tổng số câu (32 - 34 câu).
*   **Bảng phân bố mức độ**:
| Nội dung | Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao |
| :--- | :---: | :---: | :---: | :---: |
| Este & Lipit | 2 câu | 2 câu | 1 câu | 1 câu |
| Kim loại & Đại cương | 4 câu | 3 câu | 1 câu | 0 |

### 3. Lộ trình học tập chi tiết
*   **Bước 1**: Nắm vững phản ứng thủy phân este và xà phòng hóa chất béo.
*   **Bước 2**: Tổng ôn lý thuyết tính chất hóa học của kim loại.`
  },
  english: {
    10: `### 1. Giới thiệu môn học
Tiếng Anh 10 cung cấp từ vựng về Cuộc sống gia đình, Sức khỏe, Âm nhạc và Phát minh, cùng các thì hiện tại/quá khứ cơ bản.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Khoảng 5% tổng số câu.

### 3. Lộ trình học tập chi tiết
*   **Bước 1**: Học từ vựng theo cụm từ (collocations).
*   **Bước 2**: Phân biệt thì Hiện tại đơn và Hiện tại tiếp diễn.`,
    11: `### 1. Giới thiệu môn học
Tiếng Anh 11 tập trung vào từ vựng học thuật về Môi trường, Đô thị hóa và các cấu trúc câu phức.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Khoảng 10% tổng số câu.

### 3. Lộ trình học tập chi tiết
*   **Bước 1**: Mở rộng vốn từ vựng về bảo tồn thiên nhiên.
*   **Bước 2**: Luyện đọc hiểu tìm ý chính đoạn văn.`,
    12: `### 1. Giới thiệu môn học
Tiếng Anh 12 phục vụ trực tiếp kì thi tốt nghiệp THPT Quốc gia với từ vựng SAT/IELTS nâng cao, Đọc hiểu chuyên sâu và viết câu phức.

### 2. Ma trận đề thi tốt nghiệp THPT Quốc gia (Tham khảo)
*   **Tỉ lệ câu hỏi**: Chiếm 80% - 85% tổng số câu (40 - 42 câu trong đề thi).
*   **Bảng phân bố mức độ**:
| Dạng bài | Nhận biết | Thông hiểu | Vận dụng | Vận dụng cao |
| :--- | :---: | :---: | :---: | :---: |
| Phát âm & Trọng âm | 4 câu | 0 | 0 | 0 |
| Điền từ vào đoạn | 2 câu | 2 câu | 1 câu | 0 |
| Đọc hiểu văn bản | 3 câu | 4 câu | 3 câu | 2 câu |

### 3. Lộ trình học tập chi tiết
*   **Bước 1**: Tích lũy 1000 từ vựng cốt lõi thường gặp trong đề thi thử.
*   **Bước 2**: Giải đề thi thử hàng tuần để cải thiện tốc độ và độ chính xác.`
  }
};

Object.entries(pdfContext).forEach(([subjectKey, context]) => {
  const [baseSubject, grade] = subjectKey.split('_');
  const template = enrichmentTemplates[baseSubject]?.[grade];

  if (!context) return;

  // Gán introduction nếu chưa có
  if (!context.introduction && defaultIntroductions[baseSubject]?.[grade]) {
    context.introduction = defaultIntroductions[baseSubject][grade];
  }

  if (!template || !context.chapters || !context.lectures) return;

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
