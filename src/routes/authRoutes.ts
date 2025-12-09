import { Router } from "express";
import { AuthController } from "@/controllers/authController";
import { validateBody } from "@/middlewares/validate-schema";
import { authRegisterSchema, authSchema } from "@/schemas/authSchema";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/login",
    validateBody(authSchema),
    authController.login.bind(authController)
);

authRoutes.post("/register",
    validateBody(authRegisterSchema),
    authController.register.bind(authController),
);

export { authRoutes };