import { PrismaClient, PurchaseItem } from "@prisma/client";
import { CreatePurchaseItemDTO } from "./purchaseItem.types";

const prisma = new PrismaClient();

export const createPurchaseItem = async (purchaseItem: CreatePurchaseItemDTO): Promise<PurchaseItem> => {
    return await prisma.purchaseItem.create({ data: purchaseItem });
}

export const getPurchaseItemsByPurchaseId = async (purchaseId: string): Promise<PurchaseItem[]> => {
    return await prisma.purchaseItem.findMany({
        where: { purchaseId },
        include: { product: true }
    });
}