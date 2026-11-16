// Headless E2E Simulation of the 13-step scenario
import {
  initStorageIfEmpty,
  getStoredOrders,
  getStoredNotifications,
  resetAllDemoData
} from './src/services/storageService.ts';
import {
  createNewOrder,
  getOrderById,
  updateOrderStatus
} from './src/services/orderService.ts';

// Mock localStorage for Node environment
const store = new Map();
let storageUpdateEvents = 0;
global.localStorage = {
  getItem: (key) => store.get(key) || null,
  setItem: (key, val) => store.set(key, String(val)),
  removeItem: (key) => store.delete(key),
  clear: () => store.clear()
};

// Mock window event dispatch
global.window = {
  dispatchEvent: (event) => {
    if (event.type === 'laundrytrack:storage-update') storageUpdateEvents++;
  }
};
global.CustomEvent = class CustomEvent {
  constructor(type) { this.type = type; }
};

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

console.log('--- Step 0: Initialize and seed storage ---');
store.set('laundrytrack_orders_v1', JSON.stringify([{ id: 'legacy-order' }]));
store.set('laundrytrack_notifications_v1', JSON.stringify([]));
store.set('laundrytrack_seeded_v1', 'true');
initStorageIfEmpty();
const initialOrders = getStoredOrders();
console.log(`Seeded orders count: ${initialOrders.length}`);
assert(initialOrders.length === 10, 'Should restore exactly 10 current seed orders');
assert(initialOrders.every(order => order.id !== 'legacy-order'), 'Legacy LocalStorage data should be replaced by current seed data');
assert(
  ['12505135', '12509276', '12502286', '12512716', '12506546', '12505745']
    .every(regNo => initialOrders.some(order => order.regNo === regNo)),
  'All six team members should appear in the seed orders'
);
assert(
  ['Submitted', 'Received', 'Washing', 'Ready', 'Collected']
    .every(status => initialOrders.some(order => order.currentStatus === status)),
  'Seed orders should cover all five processing stages'
);
assert(
  ['Regular clothes', 'Delicate clothes', 'Bedsheets', 'Other']
    .every(category => initialOrders.some(order => order.category === category)),
  'Seed orders should cover all four laundry categories'
);
assert(
  initialOrders.every(order => order.itemCount >= 4 && order.itemCount <= 15),
  'Seed order item counts should range from 4 to 15'
);
const ayushOrders = initialOrders.filter(order => order.regNo === '12505135');
assert(
  ['Washing', 'Ready', 'Collected'].every(status => ayushOrders.some(order => order.currentStatus === status)),
  'Ayush should have Washing, Ready, and Collected orders'
);
assert(
  initialOrders.some(order => order.currentStatus === 'Ready' && order.regNo === '12505135'),
  'Ayush should have a ready order for the collection banner'
);
assert(
  getStoredNotifications().some(notification =>
    notification.orderId === 'LT-2026-0003' &&
    notification.targetRegNo === '12505135' &&
    !notification.read
  ),
  'Ayush should have an unread ready-for-pickup notification'
);

console.log('\n--- Step 1 & 2: Student submits a new laundry request ---');
const newOrder = createNewOrder({
  studentName: 'Ayush Dilip Sharma',
  regNo: '12505135',
  hostelBlock: 'BS-11, Room B-226',
  kioskLocation: 'BH-11 / UniMall Kiosk',
  itemCount: 8,
  category: 'Regular clothes',
  specialInstructions: 'White collared shirts - starch requested.'
});

console.log(`Step 3: Unique Order ID generated: ${newOrder.id}`);
assert(newOrder.id.startsWith('LT-2026-'), 'Order ID should match LT-2026-XXXX format');
assert(newOrder.currentStatus === 'Submitted', 'Initial status must be Submitted');
assert(newOrder.kioskLocation === 'BH-11 / UniMall Kiosk', 'New order should retain the assigned hostel drop-off kiosk');

console.log('\n--- Step 4 & 5: Staff finds the order ---');
const foundOrder = getOrderById(newOrder.id);
assert(foundOrder !== undefined, 'Staff must be able to find the order by ID');
console.log(`Staff found order ${foundOrder.id} with status ${foundOrder.currentStatus}`);

console.log('\n--- Step 6: Staff changes status Submitted -> Received ---');
const received = updateOrderStatus(newOrder.id, 'Received', 'Verified at BS-11 counter', 'Rajesh Sharma');
assert(received.currentStatus === 'Received', 'Status should now be Received');
console.log(`Status updated to: ${received.currentStatus}`);

console.log('\n--- Step 7: Staff changes status Received -> Washing ---');
const washing = updateOrderStatus(newOrder.id, 'Washing', 'Loaded into Machine #2', 'Rajesh Sharma');
assert(washing.currentStatus === 'Washing', 'Status should now be Washing');
console.log(`Status updated to: ${washing.currentStatus}`);

console.log('\n--- Step 8: Staff changes status Washing -> Ready ---');
const ready = updateOrderStatus(newOrder.id, 'Ready', 'Ironed & folded. Rack B-02', 'Rajesh Sharma');
assert(ready.currentStatus === 'Ready', 'Status should now be Ready');
console.log(`Status updated to: ${ready.currentStatus}`);

console.log('\n--- Step 9 & 10: Student tracks order ID ---');
const trackedStudentOrder = getOrderById(newOrder.id);
console.log(`Student sees status: ${trackedStudentOrder.currentStatus}`);
assert(trackedStudentOrder.currentStatus === 'Ready', 'Student tracker must reflect Ready');

console.log('Step 11: Notifications check...');
const notifications = getStoredNotifications();
const readyNotif = notifications.find(n => n.orderId === newOrder.id && n.title.includes('Ready'));
assert(readyNotif !== undefined, 'A Ready notification should have been generated');
assert(readyNotif.message.includes('Ayush Dilip Sharma'), 'Ready notification should address the right student');
assert(readyNotif.message.includes('BH-11 / UniMall Kiosk'), 'Ready notification should name the assigned kiosk');
console.log(`Found notification for student: "${readyNotif.title}" - ${readyNotif.message}`);

console.log('\n--- Step 12: Staff marks order as Collected ---');
const collected = updateOrderStatus(newOrder.id, 'Collected', 'Student Ayush Dilip Sharma picked up', 'Rajesh Sharma');
assert(collected.currentStatus === 'Collected', 'Status should now be Collected');
console.log(`Staff updated order to: ${collected.currentStatus}`);

console.log('\n--- Step 13: Student verifies Collected status ---');
const finalStudentOrder = getOrderById(newOrder.id);
assert(finalStudentOrder.currentStatus === 'Collected', 'Final status must be Collected');
console.log(`Student tracker confirms final status: ${finalStudentOrder.currentStatus}`);
console.log(`Status history length: ${finalStudentOrder.statusHistory.length} events logged`);

console.log('\n--- Reset: Restore sample orders and notify open views ---');
const eventsBeforeReset = storageUpdateEvents;
resetAllDemoData();
const resetOrders = getStoredOrders();
assert(resetOrders.length === 10, 'Reset should restore all 10 seed orders');
assert(resetOrders.some(order => order.studentName === 'Ayush Dilip Sharma'), 'Reset should restore the primary student persona');
assert(storageUpdateEvents === eventsBeforeReset + 1, 'Reset should dispatch laundrytrack:storage-update');

console.log('\nALL 13 STEPS VERIFIED AUTOMATICALLY AND SUCCEEDED!');
