'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { deleteCart, retrieveCart } from '@/utils/shopify';

interface CartContextType {
  cart: any;
  setCart: React.Dispatch<React.SetStateAction<any>>;
  removeFromCart: any;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any>(null);

  useEffect(() => {
    const fetchCart = async () => {
      const cartId = sessionStorage.getItem('cartId');
      if (cartId) {
        const fetchedCart = await retrieveCart(cartId);
        setCart(fetchedCart);
      }
    };

    fetchCart();
  }, []);
  const removeFromCart = async (cartId: string, lineItemId: string) => {
    const response = await deleteCart(cartId, lineItemId);
    const backupCart = cart;

    if (response?.cartLinesRemove?.cart) {
      const filteredEdges = backupCart.lines.edges.filter(
        (edge: any) => edge.node.id !== lineItemId,
      );

      const updatedCart = {
        ...backupCart,
        lines: {
          ...backupCart.lines,
          edges: filteredEdges,
        },
      };

      setCart(updatedCart);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
