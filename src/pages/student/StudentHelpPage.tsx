import React from 'react';
import {
  Clock,
  MapPin,
  HelpCircle
} from 'lucide-react';

export const StudentHelpPage: React.FC = () => {
  const faqs = [
    {
      q: 'How do I submit my laundry using LaundryTrack?',
      a: 'Go to "Place Laundry Request", enter your item count and choose the clothing category. You will instantly get a unique Order ID (e.g. LT-2026-0005). Put your clothes in your laundry bag with this token number and drop it at your assigned campus kiosk.'
    },
    {
      q: 'What are the 5 stages of laundry processing?',
      a: 'The 5 stages are: (1) Submitted – your digital slip is generated; (2) Received – staff has verified your bag at the counter; (3) Washing – your clothes are in the eco-wash drum; (4) Ready – clothes are ironed, folded, and packaged on the shelf; (5) Collected – clothes handed back to you.'
    },
    {
      q: 'How will I know when my clothes are ready for pickup?',
      a: 'When laundry staff marks your order as "Ready", your dashboard and tracker will immediately show a vibrant "Ready For Pickup" banner with pickup counter information, and an in-app notification will be triggered.'
    },
    {
      q: 'Is there any fee or payment required?',
      a: 'No. Campus laundry is an inclusive student amenity included in hostel provisions for LPU hostellers.'
    },
    {
      q: 'What is the maximum number of items allowed?',
      a: 'Each student can submit up to 15-20 clothes per load. For blankets or bulk bedsheets, please select the "Bedsheets" category.'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Campus Laundry Guidelines & FAQs
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Campus operating hours, collection points, and common questions.
        </p>
      </div>

      {/* Campus Timings & Counters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Operating Hours</h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Morning Drop-off:</span>
              <span className="font-semibold text-slate-800">08:30 AM – 11:30 AM</span>
            </li>
            <li className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Evening Collection:</span>
              <span className="font-semibold text-slate-800">04:00 PM – 07:30 PM</span>
            </li>
            <li className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Turnaround:</span>
              <span className="font-semibold text-teal-700">24 to 36 Hours</span>
            </li>
            <li className="flex justify-between py-1">
              <span className="text-slate-500">Sunday:</span>
              <span className="font-medium text-slate-700">Drop-off only (Half day)</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Campus Hubs</h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="py-1 border-b border-slate-100">
              <span className="font-semibold text-slate-900 block">UniMall Kiosk</span>
              <span className="text-slate-400">Campus-wide drop-off and central laundry service</span>
            </li>
            <li className="py-1 border-b border-slate-100">
              <span className="font-semibold text-slate-900 block">Boys’ Hostel Desks</span>
              <span className="text-slate-400">BH-11 / UniMall Kiosk, BH-11 Counter, and BH-1 Central Desk</span>
            </li>
            <li className="py-1">
              <span className="font-semibold text-slate-900 block">Girls Hostel Desks</span>
              <span className="text-slate-400">GH-2 Counter and GH-4 Laundry Desk</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <HelpCircle className="w-4 h-4 text-teal-600" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                {faq.q}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Project Credit Note */}
      <div className="p-4 rounded-xl bg-slate-100/70 text-xs text-slate-500 space-y-1">
        <p className="font-semibold text-slate-700">Lovely Professional University • INT335 Design Thinking (Group P21)</p>
        <p className="text-[11px] text-slate-400">
          Project prototype developed using the Double Diamond design thinking model to eliminate campus laundry status ambiguity.
        </p>
      </div>
    </div>
  );
};
