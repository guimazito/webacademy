import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

async function main() {
  await prisma.produto.create({
    data: {
      idSubcategoria: 3,
      modelo: 'Smart TV UHD 4K',
      fabricante: 'Samsung',
      precoBase: 2500.00,
      quantidadeDisponivel: 50
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
npx tsx create_produto.ts
*/