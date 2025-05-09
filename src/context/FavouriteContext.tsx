'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type FavouriteContextType = {
  favourites: string[];
  addToFavourite: (productId: string) => void;
  removeFromFavourite: (productId: string) => void;
};

const FavouriteContext = createContext<FavouriteContextType | undefined>(
  undefined,
);

export const useFavourite = (): FavouriteContextType => {
  const context = useContext(FavouriteContext);
  if (!context) {
    throw new Error('useFavourite must be used within a FavouriteProvider');
  }
  return context;
};

type FavouriteProviderProps = {
  children: ReactNode;
};

export const FavouriteProvider = ({ children }: FavouriteProviderProps) => {
  const [favourites, setFavourites] = useState<string[]>([]);

  const addToFavourite = (productId: string) => {
    setFavourites((prevFavourites) => [...prevFavourites, productId]);
  };

  const removeFromFavourite = (productId: string) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((id) => id !== productId),
    );
  };

  return (
    <FavouriteContext.Provider
      value={{ favourites, addToFavourite, removeFromFavourite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
