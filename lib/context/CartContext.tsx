'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Service } from '../types/service.types';

export interface CartItem {
  serviceId: number;
  serviceName: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (service: Service, quantity?: number) => void;
  removeItem: (serviceId: number) => void;
  updateQuantity: (serviceId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart && storedCart !== 'undefined') {
        const parsedCart = JSON.parse(storedCart);
        setItems(parsedCart);
      } else {
        // Limpiar localStorage si hay datos inválidos
        localStorage.removeItem('cart');
      }
    } catch (error) {
      console.error('Error al cargar carrito desde localStorage:', error);
      localStorage.removeItem('cart');
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (service: Service, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.serviceId === service.id);

      if (existingItem) {
        // Incrementar cantidad si ya existe
        return prevItems.map((item) =>
          item.serviceId === service.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Agregar nuevo item
        return [
          ...prevItems,
          {
            serviceId: service.id,
            serviceName: service.name,
            price: service.price,
            quantity,
          },
        ];
      }
    });
  };

  const removeItem = (serviceId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.serviceId !== serviceId));
  };

  const updateQuantity = (serviceId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(serviceId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.serviceId === serviceId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
