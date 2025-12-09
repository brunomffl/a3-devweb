import { AlbumRepository } from "@/repositories/album-repository";
import { ArtistRepository } from "@/repositories/artist-repository";
import { AlbumCreateSchema, AlbumUpdateSchema } from "@/schemas/albumSchema";
import { AppError } from "@/utils/AppError";

export class AlbumService {
    private albumRepository: AlbumRepository;
    private artistRepository: ArtistRepository;

    constructor() {
        this.albumRepository = new AlbumRepository();
        this.artistRepository = new ArtistRepository();
    }

    async create(data: AlbumCreateSchema) {
        // Verifica se o artista existe
        const artist = await this.artistRepository.findById(data.artistId);
        
        if (!artist) {
            throw new AppError("Artista não encontrado", 404);
        }

        // Verifica se já existe um álbum com o mesmo título do mesmo artista
        const existingAlbum = await this.albumRepository.findByTitleAndArtist(data.title, data.artistId);
        
        if (existingAlbum) {
            throw new AppError("Já existe um álbum com esse título para este artista", 409);
        }

        const album = await this.albumRepository.create(data);
        return {
            message: "Álbum criado com sucesso",
            album
        };
    }

    async getAll() {
        const albums = await this.albumRepository.findAll();
        return {
            message: "Álbuns listados com sucesso",
            albums,
            count: albums.length
        };
    }

    async getById(id: string) {
        const album = await this.albumRepository.findById(id);
        
        if (!album) {
            throw new AppError("Álbum não encontrado", 404);
        }

        return {
            message: "Álbum encontrado",
            album
        };
    }

    async getByArtistId(artistId: string) {
        // Verifica se o artista existe
        const artist = await this.artistRepository.findById(artistId);
        
        if (!artist) {
            throw new AppError("Artista não encontrado", 404);
        }

        const albums = await this.albumRepository.findByArtistId(artistId);
        return {
            message: "Álbuns do artista listados com sucesso",
            albums,
            count: albums.length,
            artist: {
                id: artist.id,
                name: artist.name
            }
        };
    }

    async update(id: string, data: AlbumUpdateSchema) {
        // Verifica se o álbum existe
        const existingAlbum = await this.albumRepository.findById(id);
        
        if (!existingAlbum) {
            throw new AppError("Álbum não encontrado", 404);
        }

        // Se está tentando alterar o artista, verifica se o novo artista existe
        if (data.artistId && data.artistId !== existingAlbum.artistId) {
            const artist = await this.artistRepository.findById(data.artistId);
            if (!artist) {
                throw new AppError("Artista não encontrado", 404);
            }
        }

        // Se está tentando alterar o título, verifica se não existe outro álbum com o mesmo título do mesmo artista
        if (data.title && data.title !== existingAlbum.title) {
            const artistIdToCheck = data.artistId || existingAlbum.artistId;
            const albumWithSameTitle = await this.albumRepository.findByTitleAndArtist(data.title, artistIdToCheck);
            if (albumWithSameTitle && albumWithSameTitle.id !== id) {
                throw new AppError("Já existe um álbum com esse título para este artista", 409);
            }
        }

        const updatedAlbum = await this.albumRepository.update(id, data);
        return {
            message: "Álbum atualizado com sucesso",
            album: updatedAlbum
        };
    }

    async delete(id: string) {
        // Verifica se o álbum existe
        const existingAlbum = await this.albumRepository.findById(id);
        
        if (!existingAlbum) {
            throw new AppError("Álbum não encontrado", 404);
        }

        await this.albumRepository.delete(id);
        return {
            message: "Álbum deletado com sucesso"
        };
    }
}
