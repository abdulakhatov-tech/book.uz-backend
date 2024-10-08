import { Router } from "express";

import { verifyRoles } from "../../../middlewares/verifyRole";
import { verifyToken } from "../../../middlewares/verifyToken";
import { getAll, create, updateById, deleteById } from "../../../controller/banners";

const router = Router();

router.get('/', getAll);
router.post('/', verifyToken, verifyRoles('admin', 'owner'), create);
router.put('/:bannerId', verifyToken, verifyRoles('admin', 'owner'), updateById);
router.delete('/:bannerId', verifyToken, verifyRoles('admin', 'owner'), deleteById);

export default router;