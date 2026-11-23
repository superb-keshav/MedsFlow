import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  MapPin,
  CreditCard,
  QrCode,
  Banknote,
  Lock,
  ShieldCheck
} from 'lucide-react';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xl p-5 sm:p-7">
        
        {/* Close Button */}
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
            <Lock size={16} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Order checkout
            </h2>
            <p className="text-xs text-slate-500">
              Encrypted transaction &bull; Destination zone: {pincode}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Step 1: Delivery Address */}
          <div className="space-y-2.5">
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <MapPin size={13} className="text-slate-400" /> Recipient and delivery address
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">
                  Phone number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-500 block mb-1">
                Street address & landmark
              </label>
              <textarea
                rows={2}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white leading-relaxed resize-none"
              />
            </div>
          </div>

          {/* Step 2: Payment Method */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Payment method
            </p>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-2.5 rounded-lg border text-left transition-colors flex flex-col justify-between ${
                  paymentMethod === 'upi'
                    ? 'border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <QrCode size={18} className="mb-2" />
                <span className="text-xs">UPI QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-lg border text-left transition-colors flex flex-col justify-between ${
                  paymentMethod === 'card'
                    ? 'border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <CreditCard size={18} className="mb-2" />
                <span className="text-xs">Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-2.5 rounded-lg border text-left transition-colors flex flex-col justify-between ${
                  paymentMethod === 'cod'
                    ? 'border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Banknote size={18} className="mb-2" />
                <span className="text-xs">Cash on delivery</span>
              </button>
            </div>

            {/* UPI QR Display */}
            {paymentMethod === 'upi' && (
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 flex items-center justify-between gap-4 text-xs">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Scan UPI QR to complete</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Compatible with Google Pay, PhonePe, Paytm, and BHIM</p>
                  <span className="font-mono text-xs text-slate-700 dark:text-slate-300 font-medium block mt-1">
                    Amount: ₹{grandTotal}
                  </span>
                </div>
                <div className="w-20 h-20 bg-white p-1.5 rounded-lg border border-slate-200 flex items-center justify-center flex-shrink-0">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=medsflow@upi%26pn=MedsFlow%26am=${grandTotal}%26cu=INR`}
                    alt="UPI Payment QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-400">Total payable</p>
              <p className="text-base font-semibold font-mono text-slate-900 dark:text-white tabular-nums">
                ₹{grandTotal}
              </p>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck size={14} />
              <span>Confirm and place order</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
