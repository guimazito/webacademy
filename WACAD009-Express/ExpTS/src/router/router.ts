
import { Router } from "express";
import mainController from "../controllers/main";
import productController from '../controllers/product';

const router = Router();

router.get("/", mainController.index);

router.get("/hb1", mainController.hb1);    

router.get("/hb2", mainController.hb2);

router.get('/hb3', mainController.hb3);    

router.get('/hb4', mainController.hb4);    

router.get("/about", mainController.about);

router.get("/lorem/:paragraphs", mainController.loremIpsum);

// Controladores Product
router.get('/products', productController.index);
router.all('/products/create', productController.create);
router.all('/products/update/:id', productController.update);
router.get('/products/:id', productController.read);
router.post('/products/:id', productController.remove);

// router is a middleware that is used to handle requests
export default router;