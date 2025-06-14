import { UpdateProductDTO, CreateProductDTO, Product } from './product.types';

export let products: Product[] = [];

export const getProducts = (): Product[] => {
    return products;
};

export const createProduct = (product: CreateProductDTO): Product => {
    const newProduct = {
        id: products.length + 1,
        ...product
    }
    products.push(newProduct);
    return newProduct;
};

export const getProduct = (id: number): Product => {
    const product = products.find(p => p.id === id);
    if (!product) {
        throw new Error(`Product with id ${id} not found`);
    }
    return product;
};

export const updateProduct = (id: number, productData: UpdateProductDTO): Product => {
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
        throw new Error(`Product with id ${id} not found`);
    }

    const updatedProduct = {
        ...products[productIndex],
        ...productData
    };

    products[productIndex] = updatedProduct;
    return updatedProduct;
};

export const removeProduct = (id: number): boolean => {
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
        throw new Error(`Product with id ${id} not found`);
    }
    products.splice(productIndex, 1);
    return true;
};

/*
Apenas essa camada tem acesso ao dado original,
ou seja, todo o código relacionado ao prisma (banco de dados)
*/