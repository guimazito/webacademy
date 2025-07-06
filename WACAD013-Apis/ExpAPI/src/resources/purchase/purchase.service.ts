import { PrismaClient, Purchase } from "@prisma/client";
import { CreatePurchaseDTO } from "./purchase.types";
import { getPurchaseItemsByPurchaseId } from "../purchaseItem/purchaseItem.service";

const prisma = new PrismaClient();

export const createPurchase = async (purchase: CreatePurchaseDTO): Promise<Purchase> => {
    const purchaseItems = await getPurchaseItemsByPurchaseId(purchase.id);
    const productIds = purchaseItems.map(item => item.productId);
    const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, price: true }
    });
    const productPriceMap = new Map(products.map(product => [product.id, product.price]));
    const totalPrice = purchaseItems.reduce((total, item) => {
        const price = productPriceMap.get(item.productId) || 0;
        return total + (Number(item.quantity) * Number(price));
    }, 0);

    return await prisma.purchase.create({ 
        data: {
            ...purchase,
            totalPrice: totalPrice
        }
    });
}