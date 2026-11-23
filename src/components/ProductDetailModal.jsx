import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Plus,
  Minus
} from 'lucide-react';

export const ProductDetailModal = () => {
  const { selectedMedicine, setSelectedMedicine, cart, addToCart, updateQuantity } = useStore();

  if (!selectedMedicine) return null;

  const cartItem = cart.find((item) => item.medicine._id === selectedMedicine._id);
  const qty = cartItem ? cartItem.quantity : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xl p-5 sm:p-7">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedMedicine(null)}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
          
          {/* Left Column: Image & Specifications */}
          <div className="sm:col-span-5 space-y-3">
            <div className="w-full h-52 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-800">
              <img
                src={selectedMedicine.image}
                alt={selectedMedicine.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80";
                }}
              />
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Batch number:</span>
                <span className="text-slate-900 dark:text-white font-mono font-medium">{selectedMedicine.batchNumber}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Expiry date:</span>
                <span className="text-slate-900 dark:text-white font-mono font-medium">{selectedMedicine.expiryDate}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Manufacturer:</span>
                <span className="text-slate-900 dark:text-white truncate max-w-[120px] font-medium">{selectedMedicine.manufacturer}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Storage protocol:</span>
                <span className="text-slate-900 dark:text-white font-medium">
                  {selectedMedicine.coldChain ? '2°C – 8°C (Cold-chain)' : 'Below 25°C'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Medical Details */}
          <div className="sm:col-span-7 space-y-4">
            
            {/* Meta Strip */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
                <CheckCircle2 size={12} className="text-teal-600 dark:text-teal-400" />
                <span>Pharmacy verified</span>
              </span>
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded tabular-nums">
                {selectedMedicine.discount}% off
              </span>
            </div>

            {/* Title & Salt */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {selectedMedicine.name}
              </h2>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                Salt formulation: {selectedMedicine.salt || selectedMedicine.disease}
              </p>
              <p className="text-xs text-slate-500">
                Packaging: {selectedMedicine.packageSize}
              </p>
            </div>

            {/* Description */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-medium text-slate-900 dark:text-white">Clinical indications: </span>
              {selectedMedicine.description}
            </div>

            {/* Dosage */}
            <div className="text-xs space-y-1">
              <span className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <Clock size={12} className="text-slate-400" /> Recommended directions
              </span>
              <p className="text-slate-600 dark:text-slate-400 pl-4 leading-normal">
                {selectedMedicine.dosage}
              </p>
            </div>

            {/* Warnings */}
            <div className="text-xs space-y-1">
              <span className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <AlertTriangle size={12} className="text-amber-500" /> Precautionary notes
              </span>
              <p className="text-slate-600 dark:text-slate-400 pl-4 leading-normal">
                {selectedMedicine.sideEffects || 'Consult pharmacist if symptoms persist.'}
              </p>
            </div>

            {/* Pricing and Cart Stepper */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2 font-mono tabular-nums">
                  <span className="text-xl font-semibold text-slate-900 dark:text-white">
                    ₹{selectedMedicine.price}
                  </span>
                  {selectedMedicine.mrp > selectedMedicine.price && (
                    <span className="text-xs text-slate-400 line-through">
                      ₹{selectedMedicine.mrp}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400">Inclusive of GST</p>
              </div>

              {qty === 0 ? (
                <button
                  onClick={() => addToCart(selectedMedicine)}
                  className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs transition-colors flex items-center gap-1.5"
                >
                  <Plus size={14} /> Add to cart
                </button>
              ) : (
                <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-medium overflow-hidden tabular-nums">
                  <button
                    onClick={() => updateQuantity(selectedMedicine._id, -1)}
                    className="px-2.5 py-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="px-3 select-none">{qty}</span>
                  <button
                    onClick={() => updateQuantity(selectedMedicine._id, 1)}
                    className="px-2.5 py-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
