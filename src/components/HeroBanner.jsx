import React from 'react';
import { useStore } from '../context/StoreContext';
import { Zap, ShieldCheck, Stethoscope, ArrowRight, CheckCircle2, PackageCheck } from 'lucide-react';

export const HeroBanner = () => {
  const { setIsDoctorConsultOpen } = useStore();

  return (
    <section className="py-4 md:py-6">
      <div className="app-container">
        
        {/* Main Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-900 via-slate-900 to-emerald-950 text-white shadow-2xl border border-teal-800/40">
          
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8 md:p-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-4 md:space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold backdrop-blur-md">
                <span className="beacon-dot"></span>
                <span>Hyperlocal Digital Pharmacy Network</span>
                <span className="text-teal-400">•</span>
                <span className="text-white font-bold flex items-center gap-1">
                  <Zap size={12} fill="currentColor" className="text-amber-400" /> 18-Min Dispatch
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15]">
                  Instant Medicines, <br />
                  <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                    Delivered in Minutes.
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-slate-300 max-w-lg font-normal leading-relaxed">
                  Genuine essential medicines, chronic disease care, and wellness essentials delivered straight from licensed pharmacies with cold-chain verification.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#catalog"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-slate-950 font-bold text-sm shadow-xl shadow-teal-500/20 transition-all hover:scale-105 active:scale-95"
                >
                  <PackageCheck size={18} className="text-slate-950" />
                  <span>Browse Medicines</span>
                  <ArrowRight size={16} />
                </a>

                <button
                  onClick={() => setIsDoctorConsultOpen(true)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-semibold text-sm transition-all hover:border-teal-500"
                >
                  <Stethoscope size={16} className="text-teal-400" />
                  <span>Consult Doctor (Fee: ₹199)</span>
                </button>
              </div>

              {/* Trust Badges - (24x7 removed) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 border-t border-slate-800 text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-teal-400 flex-shrink-0" />
                  <span>100% Genuine Stock</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PackageCheck size={16} className="text-teal-400 flex-shrink-0" />
                  <span>Tamper-Proof Pack</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-teal-400 flex-shrink-0" />
                  <span>Verified Medical Store</span>
                </div>
              </div>

            </div>

            {/* Right Visual Image Column */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-2 border-teal-500/20 group">
                <img
                  src="/images/hero-banner.jpg"
                  alt="MedsFlow 18-minute express medicine delivery"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                
                {/* Floating Micro-Card Over Image */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl glass-panel text-slate-900 dark:text-white border border-white/20 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                      ✓
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">Batch & Expiry Safe</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Fresh Batches Guaranteed</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-extrabold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-1 rounded-md">
                    Verified
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
