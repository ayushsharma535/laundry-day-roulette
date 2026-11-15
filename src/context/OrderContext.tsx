import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { Order, OrderStatus } from '../types/order';
import type { AppNotification } from '../types/notification';
import type { CreateOrderParams } from '../services/orderService';
import {
  getAllOrders,
  getOrderById,
  createNewOrder,
  updateOrderStatus as updateOrderInService,
  getNextStatus,
  resetOrdersDemoData
} from '../services/orderService';
import {
  getAllNotifications,
  markNotificationAsRead as markReadInService,
  markAllNotificationsAsRead as markAllReadInService
} from '../services/notificationService';
import { STORAGE_UPDATE_EVENT } from '../services/storageService';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface OrderStats {
  total: number;
  submitted: number;
  received: number;
  washing: number;
  ready: number;
  collected: number;
  activeCount: number; // submitted + received + washing
}

interface OrderContextType {
  orders: Order[];
  studentOrders: Order[];
  notifications: AppNotification[];
  studentNotifications: AppNotification[];
  unreadNotificationCount: number;
  stats: OrderStats;
  studentStats: OrderStats;
  placeOrder: (params: CreateOrderParams) => Order;
  updateStatus: (id: string, newStatus: OrderStatus, note?: string) => Order | null;
  advanceStatus: (id: string, note?: string) => Order | null;
  getOrder: (id: string) => Order | undefined;
  resetData: () => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  refreshData: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { student, staff } = useAuth();
  const { showToast } = useToast();

  const [orders, setOrders] = useState<Order[]>(() => getAllOrders());
  const [notifications, setNotifications] = useState<AppNotification[]>(() => getAllNotifications());

  const refreshData = useCallback(() => {
    setOrders(getAllOrders());
    setNotifications(getAllNotifications());
  }, []);

  // Listen for storage events (across tabs and internal triggers)
  useEffect(() => {
    const handleUpdate = () => {
      refreshData();
    };

    window.addEventListener(STORAGE_UPDATE_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(STORAGE_UPDATE_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [refreshData]);

  const studentOrders = useMemo(() => {
    return orders.filter(o => o.regNo === student.regNo);
  }, [orders, student.regNo]);

  const studentNotifications = useMemo(() => {
    return notifications.filter(n => !n.targetRegNo || n.targetRegNo === student.regNo);
  }, [notifications, student.regNo]);

  const unreadNotificationCount = useMemo(() => {
    return studentNotifications.filter(n => !n.read).length;
  }, [studentNotifications]);

  const calculateStats = (list: Order[]): OrderStats => {
    const total = list.length;
    let submitted = 0;
    let received = 0;
    let washing = 0;
    let ready = 0;
    let collected = 0;

    for (const order of list) {
      switch (order.currentStatus) {
        case 'Submitted':
          submitted++;
          break;
        case 'Received':
          received++;
          break;
        case 'Washing':
          washing++;
          break;
        case 'Ready':
          ready++;
          break;
        case 'Collected':
          collected++;
          break;
      }
    }

    return {
      total,
      submitted,
      received,
      washing,
      ready,
      collected,
      activeCount: submitted + received + washing
    };
  };

  const stats = useMemo(() => calculateStats(orders), [orders]);
  const studentStats = useMemo(() => calculateStats(studentOrders), [studentOrders]);

  const placeOrder = useCallback((params: CreateOrderParams): Order => {
    const created = createNewOrder(params);
    refreshData();
    showToast(
      `Order ${created.id} created successfully with ${created.itemCount} items!`,
      'success',
      'Laundry Request Placed'
    );
    return created;
  }, [refreshData, showToast]);

  const updateStatus = useCallback((
    id: string,
    newStatus: OrderStatus,
    note?: string
  ): Order | null => {
    const updated = updateOrderInService(id, newStatus, note, staff.name);
    if (updated) {
      refreshData();
      showToast(
        `Order ${id} status updated to "${newStatus}"`,
        'success',
        'Status Updated'
      );
    } else {
      showToast(`Could not update order ${id}. Not found.`, 'error');
    }
    return updated;
  }, [refreshData, showToast, staff.name]);

  const advanceStatus = useCallback((id: string, note?: string): Order | null => {
    const current = getOrderById(id);
    if (!current) {
      showToast(`Order ${id} not found.`, 'error');
      return null;
    }
    const next = getNextStatus(current.currentStatus);
    if (!next) {
      showToast(`Order ${id} is already in final status (${current.currentStatus}).`, 'info');
      return current;
    }
    return updateStatus(id, next, note);
  }, [updateStatus, showToast]);

  const getOrder = useCallback((id: string): Order | undefined => {
    return getOrderById(id);
  }, []);

  const resetData = useCallback(() => {
    resetOrdersDemoData();
    refreshData();
    showToast('Demo data successfully restored to default state.', 'info', 'Data Reset');
  }, [refreshData, showToast]);

  const markNotificationRead = useCallback((id: string) => {
    markReadInService(id);
    refreshData();
  }, [refreshData]);

  const markAllNotificationsRead = useCallback(() => {
    markAllReadInService(student.regNo);
    refreshData();
    showToast('All notifications marked as read', 'info');
  }, [refreshData, student.regNo, showToast]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        studentOrders,
        notifications,
        studentNotifications,
        unreadNotificationCount,
        stats,
        studentStats,
        placeOrder,
        updateStatus,
        advanceStatus,
        getOrder,
        resetData,
        markNotificationRead,
        markAllNotificationsRead,
        refreshData
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
