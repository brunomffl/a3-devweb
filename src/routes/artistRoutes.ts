import { Router } from "express";
import { ArtistController } from "@/controllers/artistController";
import { validateBody, validateParams } from "@/middlewares/validate-schema";
import { artistCreateSchema, artistUpdateSchema, artistParamsSchema } from "@/schemas/artistSchema";
import { verifyUserAuthorizations } from "@/middlewares/verify-user-authorization";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const artistRoutes = Router();
const artistController = new ArtistController();

// Rotas públicas - GET lista
artistRoutes.get("/",
    artistController.getAll.bind(artistController)
);

// Rotas públicas - GET por ID
artistRoutes.get("/:id",
    artistController.getById.bind(artistController)
);

// Rotas protegidas - POST criar
artistRoutes.post("/",
    ensureAuthenticated,
    verifyUserAuthorizations(["ADMIN"]),
    validateBody(artistCreateSchema),
    artistController.create.bind(artistController)
);

// Rotas protegidas - PUT atualizar
artistRoutes.put("/:id",
    ensureAuthenticated,
    verifyUserAuthorizations(["ADMIN"]),
    validateParams(artistParamsSchema),
    validateBody(artistUpdateSchema),
    artistController.update.bind(artistController)
);

// Rotas protegidas - DELETE
artistRoutes.delete("/:id",
    ensureAuthenticated,
    verifyUserAuthorizations(["ADMIN"]),
    validateParams(artistParamsSchema),
    artistController.delete.bind(artistController)
);

export { artistRoutes };
