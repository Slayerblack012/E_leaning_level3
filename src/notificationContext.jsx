import React, { createContext, useContext, useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, HelpCircle } from 'lucide-react';

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
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onClose={removeToast} />
        ))}
      </div>

      {/* Modal Popup Overlay */}
      {modal && (
        <ModalPopup modal={modal} onClose={closeModal} />
      )}
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
      case 'success': return <CheckCircle2 size={18} color="#00875a" />;
      case 'error': return <XCircle size={18} color="#de350b" />;
      case 'warning': return <AlertTriangle size={18} color="#ffab00" />;
      default: return <Info size={18} color="#0056d2" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success': return '#00875a';
      case 'error': return '#de350b';
      case 'warning': return '#ffab00';
      default: return '#0056d2';
    }
  };

  return (
    <div className="fade-in" style={{
      pointerEvents: 'auto',
      background: '#ffffff',
      borderLeft: `4px solid ${getBorderColor()}`,
      borderRadius: '8px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
      padding: '0.85rem 1.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      minWidth: '280px',
      maxWidth: '380px',
      animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
    }}>
      <div style={{ flexShrink: 0 }}>{getIcon()}</div>
      <div style={{ 
        fontSize: '0.85rem', 
        fontWeight: '600', 
        color: 'var(--text-primary)', 
        lineHeight: '1.4',
        flex: 1
      }}>
        {toast.message}
      </div>
      <button 
        onClick={() => onClose(toast.id)}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          fontSize: '1rem',
          padding: '0 0.2rem',
          marginLeft: '0.5rem'
        }}
      >
        ×
      </button>
    </div>
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

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 30, 98, 0.45)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      animation: 'fadeIn 0.2s ease-out forwards'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 20px 50px rgba(0, 30, 98, 0.15)',
        width: '100%',
        maxWidth: '460px',
        padding: '2rem 1.75rem',
        position: 'relative',
        animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        textAlign: 'center'
      }}>
        {/* Icon representation */}
        {modal.icon ? (
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {modal.icon}
          </div>
        ) : (
          <div style={{
            background: 'rgba(0, 86, 210, 0.08)',
            color: 'var(--color-primary)',
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.2rem'
          }}>
            <HelpCircle size={28} />
          </div>
        )}

        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: '800',
          color: '#001e62',
          marginBottom: '0.75rem',
          letterSpacing: '-0.01em'
        }}>
          {modal.title}
        </h3>

        <div style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
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
                padding: '0.7rem 1.25rem',
                background: '#f1f3f5',
                color: 'var(--text-secondary)',
                border: '1px solid #ccd0d5',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.85rem',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => { e.target.style.background = '#eef2f6' }}
              onMouseOut={(e) => { e.target.style.background = '#f1f3f5' }}
            >
              {modal.cancelText}
            </button>
          )}
          <button
            onClick={handleConfirm}
            style={{
              flex: 1,
              padding: '0.7rem 1.25rem',
              background: 'var(--color-primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.85rem',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(0, 86, 210, 0.15)'
            }}
            onMouseOver={(e) => { e.target.style.background = 'var(--color-primary-hover)' }}
            onMouseOut={(e) => { e.target.style.background = 'var(--color-primary)' }}
          >
            {modal.confirmText || 'Đồng ý'}
          </button>
        </div>
      </div>
    </div>
  );
}
