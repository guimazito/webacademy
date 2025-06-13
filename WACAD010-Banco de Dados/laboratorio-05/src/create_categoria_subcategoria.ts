import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

async function main() {
  await prisma.categoria.create({
    data: {
      nome: 'Eletrônicos',
      subcategorias: {
        create: [
          { nome: 'Celulares' },
          { nome: 'Computadores' },
          { nome: 'Televisores' },
        ],
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

/*
npx tsx create_categoria_subcategoria.ts
*/