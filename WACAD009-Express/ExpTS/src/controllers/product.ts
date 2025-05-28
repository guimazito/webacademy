import { Request, Response } from 'express';
import { get, post, put, remove } from '../utils/dbApi';

const index = async (req: Request, res: Response) => {
    const products = await get("products");
    res.render("products/index", {products});
};

const create = async (req: Request, res: Response) => {
    if (req.method === "GET") {
        res.render("products/create");
    } else if (req.method === 'POST') {
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

const update = async (req: Request, res: Response) => {
    if (req.method === "GET") {
        const product = await get(`products/${req.params.id}`);
        if (product) {
            res.render("products/update", { product });
        } else {
            res.status(404).send("Product not found");
        }
    } else if (req.method === 'POST') {
        await put(`products/${req.params.id}`, req.body);
        res.redirect('/products');
    }
};

const removeProduct = async (req: Request, res: Response) => {
    await remove(`products/${req.params.id}`);
    res.redirect('/products');
};

export default { 
    index,
    read,
    create,
    update,
    remove: removeProduct
};