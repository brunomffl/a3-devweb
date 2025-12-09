import jwt from "jsonwebtoken";
import { compare, hash } from "bcryptjs";
import { authConfig } from "@/config/auth";
import { AppError } from "@/utils/AppError";
import { AuthLoginSchema, AuthRegisterSchema } from "@/schemas/authSchema";
import { AuthRepository } from "@/repositories/auth-repository";

class AuthService {
    private authRepository: AuthRepository;

    constructor() {
        this.authRepository = new AuthRepository();
    }

    async register(user: AuthRegisterSchema){
        const existingUser = await this.authRepository.findUserByEmail(user.email);

        if(existingUser){
            throw new AppError("E-mail já está sendo utilizado!", 409);
        };

        const hashedPassword = await hash(user.password, 12);

        const newUser = await this.authRepository.createUser({
            ...user,
            password: hashedPassword
        });

        const { secret, expiresIn } = authConfig.jwt;

        if(!secret){
            throw new AppError("Código JWT não foi definido", 500);
        };

        const token = jwt.sign({
            role: newUser.role,
            sub: newUser.id
        }, secret!);

        const { password: _, ...userWithoutPassword } = newUser;

        return{
            token,
            user: userWithoutPassword
        };
    };

    async login(user: AuthLoginSchema){
        const compareUser = await this.authRepository.findUserByEmail(user.email);

        if(!compareUser){
            throw new AppError("E-mail ou senha inválidos!", 401);
        };

        const passwordMatched = await compare(user.password, compareUser.password);

        if(!passwordMatched){
            throw new AppError("E-mail ou senha inválidos!", 401);
        };

        const { secret, expiresIn } = authConfig.jwt;

        if(!secret){
            throw new AppError("Código JWT não foi definido", 500);
        };

        const token = jwt.sign({
            role: compareUser.role,
            sub: compareUser.id
        }, secret!);

        const { password: _, ...userWithoutPassword } = compareUser;

        return{
            token,
            user: userWithoutPassword
        };
    };
};

export { AuthService }