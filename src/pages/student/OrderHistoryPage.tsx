import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { OrderTable } from '../../components/orders/OrderTable';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

export const OrderHistoryPage: React.FC = () => {
  const { studentOrders, studentStats } = useOrders();
  const { student } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'ALL' | 'ACTIVE' | 'READY' | 'COLLECTED'>('ALL');

  // Filter orders according to tab
  const tabFilteredOrders = studentOrders.filter(order => {
    if (activeTab === 'ACTIVE') {
      return ['Submitted', 'Received', 'Washing'].includes(order.currentStatus);
    }
    if (activeTab === 'READY') {
      return order.currentStatus === 'Ready';
    }
    if (activeTab === 'COLLECTED') {
      return order.currentStatus === 'Collected';
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Order History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Past and active laundry submissions for {student.name} ({student.regNo})
          </p>
        </div>

        <button
          onClick={() => navigate('/student/new-request')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-xs active:scale-98 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Laundry Request</span>
        </button>
      </div>

      {/* Clean Tab Segment Navigation */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit text-xs">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            activeTab === 'ALL'
              ? 'bg-white text-slate-900 shadow-2xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Orders ({studentStats.total})
        </button>

        <button
          onClick={() => setActiveTab('ACTIVE')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            activeTab === 'ACTIVE'
              ? 'bg-white text-blue-700 shadow-2xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Active ({studentStats.activeCount})
        </button>

        <button
          onClick={() => setActiveTab('READY')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            activeTab === 'READY'
              ? 'bg-white text-teal-800 shadow-2xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Ready for Pickup ({studentStats.ready})
        </button>

        <button
          onClick={() => setActiveTab('COLLECTED')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            activeTab === 'COLLECTED'
              ? 'bg-white text-emerald-700 shadow-2xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Completed ({studentStats.collected})
        </button>
      </div>

      {/* Orders Table */}
      <OrderTable
        orders={tabFilteredOrders}
        showStaffControls={false}
        emptyAction={{
          label: 'Submit Laundry Request',
          onClick: () => navigate('/student/new-request')
        }}
      />
    </div>
  );
};
