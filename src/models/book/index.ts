import { Schema, model } from "mongoose";
import GenreModel from "../genre";
import { IBook } from "../../types";
import { NextFunction } from "express";
import AuthorModel from "../author";

const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: "genre",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "author",
    },
    amount: {
      type: Number,
      required: true,
    },
    bookPrice: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    hasDiscount: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    numberOfPage: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    barcode: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    additionalImages: {
      type: [String],
      default: [],
    },
    rateCount: {
      type: Number,
      default: 0,
    },
    ratedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    soldBookCount: {
      type: Number,
      default: 0,
    },
    link: {
      type: String,
    }
  },
  { timestamps: true }
);

// middleware to set hasDiscount and generate the link
bookSchema.pre<IBook>("save", function (next) {
  this.hasDiscount = this.discount && this.discount > 0 ? true : false;

  if (this.name.length > 0) {
    this.link = this.name.split(" ").join("-").toLowerCase();
  }

  next();
});

// middleware to increment the genre's bookCount
bookSchema.post<IBook>("save", async function (doc: any, next: NextFunction) {
  try {
    await GenreModel.findByIdAndUpdate(doc.genre, { $inc: { bookCount: 1 } });
    await AuthorModel.findByIdAndUpdate(doc.author, { $inc: { bookCount: 1 } });
    next();
  } catch (error: any) {
    next(error);
  }
});

// middleware to decrement the genre's bookCount
bookSchema.post<IBook>("findOneAndDelete", async function (doc: any, next: NextFunction) {
  try {
    await GenreModel.findByIdAndUpdate(doc.genre, { $inc: { bookCount: -1 } });
    await AuthorModel.findByIdAndUpdate(doc.author, { $inc: { bookCount: -1 } });
    next();
  } catch (error) {
    next(error);
  }
});


const BookModel = model("book", bookSchema);

export default BookModel;
