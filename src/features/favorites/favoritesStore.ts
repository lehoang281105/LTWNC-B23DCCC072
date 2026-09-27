import { create } from 'zustand';
import type { Product } from '../../types/order-management';

export interface FavoritesState {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  addFavorite: (product: Product) =>
    set((state) => {
      const exists = state.favorites.some((item) => item.id === product.id);
      if (exists) return state;
      return { favorites: [...state.favorites, product] };
    }),

  removeFavorite: (productId: string) =>
    set((state) => ({
      favorites: state.favorites.filter((item) => item.id !== productId),
    })),

  toggleFavorite: (product: Product) => {
    const isFav = get().isFavorite(product.id);
    if (isFav) {
      get().removeFavorite(product.id);
    } else {
      get().addFavorite(product);
    }
  },

  isFavorite: (productId: string) => {
    return get().favorites.some((item) => item.id === productId);
  },

  clearFavorites: () => set({ favorites: [] }),
}));
