import React from 'react';
import { labTests } from '../data/healthData';
import { useStore } from '../context/StoreContext';
import { Clock, Home, CheckCircle2, ArrowRight } from 'lucide-react';

export const LabTestsSection = () => {
  const { showToast } = useStore();

  const handleBookTest = (test) => {
    showToast(`Home sample collection scheduled for ${test.title}`, 'success');
  };

  return (
    <section id="lab-tests" className="py-6 sm:py-8 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="app-container space-y-4">
        
        {/* Section Heading */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
              <span className="font-medium">NABL certified laboratory diagnostics</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
              Preventive health checkups and blood profiles
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Complimentary doorstep sample collection by verified phlebotomists. Reports delivered within 24 hours.
          </p>
        </div>

        {/* Test Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {labTests.map((test) => (
            <div
              key={test.id}
              className="flex flex-col justify-between rounded-xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-4 sm:p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div>
                {/* Meta Strip */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {test.badge}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded tabular-nums">
                    {test.discount}% off
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                  {test.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Includes <strong className="font-medium text-slate-700 dark:text-slate-300">{test.testsCount} biomarker tests</strong>
                </p>

                {/* Parameters */}
                <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {test.parameters.slice(0, 4).map((p, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 size={12} className="text-teal-600 dark:text-teal-400 flex-shrink-0" />
                      <span className="truncate">{p}</span>
                    </li>
                  ))}
                  {test.parameters.length > 4 && (
                    <li className="text-[10px] text-slate-400 pl-4">
                      + {test.parameters.length - 4} additional parameters
                    </li>
                  )}
                </ul>

                {/* Perks */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Home size={12} /> Doorstep collection
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {test.turnaround}
                  </span>
                </div>
              </div>

              {/* Price & Booking Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
                    <span className="text-lg font-semibold text-slate-900 dark:text-white">
                      ₹{test.price}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{test.mrp}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">Doctor analysis included</p>
                </div>
                <button
                  onClick={() => handleBookTest(test)}
                  className="px-3.5 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs transition-colors flex items-center gap-1"
                >
                  <span>Book</span>
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
