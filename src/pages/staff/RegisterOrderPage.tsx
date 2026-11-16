import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import type { ClothingCategory } from '../../types/order';
import type { StudentProfile } from '../../types/user';
import { DEMO_STAFF, DEMO_STUDENTS } from '../../types/user';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  CheckCircle2
} from 'lucide-react';

const CATEGORIES: ClothingCategory[] = [
  'Regular clothes',
  'Delicate clothes',
  'Bedsheets',
  'Other'
];

const KIOSK_OPTIONS = [...new Set(DEMO_STUDENTS.map(student => student.assignedKiosk))];

export const RegisterOrderPage: React.FC = () => {
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  // Form state
  const [studentName, setStudentName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [hostelBlock, setHostelBlock] = useState('');
  const [itemCount, setItemCount] = useState('10');
  const [category, setCategory] = useState<ClothingCategory>('Regular clothes');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [kioskLocation, setKioskLocation] = useState(DEMO_STAFF.assignedKiosk);

  // Success state for walk-in confirmation
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick fill student buttons for easy demo testing
  const handleQuickFill = (profile: StudentProfile) => {
    setStudentName(profile.name);
    setRegNo(profile.regNo);
    setHostelBlock(`${profile.hostelBlock}, Room ${profile.roomNumber}`);
    setKioskLocation(profile.assignedKiosk);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!studentName.trim()) errs.studentName = 'Student name is required.';
    if (!regNo.trim()) errs.regNo = 'Registration number is required.';
    const num = parseInt(itemCount, 10);
    if (!itemCount || isNaN(num) || num <= 0) {
      errs.itemCount = 'Please enter a valid count of items (> 0).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const created = placeOrder({
        studentName,
        regNo,
        contactNumber,
        hostelBlock,
        itemCount: parseInt(itemCount, 10),
        category,
        specialInstructions,
        kioskLocation
      });
      setCreatedOrderId(created.id);
      setIsSubmitting(false);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setCreatedOrderId(null);
    setStudentName('');
    setRegNo('');
    setContactNumber('');
    setHostelBlock('');
    setItemCount('10');
    setSpecialInstructions('');
    setKioskLocation(DEMO_STAFF.assignedKiosk);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Register Walk-in Order
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Intake form for hostellers handing over laundry directly at the counter.
        </p>
      </div>

      {/* Success Modal / Banner if created */}
      {createdOrderId ? (
        <div className="bg-white rounded-2xl border border-teal-200 shadow-sm p-6 text-center space-y-4 animate-in zoom-in-95">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Order Token: <span className="font-mono text-teal-700">{createdOrderId}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Intake registered for {studentName} ({regNo}). Student can now track this order.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2.5 pt-2">
            <button
              onClick={() => navigate('/staff/orders')}
              className="px-4 py-2 rounded-xl font-bold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs"
            >
              View in Queue
            </button>

            <button
              onClick={handleResetForm}
              className="px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              Register Another
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-7 space-y-5">
          {/* Quick Demo Pre-fill Bar */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs flex items-center justify-between gap-2">
            <span className="text-slate-500 font-medium">Quick Fill Student:</span>
            <div className="flex flex-wrap items-center justify-end gap-1.5">
              {DEMO_STUDENTS.map(profile => (
                <button
                  key={profile.regNo}
                  type="button"
                  onClick={() => handleQuickFill(profile)}
                  title={`Fill ${profile.name}`}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-800"
                >
                  + {profile.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Student Fields */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100">
              Hosteller Identification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  placeholder="e.g. Ayush Dilip Sharma"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
                {errors.studentName && (
                  <p className="text-xs text-red-600 mt-1">{errors.studentName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Registration Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={regNo}
                  onChange={e => setRegNo(e.target.value)}
                  placeholder="e.g. 12505135"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono"
                />
                {errors.regNo && (
                  <p className="text-xs text-red-600 mt-1">{errors.regNo}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hostel Block / Room
                </label>
                <input
                  type="text"
                  value={hostelBlock}
                  onChange={e => setHostelBlock(e.target.value)}
                  placeholder="e.g. BS-11, Room B-226"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={e => setContactNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Garment Details */}
          <div className="space-y-3.5 pt-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100">
              Garment Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Number of Clothes <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={itemCount}
                  onChange={e => setItemCount(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-bold rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
                {errors.itemCount && (
                  <p className="text-xs text-red-600 mt-1">{errors.itemCount}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as ClothingCategory)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Intake Kiosk Location
                </label>
                <select
                  value={kioskLocation}
                  onChange={e => setKioskLocation(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                >
                  {[...KIOSK_OPTIONS, DEMO_STAFF.assignedKiosk]
                    .filter((location, index, locations) => locations.indexOf(location) === index)
                    .map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Special Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={e => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Formal shirt separate, double detergent for sportswear..."
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('/staff/dashboard')}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs active:scale-98 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Register Intake</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
