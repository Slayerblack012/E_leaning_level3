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
      case 'success': return <CheckCircle2 size={18} color="#00f0ff" />;
      case 'error': return <XCircle size={18} color="#ff3e3e" />;
      case 'warning': return <AlertTriangle size={18} color="#ff7a00" />;
      default: return <Info size={18} color="#00f0ff" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success': return '#00f0ff';
      case 'error': return '#ff3e3e';
      case 'warning': return '#ff7a00';
      default: return '#00f0ff';
    }
  };

  const getHeaderLabel = () => {
    switch (toast.type) {
      case 'success': return 'SYSTEM: QUEST CLEAR';
      case 'error': return 'SYSTEM: QUEST FAILED';
      case 'warning': return 'SYSTEM: WARNING';
      default: return 'SYSTEM: DIRECTIVE';
    }
  };

  const getHeaderColor = () => {
    switch (toast.type) {
      case 'success': return '#00f0ff';
      case 'error': return '#ff3e3e';
      case 'warning': return '#ff7a00';
      default: return '#00f0ff';
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
        background: 'rgba(10, 18, 30, 0.95)',
        border: `1px solid ${getBorderColor()}`,
        borderRadius: 'var(--radius-md)',
        boxShadow: `0 8px 24px rgba(0, 0, 0, 0.15), 0 0 15px ${getBorderColor()}33, inset 0 0 8px rgba(0, 240, 255, 0.1)`,
        padding: '0.85rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        minWidth: '300px',
        maxWidth: '400px',
        fontFamily: 'var(--font-body)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${getBorderColor()}33`, paddingBottom: '0.25rem' }}>
        <span style={{ 
          fontSize: '0.75rem', 
          fontWeight: '800', 
          color: getHeaderColor(), 
          letterSpacing: '0.1em',
          fontFamily: 'monospace'
        }}>
          {getHeaderLabel()}
        </span>
        <button 
          onClick={() => onClose(toast.id)}
          style={{
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            fontSize: '1rem',
            lineHeight: 1,
            padding: 0
          }}
        >
          ×
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.25rem' }}>
        <div style={{ flexShrink: 0 }}>{getIcon()}</div>
        <div style={{ 
          fontSize: '0.85rem', 
          fontWeight: '600', 
          color: '#f8fafc', 
          lineHeight: '1.4',
          flex: 1
        }}>
          {toast.message}
        </div>
      </div>
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

  const getSystemHeader = () => {
    if (modal.title.includes('Hoàn Thành') || modal.title.includes('Trắc Nghiệm')) {
      return 'SYSTEM: QUEST COMPLETED';
    }
    if (modal.title.includes('Xác nhận Đăng xuất')) {
      return 'SYSTEM: LOGOUT DIRECTIVE';
    }
    if (modal.title.includes('Đặt lại')) {
      return 'SYSTEM: RESET DIRECTIVE';
    }
    return 'SYSTEM: ACTIVE DIRECTIVE';
  };

  const borderColor = '#00f0ff';
  const accentColor = '#00f0ff';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5, 10, 18, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        style={{
          background: 'rgba(10, 20, 35, 0.96)',
          border: `1.5px solid ${borderColor}`,
          borderRadius: 'var(--radius-lg)',
          boxShadow: `0 20px 50px rgba(0, 0, 0, 0.3), 0 0 30px ${borderColor}33, inset 0 0 15px rgba(0, 240, 255, 0.1)`,
          width: '100%',
          maxWidth: '480px',
          padding: '2.5rem 1.75rem 2rem 1.75rem',
          position: 'relative',
          textAlign: 'center',
          color: '#f8fafc'
        }}
      >
        {/* macOS Traffic Lights decoration */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          display: 'flex',
          gap: '6px',
          zIndex: 10
        }}>
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ff5f56' }} />
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ffbd2e' }} />
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#27c93f' }} />
        </div>

        {/* Holographic Header Bar */}
        <div style={{ 
          fontSize: '0.8rem', 
          fontWeight: '900', 
          color: accentColor, 
          letterSpacing: '0.15em', 
          fontFamily: 'monospace',
          marginBottom: '1rem',
          borderBottom: `1px solid ${borderColor}33`,
          paddingBottom: '0.5rem',
          textTransform: 'uppercase'
        }}>
          {getSystemHeader()}
        </div>

        {/* Icon representation */}
        {modal.icon ? (
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.5))'
          }}>
            {modal.icon}
          </div>
        ) : (
          <div style={{
            background: 'rgba(0, 240, 255, 0.1)',
            color: '#00f0ff',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.2rem',
            border: '1px solid #00f0ff',
            boxShadow: '0 0 10px rgba(0, 240, 255, 0.2)'
          }}>
            <HelpCircle size={28} />
          </div>
        )}

        <h3 style={{
          fontSize: '1.4rem',
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: '0.75rem',
          letterSpacing: '0.02em',
          fontFamily: 'var(--font-title)'
        }}>
          {modal.title}
        </h3>

        <div style={{
          fontSize: '0.92rem',
          color: '#cbd5e1',
          lineHeight: '1.6',
          marginBottom: '1.75rem',
          textAlign: modal.textAlign || 'center'
        }}>
          {modal.content}
        </div>

        {/* Buttons */}
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
                padding: '0.75rem 1.25rem',
                background: 'rgba(239, 68, 68, 0.08)',
                color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.85rem',
                transition: 'all 0.2s',
                fontFamily: 'monospace'
              }}
              onMouseOver={(e) => { e.target.style.background = 'rgba(239, 68, 68, 0.15)' }}
              onMouseOut={(e) => { e.target.style.background = 'rgba(239, 68, 68, 0.08)' }}
            >
              {modal.cancelText}
            </button>
          )}
          <button
            onClick={handleConfirm}
            style={{
              flex: 1,
              padding: '0.75rem 1.25rem',
              background: 'rgba(0, 240, 255, 0.15)',
              color: '#00f0ff',
              border: '1px solid #00f0ff',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.85rem',
              transition: 'all 0.2s',
              boxShadow: '0 0 10px rgba(0, 240, 255, 0.2)',
              fontFamily: 'monospace'
            }}
            onMouseOver={(e) => { e.target.style.background = 'rgba(0, 240, 255, 0.25)'; e.target.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.4)' }}
            onMouseOut={(e) => { e.target.style.background = 'rgba(0, 240, 255, 0.15)'; e.target.style.boxShadow = '0 0 10px rgba(0, 240, 255, 0.2)' }}
          >
            {modal.confirmText || 'Đồng ý'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
