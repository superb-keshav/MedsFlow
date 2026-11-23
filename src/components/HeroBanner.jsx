import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Stethoscope, ArrowRight, CheckCircle2, Package } from 'lucide-react';

export const HeroBanner = () => {
  const { setIsDoctorConsultOpen } = useStore();

  return (
    <section className="py-6 md:py-8">
      <div className="app-container">
        
        {/* Main Hero Card - Grounded neutral surface with hairline border */}
        <div className="rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 md:p-10 transition-colors">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Quiet Clinical Badge */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-teal-400"></span>
                <span>Licensed dispensary network</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 dark:text-slate-300">Schedule H compliant</span>
              </div>

              {/* Headline & Subhead */}
              <div className="space-y-2 max-w-xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                  Authentic medicines, dispensed by licensed pharmacists
                </h1>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                  Prescription treatments, chronic disease management, and diagnostic lab packages with temperature-controlled cold-chain verification.
                </p>
              </div>

              {/* Actions: One Primary, One Secondary */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#catalog"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-medium transition-colors"
                >
                  <Package size={16} />
                  <span>View catalog</span>
                  <ArrowRight size={14} />
                </a>

                <button
                  onClick={() => setIsDoctorConsultOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-medium transition-colors"
                >
                  <Stethoscope size={15} className="text-teal-600 dark:text-teal-400" />
                  <span>Consult doctor (₹199)</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-teal-600 dark:text-teal-400 flex-shrink-0" />
                  <span className="truncate">Direct manufacturer supply</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Package size={15} className="text-teal-600 dark:text-teal-400 flex-shrink-0" />
                  <span className="truncate">Tamper-evident packaging</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-teal-600 dark:text-teal-400 flex-shrink-0" />
                  <span className="truncate">Batch expiry tracked</span>
                </div>
              </div>

            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <img
                  src="/images/hero-banner.jpg"
                  alt="MedsFlow pharmaceutical dispensary"
                  className="w-full h-64 sm:h-72 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80";
                  }}
                />
                
                {/* Clean, quiet verification strip */}
                <div className="p-3 bg-white/95 dark:bg-[#121824]/95 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200 leading-tight">Batch inspection verified</p>
                      <p className="text-[11px] text-slate-500">Storage between 2°C – 25°C</p>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-slate-500">LOT-2026-X1</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
