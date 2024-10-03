import { AuthorModel } from "../../models";
import BookModel from "../../models/book";
import { IAuthor } from "../../types";

class AuthorsService {
  constructor() {}

  async getAllAuthors(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [authors, total] = await Promise.all([
      AuthorModel.find().skip(skip).limit(limit).exec(),
      AuthorModel.find().exec(),
    ]);

    return {
      data: authors,
      total: total?.length || 0,
    };
  }

  async createAuthor(body: IAuthor) {
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

  async updateAuthorById(_id: string, body: IAuthor) {
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
