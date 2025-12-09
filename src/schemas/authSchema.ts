import { z } from "zod";

export const authSchema = z.object({
    email: z.string({ message: "Email é obrigatório" }),
    password: z.string({ message: "Senha é obrigatória" })
        .min(1, "Senha não pode estar vazia")
});

export const authRegisterSchema = z.object({
    email: z.string({ message: "Email é obrigatório" }),
    password: z.string({ message: "Senha é obrigatória" })
        .min(6, "A senha deve ter pelo menos 6 caracteres"),
    name: z.string({ message: "Nome é obrigatório" })
        .min(2, "O nome deve ter pelo menos 2 caracteres")
});

export interface TokenPayLoad {
    sub: string,
    role: string
}

export type AuthLoginSchema = z.infer<typeof authSchema>;
export type AuthRegisterSchema = z.infer<typeof authRegisterSchema>;