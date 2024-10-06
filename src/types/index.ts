import { Document, Types } from "mongoose";

export interface IBodyRequirerParams {
  body: Record<string, any>;
  requiredFields: string[];
}

export interface IUser extends Document {
  name: string;
  surname: string;
  phoneNumber: string;
  profilePhoto: string;
  balance: number;
  frozenBalance: number;
  lastEnteredAt: Date;
  signInAttempts: number;
  createdAt?: Date;
  updatedAt?: Date;
  role: 'user' | 'admin' | 'owner',
  orders: any[];
  wishlist: any[];
  products: any[];
}

export interface IGenre {
  _id?: string;
  name: string;
  descriptin: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthor {
  audioBookCount: number;
  biography: any,
  bookCount: number;
  dateOfbirth: any;
  dateOfdeath: any;
  ebookCount: number;
  fullName: string;
  imgUrl: any;
  link: string;
}


export type TRole = 'admin' | 'owner' | 'user'

export interface IBook extends Document {
  name: string;
  genre: Types.ObjectId;
  author: Types.ObjectId;
  amount: number;
  bookPrice: number;
  language: string;
  cover: string;
  discount?: number;
  hasDiscount?: boolean;
  description: string;
  numberOfPage: number;
  state: string;
  year: number;
  barcode: string;
  imgUrl: string;
  additionalImages?: string[];
  rateCount?: number;
  rating?: number;
  soldBookCount?: number;
  link?: string;
}

export interface INews {
  title: string;
  content: string;
  imgUrl: string;
  createdAt: Date;
  updatedAt: Date;
  isRead: number,
  readCount: number,
  type: 'news' | 'newBook' | 'discounts',
  link?: string;
  book?: any
}

export interface IReview {
  userId: Types.ObjectId;
  bookId: String;
  message: string;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DeliveryMethodI {
  _id?: string;
  name: string;
  type: "courier" | "pickup" | "postal";
  value: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaymentMethodI {
  _id?: string;
  name: string;
  type: "payme" | "cash" | "click";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RegionI {
  _id?: string;
  name: string;
  paymentTypes: ("balance" | "card" | "cash")[]
}