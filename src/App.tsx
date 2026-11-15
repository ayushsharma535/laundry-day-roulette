import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { OrderProvider } from './context/OrderContext';

// Layouts
import { StudentLayout } from './layouts/StudentLayout';
import { StaffLayout } from './layouts/StaffLayout';

// Auth / Landing Page
import { RoleSelectionPage } from './pages/auth/RoleSelectionPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { NewRequestPage } from './pages/student/NewRequestPage';
import { OrderConfirmationPage } from './pages/student/OrderConfirmationPage';
import { TrackOrderPage } from './pages/student/TrackOrderPage';
import { OrderHistoryPage } from './pages/student/OrderHistoryPage';
import { NotificationsPage } from './pages/student/NotificationsPage';
import { StudentHelpPage } from './pages/student/StudentHelpPage';

// Staff Pages
import { StaffDashboard } from './pages/staff/StaffDashboard';
import { ManageOrdersPage } from './pages/staff/ManageOrdersPage';
import { RegisterOrderPage } from './pages/staff/RegisterOrderPage';
import { ReadyOrdersPage } from './pages/staff/ReadyOrdersPage';
import { CompletedOrdersPage } from './pages/staff/CompletedOrdersPage';
import { StaffSettingsPage } from './pages/staff/StaffSettingsPage';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <OrderProvider>
            <Routes>
              {/* Landing & Role Selection Screen */}
              <Route path="/" element={<RoleSelectionPage />} />

              {/* Student Portal Routes */}
              <Route path="/student" element={<StudentLayout />}>
                <Route index element={<Navigate to="/student/dashboard" replace />} />
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="new-request" element={<NewRequestPage />} />
                <Route path="confirmation/:orderId" element={<OrderConfirmationPage />} />
                <Route path="track" element={<TrackOrderPage />} />
                <Route path="history" element={<OrderHistoryPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="help" element={<StudentHelpPage />} />
              </Route>

              {/* Staff Portal Routes */}
              <Route path="/staff" element={<StaffLayout />}>
                <Route index element={<Navigate to="/staff/dashboard" replace />} />
                <Route path="dashboard" element={<StaffDashboard />} />
                <Route path="orders" element={<ManageOrdersPage />} />
                <Route path="new-order" element={<RegisterOrderPage />} />
                <Route path="ready" element={<ReadyOrdersPage />} />
                <Route path="completed" element={<CompletedOrdersPage />} />
                <Route path="settings" element={<StaffSettingsPage />} />
              </Route>

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </OrderProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
