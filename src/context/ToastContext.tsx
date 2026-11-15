import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  title?: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, title?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info', title?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastItem = { id, message, type, title };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Toast container floating at top or bottom */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none sm:bottom-6 sm:right-6">
        {toasts.map(toast => {
          let Icon = Info;
          let iconColor = 'text-teal-600';
          let borderClass = 'border-slate-200';

          if (toast.type === 'success') {
            Icon = CheckCircle2;
            iconColor = 'text-teal-600';
            borderClass = 'border-teal-200';
          } else if (toast.type === 'error') {
            Icon = AlertCircle;
            iconColor = 'text-red-600';
            borderClass = 'border-red-200';
          } else if (toast.type === 'warning') {
            Icon = AlertTriangle;
            iconColor = 'text-amber-600';
            borderClass = 'border-amber-200';
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border bg-white text-slate-800 shadow-md transition-all duration-200 animate-in slide-in-from-bottom-2 ${borderClass}`}
              role="alert"
            >
              <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${iconColor}`} />
              <div className="flex-1 text-xs">
                {toast.title && <p className="font-bold text-slate-900 mb-0.5">{toast.title}</p>}
                <p className="text-slate-600 leading-relaxed">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 p-0.5"
                aria-label="Close notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
