import type { Order } from '../types/order';
import type { AppNotification } from '../types/notification';

// Helper to generate past dates relative to current local time
const getPastDate = (hoursAgo: number): string => {
  const d = new Date();
  d.setHours(d.getHours() - hoursAgo);
  return d.toISOString();
};

export const INITIAL_SEED_ORDERS: Order[] = [
  {
    id: 'LT-2026-0001',
    studentName: 'Rahul Sharma',
    regNo: '12104523',
    contactNumber: '+91 98140 23145',
    hostelBlock: 'BH-1, Room 204',
    itemCount: 9,
    category: 'Regular clothes',
    specialInstructions: 'Please starch the collared formal shirts.',
    currentStatus: 'Collected',
    submissionDate: getPastDate(72),
    lastUpdated: getPastDate(20),
    kioskLocation: 'Central UniMall Hub',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(72), note: 'Submitted via student portal' },
      { status: 'Received', timestamp: getPastDate(68), note: 'Checked in at BH-1 laundry desk', updatedBy: 'Rajesh Kumar' },
      { status: 'Washing', timestamp: getPastDate(50), note: 'Wash cycle #3 started', updatedBy: 'Sunil Singh' },
      { status: 'Ready', timestamp: getPastDate(26), note: 'Ironed & ready on Rack A-12', updatedBy: 'Rajesh Kumar' },
      { status: 'Collected', timestamp: getPastDate(20), note: 'Picked up by student. Verified OTP/RegNo', updatedBy: 'Rajesh Kumar' }
    ]
  },
  {
    id: 'LT-2026-0002',
    studentName: 'Priya Patel',
    regNo: '12201842',
    contactNumber: '+91 97234 11890',
    hostelBlock: 'GH-2, Room 318',
    itemCount: 14,
    category: 'Bedsheets',
    specialInstructions: 'Includes 2 hostel bedspreads and 2 pillowcases.',
    currentStatus: 'Ready',
    submissionDate: getPastDate(36),
    lastUpdated: getPastDate(3),
    kioskLocation: 'Girls Hostel Kiosk (GH-2)',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(36), note: 'Submitted via student portal' },
      { status: 'Received', timestamp: getPastDate(30), note: 'Accepted at GH-2 counter', updatedBy: 'Pooja Rani' },
      { status: 'Washing', timestamp: getPastDate(16), note: 'Heavy wash cycle completed', updatedBy: 'Rajesh Kumar' },
      { status: 'Ready', timestamp: getPastDate(3), note: 'Packed & ready at Counter #1. Slot B-04', updatedBy: 'Pooja Rani' }
    ]
  },
  {
    id: 'LT-2026-0003',
    studentName: 'Aman Verma', // Default demo student
    regNo: '12209384',
    contactNumber: '+91 98721 54321',
    hostelBlock: 'BH-2, Room 412',
    itemCount: 7,
    category: 'Regular clothes',
    specialInstructions: 'White lab coat included - please keep separate.',
    currentStatus: 'Washing',
    submissionDate: getPastDate(22),
    lastUpdated: getPastDate(6),
    kioskLocation: 'Central UniMall Hub',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(22), note: 'Submitted via student portal' },
      { status: 'Received', timestamp: getPastDate(18), note: 'Received at Counter #2', updatedBy: 'Rajesh Kumar' },
      { status: 'Washing', timestamp: getPastDate(6), note: 'Washing in Machine #4 (Delicate cycle for coat)', updatedBy: 'Rajesh Kumar' }
    ]
  },
  {
    id: 'LT-2026-0004',
    studentName: 'Simran Kaur',
    regNo: '12108719',
    contactNumber: '+91 98765 89012',
    hostelBlock: 'GH-1, Room 102',
    itemCount: 5,
    category: 'Delicate clothes',
    specialInstructions: 'Silk and synthetic kurtis. Gentle cold cycle only.',
    currentStatus: 'Received',
    submissionDate: getPastDate(14),
    lastUpdated: getPastDate(8),
    kioskLocation: 'GH-1 Ground Counter',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(14), note: 'Submitted online' },
      { status: 'Received', timestamp: getPastDate(8), note: 'Bag tagged with QR token #8719', updatedBy: 'Pooja Rani' }
    ]
  },
  {
    id: 'LT-2026-0005',
    studentName: 'Ankit Kumar',
    regNo: '12301290',
    contactNumber: '+91 99150 44321',
    hostelBlock: 'BH-4, Room 509',
    itemCount: 11,
    category: 'Regular clothes',
    specialInstructions: 'Standard weekly laundry wash & fold.',
    currentStatus: 'Submitted',
    submissionDate: getPastDate(5),
    lastUpdated: getPastDate(5),
    kioskLocation: 'BH-4 Drop Box',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(5), note: 'Online request submitted. Drop bag at counter.' }
    ]
  },
  {
    id: 'LT-2026-0006',
    studentName: 'Neha Singh',
    regNo: '12215640',
    contactNumber: '+91 94190 77654',
    hostelBlock: 'GH-3, Room 221',
    itemCount: 8,
    category: 'Regular clothes',
    specialInstructions: 'Extra fabric conditioner requested.',
    currentStatus: 'Ready',
    submissionDate: getPastDate(40),
    lastUpdated: getPastDate(2),
    kioskLocation: 'Central UniMall Hub',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(40), note: 'Online request registered' },
      { status: 'Received', timestamp: getPastDate(34), note: 'Received by staff', updatedBy: 'Rajesh Kumar' },
      { status: 'Washing', timestamp: getPastDate(20), note: 'Sanitized and washed', updatedBy: 'Sunil Singh' },
      { status: 'Ready', timestamp: getPastDate(2), note: 'Steam pressed and bagged. Shelf C-09', updatedBy: 'Rajesh Kumar' }
    ]
  },
  {
    id: 'LT-2026-0007',
    studentName: 'Vikram Rathore',
    regNo: '12019283',
    contactNumber: '+91 98888 12399',
    hostelBlock: 'BH-2, Room 115',
    itemCount: 6,
    category: 'Other',
    specialInstructions: 'Winter hoodies and denim jacket.',
    currentStatus: 'Washing',
    submissionDate: getPastDate(19),
    lastUpdated: getPastDate(4),
    kioskLocation: 'Central UniMall Hub',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(19), note: 'Submitted via student portal' },
      { status: 'Received', timestamp: getPastDate(15), note: 'Verified weight and garment condition', updatedBy: 'Rajesh Kumar' },
      { status: 'Washing', timestamp: getPastDate(4), note: 'Tumbler wash in progress', updatedBy: 'Sunil Singh' }
    ]
  },
  {
    id: 'LT-2026-0008',
    studentName: 'Sneha Gupta',
    regNo: '12117820',
    contactNumber: '+91 97801 65432',
    hostelBlock: 'GH-4, Room 410',
    itemCount: 12,
    category: 'Bedsheets',
    specialInstructions: 'Dorm bedsheets, comforter cover and towels.',
    currentStatus: 'Collected',
    submissionDate: getPastDate(90),
    lastUpdated: getPastDate(48),
    kioskLocation: 'Girls Hostel Kiosk (GH-2)',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(90), note: 'Submitted via portal' },
      { status: 'Received', timestamp: getPastDate(85), note: 'Received at kiosk', updatedBy: 'Pooja Rani' },
      { status: 'Washing', timestamp: getPastDate(70), note: 'Heavy wash drum completed', updatedBy: 'Rajesh Kumar' },
      { status: 'Ready', timestamp: getPastDate(55), note: 'Folded in packet #820', updatedBy: 'Pooja Rani' },
      { status: 'Collected', timestamp: getPastDate(48), note: 'Collected by student', updatedBy: 'Pooja Rani' }
    ]
  },
  {
    id: 'LT-2026-0009',
    studentName: 'Rohit Deshmukh',
    regNo: '12304812',
    contactNumber: '+91 98155 33211',
    hostelBlock: 'BH-1, Room 330',
    itemCount: 10,
    category: 'Regular clothes',
    specialInstructions: 'Please make sure socks are paired.',
    currentStatus: 'Submitted',
    submissionDate: getPastDate(2),
    lastUpdated: getPastDate(2),
    kioskLocation: 'Central UniMall Hub',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(2), note: 'Initial request placed by student.' }
    ]
  },
  {
    id: 'LT-2026-0010',
    studentName: 'Aman Verma', // Second order for default student to show multiple history records
    regNo: '12209384',
    contactNumber: '+91 98721 54321',
    hostelBlock: 'BH-2, Room 412',
    itemCount: 15,
    category: 'Regular clothes',
    specialInstructions: 'Previous week clean wash.',
    currentStatus: 'Collected',
    submissionDate: getPastDate(120),
    lastUpdated: getPastDate(75),
    kioskLocation: 'Central UniMall Hub',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(120), note: 'Submitted' },
      { status: 'Received', timestamp: getPastDate(115), note: 'Received', updatedBy: 'Rajesh Kumar' },
      { status: 'Washing', timestamp: getPastDate(98), note: 'Washed', updatedBy: 'Sunil Singh' },
      { status: 'Ready', timestamp: getPastDate(80), note: 'Ready for pickup', updatedBy: 'Rajesh Kumar' },
      { status: 'Collected', timestamp: getPastDate(75), note: 'Collected successfully', updatedBy: 'Rajesh Kumar' }
    ]
  }
];

