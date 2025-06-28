import dotenv from "dotenv";
import express from "express";
import router from "./router/index";
import cookieParser from "cookie-parser";
import { validateEnv } from "./utils/validateEnv";
import { setCookieLanguage } from "./middlewares/setCookieLanguage";
import session from "express-session";
import { v4 as uuidv4 } from "uuid"

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

// app.get("/cookie", (req, res) => {
//   if (!("teste-cookie" in req.cookies)) {
//     res.cookie("teste-cookie", "cookie-value");
//     res.json({
//       message: "Cookie created",
//     });
//   } else {
//     res.json({
//       message: "Cookie already exists", cookie: req.cookies["teste-cookie"],
//     });
//   }
// });

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/*
start api: npx tsx src/index.ts
*/