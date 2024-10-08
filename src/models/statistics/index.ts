import { model, Model, Schema } from "mongoose";
import { IStatistics } from "../../types";

const StatisticsSchema = new Schema(
  {
    totalBooks: {
      type: Number,
      default: 0,
      min: 0, 
    },
    totalNamedBooks: {
      type: Number,
      default: 0,
      min: 0, 
    },
    totalBranches: {
      type: Number,
      default: 0,
      min: 0, 
    },
  },
  {
    timestamps: true,
  }
);

const StatisticsModel: Model<IStatistics> = model<IStatistics>('statistics', StatisticsSchema);

export default StatisticsModel;
