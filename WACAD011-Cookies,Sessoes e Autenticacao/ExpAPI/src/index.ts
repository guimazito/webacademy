import dotenv from "dotenv";
import express from "express";
import router from "./router/index";

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/*
start api: npx tsx src/index.ts
*/