'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ message, type = 'info', duration = 3500 }) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const typeConfig = {
    success: { icon: '✓', color: 'var(--emerald)', bg: 'rgba(16,185,129,0.12)' },
    error:   { icon: '✕', color: '#F87171',         bg: 'rgba(248,113,113,0.12)' },
    info:    { icon: '◎', color: 'var(--teal)',      bg: 'rgba(78,205,196,0.12)' },
    warning: { icon: '⚠', color: 'var(--amber)',     bg: 'rgba(245,158,11,0.12)' },
    xp:      { icon: '⚡', color: '#A855F7',          bg: 'rgba(168,85,247,0.12)' },
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Portal */}
      <div
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => {
            const cfg = typeConfig[t.type] ?? typeConfig.info;
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: 40, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.88 }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => remove(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '13px 18px',
                  background: 'var(--bg-card)',
                  border: `1px solid ${cfg.color}35`,
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(12px)',
                  maxWidth: '340px',
                  pointerEvents: 'all',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  background: cfg.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  color: cfg.color,
                  flexShrink: 0,
                }}>
                  {cfg.icon}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                  {t.message}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx.toast;
}
