export type UserRole = 'student' | 'staff';

export interface StudentProfile {
  name: string;
  regNo: string;
  email: string;
  phone: string;
  hostelBlock: string;
  roomNumber: string;
  programme: string;
  assignedKiosk: string;
}

export interface StaffProfile {
  name: string;
  employeeId: string;
  roleTitle: string;
  assignedKiosk: string;
  shiftHours: string;
}



export const DEMO_STUDENT: StudentProfile = {
  name: 'Ayush Dilip Sharma',
  regNo: '12505135',
  email: '',
  phone: '',
  hostelBlock: 'BS-11',
  roomNumber: 'B-226',
  programme: '',
  assignedKiosk: 'BH-11 / UniMall Kiosk'
};

export const DEMO_STUDENTS: StudentProfile[] = [
  DEMO_STUDENT,
  {
    name: 'Rishabh Kumar',
    regNo: '12505709',
    email: '',
    phone: '',
    hostelBlock: 'BS-11',
    roomNumber: 'B-226',
    programme: '',
    assignedKiosk: 'BH-11 Counter'
  },
  DEMO_STUDENT,
  {
    name: 'Priyanshu Mishra',
    regNo: '12509276',
    email: '',
    phone: '',
    hostelBlock: 'BS-11',
    roomNumber: 'B-324',
    programme: '',
    assignedKiosk: 'BH-11 Counter'
  },
  {
    name: 'Vivek Kaushik',
    regNo: '12502286',
    email: '',
    phone: '',
    hostelBlock: 'BH-1',
    roomNumber: 'A-1010',
    programme: '',
    assignedKiosk: 'BH-1 Central Desk'
  },
  {
    name: 'Yisha Rai',
    regNo: '12512716',
    email: '',
    phone: '',
    hostelBlock: 'GH-12',
    roomNumber: 'C-202',
    programme: '',
    assignedKiosk: 'GH-4 Laundry Desk'
  },
  {
    name: 'Vaibhavi Shah',
    regNo: '12506546',
    email: '',
    phone: '',
    hostelBlock: 'GS-2',
    roomNumber: 'A-208',
    programme: '',
    assignedKiosk: 'UniMall Kiosk'
  },
  {
    name: 'Khushboo Chauhan',
    regNo: '12505745',
    email: '',
    phone: '',
    hostelBlock: 'GH-2',
    roomNumber: 'B-115',
    programme: '',
    assignedKiosk: 'GH-2 Counter'
  }
];

export const DEMO_STAFF: StaffProfile = {
  name: 'Rajesh Sharma',
  employeeId: '35134',
  roleTitle: 'Senior Laundry Supervisor',
  assignedKiosk: 'UniMall Central Laundry Kiosk',
  shiftHours: '08:00 AM – 06:00 PM'
};

export const SECONDARY_DEMO_STAFF: StaffProfile = {
  name: 'Sunita Devi',
  employeeId: 'LPU-STF-112',
  roleTitle: 'Laundry Verification Associate',
  assignedKiosk: 'GH-2 & GH-4 Laundry Wing',
  shiftHours: '09:00 AM – 05:00 PM'
};

export const getInitials = (name: string): string => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';
  return words.length > 1
    ? `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase()
    : words[0].slice(0, 2).toUpperCase();
};
