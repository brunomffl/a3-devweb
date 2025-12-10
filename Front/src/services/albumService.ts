import api from './api';
import type { Artist } from './artistService';

export interface Album {
    id: string;
    title: string;
    year: number;
    genre?: string;
    coverUrl?: string;
    tracks: number;
    duration?: number;
    artistId: string;
    artist?: Artist;
    createdAt: string;
    updatedAt: string;
}

export interface CreateAlbumRequest {
    title: string;
    year: number;
    genre?: string;
    coverUrl?: string;
    tracks: number;
    duration?: number;
    artistId: string;
}

export interface UpdateAlbumRequest {
    title?: string;
    year?: number;
    genre?: string;
    coverUrl?: string;
    tracks?: number;
    duration?: number;
    artistId?: string;
}

export const albumService = {

    getAll: async (): Promise<Album[]> => {
        const response = await api.get('/albums');

        if (Array.isArray(response.data.data)) return response.data.data;

        if (Array.isArray(response.data)) return response.data;

        if (Array.isArray(response.data.albums)) return response.data.albums;

        return [];
    },

    getById: async (id: string): Promise<Album> => {
        const response = await api.get(`/albums/${id}`);
        return response.data.data || response.data.album || response.data;
    },

    create: async (data: CreateAlbumRequest): Promise<Album> => {
        const response = await api.post('/albums', data);
        return response.data.data || response.data.album || response.data;
    },

    update: async (id: string, data: UpdateAlbumRequest): Promise<Album> => {
        const response = await api.put(`/albums/${id}`, data);
        return response.data.data || response.data.album || response.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/albums/${id}`);
    },
};