export const INITIAL_SEED_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'NOTIF-001',
    orderId: 'LT-2026-0002',
    title: 'Order Ready for Collection! 🧺',
    message: 'Your laundry (LT-2026-0002) is ready for pickup at Girls Hostel Kiosk (GH-2), Counter #1.',
    timestamp: getPastDate(3),
    read: false,
    type: 'success',
    targetRegNo: '12201842'
  },
  {
    id: 'NOTIF-002',
    orderId: 'LT-2026-0003',
    title: 'Washing Cycle Started 🫧',
    message: 'Your clothes for order LT-2026-0003 are now being washed in Machine #4 at Central UniMall Hub.',
    timestamp: getPastDate(6),
    read: false,
    type: 'info',
    targetRegNo: '12209384'
  },
  {
    id: 'NOTIF-003',
    orderId: 'LT-2026-0006',
    title: 'Order Ready for Collection! 🧺',
    message: 'Your laundry (LT-2026-0006) has been packaged and is ready at Central UniMall Hub (Shelf C-09).',
    timestamp: getPastDate(2),
    read: false,
    type: 'success',
    targetRegNo: '12215640'
  },
  {
    id: 'NOTIF-004',
    orderId: 'LT-2026-0003',
    title: 'Clothes Received at Counter ✅',
    message: 'Order LT-2026-0003 with 7 items has been accepted and verified by Rajesh Kumar.',
    timestamp: getPastDate(18),
    read: true,
    type: 'info',
    targetRegNo: '12209384'
  }
];
