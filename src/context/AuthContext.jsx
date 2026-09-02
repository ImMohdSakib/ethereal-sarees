import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEMO_ORDERS = [
  {
    id: 'ORD-2026-1042',
    date: '2026-08-18',
    status: 'Delivered',
    total: 18999,
    items: [{ name: 'Royal Banarasi Silk Saree', qty: 1, price: 18999 }],
  },
  {
    id: 'ORD-2026-0988',
    date: '2026-07-02',
    status: 'Delivered',
    total: 12998,
    items: [
      { name: 'Pastel Cotton Handloom Saree', qty: 1, price: 4999 },
      { name: 'Wine Georgette Party Saree', qty: 1, price: 7999 },
    ],
  },
  {
    id: 'ORD-2026-1105',
    date: '2026-08-28',
    status: 'Shipped',
    total: 22499,
    items: [{ name: 'Emerald Kanjeevaram Saree', qty: 1, price: 22499 }],
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ethereal-auth');
      if (saved) {
        const parsed = JSON.parse(saved);
        setUser(parsed.user);
        setOrders(parsed.orders || DEMO_ORDERS);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (u, o) => {
    try {
      localStorage.setItem('ethereal-auth', JSON.stringify({ user: u, orders: o }));
    } catch {
      /* ignore */
    }
  };

  const login = (email, password, name) => {
    const u = {
      id: 'USR-1001',
      name: name || email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      phone: '+91 98765 43210',
      joined: '2025-11-12',
      address: {
        line: '12 Heritage Lane',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
      },
    };
    const o = DEMO_ORDERS;
    setUser(u);
    setOrders(o);
    persist(u, o);
    return u;
  };

  const signup = ({ name, email, phone, password }) => {
    const u = {
      id: 'USR-' + Date.now().toString().slice(-4),
      name,
      email,
      phone: phone || '',
      joined: new Date().toISOString().slice(0, 10),
      address: { line: '', city: '', state: '', pincode: '' },
    };
    setUser(u);
    setOrders([]);
    persist(u, []);
    return u;
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem('ethereal-auth');
  };

  const updateProfile = (data) => {
    const u = { ...user, ...data };
    setUser(u);
    persist(u, orders);
  };

  return (
    <AuthContext.Provider value={{ user, orders, login, signup, logout, updateProfile, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
