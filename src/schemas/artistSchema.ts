import { z } from "zod";

export const artistCreateSchema = z.object({
    name: z.string({ message: "Nome é obrigatório" })
        .min(1, "Nome não pode estar vazio"),
    country: z.string().optional(),
    genre: z.string().optional(),
    biography: z.string().optional(),
    imageUrl: z.string().url("URL da imagem deve ser válida").optional()
});

export const artistUpdateSchema = z.object({
    name: z.string().min(1, "Nome não pode estar vazio").optional(),
    country: z.string().optional(),
    genre: z.string().optional(),
    biography: z.string().optional(),
    imageUrl: z.string().url("URL da imagem deve ser válida").optional()
});

export const artistParamsSchema = z.object({
    id: z.string({ message: "ID é obrigatório" })
});

export type ArtistCreateSchema = z.infer<typeof artistCreateSchema>;
export type ArtistUpdateSchema = z.infer<typeof artistUpdateSchema>;
export type ArtistParamsSchema = z.infer<typeof artistParamsSchema>;
