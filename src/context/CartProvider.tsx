import React, { createContext, useContext, useState } from 'react';
import { ProductList } from '../interfaces/ProductInterface';

interface CartContextType {
  cartItems: ProductList[];
  addToCart: (product: ProductList) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode; // Specify the type of children
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ProductList[]>([]);

  const addToCart = (product: ProductList) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
