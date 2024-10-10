import { model, Schema } from "mongoose";
import { INews } from "../../types";

const newsSchema = new Schema<INews>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "book",
      default: null
    },
    content: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    isRead: {
      type: Number,
      default: 0,
    },
    readCount: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["news", "newBook"],
      default: "news",
    },
  },
  {
    timestamps: true,
  }
);

const newsModel =  model<INews>('news', newsSchema);

export default newsModel;