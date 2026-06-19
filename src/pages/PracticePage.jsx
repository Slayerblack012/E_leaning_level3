import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api, { logUserAction } from '../api';
import { useGrade } from '../gradeContext';
import { askGeminiAgent } from '../geminiAgent';
import { useNotification } from '../notificationContext';
import { 
  GraduationCap, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ChevronRight, 
  RotateCcw,
  ArrowLeft,
  Trophy,
  FileText,
  Edit3,
  Lightbulb,
  Camera,
  Bot
} from 'lucide-react';

// Parser helper to render inline/block math equations and markdown beautifully
const parseInlineMarkdown = (text) => {
  if (!text) return '';
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
          padding: '2px 6px', 
          borderRadius: '4px', 
          color: '#a82000', 
          fontFamily: 'monospace', 
          fontSize: '0.9rem',
          fontWeight: '600'
        }}>{mPart}</code>;
      }
      return mPart;
    });
  });
};

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
        <ul key={idx} style={{ paddingLeft: '1.25rem', margin: '0.4rem 0' }}>
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
          padding: '0.85rem 1.25rem', 
          borderRadius: '6px', 
          margin: '0.85rem 0', 
          fontFamily: 'monospace', 
          fontSize: '1.05rem', 
          color: '#001e62', 
          overflowX: 'auto', 
          textAlign: 'center',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)'
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

