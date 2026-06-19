import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Layers, 
  BookOpen, 
  GraduationCap, 
  Activity, 
  Menu, 
  X,
  User,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useGrade } from '../gradeContext';
import { useNotification } from '../notificationContext';
import { logUserAction } from '../api';
import { pullSyncFromServer, pushSyncToServer } from '../syncHelper';

export default function Layout({ children }) {
  const { grade, setGrade } = useGrade();
  const location = useLocation();
  const navigate = useNavigate();
  const { showModal } = useNotification();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');



  // Push grade update to server
  useEffect(() => {
    if (token) {
      pushSyncToServer();
    }
  }, [grade, token]);



  // Pull sync from server on mount, tab visible, and periodically
  useEffect(() => {
    if (!token) return;

    // Initial pull
    pullSyncFromServer();

    // Pull on tab focus/visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        pullSyncFromServer();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Periodic pull every 5 seconds
    const intervalId = setInterval(() => {
      pullSyncFromServer();
    }, 5000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(intervalId);
    };
  }, [token]);

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
      label: 'Hỏi đáp & Tự học',
      icon: <MessageSquare size={18} />
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
      <div style={{ width: '100vw', minHeight: '100vh', background: 'var(--bg-main)', overflowX: 'hidden' }}>
        {children}
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
        <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <GraduationCap className="logo-icon" size={24} style={{ strokeWidth: 2.5, color: 'var(--color-primary)' }} />
          <span className="logo-text" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>E-Learning</span>
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
            border: '1px solid var(--border-color)',
            position: 'relative'
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
                  background: 'transparent',
                  color: grade === g ? 'var(--color-primary)' : 'var(--text-muted)', 
                  position: 'relative',
                  zIndex: 1,
                  transition: 'color 0.25s' 
                }}
              >
                <span style={{ position: 'relative', zIndex: 2 }}>Lớp {g}</span>
                {grade === g && (
                  <motion.div
                    layoutId="activeGrade"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: '#ffffff',
                      borderRadius: '4px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                      zIndex: 1
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
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
                <li key={item.path} style={{ position: 'relative', marginBottom: '4px' }}>
                  <Link 
                    to={item.path} 
                    className={`menu-item ${isActive ? 'active' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                    style={{ 
                      position: 'relative', 
                      zIndex: 2,
                      background: 'transparent',
                      color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)'
                    }}
                  >
                    <motion.span 
                      className="menu-item-icon"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {item.icon}
                    </motion.span>
                    <span>{item.label}</span>
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'var(--bg-active-nav)',
                        borderRadius: 'var(--radius-sm)',
                        zIndex: 1,
                        pointerEvents: 'none'
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                    />
                  )}
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
                <User size={18} style={{ color: 'var(--text-secondary)' }} />
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                    {username}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Học sinh Lớp {grade}</div>
                </div>
              </div>
              <motion.button 
                onClick={handleLogout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
                  transition: 'background-color 0.2s' 
                }}
                onMouseOver={(e) => { e.target.style.background = '#ffd1c5' }}
                onMouseOut={(e) => { e.target.style.background = '#ffebe6' }}
              >
                Đăng xuất
              </motion.button>
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
