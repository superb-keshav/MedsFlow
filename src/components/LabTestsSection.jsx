import React from 'react';
import { labTests } from '../data/healthData';
import { useStore } from '../context/StoreContext';
import { Activity, Clock, Home, CheckCircle2, ArrowRight } from 'lucide-react';

export const LabTestsSection = () => {
  const { showToast } = useStore();

  const handleBookTest = (test) => {
    showToast(`Home Sample Collection booked for "${test.title}"! Technician will arrive at scheduled slot.`, 'success');
  };

  return (
    <section className="py-6">
      <div className="app-container space-y-4">
        
        {/* Section Heading */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                NABL Certified Labs & Checkups
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              Popular Health Packages & Blood Tests
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            Free sample pickup from home by vaccinated phlebotomists. Reports delivered to WhatsApp in 12 hours.
          </p>
        </div>

        {/* Test Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {labTests.map((test) => (
            <div
              key={test.id}
              className="flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-xl hover:border-teal-500/40 transition-all duration-300"
            >
              <div>
                {/* Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                    {test.badge}
                  </span>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                    {test.discount}% OFF
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug">
                  {test.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Includes <strong>{test.testsCount} Essential Tests</strong>
                </p>

                {/* Parameters List */}
                <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {test.parameters.slice(0, 4).map((p, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 size={12} className="text-teal-600 dark:text-teal-400 flex-shrink-0" />
                      <span className="truncate">{p}</span>
                    </li>
                  ))}
                  {test.parameters.length > 4 && (
                    <li className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold pl-4">
                      + {test.parameters.length - 4} more test parameters
                    </li>
                  )}
                </ul>

                {/* Perks */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Home size={12} className="text-teal-600" /> Free Home Pickup
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-teal-600" /> {test.turnaround}
                  </span>
                </div>
              </div>

              {/* Price & Booking Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      ₹{test.price}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{test.mrp}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">Free doctor report analysis</p>
                </div>
                <button
                  onClick={() => handleBookTest(test)}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all active:scale-95 flex items-center gap-1"
                >
                  <span>Book Now</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
