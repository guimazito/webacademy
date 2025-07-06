import { Router } from "express";
import productController from "./product.controller";
import { validate } from "../../middlewares/validate";
import { productSchema, productIdSchema } from "./product.schema";
import { isAdmin } from "../../middlewares/isAdmin";
import { isAuth } from "../../middlewares/isAuth";

const router = Router();

router.get("/", isAuth, productController.index);
router.post("/", isAdmin, validate(productSchema), productController.create);
router.get("/:id", isAuth, validate(productIdSchema), productController.read);
router.put("/:id", isAuth, validate(productSchema), productController.update);
router.delete("/:id", isAuth, validate(productIdSchema), productController.remove);

export default router;