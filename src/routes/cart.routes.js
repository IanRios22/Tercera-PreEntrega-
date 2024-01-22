import { Router } from "express";
import CartController from "../controllers/cart.controller.js";

const router = Router();

//RUTAS DEL CART

router.get('/', CartController.getAll);
router.get('/:cid', CartController.getCartById);
router.post('/', CartController.createCart);
router.post('/:cid/products/:pid', CartController.addToCart);
router.put('/:cid/products/:pid', CartController.updateQuantity);
router.put('/:cid', CartController.replaceProducts);
router.delete('/:cid/products/:pid', CartController.deleteProductFromCart);
router.delete('/:cid', CartController.emptyCart);

export default router;