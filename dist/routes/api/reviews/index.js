"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviews_1 = require("../../../controller/reviews");
const router = express_1.default.Router();
// Create a new review for a book
router.post("/:bookId", reviews_1.create);
// Get reviews for a specific book
router.get("/:bookId", reviews_1.getByBookId);
// Update a review
router.put("/:reviewId", reviews_1.updateById);
// Delete a review
router.delete("/:reviewId", reviews_1.deleteById);
exports.default = router;
