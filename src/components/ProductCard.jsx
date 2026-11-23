import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Plus,
  Minus,
  CheckCircle2,
  Info,
  Snowflake,
  TrendingDown
} from 'lucide-react';

export const ProductCard = ({ medicine }) => {
  const { cart, addToCart, updateQuantity, setSelectedMedicine } = useStore();

  const cartItem = cart.find((item) => item.medicine._id === medicine._id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <div className="group relative flex flex-col justify-between rounded-xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 p-3 sm:p-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
      
      {/* Top Meta Strip */}
      <div className="flex items-center justify-between gap-1 mb-2 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          {medicine.coldChain && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
              <Snowflake size={11} className="text-teal-600 dark:text-teal-400" />
              <span>Cold chain</span>
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 dark:text-slate-400">
            <CheckCircle2 size={11} className="text-emerald-600 dark:text-emerald-400" />
            <span>Verified</span>
          </span>
        </div>

        {/* Quiet Discount Badge */}
        {medicine.discount > 0 && (
          <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded tabular-nums">
            {medicine.discount}% off
          </span>
        )}
      </div>

      {/* Product Image */}
      <div
        className="relative w-full h-28 sm:h-36 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900 mb-2.5 flex items-center justify-center cursor-pointer"
        onClick={() => setSelectedMedicine(medicine)}
      >
        <img
          src={medicine.image}
          alt={medicine.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80";
          }}
        />
        
        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedMedicine(medicine);
          }}
          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-md bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          title="View medical details"
        >
          <Info size={13} />
        </button>
      </div>

      {/* Medicine Info */}
      <div className="space-y-1 mb-3 flex-1 cursor-pointer" onClick={() => setSelectedMedicine(medicine)}>
        
        {/* Title */}
        <h3 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug line-clamp-1">
          {medicine.name}
        </h3>

        {/* Salt Formulation */}
        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
          {medicine.salt || medicine.disease}
        </div>

        {/* Manufacturer & Pack Size */}
        <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
          {medicine.manufacturer} &bull; {medicine.packageSize}
        </p>

        {/* Generic Alternative Tip */}
        {medicine.genericAlternative && (
          <div className="mt-1 p-1.5 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-300 flex items-center gap-1">
            <TrendingDown size={11} className="text-teal-600 dark:text-teal-400 flex-shrink-0" />
            <span className="truncate">
              Generic alt: <strong className="font-mono tabular-nums font-semibold">₹{medicine.genericAlternative.price}</strong> ({medicine.genericAlternative.savingsPercent}% lower)
            </span>
          </div>
        )}
      </div>

      {/* Pricing & Add/Stepper Row */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1 mt-auto">
        <div>
          <div className="flex items-baseline gap-1 font-mono tabular-nums">
            <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
              ₹{medicine.price}
            </span>
            {medicine.mrp > medicine.price && (
              <span className="text-[11px] text-slate-400 line-through">
                ₹{medicine.mrp}
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-400 font-normal">
            Tax incl.
          </p>
        </div>

        {/* Add Button or Stepper */}
        {quantityInCart === 0 ? (
          <button
            onClick={() => addToCart(medicine)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium transition-colors"
          >
            <Plus size={13} />
            <span>Add</span>
          </button>
        ) : (
          <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium overflow-hidden font-mono tabular-nums">
            <button
              onClick={() => updateQuantity(medicine._id, -1)}
              className="px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span className="px-2 text-xs font-semibold select-none">
              {quantityInCart}
            </span>
            <button
              onClick={() => updateQuantity(medicine._id, 1)}
              className="px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
