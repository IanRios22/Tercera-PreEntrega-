import { Router } from "express";
import cartController from "../controllers/cart.controller.js";
import ticketController from '../controllers/ticket.controller.js';

const router = Router();

router.get('/', ticketController.getAll);
router.get('/:cid/purchase', cartController.createTicket);

export default router;