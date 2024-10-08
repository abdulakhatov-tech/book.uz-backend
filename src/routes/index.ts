import { Router } from "express";
import {
  authRouting,
  newsRouting,
  booksRouting,
  usersRouting,
  genresRouting,
  uploadRouting,
  authorsRouting,
  userApiRouting,
  bannersRouting,
  reviewsRouting,
  categoriesRouting,
} from "./api";

const router = Router();

router.use("/auth", authRouting);
router.use("/news", newsRouting);
router.use("/users", usersRouting);
router.use("/books", booksRouting);
router.use("/genres", genresRouting);
router.use("/upload", uploadRouting);
router.use("/authors", authorsRouting);
router.use("/reviews", reviewsRouting);
router.use("/banners", bannersRouting);
router.use("/user-api", userApiRouting);
router.use("/category", categoriesRouting);

export default router;
