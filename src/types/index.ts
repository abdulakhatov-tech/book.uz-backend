import { Document, Schema, Types } from "mongoose";

export interface IPagination {
  page: number;
  limit: number;
  search?: string;
}

export interface IUser extends Document {
  name: string;
  surname: string;
  phoneNumber: string;
  profilePhoto: string;
  email: string;
  bio: string;
  balance: number;
  frozenBalance: number;
  lastEnteredAt: Date;
  signInAttempts: number;
  role: 'user' | 'admin' | 'owner',
  orders: Array<Schema.Types.ObjectId>;
  books: Array<Schema.Types.ObjectId>;
  wishlist: Array<Schema.Types.ObjectId>;
  billingAddress: {
    region: Types.ObjectId | null;
    district: Types.ObjectId | null;
    details: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBanner {
  _id?: string;
  title: string;
  link: string;
  imgUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IStatistics {
  _id?: string;
  totalBooks: number;
  totalNamedBook: number;
  totalBranches: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BookOrder {
  book: string; // or Schema.Types.ObjectId, if you want to enforce ObjectId type
  quantity: number;
}

export interface Address {
  region: string; // or Schema.Types.ObjectId if you want to enforce ObjectId type
  district: string; // or Schema.Types.ObjectId if you want to enforce ObjectId type
  extraAddress: string;
}

export interface Order extends Document {
  user: string; // or Schema.Types.ObjectId if you want to enforce ObjectId type
  books: BookOrder[];
  deliveryMethod: 'courier' | 'pickup' | 'postal';
  paymentMethod: 'payme' | 'click' | 'cash';
  address: Address;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt?: Date; // Optional, if you are using timestamps
  updatedAt?: Date; // Optional, if you are using timestamps
}

// =================================================================

export interface IBodyRequirerParams {
  body: Record<string, any>;
  requiredFields: string[];
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

export interface DisrictI {
  _id?: string;
  name: string;
  region: Types.ObjectId;
}

export interface PromocodeI {
  _id?: string;
  code: string;
  discount: number;
  isActive: boolean;
}