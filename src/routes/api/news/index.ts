import { Router } from "express";
import {
  create,
  deleteById,
  getAll,
  getById,
  updateById,
} from "../../../controller/news";
import { verifyToken } from "../../../middlewares/verifyToken";
import { verifyRoles } from "../../../middlewares/verifyRole";

const router = Router();

router.get("/", getAll);
router.get("/:newsId", getById);
router.post("/", verifyToken, verifyRoles("admin", "owner"), create);
router.put("/:newsId", verifyToken, verifyRoles("admin", "owner"), updateById);
router.delete(
  "/:newsId",
  verifyToken,
  verifyRoles("admin", "owner"),
  deleteById
);

export default router;
