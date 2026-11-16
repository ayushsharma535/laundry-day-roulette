import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  CheckCircle2,
  Copy,
  Check,
  Search,
  LayoutDashboard,
  AlertCircle
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrder } = useOrders();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const order = orderId ? getOrder(orderId) : undefined;

  const handleCopy = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!order) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Order Slip Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested confirmation slip could not be found.
        </p>
        <button
          onClick={() => navigate('/student/dashboard')}
          className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-5 animate-in zoom-in-95 duration-200">
      {/* Digital Receipt Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 text-center space-y-5">
        {/* Success Icon */}
        <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 border border-teal-200/70 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <h1 className="text-lg sm:text-xl font-bold text-slate-900">
            Laundry Request Confirmed!
          </h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Your intake token has been created and registered in the system.
          </p>
        </div>

        {/* Unique Token Display Box */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1.5">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
            Digital Token ID
          </span>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl sm:text-3xl font-mono font-extrabold tracking-widest text-teal-700">
              {order.id}
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
              title="Copy Order ID"
            >
              {copied ? <Check className="w-4 h-4 text-teal-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-500 pt-0.5">
            Please retain this Order ID. Hand over your clothes at the counter with this token.
          </p>
        </div>

        {/* Metadata Breakdown */}
        <div className="text-xs space-y-2 py-2 border-y border-slate-100 text-left">
          <div className="flex justify-between">
            <span className="text-slate-500">Student:</span>
            <span className="font-semibold text-slate-800">{order.studentName} ({order.regNo})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Hostel:</span>
            <span className="text-slate-800 font-medium">{order.hostelBlock}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Clothes Count:</span>
            <span className="font-semibold text-slate-800">{order.itemCount} items ({order.category})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Submitted At:</span>
            <span className="text-slate-800 font-medium">{formatDate(order.submissionDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Drop-off Kiosk:</span>
            <span className="text-slate-800">{order.kioskLocation || 'UniMall Kiosk'}</span>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-slate-500">Initial Status:</span>
            <StatusBadge status={order.currentStatus} size="sm" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
          <button
            onClick={() => navigate(`/student/track?orderId=${encodeURIComponent(order.id)}`)}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-teal-600 hover:bg-teal-700 active:scale-98 text-white shadow-xs transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Track Order</span>
          </button>

          <button
            onClick={() => navigate('/student/dashboard')}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-700 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
