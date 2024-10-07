import { model, Model, Schema } from "mongoose";

import { IUser } from "../../types";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
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
    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      default: "",
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    frozenBalance: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastEnteredAt: {
      type: Date,
      default: Date.now,
    },
    signInAttempts: {
      type: Number,
      default: 0,
      min: 0,
    },
    role: {
      type: String,
      enum: ["user", "admin", "owner"],
      default: "user",
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "order",
        default: [],
      },
    ],
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "book",
        default: [],
      },
    ],
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "book",
        default: [],
      },
    ],
    billingAddress: {
      region: {
        type: Schema.Types.ObjectId,
        ref: "region",
        default: null,
      },
      district: {
        type: Schema.Types.ObjectId,
        ref: "district",
        default: null,
      },
      extraAddress: {
        type: String,
        trim: true,
        default: "",
      },
    },
  },
  { timestamps: true }
);

const UserModel: Model<IUser> = model<IUser>("user", UserSchema);

export default UserModel;
