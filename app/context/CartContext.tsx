"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // Drawer open/close state

  // LocalStorage se cart data recover karna runtime par
  useEffect(() => {
    const savedCart = localStorage.getItem('mesy_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id && item.selectedColor === product.selectedColor);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id && item.selectedColor === product.selectedColor
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        updatedCart = [...prevCart, product];
      }
      localStorage.setItem('mesy_cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (id: any) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem('mesy_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const updateQuantity = (id: any, quantity: number) => {
    setCart((prev) => {
      const updated = prev.map((item) => item.id === id ? { ...item, quantity } : item);
      localStorage.setItem('mesy_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      isCartOpen, 
      setIsCartOpen, // Exposing setter function globally
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      getCartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);