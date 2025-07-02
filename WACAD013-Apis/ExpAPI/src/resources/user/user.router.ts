import { Router } from "express";
import userController from "./user.controller";

const router = Router();

router.get("/", userController.index);
router.post("/", userController.create);
router.get("/:id", userController.read);
router.put("/:id", userController.update); // Quando quero alterar vários campos do usuário (put)
router.patch("/:id", userController.changePassword); // Quando quero alterar somente 1 campo do usuário (patch)
router.delete("/:id", userController.remove);

export default router;