import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { createProduct, getProducts } from "./product.service";
import { CreateProductDto } from "../product/product.types";
import { createProductError } from "./product.errors";

const index = async (req: Request, res: Response) => {
    const products = await getProducts();
    try {
        res.status(StatusCodes.OK).json(products);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: ReasonPhrases.INTERNAL_SERVER_ERROR,
            message: "An error occurred while fetching products."
        });
    }
};

const create = async (req: Request, res: Response) => {
    const newProduct = req.body as CreateProductDto;
    try {
        const product = await createProduct(newProduct);
        res.status(StatusCodes.CREATED).json(product);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(StatusCodes.BAD_REQUEST).json({ error: message });
    }
};

const read = async (req: Request, res: Response) => {
    
};

const update = async (req: Request, res: Response) => {
    
};

const remove = async (req: Request, res: Response) => {
    
};

export default {index, create, read, update, remove};