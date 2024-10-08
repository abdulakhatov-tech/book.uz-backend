import { BannerModel } from "../../models";
import { IBanner, IPagination } from "../../types";

class BannersService {
  constructor() {}

  async getAll({ page, limit, search }: IPagination) {
    const skip = (page - 1) * limit;

    const searchQuery = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    // Total matching users count
    const totalUsers = await BannerModel.countDocuments(searchQuery);

    // Total pages
    const totalPages = Math.ceil(totalUsers / limit);

    const banners = await BannerModel.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    return {
      data: banners,
      totalUsers,
      totalPages,
    };
  }

  async create(body: IBanner) {
    const newBanner = await BannerModel.create(body);

    if (!newBanner) {
      throw new Error("Failed to create banner!");
    }

    return newBanner;
  }

  async updateById(_id: string, body: Partial<Pick<IBanner, 'title' | 'link' | 'imgUrl'>>) {
    const updatedBanner = await BannerModel.findByIdAndUpdate(_id, body, {
      new: true,
    });

    if (!updatedBanner) {
      throw new Error("Failed to update banner!");
    }

    return updatedBanner;
  }

  async deleteById(_id: string) {
    const deletedBanner = await BannerModel.findByIdAndDelete(_id);

    if (!deletedBanner) {
      throw new Error("Failed to delete banner!");
    }

    return deletedBanner;
  }
}

export default new BannersService();
