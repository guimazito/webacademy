import { Schema } from "joi";
import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

export const validate = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.validate(req.body);
        if (result.error) {
            return res.status(StatusCodes.BAD_REQUEST).send(result.error.details[0].message);
        }
        next();
    };
};