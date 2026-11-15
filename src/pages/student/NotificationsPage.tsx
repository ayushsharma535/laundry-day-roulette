import React from 'react';
import { useOrders } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../../components/common/EmptyState';
import {
  CheckCheck,
  ExternalLink,
  Sparkles,
  PackageCheck,
  Waves,
  CheckCircle2,
  Clock,
  Inbox
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { studentNotifications, markNotificationRead, markAllNotificationsRead } = useOrders();
  const navigate = useNavigate();

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getNotifIcon = (title: string) => {
    if (title.includes('Ready')) return <Sparkles className="w-4 h-4 text-teal-600" />;
    if (title.includes('Received')) return <PackageCheck className="w-4 h-4 text-blue-600" />;
    if (title.includes('Washing')) return <Waves className="w-4 h-4 text-sky-600" />;
    if (title.includes('Collected')) return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    return <Clock className="w-4 h-4 text-slate-500" />;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time milestone updates for your submitted clothes.
          </p>
        </div>

        {studentNotifications.some(n => !n.read) && (
          <button
            onClick={markAllNotificationsRead}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors border border-teal-200/80"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark All Read</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      {studentNotifications.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No notifications"
          description="You will receive alerts here whenever your clothes are received, washed, or ready for pickup."
          actionLabel="Place a Request"
          onAction={() => navigate('/student/new-request')}
        />
      ) : (
        <div className="space-y-2.5">
          {studentNotifications.map(item => (
            <div
              key={item.id}
              onClick={() => markNotificationRead(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                item.read
                  ? 'bg-white border-slate-200/70 text-slate-600'
                  : 'bg-teal-50/20 border-teal-200/90 shadow-2xs text-slate-900'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    item.read ? 'bg-slate-100' : 'bg-teal-50 border border-teal-200'
                  }`}
                >
                  {getNotifIcon(item.title)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {item.title}
                      </h4>
                      {!item.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 inline-block" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                      {formatDate(item.timestamp)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {item.message}
                  </p>

                  <div className="mt-2.5 flex items-center gap-3 text-xs font-semibold">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        markNotificationRead(item.id);
                        navigate(`/student/track?orderId=${encodeURIComponent(item.orderId)}`);
                      }}
                      className="text-teal-700 hover:text-teal-800 inline-flex items-center gap-1"
                    >
                      <span>Track {item.orderId}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
