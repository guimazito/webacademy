import { Router } from "express"
import languageController from "./language.controller"
import { validate } from "../../middlewares/validate";
import { languageSchema } from "./language.schema";

const router = Router();

router.get("/change", validate(languageSchema), languageController.changeLanguage);

export default router;