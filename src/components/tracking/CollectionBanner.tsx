import React from 'react';
import type { Order } from '../../types/order';
import { Sparkles, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CollectionBannerProps {
  order: Order;
}

export const CollectionBanner: React.FC<CollectionBannerProps> = ({ order }) => {
  if (order.currentStatus === 'Ready') {
    return (
      <div className="rounded-2xl bg-gradient-to-r from-teal-50/90 via-emerald-50/60 to-teal-50/90 border border-teal-200 p-5 sm:p-6 shadow-xs animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-teal-200/70">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm shadow-teal-600/20 flex-shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                  Ready For Pickup
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                Your clean laundry is ready for collection!
              </h3>
            </div>
          </div>

          <div className="sm:text-right bg-white/80 sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-teal-100">
            <span className="text-xs text-slate-500 font-medium block">Collection Token</span>
            <span className="text-xl sm:text-2xl font-mono font-extrabold tracking-wider text-teal-700">
              {order.id}
            </span>
          </div>
        </div>

        {/* 3 Clean Details Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
          <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-teal-100/80 shadow-2xs">
            <div className="p-2 rounded-lg bg-teal-50 text-teal-700 flex-shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-500 font-medium">Pickup Desk</p>
              <p className="text-sm font-semibold text-slate-800 truncate mt-0.5">
                {order.kioskLocation || 'Central UniMall Hub (Counter #2)'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-teal-100/80 shadow-2xs">
            <div className="p-2 rounded-lg bg-teal-50 text-teal-700 flex-shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Counter Timings</p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                09:00 AM – 07:00 PM
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-teal-100/80 shadow-2xs">
            <div className="p-2 rounded-lg bg-teal-50 text-teal-700 flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Verification</p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                Show Token ID or Student ID Card
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-teal-100/60 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
          <span>Please collect your packaged garments within 48 hours. Items are neatly folded and steam pressed.</span>
        </p>
      </div>
    );
  }

  if (order.currentStatus === 'Collected') {
    const collectedHistory = order.statusHistory.find(h => h.status === 'Collected');
    const collectedTime = collectedHistory
      ? new Date(collectedHistory.timestamp).toLocaleString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : null;

    return (
      <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200 p-5 shadow-xs animate-in fade-in">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-emerald-600/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h4 className="text-base font-bold text-slate-900">
                Order Completed & Collected
              </h4>
              {collectedTime && (
                <span className="text-xs font-medium text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  Handed over on {collectedTime}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              This order ({order.id}) with {order.itemCount} items was collected by the student. Thank you for using LPU LaundryTrack!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
