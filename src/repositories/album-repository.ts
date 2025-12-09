import { prisma } from "@/database/prisma";
import { AlbumCreateSchema, AlbumUpdateSchema } from "@/schemas/albumSchema";

export class AlbumRepository {
    
    async create(data: AlbumCreateSchema) {
        return await prisma.album.create({
            data,
            include: {
                artist: true
            }
        });
    }

    async findAll() {
        return await prisma.album.findMany({
            include: {
                artist: true
            },
            orderBy: [
                { artist: { name: 'asc' } },
                { title: 'asc' }
            ]
        });
    }

    async findById(id: string) {
        return await prisma.album.findUnique({
            where: { id },
            include: {
                artist: true
            }
        });
    }

    async findByArtistId(artistId: string) {
        return await prisma.album.findMany({
            where: { artistId },
            include: {
                artist: true
            },
            orderBy: {
                year: 'desc'
            }
        });
    }

    async update(id: string, data: AlbumUpdateSchema) {
        return await prisma.album.update({
            where: { id },
            data,
            include: {
                artist: true
            }
        });
    }

    async delete(id: string) {
        return await prisma.album.delete({
            where: { id }
        });
    }

    async findByTitleAndArtist(title: string, artistId: string) {
        return await prisma.album.findFirst({
            where: {
                title: {
                    contains: title
                },
                artistId
            }
        });
    }
}
