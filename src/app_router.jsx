import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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

// Component bọc trang học để tự động chạy animation khi chuyển hướng
function PageWrapper({ children }) {
  const shouldReduceMotion = useReducedMotion();
  
  const pageVariants = {
    initial: shouldReduceMotion 
      ? { opacity: 0 } 
      : { opacity: 0, y: 15 },
    animate: shouldReduceMotion 
      ? { opacity: 1 } 
      : { opacity: 1, y: 0 },
    exit: shouldReduceMotion 
      ? { opacity: 0 } 
      : { opacity: 0, y: -15 }
  };

  const pageTransition = shouldReduceMotion 
    ? { duration: 0.15 } 
    : { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  );
}

// Component chứa danh sách Routes được bao bọc bởi AnimatePresence
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Trang Auth */}
        <Route path="/login" element={<AuthRoute><PageWrapper><Login /></PageWrapper></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><PageWrapper><Register /></PageWrapper></AuthRoute>} />
        
        {/* Trang học tập được bảo vệ */}
        <Route path="/" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
        <Route path="/lectures" element={<ProtectedRoute><PageWrapper><LecturesPage /></PageWrapper></ProtectedRoute>} />
        <Route path="/practice" element={<ProtectedRoute><PageWrapper><PracticePage /></PageWrapper></ProtectedRoute>} />
        <Route path="/tutor" element={<ProtectedRoute><PageWrapper><TutorPage /></PageWrapper></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><PageWrapper><SettingsPage /></PageWrapper></ProtectedRoute>} />
        
        {/* Điều hướng mặc định */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
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
            <AnimatedRoutes />
          </Layout>
        </BrowserRouter>
      </NotificationProvider>
    </GradeProvider>
  );
}
