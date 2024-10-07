import { Request, Response } from "express";

import { apiErrorHandler } from "../../../errors";
import { SignUpValidator } from "../../../validators/auth";
import { AuthService, OTPService } from "../../../services";

const signUp = async (req: Request, res: Response) => {
  try {
    // Validate and parse the request body
    const body = SignUpValidator.parse(req.body);

    // Call the service to sign up the user and generate a verification code
    const otpCode = await AuthService.signUp(body);

    res.status(200).json({
      status: "success",
      message: "ok",
      extraMessage: "Verification code sent successfully",
      activeOtpTime: OTPService.otpValidity,
      otpCode,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

export default signUp;