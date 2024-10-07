import path from "path";
import multer from "multer";
import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

import { uploadImage } from "../../../controller/upload";
import { verifyToken } from "../../../middlewares/verifyToken";

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
  upload.single("image"),
  uploadImage
);

export default router;
