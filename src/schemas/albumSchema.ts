import { z } from "zod";

export const albumCreateSchema = z.object({
    title: z.string({ message: "Título é obrigatório" })
        .min(1, "Título não pode estar vazio"),
    year: z.number({ message: "Ano é obrigatório" })
        .int("Ano deve ser um número inteiro")
        .min(1900, "Ano deve ser maior que 1900")
        .max(new Date().getFullYear() + 1, "Ano não pode ser futuro"),
    genre: z.string().optional(),
    coverUrl: z.string().url("URL da capa deve ser válida").optional(),
    tracks: z.number().int("Número de faixas deve ser um inteiro").min(0, "Número de faixas deve ser positivo").default(0),
    duration: z.number().int("Duração deve ser um inteiro").min(0, "Duração deve ser positiva").optional(),
    artistId: z.string({ message: "ID do artista é obrigatório" })
});

export const albumUpdateSchema = z.object({
    title: z.string().min(1, "Título não pode estar vazio").optional(),
    year: z.number()
        .int("Ano deve ser um número inteiro")
        .min(1900, "Ano deve ser maior que 1900")
        .max(new Date().getFullYear() + 1, "Ano não pode ser futuro").optional(),
    genre: z.string().optional(),
    coverUrl: z.string().url("URL da capa deve ser válida").optional(),
    tracks: z.number().int("Número de faixas deve ser um inteiro").min(0, "Número de faixas deve ser positivo").optional(),
    duration: z.number().int("Duração deve ser um inteiro").min(0, "Duração deve ser positiva").optional(),
    artistId: z.string().optional()
});

export const albumParamsSchema = z.object({
    id: z.string({ message: "ID é obrigatório" })
});

export type AlbumCreateSchema = z.infer<typeof albumCreateSchema>;
export type AlbumUpdateSchema = z.infer<typeof albumUpdateSchema>;
export type AlbumParamsSchema = z.infer<typeof albumParamsSchema>;
