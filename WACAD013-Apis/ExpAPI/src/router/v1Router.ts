import { Router } from "express";
import productArrayRouter from "../resources/productArray/product.router";
import productRouter from "../resources/product/product.router"; 
import languageRouter from "../resources/language/language.router";

const router = Router();

router.use("/productsArray", productArrayRouter);
router.use("/products", productRouter);
router.use("/language", languageRouter);

export default router;