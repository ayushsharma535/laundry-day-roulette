# 🧺 LaundryTrack – LPU Campus Laundry Management System

> **Academic Design Thinking Project (INT335, Group P21)**  
> **Lovely Professional University (LPU)**

**LaundryTrack** is a high-fidelity, responsive frontend web application engineered to solve hosteller laundry tracking bottlenecks at Lovely Professional University. It provides an intuitive dual-portal experience for **Students** and **Laundry Staff / Administrators** with persistent, reactive state management using LocalStorage and browser event synchronization.

---

## 🌟 Key Features

### 🎓 Student Portal
- **Dashboard**: Live metric cards (Total Orders, Active In-Progress, Ready for Pickup, Completed), quick CTAs, and recent orders table.
- **Place Laundry Request**: Interactive intake form with required validations, clothing category selector (`Regular clothes`, `Delicate clothes`, `Bedsheets`, `Other`), and campus drop-off kiosk selection.
- **Order Confirmation Slip**: Instant generation of unique tokens (e.g. `LT-2026-0011`), 1-click token copy, and direct tracking buttons.
- **5-Stage Visual Progress Tracker**: Real-time progress timeline following the exact lifecycle:  
  `Submitted` → `Received` → `Washing` → `Ready` → `Collected`
- **Collection Banner Alert**: Vibrant pulsing banner when laundry is `Ready` with kiosk desk hours, pickup instructions, and verification reminders.
- **Order History & Filter**: Tabbed views for All, Active, Ready, and Completed orders with search and inspection modal.
- **In-App Notification Centre**: Simulated real-time alerts when clothes are checked in, washed, packed, or collected.
- **Campus Guidelines & FAQ**: Operating hours (UniMall & Hostels), rules, and Design Thinking project context.

### 👔 Staff / Admin Portal
- **Operational Dashboard**: KPI metrics, pipeline throughput, and queue management.
- **Manage Orders**: Search by Order ID or Student Name, filter by status, and **1-click stage advancement** (`Submitted` → `Received` → `Washing` → `Ready` → `Collected`).
- **Register Walk-in Order**: Counter intake form with instant token generation for hostellers handing over clothes directly.
- **Ready for Collection Desk**: Dedicated quick-action view for peak pickup hours with 1-click handover completion.
- **Completed Orders Archive**: Historical audit trail with collection timestamps and verification staff notes.
- **Settings & Demo Data Reset**: 1-click reset button to restore default 10 sample orders for testing and evaluations.

### 🔄 Dual-Portal Quick Switcher
- Persistent top-bar switcher and modal allowing seamless 1-click toggling between the primary student persona (**Ayush Dilip Sharma, 12505135, BS-11 Room B-226**) and staff persona (**Rajesh Sharma, 35134, UniMall Central Laundry Kiosk**).
- The 10 resettable sample orders cover all six team-member hostellers, each at their assigned campus drop-off kiosk. Ayush’s dashboard opens with Washing, Ready, and Collected orders plus a ready-for-pickup notification.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite 8
- **Styling**: Tailwind CSS (Deep Navy `#0F172A`, Teal `#0D9488`, Slate neutrals)
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Persistence**: LocalStorage with Custom Pub/Sub Event Bus (`laundrytrack:storage-update`) for instantaneous cross-component and cross-tab sync without page reload.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
```

### 4. Run Automated 13-Step Verification Test
```bash
npm test
```

---

## 📋 Evaluation Scenario (Step-by-Step)

1. Open the app (`/`) and open the Student Portal for **Ayush Dilip Sharma (12505135, BS-11, Room B-226)**.
2. Click **Place Laundry Request** and submit a request (e.g., 8 items, Regular clothes) for the assigned **BH-11 / UniMall Kiosk**.
3. Receive unique Order ID (e.g., `LT-2026-0011`) on the Confirmation Screen.
4. Click **Switch to Staff** in the top navigation bar (staff persona: **Rajesh Sharma, 35134**).
5. In **Manage Laundry Orders**, find `LT-2026-0011`.
6. Click **Receive** (advances status from `Submitted` to `Received`).
7. Click **Wash** (advances status from `Received` to `Washing`).
8. Click **Mark Ready** (advances status from `Washing` to `Ready`).
9. Click **Switch to Student** in the top navigation bar to return to Ayush’s student dashboard.
10. Navigate to **Track My Laundry** and view `LT-2026-0011`.
11. Observe the glowing active **Ready** stage, collection banner, and in-app notification.
12. Switch back to Staff and click **Mark Collected**.
13. Return to Student tracker and verify the final **Collected** celebration banner.
