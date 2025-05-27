import dotenv from "dotenv"
import router from "./router/router"
import logger from "./middlewares/logger"
import { engine } from "express-handlebars"
// @ts-ignore
import sassMiddleware from "sass-middleware"

import validadeEnv from "./utils/validadeEnv"
import express, { Request, Response } from "express"

dotenv.config()
console.log(process.env)
validadeEnv()
const PORT = process.env.PORT || 3333
const app = express()

app.engine("handlebars", engine())
app.engine("handlebars", engine({
    helpers: require(`${__dirname}/views/helpers/helpers.ts`),
    layoutsDir: `${__dirname}/views/layouts`,
    defaultLayout: "main",
}));
app.set("view engine", "handlebars")
app.set("views", `${__dirname}/views`)

// Middleware to log requests
app.use(logger("simple"))

// Recorse to browser
app.use("/css", express.static(`${process.cwd()}/public/css`))
app.use("/js", express.static(`${process.cwd()}/public/js`))
app.use("/img", express.static(`${process.cwd()}/public/img`))

app.use(router)

// Middleware to parse JSON bodies
app.use((req: Request, res: Response, next) => {
    console.log("Request received")
    next()
});

app.use(sassMiddleware({
 src: `${__dirname}/../public/scss`,
 dest: `${__dirname}/../public/css`,
 outputStyle: "compressed",
 prefix: "/css",
}));
app.use("/css", express.static(`${__dirname}/../public/css`));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});