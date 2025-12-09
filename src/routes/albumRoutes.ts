import { Router } from "express";
import { AlbumController } from "@/controllers/albumController";
import { validateBody, validateParams } from "@/middlewares/validate-schema";
import { albumCreateSchema, albumUpdateSchema, albumParamsSchema } from "@/schemas/albumSchema";
import { artistParamsSchema } from "@/schemas/artistSchema";
import { verifyUserAuthorizations } from "@/middlewares/verify-user-authorization";

const albumRoutes = Router();
const albumController = new AlbumController();

// GET /albums - Listar todos os álbuns
albumRoutes.get("/",
    verifyUserAuthorizations(["USER", "ADMIN"]),
    albumController.getAll.bind(albumController)
);

// GET /albums/:id - Buscar álbum por ID
albumRoutes.get("/:id",
    verifyUserAuthorizations(["USER", "ADMIN"]),
    validateParams(albumParamsSchema),
    albumController.getById.bind(albumController)
);

// GET /albums/artist/:artistId - Buscar álbuns por artista
albumRoutes.get("/artist/:artistId",
    verifyUserAuthorizations(["USER", "ADMIN"]),
    validateParams(artistParamsSchema),
    albumController.getByArtistId.bind(albumController)
);

// POST /albums - Criar novo álbum
albumRoutes.post("/",
    verifyUserAuthorizations(["ADMIN"]),
    validateBody(albumCreateSchema),
    albumController.create.bind(albumController)
);

// PUT /albums/:id - Atualizar álbum
albumRoutes.put("/:id",
    verifyUserAuthorizations(["ADMIN"]),
    validateParams(albumParamsSchema),
    validateBody(albumUpdateSchema),
    albumController.update.bind(albumController)
);

// DELETE /albums/:id - Deletar álbum
albumRoutes.delete("/:id",
    verifyUserAuthorizations(["ADMIN"]),
    validateParams(albumParamsSchema),
    albumController.delete.bind(albumController)
);

export { albumRoutes };
