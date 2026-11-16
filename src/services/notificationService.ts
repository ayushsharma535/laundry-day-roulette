import type { AppNotification } from '../types/notification';
import type { Order, OrderStatus } from '../types/order';
import { getStoredNotifications, saveStoredNotifications } from './storageService';

export const getAllNotifications = (): AppNotification[] => {
  return getStoredNotifications();
};

export const getNotificationsForStudent = (regNo?: string): AppNotification[] => {
  const notifs = getStoredNotifications();
  if (!regNo) return notifs;
  // Show student-specific notifications as well as general ones
  return notifs.filter(n => !n.targetRegNo || n.targetRegNo === regNo);
};

export const markNotificationAsRead = (id: string): void => {
  const notifs = getStoredNotifications();
  const updated = notifs.map(n => n.id === id ? { ...n, read: true } : n);
  saveStoredNotifications(updated);
};

export const markAllNotificationsAsRead = (regNo?: string): void => {
  const notifs = getStoredNotifications();
  const updated = notifs.map(n => {
    if (!regNo || !n.targetRegNo || n.targetRegNo === regNo) {
      return { ...n, read: true };
    }
    return n;
  });
  saveStoredNotifications(updated);
};

export const createNotificationForNewOrder = (order: Order): void => {
  const notifs = getStoredNotifications();
  const newNotif: AppNotification = {
    id: `NOTIF-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    orderId: order.id,
    title: 'Order Submitted Successfully 📝',
    message: `${order.studentName}, your laundry order ${order.id} with ${order.itemCount} items has been placed. Drop it off at ${order.kioskLocation || 'UniMall Kiosk'}.`,
    timestamp: new Date().toISOString(),
    read: false,
    type: 'info',
    targetRegNo: order.regNo
  };
  saveStoredNotifications([newNotif, ...notifs]);
};

export const createNotificationForStatusChange = (order: Order, newStatus: OrderStatus): void => {
  const notifs = getStoredNotifications();
  let title = '';
  let message = '';
  let type: 'info' | 'success' | 'warning' = 'info';

  switch (newStatus) {
    case 'Received':
      title = 'Clothes Received at Counter ✅';
      message = `${order.studentName}, your laundry (${order.id}) was checked in and verified by staff.`;
      type = 'info';
      break;
    case 'Washing':
      title = 'Washing Cycle Started 🫧';
      message = `${order.studentName}, your laundry (${order.id}) is now in the washing and hygiene cycle.`;
      type = 'info';
      break;
    case 'Ready':
      title = 'Order Ready for Collection! 🧺';
      message = `${order.studentName}, order ${order.id} is ironed, packaged, and ready for pickup at ${order.kioskLocation || 'UniMall Kiosk'}.`;
      type = 'success';
      break;
    case 'Collected':
      title = 'Order Collected Successfully ✨';
      message = `${order.studentName}, order ${order.id} was picked up. Thank you for using LPU LaundryTrack!`;
      type = 'success';
      break;
    default:
      title = `Order Status: ${newStatus}`;
      message = `Order ${order.id} status is now ${newStatus}.`;
      type = 'info';
  }

  const newNotif: AppNotification = {
    id: `NOTIF-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    orderId: order.id,
    title,
    message,
    timestamp: new Date().toISOString(),
    read: false,
    type,
    targetRegNo: order.regNo
  };

  saveStoredNotifications([newNotif, ...notifs]);
};
