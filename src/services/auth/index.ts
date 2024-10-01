import OTPService from "./otp";
import { IUser } from "../../types";
import UserService from "./user";

const otpService = new OTPService();
const userService = new UserService();

class AuthService {
  private authType: "sign-in" | "sign-up";

  constructor() {
    this.authType = "sign-in";
  }

  async signUp(body: Pick<IUser, "name" | "surname" | "phoneNumber">) {
    this.authType = "sign-up";
    const { name, surname, phoneNumber } = body;

    await userService.checkIfUserExists(phoneNumber);
    const newOtpCode = otpService.generateOTP();
    otpService.storeOTP(phoneNumber, newOtpCode, name, surname);

    return newOtpCode;
  }
  async signIn(body: Pick<IUser, "phoneNumber">) {
    this.authType = "sign-in";

    const { phoneNumber } = body;

    const isValid = userService.validatePhoneNumber(phoneNumber);

    if (!isValid) {
      throw new Error("Invalid phone number format!");
    }

    await userService.checkIfUserExists(phoneNumber, false);

    const newOtpCode = otpService.generateOTP();
    otpService.storeOTP(body.phoneNumber, newOtpCode);

    return newOtpCode;
  }
  async verifyOTP(body: { phoneNumber: string; otpCode: number }) {
    const { phoneNumber, otpCode } = body;

    const otpData = otpService.validateOTP(phoneNumber, otpCode);

    if (!otpData) {
      throw new Error("Invalid or expired OTP code!");
    }

    return await userService.createOrUpdateUser(
      phoneNumber,
      otpData,
      this.authType
    );
  }
}

export default AuthService;