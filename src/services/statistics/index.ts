import BookModel from "../../models/book";

interface IStatistics {
  totalNamedBooks: number;
  totalBooks: number;
  totalBranches: number;
}

class StatisticsService {
  private totalNamedBooks: number;
  private totalBooks: number;
  private totalBranches: number;

  constructor() {
    this.totalNamedBooks = 0;
    this.totalBooks = 0;
    this.totalBranches = 3;
  }

  public async getStatistics() {
    try {
      const totalAmountResult = await BookModel.aggregate([
        { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
      ]);

      this.totalBooks = totalAmountResult[0]?.totalAmount || 0;
      this.totalNamedBooks = await BookModel.countDocuments({
        name: { $exists: true },
      }).exec();

      return {
        totalBooks: this.totalBooks,
        totalNamedBooks: this.totalNamedBooks,
        totalBranches: this.totalBranches,
      };
    } catch (error) {
      throw new Error("Could not retrieve statistics");
    }
  }
}

export default new StatisticsService();
