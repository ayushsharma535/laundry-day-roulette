import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { RoleSwitcherModal } from './RoleSwitcherModal';
import { getInitials } from '../../types/user';
import {
  Bell,
  Menu,
  Repeat,
  Waves
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { role, switchRole, student, staff } = useAuth();
  const { unreadNotificationCount } = useOrders();
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleQuickSwitch = () => {
    if (role === 'student') {
      switchRole('staff');
      navigate('/staff/dashboard');
    } else {
      switchRole('student');
      navigate('/student/dashboard');
    }
  };

  const isStudent = role === 'student';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left Side: Menu button & clean branding */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-xs">
              <Waves className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-base tracking-tight text-slate-900">Laundry<span className="text-teal-600">Track</span></span>
              <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">LPU Campus</span>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Role Switcher, Notifications, Persona Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Clean Quick Role Switcher */}
          <button
            onClick={handleQuickSwitch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border border-slate-200 bg-slate-50/80 hover:bg-slate-100 text-slate-700 hover:text-slate-900 shadow-2xs"
            title="Toggle between Student and Staff view with 1 click"
          >
            <Repeat className="w-3.5 h-3.5 text-teal-600" />
            <span className="hidden xs:inline">
              {isStudent ? 'Switch to Staff' : 'Switch to Student'}
            </span>
            <span className="xs:hidden">Switch</span>
          </button>

          {/* Notification Bell (for Student) */}
          {isStudent && (
            <button
              onClick={() => navigate('/student/notifications')}
              className={`relative p-2 rounded-xl transition-colors ${
                location.pathname === '/student/notifications'
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Student Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-teal-500 ring-2 ring-white" />
              )}
            </button>
          )}

          {/* User Persona Pill & Switcher Trigger */}
          <button
            onClick={() => setIsSwitcherOpen(true)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200/80"
            title="Click to view or switch profile"
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                isStudent ? 'bg-navy-900 text-white' : 'bg-teal-600 text-white'
              }`}
            >
              {getInitials(isStudent ? student.name : staff.name)}
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-bold text-slate-800 leading-tight">
                {isStudent ? student.name : staff.name}
              </p>
              <p className="text-[11px] text-slate-400">
                {isStudent ? `${student.hostelBlock}` : 'Staff Desk'}
              </p>
            </div>
          </button>
        </div>
      </div>

      <RoleSwitcherModal
        isOpen={isSwitcherOpen}
        onClose={() => setIsSwitcherOpen(false)}
      />
    </header>
  );
};
