import { Schema, model } from 'mongoose';

const reviewSchema = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'book',
      required: true,
    },
    bookId: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ReviewModel = model('review', reviewSchema);

export default ReviewModel;
