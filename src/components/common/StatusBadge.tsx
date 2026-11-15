import React from 'react';
import type { OrderStatus } from '../../types/order';
import { Clock, PackageCheck, Waves, CheckCircle2, Sparkles } from 'lucide-react';

interface StatusBadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showPulse = true
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5 font-medium',
    md: 'text-xs px-3 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold'
  };

  const getStatusConfig = (st: OrderStatus) => {
    switch (st) {
      case 'Submitted':
        return {
          icon: Clock,
          classes: 'bg-slate-100 text-slate-700 border-slate-200/80',
          dot: 'bg-slate-400'
        };
      case 'Received':
        return {
          icon: PackageCheck,
          classes: 'bg-blue-50 text-blue-700 border-blue-200/80',
          dot: 'bg-blue-500'
        };
      case 'Washing':
        return {
          icon: Waves,
          classes: 'bg-sky-50 text-sky-700 border-sky-200/80',
          dot: 'bg-sky-500'
        };
      case 'Ready':
        return {
          icon: Sparkles,
          classes: 'bg-teal-50 text-teal-800 border-teal-300 font-semibold',
          dot: 'bg-teal-500',
          pulse: true
        };
      case 'Collected':
        return {
          icon: CheckCircle2,
          classes: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          dot: 'bg-emerald-600'
        };
      default:
        return {
          icon: Clock,
          classes: 'bg-slate-100 text-slate-700 border-slate-200',
          dot: 'bg-slate-400'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-2xs transition-colors whitespace-nowrap ${sizeClasses[size]} ${config.classes}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {showPulse && config.pulse && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${config.dot}`}></span>
      </span>
      <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      <span>{status}</span>
    </span>
  );
};
