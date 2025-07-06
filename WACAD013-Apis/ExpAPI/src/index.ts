import dotenv from "dotenv";
import express from "express";
import router from "./router/index";
import cookieParser from "cookie-parser";
import { validateEnv } from "./utils/validateEnv";
import { setCookieLanguage } from "./middlewares/setCookieLanguage";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./output-swagger.json"; // Need to enable `resolveJsonModule` in tsconfig.json

declare module "express-session" {
  interface SessionData {
    uid: string;
    userTypeId: string;
  }
}

dotenv.config();
validateEnv();
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cookieParser());
app.use(setCookieLanguage);
app.use(
  session({
    genid: () => uuidv4(),
    secret: process.env.SECRET_KEY ?? "minha-chave-segura",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 24 * 60 * 60 * 1000 }, // 10 days
}));

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/*
start api: npx tsx src/index.ts
*/