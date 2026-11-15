import React, { useState, useMemo } from 'react';
import type { Order, OrderStatus } from '../../types/order';
import { ORDER_STATUS_SEQUENCE } from '../../types/order';
import { StatusBadge } from '../common/StatusBadge';
import { OrderDetailsModal } from './OrderDetailsModal';
import { EmptyState } from '../common/EmptyState';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import {
  Search,
  Eye,
  ArrowRight,
  ExternalLink,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OrderTableProps {
  orders: Order[];
  title?: string;
  subtitle?: string;
  showStaffControls?: boolean;
  initialFilter?: OrderStatus | 'ALL';
  limit?: number;
  emptyAction?: { label: string; onClick: () => void };
}

export const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  title,
  subtitle,
  showStaffControls = false,
  initialFilter = 'ALL',
  limit,
  emptyAction
}) => {
  const { role } = useAuth();
  const { advanceStatus } = useOrders();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'ALL'>(initialFilter);
  const [inspectOrder, setInspectOrder] = useState<Order | null>(null);

  // Filter and search logic
  const filteredOrders = useMemo(() => {
    let result = orders;

    if (selectedStatus !== 'ALL') {
      result = result.filter(o => o.currentStatus === selectedStatus);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.studentName.toLowerCase().includes(q) ||
        o.regNo.toLowerCase().includes(q) ||
        o.category.toLowerCase().includes(q) ||
        (o.hostelBlock && o.hostelBlock.toLowerCase().includes(q))
      );
    }

    if (limit && limit > 0) {
      result = result.slice(0, limit);
    }

    return result;
  }, [orders, selectedStatus, searchQuery, limit]);

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getNextStageShortLabel = (st: OrderStatus): string | null => {
    switch (st) {
      case 'Submitted':
        return 'Receive';
      case 'Received':
        return 'Wash';
      case 'Washing':
        return 'Mark Ready';
      case 'Ready':
        return 'Handover';
      case 'Collected':
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* Table Header / Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {(title || subtitle) && (
            <div>
              {title && <h3 className="text-sm sm:text-base font-bold text-slate-900">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
            </div>
          )}

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by token, name..."
              className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs">
          <button
            onClick={() => setSelectedStatus('ALL')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all flex-shrink-0 ${
              selectedStatus === 'ALL'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({orders.length})
          </button>
          {ORDER_STATUS_SEQUENCE.map(st => {
            const count = orders.filter(o => o.currentStatus === st).length;
            const isSelected = selectedStatus === st;
            return (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all flex-shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-teal-700 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{st}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        {filteredOrders.length === 0 ? (
          <div className="p-8">
            <EmptyState
              title="No orders found"
              description={searchQuery ? `No orders matched "${searchQuery}".` : "No orders found in this category."}
              actionLabel={emptyAction?.label}
              onAction={emptyAction?.onClick}
            />
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-5">Token ID</th>
                {(showStaffControls || role === 'staff') && (
                  <th className="py-3 px-4">Student</th>
                )}
                <th className="py-3 px-4">Submission</th>
                <th className="py-3 px-4">Clothes Count</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right pr-5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredOrders.map(order => {
                const nextActionLabel = getNextStageShortLabel(order.currentStatus);

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/70 transition-colors group"
                  >
                    {/* Order ID */}
                    <td className="py-3 px-4 sm:px-5 font-mono font-bold text-slate-900">
                      <button
                        onClick={() => setInspectOrder(order)}
                        className="hover:text-teal-700 transition-colors"
                      >
                        {order.id}
                      </button>
                    </td>

                    {/* Student Info */}
                    {(showStaffControls || role === 'staff') && (
                      <td className="py-3 px-4">
                        <div>
                          <span className="font-semibold text-slate-900 block">
                            {order.studentName}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {order.regNo} • {order.hostelBlock}
                          </span>
                        </div>
                      </td>
                    )}

                    {/* Submission Date */}
                    <td className="py-3 px-4 text-slate-500">
                      {formatDate(order.submissionDate)}
                    </td>

                    {/* Items & Category */}
                    <td className="py-3 px-4">
                      <div>
                        <span className="font-medium text-slate-800">
                          {order.itemCount} items
                        </span>
                        <span className="text-[11px] text-slate-400 block">
                          {order.category}
                        </span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4">
                      <StatusBadge status={order.currentStatus} size="sm" />
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3 px-4 text-right pr-5">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* 1-click Advance Status button for staff */}
                        {(showStaffControls || role === 'staff') && nextActionLabel && (
                          <button
                            onClick={() => advanceStatus(order.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 active:scale-95 rounded-lg transition-all shadow-2xs"
                            title={`Advance order to next stage`}
                          >
                            <span>{nextActionLabel}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}

                        {/* View Details */}
                        <button
                          onClick={() => setInspectOrder(order)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Track button for Student */}
                        {role === 'student' && (
                          <button
                            onClick={() => navigate(`/student/track?orderId=${encodeURIComponent(order.id)}`)}
                            className="p-1.5 text-teal-600 hover:text-teal-800 hover:bg-teal-50 rounded-lg transition-colors"
                            title="Track Order"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden divide-y divide-slate-100">
        {filteredOrders.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title="No orders found"
              description="No orders match your filter."
              actionLabel={emptyAction?.label}
              onAction={emptyAction?.onClick}
            />
          </div>
        ) : (
          filteredOrders.map(order => {
            const nextActionLabel = getNextStageShortLabel(order.currentStatus);

            return (
              <div key={order.id} className="p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900 text-xs">
                    {order.id}
                  </span>
                  <StatusBadge status={order.currentStatus} size="sm" />
                </div>

                {(showStaffControls || role === 'staff') && (
                  <div className="text-xs text-slate-700">
                    <span className="font-semibold">{order.studentName}</span>
                    <span className="text-slate-400"> ({order.regNo} • {order.hostelBlock})</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{order.itemCount} items ({order.category})</span>
                  <span>{formatDate(order.submissionDate)}</span>
                </div>

                <div className="pt-1.5 flex items-center justify-end gap-2 border-t border-slate-50">
                  <button
                    onClick={() => setInspectOrder(order)}
                    className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg"
                  >
                    Details
                  </button>

                  {role === 'student' && (
                    <button
                      onClick={() => navigate(`/student/track?orderId=${encodeURIComponent(order.id)}`)}
                      className="px-2.5 py-1 text-xs font-medium text-teal-700 bg-teal-50 rounded-lg"
                    >
                      Track
                    </button>
                  )}

                  {(showStaffControls || role === 'staff') && nextActionLabel && (
                    <button
                      onClick={() => advanceStatus(order.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-teal-600 rounded-lg"
                    >
                      <span>{nextActionLabel}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Inspect Modal */}
      <OrderDetailsModal
        order={inspectOrder}
        isOpen={Boolean(inspectOrder)}
        onClose={() => setInspectOrder(null)}
      />
    </div>
  );
};
