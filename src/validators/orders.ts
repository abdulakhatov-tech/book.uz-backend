import { z } from "zod";

const AddressSchema = z.object({
  region: z.string().length(24, { message: "Invalid region ID" }), // Assuming ObjectId as a 24-character hex string
  district: z.string().length(24, { message: "Invalid district ID" }), // Assuming ObjectId as a 24-character hex string
  extraAddress: z.string().min(1, { message: "Extra address is required" }),
});

const BookSchema = z.object({
  book: z.string().length(24, { message: "Invalid book ID" }), // ObjectId validation
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
});

export const OrderValidatorSchema = z.object({
  user: z.string().length(24, { message: "Invalid user ID" }), // ObjectId validation
  books: z
    .array(BookSchema)
    .min(1, { message: "At least one book must be ordered" }),
  delivery_method: z.enum(["courier", "pickup", "postal"], {
    required_error: "Delivery method is required",
  }),
  payment_method: z.enum(["payme", "click", "cash"], {
    required_error: "Payment method is required",
  }),
  address: AddressSchema,
});

export const OrderIdValidationSchema = z.object({
    orderId: z.string().length(24, {message: "Invalid order ID" }),
    
})

export const OrderStatusValidationSchema = z.object({
    status: z.enum(["pending", "processing", "completed", "cancelled"], {
        required_error: "Status is required"
    })
})