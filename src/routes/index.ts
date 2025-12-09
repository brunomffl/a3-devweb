import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { artistRoutes } from "./artistRoutes";
import { albumRoutes } from "./albumRoutes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const routes = Router();

//rotas públicas
routes.use("/auth", authRoutes);

//rotas protegidas
routes.use(ensureAuthenticated);
routes.use("/artists", artistRoutes);
routes.use("/albums", albumRoutes);

export { routes };