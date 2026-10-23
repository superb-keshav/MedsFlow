import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Database,
  AlertTriangle,
  Plus,
  RefreshCw,
  CheckCircle2,
  Package,
  Layers,
  Edit2,
  Save,
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  User,
  LogOut,
  Trash2,
  Sparkles
} from 'lucide-react';

export const AdminDashboardModal = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    medicines,
    backendConnected,
    fetchBackendMedicines,
    updateStock,
    addNewMedicine,
    deleteMedicine,
    expiryAlerts,
    isAdminAuthenticated,
    adminLogin,
    adminLogout
  } = useStore();

  // Login form state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);
  const [authError, setAuthError] = useState('');

  // Dashboard tabs
  const [activeTab, setActiveTab] = useState('inventory'); // inventory, expiry, add
  const [editingId, setEditingId] = useState(null);
  const [editingQty, setEditingQty] = useState('');

  // Add form state
  const [newName, setNewName] = useState('');
  const [newDisease, setNewDisease] = useState('');
  const [newCategory, setNewCategory] = useState('Fever & Pain');
  const [newPrice, setNewPrice] = useState('');
  const [newQuantity, setNewQuantity] = useState('100');
  const [newBatch, setNewBatch] = useState('BAT-2026-X1');
  const [newExpiry, setNewExpiry] = useState('2026-12-31');

  if (!isAdminOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingAuth(true);
    setAuthError('');
    const result = await adminLogin(username, password);
    setIsSubmittingAuth(false);
    if (!result.success) {
      setAuthError(result.error || 'Invalid credentials');
    }
  };

  const handleStockSave = async (id) => {
    await updateStock(id, editingQty);
    setEditingId(null);
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    const success = await addNewMedicine({
      name: newName,
      description: `Used for ${newDisease}`,
      disease: newDisease,
      category: newCategory,
      price: Number(newPrice),
      quantity: Number(newQuantity),
      batchNumber: newBatch,
      expiryDate: newExpiry,
      salt: `${newName} Formulation`,
      rxRequired: false,
      dosage: '1 tablet twice daily after meals'
    });
    if (success) {
      setNewName('');
      setNewPrice('');
      setActiveTab('inventory');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 modal-animate-in">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAdminOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
        >
          <X size={18} />
        </button>

        {/* ----------------- STATE 1: UNAUTHORIZED -> SHOW SECURE LOGIN ----------------- */}
        {!isAdminAuthenticated ? (
          <div className="max-w-md mx-auto py-6 space-y-6">
            
            {/* Header Badge */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-teal-500/30">
                <Lock size={30} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Admin Authentication Gate
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Only authorized store personnel can inspect and add inventory stock
              </p>
            </div>

            {/* Quick Fill Preset Banner */}
            <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-xs flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-bold text-teal-900 dark:text-teal-200 flex items-center gap-1">
                  <Key size={13} className="text-teal-600" /> Authorized Store Credentials:
                </span>
                <p className="text-[11px] text-teal-700 dark:text-teal-300 font-mono">
                  Username: <strong>admin</strong> | Password: <strong>admin123</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setUsername('admin');
                  setPassword('admin123');
                }}
                className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-[10px] transition-colors"
              >
                Auto-fill
              </button>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertTriangle size={15} />
                <span>{authError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5 flex items-center gap-1.5">
                  <User size={13} /> Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter administrator username"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5 flex items-center gap-1.5">
                  <Key size={13} /> Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingAuth}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-black text-xs shadow-xl shadow-teal-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Unlock size={16} />
                <span>{isSubmittingAuth ? 'Verifying Credentials...' : 'Sign In as Administrator'}</span>
              </button>
            </form>

            <p className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck size={13} className="text-teal-500" /> Protected by 256-bit JWT & MongoDB Authentication
            </p>

          </div>
        ) : (
          /* ----------------- STATE 2: AUTHORIZED ADMIN DASHBOARD ----------------- */
          <>
            {/* Modal Header */}
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <Database size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">
                    Store Manager & Inventory Dashboard
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        backendConnected
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      {backendConnected ? 'Backend Connected (Port 5000)' : 'Standalone Mode'}
                    </span>
                    <button
                      onClick={fetchBackendMedicines}
                      className="text-xs text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 font-semibold"
                      title="Sync with MongoDB backend"
                    >
                      <RefreshCw size={11} /> Sync
                    </button>
                  </div>
                </div>
              </div>

              {/* Authorized User Badge & Logout */}
              <div className="flex items-center gap-2.5">
                <div className="px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-bold text-teal-900 dark:text-teal-200">admin</span>
                  <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold">(Authorized)</span>
                </div>
                <button
                  onClick={adminLogout}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-bold transition-colors border border-rose-200 dark:border-rose-900/40"
                  title="Sign out as administrator"
                >
                  <LogOut size={13} />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'inventory'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Inventory Stock ({medicines.length})
              </button>
              <button
                onClick={() => setActiveTab('expiry')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'expiry'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                }`}
              >
                <AlertTriangle size={13} /> Expiry Alerts ({expiryAlerts.length})
              </button>
              <button
                onClick={() => setActiveTab('add')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'add'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Plus size={13} /> Add Medicine
              </button>
            </div>

            {/* Tab 1: Inventory Management */}
            {activeTab === 'inventory' && (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-12 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 pb-1">
                  <span className="col-span-5">Medicine & Batch</span>
                  <span className="col-span-2">Price</span>
                  <span className="col-span-3 text-center">Stock Quantity</span>
                  <span className="col-span-2 text-right">Actions</span>
                </div>

                {medicines.map((med) => (
                  <div
                    key={med._id}
                    className="grid grid-cols-12 items-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs"
                  >
                    <div className="col-span-5">
                      <p className="font-bold text-slate-900 dark:text-white truncate">
                        {med.name}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Batch: {med.batchNumber} • Exp: {med.expiryDate}
                      </p>
                    </div>

                    <div className="col-span-2 font-bold text-slate-900 dark:text-white">
                      ₹{med.price}
                    </div>

                    <div className="col-span-3 flex items-center justify-center gap-2">
                      {editingId === med._id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={editingQty}
                            onChange={(e) => setEditingQty(e.target.value)}
                            className="w-16 p-1 text-xs border rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-center font-bold"
                          />
                          <button
                            onClick={() => handleStockSave(med._id)}
                            className="p-1 rounded-lg bg-teal-600 text-white"
                            title="Save Stock"
                          >
                            <Save size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-black px-2 py-0.5 rounded-md text-xs ${
                              med.quantity > 50
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                            }`}
                          >
                            {med.quantity} units
                          </span>
                          <button
                            onClick={() => {
                              setEditingId(med._id);
                              setEditingQty(med.quantity);
                            }}
                            className="p-1 text-slate-400 hover:text-teal-600 transition-colors"
                            title="Edit stock"
                          >
                            <Edit2 size={13} />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="col-span-2 flex items-center justify-end">
                      <button
                        onClick={() => {
                          if (confirm(`Remove ${med.name} from store catalog?`)) {
                            deleteMedicine(med._id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                        title="Delete medicine"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Expiry Alerts */}
            {activeTab === 'expiry' && (
              <div className="space-y-2">
                {expiryAlerts.length === 0 ? (
                  <div className="p-8 text-center text-slate-400">
                    <CheckCircle2 size={36} className="mx-auto text-emerald-500 mb-2" />
                    <p className="font-bold text-sm">All Batches Fresh</p>
                    <p className="text-xs">No medicines expiring within the next 90 days.</p>
                  </div>
                ) : (
                  expiryAlerts.map((med) => (
                    <div
                      key={med._id}
                      className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <AlertTriangle size={18} className="text-rose-600 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-rose-950 dark:text-rose-200">
                            {med.name}
                          </p>
                          <p className="text-[11px] text-rose-700 dark:text-rose-400">
                            Batch: {med.batchNumber} • Quantity in Store: {med.quantity} units
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/60 px-2 py-0.5 rounded">
                          Exp: {med.expiryDate}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 3: Add Medicine Form */}
            {activeTab === 'add' && (
              <form onSubmit={handleAddMedicine} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Medicine Brand Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lipitor 20mg"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Disease / Therapeutic Indication
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cholesterol, Cardiac Care"
                      value={newDisease}
                      onChange={(e) => setNewDisease(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="Fever & Pain">Fever & Pain</option>
                      <option value="Diabetes Care">Diabetes Care</option>
                      <option value="BP & Heart">BP & Heart</option>
                      <option value="Stomach & Acidity">Stomach & Acidity</option>
                      <option value="Antibiotics">Antibiotics</option>
                      <option value="Immunity & Vitamins">Immunity & Vitamins</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Selling Price (₹)
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 150"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Initial Stock Units
                    </label>
                    <input
                      type="number"
                      required
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Batch Number
                    </label>
                    <input
                      type="text"
                      required
                      value={newBatch}
                      onChange={(e) => setNewBatch(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      required
                      value={newExpiry}
                      onChange={(e) => setNewExpiry(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/30 transition-all mt-3"
                >
                  Authorized Add Medicine to Live Store
                </button>
              </form>
            )}
          </>
        )}

      </div>
    </div>
  );
};
