import { z } from "zod";

export const createAuthorSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  biography: z.string().min(1, "Biography is required"),
});

export const updateAuthorSchema = z.object({
  fullName: z.string().optional(),
  biography: z.string().optional(),
});

export const authorPaginationQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1)) 
    .refine((val) => val > 0, { message: "Page must be greater than 0" }),

  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 24))
    .refine((val) => val > 0, { message: "Limit must be greater than 0" }),

  search: z.string().optional().default(""), 
});

export const authorIdSchema = z.object({
  authorId: z.string().min(1, "Author ID is required"),
});
