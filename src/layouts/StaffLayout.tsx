import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/navigation/Sidebar';
import { Navbar } from '../components/navigation/Navbar';

export const StaffLayout: React.FC = () => {
  const { role, loginAs } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!role) {
      loginAs('staff');
    } else if (role !== 'staff') {
      navigate('/student/dashboard', { replace: true });
    }
  }, [role, loginAs, navigate]);

  return (
    <div className="min-h-screen bg-[#f5f7f4] flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onToggleSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
