import { Router } from "express";
import productArrayRouter from "../resources/productArray/product.router";
import productRouter from "../resources/product/product.router"; 
import languageRouter from "../resources/language/language.router";
import userRouter from "../resources/user/user.router";
import authRouter from "../resources/auth/auth.router";
import purchaseRouter from "../resources/purchase/purchase.router"; 

const router = Router();

router.use(
    "/productsArray",
    // #swagger.tags = ['Products Array']
    productArrayRouter
);
router.use(
    "/products",
    // #swagger.tags = ['Products']
    productRouter
);
router.use(
    "/language",
    // #swagger.tags = ['Language']
    languageRouter
);
router.use(
    "/users",
    // #swagger.tags = ['Users']
    userRouter
);
router.use(
    "/auth",
    // #swagger.tags = ['Auth']
    authRouter
);

router.use(
    "/purchases",
    // #swagger.tags = ['Purchases']
    purchaseRouter
);

export default router;