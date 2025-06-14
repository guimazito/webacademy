import { Request, Response } from "express";
import { CreateProductDTO } from "./product.types";
import { getProducts, createProduct, getProduct, updateProduct, removeProduct } from "./product.service";

const index = (req: Request, res: Response) => {
    const products = getProducts();
    res.json(products);
};

const create = (req: Request, res: Response) => {
    const product = req.body as CreateProductDTO;
    console.log("Creating product:", product);
    const newProduct = createProduct(product);
    res.status(201).json(newProduct)
};

const read = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    console.log("Reading product with id:", id);
    try {
        const product = getProduct(id);
        res.status(200).json(product);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(404).json({ error: message });
    }
};

const update = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const productData = req.body;
    console.log("Updating product with id:", id, "Data:", productData);
    try {
        const updatedProduct = updateProduct(id, productData);
        res.status(200).json(updatedProduct);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(404).json({ error: message });
    }
};

const remove = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    console.log("Removing product with id:", id);
    try {
        removeProduct(id);
        res.status(204).send();
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(400).json({ error: message });
    }
};

export default {index, create, read, update, remove};