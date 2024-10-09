"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_1 = require("./api");
const router = (0, express_1.Router)();
router.use("/auth", api_1.authRouting);
router.use("/news", api_1.newsRouting);
router.use("/users", api_1.usersRouting);
router.use("/books", api_1.booksRouting);
router.use("/genres", api_1.genresRouting);
router.use("/upload", api_1.uploadRouting);
router.use("/authors", api_1.authorsRouting);
router.use("/reviews", api_1.reviewsRouting);
router.use("/banners", api_1.bannersRouting);
router.use("/user-api", api_1.userApiRouting);
router.use("/category", api_1.categoriesRouting);
router.use('/statistics', api_1.statisticsRouting);
exports.default = router;
