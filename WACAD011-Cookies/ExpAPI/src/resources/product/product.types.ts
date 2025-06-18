import { Product } from "@prisma/client";

export type CreateProductDto = Pick<Product, "name" | "price" | "stockQuantity">;