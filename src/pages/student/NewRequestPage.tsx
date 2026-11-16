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
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Sparkles
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
  const [itemCount, setItemCount] = useState<string>('8');
  const [category, setCategory] = useState<ClothingCategory>('Regular clothes');
  const [specialInstructions, setSpecialInstructions] = useState('');

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
        hostelBlock: `${student.hostelBlock}, Room ${student.roomNumber}`,
        itemCount: parseInt(itemCount, 10),
        category,
        specialInstructions,
        kioskLocation: student.assignedKiosk
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
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/student/dashboard')}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-teal-800">
            <Sparkles className="h-3.5 w-3.5" />
            CAMPUS LAUNDRY
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Create a laundry request
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Tell us what you’re sending. We’ll keep you posted from drop-off to pickup.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { number: '01', title: 'Share your details', text: 'Confirm your student and hostel info' },
          { number: '02', title: 'Choose your laundry', text: 'Count items and add care notes' },
          { number: '03', title: 'Drop it off', text: 'Use the right campus collection point' }
        ].map(step => (
          <div key={step.number} className="rounded-2xl border border-slate-200/80 bg-white/80 p-4">
            <span className="text-[11px] font-bold tracking-widest text-teal-700">{step.number}</span>
            <p className="mt-2 text-sm font-semibold text-slate-800">{step.title}</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">{step.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        {/* Section 1: Student Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 text-xs font-bold text-teal-800">1</span>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Your details</h2>
              <p className="text-xs text-slate-500">Used to label and return your laundry</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Student Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  placeholder="e.g. Ayush Dilip Sharma"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-9 pr-3 text-sm transition-all focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-600/10"
                />
              </div>
              {errors.studentName && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.studentName}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Registration Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={regNo}
                  onChange={e => setRegNo(e.target.value)}
                  placeholder="e.g. 12505135"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-9 pr-3 font-mono text-sm transition-all focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-600/10"
                />
              </div>
              {errors.regNo && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.regNo}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <span className="mb-1.5 block text-xs font-semibold text-slate-700">Registered hostel & room</span>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-teal-700" />
                <span className="text-sm font-medium text-slate-800">{student.hostelBlock}, Room {student.roomNumber}</span>
                <span className="ml-auto hidden rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 ring-1 ring-slate-200 sm:inline">From your profile</span>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Contact Phone <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={e => setContactNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-9 pr-3 text-sm transition-all focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-600/10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Garment Category */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 text-xs font-bold text-teal-800">2</span>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">What are you sending?</h2>
              <p className="text-xs text-slate-500">Choose the closest match for your laundry</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {CATEGORIES.map(cat => {
              const isSelected = category === cat.label;
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setCategory(cat.label)}
                  aria-pressed={isSelected}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/60 ring-2 ring-teal-600/10'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">{cat.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900">{cat.label}</p>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-teal-700" />}
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{cat.description}</p>
                    </div>
                  </div>
                </button>
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
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 text-xs font-bold text-teal-800">3</span>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Drop-off & care</h2>
              <p className="text-xs text-slate-500">Set your quantity and tell us where to meet you</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Item Count with quick select buttons */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Number of Clothes <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="25"
                  value={itemCount}
                  onChange={e => setItemCount(e.target.value)}
                  className="w-24 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-sm font-bold focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-600/10"
                />
                <div className="flex items-center gap-1">
                  {[5, 8, 12, 15].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleQuickCount(val)}
                      className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
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
              <span className="mb-1.5 block text-xs font-semibold text-slate-700">Assigned drop-off kiosk</span>
              <div className="flex min-h-[42px] items-center gap-2 rounded-xl border border-teal-100 bg-teal-50/60 px-3 py-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-teal-700" />
                <span className="text-sm font-semibold text-slate-800">{student.assignedKiosk}</span>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Special Care Instructions <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={2}
                value={specialInstructions}
                onChange={e => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Starch white collared shirts, delicate silk kurti, cold wash only..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-sm transition-all placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-600/10"
              />
            </div>
          </div>
        </div>

        {/* Free Campus Laundry Note */}
        <div className="flex items-start gap-3 rounded-2xl border border-teal-100 bg-teal-50/60 p-4 text-sm text-slate-600">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
          <div>
            <p className="font-semibold text-slate-800">No payment needed here</p>
            <p className="mt-0.5 text-xs leading-5">Your request is registered with a digital token. Pay at the laundry counter only if your campus service requires it.</p>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-slate-400">You can track your request as soon as it’s submitted.</p>
          <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/student/dashboard')}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-900/15 transition-all hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit Laundry Request'}</span>
          </button>
          </div>
        </div>
      </form>
    </div>
  );
};
