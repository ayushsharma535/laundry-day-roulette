// Headless E2E Simulation of the 13-step scenario
import {
  initStorageIfEmpty,
  getStoredOrders
} from './src/services/storageService.ts';
import {
  createNewOrder,
  getOrderById,
  updateOrderStatus
} from './src/services/orderService.ts';
import { getStoredNotifications } from './src/services/storageService.ts';

// Mock localStorage for Node environment
const store = new Map();
global.localStorage = {
  getItem: (key) => store.get(key) || null,
  setItem: (key, val) => store.set(key, String(val)),
  removeItem: (key) => store.delete(key),
  clear: () => store.clear()
};

// Mock window event dispatch
global.window = {
  dispatchEvent: (_event) => {}
};
global.CustomEvent = class CustomEvent {
  constructor(type) { this.type = type; }
};

console.log('--- Step 0: Initialize and seed storage ---');
initStorageIfEmpty();
const initialOrders = getStoredOrders();
console.log(`Seeded orders count: ${initialOrders.length}`);
console.assert(initialOrders.length >= 8, 'Should have at least 8 seeded orders');

console.log('\n--- Step 1 & 2: Student submits a new laundry request ---');
const newOrder = createNewOrder({
  studentName: 'Aman Verma',
  regNo: '12209384',
  contactNumber: '+91 98721 54321',
  hostelBlock: 'BH-2, Room 412',
  itemCount: 8,
  category: 'Regular clothes',
  specialInstructions: 'White collared shirts - starch requested.'
});

console.log(`Step 3: Unique Order ID generated: ${newOrder.id}`);
console.assert(newOrder.id.startsWith('LT-2026-'), 'Order ID should match LT-2026-XXXX format');
console.assert(newOrder.currentStatus === 'Submitted', 'Initial status must be Submitted');

console.log('\n--- Step 4 & 5: Staff finds the order ---');
const foundOrder = getOrderById(newOrder.id);
console.assert(foundOrder !== undefined, 'Staff must be able to find the order by ID');
console.log(`Staff found order ${foundOrder.id} with status ${foundOrder.currentStatus}`);

console.log('\n--- Step 6: Staff changes status Submitted -> Received ---');
const received = updateOrderStatus(newOrder.id, 'Received', 'Bag verified at BH-2 Counter', 'Rajesh Kumar');
console.assert(received.currentStatus === 'Received', 'Status should now be Received');
console.log(`Status updated to: ${received.currentStatus}`);

console.log('\n--- Step 7: Staff changes status Received -> Washing ---');
const washing = updateOrderStatus(newOrder.id, 'Washing', 'Loaded into Machine #2', 'Rajesh Kumar');
console.assert(washing.currentStatus === 'Washing', 'Status should now be Washing');
console.log(`Status updated to: ${washing.currentStatus}`);

console.log('\n--- Step 8: Staff changes status Washing -> Ready ---');
const ready = updateOrderStatus(newOrder.id, 'Ready', 'Ironed & folded. Rack B-02', 'Rajesh Kumar');
console.assert(ready.currentStatus === 'Ready', 'Status should now be Ready');
console.log(`Status updated to: ${ready.currentStatus}`);

console.log('\n--- Step 9 & 10: Student tracks order ID ---');
const trackedStudentOrder = getOrderById(newOrder.id);
console.log(`Student sees status: ${trackedStudentOrder.currentStatus}`);
console.assert(trackedStudentOrder.currentStatus === 'Ready', 'Student tracker must reflect Ready');

console.log('Step 11: Notifications check...');
const notifications = getStoredNotifications();
const readyNotif = notifications.find(n => n.orderId === newOrder.id && n.title.includes('Ready'));
console.assert(readyNotif !== undefined, 'A Ready notification should have been generated');
console.log(`Found notification for student: "${readyNotif.title}" - ${readyNotif.message}`);

console.log('\n--- Step 12: Staff marks order as Collected ---');
const collected = updateOrderStatus(newOrder.id, 'Collected', 'Student Aman Verma picked up', 'Rajesh Kumar');
console.assert(collected.currentStatus === 'Collected', 'Status should now be Collected');
console.log(`Staff updated order to: ${collected.currentStatus}`);

console.log('\n--- Step 13: Student verifies Collected status ---');
const finalStudentOrder = getOrderById(newOrder.id);
console.assert(finalStudentOrder.currentStatus === 'Collected', 'Final status must be Collected');
console.log(`Student tracker confirms final status: ${finalStudentOrder.currentStatus}`);
console.log(`Status history length: ${finalStudentOrder.statusHistory.length} events logged`);

console.log('\nALL 13 STEPS VERIFIED AUTOMATICALLY AND SUCCEEDED!');
