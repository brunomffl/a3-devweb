import { Router, Request, Response } from "express";
import { authRoutes } from "./authRoutes";
import { artistRoutes } from "./artistRoutes";

const routes = Router();

// Endpoint de teste
routes.get("/test", (req: Request, res: Response) => {
  res.json({ success: true, message: "Backend está funcionando!" });
});

//rotas públicas
routes.use("/auth", authRoutes);
routes.use("/artists", artistRoutes);

export { routes };