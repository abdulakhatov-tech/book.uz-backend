import OTPService from "./otp";
import UserService from "./user";
import { IUser } from "../../types";

class AuthService {
  private authType: "sign-in" | "sign-up";

  constructor() {
    this.authType = "sign-in";
  }

  async signUp(body: Pick<IUser, "name" | "surname" | "phoneNumber">) {
    this.authType = "sign-up";
    const { name, surname, phoneNumber } = body;

    await UserService.checkIfUserExists(phoneNumber);
    const newOtpCode = OTPService.generateOTP();
    OTPService.storeOTP(phoneNumber, newOtpCode, name, surname);

    return newOtpCode;
  }

  async signIn(body: Pick<IUser, "phoneNumber">) {
    this.authType = "sign-in";

    const { phoneNumber } = body;

    const isValid = UserService.validatePhoneNumber(phoneNumber);

    if (!isValid) {
      throw new Error("Invalid phone number format!");
    }

    await UserService.checkIfUserExists(phoneNumber, false);

    const newOtpCode = OTPService.generateOTP();
    OTPService.storeOTP(body.phoneNumber, newOtpCode);

    return newOtpCode;
  }

  async verifyOTP(body: { phoneNumber: string; otpCode: number }) {
    const { phoneNumber, otpCode } = body;

    const otpData = OTPService.validateOTP(phoneNumber, otpCode);

    if (!otpData) {
      throw new Error("Invalid or expired OTP code!");
    }

    return await UserService.createOrUpdateUser(
      phoneNumber,
      otpData,
      this.authType
    );
  }
}

export default new AuthService();
