export type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
};

/* DTO: Data Transfer Object */
export type CreateProductDTO = Pick<Product, "name" | "price" | "stock">;
// export type CreateProductDTO = Omit<Product, "id">;

export type UpdateProductDTO = Pick<Product, "name" | "price" | "stock">;