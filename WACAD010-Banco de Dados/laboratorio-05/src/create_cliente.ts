import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

async function main() {
  await prisma.cliente.create({
    data: {
      cpfCliente: '00449467244',
      nome: 'Claudio',
      celular: '92991234567',
      email: 'claudio@prisma.io',
      dataNascimento: new Date('1991-08-08'),
      endereco: {
        create: [
          {
            cep: '12345-678',
            bairro: 'Centro',
            cidade: 'Manaus',
            numero: '100',
            logradouro: 'Rua XPTO',
            complemento: 'Apto 10',
          }
        ]
      }
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
npx tsx create_cliente.ts
*/