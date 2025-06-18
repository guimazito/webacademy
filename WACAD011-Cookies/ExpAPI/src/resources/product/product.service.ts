import { PrismaClient, Product } from "@prisma/client";
import { CreateProductDto } from "../product/product.types";

const prisma = new PrismaClient();

export const createProduct = async (product: CreateProductDto): Promise<Product> => {
    return await prisma.product.create({data: product})
};

export const getProducts = async (): Promise<Product[]> => {
    return await prisma.product.findMany();
};