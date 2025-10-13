'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateTotalPrice } from '@/lib/volume-discount';

export interface CartItem {
  product_id: string;
  slug: string;
  name: string;
  price: number; // Base price per unit
  quantity: number;
  image_url: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Omit<CartItem, 'quantity'>, quantity: number) => void;
  removeItem: (product_id: string) => void;
  updateQuantity: (product_id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  savedEmail: string | null;
  setSavedEmail: (email: string) => void;
  showEmailPrompt: boolean;
  setShowEmailPrompt: (show: boolean) => void;
  loadCartFromDatabase: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'lumora-cart';
const EMAIL_STORAGE_KEY = 'lumora-cart-email';

export function CartProvider({ children }: { children: React.ReactNode}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [savedEmail, setSavedEmailState] = useState<string | null>(null);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [dbCartLoaded, setDbCartLoaded] = useState(false);

  // Function to load cart from database (called externally when user is available)
  const loadCartFromDatabase = async () => {
    if (dbCartLoaded) {
      return; // Already loaded
    }

    try {
      const response = await fetch('/api/cart/load');
      const data = await response.json();

      if (data.success && data.cart && data.cart.length > 0) {
        // Merge database cart with local cart (prefer database)
        const localCart = localStorage.getItem(CART_STORAGE_KEY);
        let localItems: CartItem[] = [];

        if (localCart) {
          try {
            localItems = JSON.parse(localCart);
          } catch (error) {
            console.error('Failed to parse local cart:', error);
          }
        }

        // Merge carts: if product exists in both, keep the higher quantity
        const mergedCart = [...data.cart];
        localItems.forEach(localItem => {
          const existingIndex = mergedCart.findIndex(
            (item: CartItem) => item.product_id === localItem.product_id
          );

          if (existingIndex >= 0) {
            // Keep higher quantity
            if (localItem.quantity > mergedCart[existingIndex].quantity) {
              mergedCart[existingIndex] = localItem;
            }
          } else {
            // Add local item if not in database cart
            mergedCart.push(localItem);
          }
        });

        setItems(mergedCart);
        console.log('Cart loaded from database and merged with local cart');
      }

      setDbCartLoaded(true);
    } catch (error) {
      console.error('Failed to load cart from database:', error);
      setDbCartLoaded(true);
    }
  };

  // Load cart and email from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);
        setItems(parsed);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }

    const storedEmail = localStorage.getItem(EMAIL_STORAGE_KEY);
    if (storedEmail) {
      setSavedEmailState(storedEmail);
    }

    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoaded]);

  // Auto-save cart to database for guest users (debounced)
  useEffect(() => {
    if (!isLoaded || items.length === 0 || !savedEmail) {
      return;
    }

    // Debounce: wait 30 seconds after last change before saving
    const timeoutId = setTimeout(async () => {
      try {
        const totalPrice = items.reduce((total, item) => {
          return total + calculateTotalPrice(item.price, item.quantity);
        }, 0);

        const response = await fetch('/api/cart/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer_email: savedEmail,
            cart_data: items,
            total_amount: totalPrice,
            locale: typeof window !== 'undefined' ?
              (window.location.hostname.includes('.com') ? 'en' :
               window.location.hostname.includes('.de') ? 'de' : 'nl') : 'nl',
          }),
        });

        const data = await response.json();
        if (data.success) {
          console.log('Cart auto-saved to database');
        }
      } catch (error) {
        console.error('Failed to auto-save cart:', error);
      }
    }, 30000); // 30 seconds debounce

    return () => clearTimeout(timeoutId);
  }, [items, savedEmail, isLoaded]);

  // Show email prompt after user has items in cart and no email saved
  useEffect(() => {
    if (isLoaded && items.length > 0 && !savedEmail && !showEmailPrompt) {
      // Wait 10 seconds before showing prompt
      const timeoutId = setTimeout(() => {
        setShowEmailPrompt(true);
      }, 10000);

      return () => clearTimeout(timeoutId);
    }
  }, [items, savedEmail, isLoaded, showEmailPrompt]);

  const setSavedEmail = (email: string) => {
    setSavedEmailState(email);
    localStorage.setItem(EMAIL_STORAGE_KEY, email);
    setShowEmailPrompt(false);
  };

  const addItem = (product: Omit<CartItem, 'quantity'>, quantity: number) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.product_id === product.product_id);

      if (existingItem) {
        // Update quantity of existing item
        return currentItems.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...currentItems, { ...product, quantity }];
      }
    });
  };

  const removeItem = (product_id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.product_id !== product_id));
  };

  const updateQuantity = (product_id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(product_id);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product_id === product_id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    // Calculate total with volume discount applied per product
    return items.reduce((total, item) => {
      const itemTotal = calculateTotalPrice(item.price, item.quantity);
      return total + itemTotal;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isCartOpen,
        setIsCartOpen,
        savedEmail,
        setSavedEmail,
        showEmailPrompt,
        setShowEmailPrompt,
        loadCartFromDatabase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
