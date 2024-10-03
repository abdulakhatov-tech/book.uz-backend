import express from "express";
import { create, deleteById, getByBookId, updateById } from "../../../controller/reviews";

const router = express.Router();

// Create a new review for a book
router.post("/:bookId", create);

// Get reviews for a specific book
router.get("/:bookId", getByBookId);

// Update a review
router.put("/:reviewId", updateById);

// Delete a review
router.delete("/:reviewId", deleteById);

export default router;
