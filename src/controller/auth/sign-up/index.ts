import { Request, Response } from "express";

import { bodyRequirer } from "../../../helpers";
import { apiErrorHandler } from "../../../errors";
import { AuthService, OTPService } from "../../../services";

// services
const authService = new AuthService();
const otpService = new OTPService();

// Defining the required fields for the sign-up request
const requiredFields = ["name", "surname", "phoneNumber"];

const signUpController = async (req: Request, res: Response) => {
  const body = req.body;

  // Check for missing required fields using the bodyRequirer helper
  const missingFields = await bodyRequirer({ body, requiredFields });

  // If there are missing fields, respond with a 400 error
  if (missingFields) {
    return res.status(400).json({
      status: "error",
      message: missingFields,
    });
  }

  try {
    // Calling the signUp method from AuthService to handle the registration process
    const otpCode = await authService.signUp(body);

    res.status(200).json({
      status: "success",
      message: "ok",
      extraMessage: "Verification code sent successfully",
      activeOtpTime: otpService.otpValidity,
      otpCode,
    });
  } catch (error: any) {
    return apiErrorHandler(res, error);
  }
};

export default signUpController;