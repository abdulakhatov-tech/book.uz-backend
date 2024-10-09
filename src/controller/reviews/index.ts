import { Request, Response } from "express";

import { bodyRequirer } from "../../helpers";
import { apiErrorHandler } from "../../errors";
import { BooksService, ReviewsService } from "../../services";

const requiredFields = ["userId", "message"];

const reviewsService = new ReviewsService();

export const create = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const body = req.body;

  if (!bookId) {
    res.status(400).json({
      status: "error",
      message: "Invalid book ID",
    });
  }

  const missingFields = await bodyRequirer({ body, requiredFields });

  if (missingFields) {
    return res.status(400).json({
      status: "error",
      message: missingFields,
    });
  }

  try {
    const data = await reviewsService.create({ bookId, ...body });
    res.status(201).json({
      status: "success",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

export const getByBookId =async (req: Request, res: Response) => {
    const { bookId } = req.params;

    if (!bookId) {
      res.status(400).json({
        status: "error",
        message: "Invalid book ID",
      });
    }

    try {
      const data = await reviewsService.getByBookId(bookId);
      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error) {
      return apiErrorHandler(res, error);
    }
};

export const updateById = async(req: Request, res: Response) => {
    const { reviewId } = req.params;
    const body = req.body;

    if (!reviewId) {
      res.status(400).json({
        status: "error",
        message: "Invalid review ID",
      });
    }

    const missingFields = await bodyRequirer({ body, requiredFields });

    if (missingFields) {
        return res.status(400).json({
          status: "error",
          message: missingFields,
        });
      }

      try {
        const data = await reviewsService.updateById(reviewId, body);
        res.status(200).json({
          status: "success",
          data,
        });
      } catch (error) {
        return apiErrorHandler(res, error);
      }
};

export const deleteById = async(req: Request, res: Response) => {
    const { reviewId } = req.params;
    
    if (!reviewId) {
        res.status(400).json({
          status: "error",
          message: "Invalid review ID",
        });
    }

    try {
        await reviewsService.deleteById(reviewId);
        res.status(204).json({
          status: "success",
        });
      } catch (error) {
        return apiErrorHandler(res, error);
      }
};

