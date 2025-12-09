import { ArtistRepository } from "@/repositories/artist-repository";
import { ArtistCreateSchema, ArtistUpdateSchema } from "@/schemas/artistSchema";
import { AppError } from "@/utils/AppError";

export class ArtistService {
    private artistRepository: ArtistRepository;

    constructor() {
        this.artistRepository = new ArtistRepository();
    }

    async create(data: ArtistCreateSchema) {
        // Verifica se já existe um artista com o mesmo nome
        const existingArtist = await this.artistRepository.findByName(data.name);
        
        if (existingArtist) {
            throw new AppError("Já existe um artista com esse nome", 409);
        }

        const artist = await this.artistRepository.create(data);
        return {
            message: "Artista criado com sucesso",
            data: artist
        };
    }

    async getAll() {
        const artists = await this.artistRepository.findAll();
        return {
            message: "Artistas listados com sucesso",
            data: artists
        };
    }

    async getById(id: string) {
        const artist = await this.artistRepository.findById(id);
        
        if (!artist) {
            throw new AppError("Artista não encontrado", 404);
        }

        return {
            message: "Artista encontrado",
            data: artist
        };
    }

    async update(id: string, data: ArtistUpdateSchema) {
        // Verifica se o artista existe
        const existingArtist = await this.artistRepository.findById(id);
        
        if (!existingArtist) {
            throw new AppError("Artista não encontrado", 404);
        }

        // Se está tentando alterar o nome, verifica se não existe outro artista com o mesmo nome
        if (data.name && data.name !== existingArtist.name) {
            const artistWithSameName = await this.artistRepository.findByName(data.name);
            if (artistWithSameName) {
                throw new AppError("Já existe um artista com esse nome", 409);
            }
        }

        const updatedArtist = await this.artistRepository.update(id, data);
        return {
            message: "Artista atualizado com sucesso",
            data: updatedArtist
        };
    }

    async delete(id: string) {
        // Verifica se o artista existe
        const existingArtist = await this.artistRepository.findById(id);
        
        if (!existingArtist) {
            throw new AppError("Artista não encontrado", 404);
        }

        await this.artistRepository.delete(id);
        return {
            message: "Artista deletado com sucesso"
        };
    }
}
