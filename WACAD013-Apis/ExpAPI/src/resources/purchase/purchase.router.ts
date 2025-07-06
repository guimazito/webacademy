import { Router } from "express";
import purchaseController from "./purchase.controller";
import { isAuth } from "../../middlewares/isAuth";

const router = Router();

router.get("/", isAuth, purchaseController.index);
router.post("/", isAuth, purchaseController.create);
router.get("/:id", purchaseController.read);
router.put("/:id", purchaseController.update);
router.delete("/:id", purchaseController.remove);

export default router;