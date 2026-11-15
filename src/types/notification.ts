export interface AppNotification {
  id: string;
  orderId: string;
  title: string;
  message: string;
  timestamp: string; // ISO string
  read: boolean;
  type: 'info' | 'success' | 'warning';
  targetRegNo?: string;
}
