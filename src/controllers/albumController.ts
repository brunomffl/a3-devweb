import { Request, Response } from "express";
import { AlbumService } from "@/services/album-service";

export class AlbumController {
    private albumService: AlbumService;

    constructor() {
        this.albumService = new AlbumService();
    }

    async create(req: Request, res: Response) {
        const data = req.body;
        const result = await this.albumService.create(data);
        return res.status(201).json(result);
    }

    async getAll(req: Request, res: Response) {
        const result = await this.albumService.getAll();
        return res.status(200).json(result);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const result = await this.albumService.getById(id);
        return res.status(200).json(result);
    }

    async getByArtistId(req: Request, res: Response) {
        const { artistId } = req.params;
        const result = await this.albumService.getByArtistId(artistId);
        return res.status(200).json(result);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;
        const result = await this.albumService.update(id, data);
        return res.status(200).json(result);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const result = await this.albumService.delete(id);
        return res.status(200).json(result);
    }
}
