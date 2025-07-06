import { Purchase } from "@prisma/client";

export type CreatePurchaseDTO = Pick<Purchase, "id" | "userId" | "totalPrice">;