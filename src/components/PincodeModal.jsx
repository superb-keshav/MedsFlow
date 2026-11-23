import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, MapPin, Check } from 'lucide-react';

export const PincodeModal = () => {
  const {
    isPincodeModalOpen,
    setIsPincodeModalOpen,
    pincode,
    setPincode,
    setLocationName,
    setDeliveryEta,
    showToast
  } = useStore();

  const [inputPin, setInputPin] = useState(pincode);

  if (!isPincodeModalOpen) return null;

  const popularLocations = [
    { pin: '110001', area: 'Connaught Place, New Delhi', eta: 18 },
    { pin: '400001', area: 'Fort & Marine Lines, Mumbai', eta: 15 },
    { pin: '560001', area: 'MG Road & Indiranagar, Bengaluru', eta: 20 },
    { pin: '500001', area: 'Banjara Hills & Abids, Hyderabad', eta: 18 },
    { pin: '600001', area: 'George Town & Anna Nagar, Chennai', eta: 22 },
  ];

  const handleSelect = (loc) => {
    setPincode(loc.pin);
    setLocationName(loc.area);
    setDeliveryEta(loc.eta);
    showToast(`Delivery location set to ${loc.area}`);
    setIsPincodeModalOpen(false);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (inputPin.length === 6) {
      setPincode(inputPin);
      setLocationName(`Delivery Zone (${inputPin})`);
      setDeliveryEta(18);
      showToast(`Pincode updated to ${inputPin}`);
      setIsPincodeModalOpen(false);
    } else {
      showToast('Please enter a valid 6-digit postal code', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-7">
        
        {/* Close Button */}
        <button
          onClick={() => setIsPincodeModalOpen(false)}
          aria-label="Close location picker"
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-5 pr-8">
          <div className="w-10 h-10 rounded-lg bg-teal-600/10 text-teal-700 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
            <MapPin size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white font-heading">
              Select delivery location
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Check stock availability for your local dispensary
            </p>
          </div>
        </div>

        {/* Custom Pincode Input */}
        <form onSubmit={handleCustomSubmit} className="flex items-center gap-2 mb-4">
          <input
            type="text"
            maxLength={6}
            value={inputPin}
            onChange={(e) => setInputPin(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 6-digit postal code"
            className="flex-1 p-2.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono tabular-nums focus:outline-none focus:border-teal-600"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs transition-colors"
          >
            Check
          </button>
        </form>

        {/* Popular Cities */}
        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Serviceable postal zones
          </p>
          <div className="space-y-1.5 max-h-60 overflow-y-auto">
            {popularLocations.map((loc) => {
              const isCurrent = pincode === loc.pin;
              return (
                <div
                  key={loc.pin}
                  onClick={() => handleSelect(loc)}
                  className={`p-3 rounded-xl border cursor-pointer transition-colors flex items-center justify-between ${
                    isCurrent
                      ? 'border-teal-600 bg-teal-50/50 dark:bg-teal-950/40 text-slate-900 dark:text-white'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white font-mono tabular-nums">
                        {loc.pin}
                      </span>
                      <span className="text-[11px] text-teal-700 dark:text-teal-400 flex items-center gap-0.5">
                        <Check size={12} /> Serviceable
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {loc.area}
                    </p>
                  </div>
                  {isCurrent && <Check size={16} className="text-teal-600 dark:text-teal-400 flex-shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
