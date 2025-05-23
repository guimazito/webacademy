import fs from "fs/promises";
import dotenv from "dotenv"
import { NextFunction, Request, Response } from "express";

dotenv.config()

type LoggerType = "complete" | "simple";

function logger (type: LoggerType) {
    const LOG_PATH = process.env.LOG_PATH || "logs";
    if (type === "simple") {
        return async (req: Request, res: Response, next: NextFunction) => {
            await fs.writeFile(
                `${process.cwd()}/${LOG_PATH}/logs.log`,
                `${req.method} ${req.url} ${new Date().toISOString()}\n`,
                { flag: "a" }
            );
            console.log("simple");
            next();
        }
        } else {
            // melhorar esse código
            return async (req: Request, res: Response, next: NextFunction) => {
                await fs.writeFile(
                    `${process.cwd()}/${LOG_PATH}/logs.log`,
                    `${req.method} ${req.url} ${new Date().toISOString()} ${req.httpVersion} ${req.headers["user-agent"]}\n`,
                    { flag: "a" }
                );
                console.log("complete");
                next();
            }
        }    
}

export default logger;