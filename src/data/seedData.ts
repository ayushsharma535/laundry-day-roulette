import type { Order } from '../types/order';
import type { AppNotification } from '../types/notification';
import { DEMO_STAFF, SECONDARY_DEMO_STAFF } from '../types/user';

const getPastDate = (hoursAgo: number): string => {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

export const INITIAL_SEED_ORDERS: Order[] = [
  {
    id: 'LT-2026-0001',
    studentName: 'Ayush Dilip Sharma',
    regNo: '12505135',
    hostelBlock: 'BS-11, Room B-226',
    itemCount: 8,
    category: 'Regular clothes',
    specialInstructions: 'Please keep the white shirts separate from dark clothes.',
    currentStatus: 'Washing',
    submissionDate: getPastDate(12),
    lastUpdated: getPastDate(2),
    kioskLocation: 'BH-11 / UniMall Kiosk',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(12), note: 'Online request submitted for the BH-11 collection run.' },
      { status: 'Received', timestamp: getPastDate(9), note: 'Verified at BS-11 counter; bag tagged and item count confirmed.', updatedBy: DEMO_STAFF.name },
      { status: 'Washing', timestamp: getPastDate(2), note: 'Regular cycle started; whites separated as requested.', updatedBy: SECONDARY_DEMO_STAFF.name }
    ]
  },
  {
    id: 'LT-2026-0002',
    studentName: 'Priyanshu Mishra',
    regNo: '12509276',
    hostelBlock: 'BS-11, Room B-324',
    itemCount: 6,
    category: 'Delicate clothes',
    specialInstructions: 'Gentle wash for two formal shirts.',
    currentStatus: 'Submitted',
    submissionDate: getPastDate(1),
    lastUpdated: getPastDate(1),
    kioskLocation: 'BH-11 Counter',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(1), note: 'Request registered. Awaiting bag drop-off at the BH-11 counter.' }
    ]
  },
  {
    id: 'LT-2026-0003',
    studentName: 'Ayush Dilip Sharma',
    regNo: '12505135',
    hostelBlock: 'BS-11, Room B-226',
    itemCount: 12,
    category: 'Bedsheets',
    specialInstructions: 'One bedsheet, pillow covers, and towels.',
    currentStatus: 'Ready',
    submissionDate: getPastDate(28),
    lastUpdated: getPastDate(1),
    kioskLocation: 'BH-11 / UniMall Kiosk',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(28), note: 'Request submitted for bedsheets and towels.' },
      { status: 'Received', timestamp: getPastDate(24), note: 'Verified at BS-11 counter; 12 items tagged.', updatedBy: DEMO_STAFF.name },
      { status: 'Washing', timestamp: getPastDate(10), note: 'Heavy-load wash completed and items sent for pressing.', updatedBy: SECONDARY_DEMO_STAFF.name },
      { status: 'Ready', timestamp: getPastDate(1), note: 'Folded, packed, and placed at the BH-11 / UniMall collection rack.', updatedBy: DEMO_STAFF.name }
    ]
  },
  {
    id: 'LT-2026-0004',
    studentName: 'Vivek Kaushik',
    regNo: '12502286',
    hostelBlock: 'BH-1, Room A-1010',
    itemCount: 5,
    category: 'Other',
    specialInstructions: 'Includes one sports jacket; please use a cool cycle.',
    currentStatus: 'Received',
    submissionDate: getPastDate(7),
    lastUpdated: getPastDate(1),
    kioskLocation: 'BH-1 Central Desk',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(7), note: 'Online request submitted for BH-1 pickup.' },
      { status: 'Received', timestamp: getPastDate(1), note: 'Verified at BH-1 Central Desk; jacket noted for a cool cycle.', updatedBy: DEMO_STAFF.name }
    ]
  },
  {
    id: 'LT-2026-0005',
    studentName: 'Yisha Rai',
    regNo: '12512716',
    hostelBlock: 'GH-12, Room C-202',
    itemCount: 7,
    category: 'Delicate clothes',
    specialInstructions: 'Ethnic wear; please avoid high heat.',
    currentStatus: 'Washing',
    submissionDate: getPastDate(18),
    lastUpdated: getPastDate(3),
    kioskLocation: 'GH-4 Laundry Desk',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(18), note: 'Request submitted for GH-4 collection.' },
      { status: 'Received', timestamp: getPastDate(14), note: 'Verified at GH-4 Laundry Desk; delicate garments tagged separately.', updatedBy: SECONDARY_DEMO_STAFF.name },
      { status: 'Washing', timestamp: getPastDate(3), note: 'Delicate cycle used for ethnic wear.', updatedBy: SECONDARY_DEMO_STAFF.name }
    ]
  },
  {
    id: 'LT-2026-0006',
    studentName: 'Vaibhavi Shah',
    regNo: '12506546',
    hostelBlock: 'GS-2, Room A-208',
    itemCount: 9,
    category: 'Regular clothes',
    specialInstructions: 'Wash and fold; no starch.',
    currentStatus: 'Ready',
    submissionDate: getPastDate(30),
    lastUpdated: getPastDate(4),
    kioskLocation: 'UniMall Kiosk',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(30), note: 'Request submitted for UniMall drop-off.' },
      { status: 'Received', timestamp: getPastDate(26), note: 'Verified at UniMall Kiosk; item count confirmed.', updatedBy: DEMO_STAFF.name },
      { status: 'Washing', timestamp: getPastDate(15), note: 'Standard wash and dry cycle completed.', updatedBy: DEMO_STAFF.name },
      { status: 'Ready', timestamp: getPastDate(4), note: 'Folded and placed at the UniMall pickup counter.', updatedBy: SECONDARY_DEMO_STAFF.name }
    ]
  },
  {
    id: 'LT-2026-0007',
    studentName: 'Khushboo Chauhan',
    regNo: '12505745',
    hostelBlock: 'GH-2, Room B-115',
    itemCount: 14,
    category: 'Bedsheets',
    specialInstructions: 'Bedsheets and pillow covers; keep this bag separate.',
    currentStatus: 'Collected',
    submissionDate: getPastDate(90),
    lastUpdated: getPastDate(12),
    kioskLocation: 'GH-2 Counter',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(90), note: 'Request submitted for GH-2 collection.' },
      { status: 'Received', timestamp: getPastDate(84), note: 'Verified at GH-2 Counter; 14 items tagged.', updatedBy: SECONDARY_DEMO_STAFF.name },
      { status: 'Washing', timestamp: getPastDate(64), note: 'Bedsheet load completed on the heavy wash cycle.', updatedBy: SECONDARY_DEMO_STAFF.name },
      { status: 'Ready', timestamp: getPastDate(24), note: 'Folded and packed for pickup at GH-2 Counter.', updatedBy: SECONDARY_DEMO_STAFF.name },
      { status: 'Collected', timestamp: getPastDate(12), note: 'Student identity checked and order handed over.', updatedBy: SECONDARY_DEMO_STAFF.name }
    ]
  },
  {
    id: 'LT-2026-0008',
    studentName: 'Priyanshu Mishra',
    regNo: '12509276',
    hostelBlock: 'BS-11, Room B-324',
    itemCount: 4,
    category: 'Other',
    specialInstructions: 'Sportswear wash and fold.',
    currentStatus: 'Collected',
    submissionDate: getPastDate(60),
    lastUpdated: getPastDate(36),
    kioskLocation: 'BH-11 Counter',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(60), note: 'Walk-in order registered at the BH-11 Counter.' },
      { status: 'Received', timestamp: getPastDate(54), note: 'Verified at BS-11 counter; sportswear items tagged.', updatedBy: DEMO_STAFF.name },
      { status: 'Washing', timestamp: getPastDate(46), note: 'Sportswear wash cycle completed.', updatedBy: DEMO_STAFF.name },
      { status: 'Ready', timestamp: getPastDate(40), note: 'Order packed and set aside for collection.', updatedBy: SECONDARY_DEMO_STAFF.name },
      { status: 'Collected', timestamp: getPastDate(36), note: 'Order handed over after token verification.', updatedBy: DEMO_STAFF.name }
    ]
  },
  {
    id: 'LT-2026-0009',
    studentName: 'Yisha Rai',
    regNo: '12512716',
    hostelBlock: 'GH-12, Room C-202',
    itemCount: 5,
    category: 'Regular clothes',
    specialInstructions: 'Everyday clothes; wash and fold.',
    currentStatus: 'Submitted',
    submissionDate: getPastDate(5),
    lastUpdated: getPastDate(5),
    kioskLocation: 'GH-4 Laundry Desk',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(5), note: 'Request registered. Awaiting drop-off at the GH-4 Laundry Desk.' }
    ]
  },
  {
    id: 'LT-2026-0010',
    studentName: 'Ayush Dilip Sharma',
    regNo: '12505135',
    hostelBlock: 'BS-11, Room B-226',
    itemCount: 10,
    category: 'Regular clothes',
    specialInstructions: 'Weekly wash and fold.',
    currentStatus: 'Collected',
    submissionDate: getPastDate(108),
    lastUpdated: getPastDate(78),
    kioskLocation: 'BH-11 / UniMall Kiosk',
    statusHistory: [
      { status: 'Submitted', timestamp: getPastDate(108), note: 'Weekly laundry request submitted.' },
      { status: 'Received', timestamp: getPastDate(102), note: 'Verified at BS-11 counter; all 10 items tagged.', updatedBy: DEMO_STAFF.name },
      { status: 'Washing', timestamp: getPastDate(90), note: 'Standard wash and dry cycle completed.', updatedBy: SECONDARY_DEMO_STAFF.name },
      { status: 'Ready', timestamp: getPastDate(84), note: 'Folded and packed at the BH-11 / UniMall Kiosk.', updatedBy: DEMO_STAFF.name },
      { status: 'Collected', timestamp: getPastDate(78), note: 'Order collected after token verification.', updatedBy: DEMO_STAFF.name }
    ]
  }
];

