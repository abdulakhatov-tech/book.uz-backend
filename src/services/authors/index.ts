import { AuthorModel } from "../../models";
import BookModel from "../../models/book";
import { IAuthor } from "../../types";

class AuthorsService {
  constructor() {}

  async getAllAuthors({ page, limit, search }: { page: number; limit: number, search: string }) {
    const skip = (page - 1) * limit;

    const searchQuery = search ? { fullName: { $regex: search, $options: "i" } } : {}

    // Total matching books count
    const totalAuthors = await AuthorModel.countDocuments(searchQuery);

    // Total pages
    const totalPages = Math.ceil(totalAuthors / limit);

    const authors = await AuthorModel.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    return {
      data: authors,
      totalAuthors,
      totalPages,
    };
  }

  async createAuthor(body: any) {
    const link = body.fullName?.split(" ").join("-").toLowerCase();
    const data = {
      ...body,
      link,
    };
    const newAuthor = await AuthorModel.create(data);

    if (!newAuthor) {
      throw new Error("Author creation failed!");
    }

    return newAuthor;
  }

  async getAuthorById(_id: string) {
    const author = await AuthorModel.findById(_id).exec();

    if (!author) {
      throw new Error("Author not found!");
    }

    return author;
  }

  async updateAuthorById(_id: string, body: any) {
    const updatedAuthor = await AuthorModel.findByIdAndUpdate({ _id }, body, {
      new: true,
    }).exec();

    if (!updatedAuthor) {
      throw new Error("Author update failed!");
    }

    return updatedAuthor;
  }

  async deleteAuthorById(_id: string) {
    const deletedAuthor = await AuthorModel.findByIdAndDelete({ _id }).exec();

    if (!deletedAuthor) {
      throw new Error("Author not found!");
    }

    return deletedAuthor;
  }

  async getAuthorBooks(_id: string) {
    const author = await AuthorModel.findById(_id).exec();

    if (!author) {
      throw new Error("Author not found!");
    }

    const books = await BookModel.find({ author: _id }).exec();

    return books;
  }
}

export default AuthorsService;
