import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Clock,
  Truck,
  Phone,
  FileText,
  Printer,
  Snowflake
} from 'lucide-react';

export const OrderTrackingModal = () => {
  const { isTrackingOpen, setIsTrackingOpen, latestOrder } = useStore();
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
    { title: 'Order placed and received', desc: 'Prescription & cart registered with dispensary server', time: 'Just now', done: true },
    { title: 'Pharmacist verification passed', desc: 'Approved by Dr. Priya Sharma, Reg #DL-88219', time: '1 min ago', done: true },
    { title: 'Packed in cold-chain container', desc: 'Inspected for batch & expiry freshness (4.2°C)', time: '2 mins ago', done: true },
    { title: 'Out for delivery', desc: `Rider ${latestOrder.rider.name} en route`, time: `${etaTimer} mins away`, done: true, active: true },
    { title: 'Delivered at doorstep', desc: latestOrder.address, time: 'Pending', done: false }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-7">
        
        {/* Close Button */}
        <button
          onClick={() => setIsTrackingOpen(false)}
          aria-label="Close tracking"
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6 pr-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400"></span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Live dispatch
              </span>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white font-heading mt-0.5">
              Order <span className="font-mono tabular-nums">#{latestOrder.orderId}</span>
            </h2>
          </div>
          <button
            onClick={() => setShowInvoice(!showInvoice)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
          >
            <FileText size={14} />
            <span>{showInvoice ? 'Hide tax invoice' : 'View tax invoice'}</span>
          </button>
        </div>

        {/* Live Delivery Status Card */}
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 mb-5 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Clock size={13} className="text-teal-600 dark:text-teal-400" />
              <span>Estimated arrival</span>
            </span>
            <p className="text-2xl font-semibold text-slate-900 dark:text-white font-mono tabular-nums tracking-tight">
              {etaTimer} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">minutes</span>
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 truncate max-w-sm">
              Delivering to {latestOrder.address}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center text-teal-600 dark:text-teal-400 flex-shrink-0">
            <Truck size={22} />
          </div>
        </div>

        {/* Delivery Partner Details Card */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono text-xs font-medium flex items-center justify-center">
              RK
            </div>
            <div>
              <p className="text-xs font-medium text-slate-900 dark:text-white">
                {latestOrder.rider.name} <span className="text-slate-400 font-normal">• Partner</span>
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                {latestOrder.rider.vehicle}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-teal-700 dark:text-teal-400 font-mono mt-0.5">
                <Snowflake size={11} />
                <span>Cold-chain: {latestOrder.rider.temperature}</span>
              </div>
            </div>
          </div>
          <a
            href={`tel:${latestOrder.rider.phone}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium transition-colors"
          >
            <Phone size={13} /> Call partner
          </a>
        </div>

        {/* Tracking Timeline Stepper */}
        {!showInvoice ? (
          <div className="space-y-3 pl-1">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Fulfillment journey
            </h3>
            <div className="relative border-l border-slate-200 dark:border-slate-800 ml-2 space-y-4 pt-1">
              {steps.map((st, i) => (
                <div key={i} className="relative pl-5">
                  <div
                    className={`absolute -left-[7px] top-1 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                      st.active
                        ? 'bg-teal-600'
                        : st.done
                        ? 'bg-slate-400 dark:bg-slate-600'
                        : 'bg-slate-200 dark:bg-slate-800'
                    }`}
                  />
                  <div className="flex items-baseline justify-between gap-2">
                    <p className={`text-xs ${st.active ? 'font-medium text-teal-700 dark:text-teal-300' : st.done ? 'font-medium text-slate-900 dark:text-slate-100' : 'text-slate-400 dark:text-slate-500'}`}>
                      {st.title}
                    </p>
                    <span className="text-[11px] font-mono tabular-nums text-slate-400">{st.time}</span>
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
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 text-xs font-mono tabular-nums">
            <div className="flex justify-between border-b pb-2.5 border-slate-200 dark:border-slate-800">
              <div>
                <p className="font-semibold text-xs text-slate-900 dark:text-white">MedsFlow Healthcare Pvt Ltd</p>
                <p className="text-[11px] text-slate-500">Drug License: DL-20B-18942 / DL-21B-18943</p>
                <p className="text-[11px] text-slate-500">GSTIN: 07AABCM8821Q1Z8</p>
              </div>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1 text-[11px] text-teal-600 dark:text-teal-400 font-medium hover:underline self-start"
              >
                <Printer size={13} /> Print
              </button>
            </div>

            <div className="space-y-1.5 py-1">
              <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Itemised bill:</p>
              {latestOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                  <span>{it.medicine.name} × {it.quantity} <span className="text-slate-400">• Batch {it.medicine.batchNumber}</span></span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">₹{it.medicine.price * it.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-xs text-slate-900 dark:text-white">
              <span className="font-medium">Total paid ({latestOrder.paymentMethod.toUpperCase()}):</span>
              <span className="font-semibold text-teal-600 dark:text-teal-400">₹{latestOrder.grandTotal}</span>
            </div>

            <p className="text-[10px] text-slate-400 text-center pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
              Digitally certified by registered pharmacist • Schedule H compliance met
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
