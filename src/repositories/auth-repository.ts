import { prisma } from "@/database/prisma";
import { AuthRegisterSchema } from "@/schemas/authSchema";

class AuthRepository {

    async findUserByEmail(email: string) {
        return await prisma.user.findFirst({
            where: { email }
        });
    }

    async createUser(userData: AuthRegisterSchema & { password: string }) {
        return await prisma.user.create({
            data: {
                email: userData.email,
                password: userData.password,
                name: userData.name
            }
        });
    }
}

export { AuthRepository };
