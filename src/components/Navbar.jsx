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

  // Prevent background scroll when mobile drawer is open
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

  const trendingSearches = ['Paracetamol', 'Dolo 650', 'Vitamin C', 'Azithromycin', 'Metformin', 'Pantoprazole'];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#121824] border-b border-slate-200 dark:border-slate-800 transition-colors">
        
        {/* Top Quiet Meta Bar */}
        <div className="bg-slate-50 dark:bg-[#0b0f17] border-b border-slate-200/60 dark:border-slate-800/60 text-slate-600 dark:text-slate-400 text-xs py-1.5 px-4">
          <div className="app-container flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Verified retail pharmacy license #DL-20B-18942</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-teal-600 dark:text-teal-400" /> Cold-chain verified
              </span>
              <span>•</span>
              <span>Pharmacist helpline: +91 98765 43210</span>
            </div>
          </div>
        </div>

        {/* Main Navbar Row */}
        <div className="app-container py-3">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Hamburger (Mobile) + Brand Wordmark + Location */}
            <div className="flex items-center gap-3 flex-shrink-0">
              
              {/* Mobile 3-Bars Menu */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu size={18} />
              </button>

              {/* Flat Wordmark Logo */}
              <a href="#" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center">
                  <HeartPulse size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-slate-900 dark:text-white leading-none tracking-tight">
                    MedsFlow
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal leading-tight mt-0.5">
                    Dispensary & Health
                  </span>
                </div>
              </a>

              {/* Delivery Zone Selector (Desktop) */}
              <button
                onClick={() => setIsPincodeModalOpen(true)}
                className="hidden lg:flex items-center gap-2 pl-3 ml-2 border-l border-slate-200 dark:border-slate-800 text-left hover:opacity-80 transition-opacity"
              >
                <MapPin size={15} className="text-slate-500 dark:text-slate-400 flex-shrink-0" />
                <div className="max-w-[140px]">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200 font-mono">
                      {pincode}
                    </span>
                    <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">Change</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {locationName}
                  </p>
                </div>
              </button>

            </div>

            {/* Center: Omni-Search Bar (Desktop) */}
            <div ref={searchRef} className="hidden md:block flex-1 max-w-xl relative">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border bg-slate-50/70 dark:bg-slate-900/60 transition-colors ${
                isSearchFocused
                  ? 'border-teal-600 bg-white dark:bg-slate-900 ring-1 ring-teal-600/30'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}>
                <Search size={16} className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search medicines, salts, or conditions"
                  className="w-full bg-transparent text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-normal focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Search Suggestions Dropdown */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-[#161922] rounded-xl shadow-lg p-3 z-50 border border-slate-200 dark:border-slate-800">
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-2 px-1">
                    Trending queries
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {trendingSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                          setIsSearchFocused(false);
                        }}
                        className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>

                  {searchQuery.trim().length > 0 && (
                    <div>
                      <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1 px-1">
                        Catalog matches
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
                              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-xs"
                            >
                              <div>
                                <p className="font-medium text-slate-900 dark:text-slate-100">
                                  {med.name}
                                </p>
                                <p className="text-[11px] text-slate-500">
                                  {med.salt || med.disease}
                                </p>
                              </div>
                              <span className="font-mono text-xs text-slate-900 dark:text-white tabular-nums">
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

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              
              {/* Doctor Consultation */}
              <button
                onClick={() => setIsDoctorConsultOpen(true)}
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium transition-colors"
              >
                <Stethoscope size={15} className="text-teal-600 dark:text-teal-400" />
                <span>Consult doctor (₹199)</span>
              </button>

              {/* Admin Console Key */}
              <button
                onClick={() => setIsAdminOpen(true)}
                className={`p-2 rounded-lg border transition-colors ${
                  backendConnected
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
                title={backendConnected ? 'Database connected • Admin' : 'Store Admin'}
              >
                <Database size={16} />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium transition-colors"
              >
                <div className="relative flex items-center">
                  <ShoppingBag size={16} />
                  {cartCount > 0 && (
                    <span className="ml-1.5 font-mono text-[11px] font-semibold tabular-nums">
                      ({cartCount})
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline pl-1 border-l border-teal-600 font-mono tabular-nums">
                  ₹{cartSubtotal}
                </span>
              </button>

            </div>

          </div>

          {/* Mobile Search Bar Row */}
          <div className="md:hidden mt-2.5">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
              <Search size={15} className="text-slate-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicines or salts"
                className="w-full bg-transparent text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-normal focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-slate-400"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* LEFT-HAND SIDE MOBILE DRAWER                                              */}
      {/* ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Panel */}
          <aside className="relative w-72 max-w-[80vw] bg-white dark:bg-[#121824] shadow-xl z-50 flex flex-col justify-between overflow-y-auto border-r border-slate-200 dark:border-slate-800">
            
            {/* Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-700 text-white flex items-center justify-center">
                  <HeartPulse size={16} />
                </div>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">MedsFlow</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4 flex-1">
              
              {/* Location Card */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsPincodeModalOpen(true);
                }}
                className="w-full text-left p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 hover:border-slate-300 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin size={15} className="text-slate-500" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Delivery location</p>
                    <p className="text-xs font-medium text-slate-900 dark:text-white font-mono">{pincode}</p>
                    <p className="text-[11px] text-slate-500 truncate max-w-[150px]">{locationName}</p>
                  </div>
                </div>
                <ChevronRight size={15} className="text-slate-400" />
              </button>

              {/* Consult Doctor Link */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsDoctorConsultOpen(true);
                }}
                className="w-full text-left p-3 rounded-lg border border-teal-600/30 bg-teal-50/50 dark:bg-teal-950/20 text-slate-900 dark:text-white flex items-center justify-between hover:bg-teal-50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Stethoscope size={16} className="text-teal-600 dark:text-teal-400" />
                  <div>
                    <p className="text-xs font-medium">Consult doctor</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">General Physician &bull; Fee: ₹199</p>
                  </div>
                </div>
                <ChevronRight size={15} className="text-slate-400" />
              </button>

              {/* Navigation Items */}
              <div className="space-y-1 pt-1">
                <p className="text-[11px] font-medium text-slate-400 px-2 pb-1">
                  Navigation
                </p>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAdminOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Database size={15} className="text-slate-500" />
                    <span>Admin inventory console</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    backendConnected ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-700 text-slate-600'
                  }`}>
                    {backendConnected ? 'Live' : 'Local'}
                  </span>
                </button>

                <a
                  href="#lab-tests"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
                >
                  <Activity size={15} className="text-slate-500" />
                  <span>Diagnostic lab packages</span>
                </a>

                <a
                  href="#catalog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
                >
                  <Pill size={15} className="text-slate-500" />
                  <span>Medicine catalog</span>
                </a>
              </div>

              {/* Categories */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[11px] font-medium text-slate-400 px-2 pb-1.5">
                  Categories
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
                      className={`p-2 rounded-lg text-left text-xs font-normal transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 font-medium border border-teal-200 dark:border-teal-800'
                          : 'bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-center gap-2">
              <CheckCircle2 size={13} className="text-teal-600" />
              <span>Licensed pharmacy stock</span>
            </div>

          </aside>

        </div>
      )}
    </>
  );
};
