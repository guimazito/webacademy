import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { CreatePurchaseDTO, AddProductDTO } from "./purchase.types";
import { createPurchase } from "./purchase.service";
import { purchaseError } from "./purchase.errors";

const index = async (req: Request, res: Response) => {};

const add = async (req: Request, res: Response) => {
    const { productId, quantity } = req.body as AddProductDTO;
    try {
        if (!req.session.purchaseCart) {
            req.session.purchaseCart = [];
        }
        req.session.purchaseCart.push({ productId, quantity });
        console.log("Sessão atual:", req.session);
        res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
    } catch (error) {
        return purchaseError(res, error);
    }
};

const create = async (req: Request, res: Response) => {
    const data = req.body as CreatePurchaseDTO;
    try {
        const purchase = await createPurchase(data);
        // req.session.purchaseCart = purchase.id; // Assuming you want to store the purchase ID in the session
        console.log("Sessão atual:", req.session);
        res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
    } catch (error) {
        purchaseError(res, error);
    }
};

const read = async (req: Request, res: Response) => {};
const update = async (req: Request, res: Response) => {};
const remove = async (req: Request, res: Response) => {};

export default {
    index,
    add,
    create,
    read,
    update,
    remove
};