import { Request, Response } from "express";
import { ArtistService } from "@/services/artist-service";

export class ArtistController {
    private artistService: ArtistService;

    constructor() {
        this.artistService = new ArtistService();
    }

    async create(req: Request, res: Response) {
        const data = req.body;
        const result = await this.artistService.create(data);
        return res.status(201).json(result);
    }

    async getAll(req: Request, res: Response) {
        const result = await this.artistService.getAll();
        return res.status(200).json(result);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const result = await this.artistService.getById(id);
        return res.status(200).json(result);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;
        const result = await this.artistService.update(id, data);
        return res.status(200).json(result);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const result = await this.artistService.delete(id);
        return res.status(200).json(result);
    }
}
