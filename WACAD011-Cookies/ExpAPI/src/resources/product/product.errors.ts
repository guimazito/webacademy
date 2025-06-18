import { Response } from "express";
import { Prisma } from "@prisma/client";

export const createProductError = (req: Request, res: Response, err: unknown) => {
    if (err instanceof Prisma.PrismaClientValidationError) {
        res.status(400).json({
            error: "Validation Error",
            message: "The data provided is invalid. ",
        });
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({
            error: "Database Error",
            message: err.message,
        });
    } else {
        res.status(500).json({
            error: "Internal Server Error",
            message: "Something went wrong. Please try again later.",
        });
    }
};