import React from 'react';
import type { Order, OrderStatus } from '../../types/order';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import { ProgressTimeline } from '../tracking/ProgressTimeline';
import { CollectionBanner } from '../tracking/CollectionBanner';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import {
  Copy,
  Check,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose
}) => {
  const { role } = useAuth();
  const { advanceStatus } = useOrders();
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  if (!order) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTrackInPage = () => {
    onClose();
    navigate(`/student/track?orderId=${encodeURIComponent(order.id)}`);
  };

  const handleAdvance = () => {
    advanceStatus(order.id);
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getNextStageLabel = (st: OrderStatus): string | null => {
    switch (st) {
      case 'Submitted':
        return 'Receive at Desk';
      case 'Received':
        return 'Start Wash Drum';
      case 'Washing':
        return 'Mark Ready for Pickup';
      case 'Ready':
        return 'Complete Handover';
      case 'Collected':
        return null;
    }
  };

  const nextLabel = getNextStageLabel(order.currentStatus);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl">
      <div className="space-y-5">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-mono font-bold text-slate-900">
                {order.id}
              </span>
              <button
                onClick={handleCopyId}
                className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
                title="Copy Token ID"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Submitted on {formatDate(order.submissionDate)}
            </p>
          </div>

          <StatusBadge status={order.currentStatus} size="md" />
        </div>

        {/* Collection Notification if Ready or Collected */}
        {(order.currentStatus === 'Ready' || order.currentStatus === 'Collected') && (
          <CollectionBanner order={order} />
        )}

        {/* 5-Stage Stepper */}
        <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100">
          <ProgressTimeline
            currentStatus={order.currentStatus}
            statusHistory={order.statusHistory}
            orientation="horizontal"
          />
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1.5">
            <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">
              Student Details
            </span>
            <p className="font-semibold text-slate-800 text-sm">{order.studentName}</p>
            <p className="text-slate-500">Reg No: {order.regNo}</p>
            <p className="text-slate-500">Hostel: {order.hostelBlock || 'Campus Hostel'}</p>
            {order.contactNumber && (
              <p className="text-slate-500">Phone: {order.contactNumber}</p>
            )}
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1.5">
            <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">
              Order Details
            </span>
            <div className="flex justify-between">
              <span className="text-slate-500">Clothes Count:</span>
              <span className="font-bold text-slate-900">{order.itemCount} items</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Category:</span>
              <span className="font-semibold text-teal-700">{order.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Kiosk Counter:</span>
              <span className="text-slate-700">{order.kioskLocation || 'UniMall Kiosk'}</span>
            </div>
          </div>
        </div>

        {/* Special Instructions if provided */}
        {order.specialInstructions && (
          <div className="bg-amber-50/70 border border-amber-200/80 p-3 rounded-xl text-xs text-amber-900">
            <span className="font-bold block mb-0.5">Special Care Instructions:</span>
            <p>{order.specialInstructions}</p>
          </div>
        )}

        {/* Status Audit Log */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Status Audit Log
          </span>
          <div className="bg-slate-50/60 rounded-xl border border-slate-100 divide-y divide-slate-100 max-h-36 overflow-y-auto text-xs">
            {order.statusHistory.slice().reverse().map((item, idx) => (
              <div key={idx} className="p-2.5 flex items-start justify-between gap-3">
                <div>
                  <span className="font-bold text-slate-800">{item.status}</span>
                  {item.note && <p className="text-slate-500 text-[11px] mt-0.5">{item.note}</p>}
                </div>
                <span className="text-[10px] text-slate-400 whitespace-nowrap">
                  {formatDate(item.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          {role === 'student' ? (
            <button
              onClick={handleTrackInPage}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Full Tracking Page</span>
            </button>
          ) : (
            <div>
              {nextLabel ? (
                <button
                  onClick={handleAdvance}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs"
                >
                  <span>{nextLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-xs text-slate-400 italic">Order completed</span>
              )}
            </div>
          )}

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
