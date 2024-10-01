import { Request, Response } from "express";
import { AuthService } from "../../../services";
import { bodyRequirer, createToken } from "../../../helpers";

const authService = new AuthService();

export const requiredFields = ["phoneNumber", "otpCode"];

const verifyOTPController = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    // Check for missing fields
    const missingFields = await bodyRequirer({ body, requiredFields });
    if (missingFields) {
      return res.status(400).json({
        status: "error",
        message: `Missing fields: ${missingFields}`,
      });
    }

    // Verify OTP
    const user = await authService.verifyOTP(body);

    // Create JWT token for the user
    const token = await createToken(user);

    // Respond with success
    return res.status(201).json({
      status: "success",
      message: "OTP verified successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error: any) {
    // Handle any errors
    return res.status(400).json({
      status: "error",
      message: error.message || "An error occurred during OTP verification",
    });
  }
};

export default verifyOTPController;
