import jwt from "jsonwebtoken";
import { IBodyRequirerParams, IUser } from "../types";

// Creating JWT token with expired credentials
export const createToken = async (user: IUser) => {
  const { _id, role } = user;

  const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
  return jwt.sign({ userId: _id, role }, process.env.JWT_SECRET!, { expiresIn: maxAge });
};

export const bodyRequirer = async ({
  body,
  requiredFields,
}: IBodyRequirerParams): Promise<string | null> => {
  try {
    if (!Array.isArray(requiredFields)) {
      return "Invalid parameter: requiredFields must be an array";
    }

    if (!body || typeof body !== "object") {
      return "Invalid parameter: body is required and must be an object";
    }

    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return `${missingFields.join(", ")} required!`;
    }

    return null;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    return null;
  }
};