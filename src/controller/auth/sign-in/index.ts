import { Request, Response } from "express";

import { apiErrorHandler } from "../../../errors";
import { AuthService, OTPService } from "../../../services";
import { PhoneNumberValidator } from "../../../validators/auth";

const signIn = async (req: Request, res: Response) => {
  try {
    // Validate and parse the request body
    const body = PhoneNumberValidator.parse(req.body);

    // Validate and sign in the user using the provided phone number
    const otpCode = await AuthService.signIn(body);

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

export default signIn;
