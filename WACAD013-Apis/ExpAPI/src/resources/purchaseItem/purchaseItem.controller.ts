import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { CreatePurchaseItemDTO } from "./purchaseItem.types";
import { createPurchaseItem, getPurchaseItemsByPurchaseId } from "./purchaseItem.service";
import { purchaseItemError } from "./purchaseItem.errors";

const index = async (req: Request, res: Response) => {};

const create = async (req: Request, res: Response) => {
    const data = req.body as CreatePurchaseItemDTO;
    try {
        const purchase = await createPurchaseItem(data);
        res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
    } catch (error) {
        purchaseItemError(res, error);
    }
};

const read = async (req: Request, res: Response) => {
    const purchaseId = req.params.id;
    try {
        const purchaseItems = await getPurchaseItemsByPurchaseId(purchaseId);
        res.status(StatusCodes.OK).json(purchaseItems);
    } catch (error) {
        purchaseItemError(res, error);
    }
};

const update = async (req: Request, res: Response) => {};
const remove = async (req: Request, res: Response) => {};

export default {
    index,
    create,
    read,
    update,
    remove
};