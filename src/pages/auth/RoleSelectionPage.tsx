import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import {
  Waves,
  User,
  ShieldCheck,
  ArrowRight,
  GraduationCap,
  RefreshCw,
  Check
} from 'lucide-react';

export const RoleSelectionPage: React.FC = () => {
  const { loginAs, student, staff } = useAuth();
  const { resetData } = useOrders();
  const navigate = useNavigate();

  const handleEnterStudent = () => {
    loginAs('student');
    navigate('/student/dashboard');
  };

  const handleEnterStaff = () => {
    loginAs('staff');
    navigate('/staff/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Academic Ribbon */}
      <header className="bg-white border-b border-slate-200/80 py-2.5 px-4 text-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <GraduationCap className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span>Lovely Professional University • Academic Design Thinking Project (INT335, P21)</span>
          </div>

          <button
            onClick={resetData}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 sm:py-14">
        <div className="max-w-3xl w-full space-y-8 text-center">
          {/* Header & Problem Statement */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
              <Waves className="w-3.5 h-3.5 text-teal-600" />
              <span>LPU Campus Laundry System</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Laundry<span className="text-teal-600">Track</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
              Transparent 5-stage laundry tracking for campus hostellers and efficient operations for laundry desk staff.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
            {/* Student Portal Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                  <User className="w-5 h-5" />
                </div>

                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">Student Portal</h2>
                  <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60">
                    Hosteller
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Submit clothes, track 5-stage wash status, view order history, and receive collection notifications.
                </p>

                {/* Persona preview */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-0.5">
                  <p className="font-bold text-slate-800">{student.name}</p>
                  <p className="text-[11px] text-slate-500">Reg No: {student.regNo} • {student.hostelBlock}</p>
                </div>

                <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-teal-600" />
                    <span>Generate digital order slips</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-teal-600" />
                    <span>Live 5-stage progress tracker</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-teal-600" />
                    <span>Pickup desk notifications</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleEnterStudent}
                className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-teal-600 hover:bg-teal-700 text-white shadow-2xs transition-all"
              >
                <span>Enter as Student</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Staff Portal Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>

                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">Staff Portal</h2>
                  <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                    Operations
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Manage orders, advance statuses through wash/ready/collected, and register walk-in laundry.
                </p>

                {/* Persona preview */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-0.5">
                  <p className="font-bold text-slate-800">{staff.name}</p>
                  <p className="text-[11px] text-slate-500">{staff.roleTitle} • {staff.assignedKiosk}</p>
                </div>

                <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-teal-600" />
                    <span>1-click status advancement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-teal-600" />
                    <span>Search orders by token or name</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-teal-600" />
                    <span>Walk-in laundry intake</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleEnterStaff}
                className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-2xs transition-all"
              >
                <span>Enter as Staff</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-200/80 bg-white">
        <p>Lovely Professional University • INT335 Design Thinking (Group P21) • LaundryTrack</p>
      </footer>
    </div>
  );
};
