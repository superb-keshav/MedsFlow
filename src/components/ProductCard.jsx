import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Plus,
  Minus,
  Zap,
  CheckCircle2,
  Info,
  Star,
  Snowflake,
  TrendingDown
} from 'lucide-react';

export const ProductCard = ({ medicine }) => {
  const { cart, addToCart, updateQuantity, setSelectedMedicine } = useStore();

  const cartItem = cart.find((item) => item.medicine._id === medicine._id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 shadow-sm hover:shadow-xl hover:border-teal-500/40 transition-all duration-300">
      
      {/* Top Badges */}
      <div className="flex items-center justify-between gap-1 mb-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          {medicine.expressDelivery && (
            <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
              <Zap size={10} fill="currentColor" /> 18m
            </span>
          )}
          {medicine.coldChain && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800" title="Cold-Chain Storage Required">
              <Snowflake size={10} /> Cold-Chain
            </span>
          )}
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-0.5">
            <CheckCircle2 size={10} /> 100% Genuine
          </span>
        </div>

        {/* Discount Badge */}
        {medicine.discount > 0 && (
          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-teal-600 text-white shadow-xs">
            {medicine.discount}% OFF
          </span>
        )}
      </div>

      {/* Product Image & Quick Info Trigger */}
      <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800/50 mb-3 flex items-center justify-center cursor-pointer group-hover:scale-[1.01] transition-transform" onClick={() => setSelectedMedicine(medicine)}>
        <img
          src={medicine.image}
          alt={medicine.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
          className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
          title="View medical composition, usage & warnings"
        >
          <Info size={14} />
        </button>

        {/* Rating Pill */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 text-[10px] font-bold shadow-xs backdrop-blur-sm">
          <Star size={10} className="text-amber-500 fill-amber-500" />
          <span>{medicine.rating || '4.8'}</span>
          <span className="text-slate-400 font-normal">({medicine.reviews || '1.2k'})</span>
        </div>
      </div>

      {/* Medicine Info */}
      <div className="space-y-1 mb-3 flex-1 cursor-pointer" onClick={() => setSelectedMedicine(medicine)}>
        
        {/* Name */}
        <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug line-clamp-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          {medicine.name}
        </h3>

        {/* Active Salt Composition */}
        <div className="text-[11px] font-medium text-teal-700 dark:text-teal-400 line-clamp-1 bg-teal-50/80 dark:bg-teal-950/40 px-1.5 py-0.5 rounded inline-block">
          {medicine.salt || medicine.disease}
        </div>

        {/* Manufacturer & Packaging */}
        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 pt-0.5">
          {medicine.manufacturer} • {medicine.packageSize}
        </p>

        {/* Batch and Expiry Verification */}
        <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
          <span>Exp: {medicine.expiryDate}</span>
          <span>•</span>
          <span>Batch {medicine.batchNumber}</span>
        </div>

        {/* Generic Alternative Savings Tip */}
        {medicine.genericAlternative && (
          <div className="mt-1.5 p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 text-[10px] text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
            <TrendingDown size={12} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span className="truncate">
              Generic alt available: <strong>₹{medicine.genericAlternative.price}</strong> ({medicine.genericAlternative.savingsPercent}% off)
            </span>
          </div>
        )}
      </div>

      {/* Pricing & Add-to-Cart Stepper */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-slate-900 dark:text-white">
              ₹{medicine.price}
            </span>
            {medicine.mrp > medicine.price && (
              <span className="text-xs text-slate-400 line-through">
                ₹{medicine.mrp}
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-400 dark:text-slate-500">
            Inclusive of all taxes
          </p>
        </div>

        {/* Dynamic Quantity Controller */}
        {quantityInCart === 0 ? (
          <button
            onClick={() => addToCart(medicine)}
            className="flex items-center gap-1 px-4 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-600 text-teal-700 dark:text-teal-300 hover:text-white border border-teal-300 dark:border-teal-700 hover:border-teal-600 font-bold text-xs shadow-xs transition-all duration-200 active:scale-95"
          >
            <Plus size={14} />
            <span>ADD</span>
          </button>
        ) : (
          <div className="flex items-center rounded-xl bg-teal-600 text-white font-bold text-xs shadow-md shadow-teal-600/25 overflow-hidden">
            <button
              onClick={() => updateQuantity(medicine._id, -1)}
              className="px-2.5 py-1.5 hover:bg-teal-700 transition-colors"
              title="Decrease quantity"
            >
              <Minus size={13} />
            </button>
            <span className="px-2 font-black text-xs select-none">
              {quantityInCart}
            </span>
            <button
              onClick={() => updateQuantity(medicine._id, 1)}
              className="px-2.5 py-1.5 hover:bg-teal-700 transition-colors"
              title="Increase quantity"
            >
              <Plus size={13} />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
