import { Request, Response } from "express";
import { productError } from "./product.errors";
import { CreateProductDto } from "../product/product.types";
import { StatusCodes/*, ReasonPhrases*/ } from "http-status-codes";
import { createProduct, getProducts, getProduct, updateProduct, removeProduct } from "./product.service";

const index = async (req: Request, res: Response) => {
    const products = await getProducts();
    try {
        res.status(StatusCodes.OK).json(products);
    } catch (error) {
        const message = productError(res, error);
        res.status(StatusCodes.BAD_REQUEST).json({ error: message });
    }
};

const create = async (req: Request, res: Response) => {
    const newProduct = req.body as CreateProductDto;
    try {
        const product = await createProduct(newProduct);
        res.status(StatusCodes.CREATED).json(product);
    } catch (error) {
        const message = productError(res, error);
        res.status(StatusCodes.BAD_REQUEST).json({ error: message });
    }
};

const read = async (req: Request, res: Response) => {
    const productId = req.params.id;
    try {
        const product = await getProduct(productId);
        res.status(StatusCodes.OK).json(product);
    } catch (error) {
        const message = productError(res, error);
        res.status(StatusCodes.BAD_REQUEST).json({ error: message });
    }
};

const update = async (req: Request, res: Response) => {
    const productId = req.params.id;
    const updatedProduct = req.body as CreateProductDto;
    try {
        const updated = await updateProduct(productId, updatedProduct);
        res.status(StatusCodes.OK).json(updated);
    } catch (error) {
        const message = productError(res, error);
        res.status(StatusCodes.BAD_REQUEST).json({ error: message });
    }    
};

const remove = async (req: Request, res: Response) => {
    const productId = req.params.id;
    try {
        const product = await removeProduct(productId);
        res.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
        const message = productError(res, error);
        res.status(StatusCodes.BAD_REQUEST).json({ error: message });
    }
};

export default {index, create, read, update, remove};