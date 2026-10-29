import express from "express";
import { placeOrder } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";
import { verifyOrder , userOrders, listOrders, updateOrderStatus} from "../controllers/orderController.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.post('/verify',verifyOrder);
router.post('/userorders',authMiddleware, userOrders);
router.get('/list', listOrders);
router.post('/status',updateOrderStatus);
export default router;