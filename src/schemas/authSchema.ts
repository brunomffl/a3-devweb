import { z } from "zod";

export const authSchema = z.object({
    email: z.email(),
    password: z.string()
});

export const authRegisterSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres")
});

export interface TokenPayLoad {
    sub: string,
    role: string
}

export type AuthLoginSchema = z.infer<typeof authSchema>;
export type AuthRegisterSchema = z.infer<typeof authRegisterSchema>;