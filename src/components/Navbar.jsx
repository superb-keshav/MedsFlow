import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/healthData';
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  MapPin,
  Stethoscope,
  Database,
  Moon,
  Sun,
  Sparkles,
  ShieldCheck,
  HeartPulse,
  ChevronRight,
  Pill,
  Activity,
  CheckCircle2,
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
    setIsPincodeModalOpen,
    setIsDoctorConsultOpen,
    setIsAdminOpen,
    setSelectedCategory,
    selectedCategory,
    darkMode,
    setDarkMode,
    backendConnected,
    medicines
  } = useStore();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Prevent background body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const trendingSearches = ['Dolo 650', 'Paracetamol', 'Vitamin C', 'Azithromycin', 'Insulin', 'Pantoprazole'];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs transition-colors">
        
        {/* Top Announcement Bar (18m express removed) */}
        <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 text-white text-[11px] py-1.5 px-3 shadow-inner">
          <div className="app-container flex items-center justify-between flex-wrap gap-1">
            <div className="flex items-center gap-2">
              <span className="beacon-dot"></span>
              <span className="font-semibold text-emerald-300">100% GENUINE MEDICINES &bull; VERIFIED PHARMACY</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-teal-200 text-[11px]">
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-teal-300" /> Cold-Chain Certified
              </span>
              <span>&bull;</span>
              <span>Doctor Consultation Available</span>
            </div>
          </div>
        </div>

        {/* Main Navbar Row */}
        <div className="app-container py-2.5 sm:py-3">
          
          {/* Top Bar for Desktop and Mobile */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-6">
            
            {/* Left Section: 3-Bars Mobile Hamburger + Logo + Desktop Location */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              
              {/* 3-Bars Hamburger Button (Mobile Only) */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors focus:outline-none"
                aria-label="Open Navigation Menu"
              >
                <Menu size={20} />
              </button>

              {/* Logo */}
              <a href="#" className="flex items-center gap-2 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-600/30 group-hover:scale-105 transition-transform">
                  <HeartPulse size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                    Meds<span className="text-teal-600 dark:text-teal-400">Flow</span>
                  </span>
                  <span className="text-[9px] font-bold text-teal-600 dark:text-teal-400 tracking-wider uppercase leading-tight mt-0.5">
                    Online Pharmacy
                  </span>
                </div>
              </a>

              {/* Pincode & Delivery Selector (Desktop / Tablet Only) */}
              <button
                onClick={() => setIsPincodeModalOpen(true)}
                className="hidden lg:flex items-center gap-2 pl-3 ml-2 border-l border-slate-200 dark:border-slate-800 text-left hover:opacity-80 transition-opacity"
              >
                <div className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <MapPin size={15} />
                </div>
                <div className="max-w-[130px]">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight font-mono">
                      {pincode}
                    </span>
                    <span className="text-[10px] text-teal-600 font-extrabold uppercase">Change</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    {locationName}
                  </p>
                </div>
              </button>

            </div>

            {/* Center Section: Desktop Omni-Search Bar */}
            <div ref={searchRef} className="hidden md:block flex-1 max-w-xl relative">
              <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border bg-slate-50/50 dark:bg-slate-900/80 transition-all duration-200 ${
                isSearchFocused
                  ? 'border-teal-500 shadow-md shadow-teal-500/10 ring-2 ring-teal-500/20 bg-white dark:bg-slate-900'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}>
                <Search size={18} className="text-teal-600 dark:text-teal-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search medicines, salt composition (e.g. Paracetamol)..."
                  className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium focus:outline-none"
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
                    <span>Trending Searches</span>
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
                        Matching Results
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
                                &#8377;{med.price}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right CTAs */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              
              {/* Doctor Consultation CTA (Desktop) */}
              <button
                onClick={() => setIsDoctorConsultOpen(true)}
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all hover:scale-105 active:scale-95 flex-shrink-0"
                title="Consult Doctor (Fee: &#8377;199)"
              >
                <Stethoscope size={15} />
                <span>Consult Doctor (&#8377;199)</span>
              </button>

              {/* Admin Button (Desktop) */}
              <button
                onClick={() => setIsAdminOpen(true)}
                className={`hidden sm:flex p-2 rounded-xl border transition-all ${
                  backendConnected
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
                title={backendConnected ? 'Backend Connected &bull; Manage Inventory' : 'Store Admin Dashboard'}
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
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-md shadow-teal-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="relative">
                  <ShoppingBag size={18} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2.5 -right-2.5 bg-rose-500 text-white text-[10px] font-black w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:block text-left pl-1 border-l border-teal-500/40">
                  <p className="text-[10px] font-medium leading-none text-teal-100">Cart</p>
                  <p className="text-xs font-bold leading-tight mt-0.5">&#8377;{cartSubtotal}</p>
                </div>
              </button>

            </div>

          </div>

          {/* Mobile Full-Width Search Bar */}
          <div className="md:hidden mt-2.5">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
              <Search size={16} className="text-teal-600 dark:text-teal-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicines or composition..."
                className="w-full bg-transparent text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* LEFT-HAND SIDE MOBILE DRAWER (Off-Canvas Navigation)                      */}
      {/* ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide-out Sidebar Panel on Left */}
          <aside className="relative w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col justify-between overflow-y-auto border-r border-slate-200 dark:border-slate-800 transition-all duration-300 modal-animate-in">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md">
                  <HeartPulse size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white text-base leading-none">MedsFlow</h3>
                  <p className="text-[10px] text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider mt-0.5">
                    Digital Pharmacy
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close Navigation Menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Body Options */}
            <div className="p-4 space-y-4 flex-1">
              
              {/* Delivery Location / Pincode Card */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsPincodeModalOpen(true);
                }}
                className="w-full text-left p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 hover:border-teal-500/50 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Delivery Pincode</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white font-mono">{pincode}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[150px]">{locationName}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>

              {/* Consult Doctor CTA */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsDoctorConsultOpen(true);
                }}
                className="w-full text-left p-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-600/20 hover:from-teal-700 hover:to-emerald-700 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <Stethoscope size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-black">Consult Doctor</p>
                    <p className="text-[10px] text-teal-100">Verified Specialists &bull; Fee: &#8377;199</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-teal-200" />
              </button>

              {/* Main Actions List */}
              <div className="space-y-1 pt-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 pb-1">
                  Menu Options
                </p>

                {/* Admin Management Option */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAdminOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Database size={16} className="text-teal-600 dark:text-teal-400" />
                    <span>Store Admin Console</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                    backendConnected
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {backendConnected ? 'Live' : 'Admin'}
                  </span>
                </button>

                {/* Diagnostic Tests */}
                <a
                  href="#lab-tests"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
                >
                  <Activity size={16} className="text-emerald-500" />
                  <span>Book Lab Tests & Checkups</span>
                </a>

                {/* Catalog Navigation */}
                <a
                  href="#catalog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
                >
                  <Pill size={16} className="text-teal-500" />
                  <span>Browse All Medicines</span>
                </a>
              </div>

              {/* Medicine Categories In Sidebar */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 pb-1.5">
                  Medicine Categories
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setIsMobileMenuOpen(false);
                        const el = document.getElementById('catalog');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`p-2 rounded-xl text-left text-[11px] font-medium transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 font-bold border border-teal-300 dark:border-teal-700'
                          : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>100% Genuine Pharmacy Certified</span>
              </div>
              <p className="text-[10px] text-slate-400">
                MedsFlow Digital Healthcare Platform
              </p>
            </div>

          </aside>

        </div>
      )}
    </>
  );
};
