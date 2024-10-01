import { Router } from 'express';
import {
    getAll,
    create,
    getById,
    deleteById,
    updateById,
  } from "../../../controller/genres";
import { verifyToken } from '../../../middlewares/verifyToken';
import { verifyRoles } from '../../../middlewares/verifyRole';

const router = Router();

router.get('/', getAll);
router.get("/:genreId", getById);
router.post("/", verifyToken, verifyRoles('admin', 'owner'), create);
router.put("/:genreId", verifyToken, verifyRoles('admin', 'owner'),  updateById);
router.delete("/:genreId", verifyToken, verifyRoles('admin', 'owner'), deleteById);

export default router;