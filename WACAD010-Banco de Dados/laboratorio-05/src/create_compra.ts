import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

async function main() {
  const itens = [
    {
      idProduto: 1,
      precoUnitario: 2500.00,
      quantidade: 2
    }
  ];

  const total = itens.reduce((acc, item) => acc + (item.precoUnitario * item.quantidade), 0);

  await prisma.compra.create({
    data: {
      cpfCliente: '00449467244',
      idEndereco: 2,
      dataHora: new Date(),
      formaPagamento: 'Pix',
      total: total,
      desconto: 0.00,
      itens: {
        create: itens,
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
npx tsx create_compra.ts
*/