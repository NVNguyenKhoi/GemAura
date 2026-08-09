import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("gemaura_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    const saved = localStorage.getItem("gemaura_coupon");
    return saved ? JSON.parse(saved) : null; // { code: 'AURAGOLD', rate: 0.15 }
  });

  useEffect(() => {
    localStorage.setItem("gemaura_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("gemaura_coupon", JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCouponCode = (code) => {
    const uppercaseCode = code.toUpperCase();
    if (uppercaseCode === "AURAGOLD") {
      setAppliedCoupon({ code: "AURAGOLD", rate: 0.15 });
      return { success: true, message: "15% Gold discount applied successfully!" };
    } else if (uppercaseCode === "EMERALD10") {
      setAppliedCoupon({ code: "EMERALD10", rate: 0.10 });
      return { success: true, message: "10% Emerald discount applied successfully!" };
    }
    return { success: false, message: "Invalid promo code." };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Calculations
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getDiscount = () => {
    const subtotal = getSubtotal();
    if (appliedCoupon) {
      return Math.round(subtotal * appliedCoupon.rate);
    }
    return 0;
  };

  const getShippingCost = () => {
    const subtotal = getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= 350 ? 0 : 15; // Free shipping over $350, otherwise $15
  };

  const getTax = () => {
    const netSubtotal = getSubtotal() - getDiscount();
    return Math.round(netSubtotal * 0.08); // 8% VAT
  };

  const getTotal = () => {
    return getSubtotal() - getDiscount() + getShippingCost() + getTax();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCouponCode,
        removeCoupon,
        appliedCoupon,
        subtotal: getSubtotal(),
        discount: getDiscount(),
        shippingCost: getShippingCost(),
        tax: getTax(),
        total: getTotal(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
