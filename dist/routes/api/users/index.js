"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../../../controller/users");
const verifyRole_1 = require("../../../middlewares/verifyRole");
const verifyToken_1 = require("../../../middlewares/verifyToken");
const router = (0, express_1.Router)();
// user
router.get("/", verifyToken_1.verifyToken, users_1.getAll);
router.get("/:userId", verifyToken_1.verifyToken, users_1.getById);
router.put("/:userId", verifyToken_1.verifyToken, users_1.updateById);
router.delete("/:userId", verifyToken_1.verifyToken, (0, verifyRole_1.verifyRoles)("admin", "owner"), users_1.deleteById);
// user | admin promotion
router.put("/promote/:userId", verifyToken_1.verifyToken, (0, verifyRole_1.verifyRoles)("admin", "owner"), users_1.promoteUserToAdmin);
router.put("/demote/:userId", verifyToken_1.verifyToken, (0, verifyRole_1.verifyRoles)("owner"), users_1.demoteAdminToUser);
exports.default = router;
