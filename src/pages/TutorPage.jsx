import React, { useState, useEffect, useRef } from 'react';
import { useGrade } from '../gradeContext';
import { askGeminiAgent, getOfflineResponse } from '../geminiAgent';
import { useNotification } from '../notificationContext';
import { logUserAction } from '../api';
import { 
  Sparkles, 
  Send, 
  ArrowRight,
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
    global: 'Chào em! Thầy/Cô thuộc Ban cố vấn học tập THPT rất vui được hỗ trợ em. Thầy/Cô có thể giúp em lên lộ trình ôn tập, tổng hợp kiến thức từ các tài liệu môn Toán, Lý, Hoá, Anh lớp ' + grade + '. Em cần hỗ trợ gì hôm nay?',
    english: "Hello! I'm Mr. Wyatt, your English teacher. Let's master Grade " + grade + " English vocabulary together. Ask me about any words, phrases, grammatical points or exercises!",
    chemistry: 'Chào em, cô là Cô Hoa dạy Hoá. Học lý thuyết hay làm bài tập Hoá học lớp ' + grade + ' có gì khó khăn, em cứ hỏi cô giải đáp chi tiết nhé!',
    physics: 'Chào em, thầy là Thầy Hải dạy Lý. Từ các công thức Động học, Lực, dao động hay điện xoay chiều lớp ' + grade + ', thầy đều sẵn sàng đồng hành cùng em!',
    math: 'Chào em, thầy là Thầy Nam dạy Toán. Học Toán lớp ' + grade + ' cần tư duy logic và nắm vững định nghĩa, công thức. Thầy trò mình cùng khám phá nhé!'
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
  }, [chats, activeTutorSubject, grade]);

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
    { id: 'english', label: 'Mr. Wyatt (Anh)' },
  ];

  // Quick suggestions based on active tutor
  const quickSuggestions = {
    global: [
      `Lên cho em lộ trình tự học môn Lý lớp ${grade} kì này.`,
      `Phương pháp phân bổ thời gian học 4 môn Toán, Lý, Hóa, Anh hiệu quả?`
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
    <div className="fade-in" style={{ height: 'calc(100vh - 6rem)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Phòng Tự Học & Hỏi Đáp AI</h1>
          <p style={{ color: 'var(--text-muted)' }}>Tương tác trực tiếp với giáo viên ảo các môn Lớp {grade} 24/7</p>
        </div>
        
        <button
          onClick={handleClearChat}
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
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => { e.target.style.background = '#ffebe6'; e.target.style.color = 'var(--color-math)' }}
          onMouseOut={(e) => { e.target.style.background = '#ffffff'; e.target.style.color = 'var(--text-muted)' }}
        >
          <RefreshCw size={12} />
          <span>Làm mới đoạn chat</span>
        </button>
      </header>

      {/* Tutor Selector Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {tutorsList.map(t => {
          const isActive = activeTutorSubject === t.id;
          const info = getTutorInfo(t.id);
          return (
            <button
              key={t.id}
              onClick={() => setActiveTutorSubject(t.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                background: isActive ? info.theme : '#ffffff',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {info.avatar} {t.label}
            </button>
          );
        })}
      </div>

      {/* Chatroom Client */}
      <div className="chat-container" style={{ flex: 1, height: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        {/* Chat Header */}
        <div className="chat-header" style={{ borderLeft: `4px solid ${activeTutor.theme}` }}>
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
          {chats[activeChatKey]?.map((msg, index) => (
            <div 
              key={index} 
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
            </div>
          ))}
          {loading && (
            <div className="message-bubble assistant" style={{ fontStyle: 'italic', color: 'var(--text-muted)', alignSelf: 'flex-start', background: '#ffffff', border: '1px solid #e1e5eb' }}>
              {activeTutor.name} đang suy nghĩ...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions footer */}
        <div style={{ padding: '0.5rem 1rem', background: '#ffffff', borderTop: '1px solid #e1e5eb', overflowX: 'auto', display: 'flex', gap: '0.5rem', whiteSpace: 'nowrap' }}>
          {quickSuggestions[activeTutorSubject]?.map((sug, i) => (
            <button
              key={i}
              onClick={() => handleQuickQuestion(sug)}
              style={{
                background: '#f1f3f5',
                border: '1px solid #e1e5eb',
                borderRadius: '15px',
                padding: '0.4rem 0.8rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => { e.target.style.background = '#e3fcef'; e.target.style.borderColor = '#00875a' }}
              onMouseOut={(e) => { e.target.style.background = '#f1f3f5'; e.target.style.borderColor = '#e1e5eb' }}
            >
              {sug}
            </button>
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
          <button type="submit" className="chat-send-btn" disabled={loading} style={{ background: activeTutor.theme }}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
