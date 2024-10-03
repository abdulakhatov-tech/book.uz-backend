import { Types } from "mongoose";
import { IReview } from "../../types";
import BookModel from "../../models/book";
import ReviewModel from "../../models/reviews";
import ReviewsModel from "../../models/reviews";

async function updateBookRatingAndRateCount(bookId: string | Types.ObjectId) {
  const objectIdBookId = typeof bookId === 'string' ? new Types.ObjectId(bookId) : bookId;

  // Aggregation to calculate the average rating and review count
  const result = await ReviewModel.aggregate([
    {
      $match: { book: objectIdBookId }
    },
    {
      $group: {
        _id: '$book',
        avgRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 }
      }
    }
  ]);

  if (result.length > 0) {
    const { avgRating, reviewCount } = result[0];

    await BookModel.findByIdAndUpdate(bookId, {
      rating: avgRating,
      rateCount: reviewCount
    });

    return { avgRating, reviewCount };
  } else {
    await BookModel.findByIdAndUpdate(bookId, {
      rating: 0,
      rateCount: 0
    });

    return { avgRating: 0, reviewCount: 0 };
  }
}


class ReviewsService {
  constructor() {}

  async create(body: IReview) {
    const review = await ReviewsModel.create({
      user: body?.userId,
      book: body?.bookId,
      ...body
    });

    if (!review) {
      throw new Error("Failed to create review");
    }

    if(review) {
      await updateBookRatingAndRateCount(review.book)
    }

    return review;
  }

  async getByBookId(bookId: string) {
    const reviews = await ReviewsModel.find({ book: new Types.ObjectId(bookId) })
      .populate("user", "_id imgUrl name surname")
      .exec();

    return reviews;
  }

  async updateById(reviewId: string, body: IReview) {
    const review = await ReviewsModel.findByIdAndUpdate(reviewId, body, {
      new: true,
    }).exec();

    if (!review) {
      throw new Error("Failed to update review");
    }

    if(review) {
      await updateBookRatingAndRateCount(review.book)
    }

    return review;
  }

  async deleteById(reviewId: string) {
    const review = await ReviewsModel.findByIdAndDelete(reviewId).exec();

    if (!review) {
      throw new Error("Failed to delete review");
    }

    if(review) {
      await updateBookRatingAndRateCount(review.book)
    }

    return review;
  }
}

export default ReviewsService;
