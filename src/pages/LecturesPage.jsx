import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { pdfContext } from '../pdfContext';
import { useGrade } from '../gradeContext';
import { askGeminiAgent, getOfflineResponse } from '../geminiAgent';
import { useNotification } from '../notificationContext';
import { logUserAction } from '../api';
import { pushSyncToServer } from '../syncHelper';
import { 
  BookOpen, 
  Layers, 
  Binary, 
  Sparkles, 
  CheckCircle,
  HelpCircle,
  Send,
  ArrowRight,
  GraduationCap
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
  const hasLectureContent = Boolean(
    subjectData &&
    Array.isArray(subjectData.lectures) &&
    subjectData.lectures.length > 0 &&
    Array.isArray(subjectData.chapters)
  );

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
    pushSyncToServer();
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

    reply = await askGeminiAgent(contextKey, contextualQuery, null, chatHistory);

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
      case 'english': return { name: 'Mr. Rawdon Wyatt', role: 'Giáo viên Tiếng Anh', avatar: 'EN' };
      case 'chemistry': return { name: 'Cô Hoa Hóa học', role: 'Giáo viên Hoá học', avatar: 'CH' };
      case 'physics': return { name: 'Thầy Hải Vật lý', role: 'Giáo viên Vật lý', avatar: 'PH' };
      case 'math': return { name: 'Thầy Nam Toán', role: 'Giáo viên Toán học', avatar: 'MA' };
      case 'biology': return { name: 'Cô Linh Sinh học', role: 'Giáo viên Sinh học', avatar: 'BI' };
      case 'history': return { name: 'Thầy Bình Lịch sử', role: 'Giáo viên Lịch sử', avatar: 'HI' };
      case 'literature': return { name: 'Cô Mai Ngữ văn', role: 'Giáo viên Ngữ văn', avatar: 'LI' };
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

      {!hasLectureContent ? (
        <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={48} style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }} />
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
                  Lộ trình & Giới thiệu
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
                  Lý thuyết cơ bản
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
                  Chuyên đề nâng cao
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
                  Ví dụ minh họa
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
                  Hỏi đáp bài giảng
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
                          Trợ lý đang phân tích bài học...
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
                        Tóm tắt bài học
                      </button>
                      <button 
                        onClick={() => handleQuickPrompt("Cho em thêm 2 ví dụ tự luyện tương tự có lời giải.")}
                        style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '15px', padding: '0.35rem 0.75rem', fontSize: '0.75rem', cursor: 'pointer', whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}
                      >
                        Thêm ví dụ tương tự
                      </button>
                      <button 
                        onClick={() => handleQuickPrompt("Chia sẻ cho em mẹo hoặc phương pháp giải nhanh cho chuyên đề này.")}
                        style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '15px', padding: '0.35rem 0.75rem', fontSize: '0.75rem', cursor: 'pointer', whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}
                      >
                        Mẹo học nhanh
                      </button>
                    </div>

                    {/* Input form */}
                    <form id="lecture-chat-form" onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="text" 
                        className="chat-input"
                        placeholder="Hỏi về bài học này..."
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

          {/* Column 2: Side Panel (Syllabus Outline player & quick links) */}
          <div className="sidebar-panel">
            
            {/* Syllabus player accordion */}
            <div className="content-section" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: '#001e62', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-title)', fontWeight: 'bold' }}>
                <Layers size={18} color="var(--color-primary)" />
                <span>Giáo trình học tập</span>
              </h3>
              
              <div className="syllabus-accordion">
                {subjectData.chapters.map((ch, chIdx) => {
                  const chapterLectures = subjectData.lectures.filter(l => l.chapterId === ch.id);
                  const isCurrentChapter = lecture?.chapterId === ch.id;
                  
                  return (
                    <div key={ch.id} className="syllabus-chapter">
                      <div 
                        className="syllabus-chapter-header"
                        onClick={() => {
                          // Toggle chapter dropdown
                          const list = document.getElementById(`ch-body-${ch.id}`);
                          if (list) {
                            list.style.display = list.style.display === 'none' ? 'block' : 'none';
                          }
                        }}
                      >
                        <div className="syllabus-chapter-title">
                          <span style={{ color: isCurrentChapter ? 'var(--color-primary)' : 'var(--text-secondary)' }}>
                            Chương {chIdx + 1}: {ch.title}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {chapterLectures.length} bài
                        </span>
                      </div>
                      
                      <div 
                        id={`ch-body-${ch.id}`}
                        className="syllabus-chapter-body"
                        style={{ display: isCurrentChapter ? 'block' : 'block' }} // Keep expanded for quick navigation
                      >
                        {chapterLectures.map((lec) => {
                          const originalIdx = subjectData.lectures.findIndex(l => l.chapterId === lec.chapterId);
                          const isLecActive = selectedLectureIdx === originalIdx;
                          const completedList = JSON.parse(localStorage.getItem('completed_lectures') || '[]');
                          const isLecCompleted = completedList.includes(lec.chapterId);
                          
                          return (
                            <div 
                              key={lec.chapterId}
                              className={`syllabus-lesson-item ${isLecActive ? 'active' : ''}`}
                              onClick={() => {
                                setSelectedLectureIdx(originalIdx);
                                setActiveTab('basic');
                              }}
                            >
                              <div className="syllabus-lesson-title" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <CheckCircle size={14} style={{ color: isLecCompleted ? '#00875a' : '#94a3b8', flexShrink: 0 }} />
                                <span>{lec.title}</span>
                              </div>
                              {isLecActive && (
                                <span style={{ 
                                  width: '6px', 
                                  height: '6px', 
                                  borderRadius: '50%', 
                                  background: `var(--color-${activeSubject})`,
                                  boxShadow: `0 0 6px var(--color-${activeSubject})`
                                }} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Practice shortcut */}
            <div className="content-section" style={{ background: 'var(--grad-main)', color: '#ffffff', border: 'none', position: 'relative', overflow: 'hidden' }}>
              <GraduationCap size={96} style={{ position: 'absolute', right: '-10px', bottom: '-10px', opacity: 0.08, transform: 'rotate(-15deg)', pointerEvents: 'none' }} />
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#ffffff', fontFamily: 'var(--font-title)', fontWeight: 'bold' }}>Sẵn sàng ôn luyện?</h3>
              <p style={{ fontSize: '0.8rem', opacity: 0.9, lineHeight: 1.4, marginBottom: '1.2rem' }}>
                Sau khi nắm vững lý thuyết từ giáo trình, hãy tham gia giải trắc nghiệm phân hóa hoặc làm tự luận chấm điểm tự động nhé!
              </p>
              <button 
                onClick={() => navigate(`/practice?subject=${activeSubject}`)}
                style={{ 
                  width: '100%', 
                  padding: '0.65rem', 
                  border: 'none', 
                  borderRadius: 'var(--radius-md)', 
                  background: '#ffffff', 
                  color: 'var(--color-primary)', 
                  fontWeight: 'bold', 
                  cursor: 'pointer', 
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)' }}
                onMouseOut={(e) => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)' }}
              >
                <span>Vào phòng luyện đề</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
