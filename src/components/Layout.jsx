import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Layers, 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  Activity, 
  Menu, 
  X 
} from 'lucide-react';
import { useGrade } from '../gradeContext';
import { useNotification } from '../notificationContext';
import { logUserAction } from '../api';

export default function Layout({ children }) {
  const { grade, setGrade } = useGrade();
  const location = useLocation();
  const navigate = useNavigate();
  const { showModal } = useNotification();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    showModal({
      title: 'Xác nhận Đăng xuất',
      content: 'Bạn có chắc chắn muốn đăng xuất khỏi tài khoản học tập không?',
      confirmText: 'Đăng xuất',
      cancelText: 'Hủy',
      onConfirm: async () => {
        await logUserAction('LOGOUT', 'Đăng xuất tài khoản học sinh');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
      }
    });
  };

  const menuItems = [
    {
      path: '/',
      label: 'Bảng điều khiển',
      icon: <Layers size={18} />
    },
    {
      path: '/lectures',
      label: 'Bài giảng chi tiết',
      icon: <BookOpen size={18} />
    },
    {
      path: '/practice',
      label: 'Khu luyện tập',
      icon: <GraduationCap size={18} />
    },
    {
      path: '/tutor',
      label: 'Phòng tự học AI',
      icon: <Sparkles size={18} />
    },
    {
      path: '/settings',
      label: 'Tiến độ học tập',
      icon: <Activity size={18} />
    }
  ];

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return (
      <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center', background: 'var(--bg-main)', minHeight: '100vh', width: '100vw' }}>
        <main style={{ width: '100%', maxWidth: '440px', padding: '1rem' }}>
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">

      {/* Mobile menu trigger */}
      <button 
        className="mobile-menu-btn" 
        onClick={() => setSidebarOpen(prev => !prev)}
        style={{ zIndex: 110 }}
        aria-label="Toggle Navigation"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay overlay-open" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="logo-container">
          <span className="logo-icon">🎓</span>
          <span className="logo-text" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>SmartTutor</span>
        </div>

        {/* Grade Switcher Section */}
        <div style={{ marginBottom: '1.5rem', padding: '0 0.5rem' }}>
          <label style={{ 
            fontSize: '0.72rem', 
            textTransform: 'uppercase', 
            color: 'var(--text-muted)', 
            fontWeight: 'bold', 
            display: 'block', 
            marginBottom: '0.5rem', 
            letterSpacing: '0.04em' 
          }}>
            Khối lớp học
          </label>
          <div style={{ 
            display: 'flex', 
            gap: '0.25rem', 
            background: '#f1f3f5', 
            padding: '0.2rem', 
            borderRadius: '6px', 
            border: '1px solid var(--border-color)' 
          }}>
            {['10', '11', '12'].map((g) => (
              <button 
                key={g}
                onClick={() => {
                  setGrade(g);
                  logUserAction('CHANGE_GRADE', `Thay đổi khối lớp học sang Lớp ${g}`);
                }}
                style={{ 
                  flex: 1, 
                  padding: '0.35rem', 
                  border: 'none', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem', 
                  fontWeight: 'bold', 
                  cursor: 'pointer', 
                  background: grade === g ? '#ffffff' : 'transparent', 
                  color: grade === g ? 'var(--color-primary)' : 'var(--text-muted)', 
                  boxShadow: grade === g ? '0 1px 3px rgba(0,0,0,0.06)' : 'none', 
                  transition: 'all 0.2s' 
                }}
              >
                Lớp {g}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav style={{ flex: 1 }}>
          <ul className="sidebar-menu" style={{ listStyle: 'none' }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`menu-item ${isActive ? 'active' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="menu-item-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Account / Footer */}
        <div className="sidebar-footer">
          {token ? (
            <div className="api-key-box" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem' }}>👤</span>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                    {username}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Học sinh Lớp {grade}</div>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                style={{ 
                  width: '100%', 
                  padding: '0.4rem', 
                  background: '#ffebe6', 
                  color: 'var(--color-math)', 
                  border: 'none', 
                  borderRadius: '4px', 
                  fontSize: '0.75rem', 
                  fontWeight: 'bold', 
                  cursor: 'pointer', 
                  transition: 'all 0.2s' 
                }}
                onMouseOver={(e) => { e.target.style.background = '#ffd1c5' }}
                onMouseOut={(e) => { e.target.style.background = '#ffebe6' }}
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', justifyContent: 'center' }}>
              <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'none' }}>Đăng nhập</Link>
              <span style={{ color: 'var(--border-color)' }}>|</span>
              <Link to="/register" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Đăng ký</Link>
            </div>
          )}
          <div style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
            © 2026 E-Learning THPT
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
