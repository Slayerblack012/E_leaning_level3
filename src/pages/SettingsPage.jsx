import React, { useState, useEffect } from 'react';
import { useGrade } from '../gradeContext';
import { useNotification } from '../notificationContext';
import { logUserAction } from '../api';
import { motion } from 'framer-motion';
import { 
  Activity, 
  RefreshCw, 
  Award,
  BookOpen,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Sliders,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Lock,
  CheckCircle2,
  Trophy
} from 'lucide-react';

export default function SettingsPage() {
  const { grade } = useGrade();
  const { showToast, showModal } = useNotification();
  const [localStats, setLocalStats] = useState([]);
  const [completedLecturesCount, setCompletedLecturesCount] = useState(0);

  useEffect(() => {
    loadStats();
    
    // Add event listener to refresh stats when they change on other pages
    window.addEventListener('localStatsChanged', loadStats);
    return () => window.removeEventListener('localStatsChanged', loadStats);
  }, [grade]);

  const loadStats = () => {
    const subjects = [
      { id: 'math', name: 'Toán học', color: 'var(--color-math)', bgBadge: 'var(--bg-badge-math)' },
      { id: 'physics', name: 'Vật lý', color: 'var(--color-physics)', bgBadge: 'var(--bg-badge-physics)' },
      { id: 'chemistry', name: 'Hóa học', color: 'var(--color-chemistry)', bgBadge: 'var(--bg-badge-chemistry)' },
      { id: 'biology', name: 'Sinh học', color: 'var(--color-biology)', bgBadge: 'var(--bg-badge-biology)' },
      { id: 'history', name: 'Lịch sử', color: 'var(--color-history)', bgBadge: 'var(--bg-badge-history)' },
      { id: 'literature', name: 'Ngữ văn', color: 'var(--color-literature)', bgBadge: 'var(--bg-badge-literature)' },
      { id: 'english', name: 'Tiếng Anh', color: 'var(--color-english)', bgBadge: 'var(--bg-badge-english)' }
    ];

    const levels = [
      { id: 'easy', name: 'Cơ bản (Dễ)' },
      { id: 'medium', name: 'Thông hiểu (Vừa)' },
      { id: 'hard', name: 'Vận dụng cao (Khó)' }
    ];

    const statsArray = [];

    subjects.forEach(sub => {
      levels.forEach(lvl => {
        const key = `stats_${sub.id}_${grade}_${lvl.id}`;
        const data = JSON.parse(localStorage.getItem(key) || '{"answered": 0, "correct": 0}');
        statsArray.push({
          subjectId: sub.id,
          subjectName: sub.name,
          color: sub.color,
          bgBadge: sub.bgBadge,
          levelId: lvl.id,
          levelName: lvl.name,
          answered: data.answered,
          correct: data.correct
        });
      });
    });

    setLocalStats(statsArray);

    // Get completed lectures count
    const savedLectures = JSON.parse(localStorage.getItem('completed_lectures') || '[]');
    setCompletedLecturesCount(savedLectures.length);
  };

  const handleResetProgress = () => {
    showModal({
      title: '⚠️ Đặt lại Tiến trình Học?',
      content: 'Bạn có chắc chắn muốn đặt lại toàn bộ tiến trình học tập và bài tập không? Thao tác này sẽ xóa sạch tất cả điểm số đã đạt được, danh sách bài giảng đã học, lịch sử chat với Gia sư và các bài học đang học dở.',
      confirmText: 'Xác nhận xóa hết',
      cancelText: 'Hủy',
      onConfirm: async () => {
        // Clear specific stats keys
        const keys = Object.keys(localStorage);
        keys.forEach(k => {
          if (
            k.startsWith('stats_') || 
            k.startsWith('completed_lectures') || 
            k.startsWith('total_answered_') || 
            k.startsWith('total_correct_') || 
            k.startsWith('chats_tutors') ||
            k.startsWith('last_studied_')
          ) {
            localStorage.removeItem(k);
          }
        });
        loadStats();
        showToast("Đã đặt lại tiến trình học tập thành công!", "success");
        await logUserAction('RESET_PROGRESS', `Đặt lại toàn bộ tiến trình học tập (Khối lớp ${grade})`);
        window.dispatchEvent(new Event('localStatsChanged'));
        window.dispatchEvent(new Event('completedLecturesChanged'));
      }
    });
  };

  // Aggregated totals
  const totalAnswered = localStats.reduce((sum, item) => sum + item.answered, 0);
  const totalCorrect = localStats.reduce((sum, item) => sum + item.correct, 0);
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  // Level mapping for badges
  const getLevelBadgeStyle = (levelId) => {
    switch (levelId) {
      case 'easy':
        return { background: 'rgba(16, 185, 129, 0.08)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)' };
      case 'medium':
        return { background: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.2)' };
      case 'hard':
        return { background: 'rgba(244, 63, 94, 0.08)', color: '#f43f5e', border: '1px solid rgba(244, 63, 94, 0.2)' };
      default:
        return { background: '#f1f5f9', color: 'var(--text-secondary)' };
    }
  };

  // Achievements Definition
  const achievements = [
    {
      id: 'first_step',
      title: 'Khởi đầu vững chắc',
      desc: 'Trả lời đúng câu trắc nghiệm đầu tiên trên hệ thống.',
      requirement: 'Đạt tối thiểu 1 câu đúng',
      isUnlocked: totalCorrect >= 1,
      icon: '✨'
    },
    {
      id: 'dedicated_scholar',
      title: 'Học giả kiên trì',
      desc: 'Tích lũy kiến thức qua 10 câu trả lời chính xác.',
      requirement: 'Đạt tối thiểu 10 câu đúng',
      isUnlocked: totalCorrect >= 10,
      icon: '🏆'
    },
    {
      id: 'matrix_destroyer',
      title: 'Kẻ hủy diệt ma trận đề',
      desc: 'Giải quyết xuất sắc 30 câu hỏi ôn tập THPT Quốc gia.',
      requirement: 'Đạt tối thiểu 30 câu đúng',
      isUnlocked: totalCorrect >= 30,
      icon: '🔥'
    },
    {
      id: 'peak_performance',
      title: 'Hiệu suất đỉnh cao',
      desc: 'Đạt tỉ lệ chính xác xuất sắc trên 80% đối với các bài ôn luyện.',
      requirement: 'Làm tối thiểu 15 câu & Tỉ lệ đúng >= 80%',
      isUnlocked: totalAnswered >= 15 && accuracy >= 80,
      icon: '🧠'
    },
    {
      id: 'theory_master',
      title: 'Bậc thầy lý thuyết',
      desc: 'Hoàn thành ghi nhận và học lý thuyết từ bài giảng.',
      requirement: 'Đã hoàn thành học ít nhất 1 bài lý thuyết',
      isUnlocked: completedLecturesCount >= 1,
      icon: '📚'
    }
  ];

  // Animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
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

  return (
    <div className="fade-in" style={{ maxWidth: '960px', margin: '0 auto', paddingBottom: '3rem' }}>
      
      {/* Premium Gradient Sub-Banner */}
      <div className="hero-banner" style={{ padding: '2.2rem 2.5rem', marginBottom: '2.5rem', background: 'var(--grad-hero)' }}>
        <div className="hero-banner-content">
          <div className="hero-banner-tag">
            <Sliders size={12} />
            <span>Thông số & Cá nhân hóa</span>
          </div>
          <h1 className="hero-banner-title" style={{ fontSize: '1.8rem', color: '#ffffff', margin: 0 }}>
            Tiến độ Học tập & Thành tích
          </h1>
          <p className="hero-banner-desc" style={{ fontSize: '0.9rem', color: '#cbd5e1', marginTop: '0.4rem', maxWidth: '680px' }}>
            Theo dõi chi tiết hiệu suất làm bài tập trắc nghiệm THPT Quốc gia, kiểm tra các danh hiệu học tập đã mở khóa và quản lý tiến trình tài khoản Lớp {grade}.
          </p>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: '0.75rem 1.25rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.15rem'
        }}>
          <span style={{ fontSize: '1.4rem' }}>📚</span>
          <span style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '0.85rem' }}>Khối {grade}</span>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
      >
        
        {/* Performance Cards Overview */}
        <motion.div className="stats-grid" variants={itemVariants} style={{ marginBottom: 0 }}>
          <motion.div 
            className="stat-card" 
            whileHover={{ y: -3, boxShadow: 'var(--shadow-hover)' }}
          >
            <div className="stat-icon-wrapper" style={{ color: 'var(--color-english)', background: 'var(--bg-badge-english)' }}>
              <HelpCircle size={22} />
            </div>
            <div>
              <div className="stat-value" style={{ color: 'var(--text-primary)' }}>{totalAnswered} câu</div>
              <div className="stat-label">Tổng câu trắc nghiệm đã làm</div>
            </div>
          </motion.div>

          <motion.div 
            className="stat-card" 
            whileHover={{ y: -3, boxShadow: 'var(--shadow-hover)' }}
          >
            <div className="stat-icon-wrapper" style={{ color: 'var(--color-chemistry)', background: 'var(--bg-badge-chemistry)' }}>
              <CheckCircle size={22} />
            </div>
            <div>
              <div className="stat-value" style={{ color: 'var(--text-primary)' }}>{totalCorrect} câu</div>
              <div className="stat-label">Số đáp án trả lời đúng</div>
            </div>
          </motion.div>

          <motion.div 
            className="stat-card" 
            whileHover={{ y: -3, boxShadow: 'var(--shadow-hover)' }}
          >
            <div className="stat-icon-wrapper" style={{ color: 'var(--color-physics)', background: 'var(--bg-badge-physics)' }}>
              <TrendingUp size={22} />
            </div>
            <div>
              <div className="stat-value" style={{ color: 'var(--text-primary)' }}>{accuracy}%</div>
              <div className="stat-label">Tỷ lệ chính xác trung bình</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Detailed Performance Statistics by Subject */}
        <motion.div className="content-section" variants={itemVariants} style={{ padding: '1.75rem', marginBottom: 0 }}>
          <h2 className="section-title" style={{ fontSize: '1.15rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)' }}>
            <Activity size={18} style={{ color: 'var(--color-primary)' }} />
            <span>Phân tích Kết quả Ôn luyện chi tiết</span>
          </h2>

          {totalAnswered === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem 1.5rem', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '1rem',
              background: '#f8fafc',
              borderRadius: 'var(--radius-lg)',
              border: '1px dashed var(--border-color)'
            }}>
              <span style={{ fontSize: '2.5rem' }}>📊</span>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', margin: 0 }}>Chưa có dữ liệu làm bài trắc nghiệm</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: '400px', margin: 0, lineHeight: 1.5 }}>
                Em hãy vào mục "Khu luyện tập" hoặc chọn bài tập trắc nghiệm của các môn học để bắt đầu tích lũy điểm số và theo dõi chỉ số năng lực tại đây.
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)', fontWeight: '700' }}>
                    <th style={{ padding: '0.75rem 0.5rem' }}>MÔN HỌC</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>CẤP ĐỘ CÂU HỎI</th>
                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>ĐÃ LÀM</th>
                    <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>ĐÁP ÁN ĐÚNG</th>
                    <th style={{ padding: '0.75rem 0.5rem', width: '200px' }}>TỶ LỆ CHÍNH XÁC</th>
                  </tr>
                </thead>
                <tbody>
                  {localStats.map((item, idx) => {
                    const rate = item.answered > 0 ? Math.round((item.correct / item.answered) * 100) : 0;
                    
                    if (item.answered === 0) return null;

                    return (
                      <motion.tr 
                        key={idx} 
                        style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }}
                        whileHover={{ backgroundColor: 'rgba(248, 250, 252, 0.65)' }}
                      >
                        <td style={{ padding: '1rem 0.5rem' }}>
                          <span style={{ 
                            padding: '0.25rem 0.65rem', 
                            borderRadius: '50px', 
                            fontWeight: 'bold', 
                            fontSize: '0.75rem',
                            color: item.color,
                            background: item.bgBadge
                          }}>
                            {item.subjectName}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 0.5rem' }}>
                          <span style={{ 
                            padding: '0.2rem 0.5rem', 
                            borderRadius: 'var(--radius-sm)', 
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            ...getLevelBadgeStyle(item.levelId)
                          }}>
                            {item.levelName}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 0.5rem', textAlign: 'center', fontWeight: '500', color: 'var(--text-primary)' }}>
                          {item.answered}
                        </td>
                        <td style={{ padding: '1rem 0.5rem', textAlign: 'center', color: '#10b981', fontWeight: 'bold' }}>
                          {item.correct}
                        </td>
                        <td style={{ padding: '1rem 0.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <div style={{ flex: 1, background: '#e2e8f0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${rate}%` }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                style={{ 
                                  background: rate >= 70 ? '#10b981' : rate >= 40 ? '#f59e0b' : '#ef4444', 
                                  height: '100%',
                                  borderRadius: '4px'
                                }} 
                              />
                            </div>
                            <span style={{ fontWeight: '700', fontSize: '0.8rem', width: '38px', textAlign: 'right', color: 'var(--text-primary)' }}>
                              {rate}%
                            </span>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Gamification Achievements Section */}
        <motion.div className="content-section" variants={itemVariants} style={{ padding: '1.75rem', marginBottom: 0 }}>
          <h2 className="section-title" style={{ fontSize: '1.15rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)' }}>
            <Trophy size={18} style={{ color: '#eab308' }} />
            <span>Chứng nhận Thành tựu & Huy hiệu Vàng</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
            {achievements.map((ach) => (
              <motion.div
                key={ach.id}
                style={{
                  background: ach.isUnlocked 
                    ? 'linear-gradient(135deg, rgba(254, 243, 199, 0.35) 0%, rgba(253, 242, 248, 0.25) 100%)' 
                    : '#ffffff',
                  border: ach.isUnlocked ? '1.5px solid #fde68a' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  display: 'flex',
                  gap: '1rem',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: ach.isUnlocked ? 1 : 0.72,
                  boxShadow: ach.isUnlocked ? '0 4px 15px rgba(254, 243, 199, 0.4)' : 'none',
                  transition: 'all 0.2s ease-in-out'
                }}
                whileHover={ach.isUnlocked ? { y: -3, boxShadow: '0 8px 25px rgba(254, 243, 199, 0.6)', borderColor: '#fcd34d' } : {}}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: ach.isUnlocked 
                    ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' 
                    : '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  flexShrink: 0,
                  boxShadow: ach.isUnlocked ? '0 4px 10px rgba(217, 119, 6, 0.15)' : 'none'
                }}>
                  {ach.isUnlocked ? ach.icon : <Lock size={18} style={{ color: 'var(--text-muted)' }} />}
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '0.92rem', fontWeight: 'bold', color: ach.isUnlocked ? '#92400e' : 'var(--text-primary)', margin: 0 }}>
                      {ach.title}
                    </h3>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: '700',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '50px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                      background: ach.isUnlocked ? '#d1fae5' : '#e2e8f0',
                      color: ach.isUnlocked ? '#065f46' : 'var(--text-muted)',
                      border: ach.isUnlocked ? '1px solid rgba(52, 211, 153, 0.2)' : 'none'
                    }}>
                      {ach.isUnlocked ? 'Đã đạt' : 'Khóa'}
                    </span>
                  </div>
                  
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.35rem', lineHeight: 1.45, flexGrow: 1 }}>
                    {ach.desc}
                  </p>

                  <div style={{ 
                    fontSize: '0.72rem', 
                    color: ach.isUnlocked ? '#b45309' : 'var(--text-muted)', 
                    fontWeight: '600', 
                    marginTop: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <span>Yêu cầu:</span>
                    <span>{ach.requirement}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* System Settings & Maintenance Card */}
        <motion.div className="content-section" variants={itemVariants} style={{ padding: '1.75rem', marginBottom: 0, border: '1px solid #fee2e2', background: 'rgba(254, 242, 242, 0.4)' }}>
          <h2 className="section-title" style={{ fontSize: '1.15rem', marginBottom: '1rem', paddingBottom: '0.75rem', color: '#b91c1c', borderBottom: '1px solid rgba(220, 38, 38, 0.1)' }}>
            <Sliders size={18} style={{ color: '#dc2626' }} />
            <span>Quản trị Hệ thống & Dữ liệu</span>
          </h2>

          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', background: '#fff', border: '1px solid #fee2e2', padding: '1.25rem', borderRadius: 'var(--radius-lg)', flexWrap: 'wrap' }}>
            <div style={{
              background: '#fee2e2',
              color: '#ef4444',
              padding: '0.65rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ShieldAlert size={22} />
            </div>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#991b1b', margin: 0 }}>Cảnh báo dọn dẹp tiến trình</h3>
              <p style={{ fontSize: '0.8rem', color: '#7f1d1d', marginTop: '0.35rem', lineHeight: 1.5, margin: '0.35rem 0 0 0' }}>
                Hành động này sẽ xóa vĩnh viễn tất cả điểm số, tiến trình làm bài trắc nghiệm, lịch sử học bài lý thuyết, các giáo án đang học dở và toàn bộ cuộc hội thoại của bạn với các Gia sư AI. Sau khi thực hiện, dữ liệu cũ sẽ không thể khôi phục.
              </p>
            </div>
            
            <div style={{ alignSelf: 'center', marginTop: '0.5rem' }}>
              <motion.button
                onClick={handleResetProgress}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '0.65rem 1.25rem',
                  background: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => { e.target.style.background = '#dc2626' }}
                onMouseOut={(e) => { e.target.style.background = '#ef4444' }}
              >
                <RefreshCw size={14} />
                <span>Đặt lại toàn bộ dữ liệu học</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
