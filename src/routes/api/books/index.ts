import { Router } from "express";

import { verifyToken } from "../../../middlewares/verifyToken";
import { verifyRoles } from "../../../middlewares/verifyRole";

import {
  create,
  getAll,
  updateById,
  deleteById,
  getById,
} from "../../../controller/books";

const router = Router();

router.get("/", getAll);
router.get("/:bookId", getById)
router.post("/", verifyToken, verifyRoles("admin", "owner"), create);
router.put("/:bookId", verifyToken, verifyRoles("admin", "owner"), updateById);
router.delete(
  "/:bookId",
  verifyToken,
  verifyRoles("admin", "owner"),
  deleteById
);

export default router;
