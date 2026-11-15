import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { OrderTable } from '../../components/orders/OrderTable';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  Clock,
  Waves,
  Sparkles,
  CheckCircle2,
  PlusCircle,
  ArrowRight
} from 'lucide-react';

export const StaffDashboard: React.FC = () => {
  const { staff } = useAuth();
  const { orders, stats } = useOrders();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 sm:space-y-7">
      {/* Clean Operations Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200/60">
              Operations Control
            </span>
            <span className="text-xs text-slate-400">• {staff.assignedKiosk}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Laundry Desk Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Supervisor: <span className="font-semibold text-slate-700">{staff.name}</span> ({staff.employeeId}) • Shift: <span className="text-slate-700">{staff.shiftHours}</span>
          </p>
        </div>

        {/* Quick Intake Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/staff/orders')}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-98 transition-all shadow-2xs"
          >
            <Layers className="w-4 h-4 text-slate-400" />
            <span>All Orders</span>
          </button>

          <button
            onClick={() => navigate('/staff/new-order')}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-teal-600 text-white hover:bg-teal-700 active:scale-98 transition-all shadow-sm shadow-teal-600/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Walk-in Intake</span>
          </button>
        </div>
      </div>

      {/* 5 Operational Summary Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Total Orders */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Total Orders</span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">All campus orders</p>
        </div>

        {/* New / Submitted */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Submitted</span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">{stats.submitted}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Awaiting check-in</p>
        </div>

        {/* Being Washed */}
        <div className="bg-white p-4 rounded-xl border border-sky-100 bg-sky-50/20 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-sky-800">In Wash / Dry</span>
            <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <Waves className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-sky-700">{stats.washing}</p>
          <p className="text-[11px] text-sky-600 mt-0.5">In wash drums</p>
        </div>

        {/* Ready for Collection */}
        <div className="bg-white p-4 rounded-xl border border-teal-200 bg-teal-50/20 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-teal-800">Ready for Pickup</span>
            <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-teal-800">{stats.ready}</p>
          <p className="text-[11px] text-teal-600 mt-0.5">Packed on shelf</p>
        </div>

        {/* Collected */}
        <div className="bg-white p-4 rounded-xl border border-emerald-100 bg-emerald-50/20 shadow-2xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-emerald-800">Collected</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-emerald-700">{stats.collected}</p>
          <p className="text-[11px] text-emerald-600 mt-0.5">Completed</p>
        </div>
      </div>

      {/* Orders Table with Staff Controls */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Active Processing Queue</h2>
            <p className="text-xs text-slate-500">
              Advance orders with 1 click: Submitted → Received → Washing → Ready → Collected
            </p>
          </div>

          <button
            onClick={() => navigate('/staff/orders')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 hover:underline"
          >
            <span>Full Order Management</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <OrderTable
          orders={orders}
          showStaffControls={true}
          limit={7}
          emptyAction={{
            label: 'Register Walk-in Order',
            onClick: () => navigate('/staff/new-order')
          }}
        />
      </div>
    </div>
  );
};
