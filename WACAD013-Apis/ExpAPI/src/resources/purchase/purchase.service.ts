import { PrismaClient, Purchase } from "@prisma/client";
import { CreatePurchaseDTO } from "./purchase.types";

const prisma = new PrismaClient();

export const createPurchase = async (purchase: CreatePurchaseDTO): Promise<Purchase> => {
    return await prisma.purchase.create({ data: purchase });
}