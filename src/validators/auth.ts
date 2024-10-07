import { z } from "zod";

// PhoneNumberValidator for validating phone numbers
export const PhoneNumberValidator = z.object({
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format" })
    .nonempty({ message: "Phone number is required" }),
});

// SignUpValidator for validating user sign-up details
export const SignUpValidator = z.object({
  name: z.string().min(1, { message: "Name is required" }).trim(),
  surname: z.string().min(1, { message: "Surname is required" }).trim(),
  phoneNumber: PhoneNumberValidator.shape.phoneNumber,
});

// OTPVerificationValidator for validating OTP verification
export const OTPVerificationValidator = z.object({
  phoneNumber: PhoneNumberValidator.shape.phoneNumber,
  otpCode: z.number().min(1, { message: "OTP code is required" }),
});
