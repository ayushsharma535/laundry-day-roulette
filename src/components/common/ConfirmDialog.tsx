import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'primary' | 'success';
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'primary'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: AlertTriangle,
          iconBg: 'bg-red-100 text-red-600',
          btnClass: 'bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-600/20'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          iconBg: 'bg-amber-100 text-amber-600',
          btnClass: 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm shadow-amber-600/20'
        };
      case 'success':
        return {
          icon: CheckCircle2,
          iconBg: 'bg-teal-100 text-teal-700',
          btnClass: 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm shadow-teal-600/20'
        };
      case 'primary':
      default:
        return {
          icon: Info,
          iconBg: 'bg-blue-100 text-blue-700',
          btnClass: 'bg-navy-900 hover:bg-navy-800 text-white shadow-sm shadow-navy-950/20'
        };
    }
  };

  const { icon: Icon, iconBg, btnClass } = getVariantStyles();

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl flex-shrink-0 ${iconBg}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-slate-900 mb-1">{title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed">{message}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${btnClass}`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
};