export default function PracticePage() {
  const { grade } = useGrade();
  const { showToast, showModal } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();

  // Get subject from URL query param (e.g. ?subject=math), default to 'math'
  const getQuerySubject = () => {
    const params = new URLSearchParams(location.search);
    return params.get('subject') || 'math';
  };

  const [activeSubject, setActiveSubject] = useState(getQuerySubject());
  const [activeLevel, setActiveLevel] = useState('easy'); // 'easy', 'medium', 'hard'
  const [practiceMode, setPracticeMode] = useState('quiz'); // 'quiz' or 'essay'
  
  // Quiz states
  const [quizzes, setQuizzes] = useState([]);
  const [quizLoading, setQuizLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [correctOptionIdx, setCorrectOptionIdx] = useState(0);
  const [aiHint, setAiHint] = useState('');
  const [hintLoading, setHintLoading] = useState(false);

  // Essay states
  const [essays, setEssays] = useState([]);
  const [essayLoading, setEssayLoading] = useState(false);
  const [currentEssayIdx, setCurrentEssayIdx] = useState(0);
  const [essayAnswer, setEssayAnswer] = useState('');
  const [essayResult, setEssayResult] = useState(null); // { score, feedback, isOffline }
  const [gradingLoading, setGradingLoading] = useState(false);
  const [essayImage, setEssayImage] = useState(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key') || '';

  // Handle Location changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const subj = params.get('subject') || 'math';
    setActiveSubject(subj);
    
    // Reset status on subject change
    setCurrentIdx(0);
    setSelectedAns(null);
    setIsSubmitted(false);
    setScore(0);
    setAiHint('');

    // Reset essay status
    setCurrentEssayIdx(0);
    setEssayAnswer('');
    setEssayResult(null);

    logUserAction('SELECT_PRACTICE', `Chọn luyện tập môn: ${subj}, Khối lớp: ${grade}, Chế độ: ${practiceMode}`);
  }, [location.search, grade, practiceMode]);

  // Load quizzes from API (limited to exactly 10 questions)
  useEffect(() => {
    let mounted = true;
    setQuizLoading(true);
    const contextId = `${activeSubject}_${grade}`;
    api.get(`/api/quizzes/${contextId}`)
      .then(res => {
        if (!mounted) return;
        // Limit quizzes to exactly 10 questions for trắc nghiệm
        const allQuizzes = res.data.quizzes || [];
        setQuizzes(allQuizzes.slice(0, 10));
        setQuizLoading(false);
      })
      .catch(() => {
        if (mounted) {
          setQuizzes([]);
          setQuizLoading(false);
        }
      });
    return () => { mounted = false };
  }, [activeSubject, grade]);

  // Load essays from API when essay tab is active
  useEffect(() => {
    if (practiceMode === 'essay') {
      setEssayLoading(true);
      setEssayResult(null);
      setEssayAnswer('');
      setCurrentEssayIdx(0);
      const contextId = `${activeSubject}_${grade}`;
      api.get(`/api/essays/${contextId}`)
        .then(res => {
          setEssays(res.data.essays || []);
          setEssayLoading(false);
        })
        .catch(() => {
          setEssays([]);
          setEssayLoading(false);
        });
    }
  }, [activeSubject, grade, practiceMode]);

  // Filter quizzes and essays by difficulty level
  const filteredQuizzes = quizzes.filter(q => q.level === activeLevel);
  const activeQuestion = filteredQuizzes[currentIdx];

  const filteredEssays = essays.filter(e => e.level === activeLevel);
  const activeEssay = filteredEssays[currentEssayIdx];

  // Shuffle options when quiz question changes
  useEffect(() => {
    if (activeQuestion) {
      const originalOptions = [...activeQuestion.options];
      const correctText = originalOptions[activeQuestion.answer];

      const shuffled = originalOptions
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      const newCorrectIdx = shuffled.indexOf(correctText);
      setShuffledOptions(shuffled);
      setCorrectOptionIdx(newCorrectIdx);
      setSelectedAns(null);
      setIsSubmitted(false);
      setAiHint('');
    }
  }, [currentIdx, activeLevel, quizzes]);

  const handleSelectAnswer = (optIdx) => {
    if (isSubmitted) return;
    setSelectedAns(optIdx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAns === null || isSubmitted) return;

    const isCorrect = selectedAns === correctOptionIdx;
    if (isCorrect) {
      setScore(prev => prev + 1);
      showToast('Chính xác! Chúc mừng em!', 'success');
      logUserAction('SUBMIT_ANSWER', `Nộp đáp án ĐÚNG môn ${activeSubject} lớp ${grade} (${activeLevel}). Câu hỏi: "${activeQuestion.q}"`);
    } else {
      showToast('Chưa chính xác rồi. Hãy đọc lời giải chi tiết nhé!', 'error');
      logUserAction('SUBMIT_ANSWER', `Nộp đáp án SAI môn ${activeSubject} lớp ${grade} (${activeLevel}). Câu hỏi: "${activeQuestion.q}"`);
    }
    setIsSubmitted(true);

    // Save statistics in localStorage
    const totalAnswered = parseInt(localStorage.getItem('total_answered_questions') || '0') + 1;
    const totalCorrect = parseInt(localStorage.getItem('total_correct_questions') || '0') + (isCorrect ? 1 : 0);
    localStorage.setItem('total_answered_questions', totalAnswered.toString());
    localStorage.setItem('total_correct_questions', totalCorrect.toString());

    // Save detailed subject-level-grade stats for the capability dashboard
    const statsKey = `stats_${activeSubject}_${grade}_${activeLevel}`;
    const levelStats = JSON.parse(localStorage.getItem(statsKey) || '{"answered": 0, "correct": 0}');
    levelStats.answered += 1;
    levelStats.correct += (isCorrect ? 1 : 0);
    localStorage.setItem(statsKey, JSON.stringify(levelStats));

    // Dispatch event to update statistics
    window.dispatchEvent(new Event('localStatsChanged'));
  };

  const handleNextQuestion = () => {
    if (currentIdx < filteredQuizzes.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Completed current set
      const finalScore = score + (selectedAns === correctOptionIdx && isSubmitted ? 0 : 0);
      const totalQ = filteredQuizzes.length;
      const percent = Math.round((finalScore / totalQ) * 100);

      logUserAction('COMPLETE_QUIZ_SET', `Hoàn thành bộ trắc nghiệm ${activeSubject} lớp ${grade} (${activeLevel}) - Điểm số: ${finalScore}/${totalQ}`);

      showModal({
        title: 'Hoàn Thành Bộ Trắc Nghiệm!',
        icon: <Trophy size={48} color="#ffab00" style={{ marginBottom: '0.5rem' }} />,
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
            <p style={{ fontWeight: '600', fontSize: '1rem', color: '#001e62' }}>
              Chúc mừng em đã làm hết các câu hỏi {activeLevel === 'easy' ? 'Cơ bản' : activeLevel === 'medium' ? 'Thông hiểu' : 'Vận dụng cao'}!
            </p>
            <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '12px', width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '0.5rem', border: '1px solid var(--border-color)', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span>Số câu trả lời đúng:</span>
                <strong style={{ color: '#00875a' }}>{finalScore} / {totalQ} câu</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span>Tỷ lệ chính xác:</span>
                <strong style={{ color: 'var(--color-primary)' }}>{percent}%</strong>
              </div>
            </div>
          </div>
        ),
        confirmText: 'Luyện tập lại',
        cancelText: 'Về Dashboard',
        onConfirm: () => {
          setCurrentIdx(0);
          setScore(0);
          setSelectedAns(null);
          setIsSubmitted(false);
          setAiHint('');
        },
        onCancel: () => {
          navigate('/');
        }
      });
    }
  };

  const handleGetAIHint = async () => {
    if (!activeQuestion || hintLoading) return;
    setHintLoading(true);
    setAiHint('');

    const query = `Bạn là Giáo viên giảng dạy THPT. Học sinh đang giải câu hỏi trắc nghiệm sau:
    Câu hỏi: "${activeQuestion.q}"
    Các lựa chọn: ${activeQuestion.options.map((o, i) => String.fromCharCode(65 + i) + '. ' + o).join(', ')}

    Hãy đưa ra một GỢI Ý hoặc GỢI MỞ ngắn gọn (dưới 80 từ) giúp học sinh tự tìm ra đáp án chính xác.
    YÊU CẦU QUAN TRỌNG: Không được đưa ra đáp án trực tiếp. Chỉ hướng dẫn tư duy, nhắc nhở công thức hoặc dịch nghĩa từ vựng liên quan. Trả lời bằng tiếng Việt thân thiện.`;

    try {
      let response = "";
      if (apiKey) {
        logUserAction('GET_AI_HINT', `Yêu cầu trợ giúp AI gợi ý câu hỏi: "${activeQuestion.q}"`);
        response = await askGeminiAgent(`${activeSubject}_${grade}`, query, apiKey);
      } else {
        logUserAction('GET_AI_HINT_OFFLINE', `Nhận gợi ý ngoại tuyến cho câu hỏi: "${activeQuestion.q}"`);
        response = `[Gia sư Gợi ý - Ngoại tuyến]: Hãy thử áp dụng công thức có liên quan hoặc đọc phần giải thích chi tiết sau khi nộp bài.`;
      }
      setAiHint(response);
    } catch (e) {
      setAiHint("Đã xảy ra lỗi khi kết nối với AI Gia sư.");
    } finally {
      setHintLoading(false);
    }
  };

  // AI Essay Grading Request
  const handleGradeEssay = () => {
    if ((!essayAnswer.trim() && !essayImage) || !activeEssay || gradingLoading) return;
    setGradingLoading(true);
    setEssayResult(null);

    const contextId = `${activeSubject}_${grade}`;
    api.post('/api/essays/grade', {
      question: activeEssay.q,
      studentAnswer: essayAnswer,
      sampleAnswer: activeEssay.sampleAnswer,
      subject: contextId,
      apiKey: apiKey,
      image: essayImage
    })
      .then(res => {
        setEssayResult(res.data);
        setGradingLoading(false);
        showToast('Đã chấm xong bài làm tự luận!', 'success');
        logUserAction('SUBMIT_ESSAY', `Nộp bài tự luận môn ${activeSubject} lớp ${grade} (${activeLevel}). Điểm: ${res.data.score}/10`);
      })
      .catch(err => {
        setGradingLoading(false);
        showToast('Có lỗi xảy ra khi chấm điểm bài làm.', 'error');
      });
  };

  const subjectsList = [
    { id: 'math', label: 'Toán học', color: 'var(--color-math)' },
    { id: 'physics', label: 'Vật lý', color: 'var(--color-physics)' },
    { id: 'chemistry', label: 'Hóa học', color: 'var(--color-chemistry)' },
    { id: 'english', label: 'Tiếng Anh', color: 'var(--color-english)' },
  ];

  const levelsList = [
    { id: 'easy', label: 'Cơ bản (Dễ)', bg: 'rgba(0, 135, 90, 0.08)', color: '#00875a' },
    { id: 'medium', label: 'Thông hiểu (Vừa)', bg: 'rgba(255, 171, 0, 0.08)', color: '#b27b00' },
    { id: 'hard', label: 'Vận dụng cao (Khó)', bg: 'rgba(222, 53, 11, 0.08)', color: '#de350b' },
  ];

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '1.25rem' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ background: 'none', border: 'none', color: '#0056d2', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem', padding: 0 }}
        >
          ← Bảng điều khiển
        </button>
        <h1>Phòng Luyện Tập Tự Học</h1>
        <p style={{ color: 'var(--text-muted)' }}>Học sinh Lớp {grade} • Trắc nghiệm & Tự luận kết hợp Gia sư chấm điểm AI</p>
      </header>

      {/* Subject Selector Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {subjectsList.map(subj => (
          <button
            key={subj.id}
            onClick={() => {
              setActiveSubject(subj.id);
              navigate(`/practice?subject=${subj.id}`);
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
            }}
          >
            {subj.label}
          </button>
        ))}
      </div>

      {/* Practice Mode Tabs */}
      <div style={{ display: 'flex', borderBottom: '2px solid var(--border-color)', marginBottom: '1.25rem', gap: '1.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setPracticeMode('quiz')}
          style={{
            padding: '0.75rem 0.5rem',
            background: 'none',
            border: 'none',
            borderBottom: practiceMode === 'quiz' ? '3px solid var(--color-primary)' : '3px solid transparent',
            color: practiceMode === 'quiz' ? 'var(--color-primary)' : 'var(--text-muted)',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <FileText size={18} />
          <span>Trắc nghiệm khách quan (10 câu)</span>
        </button>
        <button
          onClick={() => setPracticeMode('essay')}
          style={{
            padding: '0.75rem 0.5rem',
            background: 'none',
            border: 'none',
            borderBottom: practiceMode === 'essay' ? '3px solid var(--color-primary)' : '3px solid transparent',
            color: practiceMode === 'essay' ? 'var(--color-primary)' : 'var(--text-muted)',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Edit3 size={18} />
          <span>Bài tập tự luận chi tiết</span>
        </button>
      </div>

      {/* Difficulty Level Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {levelsList.map(level => {
          const isActive = activeLevel === level.id;
          return (
            <button
              key={level.id}
              onClick={() => {
                setActiveLevel(level.id);
                // Reset quiz indices
                setCurrentIdx(0);
                setScore(0);
                setSelectedAns(null);
                setIsSubmitted(false);
                setAiHint('');
                // Reset essay states
                setCurrentEssayIdx(0);
                setEssayAnswer('');
                setEssayImage(null);
                setEssayResult(null);
              }}
              style={{
                flex: 1,
                minWidth: '130px',
                padding: '0.65rem',
                borderRadius: '8px',
                border: isActive ? `2px solid ${level.color}` : '1px solid var(--border-color)',
                background: isActive ? level.bg : '#ffffff',
                color: level.color,
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
            >
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: level.color,
                display: 'inline-block'
              }} />
              <span>{level.label}</span>
            </button>
          );
        })}
      </div>

      {/* MAIN LAYOUT */}
      {practiceMode === 'quiz' ? (
        /* QUIZ MODE UI */
        quizLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
            <div style={{ width: '30px', height: '30px', border: '3px solid #f3f3f3', borderTop: '3px solid #0056d2', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          </div>
        ) : filteredQuizzes.length === 0 ? (
          <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <h3>Chưa có câu hỏi luyện tập ở cấp độ này</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Hệ thống đang được biên soạn thêm câu hỏi. Vui lòng chọn độ khó khác hoặc môn khác.</p>
          </div>
        ) : (
          <div className="practice-layout">
            {/* Question column */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`quiz-col-${currentIdx}-${activeLevel}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                className="content-section os-window" 
                style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>
                  <span>CÂU HỎI {currentIdx + 1} / {filteredQuizzes.length}</span>
                  <span>Đúng: {score} câu</span>
                </div>

                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#001e62', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                  {activeQuestion.q}
                </div>

                <div className="quiz-options" style={{ marginBottom: '1.5rem' }}>
                  {shuffledOptions.map((opt, optIdx) => {
                    let statusClass = "";
                    if (isSubmitted) {
                      if (optIdx === correctOptionIdx) {
                        statusClass = "correct";
                      } else if (optIdx === selectedAns) {
                        statusClass = "incorrect";
                      }
                    }

                    const letter = String.fromCharCode(65 + optIdx);
                    const isSelected = selectedAns === optIdx;

                    return (
                      <motion.button
                        key={optIdx}
                        onClick={() => handleSelectAnswer(optIdx)}
                        disabled={isSubmitted}
                        whileHover={!isSubmitted ? { scale: 1.01, x: 2 } : {}}
                        whileTap={!isSubmitted ? { scale: 0.99 } : {}}
                        className={`quiz-option ${statusClass}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          borderColor: !isSubmitted && isSelected ? 'var(--color-primary)' : '',
                          background: !isSubmitted && isSelected ? 'rgba(0, 86, 210, 0.04)' : '',
                          color: !isSubmitted && isSelected ? 'var(--color-primary)' : ''
                        }}
                      >
                        <span style={{ 
                          display: 'inline-flex', 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          border: '1px solid ' + (statusClass ? 'transparent' : 'currentColor'), 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          flexShrink: 0
                        }}>
                          {letter}
                        </span>
                        <span style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>{opt}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                  {selectedAns !== null && !isSubmitted && (
                    <motion.button
                      onClick={handleSubmitAnswer}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        flex: 1,
                        padding: '0.8rem',
                        background: 'var(--color-primary)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      Nộp câu trả lời
                    </motion.button>
                  )}

                  {isSubmitted && (
                    <motion.button
                      onClick={handleNextQuestion}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        flex: 1,
                        padding: '0.8rem',
                        background: 'var(--color-primary)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.25rem',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <span>{currentIdx < filteredQuizzes.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành lượt học'}</span>
                      <ChevronRight size={16} />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Sidebar column (Solution & AI Assist) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* AI Hint Card */}
              <div className="quiz-container" style={{ borderColor: 'var(--border-hover)', background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#001e62', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Sparkles size={16} color="#a855f7" fill="#a855f7" />
                    <span>Trợ Lý Gợi Ý AI</span>
                  </span>
                  <button
                    onClick={handleGetAIHint}
                    disabled={hintLoading || isSubmitted}
                    style={{
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      border: '1px solid #ccd0d5',
                      borderRadius: '15px',
                      background: '#f8f9fa',
                      cursor: isSubmitted ? 'not-allowed' : 'pointer',
                      color: isSubmitted ? 'var(--text-muted)' : 'var(--text-primary)',
                      transition: 'all 0.2s'
                    }}
                  >
                    {hintLoading ? (
                      'Đang viết...'
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Lightbulb size={12} color="#b27b00" fill="#b27b00" />
                        <span>Lấy Gợi Ý</span>
                      </span>
                    )}
                  </button>
                </div>

                {aiHint ? (
                  <div style={{ 
                    background: 'rgba(168, 85, 247, 0.05)', 
                    borderLeft: '4px solid #a855f7', 
                    padding: '0.85rem', 
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    lineHeight: '1.5',
                    color: 'var(--text-secondary)'
                  }}>
                    {aiHint}
                  </div>
                ) : (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                    Bấm nút <strong>"Lấy Gợi Ý"</strong> để nhận chỉ dẫn tư duy từ AI (không bị tiết lộ đáp án trực tiếp).
                  </p>
                )}
              </div>

              {/* Solution feedback with parser engine */}
              {isSubmitted && (
                <div 
                  className="fade-in"
                  style={{
                    background: '#f8f9fa',
                    border: '1px solid var(--border-color)',
                    borderLeft: `4px solid ${selectedAns === correctOptionIdx ? '#00875a' : '#de350b'}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.35rem', 
                    fontWeight: 'bold', 
                    fontSize: '1rem',
                    color: selectedAns === correctOptionIdx ? '#00875a' : '#de350b'
                  }}>
                    {selectedAns === correctOptionIdx ? (
                      <>
                        <CheckCircle2 size={18} fill="#00875a" color="#fff" />
                        <span>Câu trả lời chính xác!</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={18} fill="#de350b" color="#fff" />
                        <span>Câu trả lời chưa chính xác!</span>
                      </>
                    )}
                  </div>
                  
                  <div style={{ fontSize: '0.85rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
                    <strong>Phương án đúng:</strong> {String.fromCharCode(65 + correctOptionIdx)}. {shuffledOptions[correctOptionIdx]}
                  </div>

                  <div style={{ 
                    fontSize: '0.85rem', 
                    lineHeight: '1.5', 
                    color: 'var(--text-secondary)',
                    borderTop: '1px dashed var(--border-color)',
                    paddingTop: '0.75rem'
                  }}>
                    <strong>Lời giải chi tiết:</strong>
                    <div style={{ marginTop: '0.35rem' }}>
                      {renderFormattedText(activeQuestion.explain)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        /* ESSAY MODE UI */
        essayLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
            <div style={{ width: '30px', height: '30px', border: '3px solid #f3f3f3', borderTop: '3px solid #0056d2', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          </div>
        ) : filteredEssays.length === 0 ? (
          <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✏️</div>
            <h3>Chưa có câu hỏi tự luận ở cấp độ này</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Hệ thống đang được cập nhật thêm các đề bài tự luận. Vui lòng chọn độ khó khác hoặc môn khác.</p>
          </div>
        ) : (
          <div className="practice-layout" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
            {/* Essay Input and Workspace Column */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`essay-col-${currentEssayIdx}-${activeLevel}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                className="content-section os-window" 
                style={{ minHeight: '500px', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>
                  <span>BÀI TẬP TỰ LUẬN {currentEssayIdx + 1} / {filteredEssays.length}</span>
                  <span>Cấp độ: {activeLevel === 'easy' ? 'Dễ (Cơ bản)' : activeLevel === 'medium' ? 'Vừa (Thông hiểu)' : 'Khó (Vận dụng cao)'}</span>
                </div>

                {/* Essay Question Body */}
                <div style={{ 
                  fontSize: '1.15rem', 
                  fontWeight: 'bold', 
                  color: '#001e62', 
                  lineHeight: '1.5', 
                  marginBottom: '1.5rem',
                  background: 'rgba(0,86,210,0.02)',
                  padding: '1rem',
                  borderLeft: '4px solid var(--color-primary)',
                  borderRadius: '0 8px 8px 0'
                }}>
                  {activeEssay.q}
                </div>

                {/* Student solution textarea */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', flex: 1 }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Bài làm của học sinh:</label>
                  <textarea
                    value={essayAnswer}
                    onChange={(e) => setEssayAnswer(e.target.value)}
                    disabled={gradingLoading || essayResult !== null}
                    placeholder="Gõ lời giải chi tiết của em vào đây. Hoặc bạn có thể chụp ảnh bài viết tay của mình bằng nút bên dưới..."
                    style={{
                      width: '100%',
                      flex: 1,
                      minHeight: '200px',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.95rem',
                      fontFamily: 'inherit',
                      lineHeight: '1.6',
                      resize: 'vertical',
                      outline: 'none',
                      background: gradingLoading ? '#f8f9fa' : '#ffffff',
                      transition: 'border-color 0.2s',
                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
                      marginBottom: '1rem'
                    }}
                  />

                {/* Photo Capture & Upload UI */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <input
                    type="file"
                    id="essay-image-input"
                    accept="image/*"
                    style={{ display: 'none' }}
                    disabled={gradingLoading || essayResult !== null}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEssayImage(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('essay-image-input').click()}
                    disabled={gradingLoading || essayResult !== null}
                    style={{
                      padding: '0.55rem 1.25rem',
                      borderRadius: '20px',
                      border: '1px solid var(--border-color)',
                      background: '#ffffff',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      cursor: gradingLoading || essayResult !== null ? 'not-allowed' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Camera size={16} />
                    <span>Chụp ảnh / Tải ảnh bài viết tay</span>
                  </button>

                  {essayImage && (
                    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                      <img
                        src={essayImage}
                        alt="Preview"
                        style={{
                          height: '42px',
                          maxWidth: '100px',
                          borderRadius: '6px',
                          objectFit: 'cover',
                          border: '1px solid var(--border-hover)',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setEssayImage(null)}
                        disabled={gradingLoading || essayResult !== null}
                        style={{
                          position: 'absolute',
                          top: '-6px',
                          right: '-6px',
                          background: 'rgba(222, 53, 11, 0.9)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '16px',
                          height: '16px',
                          fontSize: '0.6rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                {essayResult === null ? (
                  <button
                    onClick={handleGradeEssay}
                    disabled={gradingLoading || (!essayAnswer.trim() && !essayImage)}
                    style={{
                      flex: 1,
                      padding: '0.8rem 1.5rem',
                      background: 'var(--color-primary)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: 'bold',
                      cursor: gradingLoading || (!essayAnswer.trim() && !essayImage) ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    {gradingLoading ? (
                      <>
                        <div style={{ width: '16px', height: '16px', border: '2px solid #fff', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        <span>AI Gia sư đang chấm bài...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        <span>Nộp bài & Chấm bằng AI Gia Sư</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
                    <button
                      onClick={() => {
                        setEssayResult(null);
                        setEssayAnswer('');
                        setEssayImage(null);
                      }}
                      style={{
                        flex: 1,
                        padding: '0.8rem',
                        background: '#ffffff',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--text-secondary)',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.25rem',
                        fontSize: '0.9rem'
                      }}
                    >
                      <RotateCcw size={16} />
                      <span>Làm lại bài này</span>
                    </button>

                    {currentEssayIdx < filteredEssays.length - 1 && (
                      <button
                        onClick={() => {
                          setCurrentEssayIdx(prev => prev + 1);
                          setEssayAnswer('');
                          setEssayImage(null);
                          setEssayResult(null);
                        }}
                        style={{
                          flex: 1,
                          padding: '0.8rem',
                          background: 'var(--color-primary)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: 'var(--radius-md)',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.25rem',
                          fontSize: '0.9rem'
                        }}
                      >
                        <span>Bài tiếp theo</span>
                        <ChevronRight size={16} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

            {/* AI Tutor Feedback Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {essayResult ? (
                <>
                  {/* Grade Score and AI Comments */}
                  <div style={{
                    background: '#e3fcef',
                    border: '1px solid #00875a',
                    borderLeft: '5px solid #00875a',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0, 135, 90, 0.15)', paddingBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#00875a', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Trophy size={18} color="#00875a" />
                        <span>Điểm AI: {essayResult.score} / 10</span>
                      </span>
                      {essayResult.isOffline && (
                        <span style={{ fontSize: '0.7rem', background: '#ffab00', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '10px', fontWeight: 'bold' }}>
                          Ngoại tuyến
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.6' }}>
                      <strong style={{ color: '#001e62', display: 'block', marginBottom: '0.35rem' }}>Nhận xét chi tiết từ Giáo viên AI:</strong>
                      <div className="essay-feedback-body" style={{ fontSize: '0.85rem' }}>
                        {renderFormattedText(essayResult.feedback)}
                      </div>
                    </div>
                  </div>

                  {/* OCR Text Result */}
                  {essayResult.ocrText && (
                    <div style={{
                      background: 'rgba(0, 86, 210, 0.04)',
                      border: '1px solid rgba(0, 86, 210, 0.15)',
                      borderLeft: '5px solid var(--color-primary)',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}>
                      <div style={{ 
                        fontWeight: 'bold', 
                        fontSize: '0.95rem', 
                        color: '#001e62', 
                        borderBottom: '1px dashed rgba(0, 86, 210, 0.15)', 
                        paddingBottom: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}>
                        <Sparkles size={16} color="var(--color-primary)" />
                        <span>Văn bản trích xuất từ ảnh (OCR):</span>
                      </div>
                      <div style={{ 
                        fontSize: '0.85rem', 
                        color: 'var(--text-secondary)', 
                        lineHeight: '1.6', 
                        fontStyle: 'italic',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {essayResult.ocrText}
                      </div>
                    </div>
                  )}

                  {/* Standard sample answer */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}>
                    <div style={{ 
                      fontWeight: 'bold', 
                      fontSize: '0.95rem', 
                      color: '#001e62', 
                      borderBottom: '1px dashed var(--border-color)', 
                      paddingBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}>
                      <GraduationCap size={16} color="var(--color-primary)" />
                      <span>Đáp án mẫu gợi ý (Model Solution):</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      {renderFormattedText(activeEssay.sampleAnswer)}
                    </div>
                  </div>
                </>
              ) : (
                /* Static guidance info */
                <div style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  textAlign: 'center'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.25rem' }}><Bot size={40} color="var(--color-primary)" /></div>
                  <h3 style={{ fontSize: '1rem', color: '#001e62', margin: 0 }}>Gia sư Trực quan AI</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                    Viết chi tiết các bước làm bài tự luận và nhấn nút gửi. Hệ thống AI Tutor sẽ đánh giá cách suy luận, giải thích các công thức và chỉ ra các biến đổi khi thiếu dữ liệu đầu vào.
                  </p>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
