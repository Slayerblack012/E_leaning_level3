import React, { useState, useEffect } from 'react';
import { useGrade } from '../gradeContext';
import { useNotification } from '../notificationContext';
import { logUserAction } from '../api';
import { 
  Activity, 
  RefreshCw, 
  Award
} from 'lucide-react';


export default function SettingsPage() {
  const { grade } = useGrade();
  const { showToast, showModal } = useNotification();
  const [localStats, setLocalStats] = useState([]);


  useEffect(() => {
    loadStats();
    
    // Add event listener to refresh stats when they change on other pages
    window.addEventListener('localStatsChanged', loadStats);
    return () => window.removeEventListener('localStatsChanged', loadStats);
  }, [grade]);

  const loadStats = () => {
    const subjects = [
      { id: 'math', name: 'Toán học', color: 'var(--color-math)' },
      { id: 'physics', name: 'Vật lý', color: 'var(--color-physics)' },
      { id: 'chemistry', name: 'Hóa học', color: 'var(--color-chemistry)' },
      { id: 'biology', name: 'Sinh học', color: 'var(--color-biology)' },
      { id: 'history', name: 'Lịch sử', color: 'var(--color-history)' },
      { id: 'literature', name: 'Ngữ văn', color: 'var(--color-literature)' },
      { id: 'english', name: 'Tiếng Anh', color: 'var(--color-english)' }
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
          levelId: lvl.id,
          levelName: lvl.name,
          answered: data.answered,
          correct: data.correct
        });
      });
    });

    setLocalStats(statsArray);
  };

  const handleResetProgress = () => {
    showModal({
      title: '⚠️ Đặt lại Tiến trình Học?',
      content: 'Bạn có chắc chắn muốn đặt lại toàn bộ tiến trình học tập và bài tập không? Thao tác này sẽ xóa sạch tất cả điểm số đã đạt được, danh sách bài giảng đã học và lịch sử chat với Gia sư.',
      confirmText: 'Xác nhận xóa hết',
      cancelText: 'Hủy',
      onConfirm: async () => {
        // Clear specific stats keys
        const keys = Object.keys(localStorage);
        keys.forEach(k => {
          if (k.startsWith('stats_') || k.startsWith('completed_lectures') || k.startsWith('total_answered_') || k.startsWith('total_correct_') || k.startsWith('chats_tutors')) {
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

  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>Tiến Độ Học Tập</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.35rem' }}>Theo dõi hiệu suất làm bài tập và tiến trình học tập của bạn Khối Lớp {grade}</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Performance Overview */}
        <div className="content-section" style={{ padding: '1.5rem', marginBottom: 0 }}>
          <h2 className="section-title" style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>
            <Activity size={18} />
            <span>Phân tích kết quả luyện tập</span>
          </h2>

          <div className="stats-overview-grid">

            <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#001e62' }}>{totalAnswered}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Đã Trả Lời</div>
            </div>
            <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00875a' }}>{totalCorrect}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Số Câu Đúng</div>
            </div>
            <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{accuracy}%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tỉ Lệ Đúng</div>
            </div>
          </div>

          {/* Performance table by Subject */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)', fontWeight: 'bold' }}>
                  <th style={{ padding: '0.5rem 0.25rem' }}>Môn học</th>
                  <th style={{ padding: '0.5rem 0.25rem' }}>Cấp độ</th>
                  <th style={{ padding: '0.5rem 0.25rem', textAlign: 'center' }}>Số câu</th>
                  <th style={{ padding: '0.5rem 0.25rem', textAlign: 'center' }}>Đúng</th>
                  <th style={{ padding: '0.5rem 0.25rem', width: '150px' }}>Tỉ lệ đúng</th>
                </tr>
              </thead>
              <tbody>
                {localStats.map((item, idx) => {
                  const rate = item.answered > 0 ? Math.round((item.correct / item.answered) * 100) : 0;
                  
                  if (item.answered === 0) return null;

                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid #e1e5eb' }}>
                      <td style={{ padding: '0.65rem 0.25rem', fontWeight: 'bold', color: item.color }}>{item.subjectName}</td>
                      <td style={{ padding: '0.65rem 0.25rem' }}>{item.levelName}</td>
                      <td style={{ padding: '0.65rem 0.25rem', textAlign: 'center' }}>{item.answered}</td>
                      <td style={{ padding: '0.65rem 0.25rem', textAlign: 'center', color: '#00875a', fontWeight: 'bold' }}>{item.correct}</td>
                      <td style={{ padding: '0.65rem 0.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <div style={{ flex: 1, background: '#ccd0d5', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ background: rate >= 70 ? '#00875a' : rate >= 40 ? '#ffab00' : '#de350b', width: `${rate}%`, height: '100%' }} />
                          </div>
                          <span style={{ fontWeight: 'bold', fontSize: '0.75rem', width: '30px', textAlign: 'right' }}>{rate}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {totalAnswered === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      Chưa có dữ liệu làm bài trắc nghiệm. Hãy bắt đầu luyện tập ở mục "Khu luyện tập".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Reset progress */}
          <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '2rem', paddingTop: '1.25rem', textAlign: 'right' }}>
            <button
              onClick={handleResetProgress}
              style={{
                padding: '0.5rem 1rem',
                background: 'none',
                border: '1px solid var(--color-math)',
                color: 'var(--color-math)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              onMouseOver={(e) => { e.target.style.background = '#ffebe6' }}
              onMouseOut={(e) => { e.target.style.background = 'none' }}
            >
              <RefreshCw size={12} />
              <span>Đặt lại tiến trình học</span>
            </button>
          </div>

        </div>

        {/* Badges / Awards */}
        {totalCorrect >= 5 && (
          <div className="content-section" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #fffbeb 0%, #fff9db 100%)', borderColor: '#ffea79', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#ffab00', padding: '0.75rem', borderRadius: '50%', color: '#fff' }}>
              <Award size={28} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', color: '#8a6d00', margin: 0 }}>Danh hiệu: Học Giả Chăm Chỉ</h3>
              <p style={{ fontSize: '0.8rem', color: '#a07d00', margin: '0.25rem 0 0 0', lineHeight: 1.4 }}>
                Bạn đã xuất sắc trả lời đúng {totalCorrect} câu trắc nghiệm trên hệ thống. Tiếp tục phát huy nhé!
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
