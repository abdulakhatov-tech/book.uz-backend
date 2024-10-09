import { Router } from "express";
import { createOrder, getUserOrders, updateOrderStatus } from "../../../controller/orders";
import { verifyToken } from "../../../middlewares/verifyToken";
import { verifyRoles } from "../../../middlewares/verifyRole";

const router = Router();

router.post('/', verifyToken, createOrder);
router.get('/:userId', verifyToken, getUserOrders);
router.put('/:orderId', verifyToken, verifyRoles('owner', 'admin'), updateOrderStatus)

export default router;