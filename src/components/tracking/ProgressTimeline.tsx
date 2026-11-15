import React from 'react';
import { ORDER_STATUS_SEQUENCE } from '../../types/order';
import type { OrderStatus, OrderStatusHistoryItem } from '../../types/order';
import { Clock, PackageCheck, Waves, Sparkles, CheckCircle2, Check } from 'lucide-react';

interface ProgressTimelineProps {
  currentStatus: OrderStatus;
  statusHistory?: OrderStatusHistoryItem[];
  orientation?: 'horizontal' | 'vertical';
  showDetails?: boolean;
}

export const ProgressTimeline: React.FC<ProgressTimelineProps> = ({
  currentStatus,
  statusHistory = [],
  orientation = 'horizontal',
  showDetails = true
}) => {
  const currentStepIndex = ORDER_STATUS_SEQUENCE.indexOf(currentStatus);

  const getStepIcon = (status: OrderStatus, isCompleted: boolean) => {
    if (isCompleted) {
      return <Check className="w-4 h-4 text-white stroke-[2.5]" />;
    }
    switch (status) {
      case 'Submitted':
        return <Clock className="w-4 h-4" />;
      case 'Received':
        return <PackageCheck className="w-4 h-4" />;
      case 'Washing':
        return <Waves className="w-4 h-4" />;
      case 'Ready':
        return <Sparkles className="w-4 h-4" />;
      case 'Collected':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getHistoryItem = (status: OrderStatus): OrderStatusHistoryItem | undefined => {
    return statusHistory.find(h => h.status === status);
  };

  const formatTime = (iso?: string) => {
    if (!iso) return null;
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (orientation === 'horizontal') {
    return (
      <div className="w-full py-2">
        {/* Desktop Stepper */}
        <div className="hidden sm:flex items-center justify-between relative">
          {/* Background Track Line */}
          <div className="absolute top-5 left-10 right-10 h-1 bg-slate-200/80 -z-0 rounded-full" />

          {/* Active Colored Progress Line */}
          <div
            className="absolute top-5 left-10 h-1 bg-teal-600 -z-0 rounded-full transition-all duration-500"
            style={{
              width: `${(Math.max(0, currentStepIndex) / (ORDER_STATUS_SEQUENCE.length - 1)) * 88}%`
            }}
          />

          {ORDER_STATUS_SEQUENCE.map((status, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isPending = index > currentStepIndex;
            const historyItem = getHistoryItem(status);

            let circleClass = 'bg-white border-2 border-slate-300 text-slate-400';
            if (isCompleted) {
              circleClass = 'bg-teal-600 border-2 border-teal-600 text-white shadow-xs';
            } else if (isCurrent) {
              circleClass = 'bg-teal-600 border-4 border-teal-100 text-white shadow-sm ring-4 ring-teal-500/15 scale-105';
            }

            return (
              <div
                key={status}
                className="flex flex-col items-center text-center relative z-10 flex-1 px-1"
              >
                {/* Node Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${circleClass}`}
                >
                  {getStepIcon(status, isCompleted)}
                </div>

                {/* Status Label */}
                <div className="mt-2.5">
                  <p
                    className={`text-xs sm:text-sm font-semibold tracking-tight ${
                      isCurrent
                        ? 'text-teal-900 font-bold'
                        : isCompleted
                        ? 'text-slate-800'
                        : 'text-slate-400 font-medium'
                    }`}
                  >
                    {status}
                  </p>

                  {/* Timestamp if reached */}
                  {showDetails && historyItem && (
                    <p className="text-[11px] text-slate-500 mt-0.5 whitespace-nowrap">
                      {formatTime(historyItem.timestamp)}
                    </p>
                  )}

                  {isPending && (
                    <p className="text-[11px] text-slate-300 mt-0.5">Upcoming</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Stepper View */}
        <div className="sm:hidden flex flex-col space-y-3 relative pl-4 border-l-2 border-slate-200 ml-4 my-2">
          {ORDER_STATUS_SEQUENCE.map((status, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const historyItem = getHistoryItem(status);

            let markerClass = 'bg-white border-2 border-slate-300 text-slate-400';
            if (isCompleted) {
              markerClass = 'bg-teal-600 border-2 border-teal-600 text-white';
            } else if (isCurrent) {
              markerClass = 'bg-teal-600 border-2 border-teal-100 text-white shadow-xs ring-2 ring-teal-500/20';
            }

            return (
              <div key={status} className="relative flex items-start gap-3 pl-2">
                <div
                  className={`-ml-[25px] w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${markerClass}`}
                >
                  {getStepIcon(status, isCompleted)}
                </div>

                <div className="flex-1 pb-1">
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-xs font-semibold ${
                        isCurrent
                          ? 'text-teal-900 font-bold'
                          : isCompleted
                          ? 'text-slate-800'
                          : 'text-slate-400'
                      }`}
                    >
                      {status}
                      {isCurrent && (
                        <span className="ml-2 text-[10px] font-bold px-2 py-0.2 bg-teal-100 text-teal-800 rounded-full">
                          Current
                        </span>
                      )}
                    </p>
                    {historyItem && (
                      <span className="text-[10px] text-slate-400">
                        {formatTime(historyItem.timestamp)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Pure vertical layout
  return (
    <div className="relative pl-5 border-l-2 border-slate-200 ml-3 space-y-4 py-1">
      {ORDER_STATUS_SEQUENCE.map((status, index) => {
        const isCompleted = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;
        const historyItem = getHistoryItem(status);

        let markerClass = 'bg-white border-2 border-slate-300 text-slate-400';
        if (isCompleted) {
          markerClass = 'bg-teal-600 border-2 border-teal-600 text-white';
        } else if (isCurrent) {
          markerClass = 'bg-teal-600 border-2 border-teal-200 text-white ring-2 ring-teal-500/20';
        }

        return (
          <div key={status} className="relative flex items-start gap-3">
            <div
              className={`-ml-[27px] w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${markerClass}`}
            >
              {getStepIcon(status, isCompleted)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold ${isCurrent ? 'text-teal-900 font-bold' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                  {status}
                </span>
                {historyItem && (
                  <span className="text-[11px] text-slate-400">
                    {formatTime(historyItem.timestamp)}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
