export type UserRole = 'student' | 'staff';

export interface StudentProfile {
  name: string;
  regNo: string;
  email: string;
  phone: string;
  hostelBlock: string;
  roomNumber: string;
  programme: string;
}

export interface StaffProfile {
  name: string;
  employeeId: string;
  roleTitle: string;
  assignedKiosk: string;
  shiftHours: string;
}

export const DEMO_STUDENT: StudentProfile = {
  name: 'Aman Verma',
  regNo: '12209384',
  email: 'aman.12209384@lpu.in',
  phone: '+91 98721 54321',
  hostelBlock: 'BH-2',
  roomNumber: '412',
  programme: 'B.Tech CSE (Hons) - 3rd Year'
};

export const DEMO_STAFF: StaffProfile = {
  name: 'Rajesh Kumar',
  employeeId: 'LPU-LND-104',
  roleTitle: 'Senior Laundry Supervisor',
  assignedKiosk: 'Central UniMall Hub (Counter #2)',
  shiftHours: '08:00 AM – 06:00 PM'
};
