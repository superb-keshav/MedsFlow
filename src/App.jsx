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
            className={`p-3 px-4 rounded-xl shadow-lg border text-xs font-medium flex items-center gap-2.5 ${
              toast.type === 'error'
                ? 'bg-rose-950/95 text-rose-100 border-rose-800'
                : toast.type === 'info'
                ? 'bg-slate-900/95 text-slate-100 border-slate-800'
                : 'bg-slate-900/95 text-slate-100 border-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-200'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle size={15} className="text-rose-400 flex-shrink-0" />
            ) : toast.type === 'info' ? (
              <Info size={15} className="text-teal-400 flex-shrink-0" />
            ) : (
              <CheckCircle2 size={15} className="text-teal-400 flex-shrink-0" />
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
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Verified inventory
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white font-heading mt-0.5">
                {selectedCategory === 'all' ? 'All medicines & health essentials' : selectedCategory}
              </h2>
            </div>

            {searchQuery && (
              <div className="flex items-center gap-2 text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                <span>Search: <strong>"{searchQuery}"</strong></span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="font-medium underline ml-1 hover:text-slate-950 dark:hover:text-white"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Medicines Grid */}
          {isLoadingMeds ? (
            <div className="h-48 flex items-center justify-center text-teal-600 dark:text-teal-400 font-mono text-xs">
              Loading inventory...
            </div>
          ) : filteredMedicines.length === 0 ? (
            <div className="p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 mx-auto flex items-center justify-center">
                <Search size={20} />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white font-heading">
                No matching medicines found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try searching with generic salt names (e.g. Paracetamol, Metformin) or clear filters.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-3.5 py-1.5 rounded-lg bg-teal-600 text-white font-medium text-xs hover:bg-teal-700 transition-colors"
              >
                Reset search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
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
            className="w-full flex items-center justify-between p-3 px-4 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-xl border border-slate-800 dark:border-slate-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center text-xs">
                <ShoppingBag size={16} />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium leading-tight">
                  <span className="font-mono tabular-nums">{cartCount}</span> item{cartCount > 1 ? 's' : ''} in cart
                </p>
                <p className="text-sm font-semibold font-mono tabular-nums">
                  ₹{cartSubtotal}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium bg-teal-600 text-white px-3 py-1.5 rounded-lg hover:bg-teal-700 transition-colors">
              <span>View cart</span>
              <ArrowRight size={13} />
            </div>
          </button>
        </div>
      )}

      {/* Modals & Drawers */}
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
