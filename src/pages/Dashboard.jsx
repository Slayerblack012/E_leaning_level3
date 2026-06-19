import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';
import { useGrade } from '../gradeContext';
import { pdfContext } from '../pdfContext';
import { 
  BookOpen, 
  Atom, 
  Activity, 
  Binary, 
  Sparkles, 
  GraduationCap, 
  CheckCircle,
  TrendingUp
} from 'lucide-react';

export default function Dashboard() {
  const { grade } = useGrade();
  const navigate = useNavigate();

  const getSubjectStats = (subj) => {
    let answered = 0;
    let correct = 0;
    ['easy', 'medium', 'hard'].forEach(level => {
      const statsKey = `stats_${subj}_${grade}_${level}`;
      const levelStats = JSON.parse(localStorage.getItem(statsKey) || '{"answered": 0, "correct": 0}');
      answered += levelStats.answered;
      correct += levelStats.correct;
    });
    return { answered, correct };
  };

  const getSubjectLabel = (subj) => {
    switch (subj) {
      case 'math': return 'Toán học';
      case 'physics': return 'Vật lý';
      case 'chemistry': return 'Hóa học';
      case 'english': return 'Tiếng Anh';
      default: return subj;
    }
  };

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Local stats from localStorage
  const [stats, setStats] = useState({
    completedLectures: 0,
    answeredQuestions: 0,
    correctAnswers: 0
  });

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get('/api/subjects')
      .then(res => {
        if (!mounted) return;
        setSubjects(res.data.subjects || []);
        setLoading(false);
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });

    // Load stats from localStorage
    const savedLectures = JSON.parse(localStorage.getItem('completed_lectures') || '[]');
    const totalAnswered = parseInt(localStorage.getItem('total_answered_questions') || '0');
    const totalCorrect = parseInt(localStorage.getItem('total_correct_questions') || '0');

    setStats({
      completedLectures: savedLectures.length,
      answeredQuestions: totalAnswered,
      correctAnswers: totalCorrect
    });

    return () => { mounted = false };
  }, [grade]);

  // Filter subjects by selected grade (e.g. english_10, math_10)
  const activeSubjects = subjects.filter(sub => sub.id.endsWith(`_${grade}`));

  // Subject icon helpers
  const getSubjectIcon = (subjectId) => {
    const name = subjectId.split('_')[0];
    switch (name) {
      case 'english': return <BookOpen size={24} />;
      case 'chemistry': return <Atom size={24} />;
      case 'physics': return <Activity size={24} />;
      case 'math': return <Binary size={24} />;
      default: return <GraduationCap size={24} />;
    }
  };

  const getSubjectClass = (subjectId) => {
    return subjectId.split('_')[0];
  };

  const getAccuracyRate = () => {
    if (stats.answeredQuestions === 0) return 0;
    return Math.round((stats.correctAnswers / stats.answeredQuestions) * 100);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 350, damping: 25 } 
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #0056d2', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Đang tải dữ liệu học tập...</div>
      </div>
    );
  }

  return (
    <div>
      <header className="dashboard-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            Hệ thống Học tập E-Learning THPT
            <span style={{ 
              fontSize: '0.85rem', 
              verticalAlign: 'middle', 
              background: 'rgba(0, 86, 210, 0.08)', 
              color: 'var(--color-primary)', 
              padding: '0.25rem 0.6rem', 
              borderRadius: '4px', 
              fontWeight: 'bold', 
              border: '1px solid rgba(0, 86, 210, 0.15)' 
            }}>
              Khối Lớp {grade}
            </span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
            Học lý thuyết chi tiết cơ bản/nâng cao và làm bài tập trắc nghiệm phân hóa
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#e3fcef', color: '#00875a', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: 'bold' }}>
          <span className="status-dot online" style={{ background: '#00875a', width: 8, height: 8, borderRadius: '50%', display: 'inline-block' }}></span>
          <span>Hệ thống hoạt động tốt</span>
        </div>
      </header>

      {/* Statistics Section */}
      <motion.div 
        className="stats-grid" 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ marginBottom: '2.5rem' }}
      >
        <motion.div 
          className="stat-card" 
          variants={itemVariants}
          whileHover={{ y: -3, boxShadow: 'var(--shadow-hover)' }}
          style={{ transition: 'background-color 0.2s' }}
        >
          <div className="stat-icon-wrapper" style={{ color: 'var(--color-english)' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <div className="stat-value">{stats.completedLectures} bài</div>
            <div className="stat-label">Bài giảng đã hoàn thành</div>
          </div>
        </motion.div>
        <motion.div 
          className="stat-card" 
          variants={itemVariants}
          whileHover={{ y: -3, boxShadow: 'var(--shadow-hover)' }}
          style={{ transition: 'background-color 0.2s' }}
        >
          <div className="stat-icon-wrapper" style={{ color: 'var(--color-physics)' }}>
            <GraduationCap size={24} />
          </div>
          <div>
            <div className="stat-value">{stats.answeredQuestions} câu</div>
            <div className="stat-label">Bài tập trắc nghiệm đã làm</div>
          </div>
        </motion.div>
        <motion.div 
          className="stat-card" 
          variants={itemVariants}
          whileHover={{ y: -3, boxShadow: 'var(--shadow-hover)' }}
          style={{ transition: 'background-color 0.2s' }}
        >
          <div className="stat-icon-wrapper" style={{ color: 'var(--color-chemistry)' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <div className="stat-value">{getAccuracyRate()}%</div>
            <div className="stat-label">Tỉ lệ trả lời chính xác</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Subject Selector cards */}
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.4rem', color: '#001e62' }}>Học liệu Lớp {grade} theo môn</h2>
      
      {activeSubjects.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          Chưa có môn học nào được cấu hình cho Khối {grade}.
        </div>
      ) : (
        <motion.div 
          className="subject-grid" 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{ marginBottom: '3rem' }}
        >
          {activeSubjects.map(sub => {
            const subjName = sub.id.split('_')[0];
            
            // Tính toán tiến trình hoàn thành bài học của môn học này
            const subData = pdfContext[sub.id];
            const lectures = subData?.lectures || [];
            const totalLectures = lectures.length;
            const completedList = JSON.parse(localStorage.getItem('completed_lectures') || '[]');
            const completedCount = lectures.filter(l => completedList.includes(l.chapterId)).length;
            const progressPercent = totalLectures > 0 ? Math.round((completedCount / totalLectures) * 100) : 0;

            return (
              <motion.div 
                key={sub.id} 
                className={`subject-card ${getSubjectClass(sub.id)}`}
                variants={itemVariants}
                whileHover={{ y: -6, boxShadow: 'var(--shadow-hover)' }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              >
                <div className="subject-badge">{subjName}</div>
                <h3 className="subject-title">{sub.title}</h3>
                <p className="subject-description">{sub.description || 'Chi tiết lý thuyết và bài tập phân cấp theo độ khó.'}</p>
                
                {/* Thanh tiến độ bài học trực quan */}
                <div style={{ marginTop: '1rem', width: '100%', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontWeight: 'bold' }}>
                    <span>Bài học đã học:</span>
                    <span>{completedCount}/{totalLectures} ({progressPercent}%)</span>
                  </div>
                  <div style={{ background: '#f1f3f5', height: '6px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e1e5eb' }}>
                    <div style={{ 
                      background: `var(--color-${subjName})`, 
                      width: `${progressPercent}%`, 
                      height: '100%',
                      borderRadius: '4px',
                      transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                  <motion.button 
                    className="subject-btn"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem' }}
                    onClick={() => navigate(`/lectures?subject=${subjName}`)}
                  >
                    Bài Giảng
                  </motion.button>
                  <motion.button 
                    className="subject-btn"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem' }}
                    onClick={() => navigate(`/practice?subject=${subjName}`)}
                  >
                    Luyện Tập
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Góc Phân Tích Năng Lực & Đề Xuất Học Tập */}
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.4rem', color: '#001e62', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <TrendingUp size={24} color="var(--color-primary)" />
        <span>Phân Tích Năng Lực & Đề Xuất Học Tập</span>
      </h2>
      
      <motion.div 
        className="practice-layout" 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}
      >
        
        {/* Left Column: Progress / Accuracy per subject */}
        <motion.div className="content-section" variants={itemVariants} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#001e62', marginBottom: '0.25rem', fontWeight: 'bold' }}>🎯 Tỉ lệ chính xác theo môn</h3>
          
          {['math', 'physics', 'chemistry', 'english'].map(subj => {
            const { answered, correct } = getSubjectStats(subj);
            const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : null;
            const colorVar = `var(--color-${subj})`;

            return (
              <div key={subj} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
                    {getSubjectLabel(subj)}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {accuracy !== null ? `Đúng ${correct}/${answered} câu (${accuracy}%)` : 'Chưa bắt đầu thực hành'}
                  </span>
                </div>
                
                <div style={{ background: '#f1f3f5', height: '10px', borderRadius: '5px', overflow: 'hidden', border: '1px solid #e1e5eb', position: 'relative' }}>
                  {accuracy !== null ? (
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${accuracy}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      style={{ 
                        background: colorVar, 
                        height: '100%',
                        borderRadius: '5px',
                      }} 
                    />
                  ) : (
                    <div style={{ 
                      background: '#e1e5eb', 
                      width: '0%', 
                      height: '100%',
                      borderRadius: '5px'
                    }} />
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Right Column: AI Recommendations */}
        <motion.div className="content-section" variants={itemVariants} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(0, 86, 210, 0.02)' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#001e62', marginBottom: '0.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Sparkles size={18} color="#a855f7" fill="#a855f7" />
            <span>Đề xuất học tập cá nhân hóa</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', maxHeight: '250px' }}>
            {(() => {
              const items = [];
              let totalPractice = 0;

              ['math', 'physics', 'chemistry', 'english'].forEach(subj => {
                const { answered, correct } = getSubjectStats(subj);
                totalPractice += answered;

                if (answered > 0) {
                  const accuracy = Math.round((correct / answered) * 100);
                  const label = getSubjectLabel(subj);

                  if (accuracy >= 80) {
                    items.push(
                      <motion.div 
                        key={subj} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#e3fcef', borderLeft: '4px solid #00875a', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}
                      >
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <div style={{ fontSize: '1.1rem' }}>🏆</div>
                          <div style={{ fontSize: '0.8rem', lineHeight: '1.4', color: '#006644', flex: 1 }}>
                            <strong>Môn thế mạnh - {label}:</strong> Bạn đang học rất vững với độ chính xác cao ({accuracy}%). Hãy tiếp tục thử thách bản thân với các bài tập **Tự luận nâng cao** hoặc trao đổi với AI Gia Sư!
                          </div>
                        </div>
                        <motion.button
                          onClick={() => navigate(`/tutor?subject=${subj}`)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            alignSelf: 'flex-end',
                            background: 'rgba(0, 135, 90, 0.1)',
                            border: '1px solid rgba(0, 135, 90, 0.3)',
                            color: '#006644',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseOver={(e) => { e.target.style.background = 'rgba(0, 135, 90, 0.2)' }}
                          onMouseOut={(e) => { e.target.style.background = 'rgba(0, 135, 90, 0.1)' }}
                        >
                          Hỏi lý thuyết nâng cao →
                        </motion.button>
                      </motion.div>
                    );
                  } else if (accuracy < 50) {
                    items.push(
                      <motion.div 
                        key={subj} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#ffebe6', borderLeft: '4px solid #de350b', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}
                      >
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <div style={{ fontSize: '1.1rem' }}>⚠️</div>
                          <div style={{ fontSize: '0.8rem', lineHeight: '1.4', color: '#ae2a02', flex: 1 }}>
                            <strong>Cần cải thiện - {label}:</strong> Độ chính xác hiện tại khá thấp ({accuracy}%). Bạn nên xem lại lý thuyết hoặc thảo luận trực tiếp với AI Gia sư để tìm ra các lỗi kiến thức.
                          </div>
                        </div>
                        <motion.button
                          onClick={() => navigate(`/tutor?subject=${subj}`)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            alignSelf: 'flex-end',
                            background: 'rgba(222, 53, 11, 0.1)',
                            border: '1px solid rgba(222, 53, 11, 0.3)',
                            color: '#de350b',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseOver={(e) => { e.target.style.background = 'rgba(222, 53, 11, 0.2)' }}
                          onMouseOut={(e) => { e.target.style.background = 'rgba(222, 53, 11, 0.1)' }}
                        >
                          Nhờ Gia sư hướng dẫn lại →
                        </motion.button>
                      </motion.div>
                    );
                  } else {
                    items.push(
                      <motion.div 
                        key={subj} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#fff9e6', borderLeft: '4px solid #ffab00', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}
                      >
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <div style={{ fontSize: '1.1rem' }}>⚖️</div>
                          <div style={{ fontSize: '0.8rem', lineHeight: '1.4', color: '#a36d00', flex: 1 }}>
                            <strong>Đang tiến bộ - {label}:</strong> Kết quả ở mức trung bình ({accuracy}%). Hãy hỏi AI Gia sư để được gợi ý thêm các mẹo ghi nhớ nhanh công thức và ví dụ nâng cao.
                          </div>
                        </div>
                        <motion.button
                          onClick={() => navigate(`/tutor?subject=${subj}`)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            alignSelf: 'flex-end',
                            background: 'rgba(255, 171, 0, 0.15)',
                            border: '1px solid rgba(255, 171, 0, 0.4)',
                            color: '#a36d00',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseOver={(e) => { e.target.style.background = 'rgba(255, 171, 0, 0.25)' }}
                          onMouseOut={(e) => { e.target.style.background = 'rgba(255, 171, 0, 0.15)' }}
                        >
                          Hỏi mẹo học nhanh →
                        </motion.button>
                      </motion.div>
                    );
                  }
                }
              });

              if (totalPractice === 0) {
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '120px', gap: '0.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem' }}>🚀</div>
                    <p style={{ fontSize: '0.85rem', margin: 0, lineHeight: '1.4' }}>
                      Chào mừng em đến với hệ thống! Hãy chọn môn học phía trên và bắt đầu hành trình tự học để nhận được phân tích năng lực từ Giáo viên AI nhé.
                    </p>
                  </div>
                );
              }

              return items;
            })()}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
