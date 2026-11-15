export type OrderStatus = 'Submitted' | 'Received' | 'Washing' | 'Ready' | 'Collected';

export type ClothingCategory = 'Regular clothes' | 'Delicate clothes' | 'Bedsheets' | 'Other';

export interface OrderStatusHistoryItem {
  status: OrderStatus;
  timestamp: string; // ISO string
  note?: string;
  updatedBy?: string;
}

export interface Order {
  id: string; // e.g. "LT-2026-0001"
  studentName: string;
  regNo: string; // e.g. "12209384"
  contactNumber?: string;
  hostelBlock?: string; // e.g. "BH-2, Room 412" or "GH-1"
  itemCount: number;
  category: ClothingCategory;
  specialInstructions?: string;
  currentStatus: OrderStatus;
  submissionDate: string; // ISO string
  lastUpdated: string; // ISO string
  statusHistory: OrderStatusHistoryItem[];
  kioskLocation?: string; // e.g. "Central UniMall Kiosk" or "BH-2 Laundry Room"
}

export const ORDER_STATUS_SEQUENCE: OrderStatus[] = [
  'Submitted',
  'Received',
  'Washing',
  'Ready',
  'Collected'
];

export const STATUS_DESCRIPTIONS: Record<OrderStatus, string> = {
  Submitted: 'Laundry request submitted by student. Awaiting drop-off verification.',
  Received: 'Clothes received and verified at the campus laundry counter.',
  Washing: 'In the washing and drying cycle with eco-detergent sanitization.',
  Ready: 'Ironed, folded, and packaged. Ready for pickup at the counter!',
  Collected: 'Order handed over to student and verified.'
};

export const STATUS_COLORS: Record<OrderStatus, { bg: string; text: string; border: string; badge: string; dot: string }> = {
  Submitted: {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-300',
    badge: 'bg-slate-100 text-slate-800 border-slate-200',
    dot: 'bg-slate-400'
  },
  Received: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-300',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    dot: 'bg-blue-500'
  },
  Washing: {
    bg: 'bg-cyan-50',
    text: 'text-cyan-700',
    border: 'border-cyan-300',
    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    dot: 'bg-cyan-500'
  },
  Ready: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-400',
    badge: 'bg-emerald-50 text-teal-800 border-teal-300 font-semibold',
    dot: 'bg-teal-500'
  },
  Collected: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-300',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500'
  }
};
