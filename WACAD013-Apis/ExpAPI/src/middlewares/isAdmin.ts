import { Request, Response, NextFunction } from "express";
import { UserTypes } from "../resources/userType/userType.constants";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.userTypeId && req.session.userTypeId === UserTypes.admin) {
        next();
    } else {
        res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
    }
};
