import { model, Model, Schema } from "mongoose";
import { IBanner } from "../../types";

const BannerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BannerModel: Model<IBanner> = model<IBanner>("banner", BannerSchema);

export default BannerModel;
