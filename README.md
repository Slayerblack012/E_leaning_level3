# 🎓 E-Learning THPT - Hệ thống Học tập Thông minh & Trợ lý Gia sư AI

Hệ thống học tập trực tuyến thông minh dành cho học sinh THPT (Lớp 10, 11, 12) tích hợp công cụ chấm điểm tự luận và giải đáp thắc mắc tự động thông qua mô hình trí tuệ nhân tạo **Gemini AI**. Dự án được tái cấu trúc theo kiến trúc **MVC (Model-View-Controller)** và thiết kế giao diện chuẩn giáo dục tối ưu trên mọi thiết bị.

---

## ✨ Tính Năng Nổi Bật

1. **📊 Phân Tích Năng Lực Học Tập & Đề Xuất Cá Nhân Hóa:**
   - Thống kê chi tiết tỷ lệ làm bài đúng/sai của từng môn học (Toán, Lý, Hóa, Anh) ở mọi cấp độ trực quan qua thanh tiến độ.
   - Đưa ra đề xuất học tập thông minh dựa trên kết quả luyện tập thực tế.

2. **📖 Học Liệu Toàn Diện & Công Thức Đầy Đủ:**
   - Cung cấp bài giảng chuẩn kiến thức cho các khối lớp 10, 11, 12.
   - Hướng dẫn giải toán thông minh khi đề bài thiếu biến hoặc thiếu dữ kiện gốc bằng các công thức phụ bổ trợ.

3. **📝 Hệ Thống Trắc Nghiệm Phân Hóa & Tự Luận Chấm Điểm AI:**
   - Bộ đề trắc nghiệm gồm 10 câu cốt lõi (từ cơ bản đến nâng cao).
   - Chế độ tự luận hỗ trợ chấm điểm tự động bằng **AI Gia sư**. Trả về điểm số chi tiết từ 1-10 kèm nhận xét lỗi sai và gợi ý lời giải mẫu.
   - Hiển thị công thức toán học/hóa học bằng định dạng trực quan **LaTeX** ($...$ và $$...$$).

4. **📱 Giao Diện Responsive & Typography Tiếng Việt Đẹp Mắt:**
   - Tối ưu hóa giao diện hiển thị mượt mà trên cả máy tính, máy tính bảng và điện thoại di động.
   - Sử dụng phông chữ đôi **Inter** (cho tiêu đề) & **Be Vietnam Pro** (cho bài đọc và nội dung) giúp chống mỏi mắt và tăng trải nghiệm đọc tiếng Việt.

---

## 🛠️ Kiến Trúc Mã Nguồn (MVC Pattern)

Mã nguồn phía Backend được tái cấu trúc sạch sẽ (Clean Code) theo mô hình **MVC**:
*   `/api/index.js`: Cầu nối Serverless chạy trên Vercel.
*   `/server/config/config.js`: Quản lý các biến môi trường, cổng kết nối (Port), JWT Secret.
*   `/server/models/db.js`: Quản lý đọc/ghi dữ liệu tạm thời vào cơ sở dữ liệu tệp tin.
*   `/server/middlewares/auth.js`: Middleware kiểm tra Token JWT để bảo mật các tuyến API.
*   `/server/controllers/`: Chứa các hàm xử lý nghiệp vụ cụ thể (Xác thực, Lấy nội dung, Chấm điểm AI, Ghi logs).
*   `/server/routes/`: Khai báo và mô-đun hóa các tuyến API cho hệ thống.

---

## 🚀 Hướng Dẫn Chạy Dưới Local (Local Setup)

### Yêu Cầu Hệ Thống
*   Đã cài đặt **Node.js** (Phiên bản v16 trở lên).
*   Đã cài đặt **npm** hoặc **yarn**.

### Các Bước Cài Đặt

1. **Tải mã nguồn về máy tính:**
   ```bash
   git clone https://github.com/Slayerblack012/E_leaning_level3.git
   cd E_leaning_level3
   ```

2. **Cài đặt thư viện phụ thuộc:**
   ```bash
   npm install
   ```

3. **Cấu hình biến môi trường:**
   Tạo tệp `.env` tại thư mục gốc và nhập các khóa cấu hình:
   ```env
   VITE_GEMINI_API_KEY=Nhập_API_Key_Gemini_Của_Bạn
   JWT_SECRET=mot_chuoi_bi_mat_bat_ky_cua_ban
   REDIS_URL=redis://localhost:6379
   ```

   Nếu chưa có Redis, hệ thống vẫn chạy với cơ chế rate limit dự phòng trong bộ nhớ. Khi deploy, nên trỏ `REDIS_URL` tới Redis dùng chung để giới hạn request hoạt động ổn định giữa nhiều instance hoặc serverless invocations.

4. **Khởi chạy hệ thống:**
   *   **Chạy Frontend (React/Vite) ở chế độ Dev:**
       ```bash
       npm run dev
       ```
       *Ứng dụng sẽ chạy ở đường dẫn: `http://localhost:3000` (hoặc `http://localhost:3001` nếu cổng 3000 bận).*
   *   **Chạy Backend (Express Server) độc lập:**
       ```bash
       npm run server
       ```
       *Backend sẽ lắng nghe tại cổng `http://localhost:4000`.*

---

## ☁️ Hướng Dẫn Triển Khai Lên Vercel (Deployment)

Dự án đã được tích hợp sẵn tệp cấu hình [vercel.json](vercel.json). Bạn chỉ cần thực hiện các bước sau để deploy:

1. Đăng nhập vào [Vercel](https://vercel.com/) và liên kết với tài khoản GitHub của bạn.
2. Chọn **Add New** -> **Project**, sau đó nhấn **Import** dự án `E_leaning_level3`.
3. Trong phần **Environment Variables** (Biến môi trường) trên Vercel, hãy điền đầy đủ hai biến sau:
   *   `VITE_GEMINI_API_KEY`: Khóa API Gemini của bạn để sử dụng tính năng AI.
   *   `JWT_SECRET`: Khóa bí mật dùng để tạo token đăng nhập cho học sinh.
4. Nhấn **Deploy** và chờ hệ thống biên dịch tự động. Đường dẫn truy cập sẽ được hiển thị ngay khi hoàn tất!

---

## 🔒 Bảo Mật & Nhật Ký Hoạt Động (Logs)

Mọi hoạt động đăng nhập, làm bài, chấm điểm của học sinh đều được ghi nhận một cách âm thầm (không hiển thị cho người học) vào tệp nhật ký trên Backend nhằm hỗ trợ giáo viên theo dõi tiến độ và đánh giá thái độ học tập của từng học sinh.
