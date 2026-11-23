import React from 'react';
import {
  HeartPulse,
  ShieldCheck,
  Snowflake,
  RotateCcw,
  CheckCircle2,
  Lock,
  PhoneCall
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-12 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
      
      {/* Trust Pillars Ribbon */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 py-7 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="app-container grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-600/10 text-teal-700 dark:text-teal-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white">Genuine medicines</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Direct from licensed pharmaceutical manufacturers</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-600/10 text-teal-700 dark:text-teal-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Snowflake size={18} />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white">Cold-chain storage</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Temperature-controlled dispatch boxes</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-600/10 text-teal-700 dark:text-teal-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white">Batch verification</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Inspected for expiry freshness before packaging</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-600/10 text-teal-700 dark:text-teal-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <RotateCcw size={18} />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white">Easy returns</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Tamper-proof safety seals guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="app-container py-10 grid grid-cols-1 md:grid-cols-12 gap-8 text-xs text-slate-600 dark:text-slate-400">
        
        {/* Brand Info */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white">
              <HeartPulse size={16} />
            </div>
            <span className="text-lg font-semibold text-slate-900 dark:text-white font-heading">
              Meds<span className="text-teal-600 dark:text-teal-400">Flow</span>
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
            Digital neighbourhood pharmacy providing verified essential medications, health checkups, and doctor consultations with complete regulatory compliance.
          </p>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 space-y-1">
            <p><span className="text-slate-700 dark:text-slate-300">Retail drug license:</span> DL-20B-18942 / DL-21B-18943</p>
            <p><span className="text-slate-700 dark:text-slate-300">FDA registration:</span> FDA-DL-2026-90412</p>
            <p><span className="text-slate-700 dark:text-slate-300">GSTIN:</span> 07AABCM8821Q1Z8</p>
          </div>
        </div>

        {/* Categories */}
        <div className="md:col-span-2 space-y-2.5">
          <h4 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider font-mono">
            Therapy areas
          </h4>
          <ul className="space-y-1.5">
            <li><a href="#catalog" className="hover:text-teal-600 dark:hover:text-teal-400">Fever & pain relief</a></li>
            <li><a href="#catalog" className="hover:text-teal-600 dark:hover:text-teal-400">Diabetes & insulin</a></li>
            <li><a href="#catalog" className="hover:text-teal-600 dark:hover:text-teal-400">Hypertension & cardiac</a></li>
            <li><a href="#catalog" className="hover:text-teal-600 dark:hover:text-teal-400">Acidity & stomach</a></li>
            <li><a href="#catalog" className="hover:text-teal-600 dark:hover:text-teal-400">Immunity & vitamins</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="md:col-span-2 space-y-2.5">
          <h4 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider font-mono">
            Clinical services
          </h4>
          <ul className="space-y-1.5">
            <li><span className="hover:text-teal-600 cursor-pointer">Doctor consultation (from ₹199)</span></li>
            <li><span className="hover:text-teal-600 cursor-pointer">Diagnostic lab panels</span></li>
            <li><span className="hover:text-teal-600 cursor-pointer">Generic substitution</span></li>
            <li><span className="hover:text-teal-600 cursor-pointer">Cold-chain handling</span></li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div className="md:col-span-3 space-y-2.5">
          <h4 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider font-mono">
            Dispensary helpline
          </h4>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-900 dark:text-slate-100 font-mono text-xs">
              <PhoneCall size={13} className="text-teal-600 dark:text-teal-400" />
              <span>1800-MEDSFLOW (Toll-free)</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Pharmacist assistance for all medication orders
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1 font-mono">
            <Lock size={12} className="text-teal-600 dark:text-teal-400" />
            <span>256-bit SSL encrypted checkout</span>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-200 dark:border-slate-800/80 py-4 text-[11px] text-slate-400 dark:text-slate-500">
        <div className="app-container flex items-center justify-between flex-wrap gap-2 font-mono">
          <p>© {new Date().getFullYear()} MedsFlow Healthcare Technologies. All rights reserved.</p>
          <p>
            Licensed online dispensary
          </p>
        </div>
      </div>

    </footer>
  );
};
