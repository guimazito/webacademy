import { Request, Response, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.userTypeId) {
        next();
    } else {
        res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
    }
};
