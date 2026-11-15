import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 mb-4 shadow-inner">
        <Icon className="w-7 h-7 text-slate-400" />
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-navy-900 hover:bg-navy-800 active:scale-98 rounded-xl transition-all shadow-sm shadow-navy-950/10"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
