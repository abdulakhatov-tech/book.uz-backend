import { Router } from "express";
import {
  authRouting,
  newsRouting,
  booksRouting,
  usersRouting,
  genresRouting,
  ordersRouting,
  uploadRouting,
  authorsRouting,
  userApiRouting,
  bannersRouting,
  reviewsRouting,
  categoriesRouting,
  statisticsRouting
} from "./api";

const router = Router();

router.use("/auth", authRouting);
router.use("/news", newsRouting);
router.use("/users", usersRouting);
router.use("/books", booksRouting);
router.use("/genres", genresRouting);
router.use('/orders', ordersRouting);
router.use("/upload", uploadRouting);
router.use("/authors", authorsRouting);
router.use("/reviews", reviewsRouting);
router.use("/banners", bannersRouting);
router.use("/user-api", userApiRouting);
router.use("/category", categoriesRouting);
router.use('/statistics', statisticsRouting);

export default router;
