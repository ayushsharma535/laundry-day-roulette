import type { Order } from '../types/order';
import type { AppNotification } from '../types/notification';
import { INITIAL_SEED_ORDERS, INITIAL_SEED_NOTIFICATIONS } from '../data/seedData';

const STORAGE_KEYS = {
  ORDERS: 'laundrytrack_orders_v1',
  NOTIFICATIONS: 'laundrytrack_notifications_v1',
  ACTIVE_ROLE: 'laundrytrack_active_role_v1',
  INITIALIZED: 'laundrytrack_seeded_v2'
};

export const STORAGE_UPDATE_EVENT = 'laundrytrack:storage-update';

export const triggerStorageUpdate = () => {
  window.dispatchEvent(new CustomEvent(STORAGE_UPDATE_EVENT));
};

export const initStorageIfEmpty = (): void => {
  try {
    const isSeeded = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
    const existingOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);

    if (!isSeeded || !existingOrders) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_SEED_ORDERS));
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_SEED_NOTIFICATIONS));
      localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    }
  } catch (err) {
    console.error('Error initializing LocalStorage', err);
  }
};

export const getStoredOrders = (): Order[] => {
  try {
    initStorageIfEmpty();
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : INITIAL_SEED_ORDERS;
  } catch (err) {
    console.error('Error reading orders from LocalStorage', err);
    return INITIAL_SEED_ORDERS;
  }
};

export const saveStoredOrders = (orders: Order[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    triggerStorageUpdate();
  } catch (err) {
    console.error('Error saving orders to LocalStorage', err);
  }
};

export const getStoredNotifications = (): AppNotification[] => {
  try {
    initStorageIfEmpty();
    const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return data ? JSON.parse(data) : INITIAL_SEED_NOTIFICATIONS;
  } catch (err) {
    console.error('Error reading notifications from LocalStorage', err);
    return INITIAL_SEED_NOTIFICATIONS;
  }
};

export const saveStoredNotifications = (notifs: AppNotification[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    triggerStorageUpdate();
  } catch (err) {
    console.error('Error saving notifications to LocalStorage', err);
  }
};

export const resetAllDemoData = (): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_SEED_ORDERS));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_SEED_NOTIFICATIONS));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    triggerStorageUpdate();
  } catch (err) {
    console.error('Error resetting demo data', err);
  }
};
