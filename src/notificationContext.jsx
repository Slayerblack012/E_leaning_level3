import React, { createContext, useContext, useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [modal, setModal] = useState(null); // { title, content, icon, confirmText, cancelText, onConfirm, onCancel }

  // Expose toast display
  const showToast = (message, type = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  // Remove toast automatically
  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Expose modal display
  const showModal = (options) => {
    setModal(options);
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <NotificationContext.Provider value={{ showToast, showModal, closeModal }}>
      {children}
      
      {/* Toast Container */}
      <div style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        pointerEvents: 'none'
      }}>
        <AnimatePresence>
          {toasts.map(t => (
            <ToastItem key={t.id} toast={t} onClose={removeToast} />
          ))}
        </AnimatePresence>
      </div>

      {/* Modal Popup Overlay */}
      <AnimatePresence>
        {modal && (
          <ModalPopup modal={modal} onClose={closeModal} />
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

// Single Toast Component
function ToastItem({ toast, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle2 size={18} color="#10b981" />;
      case 'error': return <XCircle size={18} color="#ef4444" />;
      case 'warning': return <AlertTriangle size={18} color="#f59e0b" />;
      default: return <Info size={18} color="var(--color-primary)" />;
    }
  };

  const getBorderLeftColor = () => {
    switch (toast.type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      default: return 'var(--color-primary)';
    }
  };

  const getHeaderLabel = () => {
    switch (toast.type) {
      case 'success': return 'Thành công';
      case 'error': return 'Lỗi';
      case 'warning': return 'Cảnh báo';
      default: return 'Thông báo';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      style={{
        pointerEvents: 'auto',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderLeft: `4px solid ${getBorderLeftColor()}`,
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-hover)',
        padding: '0.85rem 1.15rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        minWidth: '280px',
        maxWidth: '380px',
        fontFamily: 'var(--font-body)'
      }}
    >
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        {getIcon()}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '0.15rem' }}>
          {getHeaderLabel()}
        </div>
        <div style={{ 
          fontSize: '0.86rem', 
          fontWeight: '500', 
          color: 'var(--text-primary)', 
          lineHeight: '1.4'
        }}>
          {toast.message}
        </div>
      </div>
      <button 
        onClick={() => onClose(toast.id)}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          fontSize: '1.15rem',
          lineHeight: 1,
          padding: '0 0 0 0.5rem',
          alignSelf: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        ×
      </button>
    </motion.div>
  );
}

// Modal Popup Component
function ModalPopup({ modal, onClose }) {
  const handleConfirm = () => {
    if (modal.onConfirm) modal.onConfirm();
    onClose();
  };

  const handleCancel = () => {
    if (modal.onCancel) modal.onCancel();
    onClose();
  };

  const getIconColor = () => {
    const titleLower = modal.title.toLowerCase();
    if (titleLower.includes('xóa') || titleLower.includes('đặt lại') || titleLower.includes('xác nhận đăng xuất')) {
      return { bg: 'rgba(239, 68, 68, 0.06)', text: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.15)' };
    }
    if (titleLower.includes('hoàn thành') || titleLower.includes('chúc mừng') || titleLower.includes('thành tựu')) {
      return { bg: 'rgba(245, 158, 11, 0.06)', text: '#eab308', border: '1px solid rgba(245, 158, 11, 0.15)' };
    }
    return { bg: 'rgba(0, 86, 210, 0.06)', text: 'var(--color-primary)', border: '1px solid var(--border-color)' };
  };

  const colorConfig = getIconColor();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.35)', // Soft slate translucent overlay
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10, transition: { duration: 0.15 } }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-hover)',
          width: '100%',
          maxWidth: '460px',
          padding: '2rem 1.75rem',
          position: 'relative',
          textAlign: 'center',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-body)'
        }}
      >
        {/* Upper Icon Container */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: colorConfig.bg,
          color: colorConfig.text,
          border: colorConfig.border,
          marginBottom: '1.15rem'
        }}>
          {modal.icon ? (
            <div style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {modal.icon}
            </div>
          ) : (
            <HelpCircle size={26} />
          )}
        </div>

        {/* Modal Title */}
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '800',
          color: 'var(--text-primary)',
          marginBottom: '0.65rem',
          fontFamily: 'var(--font-title)',
          letterSpacing: '-0.015em'
        }}>
          {modal.title}
        </h3>

        {/* Modal Content */}
        <div style={{
          fontSize: '0.88rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '1.75rem',
          textAlign: modal.textAlign || 'center'
        }}>
          {modal.content}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'center'
        }}>
          {modal.cancelText && (
            <button
              onClick={handleCancel}
              style={{
                flex: 1,
                padding: '0.6rem 1.25rem',
                background: '#ffffff',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '0.85rem',
                transition: 'all 0.2s',
                fontFamily: 'var(--font-body)'
              }}
              onMouseOver={(e) => { e.target.style.background = '#f8fafc'; e.target.style.borderColor = '#cbd5e1' }}
              onMouseOut={(e) => { e.target.style.background = '#ffffff'; e.target.style.borderColor = 'var(--border-color)' }}
            >
              {modal.cancelText}
            </button>
          )}
          
          <button
            onClick={handleConfirm}
            style={{
              flex: 1,
              padding: '0.6rem 1.25rem',
              background: 'var(--color-primary)',
              color: '#ffffff',
              border: '1px solid var(--color-primary)',
              borderRadius: 'var(--radius-md)',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.85rem',
              transition: 'all 0.2s',
              fontFamily: 'var(--font-body)',
              boxShadow: '0 2px 8px rgba(0, 86, 210, 0.1)'
            }}
            onMouseOver={(e) => { e.target.style.background = 'var(--color-primary-hover)'; e.target.style.borderColor = 'var(--color-primary-hover)' }}
            onMouseOut={(e) => { e.target.style.background = 'var(--color-primary)'; e.target.style.borderColor = 'var(--color-primary)' }}
          >
            {modal.confirmText || 'Đồng ý'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
