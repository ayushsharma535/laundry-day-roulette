import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { OrderTable } from '../../components/orders/OrderTable';
import { CollectionBanner } from '../../components/tracking/CollectionBanner';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  Sparkles,
  Layers,
  Clock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { student } = useAuth();
  const { studentOrders, studentStats } = useOrders();
  const navigate = useNavigate();

  // Find if student has any order that is currently 'Ready'
  const readyOrder = studentOrders.find(o => o.currentStatus === 'Ready');

  return (
    <div className="space-y-6 sm:space-y-7">
      {/* Welcome & Actions Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/60">
              Hosteller Workspace
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Welcome, {student.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Hostel <span className="font-semibold text-slate-700">{student.hostelBlock}</span> (Room {student.roomNumber}) • Reg No: <span className="font-mono text-slate-700">{student.regNo}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/student/track')}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-98 transition-all shadow-2xs"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span>Track Laundry</span>
          </button>

          <button
            onClick={() => navigate('/student/new-request')}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-teal-600 text-white hover:bg-teal-700 active:scale-98 transition-all shadow-sm shadow-teal-600/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Request</span>
          </button>
        </div>
      </div>

      {/* Prominent Collection Alert Banner if any order is Ready */}
      {readyOrder && (
        <CollectionBanner order={readyOrder} />
      )}

      {/* 4 Minimal Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Total Requests</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{studentStats.total}</span>
            <span className="text-xs text-slate-400">all time</span>
          </div>
        </div>

        {/* Active In-Progress */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">In Progress</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">{studentStats.activeCount}</span>
            <span className="text-xs text-blue-500 font-medium">in wash/queue</span>
          </div>
        </div>

        {/* Ready for Pickup */}
        <div
          className={`bg-white p-5 rounded-2xl border transition-all ${
            studentStats.ready > 0
              ? 'border-teal-300 bg-teal-50/20 shadow-xs ring-1 ring-teal-400/20'
              : 'border-slate-200/80 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-teal-800">Ready for Pickup</span>
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                studentStats.ready > 0 ? 'bg-teal-600 text-white shadow-xs' : 'bg-slate-100 text-slate-400'
              }`}
            >
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-teal-900">{studentStats.ready}</span>
            <span className="text-xs text-teal-700 font-medium">at desk</span>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Collected</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">{studentStats.collected}</span>
            <span className="text-xs text-slate-400">completed</span>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Recent Laundry Requests</h2>
            <p className="text-xs text-slate-500">View real-time status and pickup tokens</p>
          </div>

          <button
            onClick={() => navigate('/student/history')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 hover:underline"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <OrderTable
          orders={studentOrders}
          showStaffControls={false}
          limit={5}
          emptyAction={{
            label: 'Place Laundry Request',
            onClick: () => navigate('/student/new-request')
          }}
        />
      </div>
    </div>
  );
};
