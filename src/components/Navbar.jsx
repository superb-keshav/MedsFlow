import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Search,
  ShoppingBag,
  MapPin,
  Stethoscope,
  Database,
  Moon,
  Sun,
  X,
  Sparkles,
  Zap,
  ShieldCheck,
  HeartPulse,
} from 'lucide-react';

export const Navbar = () => {
  const {
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    pincode,
    locationName,
    deliveryEta,
    setIsPincodeModalOpen,
    setIsDoctorConsultOpen,
    setIsAdminOpen,
    darkMode,
    setDarkMode,
    backendConnected,
    medicines
  } = useStore();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trendingSearches = ['Dolo 650', 'Paracetamol', 'Vitamin C', 'Azithromycin', 'Insulin', 'Pantoprazole'];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 text-white text-xs py-2 px-4 shadow-inner">
        <div className="app-container flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="beacon-dot"></span>
            <span className="font-semibold text-emerald-300">⚡ EXPRESS 18-MIN DELIVERY ACTIVE</span>
            <span className="hidden md:inline text-teal-200">|</span>
            <span className="hidden md:inline text-teal-100">Cold-chain temperature guaranteed for delicate medicines</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5 text-emerald-300">
              <ShieldCheck size={14} />
              <span>100% Genuine Pharmacy Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="glass-nav py-3 shadow-sm transition-all duration-200">
        <div className="app-container flex items-center justify-between gap-3 md:gap-6">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group transition-transform hover:scale-105">
              <HeartPulse size={24} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-heading">
                  Meds<span className="text-teal-600 dark:text-teal-400">Flow</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 px-1.5 py-0.5 rounded-full">
                  Medical Store
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Digital Pharmacy & Healthcare
              </p>
            </div>
          </div>

          {/* Location / Pincode Selector */}
          <button
            onClick={() => setIsPincodeModalOpen(true)}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-teal-50 dark:hover:bg-teal-950/40 border border-slate-200 dark:border-slate-700 transition-all text-left max-w-[210px]"
            title="Click to change delivery address or pincode"
          >
            <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
              <MapPin size={16} />
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                  {pincode}
                </span>
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                  <Zap size={10} fill="currentColor" /> {deliveryEta}m
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {locationName}
              </p>
            </div>
          </button>

          {/* Smart Omni-Search Bar */}
          <div ref={searchRef} className="flex-1 max-w-xl relative">
            <div className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 transition-all duration-200 ${
              isSearchFocused
                ? 'border-teal-500 shadow-md shadow-teal-500/10 ring-2 ring-teal-500/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }`}>
              <Search size={18} className="text-teal-600 dark:text-teal-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search medicines, salt composition (e.g. Paracetamol), or symptom..."
                className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Live Search Suggestions Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 glass-panel rounded-2xl shadow-xl p-3 z-50 border border-slate-200 dark:border-slate-700 modal-animate-in">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-2 flex items-center justify-between">
                  <span>Trending Medicine Searches</span>
                  <Sparkles size={12} className="text-amber-500" />
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3 px-1">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        setIsSearchFocused(false);
                      }}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50 hover:text-teal-700 dark:hover:bg-teal-900/40 dark:hover:text-teal-300 transition-colors font-medium"
                    >
                      {term}
                    </button>
                  ))}
                </div>

                {searchQuery.trim().length > 0 && (
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 px-2">
                      Matching Catalog Results
                    </div>
                    <div className="max-h-48 overflow-y-auto space-y-1">
                      {medicines
                        .filter((m) =>
                          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (m.salt && m.salt.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (m.disease && m.disease.toLowerCase().includes(searchQuery.toLowerCase()))
                        )
                        .slice(0, 5)
                        .map((med) => (
                          <div
                            key={med._id}
                            onClick={() => {
                              setSearchQuery(med.name);
                              setIsSearchFocused(false);
                            }}
                            className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-sm"
                          >
                            <div>
                              <p className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                                {med.name}
                              </p>
                              <p className="text-[11px] text-teal-600 dark:text-teal-400">
                                {med.salt || med.disease}
                              </p>
                            </div>
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              ₹{med.price}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* Doctor Consultation CTA with Fee */}
            <button
              onClick={() => setIsDoctorConsultOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all hover:scale-105 active:scale-95"
              title="Doctor Consultation (Fee: ₹199)"
            >
              <Stethoscope size={15} />
              <span>Consult Doctor (₹199)</span>
            </button>

            {/* Store Admin Mode Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className={`p-2 rounded-xl border transition-all ${
                backendConnected
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
              title={backendConnected ? 'Backend Connected • Manage Inventory' : 'Store Admin Dashboard'}
            >
              <Database size={17} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg shadow-teal-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="relative">
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left pl-1 border-l border-teal-500/40">
                <p className="text-[10px] font-medium leading-none text-teal-100">My Cart</p>
                <p className="text-xs font-bold leading-tight mt-0.5">₹{cartSubtotal}</p>
              </div>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
