import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

async function main() {
  await prisma.endereco.create({
    data: {
      cpfCliente: '00449467244',
      cep: '69037-155',
      bairro: 'Cidade Nova',
      cidade: 'Manaus',
      numero: '123',
      logradouro: 'Rua das Flores',
      complemento: 'Apto 101'
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
npx tsx create_endereco.ts
*/