import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  ShoppingBag,
  Truck
} from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs">
      <div className="w-full max-w-md h-full bg-white dark:bg-[#121824] border-l border-slate-200 dark:border-slate-800 shadow-xl flex flex-col drawer-slide-in">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
              <ShoppingBag size={16} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                Order cart
              </h2>
              <p className="text-xs text-slate-500">
                {cartCount} item{cartCount !== 1 ? 's' : ''} &bull; Destination: {pincode}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Delivery Status Strip */}
        <div className="bg-slate-50 dark:bg-slate-900/60 p-3 border-b border-slate-200/80 dark:border-slate-800 text-xs">
          {deliveryFee === 0 ? (
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Truck size={14} className="text-teal-600 dark:text-teal-400" />
              <span>Complimentary delivery applied (order exceeds ₹{freeDeliveryThreshold})</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Add ₹{amountToFreeDelivery} more for free delivery</span>
                <span className="font-mono tabular-nums">Threshold: ₹{freeDeliveryThreshold}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-teal-600 rounded-full"
                  style={{ width: `${Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Empty Cart */}
          {cart.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <ShoppingBag size={24} />
              </div>
              <div>
                <h3 className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                  Cart is empty
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select medications or diagnostic packages from the catalog
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-3.5 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium hover:opacity-90 transition-opacity"
              >
                Browse catalog
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-2.5">
                {cart.map((item) => (
                  <div
                    key={item.medicine._id}
                    className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img
                        src={item.medicine.image}
                        alt={item.medicine.name}
                        className="w-11 h-11 rounded-lg object-cover bg-white flex-shrink-0 border border-slate-200 dark:border-slate-700"
                      />
                      <div className="overflow-hidden">
                        <h4 className="font-medium text-slate-900 dark:text-white truncate">
                          {item.medicine.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate">
                          {item.medicine.packageSize}
                        </p>
                        <div className="flex items-baseline gap-1.5 mt-0.5 font-mono tabular-nums">
                          <span className="font-semibold text-slate-900 dark:text-white">
                            ₹{item.medicine.price * item.quantity}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            (₹{item.medicine.price} each)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stepper & Remove */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono tabular-nums overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.medicine._id, -1)}
                          className="px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="px-2 font-medium text-slate-900 dark:text-white select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.medicine._id, 1)}
                          className="px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.medicine._id)}
                        className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                        title="Remove"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Coupon */}
              <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Tag size={13} className="text-slate-500" /> Coupon code
                  </span>
                  {activeCoupon && (
                    <button
                      onClick={removeCoupon}
                      className="text-red-600 hover:underline text-[11px]"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {activeCoupon ? (
                  <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs font-medium text-teal-800 dark:text-teal-300 flex items-center justify-between">
                    <span>Code {activeCoupon.code} active</span>
                    <span className="font-mono tabular-nums">-₹{couponDiscount}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="e.g. MEDS25"
                      className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 uppercase font-mono"
                    />
                    <button
                      onClick={() => {
                        if (applyCoupon(inputCoupon)) setInputCoupon('');
                      }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 text-xs font-medium transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Bill Details */}
              <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 font-mono tabular-nums">
                <p className="font-sans font-medium text-slate-700 dark:text-slate-300 text-xs pb-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  Itemized summary
                </p>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Gross total (MRP):</span>
                  <span>₹{cartMrpTotal}</span>
                </div>
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                  <span>Catalog discount:</span>
                  <span>-₹{totalItemSavings}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                    <span>Coupon reduction:</span>
                    <span>-₹{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Delivery fee:</span>
                  <span>{deliveryFee === 0 ? 'Complimentary' : `₹${deliveryFee}`}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-semibold text-slate-900 dark:text-white text-sm">
                  <span>Total payable:</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Footer Checkout Action */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824]">
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs sm:text-sm transition-colors"
            >
              <div className="text-left font-mono tabular-nums">
                <p className="text-[10px] text-teal-100 font-sans">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
                <p className="text-sm font-semibold">₹{grandTotal}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Proceed to checkout</span>
                <ArrowRight size={15} />
              </div>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
