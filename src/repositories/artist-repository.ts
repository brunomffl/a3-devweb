import { prisma } from "@/database/prisma";
import { ArtistCreateSchema, ArtistUpdateSchema } from "@/schemas/artistSchema";

export class ArtistRepository {
    
    async create(data: ArtistCreateSchema) {
        return await prisma.artist.create({
            data
        });
    }

    async findAll() {
        return await prisma.artist.findMany({
            include: {
                albums: true
            },
            orderBy: {
                name: 'asc'
            }
        });
    }

    async findById(id: string) {
        return await prisma.artist.findUnique({
            where: { id },
            include: {
                albums: true
            }
        });
    }

    async update(id: string, data: ArtistUpdateSchema) {
        return await prisma.artist.update({
            where: { id },
            data
        });
    }

    async delete(id: string) {
        return await prisma.artist.delete({
            where: { id }
        });
    }

    async findByName(name: string) {
        return await prisma.artist.findFirst({
            where: {
                name: {
                    contains: name
                }
            }
        });
    }
}