export const INITIAL_SEED_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'NOTIF-001',
    orderId: 'LT-2026-0003',
    title: 'Order Ready for Collection! 🧺',
    message: 'Ayush, your bedsheet order is ready for pickup at BH-11 / UniMall Kiosk.',
    timestamp: getPastDate(1),
    read: false,
    type: 'success',
    targetRegNo: '12505135'
  },
  {
    id: 'NOTIF-002',
    orderId: 'LT-2026-0001',
    title: 'Washing Cycle Started 🫧',
    message: 'Ayush, your regular clothes are now in the wash cycle at BH-11 / UniMall Kiosk.',
    timestamp: getPastDate(2),
    read: false,
    type: 'info',
    targetRegNo: '12505135'
  },
  {
    id: 'NOTIF-003',
    orderId: 'LT-2026-0010',
    title: 'Order Collected Successfully ✨',
    message: 'Ayush, your previous laundry order was handed over after token verification.',
    timestamp: getPastDate(78),
    read: true,
    type: 'success',
    targetRegNo: '12505135'
  },
  {
    id: 'NOTIF-004',
    orderId: 'LT-2026-0005',
    title: 'Delicate Wash in Progress 🫧',
    message: 'Yisha, your ethnic wear is being cleaned on a delicate cycle at GH-4 Laundry Desk.',
    timestamp: getPastDate(3),
    read: true,
    type: 'info',
    targetRegNo: '12512716'
  }
];
