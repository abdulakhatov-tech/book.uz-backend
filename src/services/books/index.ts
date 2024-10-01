import BookModel from "../../models/book";

class BooksService {
  constructor() {}

  async getAllBooks({ page, limit, sort, asc, filters }: any) {
    const query: any = {};

    console.log(page, limit, sort, asc, filters)

    // Genre filter
    if (filters.genreIds) {
      if(Array.isArray( filters.genreIds)) {
        query.genre = { $in: filters.genreIds };
      } else {
        query.genre = filters.genreIds;
      }
    }

    // Price Range filter
    if (filters.fromPrice || filters.toPrice) {
      query.bookPrice = {
        ...(filters.fromPrice && { $gte: filters.fromPrice }),
        ...(filters.toPrice && { $lte: filters.toPrice }),
      };
    }

    // Language filter
    if (filters.language) {
      if(Array.isArray(filters.language)) {
        query.language = { $in: filters.language };
      } else {
        query.language = filters.language;
      }
      
    }

    // Author filter
    if (filters.authorId) {
      if(Array.isArray(filters.authorIds)) {
        query.author = { $in: filters.authorIds };
      } else {
        query.author = filters.authorId;
      }
    }

    // Sorting logic
    const sortOptions: Record<string, string> = {
      createdAt: "createdAt",
      fromPrice: 'bookPrice',
      rating: "rating",
    }

    const sortField = sortOptions[sort] || 'createdAt';
    const sortOrder = asc === "asc"? 1 : -1;

    const skip = (page - 1) * limit;

    // Total matching books count
    const totalBooks = await BookModel.countDocuments(query);

    // Total pages
    const totalPages =  Math.ceil(totalBooks / limit);

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
      .skip(skip)
      .limit(parseInt(limit, 10))
      .exec();

    return {
      books,
      totalBooks,
      totalPages
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
      .exec();

    if (!book) {
      throw new Error("Book not found!");
    }

    return book;
  }

  async updateBookById(bookId: string, book: any) {
    const updatedBook = await BookModel.findByIdAndUpdate(bookId, book, {
      new: true,
    }).exec();

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
