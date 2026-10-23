import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryPills } from './components/CategoryPills';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { DoctorConsultModal } from './components/DoctorConsultModal';
import { PincodeModal } from './components/PincodeModal';
import { LabTestsSection } from './components/LabTestsSection';
import { Footer } from './components/Footer';
import {
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';

const MainApp = () => {
  const {
    medicines,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    activeFilter,
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    toast,
    isLoadingMeds
  } = useStore();

  // Filtered medicines
  const filteredMedicines = medicines.filter((m) => {
    // Search query filter
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchName = m.name.toLowerCase().includes(q);
      const matchSalt = m.salt && m.salt.toLowerCase().includes(q);
      const matchDisease = m.disease && m.disease.toLowerCase().includes(q);
      const matchCategory = m.category && m.category.toLowerCase().includes(q);
      if (!matchName && !matchSalt && !matchDisease && !matchCategory) return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && m.category !== selectedCategory) {
      return false;
    }

    // Secondary filter pills
    if (activeFilter === 'discount') return m.discount >= 25;
    if (activeFilter === 'express') return m.expressDelivery;

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      
      {/* Toast Alert Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 modal-animate-in max-w-sm">
          <div
            className={`p-3.5 px-4 rounded-2xl shadow-2xl border text-xs font-bold flex items-center gap-2.5 backdrop-blur-md ${
              toast.type === 'error'
                ? 'bg-rose-900/90 text-rose-100 border-rose-700'
                : toast.type === 'info'
                ? 'bg-slate-900/90 text-slate-100 border-slate-700'
                : 'bg-teal-900/90 text-teal-100 border-teal-600 shadow-teal-500/20'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle size={16} className="text-rose-400 flex-shrink-0" />
            ) : toast.type === 'info' ? (
              <Info size={16} className="text-cyan-400 flex-shrink-0" />
            ) : (
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroBanner />

      {/* Category Pills & Filters */}
      <CategoryPills />

      {/* Medicine Catalog Section */}
      <main id="catalog" className="flex-1 py-6">
        <div className="app-container space-y-4">
          
          {/* Section Heading & Result Summary */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                <Sparkles size={13} className="text-amber-500" />
                <span>Verified Medicine Inventory</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {selectedCategory === 'all' ? 'All Medicines & Care Essentials' : selectedCategory}
              </h2>
            </div>

            {searchQuery && (
              <div className="flex items-center gap-2 text-xs bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 px-3 py-1.5 rounded-xl border border-teal-200 dark:border-teal-800">
                <span>Search results for: <strong>"{searchQuery}"</strong></span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="font-bold underline ml-1 hover:text-teal-950 dark:hover:text-white"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Medicines Grid */}
          {isLoadingMeds ? (
            <div className="h-48 flex items-center justify-center text-teal-600 font-bold text-sm">
              Loading verified medicines...
            </div>
          ) : filteredMedicines.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 mx-auto flex items-center justify-center">
                <Search size={28} />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No matching medicines found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try searching with generic salt names (e.g. Paracetamol, Metformin) or clear filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 transition-colors"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedicines.map((med) => (
                <ProductCard key={med._id} medicine={med} />
              ))}
            </div>
          )}

        </div>
      </main>

      {/* Lab Tests & Health Checkup Section */}
      <LabTestsSection />

      {/* Floating Bottom Cart Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-md mx-auto modal-animate-in">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full flex items-center justify-between p-3.5 px-5 rounded-2xl bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-2xl shadow-teal-700/40 border border-teal-400/30 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white font-bold text-sm">
                <ShoppingBag size={20} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold leading-tight">
                  {cartCount} item{cartCount > 1 ? 's' : ''} in cart
                </p>
                <p className="text-sm font-black">
                  ₹{cartSubtotal} <span className="text-[10px] font-normal text-teal-100">subtotal</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-teal-100 bg-white/15 px-3 py-1.5 rounded-xl">
              <span>View Cart</span>
              <ArrowRight size={14} />
            </div>
          </button>
        </div>
      )}

      {/* Modals & Drawers (PrescriptionUploadModal removed) */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackingModal />
      <AdminDashboardModal />
      <DoctorConsultModal />
      <PincodeModal />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
