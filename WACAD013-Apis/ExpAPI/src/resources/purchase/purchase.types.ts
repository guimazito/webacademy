import { Purchase } from "@prisma/client";

export type CreatePurchaseDTO = Pick<Purchase, "userId" | "productId" | "quantity" | "totalPrice">;

export type AddProductDTO = Pick<Purchase, "productId" | "quantity">;