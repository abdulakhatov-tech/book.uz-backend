import { Model } from "mongoose";

import { IUser } from "../../../types";
import { UserModel } from "../../../models";
import { adminPhoneNumbers, ownerPhoneNumbers } from "../../../utils";
import { validatePhoneNumber } from "../../../validators/phoneNumberValidation";

class UserService {
  private UserModel: Model<IUser>;

  constructor() {
    this.UserModel = UserModel;
  }

  async checkIfUserExists(phoneNumber: string, shouldExist = true) {
    const user = await this.UserModel.findOne({ phoneNumber }).exec();
    if (!shouldExist && !user) {
      throw new Error("User not found!");
    } else if (shouldExist && user) {
      throw new Error("User with this phone number already exists!");
    }
  }

  validatePhoneNumber(phoneNumber: string): boolean {
    return validatePhoneNumber(phoneNumber);
  }

  async createOrUpdateUser(
    phoneNumber: string,
    { name, surname }: { name?: string; surname?: string },
    authType: "sign-in" | "sign-up"
  ) {
    const existingUser = await this.UserModel.findOne({ phoneNumber });

    if (authType === "sign-in") {
      if (existingUser) {
        existingUser.lastEnteredAt = new Date();
        existingUser.signInAttempts++;
        await existingUser.save();

        return existingUser;
      }
    }

    if (existingUser) {
      throw new Error("User already exists.");
    }

    let role: "user" | "admin" | "owner" = "user";

    if (ownerPhoneNumbers.includes(phoneNumber)) {
      role = "owner";
    }

    if (adminPhoneNumbers.includes(phoneNumber)) {
      role = "admin";
    }

    const newUser = await this.UserModel.create({
      name,
      surname,
      phoneNumber,
      role,
    });

    newUser.lastEnteredAt = new Date();
    newUser.signInAttempts++;
    await newUser.save();

    return newUser;
  }
}

export default new UserService;
