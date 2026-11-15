import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import {
  RefreshCw,
  Building
} from 'lucide-react';

export const StaffSettingsPage: React.FC = () => {
  const { staff } = useAuth();
  const { resetData, stats } = useOrders();
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const handleConfirmReset = () => {
    resetData();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Staff Settings & Controls
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Campus kiosk operational configuration and demo evaluation dataset controls.
        </p>
      </div>

      {/* Demo Evaluation Controls */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Reset Demo Evaluation Data
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 max-w-md">
              Restores the default dataset of 10 sample LPU hosteller orders across all 5 stages.
            </p>
          </div>

          <button
            onClick={() => setIsResetDialogOpen(true)}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs text-white bg-slate-900 hover:bg-slate-800 active:scale-98 transition-all shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Orders</span>
          </button>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Total Orders:</span>
            <span className="text-sm font-bold text-slate-800">{stats.total}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">In Wash:</span>
            <span className="text-sm font-bold text-sky-700">{stats.washing}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Ready on Shelf:</span>
            <span className="text-sm font-bold text-teal-700">{stats.ready}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Collected:</span>
            <span className="text-sm font-bold text-emerald-700">{stats.collected}</span>
          </div>
        </div>
      </div>

      {/* Campus Kiosk Operational Details */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Building className="w-4 h-4 text-teal-600" />
          <span>Assigned Kiosk Station Profile</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 block font-medium">Assigned Kiosk</span>
            <span className="font-semibold text-slate-800 mt-0.5 block">{staff.assignedKiosk}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 block font-medium">Staff Supervisor</span>
            <span className="font-semibold text-slate-800 mt-0.5 block">{staff.name} ({staff.employeeId})</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 block font-medium">Shift Timings</span>
            <span className="font-semibold text-slate-800 mt-0.5 block">{staff.shiftHours}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 block font-medium">Detergent Formulation</span>
            <span className="font-semibold text-teal-700 mt-0.5 block">Eco-friendly Bio Formula</span>
          </div>
        </div>
      </div>

      {/* Academic Project Credits */}
      <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200/60 text-xs text-slate-600 space-y-1">
        <p className="font-bold text-slate-800">Lovely Professional University (LPU) • INT335 Design Thinking (P21)</p>
        <p className="text-[11px] text-slate-500">
          Double diamond design thinking project addressing hosteller garment queue visibility and counter operations.
        </p>
      </div>

      {/* Confirm Reset Dialog */}
      <ConfirmDialog
        isOpen={isResetDialogOpen}
        onClose={() => setIsResetDialogOpen(false)}
        onConfirm={handleConfirmReset}
        title="Reset Demo Data?"
        message="This will re-seed all sample orders to the initial 10 orders."
        confirmLabel="Reset Data"
        variant="warning"
      />
    </div>
  );
};
