import swaggerAutogen from "swagger-autogen"
import dotenv from "dotenv"

dotenv.config()

const HOST = process.env.HOST || "localhost"
const PORT = process.env.PORT || "3000"

const docSwagger = {
    info: {
        title: "API da loja virtual",
        description: "Documentação da API da loja virtual",
    },
    host: `${HOST}:${PORT}`,
    definitions: {
        CreateProductDto: {
            name: "Modern Soft Sausages",
            price: 2699.0,
            stockQuantity: 9,
        },
        Product: {
            id: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
            name: "Modern Soft Sausages",
            price: 2699.0,
            stockQuantity: 9,
            createdAt: "2023-11-07T19:27:15.645Z",
            updatedAt: "2023-11-07T19:27:15.645Z",
        },
    }
}

const outputSwagger = "./output-swagger.json"
const router = ["./router/index.ts"]

swaggerAutogen(outputSwagger, router, docSwagger)