import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Clock3,
  GraduationCap,
  RefreshCw,
  ShieldCheck,
  Shirt,
  Sparkles,
  Waves
} from 'lucide-react';

const steps = ['Drop off', 'Wash & care', 'Pick up'];

export const RoleSelectionPage: React.FC = () => {
  const { loginAs, student, staff } = useAuth();
  const { resetData } = useOrders();
  const navigate = useNavigate();

  const handleEnterStudent = () => {
    loginAs('student');
    navigate('/student/dashboard');
  };

  const handleEnterStaff = () => {
    loginAs('staff');
    navigate('/staff/dashboard');
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f5f7f4] text-slate-900">
      <header className="relative z-10 border-b border-slate-200/80 bg-white/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-lg shadow-teal-900/15">
              <Waves className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold tracking-tight">Laundry<span className="text-teal-700">Track</span></p>
              <p className="text-[11px] font-medium text-slate-500">LPU campus laundry</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 sm:inline-flex">
              <GraduationCap className="h-4 w-4 text-teal-700" />
              Lovely Professional University
            </span>
            <button
              onClick={resetData}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              title="Restore demo orders and notifications"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset demo</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-137px)] max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-16">
        <section className="relative">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl" />
          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-teal-800 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Laundry day, made simpler
            </div>

            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
              Fresh clothes.
              <span className="block text-teal-700">Zero guesswork.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              A simpler way for LPU hostellers to send laundry, follow every wash stage, and know exactly where to collect it.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {steps.map((step, index) => (
                <React.Fragment key={step}>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs text-teal-800 ring-1 ring-slate-200">
                      {index + 1}
                    </span>
                    {step}
                  </div>
                  {index < steps.length - 1 && <ArrowRight className="h-4 w-4 text-slate-300" />}
                </React.Fragment>
              ))}
            </div>

            <div className="relative mt-11 max-w-lg overflow-hidden rounded-3xl bg-[#143e3a] p-6 text-white shadow-xl shadow-teal-950/15 sm:p-7">
              <div className="absolute -right-10 -top-14 h-48 w-48 rounded-full border-[28px] border-white/[0.06]" />
              <div className="relative flex items-start justify-between gap-5">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-teal-100">
                    <Shirt className="h-4 w-4" />
                    One clear journey
                  </div>
                  <p className="mt-2 text-xl font-semibold tracking-tight">From hamper to handoff.</p>
                  <p className="mt-1 text-sm leading-6 text-teal-100/75">
                    Your order and collection point stay together from start to finish.
                  </p>
                </div>
                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 sm:flex">
                  <Clock3 className="h-6 w-6 text-teal-100" />
                </div>
              </div>
              <div className="relative mt-6 flex items-center gap-2">
                {['Submitted', 'Received', 'Washing', 'Ready', 'Collected'].map((step, index) => (
                  <div key={step} className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-center">
                      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${index === 0 ? 'bg-lime-300 ring-4 ring-lime-300/15' : 'bg-white/35'}`} />
                      {index < 4 && <span className="h-px flex-1 bg-white/20" />}
                    </div>
                    <span className="truncate text-[10px] font-medium text-teal-100/75 sm:text-[11px]">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="portal-heading">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-800">Choose your workspace</p>
              <h2 id="portal-heading" className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">How can we help?</h2>
            </div>
            <ArrowDownRight className="mb-1 hidden h-5 w-5 text-slate-400 sm:block" />
          </div>

          <div className="grid gap-4">
            <article className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-xl hover:shadow-slate-900/[0.06] sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-800 ring-1 ring-teal-100">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900">I’m a student</h3>
                    <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-semibold text-teal-800">Hosteller</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">Place a request, check its progress, and get collection updates.</p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-slate-600">
                    <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-teal-700" /> Digital laundry token</span>
                    <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-teal-700" /> Live order updates</span>
                  </div>
                  <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400">
                    Demo profile · {student.name} · {student.hostelBlock}
                  </p>
                </div>
              </div>
              <button
                onClick={handleEnterStudent}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-teal-900/15 transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-700/20"
              >
                Open student portal <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </article>

            <article className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-xl hover:shadow-slate-900/[0.06] sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900">I’m laundry staff</h3>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">Operations</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">Manage incoming bags, update wash stages, and hand orders back.</p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-slate-600">
                    <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-teal-700" /> Keep the queue moving</span>
                    <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-teal-700" /> Organize pickup</span>
                  </div>
                  <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400">
                    Demo profile · {staff.name} · {staff.assignedKiosk}
                  </p>
                </div>
              </div>
              <button
                onClick={handleEnterStaff}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/15"
              >
                Open staff workspace <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </article>
          </div>
          <p className="mt-4 text-center text-xs text-slate-400">This is a demo experience for the INT335 Design Thinking Project.</p>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/70 px-5 py-4 text-center text-xs text-slate-500">
        Lovely Professional University <span className="mx-1.5 text-slate-300">•</span> INT335 Design Thinking <span className="mx-1.5 text-slate-300">•</span> Group P21
      </footer>
    </div>
  );
};
