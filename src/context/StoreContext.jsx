import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialMedicines } from '../data/mockMedicines';
import { coupons } from '../data/healthData';
import confetti from 'canvas-confetti';

const StoreContext = createContext();

const API_BASE = (import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? '' : 'https://medsflow.onrender.com')).replace(/\/+$/, '');

export const StoreProvider = ({ children }) => {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('medsflow_theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('medsflow_theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('medsflow_theme', 'light');
    }
  }, [darkMode]);

  // Admin Authentication State
  const [adminToken, setAdminToken] = useState(() => {
    return localStorage.getItem('medsflow_admin_token') || null;
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return !!localStorage.getItem('medsflow_admin_token');
  });

  // Verify stored token on load
  useEffect(() => {
    if (adminToken) {
      fetch(`${API_BASE}/api/admin/verify`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      })
        .then((res) => {
          if (res.ok) {
            setIsAdminAuthenticated(true);
          } else if (res.status === 401 || res.status === 403) {
            // Token invalid or expired
            localStorage.removeItem('medsflow_admin_token');
            setAdminToken(null);
            setIsAdminAuthenticated(false);
          }
        })
        .catch(() => {
          // If offline, keep local state
        });
    }
  }, [adminToken]);

  // Toast notifications
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev && Date.now() - prev.id >= 2900 ? null : prev));
    }, 3000);
  };

  // Admin Login method (Username: admin, Password: admin123)
  const adminLogin = async (username, password) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('medsflow_admin_token', data.token);
        setAdminToken(data.token);
        setIsAdminAuthenticated(true);
        showToast('Welcome, Administrator! Access Granted', 'success');
        return { success: true };
      }

      // If Netlify returns 404/405 (meaning backend proxy is not yet linked) or 502/503 (Render cold start)
      if (res.status === 404 || res.status === 405 || res.status >= 500) {
        if (username.trim() === 'admin' && password === 'admin123') {
          const mockToken = 'mock_jwt_token_admin_authorized_' + Date.now();
          localStorage.setItem('medsflow_admin_token', mockToken);
          setAdminToken(mockToken);
          setIsAdminAuthenticated(true);
          showToast('Welcome, Administrator! (Fallback Mode)', 'success');
          return { success: true };
        }
      }

      const errData = await res.json().catch(() => ({}));
      const errMsg = errData.error || 'Invalid credentials. Use admin / admin123';
      showToast(errMsg, 'error');
      return { success: false, error: errMsg };
    } catch {
      // Fallback local authentication if backend is not yet reached
      if (username.trim() === 'admin' && password === 'admin123') {
        const mockToken = 'mock_jwt_token_admin_authorized_' + Date.now();
        localStorage.setItem('medsflow_admin_token', mockToken);
        setAdminToken(mockToken);
        setIsAdminAuthenticated(true);
        showToast('Welcome, Administrator! (Local Auth Mode)', 'success');
        return { success: true };
      } else {
        showToast('Invalid credentials. Use username: admin | password: admin123', 'error');
        return { success: false, error: 'Invalid credentials' };
      }
    }
  };

  // Admin Logout method
  const adminLogout = () => {
    localStorage.removeItem('medsflow_admin_token');
    setAdminToken(null);
    setIsAdminAuthenticated(false);
    showToast('Logged out of Admin Dashboard', 'info');
  };

  // Medicines state (Synced with backend if available)
  const [medicines, setMedicines] = useState(initialMedicines);
  const [backendConnected, setBackendConnected] = useState(false);
  const [isLoadingMeds, setIsLoadingMeds] = useState(false);

  // Fetch medicines from backend
  const fetchBackendMedicines = async () => {
    setIsLoadingMeds(true);
    try {
      const res = await fetch(`${API_BASE}/api/medicines`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const merged = data.map((med, idx) => {
            const fallback = initialMedicines[idx] || initialMedicines[0];
            return {
              ...fallback,
              ...med,
              _id: med._id || fallback._id,
              name: med.name || fallback.name,
              price: Number(med.price) || fallback.price,
              mrp: Number(med.mrp) || Math.round(Number(med.price) * 1.3),
              quantity: Number(med.quantity) || fallback.quantity,
              batchNumber: med.batchNumber || fallback.batchNumber,
              expiryDate: med.expiryDate ? med.expiryDate.split('T')[0] : fallback.expiryDate,
              disease: med.disease || fallback.disease,
              category: med.category || fallback.category || 'Fever & Pain',
              description: med.description || fallback.description,
              image: med.image || fallback.image,
            };
          });
          setMedicines(merged);
          setBackendConnected(true);
        }
      }
    } catch {
      setBackendConnected(false);
    } finally {
      setIsLoadingMeds(false);
    }
  };

  useEffect(() => {
    fetchBackendMedicines();
  }, []);

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('medsflow_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('medsflow_cart', JSON.stringify(cart));
  }, [cart]);

  // Navigation & Search Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');

  // Location / Pincode
  const [pincode, setPincode] = useState('110001');
  const [locationName, setLocationName] = useState('Connaught Place, New Delhi');
  const [deliveryEta, setDeliveryEta] = useState(18);

  // Modals state
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRxModalOpen, setIsRxModalOpen] = useState(false);
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isDoctorConsultOpen, setIsDoctorConsultOpen] = useState(false);

  // Prescription State
  const [prescription, setPrescription] = useState(null);
  const [isRxVerified, setIsRxVerified] = useState(false);

  // Coupon state
  const [activeCoupon, setActiveCoupon] = useState(null);

  // Order state for live tracking
  const [latestOrder, setLatestOrder] = useState(() => {
    const saved = localStorage.getItem('medsflow_latest_order');
    return saved ? JSON.parse(saved) : null;
  });

  // Cart Operations
  const addToCart = (medicine, qty = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.medicine._id === medicine._id);
      if (existing) {
        return prevCart.map((item) =>
          item.medicine._id === medicine._id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prevCart, { medicine, quantity: qty }];
    });
    showToast(`Added ${medicine.name} to cart`);
  };

  const updateQuantity = (medicineId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.medicine._id === medicineId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (medicineId) => {
    setCart((prevCart) => prevCart.filter((item) => item.medicine._id !== medicineId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.medicine.price * item.quantity, 0);
  const cartMrpTotal = cart.reduce((sum, item) => sum + item.medicine.mrp * item.quantity, 0);
  const totalItemSavings = cartMrpTotal - cartSubtotal;

  let couponDiscount = 0;
  if (activeCoupon) {
    if (activeCoupon.discountPercent) {
      couponDiscount = Math.min(
        Math.round((cartSubtotal * activeCoupon.discountPercent) / 100),
        activeCoupon.maxDiscount || 999
      );
    } else if (activeCoupon.flatDiscount) {
      couponDiscount = activeCoupon.flatDiscount;
    }
  }

  const deliveryFee =
    cartSubtotal >= 199 || (activeCoupon && activeCoupon.freeDelivery) || cart.length === 0
      ? 0
      : 35;

  const grandTotal = Math.max(0, cartSubtotal - couponDiscount + deliveryFee);

  const applyCoupon = (couponCode) => {
    const found = coupons.find((c) => c.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (!found) {
      showToast('Invalid promo coupon code', 'error');
      return false;
    }
    if (cartSubtotal < found.minOrder) {
      showToast(`Add ₹${found.minOrder - cartSubtotal} more to apply ${found.code}`, 'error');
      return false;
    }
    setActiveCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`, 'success');

    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {}
    return true;
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Place order
  const placeOrder = (orderData) => {
    const order = {
      orderId: 'MDF-' + Math.floor(100000 + Math.random() * 900000),
      placedAt: new Date().toISOString(),
      items: [...cart],
      address: orderData.address,
      phone: orderData.phone,
      paymentMethod: orderData.paymentMethod,
      mrpTotal: cartMrpTotal,
      subtotal: cartSubtotal,
      couponDiscount,
      deliveryFee,
      grandTotal,
      etaMinutes: deliveryEta,
      status: 'Pharmacist Verified',
      rider: {
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        vehicle: 'Hero Electric (DL-01-EV-4421)',
        temperature: '4.2°C (Cold-Chain Verified)',
      }
    };

    setLatestOrder(order);
    localStorage.setItem('medsflow_latest_order', JSON.stringify(order));
    clearCart();
    setIsCheckoutOpen(false);
    setIsTrackingOpen(true);

    try {
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.4 } });
    } catch {}

    showToast(`Order #${order.orderId} placed successfully!`, 'success');
  };

  // Protected Admin Actions (Requires JWT Token)
  const updateStock = async (medicineId, newQuantity) => {
    if (!isAdminAuthenticated) {
      showToast('Unauthorized: Please log in as Admin to edit stock', 'error');
      return false;
    }

    const qty = Math.max(0, parseInt(newQuantity, 10));
    setMedicines((prev) =>
      prev.map((med) => (med._id === medicineId ? { ...med, quantity: qty } : med))
    );

    if (backendConnected) {
      try {
        const res = await fetch(`${API_BASE}/api/medicines/${medicineId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
          },
          body: JSON.stringify({ quantity: qty })
        });
        if (!res.ok) {
          throw new Error('Server update failed');
        }
      } catch (err) {
        console.error('Stock update error:', err);
      }
    }

    showToast(`Stock updated to ${qty} units`);
    return true;
  };

  const addNewMedicine = async (newMedData) => {
    if (!isAdminAuthenticated) {
      showToast('Unauthorized: Please log in as Admin to add medicines', 'error');
      return false;
    }

    const newMed = {
      ...newMedData,
      price: Number(newMedData.price),
      mrp: Number(newMedData.mrp || newMedData.price * 1.3),
      quantity: Number(newMedData.quantity),
      rating: 4.8,
      reviews: 1,
      expressDelivery: true,
      image: newMedData.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    };

    if (backendConnected) {
      try {
        const res = await fetch(`${API_BASE}/api/medicines`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
          },
          body: JSON.stringify(newMed)
        });
        if (res.ok) {
          const data = await res.json();
          setMedicines((prev) => [data.medicine || newMed, ...prev]);
          showToast(`Added ${newMed.name} to live store database`, 'success');
          return true;
        }
      } catch (err) {
        console.error('Add medicine backend error:', err);
      }
    }

    // Local fallback
    setMedicines((prev) => [{ ...newMed, _id: 'med_' + Date.now() }, ...prev]);
    showToast(`Added ${newMed.name} to store catalog`, 'success');
    return true;
  };

  const deleteMedicine = async (medicineId) => {
    if (!isAdminAuthenticated) {
      showToast('Unauthorized: Please log in as Admin to delete medicines', 'error');
      return false;
    }

    setMedicines((prev) => prev.filter((med) => med._id !== medicineId));

    if (backendConnected) {
      try {
        await fetch(`${API_BASE}/api/medicines/${medicineId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        });
      } catch (err) {
        console.error('Delete error:', err);
      }
    }

    showToast('Medicine removed from catalog', 'info');
    return true;
  };

  // Expiry alerts (within 90 days)
  const expiryAlerts = medicines.filter((med) => {
    if (!med.expiryDate) return false;
    const exp = new Date(med.expiryDate);
    const today = new Date();
    const limit = new Date();
    limit.setDate(today.getDate() + 90);
    return exp <= limit;
  });

  return (
    <StoreContext.Provider
      value={{
        medicines,
        isLoadingMeds,
        backendConnected,
        fetchBackendMedicines,
        adminToken,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        cartMrpTotal,
        totalItemSavings,
        couponDiscount,
        deliveryFee,
        grandTotal,
        activeCoupon,
        applyCoupon,
        removeCoupon,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        activeFilter,
        setActiveFilter,
        pincode,
        setPincode,
        locationName,
        setLocationName,
        deliveryEta,
        setDeliveryEta,
        prescription,
        setPrescription,
        isRxVerified,
        setIsRxVerified,
        selectedMedicine,
        setSelectedMedicine,
        isCartOpen,
        setIsCartOpen,
        isRxModalOpen,
        setIsRxModalOpen,
        isPincodeModalOpen,
        setIsPincodeModalOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        isAdminOpen,
        setIsAdminOpen,
        isDoctorConsultOpen,
        setIsDoctorConsultOpen,
        toast,
        showToast,
        latestOrder,
        placeOrder,
        updateStock,
        addNewMedicine,
        deleteMedicine,
        expiryAlerts,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
