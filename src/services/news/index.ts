import { NewsModel } from "../../models";

class NewsService {
  constructor() {}

  async getAll({page, limit, type}: {page: number, limit: number; type: 'all' | 'news' | 'newBook' | 'discounts'}) {
    const skip = (page - 1) * limit;

    const query: any = {};

    if (type !== 'all') {
      query.type = type;
    }

    const totalNews = await NewsModel.countDocuments(query);
    const totalPages = Math.ceil(totalNews / limit);

    const newsList = await NewsModel.find(query)
    .populate("book")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })

    return {
      data: newsList,
      totalNews,
      totalPages
    };
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
