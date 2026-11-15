import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserRole, StudentProfile, StaffProfile } from '../types/user';
import { DEMO_STUDENT, DEMO_STAFF } from '../types/user';

interface AuthContextType {
  role: UserRole | null;
  student: StudentProfile;
  staff: StaffProfile;
  loginAs: (role: UserRole) => void;
  switchRole: (role: UserRole) => void;
  logout: () => void;
  updateStudent: (student: Partial<StudentProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ROLE_STORAGE_KEY = 'laundrytrack_active_role_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole | null>(() => {
    try {
      const saved = localStorage.getItem(ROLE_STORAGE_KEY);
      return (saved === 'student' || saved === 'staff') ? (saved as UserRole) : null;
    } catch {
      return null;
    }
  });

  const [student, setStudent] = useState<StudentProfile>(DEMO_STUDENT);
  const [staff] = useState<StaffProfile>(DEMO_STAFF);

  useEffect(() => {
    if (role) {
      localStorage.setItem(ROLE_STORAGE_KEY, role);
    } else {
      localStorage.removeItem(ROLE_STORAGE_KEY);
    }
  }, [role]);

  const loginAs = (selectedRole: UserRole) => {
    setRole(selectedRole);
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem(ROLE_STORAGE_KEY);
  };

  const updateStudent = (newDetails: Partial<StudentProfile>) => {
    setStudent(prev => ({ ...prev, ...newDetails }));
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        student,
        staff,
        loginAs,
        switchRole,
        logout,
        updateStudent
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
