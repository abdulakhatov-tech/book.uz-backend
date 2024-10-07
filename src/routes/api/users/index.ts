import { Router } from "express";

import {
  getAll,
  getById,
  deleteById,
  updateById,
  demoteAdminToUser,
  promoteUserToAdmin,
} from "../../../controller/users";
import { verifyRoles } from "../../../middlewares/verifyRole";
import { verifyToken } from "../../../middlewares/verifyToken";

const router = Router();

// user
router.get("/", verifyToken, getAll);
router.get("/:userId", verifyToken, getById);
router.put("/:userId", verifyToken, updateById);
router.delete(
  "/:userId",
  verifyToken,
  verifyRoles("admin", "owner"),
  deleteById
);

// user | admin promotion
router.put(
  "/promote/:userId",
  verifyToken,
  verifyRoles("admin", "owner"),
  promoteUserToAdmin
);
router.put(
  "/demote/:userId",
  verifyToken,
  verifyRoles("owner"),
  demoteAdminToUser
);

export default router;
