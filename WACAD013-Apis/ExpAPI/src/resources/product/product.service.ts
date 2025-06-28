import { PrismaClient, Product } from "@prisma/client";
import { CreateProductDto } from "../product/product.types";

const prisma = new PrismaClient();

export const createProduct = async (product: CreateProductDto): Promise<Product> => {
    return await prisma.product.create({data: product})
};

export const getProducts = async (): Promise<Product[]> => {
    return await prisma.product.findMany();
};

export const getProduct = async (id: string): Promise<Product> => {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
        throw new Error(`Product with id ${id} not found`);
    }
    return product;
};

export const updateProduct = async (id: string, product: CreateProductDto): Promise<Product> => {
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
        throw new Error(`Product with id ${id} not found`);
    }
    return await prisma.product.update({
        where: { id },
        data: product
    });
};

export const removeProduct = async (id: string): Promise<void> => {
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
        throw new Error(`Product with id ${id} not found`);
    }
    await prisma.product.delete({ where: { id } });
};