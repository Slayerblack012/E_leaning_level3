import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';
import { pushSyncToServer } from '../syncHelper';
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
  TrendingUp,
  Dna,
  History,
  Feather,
  Award,
  Trophy,
  Flame,
  AlertTriangle
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
      case 'biology': return 'Sinh học';
      case 'history': return 'Lịch sử';
      case 'literature': return 'Ngữ văn';
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
      case 'biology': return <Dna size={24} />;
      case 'history': return <History size={24} />;
      case 'literature': return <Feather size={24} />;
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
      {/* Premium Hero Banner */}
      <div className="hero-banner fade-in">
        <div className="hero-banner-content">
          <div className="hero-banner-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <TrendingUp size={14} /> Cổng ôn luyện tốt nghiệp THPT Quốc gia
          </div>
          <h1 className="hero-banner-title">
            Chào mừng trở lại, {localStorage.getItem('username') || 'Học sinh'}!
          </h1>
          <p className="hero-banner-desc">
            Khối Lớp {grade} đã sẵn sàng với 7 môn học trọng tâm. Hãy tiếp tục học lý thuyết và luyện đề thi phân hóa để nâng cao năng lực ôn thi quốc gia!
          </p>
          <div className="hero-banner-stats">
            <div className="hero-stat-item">
              <span className="hero-stat-val" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Flame size={18} style={{ color: '#ff8a00' }} /> 5 ngày
              </span>
              <span className="hero-stat-lbl">Chuỗi học tập (Streak)</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-val" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Award size={18} style={{ color: '#ffd700' }} /> {stats.completedLectures * 50 + stats.correctAnswers * 10} XP
              </span>
              <span className="hero-stat-lbl">Kinh nghiệm tích lũy</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-val" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Trophy size={18} style={{ color: '#4facfe' }} /> {getAccuracyRate()}%
              </span>
              <span className="hero-stat-lbl">Tỷ lệ chính xác trung bình</span>
            </div>
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-end', 
          gap: '0.4rem', 
          background: 'rgba(255, 255, 255, 0.08)', 
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: '0.85rem 1.25rem', 
          borderRadius: 'var(--radius-lg)', 
          border: '1px solid rgba(255, 255, 255, 0.12)', 
          fontSize: '0.8rem', 
          zIndex: 2,
          boxShadow: '0 8px 32px rgba(15, 23, 42, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 'bold' }}>
            <span style={{ background: '#10b981', width: 8, height: 8, borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #10b981' }}></span>
            <span style={{ color: '#ffffff' }}>Hệ thống trực tuyến</span>
          </div>
          <div style={{ color: '#cbd5e1', fontSize: '0.7rem' }}>E-Learning THPT v2.5</div>
        </div>
      </div>

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
        >
          <div className="stat-icon-wrapper" style={{ color: 'var(--color-english)', background: 'var(--bg-badge-english)' }}>
            <BookOpen size={22} />
          </div>
          <div>
            <div className="stat-value" style={{ color: 'var(--text-primary)' }}>{stats.completedLectures} bài học</div>
            <div className="stat-label">Đã tích lũy lý thuyết</div>
          </div>
        </motion.div>
        <motion.div 
          className="stat-card" 
          variants={itemVariants}
          whileHover={{ y: -3, boxShadow: 'var(--shadow-hover)' }}
        >
          <div className="stat-icon-wrapper" style={{ color: 'var(--color-physics)', background: 'var(--bg-badge-physics)' }}>
            <GraduationCap size={22} />
          </div>
          <div>
            <div className="stat-value" style={{ color: 'var(--text-primary)' }}>{stats.answeredQuestions} câu</div>
            <div className="stat-label">Trắc nghiệm đã làm</div>
          </div>
        </motion.div>
        <motion.div 
          className="stat-card" 
          variants={itemVariants}
          whileHover={{ y: -3, boxShadow: 'var(--shadow-hover)' }}
        >
          <div className="stat-icon-wrapper" style={{ color: 'var(--color-chemistry)', background: 'var(--bg-badge-chemistry)' }}>
            <CheckCircle size={22} />
          </div>
          <div>
            <div className="stat-value" style={{ color: 'var(--text-primary)' }}>{getAccuracyRate()}% chính xác</div>
            <div className="stat-label">Hiệu suất trả lời đúng</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Continue Learning Widget */}
      {(() => {
        const lastSubj = localStorage.getItem('last_studied_subject') || 'math';
        const lastLectIdx = parseInt(localStorage.getItem(`last_studied_lecture_idx_${lastSubj}_${grade}`) || '0');
        const subData = pdfContext[`${lastSubj}_${grade}`];
        const lecture = subData?.lectures?.[lastLectIdx];
        if (!lecture) return null;
        
        return (
          <motion.div 
            className="content-section" 
            variants={itemVariants}
            whileHover={{ y: -2, boxShadow: 'var(--shadow-hover)' }}
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '1.25rem 1.5rem', 
              background: '#ffffff', 
              borderLeft: '5px solid var(--color-primary)', 
              borderLeftColor: `var(--color-${lastSubj})`, 
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 'bold', textTransform: 'uppercase', color: `var(--color-${lastSubj})`, letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                Đang học dở • Môn {getSubjectLabel(lastSubj)} Lớp {grade}
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                Bài {lastLectIdx + 1}: {lecture.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Em đang dừng ở nội dung bài này. Hãy tiếp tục ôn tập ngay để tích lũy thêm XP nhé!
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="subject-btn btn-solid"
              style={{ 
                maxWidth: '140px', 
                padding: '0.55rem 1.25rem', 
                fontSize: '0.82rem', 
                background: `var(--color-${lastSubj})`, 
                borderColor: `var(--color-${lastSubj})` 
              }}
              onClick={() => {
                localStorage.setItem('last_studied_subject', lastSubj);
                pushSyncToServer();
                navigate(`/lectures?subject=${lastSubj}`);
              }}
            >
              Học tiếp →
            </motion.button>
          </motion.div>
        );
      })()}

      {/* Subject Selector cards */}
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.4rem', color: '#001e62', fontFamily: 'var(--font-title)' }}>Học liệu Lớp {grade} theo môn</h2>
      
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
                className={`subject-card ${subjName}`}
                variants={itemVariants}
                whileHover={{ y: -6, boxShadow: 'var(--shadow-hover)' }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                onClick={() => {
                  localStorage.setItem('last_studied_subject', subjName);
                  pushSyncToServer();
                  navigate(`/lectures?subject=${subjName}`);
                }}
              >
                <div className="subject-card-cover">
                  <div className="subject-card-cover-pattern"></div>
                  <div className="subject-card-icon">
                    {getSubjectIcon(sub.id)}
                  </div>
                  <div className="subject-card-badge">
                    Lớp {grade}
                  </div>
                </div>

                <div className="subject-card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: `var(--color-${subjName})`, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {getSubjectLabel(subjName)}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {totalLectures} bài giảng
                    </span>
                  </div>

                  <h3 className="subject-title">{sub.title}</h3>
                  <p className="subject-description">{sub.description || 'Chi tiết lý thuyết và bài tập trắc nghiệm phân hóa theo ma trận đề thi THPT Quốc gia.'}</p>
                  
                  {/* Thanh tiến độ bài học trực quan */}
                  <div style={{ marginTop: 'auto', width: '100%', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontWeight: 'bold' }}>
                      <span>Tiến trình hoàn thành:</span>
                      <span>{progressPercent}%</span>
                    </div>
                    <div style={{ background: '#f1f5f9', height: '6px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                      <div style={{ 
                        background: `var(--color-${subjName})`, 
                        width: `${progressPercent}%`, 
                        height: '100%',
                        borderRadius: '4px',
                        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                      }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }} onClick={(e) => e.stopPropagation()}>
                    <motion.button 
                      className="subject-btn btn-solid"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ flex: 1, padding: '0.55rem', fontSize: '0.82rem' }}
                      onClick={() => {
                        localStorage.setItem('last_studied_subject', subjName);
                        pushSyncToServer();
                        navigate(`/lectures?subject=${subjName}`);
                      }}
                    >
                      Bài giảng
                    </motion.button>
                    <motion.button 
                      className="subject-btn"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ flex: 1, padding: '0.55rem', fontSize: '0.82rem' }}
                      onClick={() => navigate(`/practice?subject=${subjName}`)}
                    >
                      Luyện đề
                    </motion.button>
                  </div>
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
          
          {['math', 'physics', 'chemistry', 'biology', 'history', 'literature', 'english'].map(subj => {
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
                
                <div style={{ background: '#f1f5f9', height: '10px', borderRadius: '5px', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative' }}>
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
                      background: '#e2e8f0', 
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
        <motion.div className="content-section" variants={itemVariants} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(37, 99, 235, 0.015)', borderLeft: '3px solid var(--color-primary)' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#001e62', marginBottom: '0.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Sparkles size={18} color="#8b5cf6" fill="#8b5cf6" />
            <span>Đề xuất ôn tập cá nhân hóa</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', maxHeight: '380px' }}>
            {(() => {
              const items = [];
              let totalPractice = 0;

              ['math', 'physics', 'chemistry', 'biology', 'history', 'literature', 'english'].forEach(subj => {
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
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <Trophy size={16} style={{ color: '#00875a' }} />
                          <div style={{ fontSize: '0.8rem', lineHeight: '1.4', color: '#006644', flex: 1 }}>
                            <strong>Môn thế mạnh - {label}:</strong> Bạn đang học rất vững với độ chính xác cao ({accuracy}%). Hãy tiếp tục thử thách bản thân với các bài tập **Tự luận nâng cao** hoặc trao đổi với Trợ lý Học tập!
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
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <AlertTriangle size={16} style={{ color: '#de350b' }} />
                          <div style={{ fontSize: '0.8rem', lineHeight: '1.4', color: '#ae2a02', flex: 1 }}>
                            <strong>Cần cải thiện - {label}:</strong> Độ chính xác hiện tại khá thấp ({accuracy}%). Bạn nên xem lại lý thuyết hoặc thảo luận trực tiếp với Trợ lý Học tập để tìm ra các lỗi kiến thức.
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
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <Activity size={16} style={{ color: '#a36d00' }} />
                          <div style={{ fontSize: '0.8rem', lineHeight: '1.4', color: '#a36d00', flex: 1 }}>
                            <strong>Đang tiến bộ - {label}:</strong> Kết quả ở mức trung bình ({accuracy}%). Hãy hỏi Trợ lý Học tập để được gợi ý thêm các mẹo ghi nhớ nhanh công thức và ví dụ nâng cao.
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
                    <Sparkles size={32} style={{ color: 'var(--color-primary)', marginBottom: '0.25rem' }} />
                    <p style={{ fontSize: '0.85rem', margin: 0, lineHeight: '1.4' }}>
                      Chào mừng em đến với hệ thống! Hãy chọn môn học phía trên và bắt đầu hành trình tự học để nhận được phân tích năng lực từ hệ thống học tập nhé.
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
