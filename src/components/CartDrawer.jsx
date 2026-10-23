import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Truck
} from 'lucide-react';
import { coupons } from '../data/healthData';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    cartCount,
    cartSubtotal,
    cartMrpTotal,
    totalItemSavings,
    couponDiscount,
    deliveryFee,
    grandTotal,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    pincode,
    setIsCheckoutOpen
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 199;
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm">
      <div className="w-full max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col drawer-slide-in">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <ShoppingBag size={18} />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                Your Order Cart
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {cartCount} item{cartCount !== 1 ? 's' : ''} • Deliver to {pincode}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="bg-teal-50 dark:bg-teal-950/40 p-3 border-b border-teal-100 dark:border-teal-900/40">
          {deliveryFee === 0 ? (
            <div className="flex items-center gap-2 text-xs font-bold text-teal-800 dark:text-teal-300">
              <Truck size={15} className="text-teal-600 dark:text-teal-400" />
              <span>🎉 You unlocked FREE 18-Min Delivery</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-teal-900 dark:text-teal-300">
                <span>Add ₹{amountToFreeDelivery} more for FREE delivery</span>
                <span>Threshold: ₹{freeDeliveryThreshold}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-teal-200 dark:bg-teal-900 overflow-hidden">
                <div
                  className="h-full bg-teal-600 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Empty Cart State */}
          {cart.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <ShoppingBag size={32} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  Your cart is empty
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Browse our genuine catalog of medicines and healthcare items
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 transition-colors shadow-sm"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.medicine._id}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img
                        src={item.medicine.image}
                        alt={item.medicine.name}
                        className="w-12 h-12 rounded-xl object-cover bg-white flex-shrink-0 border border-slate-200 dark:border-slate-700"
                      />
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.medicine.name}
                        </h4>
                        <p className="text-[11px] text-teal-600 dark:text-teal-400 truncate">
                          {item.medicine.packageSize}
                        </p>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-xs font-black text-slate-900 dark:text-white">
                            ₹{item.medicine.price * item.quantity}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            (₹{item.medicine.price} each)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stepper + Delete */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.medicine._id, -1)}
                          className="p-1 px-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="px-2 font-bold text-slate-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.medicine._id, 1)}
                          className="p-1 px-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.medicine._id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Coupon Section */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <Tag size={13} className="text-teal-600" /> Apply Coupon
                  </span>
                  {activeCoupon && (
                    <button
                      onClick={removeCoupon}
                      className="text-rose-600 hover:underline font-semibold text-[11px]"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {activeCoupon ? (
                  <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-950/80 border border-teal-300 dark:border-teal-700 text-xs font-bold text-teal-900 dark:text-teal-200 flex items-center justify-between">
                    <span>Coupon '{activeCoupon.code}' Applied!</span>
                    <span className="text-emerald-600 dark:text-emerald-400">-₹{couponDiscount}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Enter promo code (e.g. MEDS25)"
                      className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 uppercase font-mono"
                    />
                    <button
                      onClick={() => {
                        if (applyCoupon(inputCoupon)) setInputCoupon('');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Bill Details */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                <p className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
                  Bill Breakdown
                </p>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Item Total (MRP):</span>
                  <span>₹{cartMrpTotal}</span>
                </div>
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Product Discount:</span>
                  <span>-₹{totalItemSavings}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>Coupon Savings:</span>
                    <span>-₹{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Delivery Partner Fee:</span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${deliveryFee}`}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-sm font-black text-slate-900 dark:text-white">
                  <span>Net Amount to Pay:</span>
                  <span className="text-base text-teal-600 dark:text-teal-400">₹{grandTotal}</span>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Sticky Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg">
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-black text-sm shadow-xl shadow-teal-600/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="text-left">
                <p className="text-[10px] text-teal-100 font-medium">Proceed with {cartCount} items</p>
                <p className="text-base leading-tight font-black">₹{grandTotal}</p>
              </div>
              <div className="flex items-center gap-1.5 text-white">
                <span>Select Address & Pay</span>
                <ArrowRight size={16} />
              </div>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
