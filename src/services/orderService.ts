import type { Order, OrderStatus, ClothingCategory } from '../types/order';
import { ORDER_STATUS_SEQUENCE } from '../types/order';
import { getStoredOrders, saveStoredOrders, resetAllDemoData } from './storageService';
import { createNotificationForStatusChange, createNotificationForNewOrder } from './notificationService';

export const generateOrderId = (): string => {
  const orders = getStoredOrders();
  let maxSeq = 0;

  for (const o of orders) {
    const match = o.id.match(/^LT-2026-(\d+)$/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (!isNaN(num) && num > maxSeq) {
        maxSeq = num;
      }
    }
  }

  const nextSeq = (maxSeq > 0 ? maxSeq + 1 : orders.length + 1);
  return `LT-2026-${String(nextSeq).padStart(4, '0')}`;
};

export const getNextStatus = (current: OrderStatus): OrderStatus | null => {
  const currentIndex = ORDER_STATUS_SEQUENCE.indexOf(current);
  if (currentIndex >= 0 && currentIndex < ORDER_STATUS_SEQUENCE.length - 1) {
    return ORDER_STATUS_SEQUENCE[currentIndex + 1];
  }
  return null;
};

export const getAllOrders = (): Order[] => {
  return getStoredOrders();
};

export const getOrderById = (id: string): Order | undefined => {
  const cleanId = id.trim().toUpperCase();
  const orders = getStoredOrders();
  return orders.find(o => o.id.toUpperCase() === cleanId);
};

export interface CreateOrderParams {
  studentName: string;
  regNo: string;
  contactNumber?: string;
  hostelBlock?: string;
  itemCount: number;
  category: ClothingCategory;
  specialInstructions?: string;
  kioskLocation?: string;
}

export const createNewOrder = (params: CreateOrderParams): Order => {
  const orders = getStoredOrders();
  const newId = generateOrderId();
  const now = new Date().toISOString();

  const newOrder: Order = {
    id: newId,
    studentName: params.studentName.trim(),
    regNo: params.regNo.trim(),
    contactNumber: params.contactNumber?.trim() || '',
    hostelBlock: params.hostelBlock?.trim() || 'LPU Campus Hostels',
    itemCount: Number(params.itemCount),
    category: params.category,
    specialInstructions: params.specialInstructions?.trim() || '',
    currentStatus: 'Submitted',
    submissionDate: now,
    lastUpdated: now,
    kioskLocation: params.kioskLocation || 'Central UniMall Hub',
    statusHistory: [
      {
        status: 'Submitted',
        timestamp: now,
        note: 'Laundry request submitted. Awaiting counter check-in.'
      }
    ]
  };

  const updatedOrders = [newOrder, ...orders];
  saveStoredOrders(updatedOrders);
  createNotificationForNewOrder(newOrder);

  return newOrder;
};

export const updateOrderStatus = (
  orderId: string,
  newStatus: OrderStatus,
  note?: string,
  updatedBy: string = 'Staff Kiosk'
): Order | null => {
  const orders = getStoredOrders();
  const index = orders.findIndex(o => o.id.toUpperCase() === orderId.toUpperCase());
  if (index === -1) return null;

  const order = orders[index];
  const now = new Date().toISOString();

  const historyNote = note || getDefaultStatusNote(newStatus, updatedBy);

  const updatedOrder: Order = {
    ...order,
    currentStatus: newStatus,
    lastUpdated: now,
    statusHistory: [
      ...order.statusHistory,
      {
        status: newStatus,
        timestamp: now,
        note: historyNote,
        updatedBy
      }
    ]
  };

  orders[index] = updatedOrder;
  saveStoredOrders(orders);
  createNotificationForStatusChange(updatedOrder, newStatus);

  return updatedOrder;
};

const getDefaultStatusNote = (status: OrderStatus, staffName: string): string => {
  switch (status) {
    case 'Received':
      return `Clothes verified and tagged at counter by ${staffName}.`;
    case 'Washing':
      return `Wash and dry cycle started by ${staffName}.`;
    case 'Ready':
      return `Packaged & ready for student collection at Central UniMall Hub.`;
    case 'Collected':
      return `Handed over to student and verified by ${staffName}.`;
    default:
      return `Status updated to ${status}.`;
  }
};

export const resetOrdersDemoData = (): void => {
  resetAllDemoData();
};
