import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

// Configuração básica do swagger-jsdoc
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Clientes",
      version: "1.0.0",
      description: "Documentação da API de Clientes",
    },
  },
  apis: ["./src/index.ts"], // Caminho dos arquivos com comentários JSDoc
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Adicione esta linha antes das rotas
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());

/**
 * @openapi
 * /api/clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
app.get("/api/clientes", async (req: Request, res: Response) => {
    try {
        const allClients = await prisma.cliente.findMany();
        res.status(200).json(allClients);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar clientes", details: error });
    }
});

/**
 * @openapi
 * /api/clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpfCliente:
 *                 type: string
 *               nome:
 *                 type: string
 *               celular:
 *                 type: string
 *               email:
 *                 type: string
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *               endereco:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     cep:
 *                       type: string
 *                     bairro:
 *                       type: string
 *                     cidade:
 *                       type: string
 *                     numero:
 *                       type: string
 *                     logradouro:
 *                       type: string
 *                     complemento:
 *                       type: string
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 */
app.post("/api/clientes", async (req: Request, res: Response) => {
    try {
        const cliente = await prisma.cliente.create({ data: req.body });
        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar cliente", details: error });
    }
});

/**
 * @openapi
 * /api/endereco:
 *   post:
 *     summary: Cria um novo Endereço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpfCliente:
 *                 type: string
 *               nome:
 *                 type: string
 *               celular:
 *                 type: string
 *               email:
 *                 type: string
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *               endereco:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     cep:
 *                       type: string
 *                     bairro:
 *                       type: string
 *                     cidade:
 *                       type: string
 *                     numero:
 *                       type: string
 *                     logradouro:
 *                       type: string
 *                     complemento:
 *                       type: string
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 */
app.post("/api/endereco", async (req: Request, res: Response) => {
    try {
        const endereco = await prisma.endereco.create({ data: req.body });
        res.status(201).json(endereco);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar endereco", details: error });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});