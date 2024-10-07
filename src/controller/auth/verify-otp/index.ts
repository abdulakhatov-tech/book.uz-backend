import { Request, Response } from "express";

import { createToken } from "../../../helpers";
import { AuthService } from "../../../services";
import { apiErrorHandler } from "../../../errors";
import { OTPVerificationValidator } from "../../../validators/auth";


const verifyOTP = async (req: Request, res: Response) => {
  try {
    // Validate and parse the request body
    const body = OTPVerificationValidator.parse(req.body);

    // Verify OTP
    const user = await AuthService.verifyOTP(body);

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
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

export default verifyOTP;
