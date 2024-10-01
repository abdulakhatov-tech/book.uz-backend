import { Schema, model } from "mongoose";
import BookModel from "../book";
import GenreModel from "../genre";

const authorSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: "",
    },
    bookCount: {
      type: Number,
      default: 0,
    },
    biography: {
      type: String,
      required: true,
    },
    dateOfbirth: {
      type: Date,
      default: null
    },
    dateOfdeath: {
      type: Date,
      default: null
    },
    imgUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Post middleware for author
authorSchema.post("findOneAndDelete", async function (doc, next) {
  try {
    if (doc) {
      // Find all books related to the deleted author
      const books = await BookModel.find({ author: doc._id });

      // Collect the unique genre IDs from the related books
      const genreIds = [...new Set(books.map((book) => String(book.genre)))];

      // Delete all books related to the author
      await BookModel.deleteMany({ author: doc._id });

      // Update the bookCount for each genre
      for (const genreId of genreIds) {
        const count = await BookModel.countDocuments({ genre: genreId });
        await GenreModel.findByIdAndUpdate(genreId, { bookCount: count });
      }
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

const AuthorModel = model("author", authorSchema);

export default AuthorModel;
