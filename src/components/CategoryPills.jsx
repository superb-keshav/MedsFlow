import React from 'react';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/healthData';
import { Filter, Percent } from 'lucide-react';

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
    { id: 'all', label: 'All items', icon: null },
    { id: 'express', label: 'In stock', icon: null },
    { id: 'discount', label: 'Offers > 25%', icon: Percent },
  ];

  return (
    <section className="py-3 sticky top-[106px] md:top-[69px] z-30 bg-slate-50/95 dark:bg-[#0b0f17]/95 backdrop-blur-xs border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="app-container space-y-2.5">
        
        {/* Horizontal Category Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === 'all'
              ? medicines.length
              : medicines.filter((m) => m.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSearchQuery('');
                }}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium'
                    : 'bg-white dark:bg-[#121824] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 font-normal'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] font-mono px-1 rounded tabular-nums ${
                    isSelected
                      ? 'text-slate-300 dark:text-slate-600'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter and Count Summary Row */}
        <div className="flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Filter size={12} /> Filter:
            </span>
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-normal transition-colors flex items-center gap-1 ${
                    isActive
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {Icon && <Icon size={11} />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-slate-500 dark:text-slate-400 font-mono text-[11px] tabular-nums">
            {medicines.filter((m) => {
              if (selectedCategory !== 'all' && m.category !== selectedCategory) return false;
              if (activeFilter === 'discount') return m.discount >= 25;
              if (activeFilter === 'express') return m.expressDelivery;
              return true;
            }).length} items listed
          </div>
        </div>

      </div>
    </section>
  );
};
