import { NewsModel } from "../../models";

class NewsService {
  constructor() {}

  async getAll() {
    const newsList = await NewsModel.find().populate("book");

    return newsList;
  }

  async getById(_id: string) {
    const news = await NewsModel.findById({ _id }).populate("book");

    if (!news) {
      throw new Error("News not found");
    }

    return news;
  }

  async create(body: any) {
    const news = await NewsModel.create(body);

    return news;
  }

  async updateById(_id: string, body: any) {
    const updatedNews = await NewsModel.findByIdAndUpdate(_id, body, {
      new: true,
    });

    if (!updatedNews) {
      throw new Error("Genre not found");
    }

    return updatedNews;
  }

  async deleteById(_id: string) {
    const deletedNews = await NewsModel.findByIdAndDelete(_id);

    if (!deletedNews) {
      throw new Error("News not found");
    }

    return deletedNews;
  }
}
export default NewsService;
