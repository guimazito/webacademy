import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { CreatePurchaseDTO } from "./purchase.types";
import { createPurchase } from "./purchase.service";
import { purchaseError } from "./purchase.errors";

const index = async (req: Request, res: Response) => {};

const create = async (req: Request, res: Response) => {
    const data = req.body as CreatePurchaseDTO;
    try {
        const purchase = await createPurchase(data);
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
    create,
    read,
    update,
    remove
};