import api from './api';
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  PaginatedResponse,
} from '../types';

export const productService = {
  getAll: async (page = 1, pageSize = 10, search?: string): Promise<PaginatedResponse<Product>> => {
      const params: Record<string, unknown> = { page, pageSize };
    if (search) params.search = search;
    const response = await api.get('/products', { params });
    return response.data.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data.data;
  },

  getByCategory: async (category: string, page = 1, pageSize = 10): Promise<PaginatedResponse<Product>> => {
    const response = await api.get(`/products/category/${category}`, {
      params: { page, pageSize },
    });
    return response.data.data;
  },

  create: async (data: CreateProductRequest): Promise<Product> => {
    const response = await api.post('/products', data);
    return response.data.data;
  },

  update: async (id: string, data: UpdateProductRequest): Promise<Product> => {
    const response = await api.put(`/products/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  search: async (query: string, page = 1, pageSize = 10): Promise<PaginatedResponse<Product>> => {
    const response = await api.get('/products/search', {
      params: { q: query, page, pageSize },
    });
    return response.data.data;
  },
};
