import React from 'react';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/healthData';
import { Zap, Sparkles, Filter } from 'lucide-react';

export const CategoryPills = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    activeFilter,
    setActiveFilter,
    setSearchQuery,
    medicines
  } = useStore();

  const filterTabs = [
    { id: 'all', label: 'All Items', icon: null },
    { id: 'express', label: '⚡ 18m Express', icon: Zap },
    { id: 'discount', label: 'Top Offers (>25% Off)', icon: Sparkles },
  ];

  return (
    <section className="py-3 sticky top-[73px] z-30 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="app-container space-y-3">
        
        {/* Category Carousel Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSearchQuery('');
                }}
                className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 scale-[1.02]'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {cat.id === 'all'
                    ? medicines.length
                    : medicines.filter((m) => m.category === cat.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Filter Badges Row */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Filter size={12} /> Filter:
            </span>
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-teal-100 dark:bg-teal-950/80 text-teal-900 dark:text-teal-200 border border-teal-400/40 font-bold'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {Icon && <Icon size={12} className={isActive ? 'text-teal-600 dark:text-teal-400' : ''} />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing <strong className="text-slate-800 dark:text-white">
              {medicines.filter((m) => {
                if (selectedCategory !== 'all' && m.category !== selectedCategory) return false;
                if (activeFilter === 'discount') return m.discount >= 25;
                if (activeFilter === 'express') return m.expressDelivery;
                return true;
              }).length}
            </strong> medicines
          </div>
        </div>

      </div>
    </section>
  );
};
