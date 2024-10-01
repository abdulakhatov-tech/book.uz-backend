"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_1 = require("../../../controller/categories");
const router = (0, express_1.Router)();
router.get('/new-age-library', categories_1.getNewAgeLibraryBooks);
router.get('/recently-published', categories_1.getRecentlyPublishedBooks);
router.get('/newly-arrived', categories_1.getNewlyArrivedBooks);
exports.default = router;
