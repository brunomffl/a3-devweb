import api from './api';

export interface Artist {
  id: string;
  name: string;
  country?: string;
  genre?: string;
  biography?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Album {
  id: string;
  title: string;
  year: number;
  genre?: string;
  coverUrl?: string;
  tracks: number;
  duration?: number;
  artistId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateArtistRequest {
  name: string;
  country?: string;
  genre?: string;
  biography?: string;
  imageUrl?: string;
}

export interface UpdateArtistRequest {
  name?: string;
  country?: string;
  genre?: string;
  biography?: string;
  imageUrl?: string;
}

export const artistService = {
  getAll: async (): Promise<Artist[]> => {
    const response = await api.get('/artists');
    return response.data.data || response.data;
  },

  getById: async (id: string): Promise<Artist> => {
    const response = await api.get(`/artists/${id}`);
    return response.data.data || response.data;
  },

  create: async (data: CreateArtistRequest): Promise<Artist> => {
    const response = await api.post('/artists', data);
    return response.data.data || response.data;
  },

  update: async (id: string, data: UpdateArtistRequest): Promise<Artist> => {
    const response = await api.put(`/artists/${id}`, data);
    return response.data.data || response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/artists/${id}`);
  },
};
