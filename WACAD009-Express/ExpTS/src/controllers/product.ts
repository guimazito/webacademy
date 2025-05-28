import { Request, Response } from 'express';
import { get, post } from '../utils/dbApi';

const index = async (req: Request, res: Response) => {
    const products = await get("products");
    res.render("products/index", {products});
};

const create = async (req: Request, res: Response) => {
    if (req.method === "GET") {
        res.render("products/create");
    } else if (req.method === 'POST') {
        console.log(req.body);
        await post("products", req.body);
        res.redirect('/products');
    }
};

const read = async (req: Request, res: Response) => {
    const product = await get(`products/${req.params.id}`);
    if (product) {
        res.render("products/read", { product });
    } else {
        res.status(404).send("Product not found");
    }
};

const update = async (req: Request, res: Response) => {};

const remove = async (req: Request, res: Response) => {
    const productId = req.params.id;
    try {
        await post(`products/${productId}`, { _method: 'DELETE' });
        res.redirect('/products');
    } catch (error) {
        console.error(`Error deleting product with ID ${productId}:`, error);
        res.status(500).send("Error deleting product");
    }
};

export default { 
    index,
    read,
    create,
    update,
    remove
};