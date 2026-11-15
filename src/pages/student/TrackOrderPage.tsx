import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ProgressTimeline } from '../../components/tracking/ProgressTimeline';
import { CollectionBanner } from '../../components/tracking/CollectionBanner';
import {
  Search,
  Clock,
  AlertCircle,
  FileText,
  RotateCcw
} from 'lucide-react';

export const TrackOrderPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getOrder, studentOrders, orders } = useOrders();

  // URL search parameter is the single source of truth
  const urlOrderId = searchParams.get('orderId') || '';
  const currentTargetId = urlOrderId || (studentOrders.length > 0 ? studentOrders[0].id : '');

  const [inputOrderId, setInputOrderId] = useState(urlOrderId || currentTargetId);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputOrderId.trim().toUpperCase();
    if (clean) {
      setSearchParams({ orderId: clean });
    }
  };

  const handleSelectQuickOrder = (id: string) => {
    setInputOrderId(id);
    setSearchParams({ orderId: id });
  };

  const order = currentTargetId ? getOrder(currentTargetId) : undefined;

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
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Track My Laundry
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Monitor your clothes through the 5-stage cleaning and collection process.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-3">
        <form onSubmit={handleSearch} className="flex items-center gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inputOrderId}
              onChange={e => setInputOrderId(e.target.value)}
              placeholder="Enter Order ID (e.g. LT-2026-0003)..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm font-mono bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 uppercase tracking-wider transition-all placeholder:font-sans placeholder:normal-case placeholder:tracking-normal placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-xl font-bold text-xs sm:text-sm bg-teal-600 hover:bg-teal-700 active:scale-98 text-white transition-all shadow-xs"
          >
            Track
          </button>
        </form>

        {/* Quick select from recent orders */}
        {studentOrders.length > 0 && (
          <div className="pt-2 border-t border-slate-100 flex items-center flex-wrap gap-1.5 text-xs">
            <span className="text-slate-400 font-medium">Quick select:</span>
            {studentOrders.slice(0, 4).map(o => (
              <button
                key={o.id}
                type="button"
                onClick={() => handleSelectQuickOrder(o.id)}
                className={`px-2 py-0.5 rounded-lg font-mono text-[11px] font-semibold transition-all ${
                  currentTargetId === o.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {o.id} ({o.currentStatus})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Result Section */}
      {currentTargetId && !order ? (
        /* Invalid Order ID Error State */
        <div className="bg-white rounded-2xl border border-red-200 p-6 text-center space-y-3 shadow-2xs animate-in fade-in">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              No Laundry Order Found for "{currentTargetId}"
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
              We couldn't locate an order with that ID. Please check the spelling or select an active order above.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5">
            {orders.slice(0, 3).map(o => (
              <button
                key={o.id}
                onClick={() => handleSelectQuickOrder(o.id)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono rounded-lg"
              >
                {o.id} ({o.currentStatus})
              </button>
            ))}
          </div>
        </div>
      ) : order ? (
        /* Valid Order Tracking Details */
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Main Status Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-5">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider block">
                  Campus Token ID
                </span>
                <span className="text-xl sm:text-2xl font-mono font-extrabold text-slate-900">
                  {order.id}
                </span>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Last Updated: {formatDate(order.lastUpdated)}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={order.currentStatus} size="lg" />
              </div>
            </div>

            {/* Collection Banner (When Ready or Collected) */}
            <CollectionBanner order={order} />

            {/* 5-Stage Visual Timeline */}
            <div className="bg-slate-50/70 p-4 sm:p-5 rounded-xl border border-slate-100 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  5-Stage Progress Timeline
                </h3>
                <span className="text-xs text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded-md">
                  Stage {['Submitted', 'Received', 'Washing', 'Ready', 'Collected'].indexOf(order.currentStatus) + 1} of 5
                </span>
              </div>

              <ProgressTimeline
                currentStatus={order.currentStatus}
                statusHistory={order.statusHistory}
                orientation="horizontal"
                showDetails={true}
              />
            </div>

            {/* Order Particulars Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Garment Details
                </span>
                <div className="flex justify-between">
                  <span className="text-slate-500">Clothes Count:</span>
                  <span className="font-semibold text-slate-800">{order.itemCount} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Category:</span>
                  <span className="font-semibold text-teal-700">{order.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kiosk Counter:</span>
                  <span className="text-slate-700">{order.kioskLocation || 'Central UniMall Hub'}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Student Record
                </span>
                <div className="flex justify-between">
                  <span className="text-slate-500">Student Name:</span>
                  <span className="font-semibold text-slate-800">{order.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Reg Number:</span>
                  <span className="font-mono text-slate-800">{order.regNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hostel Block:</span>
                  <span className="text-slate-700">{order.hostelBlock || 'Campus Hostels'}</span>
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            {order.specialInstructions && (
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2">
                <FileText className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Special Care Note: </span>
                  <span>{order.specialInstructions}</span>
                </div>
              </div>
            )}

            {/* Refresh action */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-400">
              <span>Read-only tracking mode</span>
              <button
                onClick={() => setSearchParams({ orderId: order.id })}
                className="text-teal-700 hover:text-teal-800 font-medium inline-flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Refresh Status</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
