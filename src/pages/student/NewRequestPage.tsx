import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import type { ClothingCategory } from '../../types/order';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  User,
  Hash,
  Phone,
  MapPin,
  AlertCircle,
  Info,
  CheckCircle2
} from 'lucide-react';

const CATEGORIES: { label: ClothingCategory; description: string; icon: string }[] = [
  {
    label: 'Regular clothes',
    description: 'T-shirts, shirts, jeans, trousers, daily cotton wear',
    icon: '👕'
  },
  {
    label: 'Delicate clothes',
    description: 'Woolens, silk, kurtis, formal blazers, gentle wash',
    icon: '👔'
  },
  {
    label: 'Bedsheets',
    description: 'Hostel bedsheets, pillow covers, blankets, towels',
    icon: '🛏️'
  },
  {
    label: 'Other',
    description: 'Winter hoodies, lab coats, sports tracksuits',
    icon: '🧥'
  }
];

export const NewRequestPage: React.FC = () => {
  const { student } = useAuth();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  // Form State
  const [studentName, setStudentName] = useState(student.name);
  const [regNo, setRegNo] = useState(student.regNo);
  const [contactNumber, setContactNumber] = useState(student.phone);
  const [hostelBlock, setHostelBlock] = useState(`${student.hostelBlock}, Room ${student.roomNumber}`);
  const [itemCount, setItemCount] = useState<string>('8');
  const [category, setCategory] = useState<ClothingCategory>('Regular clothes');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [kioskLocation, setKioskLocation] = useState('Central UniMall Hub');

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!studentName.trim()) {
      newErrors.studentName = 'Student name is required.';
    }

    if (!regNo.trim()) {
      newErrors.regNo = 'Registration number is required.';
    }

    const countNum = parseInt(itemCount, 10);
    if (!itemCount || isNaN(countNum) || countNum <= 0) {
      newErrors.itemCount = 'Please enter at least 1 clothing item.';
    } else if (countNum > 25) {
      newErrors.itemCount = 'Maximum limit per token is 25 items.';
    }

    if (!category) {
      newErrors.category = 'Please choose a clothing category.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

      navigate(`/student/confirmation/${created.id}`);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const handleQuickCount = (val: number) => {
    setItemCount(String(val));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          New Laundry Request
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Submit your laundry details to generate a unique digital intake token.
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-7 space-y-6">
        {/* Section 1: Student Information */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100">
            Hosteller Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  placeholder="e.g. Aman Verma"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>
              {errors.studentName && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.studentName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Registration Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={regNo}
                  onChange={e => setRegNo(e.target.value)}
                  placeholder="e.g. 12209384"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-mono transition-all"
                />
              </div>
              {errors.regNo && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.regNo}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hostel Block & Room
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={hostelBlock}
                  onChange={e => setHostelBlock(e.target.value)}
                  placeholder="e.g. BH-2, Room 412"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contact Phone <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={e => setContactNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Garment Category */}
        <div className="space-y-3 pt-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100">
            Garment Category <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {CATEGORIES.map(cat => {
              const isSelected = category === cat.label;
              return (
                <div
                  key={cat.label}
                  onClick={() => setCategory(cat.label)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/50 ring-1 ring-teal-500/30'
                      : 'border-slate-200/90 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{cat.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-900">{cat.label}</p>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{cat.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {errors.category && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.category}
            </p>
          )}
        </div>

        {/* Section 3: Quantity & Instructions */}
        <div className="space-y-4 pt-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100">
            Order Specifics
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Item Count with quick select buttons */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Number of Clothes <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="25"
                  value={itemCount}
                  onChange={e => setItemCount(e.target.value)}
                  className="w-24 px-3 py-2 text-sm font-bold rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
                <div className="flex items-center gap-1">
                  {[5, 8, 12, 15].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleQuickCount(val)}
                      className={`px-2 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                        itemCount === String(val)
                          ? 'bg-teal-50 text-teal-800 border-teal-300'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
              {errors.itemCount && (
                <p className="text-xs text-red-600 mt-1">{errors.itemCount}</p>
              )}
            </div>

            {/* Drop-off Kiosk Hub */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Drop-off Kiosk Hub
              </label>
              <select
                value={kioskLocation}
                onChange={e => setKioskLocation(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-slate-800"
              >
                <option value="Central UniMall Hub">Central UniMall Hub (Primary)</option>
                <option value="Boys Hostel Kiosk (BH-2)">Boys Hostel Kiosk (BH-2 Desk)</option>
                <option value="Boys Hostel Kiosk (BH-4)">Boys Hostel Kiosk (BH-4 Desk)</option>
                <option value="Girls Hostel Kiosk (GH-2)">Girls Hostel Kiosk (GH-2 Desk)</option>
                <option value="Girls Hostel Kiosk (GH-1)">Girls Hostel Kiosk (GH-1 Desk)</option>
              </select>
            </div>

            {/* Special Instructions */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Special Care Instructions <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={2}
                value={specialInstructions}
                onChange={e => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Starch white collared shirts, delicate silk kurti, cold wash only..."
                className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Free Campus Laundry Note */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-2.5 text-xs text-slate-600">
          <Info className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
          <p>
            No online payment required. Laundry service is provided under student hostel amenities.
          </p>
        </div>

        {/* Submit Actions */}
        <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate('/student/dashboard')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 active:scale-98 rounded-xl shadow-sm shadow-teal-600/20 transition-all disabled:opacity-50"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit Laundry Request'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
