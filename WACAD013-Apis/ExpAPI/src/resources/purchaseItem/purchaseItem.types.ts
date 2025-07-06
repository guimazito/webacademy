import { PurchaseItem } from "@prisma/client";

export type CreatePurchaseItemDTO = Pick<PurchaseItem, "purchaseId" | "productId" | "quantity">;