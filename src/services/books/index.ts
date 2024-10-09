import { UserModel } from "../../models";
import BookModel from "../../models/book";

class BooksService {
  constructor() {}

  async getAllBooks({ page, limit, sort, asc, filters }: any) {
    const query: any = {};

    // Genre filter
    if (filters.genreIds) {
      if (filters.genreIds.includes("all")) {
        // Do not filter by genre if "all-genres" is selected
      } else {
        query.genre = Array.isArray(filters.genreIds)
          ? { $in: filters.genreIds }
          : filters.genreIds;
      }
    }

    // Price Range filter
    if (filters.fromPrice || filters.toPrice) {
      query.bookPrice = {
        ...(filters.fromPrice && { $gte: filters.fromPrice }),
        ...(filters.toPrice && { $lte: filters.toPrice }),
      };
    }

    if (filters.language) {
      if (filters.language.includes("all")) {
        // Do not filter by genre if "all-genres" is selected
      } else {
        query.language = Array.isArray(filters.language)
          ? { $in: filters.language }
          : filters.language;
      }
    }

    if (filters.authorIds) {
      if (filters.authorIds.includes("all")) {
        // Do not filter by genre if "all-genres" is selected
      } else {
        query.author = Array.isArray(filters.authorIds)
          ? { $in: filters.authorIds }
          : filters.authorIds;
      }
    }

    // Sorting logic
    const sortOptions: Record<string, string> = {
      createdAt: "createdAt",
      fromPrice: "bookPrice",
      rating: "rating",
    };

    const sortField = sortOptions[sort] || "createdAt";
    const sortOrder = asc === 1 ? 1 : -1;

    const skip = (page - 1) * limit;

    // Total matching books count
    const totalBooks = await BookModel.countDocuments(query);

    // Total pages
    const totalPages = Math.ceil(totalBooks / limit);

    // Get books with filters, pagination, and sorting
    const books = await BookModel.find(query)
      .populate({
        path: "author",
        select: "_id imgUrl fullName",
      })
      .populate({
        path: "genre",
        select: "_id imgUrl name",
      })
      .sort({ [sortField]: sortOrder })
      .select("-ratedBy")
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      books,
      totalBooks,
      totalPages,
    };
  }

  async createBook(body: any) {
    const book = await BookModel.create(body);

    if (!book) {
      throw new Error("Failed to create book!");
    }

    return book;
  }

  async getBookById(bookId: string) {
    const book = await BookModel.findById(bookId)
      .populate({
        path: "author",
        select: "_id imgUrl fullName",
      })
      .populate({
        path: "genre",
        select: "_id imgUrl name",
      })
      .select("-ratedBy")
      .exec();

    if (!book) {
      throw new Error("Book not found!");
    }

    return book;
  }

  async updateBookById(bookId: string, book: any) {
    const updatedBook = await BookModel.findByIdAndUpdate(bookId, book, {
      new: true,
    })
      .select("-ratedBy")
      .exec();

    if (!updatedBook) {
      throw new Error("Book update failed!");
    }

    return updatedBook;
  }

  async deleteBookById(bookId: string) {
    const deletedBook = await BookModel.findByIdAndDelete(bookId).exec();

    if (!deletedBook) {
      throw new Error("Book not found!");
    }

    return deletedBook;
  }
}

export default BooksService;
