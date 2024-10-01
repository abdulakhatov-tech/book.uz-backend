import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Router } from "express";
import { verifyToken } from "../../../middlewares/verifyToken";
import { verifyRoles } from "../../../middlewares/verifyRole";
import { uploadImage } from "../../../controller/upload";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../../images"));
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
});

router.post(
  "/",
  verifyToken,
  verifyRoles("admin", "owner"),
  upload.single("image"),
  uploadImage
);

export default router;
