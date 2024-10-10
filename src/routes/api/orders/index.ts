import { Router } from "express";
import { createOrder, getUserOrders, updateOrderStatus, getAllOrders } from "../../../controller/orders";
import { verifyToken } from "../../../middlewares/verifyToken";
import { verifyRoles } from "../../../middlewares/verifyRole";

const router = Router();

router.get('/', verifyToken, verifyRoles('owner', 'admin'), getAllOrders)
router.post('/', verifyToken, createOrder);
router.get('/:userId', verifyToken, getUserOrders);
router.put('/:orderId/status', verifyToken, verifyRoles('owner', 'admin'), updateOrderStatus)

export default router;