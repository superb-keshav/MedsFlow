import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  CheckCircle2,
  Clock,
  Truck,
  ShieldCheck,
  Phone,
  FileText,
  Printer,
  Sparkles,
  MapPin,
  Snowflake
} from 'lucide-react';

export const OrderTrackingModal = () => {
  const { isTrackingOpen, setIsTrackingOpen, latestOrder } = useStore();
  const [currentStep, setCurrentStep] = useState(3); // 1: Placed, 2: Pharmacist Verified, 3: Packed & Out for delivery
  const [etaTimer, setEtaTimer] = useState(14);
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    if (!isTrackingOpen) return;
    const interval = setInterval(() => {
      setEtaTimer((prev) => (prev > 1 ? prev - 1 : 1));
    }, 12000);
    return () => clearInterval(interval);
  }, [isTrackingOpen]);

  if (!isTrackingOpen || !latestOrder) return null;

  const steps = [
    { title: 'Order Placed & Received', desc: 'Prescription & cart registered with store server', time: 'Just now', done: true },
    { title: 'Pharmacist Verification Passed', desc: 'Approved by Dr. Priya Sharma, Reg #DL-88219', time: '1 min ago', done: true },
    { title: 'Packed in Cold-Chain Container', desc: 'Inspected for batch & expiry freshness (4.2°C)', time: '2 mins ago', done: true },
    { title: 'Out for Express Delivery', desc: `Rider ${latestOrder.rider.name} en route`, time: `${etaTimer} mins away`, done: true, active: true },
    { title: 'Delivered at Doorstep', desc: latestOrder.address, time: 'Pending', done: false }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 modal-animate-in">
        
        {/* Close Button */}
        <button
          onClick={() => setIsTrackingOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="beacon-dot"></span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Live Order Tracking
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              Order #{latestOrder.orderId}
            </h2>
          </div>
          <button
            onClick={() => setShowInvoice(!showInvoice)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
          >
            <FileText size={14} />
            <span>{showInvoice ? 'Hide Tax Invoice' : 'View Tax Invoice'}</span>
          </button>
        </div>

        {/* Live Delivery Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-900 to-emerald-950 text-white shadow-lg mb-6 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1">
              <Clock size={13} /> Estimated Arrival
            </span>
            <p className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {etaTimer} <span className="text-lg font-semibold text-teal-200">Minutes</span>
            </p>
            <p className="text-xs text-teal-100 truncate max-w-xs">
              Delivering to {latestOrder.address}
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-teal-300 backdrop-blur-md">
            <Truck size={30} className="animate-bounce" />
          </div>
        </div>

        {/* Delivery Partner Details Card */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-teal-600 text-white font-black text-sm flex items-center justify-center shadow-md">
              RK
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                {latestOrder.rider.name} (Delivery Partner)
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {latestOrder.rider.vehicle}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-cyan-600 dark:text-cyan-400 mt-0.5">
                <Snowflake size={11} />
                <span>{latestOrder.rider.temperature}</span>
              </div>
            </div>
          </div>
          <a
            href={`tel:${latestOrder.rider.phone}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-colors"
          >
            <Phone size={13} /> Call
          </a>
        </div>

        {/* Tracking Timeline Stepper */}
        {!showInvoice ? (
          <div className="space-y-4 pl-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Fulfillment Journey
            </h3>
            <div className="relative border-l-2 border-teal-500/30 dark:border-teal-500/20 ml-3 space-y-5">
              {steps.map((st, i) => (
                <div key={i} className="relative pl-6">
                  <div
                    className={`absolute -left-[9px] top-0.5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center ${
                      st.active
                        ? 'bg-amber-400 ring-4 ring-amber-400/30 animate-pulse'
                        : st.done
                        ? 'bg-teal-600'
                        : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  ></div>
                  <div className="flex items-baseline justify-between">
                    <p className={`text-xs font-bold ${st.done ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                      {st.title}
                    </p>
                    <span className="text-[10px] text-slate-400">{st.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Pharmacy Tax Invoice View */
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 text-xs font-mono">
            <div className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-800">
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">MedsFlow Healthcare Pvt Ltd</p>
                <p className="text-[10px] text-slate-500">Drug License: DL-20B-18942 / DL-21B-18943</p>
                <p className="text-[10px] text-slate-500">GSTIN: 07AABCM8821Q1Z8</p>
              </div>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1 text-[11px] text-teal-600 font-bold hover:underline"
              >
                <Printer size={13} /> Print
              </button>
            </div>

            <div className="space-y-1">
              <p className="font-bold text-slate-800 dark:text-slate-200">Prescription Bill Details:</p>
              {latestOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                  <span>{it.medicine.name} (x{it.quantity}) • Batch: {it.medicine.batchNumber}</span>
                  <span className="font-bold">₹{it.medicine.price * it.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between font-bold text-sm text-slate-900 dark:text-white">
              <span>Grand Total Paid ({latestOrder.paymentMethod.toUpperCase()}):</span>
              <span className="text-teal-600 dark:text-teal-400">₹{latestOrder.grandTotal}</span>
            </div>

            <p className="text-[10px] text-slate-400 text-center pt-2">
              *** Digitally certified by Registered Pharmacist • Schedule H Compliance Met ***
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
