import { model, Schema } from "mongoose";
import BookModel from "../book";
import AuthorModel from "../author";

const genreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    bookCount: {
      type: Number,
      default: 0,
    },
    imgUrl: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

// middleware for genre
// Middleware for genre deletion
genreSchema.post("findOneAndDelete", async function (doc, next) {
    try {
      if (doc) {
        // Find all books associated with this genre
        const books = await BookModel.find({ genre: doc._id });
  
        // Collect unique author IDs from the books
        const authorIds = [...new Set(books.map((book) => String(book.author)))];
  
        // Delete all books related to this genre
        await BookModel.deleteMany({ genre: doc._id });
  
        // Update the bookCount for each author whose books were deleted
        for (const authorId of authorIds) {
          const count = await BookModel.countDocuments({ author: authorId });
          await AuthorModel.findByIdAndUpdate(authorId, { bookCount: count });
        }
      }
      next();
    } catch (error: any) {
      next(error);
    }
  });
const GenreModel = model("genre", genreSchema);

export default GenreModel;
