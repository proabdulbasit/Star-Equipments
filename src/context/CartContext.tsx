'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import {
  deleteCart,
  retrieveCart,
  addToCart,
  updateCart,
} from '@/utils/shopify';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

interface CartContextType {
  cart: any;
  setCart: React.Dispatch<React.SetStateAction<any>>;
  removeFromCart: (cartId: string, lineItemId: string) => Promise<void>;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateCartItem: (
    cartId: string,
    lineItemId: string,
    quantity: number,
  ) => Promise<void>;
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
      const cartId = Cookies.get('cartId');
      if (cartId) {
        try {
          const fetchedCart = await retrieveCart(cartId);
          setCart(fetchedCart);
        } catch (error) {
          console.error('Error fetching cart:', error);
          Cookies.remove('cartId');
        }
      }
    };

    fetchCart();
  }, []);

  const handleAddToCart = async (variantId: string, quantity: number = 1) => {
    try {
      const cartId = Cookies.get('cartId');
      let newCartId = cartId;

      if (!cartId) {
        const { cartCreate } = await addToCart(variantId, quantity);
        newCartId = cartCreate.cart.id;
        if (newCartId) {
          Cookies.set('cartId', newCartId, {
            expires: 30, // 30 days
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
          });
          const newCart = await retrieveCart(newCartId);
          setCart(newCart);
          toast.success('Item added to cart!');
        }
      } else {
        await updateCart(cartId, variantId, quantity);
        const updatedCart = await retrieveCart(cartId);
        setCart(updatedCart);
        toast.success('Item added to cart!');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const handleRemoveFromCart = async (cartId: string, lineItemId: string) => {
    try {
      const response = await deleteCart(cartId, lineItemId);
      if (response?.cartLinesRemove?.cart) {
        const updatedCart = await retrieveCart(cartId);
        setCart(updatedCart);
        toast.success('Item removed from cart');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const handleUpdateCartItem = async (
    cartId: string,
    lineItemId: string,
    quantity: number,
  ) => {
    try {
      await updateCart(cartId, lineItemId, quantity);
      const updatedCart = await retrieveCart(cartId);
      setCart(updatedCart);
      toast.success('Cart updated');
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        removeFromCart: handleRemoveFromCart,
        addToCart: handleAddToCart,
        updateCartItem: handleUpdateCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
