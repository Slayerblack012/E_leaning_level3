import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGrade } from '../gradeContext';
import { askGeminiAgent, getOfflineResponse } from '../geminiAgent';
import { useNotification } from '../notificationContext';
import { logUserAction } from '../api';
import { 
  Sparkles, 
  Send, 
  RefreshCw
} from 'lucide-react';

export default function TutorPage() {
  const { grade } = useGrade();
  const { showModal } = useNotification();
  const messagesEndRef = useRef(null);

  const [activeTutorSubject, setActiveTutorSubject] = useState('global'); // 'global', 'math', 'physics', 'chemistry', 'english'
  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState({});

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key') || '';

  // Get active key (e.g. math_10)
  const activeChatKey = `${activeTutorSubject}_${grade}`;

  // Default greetings for each tutor
  const defaultGreetings = {
    global: 'Chào em! Thầy/Cô thuộc Ban cố vấn học tập THPT rất vui được hỗ trợ em. Thầy/Cô có thể giúp em lên lộ trình ôn tập, tổng hợp kiến thức từ các tài liệu lớp ' + grade + '. Em cần hỗ trợ gì hôm nay?',
    english: "Hello! I'm Mr. Wyatt, your English teacher. Let's master Grade " + grade + " English vocabulary together. Ask me about any words, phrases, grammatical points or exercises!",
    chemistry: 'Chào em, cô là Cô Hoa dạy Hoá. Học lý thuyết hay làm bài tập Hoá học lớp ' + grade + ' có gì khó khăn, em cứ hỏi cô giải đáp chi tiết nhé!',
    physics: 'Chào em, thầy là Thầy Hải dạy Lý. Từ các công thức Động học, Lực, dao động hay điện xoay chiều lớp ' + grade + ', thầy đều sẵn sàng đồng hành cùng em!',
    math: 'Chào em, thầy là Thầy Nam dạy Toán. Học Toán lớp ' + grade + ' cần tư duy logic và nắm vững định nghĩa, công thức. Thầy trò mình cùng khám phá nhé!',
    biology: 'Chào em, cô là Cô Linh dạy Sinh. Sinh học lớp ' + grade + ' có nhiều kiến thức thú vị về thế giới tế bào, di truyền học và hệ sinh thái. Cô sẽ giúp em chinh phục môn Sinh nhé!',
    history: 'Chào em, thầy là Thầy Bình dạy Sử. Lịch sử lớp ' + grade + ' giúp em hiểu sâu sắc về văn minh nhân loại và các mốc lịch sử hào hùng của dân tộc Việt Nam. Cần hỏi gì cứ nhắn thầy!',
    literature: 'Chào em, cô là Cô Mai dạy Ngữ văn. Học Văn lớp ' + grade + ' cần cảm xúc chân thành và tư duy nghị luận sắc bén. Cô sẽ đồng hành cùng em qua các tác phẩm văn học nhé!'
  };

  // Load chat history from localStorage
  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem('chats_tutors') || '{}');
    
    // Check if current key exists, if not initialize with greeting
    if (!savedChats[activeChatKey]) {
      savedChats[activeChatKey] = [
        { role: 'assistant', text: defaultGreetings[activeTutorSubject] }
      ];
      localStorage.setItem('chats_tutors', JSON.stringify(savedChats));
    }
    setChats(savedChats);
  }, [activeTutorSubject, grade]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, activeTutorSubject, grade, loading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', text: chatInput };
    const updatedChatHistory = [...(chats[activeChatKey] || []), userMessage];
    
    // Update local state and storage
    const newChatsObj = {
      ...chats,
      [activeChatKey]: updatedChatHistory
    };
    setChats(newChatsObj);
    localStorage.setItem('chats_tutors', JSON.stringify(newChatsObj));

    const query = chatInput;
    
    // Ghi log câu hỏi hỏi Gia sư AI
    logUserAction('SEND_TUTOR_MESSAGE', `Hỏi Gia sư ${activeTutor.name} (môn ${activeTutorSubject} lớp ${grade}): "${query}"`);

    setChatInput('');
    setLoading(true);

    let reply = "";
    if (apiKey) {
      // Call Gemini API
      reply = await askGeminiAgent(activeChatKey, query, apiKey, updatedChatHistory);
    } else {
      // Fallback offline simulator
      reply = getOfflineResponse(activeChatKey, query);
    }

    const assistantMessage = { role: 'assistant', text: reply };
    const finalChatHistory = [...updatedChatHistory, assistantMessage];
    
    const finalChatsObj = {
      ...chats,
      [activeChatKey]: finalChatHistory
    };
    setChats(finalChatsObj);
    localStorage.setItem('chats_tutors', JSON.stringify(finalChatsObj));
    setLoading(false);
  };

  const handleClearChat = () => {
    showModal({
      title: 'Làm mới cuộc trò chuyện?',
      content: `Bạn có chắc chắn muốn xóa toàn bộ lịch sử trò chuyện với Gia sư ${activeTutor.name} không? Thao tác này sẽ dọn sạch màn hình hội thoại.`,
      confirmText: 'Làm mới',
      cancelText: 'Hủy',
      onConfirm: async () => {
        const savedChats = JSON.parse(localStorage.getItem('chats_tutors') || '{}');
        savedChats[activeChatKey] = [
          { role: 'assistant', text: defaultGreetings[activeTutorSubject] }
        ];
        localStorage.setItem('chats_tutors', JSON.stringify(savedChats));
        setChats(savedChats);
        await logUserAction('CLEAR_TUTOR_CHAT', `Xóa lịch sử chat với Gia sư ${activeTutor.name} (môn ${activeTutorSubject} lớp ${grade})`);
      }
    });
  };

  const handleQuickQuestion = (questionText) => {
    setChatInput(questionText);
    setTimeout(() => {
      const form = document.getElementById('tutor-chat-form');
      if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 50);
  };

  const getTutorInfo = (subject) => {
    switch (subject) {
      case 'english': return { name: 'Mr. Rawdon Wyatt', role: 'Giáo viên Tiếng Anh', avatar: '🇬🇧', theme: 'var(--color-english)' };
      case 'chemistry': return { name: 'Cô Hoa Hóa học', role: 'Giáo viên Hoá học', avatar: '🧪', theme: 'var(--color-chemistry)' };
      case 'physics': return { name: 'Thầy Hải Vật lý', role: 'Giáo viên Vật lý', avatar: '⚡', theme: 'var(--color-physics)' };
      case 'math': return { name: 'Thầy Nam Toán', role: 'Giáo viên Toán học', avatar: '📐', theme: 'var(--color-math)' };
      case 'biology': return { name: 'Cô Linh Sinh học', role: 'Giáo viên Sinh học', avatar: '🧬', theme: 'var(--color-biology)' };
      case 'history': return { name: 'Thầy Bình Lịch sử', role: 'Giáo viên Lịch sử', avatar: '🏛️', theme: 'var(--color-history)' };
      case 'literature': return { name: 'Cô Mai Ngữ văn', role: 'Giáo viên Ngữ văn', avatar: '✍️', theme: 'var(--color-literature)' };
      default: return { name: 'Cố vấn học tập', role: 'Ban cố vấn học tập THPT', avatar: '🎓', theme: '#a855f7' };
    }
  };

  // Render markdown helper
  const renderFormattedText = (text) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      let trimmed = line.trim();
      
      if (trimmed.startsWith('### ')) {
        return <h4 key={idx} style={{ color: '#001e62', marginTop: '1.25rem', marginBottom: '0.5rem', fontSize: '1.05rem', fontWeight: '700' }}>{trimmed.replace('### ', '')}</h4>;
      }
      
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const clean = trimmed.replace(/^[\*\-]\s+/, '');
        return (
          <ul key={idx} style={{ paddingLeft: '1.25rem', margin: '0.3rem 0' }}>
            <li style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              {parseInlineMarkdown(clean)}
            </li>
          </ul>
        );
      }
      
      if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
        return (
          <div key={idx} style={{ 
            background: '#ffffff', 
            borderLeft: '4px solid var(--color-primary)', 
            padding: '0.6rem', 
            borderRadius: '4px', 
            margin: '0.6rem 0', 
            fontFamily: 'monospace', 
            fontSize: '0.95rem', 
            color: '#001e62', 
            overflowX: 'auto', 
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            {trimmed.replace(/\$\$/g, '')}
          </div>
        );
      }
      
      if (trimmed === '') return <div key={idx} style={{ height: '0.4rem' }}></div>;
      
      return (
        <p key={idx} style={{ margin: '0.4rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
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
      
      const mathParts = part.split('$');
      return mathParts.map((mPart, mIdx) => {
        if (mIdx % 2 === 1) {
          return <code key={mIdx} style={{ 
            background: '#eef2f6', 
            padding: '2px 4px', 
            borderRadius: '3px', 
            color: '#a82000', 
            fontFamily: 'monospace', 
            fontSize: '0.85rem' 
          }}>{mPart}</code>;
        }
        return mPart;
      });
    });
  };

  const tutorsList = [
    { id: 'global', label: 'Cố vấn học tập' },
    { id: 'math', label: 'Thầy Nam (Toán)' },
    { id: 'physics', label: 'Thầy Hải (Lý)' },
    { id: 'chemistry', label: 'Cô Hoa (Hóa)' },
    { id: 'biology', label: 'Cô Linh (Sinh)' },
    { id: 'history', label: 'Thầy Bình (Sử)' },
    { id: 'literature', label: 'Cô Mai (Văn)' },
    { id: 'english', label: 'Mr. Wyatt (Anh)' },
  ];

  // Quick suggestions based on active tutor
  const quickSuggestions = {
    global: [
      `Lên cho em lộ trình tự học môn Lý lớp ${grade} kì này.`,
      `Phương pháp phân bổ thời gian học hiệu quả?`
    ],
    math: grade === '10' ? [
      "Giải thích cách làm bài Đại số tổ hợp.",
      "Mẹo nhớ công thức Heron tính diện tích tam giác?"
    ] : grade === '11' ? [
      "Cách giải phương trình lượng giác bậc nhất đối với sin và cos.",
      "Định nghĩa đạo hàm và hệ số góc tiếp tuyến là gì?"
    ] : [
      "Làm sao để tìm tiệm cận đứng nhanh nhất?",
      "Công thức tính nguyên hàm từng phần và mẹo đặt u, dv."
    ],
    physics: grade === '10' ? [
      "Phát biểu và cho ví dụ về Định luật I Newton.",
      "Phân biệt thế năng đàn hồi và thế năng trọng trường."
    ] : grade === '11' ? [
      "Công thức tính chu kỳ con lắc lò xo và con lắc đơn.",
      "Cường độ điện trường là gì và cách tính?"
    ] : [
      "Hệ thức độc lập thời gian trong dao động và cách áp dụng.",
      "Hiện tượng cộng hưởng điện trong mạch RLC xảy ra khi nào?"
    ],
    chemistry: grade === '10' ? [
      "Làm thế nào để cân bằng phản ứng oxi hóa - khử phức tạp?",
      "Cấu tạo hạt nhân nguyên tử gồm những hạt gì?"
    ] : grade === '11' ? [
      "Nguyên lý chuyển dịch cân bằng Le Chatelier phát biểu thế nào?",
      "Cách tính nhanh pH dung dịch axit mạnh và bazơ mạnh."
    ] : [
      "Trình bày phản ứng xà phòng hóa chất béo (Triglycerit).",
      "Tính chất hóa học đặc trưng của amino axit."
    ],
    biology: grade === '10' ? [
      "Phân biệt tế bào nhân sơ và tế bào nhân thực.",
      "Vẽ sơ đồ pha sáng và pha tối quang hợp."
    ] : grade === '11' ? [
      "Cơ chế hấp thụ nước và muối khoáng ở rễ cây.",
      "Hệ dẫn truyền tim và chu kì hoạt động của tim."
    ] : [
      "Định luật Hardy-Weinberg về cân bằng di truyền.",
      "Phân tích các nhân tố tiến hóa trong tự nhiên."
    ],
    history: grade === '10' ? [
      "Thành tựu văn hóa tiêu biểu của Ai Cập cổ đại.",
      "Ý nghĩa lịch sử trận chiến Bạch Đằng năm 938."
    ] : grade === '11' ? [
      "Ý nghĩa Cách mạng tháng Mười Nga năm 1917.",
      "So sánh đường lối Phan Bội Châu và Phan Châu Trinh."
    ] : [
      "Nội dung chính sách Đổi mới đất nước năm 1986.",
      "So sánh các chiến lược chiến tranh của Mĩ ở VN."
    ],
    literature: grade === '10' ? [
      "Phân tích hào khí Đông A trong bài thơ Tỏ lòng.",
      "Ý nghĩa đoạn trích Trao duyên trong Truyện Kiều."
    ] : grade === '11' ? [
      "Quá trình thức tỉnh nhân tính của Chí Phèo.",
      "Bức tranh phố huyện nghèo trong truyện Hai đứa trẻ."
    ] : [
      "Vẻ đẹp bi tráng của người lính Tây Tiến.",
      "Giá trị nhân đạo trong truyện ngắn Vợ nhặt."
    ],
    english: grade === '10' ? [
      "Difference between 'amend', 'broaden' and 'streamline'?",
      "Give me 3 TOEIC words about computers with examples."
    ] : grade === '11' ? [
      "What is the meaning of 'biodegradable' and 'sustainable' in IELTS?",
      "Write a short paragraph using 'deforestation' and 'ecosystem'."
    ] : [
      "Explain the terms 'depletion' and 'rehabilitation' used in SAT.",
      "Difference between 'disruption' and 'obsolete'?"
    ]
  };

  const activeTutor = getTutorInfo(activeTutorSubject);

  return (
    <div style={{ height: 'calc(100vh - 6rem)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Phòng Tự Học & Hỏi Đáp AI</h1>
          <p style={{ color: 'var(--text-muted)' }}>Tương tác trực tiếp với giáo viên ảo các môn Lớp {grade} 24/7</p>
        </div>
        
        <motion.button
          onClick={handleClearChat}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.4rem 0.8rem',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            fontSize: '0.75rem',
            background: '#ffffff',
            cursor: 'pointer',
            fontWeight: 'bold',
            color: 'var(--text-muted)',
            transition: 'background-color 0.2s, color 0.2s'
          }}
          onMouseOver={(e) => { e.target.style.background = '#ffebe6'; e.target.style.color = 'var(--color-math)' }}
          onMouseOut={(e) => { e.target.style.background = '#ffffff'; e.target.style.color = 'var(--text-muted)' }}
        >
          <RefreshCw size={12} />
          <span>Làm mới đoạn chat</span>
        </motion.button>
      </header>

      {/* Tutor selector & Chat layout */}
      <div className="tutor-layout" style={{ flex: 1, minHeight: 0, marginBottom: '1rem' }}>
        {/* Left Column: Tutor Profile Cards */}
        <div className="tutor-list-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto' }}>
          {tutorsList.map(t => {
            const isActive = activeTutorSubject === t.id;
            const info = getTutorInfo(t.id);
            return (
              <motion.div 
                key={t.id}
                onClick={() => setActiveTutorSubject(t.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`tutor-profile-card ${isActive ? 'active' : ''}`}
                style={{ 
                  borderLeft: `4px solid ${info.theme}`
                }}
              >
                <div className="tutor-profile-avatar" style={{ borderLeftColor: info.theme }}>
                  {info.avatar}
                </div>
                <div className="tutor-profile-info">
                  <div className="tutor-profile-name">{info.name}</div>
                  <div className="tutor-profile-role">{t.label} Lớp {grade}</div>
                </div>
                <div style={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  background: '#10b981', 
                  boxShadow: '0 0 6px #10b981'
                }} />
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Chat Room Window */}
        <div className="chat-container os-window" style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          <div className="chat-header" style={{ borderLeft: `4px solid ${activeTutor.theme}`, background: '#f8f9fa' }}>
            <div className="chat-avatar" style={{ background: activeTutor.theme }}>
              {activeTutor.avatar}
              <span className="avatar-status-dot"></span>
            </div>
            <div className="chat-info">
              <span className="chat-tutor-name">{activeTutor.name}</span>
              <span className="chat-tutor-role">{activeTutor.role} (Khối Lớp {grade})</span>
            </div>
          </div>

          {/* Messages List */}
          <div className="chat-messages" style={{ flex: 1, background: '#fafafa', padding: '1.5rem' }}>
            <AnimatePresence initial={false}>
              {chats[activeChatKey]?.map((msg, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className={`message-bubble ${msg.role}`}
                  style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    background: msg.role === 'user' ? activeTutor.theme : '#ffffff',
                    color: msg.role === 'user' ? '#ffffff' : 'var(--text-primary)',
                    border: msg.role === 'assistant' ? '1px solid #e1e5eb' : 'none',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                  }}
                >
                  {msg.role === 'assistant' ? renderFormattedText(msg.text) : msg.text}
                </motion.div>
              ))}
              {loading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="message-bubble assistant" 
                  style={{ fontStyle: 'italic', color: 'var(--text-muted)', alignSelf: 'flex-start', background: '#ffffff', border: '1px solid #e1e5eb' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>{activeTutor.name} đang suy nghĩ</span>
                    <motion.span 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1.2, times: [0, 0.5, 1] }}
                    >...</motion.span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions footer */}
          <div style={{ padding: '0.5rem 1rem', background: '#ffffff', borderTop: '1px solid #e1e5eb', overflowX: 'auto', display: 'flex', gap: '0.5rem', whiteSpace: 'nowrap' }}>
            {quickSuggestions[activeTutorSubject]?.map((sug, i) => (
              <motion.button
                key={i}
                onClick={() => handleQuickQuestion(sug)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: '#f1f3f5',
                  border: '1px solid #e1e5eb',
                  borderRadius: '15px',
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  transition: 'background-color 0.2s, border-color 0.2s'
                }}
                onMouseOver={(e) => { e.target.style.background = '#e3fcef'; e.target.style.borderColor = '#00875a' }}
                onMouseOut={(e) => { e.target.style.background = '#f1f3f5'; e.target.style.borderColor = '#e1e5eb' }}
              >
                {sug}
              </motion.button>
            ))}
          </div>

          {/* Input area */}
          <form id="tutor-chat-form" className="chat-input-wrapper" onSubmit={handleSendMessage}>
            <input 
              type="text" 
              className="chat-input"
              placeholder={`Đặt câu hỏi học tập với ${activeTutor.name}...`}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={loading}
            />
            <motion.button 
              type="submit" 
              className="chat-send-btn" 
              disabled={loading} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ background: activeTutor.theme }}
            >
              <Send size={16} />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
