import { z } from "zod";
import { Types } from "mongoose";

export const UserIdValidator = z.object({
    userId: z.string().min(1, "Invalid user ID"), // User ID should be a non-empty string
});

export const UpdateUserBodyValidator = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  phoneNumber: z.string().optional(),
  profilePhoto: z.string().url().optional(),
  email: z.string().email().optional(),
  bio: z.string().optional(),
  balance: z.number().optional(),
  frozenBalance: z.number().optional(),
  lastEnteredAt: z.string().optional(),
  billingAddress: z.object({
    region: z.preprocess((value) => {
      if (typeof value === 'string') return new Types.ObjectId(value);
      return value;
    }, z.instanceof(Types.ObjectId).nullable().optional()),
    
    district: z.preprocess((value) => {
      if (typeof value === 'string') return new Types.ObjectId(value);
      return value;
    }, z.instanceof(Types.ObjectId).nullable().optional()),
    
    extraAddress: z.string().optional(),
  }).optional(),
});