import { Router } from "express";
import { ArtistController } from "@/controllers/artistController";
import { validateBody, validateParams } from "@/middlewares/validate-schema";
import { artistCreateSchema, artistUpdateSchema, artistParamsSchema } from "@/schemas/artistSchema";
import { verifyUserAuthorizations } from "@/middlewares/verify-user-authorization";

const artistRoutes = Router();
const artistController = new ArtistController();

artistRoutes.get("/",
    verifyUserAuthorizations(["USER", "ADMIN"]),
    artistController.getAll.bind(artistController)
);

artistRoutes.get("/:id",
    verifyUserAuthorizations(["USER", "ADMIN"]),
    validateParams(artistParamsSchema),
    artistController.getById.bind(artistController)
);

artistRoutes.post("/",
    verifyUserAuthorizations(["ADMIN"]),
    validateBody(artistCreateSchema),
    artistController.create.bind(artistController)
);

artistRoutes.put("/:id",
    verifyUserAuthorizations(["ADMIN"]),
    validateParams(artistParamsSchema),
    validateBody(artistUpdateSchema),
    artistController.update.bind(artistController)
);

artistRoutes.delete("/:id",
    verifyUserAuthorizations(["ADMIN"]),
    validateParams(artistParamsSchema),
    artistController.delete.bind(artistController)
);

export { artistRoutes };
