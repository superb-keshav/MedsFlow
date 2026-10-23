import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  MapPin,
  CreditCard,
  QrCode,
  Banknote,
  Lock,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    grandTotal,
    pincode,
    locationName,
    placeOrder
  } = useStore();

  const [name, setName] = useState('Rahul Verma');
  const [phone, setPhone] = useState('+91 98765 12345');
  const [address, setAddress] = useState('Flat 402, Block B, Green Heights, Connaught Place');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi, card, cod

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder({
      name,
      phone,
      address: `${address}, Pincode: ${pincode}`,
      paymentMethod,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 modal-animate-in">
        
        {/* Close Button */}
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Lock size={20} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Secure Medicine Checkout
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              128-bit SSL encrypted • Temperature-controlled delivery
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Step 1: Delivery Address */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-1.5">
              <MapPin size={14} /> 1. Delivery Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Mobile Number (for live delivery SMS)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                Complete House/Street Address ({pincode} - {locationName})
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium resize-none"
              />
            </div>
          </div>

          {/* Step 2: Payment Method */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-1.5">
              <CreditCard size={14} /> 2. Payment Method
            </h3>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'upi'
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-200 font-bold shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                }`}
              >
                <QrCode size={20} className={paymentMethod === 'upi' ? 'text-teal-600' : ''} />
                <span className="text-xs">Instant UPI</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'card'
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-200 font-bold shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                }`}
              >
                <CreditCard size={20} className={paymentMethod === 'card' ? 'text-teal-600' : ''} />
                <span className="text-xs">Debit / Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'cod'
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-200 font-bold shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Banknote size={20} className={paymentMethod === 'cod' ? 'text-teal-600' : ''} />
                <span className="text-xs">Pay on Delivery</span>
              </button>
            </div>

            {/* UPI QR Display Simulator */}
            {paymentMethod === 'upi' && (
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    UPI Auto-Pay / QR Code
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Supports Google Pay, PhonePe, Paytm & BHIM
                  </p>
                </div>
                <div className="w-14 h-14 bg-white p-1 rounded-xl shadow-xs border border-slate-200 flex items-center justify-center">
                  <QrCode size={44} className="text-slate-800" />
                </div>
              </div>
            )}
          </div>

          {/* Submit Order Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-black text-sm shadow-xl shadow-teal-600/30 transition-all flex items-center justify-between"
            >
              <span>Place Order • 18-Min Dispatch</span>
              <span className="text-base font-black">₹{grandTotal}</span>
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-2 flex items-center justify-center gap-1">
              <ShieldCheck size={13} className="text-teal-500" /> 100% Money-Back & Genuine Product Guarantee
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
