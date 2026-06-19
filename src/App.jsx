import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  GraduationCap, 
  Layers, 
  Atom, 
  Activity, 
  Binary, 
  Key, 
  Send, 
  CheckCircle, 
  ChevronRight, 
  Info, 
  Check, 
  HelpCircle,
  Settings,
  X,
  Menu
} from 'lucide-react';
import { pdfContext } from './pdfContext';
import { askGeminiAgent, getOfflineResponse } from './geminiAgent';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedGrade, setSelectedGrade] = useState('10');
  const [contentTab, setContentTab] = useState('outline'); // 'outline' or 'lecture'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLectureIdx, setSelectedLectureIdx] = useState(0);
  const [selectedQuizChapterId, setSelectedQuizChapterId] = useState('');
  
  const [apiKey, setApiKey] = useState(() => {
    return import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key') || '';
  });

  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
  };

  const closeSidebar = () => setSidebarOpen(false);

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false); // Auto-close sidebar on mobile after navigation
  };

  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Subject-specific chat histories structured by subject and grade
  const [chats, setChats] = useState({
    // Grade 10
    global_10: [
      { role: 'assistant', text: 'Chào em! Thầy/Cô thuộc Ban cố vấn học tập THPT lớp 10 rất vui được hỗ trợ em. Thầy/Cô có thể giúp em lên lộ trình ôn tập, tổng hợp kiến thức từ các tài liệu môn Toán, Lý, Hoá, Anh lớp 10. Em cần hỗ trợ gì hôm nay?' }
    ],
    english_10: [
      { role: 'assistant', text: "Hello! I'm Mr. Wyatt, your Grade 10 English teacher. Let's master Grade 10 English business vocabulary together. Ask me about any words, phrases or exercises in the book!" }
    ],
    chemistry_10: [
      { role: 'assistant', text: 'Chào em, cô là Cô Hoa dạy Hoá 10. Học lý thuyết hay làm bài tập Hoá học lớp 10 có gì khó khăn, em cứ hỏi cô giải đáp chi tiết nhé!' }
    ],
    physics_10: [
      { role: 'assistant', text: 'Chào em, thầy là Thầy Hải dạy Lý 10. Từ các công thức Động học, Lực hay các định luật bảo toàn lớp 10, thầy đều sẵn sàng đồng hành cùng em!' }
    ],
    math_10: [
      { role: 'assistant', text: 'Chào em, thầy là Thầy Nam dạy Toán 10. Học Toán lớp 10 cần tư duy logic và nắm vững định nghĩa, công thức. Thầy trò mình cùng khám phá nhé!' }
    ],
    // Grade 11
    global_11: [
      { role: 'assistant', text: 'Chào em! Thầy/Cô thuộc Ban cố vấn học tập THPT lớp 11 rất vui được hỗ trợ em. Thầy/Cô có thể giúp em tổng hợp kiến thức Toán, Lý, Hoá, Anh lớp 11 từ cơ bản đến nâng cao. Em cần hỗ trợ gì hôm nay?' }
    ],
    english_11: [
      { role: 'assistant', text: "Hello! I'm Mr. Wyatt, your Grade 11 English teacher. Let's conquer academic IELTS vocabulary, readings, and exercises for Grade 11 together!" }
    ],
    chemistry_11: [
      { role: 'assistant', text: 'Chào em, cô là Cô Hoa dạy Hoá 11. Cân bằng hoá học, sự điện li hay Hoá hữu cơ đại cương lớp 11 đều cực kì thú vị, có gì khó khăn hãy hỏi cô nhé!' }
    ],
    physics_11: [
      { role: 'assistant', text: 'Chào em, thầy là Thầy Hải dạy Lý 11. Các bài học về dao động điều hoà, sóng cơ, sóng âm và điện trường lớp 11 đang chờ chúng ta. Đặt câu hỏi cho thầy nhé!' }
    ],
    math_11: [
      { role: 'assistant', text: 'Chào em, thầy là Thầy Nam dạy Toán 11. Thầy trò mình sẽ cùng chinh phục hàm số lượng giác, giới hạn và đạo hàm lớp 11 từ cơ bản đến nâng cao nhé!' }
    ],
    // Grade 12
    global_12: [
      { role: 'assistant', text: 'Chào em! Thầy/Cô thuộc Ban cố vấn học tập THPT lớp 12 rất vui được hỗ trợ em ôn thi tốt nghiệp. Thầy/Cô có thể giúp em tổng hợp kiến thức và giải đề môn Toán, Lý, Hoá, Anh lớp 12. Em cần hỗ trợ gì hôm nay?' }
    ],
    english_12: [
      { role: 'assistant', text: "Hello! I'm Mr. Wyatt, your Grade 12 English teacher. Let's master advanced IELTS/SAT vocabulary and prepare for the national exams together!" }
    ],
    chemistry_12: [
      { role: 'assistant', text: 'Chào em, cô là Cô Hoa dạy Hoá 12. Este, Lipit, Cacbohiđrat, Amin hay Đại cương kim loại lớp 12 đều xuất hiện rất nhiều trong đề thi tốt nghiệp. Cô trò mình cùng vượt qua nhé!' }
    ],
    physics_12: [
      { role: 'assistant', text: 'Chào em, thầy là Thầy Hải dạy Lý 12. Thầy sẵn sàng hỗ trợ em các chuyên đề điện xoay chiều RLC, lượng tử, hạt nhân hay dao động cơ lớp 12 từ cơ bản đến nâng cao!' }
    ],
    math_12: [
      { role: 'assistant', text: 'Chào em, thầy là Thầy Nam dạy Toán 12. Các bài toán ứng dụng đạo hàm, tích phân, toạ độ Oxyz lớp 12 đều rất quan trọng. Thầy sẽ hướng dẫn em giải chi tiết từng bước!' }
    ]
  });

  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [correctOptionIdx, setCorrectOptionIdx] = useState(0);

  // Subject-specific sample quizzes - 100% accurate Grade 10, 11, 12 questions
  const subjectQuizzes = {
    // Grade 10
    english_10: [
      {
        q: "The contract was _________ to update the payment terms.",
        options: ["amended", "downsized", "streamlined", "promoted"],
        answer: 0,
        explain: "Amend (sửa đổi, bổ sung) thường dùng cho văn bản pháp lý, hợp đồng khi cần thay đổi điều khoản. Ở đây hợp đồng được sửa đổi (amended) để cập nhật điều khoản thanh toán."
      },
      {
        q: "A temporary job position that is currently available in a company is called a __________.",
        options: ["vacancy", "agreement", "commission", "breach"],
        answer: 0,
        explain: "Vacancy là vị trí công việc còn trống cần tuyển nhân sự mới."
      },
      {
        q: "If a business does not deliver goods as agreed, it is a _________ of contract.",
        options: ["breach", "clause", "deduction", "discount"],
        answer: 0,
        explain: "Breach of contract là vi phạm hợp đồng (không thực hiện đúng nghĩa vụ đã cam kết)."
      }
    ],
    chemistry_10: [
      {
        q: "Hạt nhân của hầu hết các nguyên tử được cấu tạo từ các loại hạt nào?",
        options: ["Proton và electron", "Proton và nơtron", "Nơtron và electron", "Proton, nơtron và electron"],
        answer: 1,
        explain: "Hạt nhân của nguyên tử được cấu tạo từ các hạt proton (mang điện tích dương) và nơtron (không mang điện), ngoại trừ đồng vị H-1 chỉ có proton."
      },
      {
        q: "Trong một chu kì, theo chiều tăng dần của điện tích hạt nhân, bán kính nguyên tử của các nguyên tố có xu hướng:",
        options: ["Tăng dần", "Giảm dần", "Không đổi", "Biến đổi không quy luật"],
        answer: 1,
        explain: "Trong một chu kỳ từ trái sang phải, điện tích hạt nhân tăng dần làm tăng lực hút tĩnh điện đối với electron lớp ngoài cùng, kéo lớp vỏ co lại dẫn đến bán kính nguyên tử giảm dần."
      },
      {
        q: "Trong phản ứng oxi hóa - khử, chất khử là chất:",
        options: ["Nhường electron, số oxi hóa tăng", "Nhận electron, số oxi hóa giảm", "Nhường electron, số oxi hóa giảm", "Nhận electron, số oxi hóa tăng"],
        answer: 0,
        explain: "Theo quy tắc 'Khử cho - O nhận': Chất khử nhường electron và có số oxi hóa tăng lên sau phản ứng."
      }
    ],
    physics_10: [
      {
        q: "Gia tốc mà một vật thu được tỉ lệ thuận với lực tác dụng và tỉ lệ nghịch với khối lượng của vật. Đây là nội dung của:",
        options: [
          "Định luật I Newton",
          "Định luật II Newton",
          "Định luật III Newton",
          "Định luật vạn vật hấp dẫn"
        ],
        answer: 1,
        explain: "Theo định luật II Newton, gia tốc của vật tỉ lệ thuận với lực tác dụng và tỉ lệ nghịch với khối lượng vật: a = F/m."
      },
      {
        q: "Công thức tính thế năng đàn hồi của một lò xo bị biến dạng độ đoạn Δl là:",
        options: [
          "W_t = m * g * z",
          "W_t = 1/2 * k * (Δl)²",
          "W_t = 1/2 * m * v²",
          "W_t = F * s * cos(α)"
        ],
        answer: 1,
        explain: "Thế năng đàn hồi được xác định bởi độ biến dạng lò xo Δl và độ cứng k: W_t = 1/2 * k * (Δl)²."
      },
      {
        q: "Định luật Bôi-lơ - Ma-ri-ốt phát biểu cho quá trình đẳng nhiệt của một lượng khí xác định là:",
        options: [
          "Áp suất tỉ lệ thuận với thể tích (P ~ V)",
          "Áp suất tỉ lệ nghịch với thể tích (P ~ 1/V)",
          "Thể tích tỉ lệ thuận với nhiệt độ tuyệt đối (V ~ T)",
          "Áp suất tỉ lệ thuận với nhiệt độ tuyệt đối (P ~ T)"
        ],
        answer: 1,
        explain: "Trong quá trình đẳng nhiệt của một lượng khí xác định, áp suất tỉ lệ nghịch với thể tích: P.V = hằng số."
      }
    ],
    math_10: [
      {
        q: "Cho tam giác ABC có các cạnh a, b, c và nửa chu vi p. Diện tích S của tam giác được tính theo công thức Heron là:",
        options: [
          "S = p*(p-a)*(p-b)*(p-c)",
          "S = 1/2 * a * h",
          "S = a * b * c / (4R)",
          "S = √[p*(p-a)*(p-b)*(p-c)]"
        ],
        answer: 3,
        explain: "Công thức Heron tính diện tích tam giác theo 3 cạnh là: S = √[p*(p-a)*(p-b)*(p-c)]."
      },
      {
        q: "Phần bù của tập hợp con B trong tập hợp A (ký hiệu C_A B) là tập hợp:",
        options: [
          "Gồm các phần tử thuộc A và thuộc B",
          "Gồm các phần tử thuộc B nhưng không thuộc A",
          "Gồm các phần tử thuộc A nhưng không thuộc B (A \\ B)",
          "Gồm các phần tử không thuộc cả A và B"
        ],
        answer: 2,
        explain: "Phần bù C_A B chính là hiệu của tập hợp A và tập hợp B (A \\ B), tức là lấy các phần tử thuộc tập hợp mẹ A nhưng không thuộc tập con B."
      },
      {
        q: "Số cách chọn ra một nhóm gồm 3 học sinh từ một tổ gồm 10 học sinh (không phân công nhiệm vụ) là:",
        options: [
          "Chỉnh hợp chập 3 của 10 (A₁₀³)",
          "Tổ hợp chập 3 của 10 (C₁₀³)",
          "Hoán vị của 3 học sinh (P₃)",
          "Tích số 10 * 9 * 8"
        ],
        answer: 1,
        explain: "Vì việc chọn ra 3 học sinh từ 10 học sinh không quan tâm tới thứ tự sắp xếp hay nhiệm vụ cụ thể của từng em, ta dùng tổ hợp: C₁₀³ cách."
      }
    ],

    // Grade 11
    english_11: [
      {
        q: "The destruction of forests, which causes damage to the ecosystem, is called _________.",
        options: ["deforestation", "conservation", "rehabilitation", "automation"],
        answer: 0,
        explain: "Deforestation là sự phá rừng, tàn phá rừng diện rộng."
      },
      {
        q: "Many products are now sold in _________ packaging to help protect the environment.",
        options: ["biodegradable", "obsolete", "sedentary", "synthetic"],
        answer: 0,
        explain: "Biodegradable là phân hủy sinh học. Sử dụng bao bì phân hủy sinh học giúp bảo vệ môi trường."
      },
      {
        q: "Governments must promote _________ development to ensure resources are left for future generations.",
        options: ["sustainable", "obsolete", "instantaneous", "temporary"],
        answer: 0,
        explain: "Sustainable development là phát triển bền vững."
      }
    ],
    chemistry_11: [
      {
        q: "pH của một dung dịch chứa nồng độ H⁺ bằng 10⁻³ M là:",
        options: ["3", "11", "7", "10"],
        answer: 0,
        explain: "Công thức: pH = -log[H⁺] = -log(10⁻³) = 3."
      },
      {
        q: "Theo thuyết Bronsted - Lowry, chất nào sau đây được định nghĩa là axit?",
        options: ["Chất nhường proton (H⁺)", "Chất nhận proton (H⁺)", "Chất nhường electron", "Chất nhận electron"],
        answer: 0,
        explain: "Theo thuyết Bronsted - Lowry, axit là chất nhường proton (H⁺), còn bazơ là chất nhận proton (H⁺)."
      },
      {
        q: "Cho phản ứng thuận nghịch ở trạng thái cân bằng: N₂(k) + 3H₂(k) ⇌ 2NH₃(k). Khi tăng áp suất của hệ phản ứng, cân bằng sẽ chuyển dịch theo chiều nào?",
        options: ["Chiều thuận", "Chiều nghịch", "Không chuyển dịch", "Không xác định được"],
        answer: 0,
        explain: "Khi tăng áp suất, cân bằng chuyển dịch theo chiều giảm áp suất (tức chiều làm giảm số phân tử khí). Ở đây, vế trái có 4 mol khí, vế phải có 2 mol khí, nên cân bằng sẽ dịch theo chiều thuận (tạo ra ít khí hơn)."
      }
    ],
    physics_11: [
      {
        q: "Một vật dao động điều hòa có phương trình li độ x = 5*cos(4π*t + π/3) cm. Biên độ dao động của vật là:",
        options: ["5 cm", "4 cm", "10 cm", "2.5 cm"],
        answer: 0,
        explain: "Trong phương trình x = A*cos(ωt + φ), hệ số A trước cos chính là biên độ. Ở đây A = 5 cm."
      },
      {
        q: "Công thức tính chu kỳ của con lắc đơn dao động điều hòa nhỏ là:",
        options: ["T = 2π * √(l / g)", "T = 2π * √(g / l)", "T = 2π * √(m / k)", "T = 2π * √(k / m)"],
        answer: 0,
        explain: "Chu kỳ con lắc đơn được tính bằng công thức T = 2π*√(l/g), phụ thuộc vào chiều dài dây treo l và gia tốc trọng trường g."
      },
      {
        q: "Lực tương tác tĩnh điện Coulomb giữa hai điện tích điểm đặt trong chân không tỷ lệ nghịch với:",
        options: ["Bình phương khoảng cách giữa hai điện tích", "Khoảng cách giữa hai điện tích", "Tích độ lớn hai điện tích", "Cường độ điện trường"],
        answer: 0,
        explain: "Theo định luật Coulomb: F = k*|q₁*q₂| / r². Do đó, lực F tỉ lệ nghịch với bình phương khoảng cách r² giữa hai điện tích."
      }
    ],
    math_11: [
      {
        q: "Tìm tập nghiệm của phương trình lượng giác cơ bản sin(x) = 0:",
        options: ["x = k*π (k ∈ ℤ)", "x = π/2 + k*π (k ∈ ℤ)", "x = k*2π (k ∈ ℤ)", "x = π + k*2π (k ∈ ℤ)"],
        answer: 0,
        explain: "sin(x) = 0 khi góc x bằng k*π với k là số nguyên."
      },
      {
        q: "Cho cấp số cộng (u_n) có số hạng đầu u₁ = 3 và công sai d = 2. Tìm số hạng u₅:",
        options: ["11", "9", "13", "15"],
        answer: 0,
        explain: "Số hạng tổng quát: u_n = u₁ + (n-1)*d. Với n = 5, u₅ = 3 + 4*2 = 11."
      },
      {
        q: "Đạo hàm của hàm số y = x² - 3x tại điểm x = 2 bằng bao nhiêu?",
        options: ["1", "4", "-1", "3"],
        answer: 0,
        explain: "Đạo hàm y' = 2x - 3. Tại x = 2, ta có y'(2) = 2*2 - 3 = 1."
      }
    ],

    // Grade 12
    english_12: [
      {
        q: "Reducing our carbon _________ is one of the most effective ways to combat global warming.",
        options: ["footprint", "fingerprint", "handprint", "blueprint"],
        answer: 0,
        explain: "Carbon footprint (dấu chân carbon) là tổng lượng khí nhà kính phát thải do hoạt động của con người."
      },
      {
        q: "The rapid growth of AI has caused significant _________ in traditional job markets.",
        options: ["disruption", "cooperation", "continuation", "validation"],
        answer: 0,
        explain: "Disruption là sự gián đoạn, thay đổi lớn đột ngột (thường do công nghệ mới thay thế công nghệ cũ)."
      },
      {
        q: "With many natural resources facing _________, companies must find alternative energy sources.",
        options: ["depletion", "rehabilitation", "preservation", "adaptation"],
        answer: 0,
        explain: "Depletion là sự cạn kiệt (tài nguyên thiên nhiên)."
      }
    ],
    chemistry_12: [
      {
        q: "Phản ứng thủy phân este trong môi trường kiềm còn được gọi là phản ứng gì?",
        options: ["Xà phòng hóa", "Este hóa", "Trùng ngưng", "Hiđrat hóa"],
        answer: 0,
        explain: "Thủy phân este trong môi trường kiềm (ví dụ tác dụng với NaOH) tạo ra muối của axit cacboxylic (xà phòng) và ancol nên gọi là phản ứng xà phòng hóa."
      },
      {
        q: "Chất béo (lipit) là trieste của chất nào sau đây với các axit béo?",
        options: ["Glixerol", "Etylen glicol", "Ancol etylic", "Metanol"],
        answer: 0,
        explain: "Định nghĩa: Chất béo là trieste của glixerol với các axit béo (axit đơn chức có mạch cacbon dài không phân nhánh)."
      },
      {
        q: "Thủy phân hoàn toàn 8.8 gam etyl axetat (CH₃COOC₂H₅, M = 88) bằng dung dịch NaOH dư thu được bao nhiêu gam muối natri axetat (CH₃COONa, M = 82)?",
        options: ["8.2 gam", "4.4 gam", "8.8 gam", "10.2 gam"],
        answer: 0,
        explain: "Số mol etyl axetat = 8.8 / 88 = 0.1 mol. Phương trình: CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH. Số mol muối CH₃COONa = 0.1 mol. Khối lượng muối = 0.1 * 82 = 8.2 gam."
      }
    ],
    physics_12: [
      {
        q: "Dung kháng của tụ điện có điện dung C trong mạch điện xoay chiều với tần số góc ω được tính bằng công thức:",
        options: ["Z_C = 1 / (ω*C)", "Z_C = ω*C", "Z_C = L*ω", "Z_C = 1 / (L*ω)"],
        answer: 0,
        explain: "Dung kháng Z_C đặc trưng cho sự cản trở dòng điện xoay chiều của tụ điện và được tính bằng: Z_C = 1/(ω*C)."
      },
      {
        q: "Trong mạch điện xoay chiều RLC nối tiếp, hiện tượng cộng hưởng điện xảy ra khi nào?",
        options: ["Z_L = Z_C", "Z_L = R", "Z_C = R", "Z_L = 2*Z_C"],
        answer: 0,
        explain: "Cộng hưởng điện xảy ra khi cảm kháng bằng dung kháng Z_L = Z_C, lúc này tổng trở Z của mạch đạt giá trị nhỏ nhất bằng R và cường độ dòng điện đạt giá trị cực đại."
      },
      {
        q: "Giới hạn quang điện của một kim loại là λ₀ = 0.3 µm. Công thoát electron của kim loại đó bằng bao nhiêu? (Lấy h = 6.625*10⁻³⁴ J.s, c = 3*10⁸ m/s).",
        options: ["6.625 * 10⁻¹⁹ J", "6.625 * 10⁻²⁰ J", "1.9875 * 10⁻¹⁹ J", "1.9875 * 10⁻²⁰ J"],
        answer: 0,
        explain: "Công thoát: A = h*c / λ₀ = (6.625*10⁻³⁴ * 3*10⁸) / (0.3*10⁻⁶) = 6.625*10⁻¹⁹ J."
      }
    ],
    math_12: [
      {
        q: "Đồ thị hàm số y = (x - 1) / (x + 2) có tiệm cận đứng là đường thẳng:",
        options: ["x = -2", "x = 1", "y = 1", "y = -2"],
        answer: 0,
        explain: "Tiệm cận đứng của đồ thị hàm số phân thức bậc nhất trên bậc nhất là nghiệm của mẫu số, tức là x + 2 = 0 <=> x = -2."
      },
      {
        q: "Tìm họ nguyên hàm của hàm số f(x) = 2x:",
        options: ["x² + C", "2 + C", "x²/2 + C", "x² - 2x + C"],
        answer: 0,
        explain: "Áp dụng công thức nguyên hàm: ∫ 2x dx = 2 * (x²/2) + C = x² + C."
      },
      {
        q: "Trong không gian Oxyz, cho mặt phẳng (P): 2x - y + 3z - 5 = 0. Một vectơ pháp tuyến của (P) là:",
        options: ["n⃗ = (2; -1; 3)", "n⃗ = (2; 1; 3)", "n⃗ = (2; -1; -5)", "n⃗ = (2; 1; -5)"],
        answer: 0,
        explain: "Vectơ pháp tuyến n⃗ của mặt phẳng ax + by + cz + d = 0 được xác định bởi các hệ số (a; b; c). Đối với mặt phẳng (P), ta có n⃗ = (2; -1; 3)."
      }
    ]
  };

  const messagesEndRef = useRef(null);

  // Shuffle options whenever the current quiz or subject or grade changes
  useEffect(() => {
    const quizzes = subjectQuizzes[`${activeTab}_${selectedGrade}`];
    if (quizzes && quizzes[currentQuizIndex]) {
      const quiz = quizzes[currentQuizIndex];
      const originalOptions = [...quiz.options];
      const correctText = originalOptions[quiz.answer];
      
      // Shuffle options using sort with random number
      const shuffled = originalOptions
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      
      const newAnswerIndex = shuffled.indexOf(correctText);
      setShuffledOptions(shuffled);
      setCorrectOptionIdx(newAnswerIndex);
      setSelectedAnswer(null);
      setQuizSubmitted(false);
    }
  }, [currentQuizIndex, selectedQuizChapterId]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, activeTab, selectedGrade]);

  // Reset quiz and lecture tabs when subject or grade changes
  useEffect(() => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setQuizScore(0);
    setContentTab('outline');
    setSelectedLectureIdx(0);
  }, [activeTab, selectedGrade]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', text: chatInput };
    const currentSubject = activeTab === 'tutor' ? `global_${selectedGrade}` : `${activeTab}_${selectedGrade}`;
    
    // Add user message to state
    setChats(prev => ({
      ...prev,
      [currentSubject]: [...(prev[currentSubject] || []), userMessage]
    }));

    const query = chatInput;
    setChatInput('');
    setLoading(true);

    // Get response from Gemini or Offline Simulator
    let responseText = "";
    if (apiKey) {
      responseText = await askGeminiAgent(
        currentSubject, 
        query, 
        apiKey, 
        chats[currentSubject]
      );
    } else {
      responseText = getOfflineResponse(
        currentSubject, 
        query
      );
    }

    const assistantMessage = { role: 'assistant', text: responseText };
    setChats(prev => ({
      ...prev,
      [currentSubject]: [...(prev[currentSubject] || []), assistantMessage]
    }));
    setLoading(false);
  };

  const handleQuizAnswer = (optionIdx) => {
    if (quizSubmitted) return;
    setSelectedAnswer(optionIdx);
  };

  const submitQuizAnswer = () => {
    if (selectedAnswer === null || quizSubmitted) return;
    
    const isCorrect = selectedAnswer === correctOptionIdx;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
    setQuizSubmitted(true);
  };

  const nextQuizQuestion = () => {
    const quizzes = subjectQuizzes[selectedQuizChapterId];
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setQuizSubmitted(false);
    } else {
      // Finished
      alert(`Em đã hoàn thành bài luyện tập chương này! Điểm số: ${quizScore + (selectedAnswer === correctOptionIdx ? 1 : 0)}/${quizzes.length}`);
      setCurrentQuizIndex(0);
      setSelectedAnswer(null);
      setQuizSubmitted(false);
      setQuizScore(0);
    }
  };

  const getTutorDetails = (subject) => {
    switch (subject) {
      case 'english': return { name: 'Mr. Rawdon Wyatt', role: 'Giáo viên Tiếng Anh', avatar: 'EN' };
      case 'chemistry': return { name: 'Cô Hoa Hóa học', role: 'Giáo viên Hoá học', avatar: 'CH' };
      case 'physics': return { name: 'Thầy Hải Vật lý', role: 'Giáo viên Vật lý', avatar: 'PH' };
      case 'math': return { name: 'Thầy Nam Toán', role: 'Giáo viên Toán học', avatar: 'MA' };
      default: return { name: 'Cố vấn học tập', role: 'Ban cố vấn học tập', avatar: 'CV' };
    }
  };

  // Parser helper to render markdown dynamically for responses and lectures
  const renderFormattedText = (text) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      let trimmed = line.trim();
      
      // Headers
      if (trimmed.startsWith('### ')) {
        return <h4 key={idx} style={{ color: '#001e62', marginTop: '1.25rem', marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: '700' }}>{trimmed.replace('### ', '')}</h4>;
      }
      
      // Bullets
      if (trimmed.startsWith('* ')) {
        return (
          <ul key={idx} style={{ paddingLeft: '1.25rem', margin: '0.35rem 0' }}>
            <li style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              {parseInlineMarkdown(trimmed.replace('* ', ''))}
            </li>
          </ul>
        );
      }
      
      // Block Math Equations
      if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
        return (
          <div key={idx} style={{ background: '#f8f9fa', borderLeft: '4px solid #0056d2', padding: '0.75rem', borderRadius: '4px', margin: '0.75rem 0', fontFamily: 'monospace', fontSize: '1rem', color: '#001e62', overflowX: 'auto', textAlign: 'center' }}>
            {trimmed.replace(/\$\$/g, '')}
          </div>
        );
      }
      
      // Blank
      if (trimmed === '') return <div key={idx} style={{ height: '0.5rem' }}></div>;
      
      return (
        <p key={idx} style={{ margin: '0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    });
  };

  const parseInlineMarkdown = (text) => {
    const parts = text.split('**');
    return parts.map((part, idx) => {
      if (idx % 2 === 1) {
        return <strong key={idx} style={{ color: '#1f1f1f', fontWeight: '700' }}>{part}</strong>;
      }
      
      // Inline Math $...$
      const mathParts = part.split('$');
      return mathParts.map((mPart, mIdx) => {
        if (mIdx % 2 === 1) {
          return <code key={mIdx} style={{ background: '#f1f3f5', padding: '2px 4px', borderRadius: '3px', color: '#a82000', fontFamily: 'monospace', fontSize: '0.85rem' }}>{mPart}</code>;
        }
        return mPart;
      });
    });
  };

  return (
    <div className="app-container">
      <style>{`
        /* TỐI ƯU HÓA GIAO DIỆN CHUYÊN NGHIỆP - ĐẲNG CẤP TRI THỨC */
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --transition-smooth: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          --transition-bounce: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          --primary-gradient: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          --glass-bg: rgba(255, 255, 255, 0.85);
          --glass-border: 1px solid rgba(255, 255, 255, 0.4);
          --shadow-elegant: 0 10px 40px -10px rgba(15, 23, 42, 0.08);
          --shadow-hover: 0 20px 40px -10px rgba(15, 23, 42, 0.15);
          --color-primary: #1e3a8a;
          --text-main: #0f172a;
          --text-secondary: #475569;
          --text-muted: #64748b;
          --surface-color: #ffffff;
          --bg-body: #f8fafc;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background-color: var(--bg-body);
          background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
          background-size: 24px 24px;
          font-family: 'Be Vietnam Pro', 'Inter', sans-serif;
          color: var(--text-main);
        }

        .fade-in {
          animation: fadeInSmooth 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeInSmooth {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* SIDEBAR - Kính mờ (Glassmorphism) */
        .sidebar {
          background: var(--glass-bg) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border-right: var(--glass-border) !important;
          box-shadow: 4px 0 24px rgba(0,0,0,0.03) !important;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .logo-container {
          padding: 2rem 1.5rem !important;
        }

        .logo-text {
          font-family: 'Inter', sans-serif !important;
          font-weight: 800 !important;
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 1.6rem !important;
          letter-spacing: -0.5px;
        }

        .menu-item {
          transition: var(--transition-smooth);
          border-radius: 12px !important;
          font-weight: 600 !important;
          color: var(--text-muted) !important;
          margin-bottom: 0.25rem !important;
        }

        .menu-item:hover {
          background: rgba(59, 130, 246, 0.08) !important;
          color: var(--color-primary) !important;
          transform: translateX(6px);
        }

        .menu-item.active {
          background: rgba(30, 58, 138, 0.08) !important;
          color: var(--color-primary) !important;
          transform: translateX(4px);
        }

        /* HEADER & TYPOGRAPHY */
        .dashboard-header h1 {
          font-weight: 800 !important;
          letter-spacing: -1px;
          color: var(--text-main) !important;
          font-size: 2rem !important;
        }
        
        .dashboard-header p {
          font-size: 1.05rem !important;
          color: var(--text-secondary) !important;
          margin-top: 0.5rem !important;
        }

        /* THẺ THỐNG KÊ (STAT CARDS) */
        .stat-card {
          background: var(--surface-color) !important;
          border: 1px solid #f1f5f9 !important;
          border-radius: 20px !important;
          box-shadow: var(--shadow-elegant) !important;
          padding: 1.5rem !important;
          transition: var(--transition-bounce) !important;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .stat-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: var(--shadow-hover) !important;
        }

        .stat-icon-wrapper {
          background: #f8fafc !important;
          border-radius: 16px !important;
          padding: 1.25rem !important;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
        }

        .stat-value {
          font-size: 1.4rem !important;
          font-weight: 800 !important;
          color: var(--text-main) !important;
        }

        /* THẺ MÔN HỌC (SUBJECT CARDS) */
        .subject-card {
          background: var(--surface-color) !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 24px !important;
          box-shadow: var(--shadow-elegant) !important;
          padding: 2rem 1.5rem !important;
          transition: var(--transition-smooth) !important;
          position: relative;
          overflow: hidden;
        }

        .subject-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--primary-gradient);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .subject-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-hover) !important;
          border-color: #cbd5e1 !important;
        }

        .subject-card:hover::before {
          opacity: 1;
        }

        .subject-badge {
          background: #f1f5f9 !important;
          color: var(--color-primary) !important;
          font-weight: 700 !important;
          border-radius: 8px !important;
          padding: 0.4rem 0.8rem !important;
          display: inline-block;
          margin-bottom: 1rem !important;
          font-size: 0.85rem !important;
        }

        .subject-title {
          font-weight: 800 !important;
          font-size: 1.3rem !important;
          margin-bottom: 0.75rem !important;
        }

        .subject-description {
          color: var(--text-secondary) !important;
          line-height: 1.6 !important;
        }

        /* CHAT BUBBLES & AI AGENT */
        .chat-container {
          background: var(--surface-color) !important;
          border-radius: 24px !important;
          box-shadow: var(--shadow-elegant) !important;
          border: 1px solid #e2e8f0 !important;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .chat-header {
          background: rgba(248, 250, 252, 0.8) !important;
          backdrop-filter: blur(8px);
          border-bottom: 1px solid #e2e8f0 !important;
          padding: 1.25rem 1.5rem !important;
        }

        .message-bubble {
          border-radius: 18px !important;
          line-height: 1.6 !important;
          padding: 1rem 1.25rem !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04) !important;
          animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          font-size: 0.95rem !important;
        }

        .message-bubble.user {
          background: var(--primary-gradient) !important;
          color: white !important;
          border-bottom-right-radius: 4px !important;
        }

        .message-bubble.assistant {
          background: #f8fafc !important;
          color: var(--text-main) !important;
          border: 1px solid #e2e8f0 !important;
          border-bottom-left-radius: 4px !important;
        }

        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .chat-input-wrapper {
          background: var(--surface-color) !important;
          border-top: 1px solid #e2e8f0 !important;
          padding: 1rem 1.5rem !important;
        }

        .chat-input {
          background: #f1f5f9 !important;
          border: 1px solid transparent !important;
          border-radius: 99px !important;
          padding: 0.85rem 1.5rem !important;
          font-size: 0.95rem !important;
          transition: var(--transition-smooth);
        }

        .chat-input:focus {
          background: var(--surface-color) !important;
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1) !important;
          outline: none;
        }

        .chat-send-btn {
          border-radius: 50% !important;
          width: 46px !important;
          height: 46px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: var(--primary-gradient) !important;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2) !important;
          color: white !important;
          border: none !important;
        }

        .chat-send-btn:hover:not(:disabled) {
          transform: scale(1.08) !important;
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3) !important;
        }

        /* TRẮC NGHIỆM (QUIZ) */
        .quiz-container {
          background: var(--surface-color) !important;
          border-radius: 24px !important;
          box-shadow: var(--shadow-elegant) !important;
          border: 1px solid #e2e8f0 !important;
          padding: 1.75rem !important;
        }

        .quiz-question {
          font-weight: 700 !important;
          font-size: 1.1rem !important;
          color: var(--text-main) !important;
          line-height: 1.6 !important;
          margin-bottom: 1.5rem !important;
        }

        .quiz-option {
          border-radius: 14px !important;
          border: 1px solid #cbd5e1 !important;
          background: #f8fafc !important;
          padding: 1rem 1.25rem !important;
          font-weight: 500 !important;
          color: var(--text-secondary) !important;
          text-align: left !important;
          transition: var(--transition-smooth) !important;
          margin-bottom: 0.75rem !important;
        }

        .quiz-option:hover:not(:disabled) {
          border-color: #3b82f6 !important;
          background: #eff6ff !important;
          color: #1e3a8a !important;
          transform: translateX(6px) !important;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08) !important;
        }

        /* KHUNG NỘI DUNG (CONTENT SECTIONS) */
        .content-section {
          background: var(--surface-color) !important;
          border-radius: 24px !important;
          box-shadow: var(--shadow-elegant) !important;
          border: 1px solid #e2e8f0 !important;
          padding: 2rem !important;
          margin-bottom: 1.5rem !important;
        }
        
        .section-title {
          font-weight: 800 !important;
          color: var(--text-main) !important;
          border-bottom: 2px solid #f1f5f9 !important;
          padding-bottom: 1rem !important;
          margin-bottom: 1.5rem !important;
        }

        .chapter-item {
          border-radius: 16px !important;
          border: 1px solid #e2e8f0 !important;
          background: #f8fafc !important;
          padding: 1.5rem !important;
          transition: var(--transition-smooth) !important;
        }
        
        .chapter-item:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 12px 24px rgba(0,0,0,0.04) !important;
          border-color: #cbd5e1 !important;
          background: var(--surface-color) !important;
        }

        /* BUTTONS GENERAL */
        button {
          transition: var(--transition-smooth) !important;
          font-family: inherit;
        }
        button:active:not(:disabled) {
          transform: scale(0.95) !important;
        }

        /* SCROLLBAR CUSTOMIZATION */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f5f9; 
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}</style>
      {/* Mobile hamburger button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(prev => !prev)}
        aria-label="Mở menu điều hướng"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile sidebar overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'overlay-open' : ''}`}
        onClick={closeSidebar}
      />

      {/* Sidebar Navigation */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <GraduationCap className="logo-icon" size={24} style={{ strokeWidth: 2.5, color: 'var(--color-primary)' }} />
          <span className="logo-text">E-Learning</span>
        </div>

        <nav style={{ flex: 1 }}>
          <div style={{ marginBottom: '1.5rem', padding: '0 0.5rem' }}>
            <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>Khối lớp học</label>
            <div style={{ display: 'flex', gap: '0.25rem', background: '#f1f3f5', padding: '0.2rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <button 
                onClick={() => handleGradeSelect('10')}
                style={{ flex: 1, padding: '0.35rem', border: 'none', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', background: selectedGrade === '10' ? '#ffffff' : 'transparent', color: selectedGrade === '10' ? 'var(--color-primary)' : 'var(--text-muted)', boxShadow: selectedGrade === '10' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none', transition: 'all 0.2s' }}
              >
                Lớp 10
              </button>
              <button 
                onClick={() => handleGradeSelect('11')}
                style={{ flex: 1, padding: '0.35rem', border: 'none', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', background: selectedGrade === '11' ? '#ffffff' : 'transparent', color: selectedGrade === '11' ? 'var(--color-primary)' : 'var(--text-muted)', boxShadow: selectedGrade === '11' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none', transition: 'all 0.2s' }}
              >
                Lớp 11
              </button>
              <button 
                onClick={() => handleGradeSelect('12')}
                style={{ flex: 1, padding: '0.35rem', border: 'none', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', background: selectedGrade === '12' ? '#ffffff' : 'transparent', color: selectedGrade === '12' ? 'var(--color-primary)' : 'var(--text-muted)', boxShadow: selectedGrade === '12' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none', transition: 'all 0.2s' }}
              >
                Lớp 12
              </button>
            </div>
          </div>
          <ul className="sidebar-menu">
            <li>
              <button 
                className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleNavigation('dashboard')}
              >
                <Layers className="menu-item-icon" />
                <span>Bảng điều khiển</span>
              </button>
            </li>
            <li style={{ margin: '1rem 0 0.5rem 0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 'bold' }}>Môn học Lớp {selectedGrade}</li>
            <li>
              <button 
                className={`menu-item ${activeTab === 'english' ? 'active' : ''}`}
                onClick={() => handleNavigation('english')}
              >
                <BookOpen className="menu-item-icon" style={{ color: 'var(--color-english)' }} />
                <span>Tiếng Anh {selectedGrade}</span>
              </button>
            </li>
            <li>
              <button 
                className={`menu-item ${activeTab === 'chemistry' ? 'active' : ''}`}
                onClick={() => handleNavigation('chemistry')}
              >
                <Atom className="menu-item-icon" style={{ color: 'var(--color-chemistry)' }} />
                <span>Hoá học {selectedGrade}</span>
              </button>
            </li>
            <li>
              <button 
                className={`menu-item ${activeTab === 'physics' ? 'active' : ''}`}
                onClick={() => handleNavigation('physics')}
              >
                <Activity className="menu-item-icon" style={{ color: 'var(--color-physics)' }} />
                <span>Vật lý {selectedGrade}</span>
              </button>
            </li>
            <li>
              <button 
                className={`menu-item ${activeTab === 'math' ? 'active' : ''}`}
                onClick={() => handleNavigation('math')}
              >
                <Binary className="menu-item-icon" style={{ color: 'var(--color-math)' }} />
                <span>Toán học {selectedGrade}</span>
              </button>
            </li>
            <li style={{ margin: '1rem 0 0.5rem 0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 'bold' }}>Tự học & Tra cứu</li>
            <li>
              <button 
                className={`menu-item ${activeTab === 'tutor' ? 'active' : ''}`}
                onClick={() => handleNavigation('tutor')}
              >
                <Sparkles className="menu-item-icon" style={{ color: '#a855f7' }} />
                <span>Phòng tự học liên môn</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer" style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <div>© 2026 E-Learning THPT</div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="main-content">
        {/* VIEW: Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="fade-in">
            <header className="dashboard-header">
              <div>
                <h1>
                  Hệ thống Học tập E-Learning THPT 
                  <span style={{ fontSize: '1rem', verticalAlign: 'middle', background: 'rgba(0, 86, 210, 0.08)', color: 'var(--color-primary)', padding: '0.25rem 0.6rem', borderRadius: '4px', marginLeft: '0.75rem', fontWeight: 'bold', border: '1px solid rgba(0, 86, 210, 0.15)' }}>Khối Lớp {selectedGrade}</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>Nền tảng tự học trực tuyến chất lượng cao dành cho học sinh trung học phổ thông</p>
              </div>
              <div className="settings-status-indicator">
                <span className="status-dot online"></span>
                <span>Hệ thống trực tuyến</span>
              </div>
            </header>

            {/* Statistics */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon-wrapper" style={{ color: 'var(--color-english)' }}>
                  <BookOpen size={24} />
                </div>
                <div>
                  <div className="stat-value">4 Lớp học</div>
                  <div className="stat-label">Toán, Lý, Hóa, Tiếng Anh</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon-wrapper" style={{ color: 'var(--color-chemistry)' }}>
                  <Atom size={24} />
                </div>
                <div>
                  <div className="stat-value">100% Học liệu</div>
                  <div className="stat-label">Chuẩn bám sát chương trình THPT</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon-wrapper" style={{ color: '#a855f7' }}>
                  <Sparkles size={24} />
                </div>
                <div>
                  <div className="stat-value">Gia sư 24/7</div>
                  <div className="stat-label">Hỗ trợ học tập tức thời</div>
                </div>
              </div>
            </div>

            {/* Subject Selector Cards */}
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.6rem', color: '#fff' }}>Chọn môn học để bắt đầu</h2>
            <div className="subject-grid">
              {/* Card 1: English */}
              <div className="subject-card english" onClick={() => setActiveTab('english')}>
                <div className="subject-badge">English</div>
                <h3 className="subject-title">Tiếng Anh {selectedGrade}</h3>
                <p className="subject-description">Tập trung rèn luyện từ vựng kinh tế, học thuật và các dạng bài tập chuẩn hóa nâng cao dành cho học sinh lớp {selectedGrade}.</p>
                <div className="subject-footer">
                  <span className="subject-info">Bài giảng & Từ vựng TOEIC/IELTS</span>
                  <button className="subject-btn">Vào Học</button>
                </div>
              </div>

              {/* Card 2: Chemistry */}
              <div className="subject-card chemistry" onClick={() => setActiveTab('chemistry')}>
                <div className="subject-badge">Chemistry</div>
                <h3 className="subject-title">Hoá học {selectedGrade}</h3>
                <p className="subject-description">Tóm tắt toàn bộ lý thuyết Hoá lớp {selectedGrade} từ các khái niệm cơ bản cho tới phản ứng và phương pháp giải bài tập nâng cao.</p>
                <div className="subject-footer">
                  <span className="subject-info">Lý thuyết & Bài tập Hoá THPT</span>
                  <button className="subject-btn">Vào Học</button>
                </div>
              </div>

              {/* Card 3: Physics */}
              <div className="subject-card physics" onClick={() => setActiveTab('physics')}>
                <div className="subject-badge">Physics</div>
                <h3 className="subject-title">Vật lý {selectedGrade}</h3>
                <p className="subject-description">Tổng hợp công thức, định luật Vật lý lớp {selectedGrade} bao gồm phần lý thuyết nền tảng đến các chuyên đề nâng cao.</p>
                <div className="subject-footer">
                  <span className="subject-info">Tóm tắt Công thức & Định luật</span>
                  <button className="subject-btn">Vào Học</button>
                </div>
              </div>

              {/* Card 4: Mathematics */}
              <div className="subject-card math" onClick={() => setActiveTab('math')}>
                <div className="subject-badge">Mathematics</div>
                <h3 className="subject-title">Toán học {selectedGrade}</h3>
                <p className="subject-description">Giáo trình môn Toán lớp {selectedGrade} bám sát chương trình phổ thông. Ôn tập lý thuyết cốt lõi và phương pháp giải toán nâng cao.</p>
                <div className="subject-footer">
                  <span className="subject-info">Toán học {selectedGrade} Kết nối tri thức</span>
                  <button className="subject-btn">Vào Học</button>
                </div>
              </div>
            </div>

            {/* Quick Start Guide */}
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.6rem', color: '#fff' }}>Hướng dẫn học tập</h2>
            <div className="start-guide-grid">
              <div className="guide-step">
                <div className="guide-step-number">01</div>
                <h4 className="guide-step-title">Chọn môn học</h4>
                <p className="guide-step-desc">Nhấp chọn bất cứ môn học nào ở trên hoặc trên menu bên trái để truy cập học liệu và gia sư tương ứng.</p>
              </div>
              <div className="guide-step">
                <div className="guide-step-number">02</div>
                <h4 className="guide-step-title">Tra cứu kiến thức</h4>
                <p className="guide-step-desc">Đọc cấu trúc chương trình, tra cứu danh mục công thức, từ vựng hoặc học các bài giảng chi tiết bám sát giáo án.</p>
              </div>
              <div className="guide-step">
                <div className="guide-step-number">03</div>
                <h4 className="guide-step-title">Hỏi đáp với Gia sư</h4>
                <p className="guide-step-desc">Tương tác trực tiếp với giáo viên ảo để hỏi đáp kiến thức, giải bài tập và nhận hướng dẫn chi tiết 24/7.</p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: Subjects */}
        {['english', 'chemistry', 'physics', 'math'].includes(activeTab) && (
          <div className="fade-in">
            <header style={{ marginBottom: '2rem' }}>
              <button 
                onClick={() => handleNavigation('dashboard')} 
                style={{ background: 'none', border: 'none', color: '#0056d2', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem' }}
              >
                ← Quay lại bảng điều khiển
              </button>
              <h1 style={{ textTransform: 'none' }}>
                {activeTab === 'english' ? `Môn Tiếng Anh ${selectedGrade}` : activeTab === 'chemistry' ? `Môn Hoá học ${selectedGrade}` : activeTab === 'physics' ? `Môn Vật lý ${selectedGrade}` : `Môn Toán học ${selectedGrade}`}
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Học liệu gốc: <strong>{pdfContext[`${activeTab}_${selectedGrade}`]?.title}</strong> (Tác giả/Nguồn: {pdfContext[`${activeTab}_${selectedGrade}`]?.author})
              </p>
            </header>

            <div className={`subject-layout ${activeTab}`}>
              {/* Column 1: Document Outline / Detailed Lecture */}
              <div>
                {/* Tab switcher for Left Column */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <button 
                    onClick={() => setContentTab('outline')}
                    style={{ padding: '0.5rem 1.25rem', border: '1px solid #ccd0d5', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', background: contentTab === 'outline' ? 'var(--color-primary)' : '#ffffff', color: contentTab === 'outline' ? '#ffffff' : 'var(--text-secondary)', transition: 'all 0.2s' }}
                  >
                    Mục lục bài học
                  </button>
                  {pdfContext[`${activeTab}_${selectedGrade}`]?.lectures?.length > 0 && (
                    <button 
                      onClick={() => setContentTab('lecture')}
                      style={{ padding: '0.5rem 1.25rem', border: '1px solid #ccd0d5', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', background: contentTab === 'lecture' ? 'var(--color-primary)' : '#ffffff', color: contentTab === 'lecture' ? '#ffffff' : 'var(--text-secondary)', transition: 'all 0.2s' }}
                    >
                      Bài giảng chi tiết
                    </button>
                  )}
                </div>

                {contentTab === 'outline' ? (
                  <>
                    <section className="content-section">
                      <h2 className="section-title">
                        <Layers size={18} />
                        <span>Cấu trúc chương trình học</span>
                      </h2>
                      <div className="chapter-list">
                        {pdfContext[`${activeTab}_${selectedGrade}`]?.chapters?.map((ch, idx) => (
                          <div key={ch.id} className="chapter-item">
                            <div className="chapter-header">
                              <span className="chapter-title">{ch.title}</span>
                              <span className="chapter-page">Trang {ch.pages}</span>
                            </div>
                            <p className="chapter-desc">{ch.content || "Chủ đề học từ vựng bài tập thực hành."}</p>
                            {ch.topics && (
                              <div className="topic-pills">
                                {ch.topics.map((t, i) => (
                                  <span key={i} className="topic-pill">{t}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Specific learning content (Formulas for Math/Physics/Chem, Vocab for English) */}
                    {activeTab === 'english' && pdfContext[`english_${selectedGrade}`]?.vocabularySample?.length > 0 && (
                      <section className="content-section">
                        <h2 className="section-title">
                          <BookOpen size={18} />
                          <span>Từ vựng trọng tâm mẫu</span>
                        </h2>
                        <div className="vocab-grid">
                          {pdfContext[`english_${selectedGrade}`]?.vocabularySample.map((v, i) => (
                            <div key={i} className="vocab-card">
                              <div className="vocab-word">{v.word}</div>
                              <div className="vocab-def">{v.definition}</div>
                              <div className="vocab-example">{v.example}</div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                    {activeTab !== 'english' && pdfContext[`${activeTab}_${selectedGrade}`]?.formulas?.length > 0 && (
                      <section className="content-section">
                        <h2 className="section-title">
                          <Binary size={18} />
                          <span>Công thức quan trọng cốt lõi</span>
                        </h2>
                        <div className="formula-grid">
                          {pdfContext[`${activeTab}_${selectedGrade}`]?.formulas?.map((f, i) => (
                            <div key={i} className="formula-card">
                              <div className="formula-header">{f.name}</div>
                              <div className="formula-text">{f.formula}</div>
                              <div className="formula-note">👉 {f.note}</div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </>
                ) : (
                  <section className="content-section">
                    <h2 className="section-title">
                      <BookOpen size={18} />
                      <span>Bài giảng điện tử</span>
                    </h2>
                    
                    {/* Chapter selector for lectures */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Chọn bài giảng:</label>
                      <select 
                        value={selectedLectureIdx} 
                        onChange={(e) => setSelectedLectureIdx(parseInt(e.target.value))}
                        style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: '1px solid #ccd0d5', fontSize: '0.9rem', outline: 'none' }}
                      >
                        {pdfContext[`${activeTab}_${selectedGrade}`]?.lectures?.map((lec, idx) => (
                          <option key={idx} value={idx}>{lec.title}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ background: '#ffffff', border: '1px solid #e1e5eb', borderRadius: 'var(--radius-md)', padding: '1.5rem', maxHeight: '550px', overflowY: 'auto' }}>
                      {renderFormattedText(pdfContext[`${activeTab}_${selectedGrade}`]?.lectures[selectedLectureIdx]?.basic)}
                      {renderFormattedText(pdfContext[`${activeTab}_${selectedGrade}`]?.lectures[selectedLectureIdx]?.advanced)}
                      {renderFormattedText(pdfContext[`${activeTab}_${selectedGrade}`]?.lectures[selectedLectureIdx]?.examples)}
                    </div>
                  </section>
                )}
              </div>

              {/* Column 2: Agent Chat & Practice Quiz */}
              <div className="sidebar-panel">
                {/* Chatbox component */}
                <div className="chat-container">
                  <div className="chat-header">
                    <div className="chat-avatar">
                      {getTutorDetails(activeTab).avatar}
                      <span className="avatar-status-dot"></span>
                    </div>
                    <div className="chat-info">
                      <span className="chat-tutor-name">{getTutorDetails(activeTab).name}</span>
                      <span className="chat-tutor-role">{getTutorDetails(activeTab).role}</span>
                    </div>
                  </div>

                  <div className="chat-messages">
                    {chats[`${activeTab}_${selectedGrade}`]?.map((msg, index) => (
                      <div key={index} className={`message-bubble ${msg.role}`}>
                        {msg.role === 'assistant' ? renderFormattedText(msg.text) : msg.text}
                      </div>
                    ))}
                    {loading && (
                      <div className="message-bubble assistant" style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                        Đang suy nghĩ...
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <form className="chat-input-wrapper" onSubmit={handleSendMessage}>
                    <input 
                      type="text" 
                      className="chat-input"
                      placeholder={`Đặt câu hỏi học tập môn ${activeTab === 'english' ? 'Anh' : activeTab === 'chemistry' ? 'Hoá' : activeTab === 'physics' ? 'Lý' : 'Toán'} lớp ${selectedGrade}...`}
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      disabled={loading}
                    />
                    <button type="submit" className="chat-send-btn" disabled={loading}>
                      <Send size={16} />
                    </button>
                  </form>
                </div>

                {/* Practice Quiz */}
                <div className="quiz-container">
                  <div className="quiz-header" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <HelpCircle size={18} style={{ color: '#0056d2' }} />
                      <span style={{ fontWeight: 'bold' }}>Luyện tập trắc nghiệm theo chương</span>
                    </div>
                    <select 
                      value={selectedQuizChapterId} 
                      onChange={(e) => {
                        setSelectedQuizChapterId(e.target.value);
                        setCurrentQuizIndex(0);
                        setSelectedAnswer(null);
                        setQuizSubmitted(false);
                        setQuizScore(0);
                      }}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccd0d5', fontSize: '0.85rem', outline: 'none' }}
                    >
                      {pdfContext[`${activeTab}_${selectedGrade}`]?.chapters?.map((ch) => (
                        <option key={ch.id} value={ch.id}>{ch.title}</option>
                      ))}
                    </select>
                  </div>
                    
                  {subjectQuizzes[selectedQuizChapterId] && subjectQuizzes[selectedQuizChapterId].length > 0 ? (
                    <>
                      <div className="quiz-question">
                        Câu {currentQuizIndex + 1}: {subjectQuizzes[selectedQuizChapterId][currentQuizIndex].q}
                      </div>

                      <div className="quiz-options">
                        {shuffledOptions.map((opt, optIdx) => {
                          let classStr = "quiz-option";
                          if (quizSubmitted) {
                            if (optIdx === correctOptionIdx) {
                              classStr += " correct";
                            } else if (optIdx === selectedAnswer) {
                              classStr += " incorrect";
                            }
                          }
                          
                          return (
                            <button 
                              key={optIdx} 
                              className={classStr}
                              onClick={() => handleQuizAnswer(optIdx)}
                              disabled={quizSubmitted}
                              style={!quizSubmitted && selectedAnswer === optIdx ? { borderColor: '#0056d2', background: 'rgba(0, 86, 210, 0.05)', color: '#0056d2' } : {}}
                            >
                              {String.fromCharCode(65 + optIdx)}. {opt}
                            </button>
                          );
                        })}
                      </div>

                      {selectedAnswer !== null && !quizSubmitted && (
                        <button 
                          onClick={submitQuizAnswer}
                          style={{ marginTop: '1rem', width: '100%', padding: '0.75rem', background: '#0056d2', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                        >
                          Nộp câu trả lời
                        </button>
                      )}

                      {quizSubmitted && (
                        <div className="quiz-feedback" style={{ marginTop: '1rem', borderLeft: `4px solid ${selectedAnswer === correctOptionIdx ? '#00875a' : '#de350b'}`, background: '#f8f9fa', padding: '0.75rem' }}>
                          <div style={{ fontWeight: 'bold', color: selectedAnswer === correctOptionIdx ? '#00875a' : '#de350b', marginBottom: '0.25rem', fontSize: '0.95rem' }}>
                            {selectedAnswer === correctOptionIdx ? '✓ Trả lời chính xác!' : '✗ Chưa chính xác!'}
                          </div>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                            <strong>Giải thích:</strong> {subjectQuizzes[selectedQuizChapterId][currentQuizIndex].explain}
                          </p>
                          <button 
                            onClick={nextQuizQuestion}
                            style={{ marginTop: '1rem', width: '100%', padding: '0.75rem', background: '#0056d2', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
                          >
                            {currentQuizIndex < subjectQuizzes[selectedQuizChapterId].length - 1 ? 'Câu tiếp theo →' : 'Luyện tập lại'}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
                      <p style={{ fontSize: '0.9rem' }}>Hiện chưa có câu hỏi trắc nghiệm cho chương này.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: Global AI Agent Workspace */}
        {activeTab === 'tutor' && (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 5rem)' }}>
            <header style={{ marginBottom: '1.5rem' }}>
              <h1>Phòng Tự Học Liên Môn</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Học hỏi xuyên môn học, giải quyết các kiến thức tổng hợp và lập kế hoạch học tập hiệu quả</p>
            </header>

            <div className="chat-container" style={{ flex: 1, height: 'auto' }}>
              <div className="chat-header">
                <div className="chat-avatar" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}>
                  🎓
                  <span className="avatar-status-dot"></span>
                </div>
                <div className="chat-info">
                  <span className="chat-tutor-name">Cố Vấn Học Tập THPT</span>
                  <span className="chat-tutor-role">Gia sư Hướng dẫn Tự học</span>
                </div>
              </div>

              <div className="chat-messages" style={{ minHeight: '300px' }}>
                {chats[`global_${selectedGrade}`]?.map((msg, index) => (
                  <div key={index} className={`message-bubble ${msg.role}`} style={msg.role === 'user' ? { background: '#0056d2' } : {}}>
                    {msg.role === 'assistant' ? renderFormattedText(msg.text) : msg.text}
                  </div>
                ))}
                {loading && (
                  <div className="message-bubble assistant" style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                    Đang suy nghĩ...
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form className="chat-input-wrapper" onSubmit={handleSendMessage}>
                <input 
                  type="text" 
                  className="chat-input"
                  placeholder={`Hỏi Gia sư liên môn bất kì kiến thức, công thức, hoặc lập lộ trình tự học lớp ${selectedGrade}...`}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  disabled={loading}
                />
                <button type="submit" className="chat-send-btn" disabled={loading} style={{ background: '#0056d2' }}>
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
