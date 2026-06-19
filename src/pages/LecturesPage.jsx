import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { pdfContext } from '../pdfContext';
import { useGrade } from '../gradeContext';
import { askGeminiAgent, getOfflineResponse } from '../geminiAgent';
import { useNotification } from '../notificationContext';
import { logUserAction } from '../api';
import { 
  BookOpen, 
  Layers, 
  Binary, 
  Sparkles, 
  CheckCircle,
  HelpCircle,
  Send,
  ArrowRight
} from 'lucide-react';


export default function LecturesPage() {
  const { grade } = useGrade();
  const { showToast } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);


  // Get subject from URL query param (e.g. ?subject=math), default to 'math'
  const getQuerySubject = () => {
    const params = new URLSearchParams(location.search);
    return params.get('subject') || 'math';
  };

  const [activeSubject, setActiveSubject] = useState(getQuerySubject());
  const [selectedLectureIdx, setSelectedLectureIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('basic'); // 'basic', 'advanced', 'examples', 'ai'
  
  // AI Chat states specific to the lecture
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  
  // Mark completed state
  const [isCompleted, setIsCompleted] = useState(false);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key') || '';

  // Get the context key (e.g. math_10)
  const contextKey = `${activeSubject}_${grade}`;
  const subjectData = pdfContext[contextKey];

  useEffect(() => {
    // Update active subject when URL param changes
    const subj = getQuerySubject();
    setActiveSubject(subj);
    setSelectedLectureIdx(0);
    setActiveTab('basic');
    setChatHistory([]);
  }, [location.search, grade]);

  const lecture = subjectData?.lectures?.[selectedLectureIdx];

  // Check if current lecture is completed
  useEffect(() => {
    if (lecture) {
      const completedList = JSON.parse(localStorage.getItem('completed_lectures') || '[]');
      setIsCompleted(completedList.includes(lecture.chapterId));
      
      // Seed initial greeting message when chat tab opens or lecture changes
      const tutorDetails = getTutorDetails(activeSubject);
      setChatHistory([
        { 
          role: 'assistant', 
          text: `Chào em! Thầy/Cô là **${tutorDetails.name}**. Thầy/Cô rất vui được giảng giải cho em về bài học **"${lecture.title}"**. Em chưa hiểu phần nào ở các mục Cơ bản, Nâng cao hoặc các Ví dụ? Cứ nhắn tin đặt câu hỏi nhé!` 
        }
      ]);

      // Ghi log xem bài giảng
      logUserAction('VIEW_LECTURE', `Xem bài học: "${lecture.title}" (Môn: ${activeSubject}, Lớp: ${grade})`);
    }
  }, [selectedLectureIdx, activeSubject, grade]);


  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleMarkCompleted = () => {
    if (!lecture) return;
    const completedList = JSON.parse(localStorage.getItem('completed_lectures') || '[]');
    
    if (isCompleted) {
      // Remove
      const filtered = completedList.filter(id => id !== lecture.chapterId);
      localStorage.setItem('completed_lectures', JSON.stringify(filtered));
      setIsCompleted(false);
      showToast(`Đã bỏ đánh dấu hoàn thành bài học: ${lecture.title}`, 'info');
      logUserAction('UNMARK_LECTURE_COMPLETED', `Bỏ hoàn thành bài học: "${lecture.title}" (Môn: ${activeSubject}, Lớp: ${grade})`);
    } else {
      // Add
      completedList.push(lecture.chapterId);
      localStorage.setItem('completed_lectures', JSON.stringify(completedList));
      setIsCompleted(true);
      showToast(`Chúc mừng! Bạn đã học xong bài học: ${lecture.title} 🎉`, 'success');
      logUserAction('MARK_LECTURE_COMPLETED', `Đánh dấu hoàn thành bài học: "${lecture.title}" (Môn: ${activeSubject}, Lớp: ${grade})`);
    }
    // Dispatch event to update dashboard stats
    window.dispatchEvent(new Event('completedLecturesChanged'));
  };


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !lecture) return;

    const userMsg = { role: 'user', text: chatInput };
    setChatHistory(prev => [...prev, userMsg]);
    const query = chatInput;
    setChatInput('');
    setChatLoading(true);

    // Ghi log câu hỏi hỏi Gia sư AI
    logUserAction('ASK_LECTURE_AI', `Hỏi AI bài "${lecture.title}" (Môn: ${activeSubject}, Lớp: ${grade}) - Câu hỏi: "${query}"`);

    let reply = "";

    // Inject lecture context into the AI request for targeted explanation
    const contextualQuery = `[Bối cảnh bài học: ${lecture.title}. Nội dung Cơ bản: ${lecture.basic.slice(0, 500)}. Nội dung Nâng cao: ${lecture.advanced.slice(0, 500)}]. Câu hỏi của học sinh: ${query}`;
    
    if (apiKey) {
      reply = await askGeminiAgent(contextKey, contextualQuery, apiKey, chatHistory);
    } else {
      reply = getOfflineResponse(contextKey, query);
    }

    setChatHistory(prev => [...prev, { role: 'assistant', text: reply }]);
    setChatLoading(false);
  };

  const handleQuickPrompt = async (promptText) => {
    setChatInput(promptText);
    // Submit immediately
    setTimeout(() => {
      const form = document.getElementById('lecture-chat-form');
      if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 50);
  };

  const getTutorDetails = (subj) => {
    switch (subj) {
      case 'english': return { name: 'Mr. Rawdon Wyatt', role: 'Giáo viên Tiếng Anh', avatar: '🇬🇧' };
      case 'chemistry': return { name: 'Cô Hoa Hóa học', role: 'Giáo viên Hoá học', avatar: '🧪' };
      case 'physics': return { name: 'Thầy Hải Vật lý', role: 'Giáo viên Vật lý', avatar: '⚡' };
      case 'math': return { name: 'Thầy Nam Toán', role: 'Giáo viên Toán học', avatar: '📐' };
      case 'biology': return { name: 'Cô Linh Sinh học', role: 'Giáo viên Sinh học', avatar: '🧬' };
      case 'history': return { name: 'Thầy Bình Lịch sử', role: 'Giáo viên Lịch sử', avatar: '🏛️' };
      case 'literature': return { name: 'Cô Mai Ngữ văn', role: 'Giáo viên Ngữ văn', avatar: '✍️' };
      default: return { name: 'Cố vấn học tập', role: 'Ban cố vấn học tập', avatar: '🎓' };
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
      if (trimmed.startsWith('#### ')) {
        return <h5 key={idx} style={{ color: 'var(--text-primary)', marginTop: '1rem', marginBottom: '0.35rem', fontSize: '0.95rem', fontWeight: '700' }}>{trimmed.replace('#### ', '')}</h5>;
      }
      
      // Bullets
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const cleanLine = trimmed.replace(/^[\*\-]\s+/, '');
        return (
          <ul key={idx} style={{ paddingLeft: '1.25rem', margin: '0.35rem 0' }}>
            <li style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
              {parseInlineMarkdown(cleanLine)}
            </li>
          </ul>
        );
      }

      
      // Block Math Equations
      if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
        return (
          <div key={idx} style={{ 
            background: '#f8f9fa', 
            borderLeft: '4px solid #0056d2', 
            padding: '0.75rem', 
            borderRadius: '4px', 
            margin: '0.75rem 0', 
            fontFamily: 'monospace', 
            fontSize: '1rem', 
            color: '#001e62', 
            overflowX: 'auto', 
            textAlign: 'center' 
          }}>
            {trimmed.replace(/\$\$/g, '')}
          </div>
        );
      }
      
      // Blank
      if (trimmed === '') return <div key={idx} style={{ height: '0.5rem' }}></div>;
      
      return (
        <p key={idx} style={{ margin: '0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
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
          return <code key={mIdx} style={{ 
            background: '#f1f3f5', 
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

  const subjectsList = [
    { id: 'math', label: 'Toán học', color: 'var(--color-math)' },
    { id: 'physics', label: 'Vật lý', color: 'var(--color-physics)' },
    { id: 'chemistry', label: 'Hóa học', color: 'var(--color-chemistry)' },
    { id: 'biology', label: 'Sinh học', color: 'var(--color-biology)' },
    { id: 'history', label: 'Lịch sử', color: 'var(--color-history)' },
    { id: 'literature', label: 'Ngữ văn', color: 'var(--color-literature)' },
    { id: 'english', label: 'Tiếng Anh', color: 'var(--color-english)' },
  ];

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <button 
            onClick={() => navigate('/')} 
            style={{ background: 'none', border: 'none', color: '#0056d2', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem', padding: 0 }}
          >
            ← Bảng điều khiển
          </button>
          <h1>Trung Tâm Bài Giảng Chi Tiết</h1>
          <p style={{ color: 'var(--text-muted)' }}>Khối Lớp {grade} • Học liệu chuẩn bám sát SGK và các chuyên đề ôn thi</p>
        </div>
      </header>

      {/* Subject Switcher Row */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {subjectsList.map(subj => (
          <button
            key={subj.id}
            onClick={() => {
              setActiveSubject(subj.id);
              navigate(`/lectures?subject=${subj.id}`);
            }}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              fontSize: '0.85rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              background: activeSubject === subj.id ? subj.color : '#ffffff',
              color: activeSubject === subj.id ? '#ffffff' : 'var(--text-secondary)',
              transition: 'all 0.2s',
              boxShadow: activeSubject === subj.id ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            {subj.label}
          </button>
        ))}
      </div>

      {!subjectData || !subjectData.lectures || subjectData.lectures.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
          <h3>Chưa có bài giảng cho môn học này</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Hãy chọn môn học khác hoặc đổi Khối lớp ở thanh bên trái.</p>
        </div>
      ) : (
        <div className={`subject-layout ${activeSubject}`}>
          {/* Column 1: Lecture Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 0 }}>

            
            {/* Lecture Selection Dropdown */}
            <div className="content-section" style={{ padding: '1.25rem', marginBottom: 0 }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.4rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Chọn bài giảng:</label>
                  <select 
                    value={selectedLectureIdx} 
                    onChange={(e) => setSelectedLectureIdx(parseInt(e.target.value))}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.9rem', outline: 'none', background: '#f8f9fa', fontWeight: 'bold', color: 'var(--text-primary)' }}
                  >
                    {subjectData.lectures.map((lec, idx) => (
                      <option key={idx} value={idx}>{lec.title}</option>
                    ))}
                  </select>
                </div>
                
                {/* Complete Button */}
                <button
                  onClick={handleMarkCompleted}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 1.25rem',
                    border: '1px solid',
                    borderColor: isCompleted ? '#00875a' : 'var(--color-primary)',
                    background: isCompleted ? '#e3fcef' : 'transparent',
                    color: isCompleted ? '#00875a' : 'var(--color-primary)',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    transition: 'all 0.2s',
                    marginTop: '1.2rem'
                  }}
                >
                  <CheckCircle size={16} fill={isCompleted ? '#00875a' : 'none'} color={isCompleted ? '#e3fcef' : 'currentColor'} />
                  <span>{isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}</span>
                </button>
              </div>
            </div>

            {/* Main Lecture Viewer with Tabs */}
            <div className="content-section" style={{ minHeight: '500px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              
              {/* Tabs list */}
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem', overflowX: 'auto', gap: '0.5rem' }}>
                <button
                  onClick={() => setActiveTab('intro')}
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === 'intro' ? '3px solid var(--color-primary)' : '3px solid transparent',
                    color: activeTab === 'intro' ? 'var(--color-primary)' : 'var(--text-muted)',
                    fontWeight: activeTab === 'intro' ? 'bold' : 'normal',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  🗺️ Lộ trình & Giới thiệu
                </button>
                <button
                  onClick={() => setActiveTab('basic')}
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === 'basic' ? '3px solid var(--color-primary)' : '3px solid transparent',
                    color: activeTab === 'basic' ? 'var(--color-primary)' : 'var(--text-muted)',
                    fontWeight: activeTab === 'basic' ? 'bold' : 'normal',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  💡 Lý thuyết cơ bản
                </button>
                <button
                  onClick={() => setActiveTab('advanced')}
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === 'advanced' ? '3px solid var(--color-primary)' : '3px solid transparent',
                    color: activeTab === 'advanced' ? 'var(--color-primary)' : 'var(--text-muted)',
                    fontWeight: activeTab === 'advanced' ? 'bold' : 'normal',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  🔥 Chuyên đề nâng cao
                </button>
                <button
                  onClick={() => setActiveTab('examples')}
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === 'examples' ? '3px solid var(--color-primary)' : '3px solid transparent',
                    color: activeTab === 'examples' ? 'var(--color-primary)' : 'var(--text-muted)',
                    fontWeight: activeTab === 'examples' ? 'bold' : 'normal',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  📝 Ví dụ minh họa
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === 'ai' ? '3px solid var(--color-primary)' : '3px solid transparent',
                    color: activeTab === 'ai' ? 'var(--color-primary)' : 'var(--text-muted)',
                    fontWeight: activeTab === 'ai' ? 'bold' : 'normal',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  💬 Hỏi đáp AI Gia Sư
                </button>
              </div>

              {/* Tab Content Rendering */}
              <div style={{ flex: 1 }}>
                {activeTab === 'intro' && (
                  <div className="fade-in">
                    {subjectData?.introduction ? (
                      renderFormattedText(subjectData.introduction)
                    ) : (
                      <p style={{ color: 'var(--text-muted)' }}>Chưa có thông tin lộ trình và giới thiệu cho môn học này.</p>
                    )}
                  </div>
                )}

                {activeTab === 'basic' && (
                  <div className="fade-in">
                    {renderFormattedText(lecture?.basic)}
                  </div>
                )}

                {activeTab === 'advanced' && (
                  <div className="fade-in">
                    {renderFormattedText(lecture?.advanced)}
                  </div>
                )}

                {activeTab === 'examples' && (
                  <div className="fade-in">
                    {renderFormattedText(lecture?.examples)}
                  </div>
                )}

                {activeTab === 'ai' && (
                  <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '480px' }}>
                    {/* Chat Area inside Tab */}
                    <div style={{ 
                      flex: 1, 
                      overflowY: 'auto', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: 'var(--radius-md)', 
                      padding: '1rem', 
                      background: '#fafafa',
                      marginBottom: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem'
                    }}>
                      {chatHistory.map((msg, index) => (
                        <div 
                          key={index} 
                          className={`message-bubble ${msg.role}`}
                          style={{
                            maxWidth: '85%',
                            padding: '0.65rem 0.85rem',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.85rem',
                            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                            background: msg.role === 'user' ? 'var(--color-primary)' : '#f1f3f5',
                            color: msg.role === 'user' ? '#ffffff' : 'var(--text-primary)',
                            border: msg.role === 'assistant' ? '1px solid #e1e5eb' : 'none'
                          }}
                        >
                          {msg.role === 'assistant' ? renderFormattedText(msg.text) : msg.text}
                        </div>
                      ))}
                      {chatLoading && (
                        <div className="message-bubble assistant" style={{ fontStyle: 'italic', color: 'var(--text-muted)', alignSelf: 'flex-start', background: '#f1f3f5', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)' }}>
                          AI Gia sư đang phân tích bài học...
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Quick suggestions */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                      <button 
                        onClick={() => handleQuickPrompt("Hãy tóm tắt ngắn gọn các ý chính của bài giảng này.")}
                        style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '15px', padding: '0.35rem 0.75rem', fontSize: '0.75rem', cursor: 'pointer', whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}
                      >
                        📝 Tóm tắt bài học
                      </button>
                      <button 
                        onClick={() => handleQuickPrompt("Cho em thêm 2 ví dụ tự luyện tương tự có lời giải.")}
                        style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '15px', padding: '0.35rem 0.75rem', fontSize: '0.75rem', cursor: 'pointer', whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}
                      >
                        🔍 Thêm ví dụ tương tự
                      </button>
                      <button 
                        onClick={() => handleQuickPrompt("Chia sẻ cho em mẹo hoặc phương pháp giải nhanh cho chuyên đề này.")}
                        style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '15px', padding: '0.35rem 0.75rem', fontSize: '0.75rem', cursor: 'pointer', whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}
                      >
                        ⚡ Mẹo học nhanh
                      </button>
                    </div>

                    {/* Input form */}
                    <form id="lecture-chat-form" onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="text" 
                        className="chat-input"
                        placeholder="Hỏi Gia sư AI về bài học này..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        disabled={chatLoading}
                        style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                      />
                      <button type="submit" className="chat-send-btn" disabled={chatLoading} style={{ padding: '0 0.85rem' }}>
                        <Send size={14} />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Side Panel (Syllabus outline & quick links) */}
          <div className="sidebar-panel">
            
            {/* Syllabus outline */}
            <div className="content-section" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#001e62', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Layers size={18} />
                <span>Cấu trúc môn học</span>
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {subjectData.chapters.map((ch, idx) => {
                  const isLecActive = subjectData.lectures[selectedLectureIdx]?.chapterId === ch.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        // Find lecture index matching this chapter
                        const foundIdx = subjectData.lectures.findIndex(l => l.chapterId === ch.id);
                        if (foundIdx !== -1) {
                          setSelectedLectureIdx(foundIdx);
                          setActiveTab('basic');
                        }
                      }}
                      style={{
                        textAlign: 'left',
                        padding: '0.75rem',
                        border: '1px solid',
                        borderColor: isLecActive ? 'var(--color-primary)' : 'var(--border-color)',
                        background: isLecActive ? 'rgba(0, 86, 210, 0.04)' : '#ffffff',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: isLecActive ? 'var(--color-primary)' : 'var(--text-primary)' }}>
                          {ch.title}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Trang {ch.pages}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', maxWidth: '100%' }}>

                        {ch.content || 'Đầy đủ lý thuyết & bài tập chi tiết.'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Practice shortcut */}
            <div className="content-section" style={{ background: 'var(--grad-main)', color: '#ffffff', border: 'none' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#ffffff' }}>Sẵn sàng luyện tập?</h3>
              <p style={{ fontSize: '0.8rem', opacity: 0.9, lineHeight: 1.4, marginBottom: '1.2rem' }}>
                Sau khi nắm vững kiến thức ở các tab Cơ bản và Nâng cao, hãy thử sức với bộ bài tập phân loại mức độ để kiểm tra kiến thức của mình!
              </p>
              <button 
                onClick={() => navigate(`/practice?subject=${activeSubject}`)}
                style={{ 
                  width: '100%', 
                  padding: '0.65rem', 
                  border: 'none', 
                  borderRadius: 'var(--radius-sm)', 
                  background: '#ffffff', 
                  color: 'var(--color-primary)', 
                  fontWeight: 'bold', 
                  cursor: 'pointer', 
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => { e.target.style.transform = 'translateX(2px)' }}
                onMouseOut={(e) => { e.target.style.transform = 'none' }}
              >
                <span>Vào phòng luyện tập</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
