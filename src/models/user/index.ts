import { model, Model, Schema } from "mongoose";

import { IUser } from "../../types";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^\+?[1-9]\d{1,14}$/,
  },
  profilePhoto: {
    type: String,
    default:
      "https://productivemuslim.com/wp-content/uploads/2017/01/Book-Review-The-Productive-Muslim-by-Mohammed-Faris-600.jpg",
  },
  balance: {
    type: Number,
    default: 0,
  },
  frozenBalance: {
    type: Number,
    default: 0,
  },
  lastEnteredAt: {
    type: Date,
    default: Date.now,
  },
  signInAttempts: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    enum: ["user", "admin", "owner"],
    default: "user",
  },
  orders: {
    type: [{ type: Schema.Types.ObjectId, ref: "order" }],
    default: [],
  },
  wishlist: {
    type: [{ type: Schema.Types.ObjectId, ref: "book" }],
    default: [],
  },
  products: {
    type: [{ type: Schema.Types.ObjectId, ref: "product" }],
    default: [],
  },
  email: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  }
});

const UserModel: Model<IUser> = model<IUser>("user", UserSchema);

export default UserModel;