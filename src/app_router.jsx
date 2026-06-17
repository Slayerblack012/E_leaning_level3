import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LecturesPage from './pages/LecturesPage';
import PracticePage from './pages/PracticePage';
import TutorPage from './pages/TutorPage';
import SettingsPage from './pages/SettingsPage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Layout from './components/Layout';
import { GradeProvider } from './gradeContext';
import { NotificationProvider } from './notificationContext';
import { setAuthToken } from './api';

// Route chỉ dành cho người dùng chưa đăng nhập (Khách)
function AuthRoute({ children }) {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

// Route bắt buộc phải đăng nhập mới truy cập được
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App(){
  useEffect(()=>{
    const token = localStorage.getItem('token');
    setAuthToken(token);
  },[]);

  return (
    <GradeProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Trang Auth */}
              <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
              <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />
              
              {/* Trang học tập được bảo vệ */}
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/lectures" element={<ProtectedRoute><LecturesPage /></ProtectedRoute>} />
              <Route path="/practice" element={<ProtectedRoute><PracticePage /></ProtectedRoute>} />
              <Route path="/tutor" element={<ProtectedRoute><TutorPage /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
              
              {/* Điều hướng mặc định */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </NotificationProvider>
    </GradeProvider>
  );
}

