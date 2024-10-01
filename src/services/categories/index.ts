import BookModel from "../../models/book";

class CategoriesService {
  constructor() {}

  async getNewAgeLibraryBooks() {
    // Calculate the current year minus 100 years
    const hundredYearsAgo = new Date().getFullYear() - 100;

    // Books published in the New Age category
    const books = await BookModel.find({ year: { $gte: hundredYearsAgo } })
      .sort({ year: -1 })
      .select(
        "amount author bookPrice discount hasDiscount imgUrl name rateCount rating state _id additionalImages"
      )
      .populate("author", "_id fullName")
      .limit(12)
      .exec();

    if (!books.length) {
      throw new Error("No New Age books found!");
    }

    return books;
  }
  async getNewlyArrivedBooks() {
    const today = new Date();
    const pastDate = new Date(today.setDate(today.getDate() - 30));

    // Books added in the last 30 days
    const books = await BookModel.find({ createdAt: { $gte: pastDate } })
      .sort({ createdAt: -1 })
      .select(
        "amount author bookPrice discount hasDiscount imgUrl name rateCount rating state _id additionalImages"
      )
      .populate("author", "_id fullName")
      .limit(8) 
      .exec();

    if (!books.length) {
      throw new Error("No new books found!");
    }

    return books;
  }
  async getRecentlyPublishedBooks() {
    // Books published in the last 12 months of the year
    const books = await BookModel.find()
      .sort({ year: -1 })
      .select(
        "amount author bookPrice discount hasDiscount imgUrl name rateCount rating state _id additionalImages"
      )
      .populate("author", "_id fullName")
      .limit(8)
      .exec();

    if (!books.length) {
      throw new Error("No recently published books found!");
    }

    return books;
  }
}

export default CategoriesService;
