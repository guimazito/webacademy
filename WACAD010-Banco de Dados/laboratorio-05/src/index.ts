import cors from "cors";
import dotenv from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Loja XPTO",
      version: "1.0.0",
      description: "Documentação da API Loja XPTO",
    },
  },
  apis: ["./src/index.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());

/**
 * @openapi
 * /api/cliente:
 *   get:
 *     summary: Lista todos os Clientes
 *     responses:
 *       200:
 *         description: Lista de Clientes
 */
app.get("/api/cliente", async (req: Request, res: Response) => {
    try {
        const allClients = await prisma.cliente.findMany();
        res.status(200).json(allClients);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar clientes", details: error });
    }
});

/**
 * @openapi
 * /api/cliente:
 *   post:
 *     summary: Cria um novo Cliente
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
app.post("/api/cliente", async (req: Request, res: Response) => {
    try {
        const { endereco, ...clienteData } = req.body;
        const cliente = await prisma.cliente.create({
            data: {
                ...clienteData,
                dataNascimento: new Date(clienteData.dataNascimento),
                endereco: endereco ? { create: endereco } : undefined
            }
        });
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
 *               cep:
 *                 type: string
 *               bairro:
 *                 type: string
 *               cidade:
 *                 type: string
 *               numero:
 *                 type: string
 *               logradouro:
 *                 type: string
 *               complemento:
 *                 type: string
 *     responses:
 *       201:
 *         description: Endereco criado com sucesso
 */
app.post("/api/endereco", async (req: Request, res: Response) => {
    try {
        const endereco = await prisma.endereco.create({ data: req.body });
        res.status(201).json(endereco);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar endereco", details: error });
    }
});

/**
 * @openapi
 * /api/categoria:
 *   post:
 *     summary: Cria um nova Categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               subcategorias:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nome:
 *                       type: string
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 */
app.post("/api/categoria", async (req: Request, res: Response) => {
    try {
        const { subcategorias, ...categoriaData } = req.body;
        const categoria = await prisma.categoria.create({
            data: {
                ...categoriaData,
                subcategorias: subcategorias ? { create: subcategorias } : undefined
            }
        });
        res.status(201).json(categoria);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar categoria", details: error });
    }
});

/**
 * @openapi
 * /api/subcategoria:
 *   post:
 *     summary: Cria um nova Subcategoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idCategoria:
 *                 type: integer
 *               nome:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subcategoria criada com sucesso
 */
app.post("/api/subcategoria", async (req: Request, res: Response) => {
    try {
        const subcategoria = await prisma.subcategoria.create({ data: req.body });
        res.status(201).json(subcategoria);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar subcategoria", details: error });
    }
});

/**
 * @openapi
 * /api/produto:
 *   post:
 *     summary: Cria um novo Produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idSubcategoria:
 *                 type: integer
 *               modelo:
 *                 type: string
 *               fabricante:
 *                 type: string
 *               precoBase:
 *                 type: number
 *               quantidadeDisponivel:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */
app.post("/api/produto", async (req: Request, res: Response) => {
    try {
        const produto = await prisma.produto.create({ data: req.body });
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar produto", details: error });
    }
});

/**
 * @openapi
 * /api/compra:
 *   post:
 *     summary: Cria uma nova Compra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpfCliente:
 *                 type: string
 *               idEndereco:
 *                 type: integer
 *               formaPagamento:
 *                 type: string
 *               desconto:
 *                 type: number
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idProduto:
 *                       type: integer
 *                     precoUnitario:
 *                       type: number
 *                     quantidade:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Compra criada com sucesso
 */
app.post("/api/compra", async (req: Request, res: Response) => {
    try {
        const { itens, ...compraData } = req.body;
        const total = Array.isArray(itens) ? itens.reduce((acc, item) => acc + (item.precoUnitario * item.quantidade), 0) : 0;
        const compra = await prisma.compra.create({
            data: {
                ...compraData,
                dataHora: new Date(),
                total,
                itens: itens ? { create: itens } : undefined
            }
        });
        res.status(201).json(compra);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar compra", details: error });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});