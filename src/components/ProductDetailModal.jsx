import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Zap,
  Plus,
  Minus
} from 'lucide-react';

export const ProductDetailModal = () => {
  const { selectedMedicine, setSelectedMedicine, cart, addToCart, updateQuantity } = useStore();

  if (!selectedMedicine) return null;

  const cartItem = cart.find((item) => item.medicine._id === selectedMedicine._id);
  const qty = cartItem ? cartItem.quantity : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 modal-animate-in">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedMedicine(null)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
          
          {/* Left Column: Image & Quick Badges */}
          <div className="sm:col-span-5 space-y-3">
            <div className="w-full h-56 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm">
              <img
                src={selectedMedicine.image}
                alt={selectedMedicine.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80";
                }}
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Batch Number:</span>
                <strong className="text-slate-900 dark:text-white font-mono">{selectedMedicine.batchNumber}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Expiry Date:</span>
                <strong className="text-emerald-600 dark:text-emerald-400">{selectedMedicine.expiryDate}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Manufacturer:</span>
                <strong className="text-slate-900 dark:text-white truncate max-w-[120px]">{selectedMedicine.manufacturer}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Storage:</span>
                <strong className="text-slate-900 dark:text-white">
                  {selectedMedicine.coldChain ? '❄️ 2°C - 8°C (Cold)' : 'Store below 25°C'}
                </strong>
              </div>
            </div>
          </div>

          {/* Right Column: Medical Details */}
          <div className="sm:col-span-7 space-y-4">
            
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                <CheckCircle2 size={13} /> 100% Genuine Pharmacy Certified
              </span>
              {selectedMedicine.expressDelivery && (
                <span className="text-xs font-bold px-2 py-1 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center gap-1">
                  <Zap size={12} fill="currentColor" /> 18m Delivery
                </span>
              )}
            </div>

            {/* Title & Salt */}
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                {selectedMedicine.name}
              </h2>
              <p className="text-xs font-semibold text-teal-700 dark:text-teal-400 mt-0.5">
                Salt: {selectedMedicine.salt || selectedMedicine.disease}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Package: {selectedMedicine.packageSize}
              </p>
            </div>

            {/* Description */}
            <div className="p-3 rounded-xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Indications: </strong>{selectedMedicine.description}
            </div>

            {/* Dosage & Directions */}
            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <Clock size={13} className="text-teal-600" /> Recommended Directions for Use:
              </span>
              <p className="text-slate-600 dark:text-slate-400 pl-4">
                {selectedMedicine.dosage}
              </p>
            </div>

            {/* Side Effects / Warnings */}
            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <AlertTriangle size={13} className="text-amber-500" /> Possible Side Effects:
              </span>
              <p className="text-slate-600 dark:text-slate-400 pl-4">
                {selectedMedicine.sideEffects || 'Well tolerated under recommended dosage.'}
              </p>
            </div>

            {/* Pricing and Cart Stepper */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    ₹{selectedMedicine.price}
                  </span>
                  {selectedMedicine.mrp > selectedMedicine.price && (
                    <span className="text-sm text-slate-400 line-through">
                      ₹{selectedMedicine.mrp}
                    </span>
                  )}
                  <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
                    {selectedMedicine.discount}% OFF
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Includes all taxes & cold-chain packing</p>
              </div>

              {qty === 0 ? (
                <button
                  onClick={() => addToCart(selectedMedicine)}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-lg shadow-teal-600/30 transition-all flex items-center gap-1.5"
                >
                  <Plus size={16} /> Add to Cart
                </button>
              ) : (
                <div className="flex items-center rounded-xl bg-teal-600 text-white font-bold text-sm shadow-md overflow-hidden">
                  <button
                    onClick={() => updateQuantity(selectedMedicine._id, -1)}
                    className="px-3 py-2 hover:bg-teal-700 transition-colors"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="px-3 select-none">{qty}</span>
                  <button
                    onClick={() => updateQuantity(selectedMedicine._id, 1)}
                    className="px-3 py-2 hover:bg-teal-700 transition-colors"
                  >
                    <Plus size={15} />
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
