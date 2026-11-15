import React from 'react';
import { useOrders } from '../../context/OrderContext';
import { OrderTable } from '../../components/orders/OrderTable';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  PlusCircle
} from 'lucide-react';

export const ManageOrdersPage: React.FC = () => {
  const { orders, stats } = useOrders();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5 text-teal-600" />
            <span>Central Campus Laundry Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
            Manage Laundry Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Search orders by ID or student name, inspect garments, and advance order statuses in real time.
          </p>
        </div>

        <button
          onClick={() => navigate('/staff/new-order')}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-navy-900 hover:bg-navy-800 text-white shadow-md shadow-navy-950/20 active:scale-98 transition-all"
        >
          <PlusCircle className="w-4 h-4 stroke-[2.2]" />
          <span>New Laundry Intake</span>
        </button>
      </div>

      {/* Quick Summary Pill Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
          <span className="text-slate-500 font-medium">All Orders</span>
          <span className="font-extrabold text-slate-800 text-sm">{stats.total}</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
          <span className="text-slate-500 font-medium">Submitted</span>
          <span className="font-extrabold text-slate-700 text-sm">{stats.submitted}</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
          <span className="text-slate-500 font-medium">Washing</span>
          <span className="font-extrabold text-cyan-700 text-sm">{stats.washing}</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-teal-200 bg-teal-50/30 text-xs flex items-center justify-between">
          <span className="text-teal-800 font-semibold">Ready for Pickup</span>
          <span className="font-extrabold text-teal-900 text-sm">{stats.ready}</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
          <span className="text-slate-500 font-medium">Collected</span>
          <span className="font-extrabold text-emerald-800 text-sm">{stats.collected}</span>
        </div>
      </div>

      {/* Main Order Table with Staff Controls Enabled */}
      <OrderTable
        orders={orders}
        showStaffControls={true}
        emptyAction={{
          label: 'Register First Walk-in Order',
          onClick: () => navigate('/staff/new-order')
        }}
      />
    </div>
  );
};
