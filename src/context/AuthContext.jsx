import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const DEFAULT_USER = {
  name: "Aurelia Sterling",
  email: "aurelia@gemaura.com",
  phone: "+1 (555) 839-2001",
  address: "742 Lapis Lazuli Way, Emerald Hills, CA 90210",
  billingAddress: "742 Lapis Lazuli Way, Emerald Hills, CA 90210",
};

const DEFAULT_ORDERS = [
  {
    id: "GEM-9827",
    date: "2026-07-20",
    total: 380,
    status: "Shipped",
    items: [{ id: "gem-001", name: "Aura Jade Harmony Bracelet", qty: 1, price: 380 }]
  },
  {
    id: "GEM-9741",
    date: "2026-06-15",
    total: 650,
    status: "Delivered",
    items: [{ id: "gem-004", name: "Celestial Lapis Lazuli Necklace", qty: 1, price: 650 }]
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("gemaura_user");
    return savedUser ? JSON.parse(savedUser) : DEFAULT_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("gemaura_auth") === "true";
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("gemaura_orders");
    return savedOrders ? JSON.parse(savedOrders) : DEFAULT_ORDERS;
  });

  const [usersDb, setUsersDb] = useState(() => {
    const db = localStorage.getItem("gemaura_users_db");
    return db ? JSON.parse(db) : [DEFAULT_USER];
  });

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const viewed = localStorage.getItem("gemaura_viewed");
    return viewed ? JSON.parse(viewed) : [];
  });

  useEffect(() => {
    localStorage.setItem("gemaura_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("gemaura_auth", isAuthenticated.toString());
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("gemaura_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("gemaura_users_db", JSON.stringify(usersDb));
  }, [usersDb]);

  useEffect(() => {
    localStorage.setItem("gemaura_viewed", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const login = (email, password) => {
    if (email === "aurelia@gemaura.com" && password === "GemAura123!") {
      setUser(DEFAULT_USER);
      setIsAuthenticated(true);
      return { success: true };
    }
    
    const matchedUser = usersDb.find(u => u.email === email);
    if (matchedUser && password.length >= 6) {
      setUser(matchedUser);
      setIsAuthenticated(true);
      return { success: true };
    }

    return { success: false, message: "Invalid credentials. Hint: aurelia@gemaura.com / GemAura123!" };
  };

  const register = (name, email, phone, password) => {
    if (usersDb.some(u => u.email === email)) {
      return { success: false, message: "Email is already registered!" };
    }

    const newUser = {
      name,
      email,
      phone: phone || "",
      address: "",
      billingAddress: "",
    };

    setUsersDb(prev => [...prev, newUser]);
    setUser(newUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("gemaura_auth");
  };

  const updateProfile = (updatedData) => {
    setUser(prev => {
      const newUser = { ...prev, ...updatedData };
      setUsersDb(db => db.map(u => u.email === prev.email ? newUser : u));
      return newUser;
    });
  };

  const addOrder = (orderItems, totalAmount) => {
    const newOrder = {
      id: `GEM-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      total: totalAmount,
      status: "Processing",
      items: orderItems,
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const addViewedProduct = (product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 4); // Keep last 4 items
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateProfile, orders, addOrder, recentlyViewed, addViewedProduct }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
