import { Router } from "express";
import purchaseItemController from "./purchaseItem.controller";
import { isAuth } from "../../middlewares/isAuth";

const router = Router();

router.get("/", isAuth, purchaseItemController.index);
router.post("/", isAuth, purchaseItemController.create);
router.get("/:id", purchaseItemController.read);
router.put("/:id", purchaseItemController.update);
router.delete("/:id", purchaseItemController.remove);

export default router;