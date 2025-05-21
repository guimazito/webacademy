import dotenv from "dotenv"
import express, { Request, Response } from "express"
import validadeEnv from "./utils/validadeEnv"

dotenv.config()
console.log(process.env)
validadeEnv()
const app = express()

const PORT = process.env.PORT || 4000

app.use((req, res, next) => {
    console.log("Request received")
    next()
});

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.get("/about", (req: Request, res: Response) => {
    res.send("About");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});