import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import type { LucideIcon } from 'lucide-react';
import { getInitials } from '../../types/user';
import {
  LayoutDashboard,
  PlusCircle,
  Search,
  History,
  Bell,
  HelpCircle,
  Layers,
  Sparkles,
  Archive,
  Settings,
  LogOut,
  X,
  Waves
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  badge?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { role, logout, student, staff } = useAuth();
  const { unreadNotificationCount } = useOrders();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const studentNavItems: NavItem[] = [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Place Laundry Request', path: '/student/new-request', icon: PlusCircle },
    { label: 'Track My Laundry', path: '/student/track', icon: Search },
    { label: 'Order History', path: '/student/history', icon: History },
    {
      label: 'Notifications',
      path: '/student/notifications',
      icon: Bell,
      badge: unreadNotificationCount > 0 ? unreadNotificationCount : undefined
    },
    { label: 'Campus Guidelines & FAQ', path: '/student/help', icon: HelpCircle }
  ];

  const staffNavItems: NavItem[] = [
    { label: 'Dashboard', path: '/staff/dashboard', icon: LayoutDashboard },
    { label: 'Manage All Orders', path: '/staff/orders', icon: Layers },
    { label: 'Register Walk-in Order', path: '/staff/new-order', icon: PlusCircle },
    { label: 'Ready for Collection', path: '/staff/ready', icon: Sparkles },
    { label: 'Completed Archive', path: '/staff/completed', icon: Archive },
    { label: 'Settings & Demo Reset', path: '/staff/settings', icon: Settings }
  ];

  const navItems = role === 'student' ? studentNavItems : staffNavItems;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200/90 text-slate-700 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-xs">
              <Waves className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-slate-900">
                Laundry<span className="text-teal-600">Track</span>
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">
                {role === 'student' ? 'Student Workspace' : 'Staff Operations'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 lg:hidden"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Navigation
          </p>

          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose()}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-600 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Card & Logout Footer */}
        <div className="p-3 border-t border-slate-100 space-y-2 bg-slate-50/50">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200/70 flex items-center gap-2.5">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                role === 'student' ? 'bg-navy-900 text-white' : 'bg-teal-600 text-white'
              }`}
            >
              {getInitials(role === 'student' ? student.name : staff.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">
                {role === 'student' ? student.name : staff.name}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {role === 'student' ? student.regNo : staff.roleTitle}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Switch Role / Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
