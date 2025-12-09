import api from './api';
import type { Cart, CartItem } from '../types';

export const cartService = {
  getCart: async (): Promise<Cart> => {
    const response = await api.get('/cart');
    return response.data.data;
  },

  addItem: async (item: CartItem): Promise<Cart> => {
    const response = await api.post('/cart/items', item);
    return response.data.data;
  },

  updateItem: async (productId: string, quantity: number): Promise<Cart> => {
    const response = await api.put(`/cart/items/${productId}`, { quantity });
    return response.data.data;
  },

  removeItem: async (productId: string): Promise<Cart> => {
    const response = await api.delete(`/cart/items/${productId}`);
    return response.data.data;
  },

  clear: async (): Promise<void> => {
    await api.delete('/cart');
  },
};
