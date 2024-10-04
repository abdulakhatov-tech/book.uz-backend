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
      enum: ["news", "newBook", 'discounts'],
      default: "news",
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

newsSchema.pre<INews>("save", function (next) {
  if (this.title && this.title.length > 0) {
    this.link = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove all punctuation and symbols except hyphens
      .replace(/\s+/g, "-")      // Replace spaces with hyphens
      .trim();                   // Trim leading/trailing spaces or hyphens
  }

  next();
});

const newsModel =  model<INews>('news', newsSchema);

export default newsModel;