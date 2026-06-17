import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api, { setAuthToken, logUserAction } from '../../api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;
    setError(null);
    setLoading(true);
    try {
      const res = await api.post('/api/auth/register', { username, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
      setAuthToken(token);
      // Gửi log đăng ký ẩn lên server
      await logUserAction('REGISTER_SUCCESS', 'Đăng ký tài khoản thành công từ Client');
      navigate('/');
    } catch (err) {

      setError(err.response?.data?.error || 'Tên đăng nhập đã tồn tại hoặc đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '70vh',
      width: '100%'
    }}>
      <div className="content-section" style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: '2.5rem 2rem',
        boxShadow: '0 10px 30px rgba(0, 86, 210, 0.05)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '2.5rem' }}>🎓</span>
          <h2 style={{ fontSize: '1.6rem', color: '#001e62', marginTop: '0.5rem' }}>Đăng Ký</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            Tạo tài khoản học tập trực tuyến THPT
          </p>
        </div>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.4rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tên đăng nhập:</label>
            <input 
              type="text"
              required
              className="chat-input"
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.9rem', borderRadius: 'var(--radius-md)' }}
              placeholder="Chọn tên tài khoản..."
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.4rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Mật khẩu:</label>
            <input 
              type="password"
              required
              className="chat-input"
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.9rem', borderRadius: 'var(--radius-md)' }}
              placeholder="Nhập mật khẩu..."
            />
          </div>

          {error && (
            <div style={{ 
              color: 'var(--color-math)', 
              background: '#ffebe6', 
              padding: '0.5rem 0.75rem', 
              borderRadius: 'var(--radius-md)', 
              fontSize: '0.8rem',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              ⚠️ {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              background: 'var(--color-primary)', 
              color: '#ffffff', 
              border: 'none', 
              borderRadius: 'var(--radius-md)', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'background-color 0.2s',
              marginTop: '0.5rem'
            }}
          >
            {loading ? 'Đang tạo tài khoản...' : 'Đăng Ký'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Đã có tài khoản?{' '}
          <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'none' }}>
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
