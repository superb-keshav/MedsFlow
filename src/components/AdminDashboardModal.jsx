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
  Edit2,
  Save,
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  User,
  LogOut,
  Trash2
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
      description: `Prescribed for ${newDisease}`,
      disease: newDisease,
      category: newCategory,
      price: Number(newPrice),
      quantity: Number(newQuantity),
      batchNumber: newBatch,
      expiryDate: newExpiry,
      salt: `${newName} Formulation`,
      rxRequired: false,
      dosage: 'Take as directed by physician'
    });
    if (success) {
      setNewName('');
      setNewPrice('');
      setActiveTab('inventory');
    }
  };

  const lowStockCount = medicines.filter((m) => Number(m.quantity) < 50).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xl p-5 sm:p-7">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAdminOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* ----------------- STATE 1: AUTHENTICATION GATE ----------------- */}
        {!isAdminAuthenticated ? (
          <div className="max-w-sm mx-auto py-8 space-y-5">
            
            <div className="text-center space-y-1.5">
              <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center mx-auto mb-3">
                <Lock size={18} />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Dispensary administration
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sign in with store credentials to manage inventory stock
              </p>
            </div>

            {/* Quick Fill Helper */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
              <div className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
                User: <span className="font-semibold text-slate-900 dark:text-white">admin</span> &bull; Pass: <span className="font-semibold text-slate-900 dark:text-white">admin123</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setUsername('admin');
                  setPassword('admin123');
                }}
                className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 transition-colors"
              >
                Auto-fill
              </button>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                <AlertTriangle size={14} className="flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-slate-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingAuth}
                className="w-full py-2.5 px-4 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Unlock size={14} />
                <span>{isSubmittingAuth ? 'Verifying...' : 'Sign in'}</span>
              </button>
            </form>

            <p className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck size={13} /> Session authenticated with JSON Web Tokens
            </p>

          </div>
        ) : (
          /* ----------------- STATE 2: AUTHORIZED DASHBOARD ----------------- */
          <div className="space-y-5">
            
            {/* Header Row */}
            <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Dispensary inventory console
                  </h2>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded ${
                      backendConnected
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {backendConnected ? 'Live MongoDB' : 'Standalone'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time stock control, batch verification, and catalog updates
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={fetchBackendMedicines}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
                  title="Sync database"
                >
                  <RefreshCw size={12} />
                  <span>Sync</span>
                </button>
                <div className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                  admin
                </div>
                <button
                  onClick={adminLogout}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30 text-slate-600 dark:text-slate-400 flex items-center gap-1 transition-colors"
                >
                  <LogOut size={12} />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* 3 Compact Stat Cards (Numbers only, unslop standard) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                <p className="text-xs text-slate-500 font-medium">Total catalog items</p>
                <p className="text-2xl font-semibold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                  {medicines.length}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Active formulations</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                <p className="text-xs text-slate-500 font-medium">Low stock alerts</p>
                <p className={`text-2xl font-semibold font-mono mt-1 tabular-nums ${
                  lowStockCount > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'
                }`}>
                  {lowStockCount}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Items with &lt; 50 units remaining</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                <p className="text-xs text-slate-500 font-medium">Near expiry items</p>
                <p className={`text-2xl font-semibold font-mono mt-1 tabular-nums ${
                  expiryAlerts.length > 0 ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'
                }`}>
                  {expiryAlerts.length}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Expiring within 90 days</p>
              </div>
            </div>

            {/* Segmented Control Tabs */}
            <div className="flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  activeTab === 'inventory'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Inventory ({medicines.length})
              </button>
              <button
                onClick={() => setActiveTab('expiry')}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  activeTab === 'expiry'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Expiry alerts ({expiryAlerts.length})
              </button>
              <button
                onClick={() => setActiveTab('add')}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 ${
                  activeTab === 'add'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Plus size={12} />
                <span>Add medicine</span>
              </button>
            </div>

            {/* Tab 1: Inventory Table */}
            {activeTab === 'inventory' && (
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <div className="max-h-96 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-800 sticky top-0">
                      <tr>
                        <th className="p-3 font-medium">Medicine & formulation</th>
                        <th className="p-3 font-medium">Batch</th>
                        <th className="p-3 font-medium font-mono tabular-nums">Price</th>
                        <th className="p-3 font-medium font-mono tabular-nums text-center">Stock</th>
                        <th className="p-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {medicines.map((med) => (
                        <tr key={med._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="p-3">
                            <p className="font-medium text-slate-900 dark:text-white">{med.name}</p>
                            <p className="text-[11px] text-slate-500 font-mono truncate max-w-xs">{med.salt || med.disease}</p>
                          </td>
                          <td className="p-3 font-mono text-[11px] text-slate-500">
                            {med.batchNumber}
                          </td>
                          <td className="p-3 font-mono tabular-nums font-medium text-slate-900 dark:text-white">
                            ₹{med.price}
                          </td>
                          <td className="p-3 text-center">
                            {editingId === med._id ? (
                              <div className="inline-flex items-center gap-1">
                                <input
                                  type="number"
                                  value={editingQty}
                                  onChange={(e) => setEditingQty(e.target.value)}
                                  className="w-16 p-1 text-xs border rounded bg-white dark:bg-slate-900 text-center font-mono"
                                />
                                <button
                                  onClick={() => handleStockSave(med._id)}
                                  className="p-1 rounded bg-teal-700 text-white"
                                  title="Save"
                                >
                                  <Save size={13} />
                                </button>
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1.5 font-mono tabular-nums">
                                <span className={`px-2 py-0.5 rounded text-[11px] ${
                                  med.quantity < 50
                                    ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                                    : 'text-slate-700 dark:text-slate-300'
                                }`}>
                                  {med.quantity}
                                </span>
                                <button
                                  onClick={() => {
                                    setEditingId(med._id);
                                    setEditingQty(med.quantity);
                                  }}
                                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                  title="Edit stock quantity"
                                >
                                  <Edit2 size={12} />
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => deleteMedicine(med._id)}
                              className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                              title="Delete item"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 2: Expiry Alerts */}
            {activeTab === 'expiry' && (
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden p-4 space-y-3">
                <p className="text-xs text-slate-500">
                  Batches nearing expiry (within 90 days). Phased out items must be marked for cold return.
                </p>
                {expiryAlerts.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6 font-mono">
                    All current batches are within valid expiration thresholds
                  </p>
                ) : (
                  <div className="space-y-2">
                    {expiryAlerts.map((med) => (
                      <div
                        key={med._id}
                        className="p-3 rounded-lg border border-red-200/80 dark:border-red-900/40 bg-red-50/40 dark:bg-red-950/20 flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{med.name}</p>
                          <p className="text-[11px] text-slate-500 font-mono">
                            Batch {med.batchNumber} &bull; Expires: {med.expiryDate}
                          </p>
                        </div>
                        <span className="font-mono text-xs text-red-700 dark:text-red-400 font-medium">
                          {med.quantity} units remaining
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Add Medicine */}
            {activeTab === 'add' && (
              <form onSubmit={handleAddMedicine} className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-700 dark:text-slate-300 font-medium block mb-1">
                      Medicine brand name
                    </label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. Paracetamol 500mg"
                      className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 dark:text-slate-300 font-medium block mb-1">
                      Therapeutic condition
                    </label>
                    <input
                      type="text"
                      required
                      value={newDisease}
                      onChange={(e) => setNewDisease(e.target.value)}
                      placeholder="e.g. Fever, Headache"
                      className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 dark:text-slate-300 font-medium block mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                    >
                      <option value="Fever & Pain">Fever & Pain</option>
                      <option value="Antibiotics">Antibiotics</option>
                      <option value="Diabetes Care">Diabetes Care</option>
                      <option value="Cardiac Care">Cardiac Care</option>
                      <option value="Vitamins & Minerals">Vitamins & Minerals</option>
                      <option value="First Aid">First Aid</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-700 dark:text-slate-300 font-medium block mb-1">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="e.g. 45"
                      className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 dark:text-slate-300 font-medium block mb-1">
                      Initial stock quantity
                    </label>
                    <input
                      type="number"
                      required
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 dark:text-slate-300 font-medium block mb-1">
                      Batch number
                    </label>
                    <input
                      type="text"
                      required
                      value={newBatch}
                      onChange={(e) => setNewBatch(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs transition-colors"
                  >
                    Add medicine to inventory
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
