import { Router } from "express";
import productArrayRouter from "../resources/productArray/product.router";
import productRouter from "../resources/product/product.router"; 

const router = Router();

router.use("/productsArray", productArrayRouter);
router.use("/products", productRouter);

export default router;