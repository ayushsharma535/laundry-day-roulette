import React from 'react';
import { Modal } from '../common/Modal';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { User, ShieldCheck, RefreshCw, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { role, switchRole, student, staff } = useAuth();
  const { resetData } = useOrders();
  const navigate = useNavigate();

  const handleSelectRole = (newRole: 'student' | 'staff') => {
    switchRole(newRole);
    onClose();
    if (newRole === 'student') {
      navigate('/student/dashboard');
    } else {
      navigate('/staff/dashboard');
    }
  };

  const handleResetData = () => {
    resetData();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Switch Role"
      subtitle="Select which perspective to view"
      maxWidth="md"
    >
      <div className="space-y-3">
        {/* Student Option */}
        <div
          onClick={() => handleSelectRole('student')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            role === 'student'
              ? 'border-teal-600 bg-teal-50/40 ring-1 ring-teal-500/20'
              : 'border-slate-200 bg-white hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-slate-900">Student Portal</h4>
                  {role === 'student' && (
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.2 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  {student.name} • Reg No: {student.regNo} ({student.hostelBlock})
                </p>
              </div>
            </div>
            {role === 'student' && <Check className="w-4 h-4 text-teal-600" />}
          </div>
        </div>

        {/* Staff Option */}
        <div
          onClick={() => handleSelectRole('staff')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            role === 'staff'
              ? 'border-teal-600 bg-teal-50/40 ring-1 ring-teal-500/20'
              : 'border-slate-200 bg-white hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-slate-900">Staff Portal</h4>
                  {role === 'staff' && (
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.2 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  {staff.name} • {staff.roleTitle}
                </p>
              </div>
            </div>
            {role === 'staff' && <Check className="w-4 h-4 text-teal-600" />}
          </div>
        </div>

        {/* Reset Demo Data Action */}
        <div className="pt-2">
          <button
            onClick={handleResetData}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data to Initial 10 Orders</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
