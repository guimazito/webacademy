import { Router } from "express";
import productController from "./product.controller";
import { validate } from "../../middlewares/validate";
import { productSchema, productIdSchema } from "./product.schema";

const router = Router();

router.get("/", productController.index);
router.post("/", validate(productSchema), productController.create);
router.get("/:id", validate(productIdSchema), productController.read);
router.put("/:id", validate(productSchema), productController.update);
router.delete("/:id", validate(productIdSchema), productController.remove);

export default router;