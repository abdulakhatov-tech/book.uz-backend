import { z } from "zod";

export const newsQuerySchema = z.object({
    page: z
      .string()
      .regex(/^\d+$/, "Page must be a positive number")
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1)), // Default to 1 if not provided
    limit: z
      .string()
      .regex(/^\d+$/, "Limit must be a positive number")
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 12)), // Default to 12 if not provided
    type: z
      .enum(["all", "news", "newBook", "discounts"])
      .optional()
      .default("all"),
  });