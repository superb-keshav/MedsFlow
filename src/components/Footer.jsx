import React from 'react';
import {
  HeartPulse,
  ShieldCheck,
  Truck,
  PhoneCall,
  RotateCcw,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-12 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
      
      {/* Trust Pillars Ribbon */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 py-8 bg-slate-50/50 dark:bg-slate-900/40">
        <div className="app-container grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">100% Genuine Medicines</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Direct from licensed pharmaceutical manufacturers</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">18-Min Cold-Chain</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Insulated temperature-controlled dispatch boxes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Quality Checked</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Inspected for batch expiry freshness</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
              <RotateCcw size={24} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Easy Returns</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Tamper-proof safety seals guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="app-container py-10 grid grid-cols-1 md:grid-cols-12 gap-8 text-xs text-slate-600 dark:text-slate-400">
        
        {/* Brand Info */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white">
              <HeartPulse size={18} />
            </div>
            <span className="text-xl font-black text-slate-900 dark:text-white font-heading">
              Meds<span className="text-teal-600 dark:text-teal-400">Flow</span>
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
            Online medical store providing doorstep access to genuine essential medicines, health checkups, and doctor consultations with complete regulatory compliance.
          </p>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
            <p><strong>Retail Drug License:</strong> DL-20B-18942 / DL-21B-18943</p>
            <p><strong>Food & Drug Administration (FDA) Reg:</strong> FDA-DL-2026-90412</p>
            <p><strong>GST Identification Number:</strong> 07AABCM8821Q1Z8</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2 space-y-2.5">
          <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
            Therapy Categories
          </h4>
          <ul className="space-y-1.5">
            <li><a href="#catalog" className="hover:text-teal-600 dark:hover:text-teal-400">Fever & Pain Relief</a></li>
            <li><a href="#catalog" className="hover:text-teal-600 dark:hover:text-teal-400">Diabetes Care & Insulin</a></li>
            <li><a href="#catalog" className="hover:text-teal-600 dark:hover:text-teal-400">Hypertension & Cardiac</a></li>
            <li><a href="#catalog" className="hover:text-teal-600 dark:hover:text-teal-400">Acidity & Stomach Relief</a></li>
            <li><a href="#catalog" className="hover:text-teal-600 dark:hover:text-teal-400">Immunity & Multivitamins</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="md:col-span-2 space-y-2.5">
          <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
            Patient Services
          </h4>
          <ul className="space-y-1.5">
            <li><span className="hover:text-teal-600 cursor-pointer">Doctor Consultation (From ₹199)</span></li>
            <li><span className="hover:text-teal-600 cursor-pointer">Full Body Lab Checkups</span></li>
            <li><span className="hover:text-teal-600 cursor-pointer">Generic Medicine Savings</span></li>
            <li><span className="hover:text-teal-600 cursor-pointer">Cold-Chain Medicine Handling</span></li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div className="md:col-span-3 space-y-2.5">
          <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
            Helpline & Support
          </h4>
          <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/60 space-y-1">
            <div className="flex items-center gap-1.5 text-teal-800 dark:text-teal-300 font-bold">
              <PhoneCall size={14} />
              <span>1800-MEDSFLOW (Toll-Free)</span>
            </div>
            <p className="text-[11px] text-teal-700 dark:text-teal-400">
              Customer support assistance for all medication orders
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400 pt-1">
            <Lock size={12} className="text-emerald-500" />
            <span>256-bit Bank-Grade SSL Secure Checkout</span>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-100 dark:border-slate-800/80 py-4 text-center text-[11px] text-slate-400 dark:text-slate-500">
        <div className="app-container flex items-center justify-between flex-wrap gap-2">
          <p>© {new Date().getFullYear()} MedsFlow Healthcare Technologies. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React • High-Performance Digital Pharmacy
          </p>
        </div>
      </div>

    </footer>
  );
};
