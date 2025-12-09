import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Verificar se já existe artistas
  const count = await prisma.artist.count();
  
  if (count === 0) {
    console.log('Criando artistas de teste...');
    
    const artists = await prisma.artist.createMany({
      data: [
        {
          name: 'The Beatles',
          country: 'Reino Unido',
          genre: 'Rock',
          biography: 'Uma das bandas mais influentes da história da música.',
          imageUrl: '/images/artists/beatles.jpeg',
        },
        {
          name: 'Adele',
          country: 'Reino Unido',
          genre: 'Pop',
          biography: 'Cantora e compositora britânica com vários prêmios Grammy.',
          imageUrl: '/images/artists/adele.jpg',
        },
        {
          name: 'Bruno Mars',
          country: 'Estados Unidos',
          genre: 'Pop/R&B',
          biography: 'Artista americano conhecido por seus sucessos pop e soul.',
          imageUrl: '/images/artists/bruno-mars.jpeg',
        },
        {
          name: 'Taylor Swift',
          country: 'Estados Unidos',
          genre: 'Pop',
          biography: 'Cantora e compositora americana, uma das mais bem sucedidas da atualidade.',
          imageUrl: '/images/artists/taylor-swift.jpeg',
        },
        {
          name: 'David Bowie',
          country: 'Reino Unido',
          genre: 'Rock',
          biography: 'Lenda do rock e da música popular, conhecido por sua inovação.',
          imageUrl: '/images/artists/david-bowie.jpeg',
        },
      ],
    });
    
    console.log(`${artists.count} artistas criados com sucesso!`);
  } else {
    console.log(`${count} artistas já existem na base de dados.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
