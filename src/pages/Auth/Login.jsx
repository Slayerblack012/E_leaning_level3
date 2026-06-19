import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api, { setAuthToken, logUserAction } from '../../api';
import { pullSyncFromServer } from '../../syncHelper';
import { GraduationCap, Lock } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) return;
    setError(null);
    setLoading(true);
    try {
      const res = await api.post('/api/auth/login', { username, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
      setAuthToken(token);
      await pullSyncFromServer();
      await logUserAction('LOGIN', 'Học sinh đăng nhập thành công');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Tên đăng nhập hoặc mật khẩu không đúng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-container">
      <div className="auth-visual-side">
        <div className="auth-visual-side-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '2.5rem' }}>
            <GraduationCap size={32} style={{ color: '#ffffff' }} />
            <span style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '0', background: 'linear-gradient(to right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>E-Learning THPT</span>
          </div>
          <h2 className="auth-visual-title">Bứt phá điểm số kỳ thi THPT Quốc gia</h2>
          <p className="auth-visual-desc">
            Học lý thuyết tương tác bám sát cấu trúc đề thi mới nhất từ Bộ GD&ĐT, làm trắc nghiệm phân hóa và luyện viết luận văn với hệ thống hỗ trợ học tập thông minh.
          </p>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800' }}>7 môn</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Học liệu chuẩn chỉnh</div>
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800' }}>24/7</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Hỗ trợ tức thì</div>
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800' }}>100%</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Theo dõi tiến độ</div>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="content-section" style={{ 
          width: '100%', 
          maxWidth: '400px', 
          padding: '2.5rem 2rem',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Lock size={36} style={{ color: 'var(--color-primary)', margin: '0 auto 0.5rem auto' }} />
            <h2 style={{ fontSize: '1.6rem', color: '#001e62', marginTop: '0.5rem', fontFamily: 'var(--font-title)' }}>Đăng nhập</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Truy cập tài khoản học tập trực tuyến của bạn
            </p>
          </div>

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.4rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Tên đăng nhập</label>
              <input
                type="text"
                required
                className="chat-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.9rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }}
                placeholder="Nhập tên tài khoản..."
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.4rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Mật khẩu</label>
              <input
                type="password"
                required
                className="chat-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.9rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }}
                placeholder="Nhập mật khẩu..."
              />
            </div>

            {error && (
              <div style={{ color: 'var(--color-math)', background: '#ffebe6', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', fontWeight: 'bold', textAlign: 'center' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', background: 'var(--color-primary)', color: '#ffffff', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem', transition: 'background-color 0.2s', marginTop: '0.5rem', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}>
              {loading ? 'Đang xác thực...' : 'Đăng nhập'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Chưa có tài khoản?{' '}
            <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'none' }}>
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
