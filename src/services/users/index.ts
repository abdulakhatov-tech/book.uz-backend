import { IUser } from "../../types";
import { UserModel } from "../../models";

class UsersService {
  constructor() {}

  async getAllUsers({
    page,
    limit,
    search,
  }: {
    page: number;
    limit: number;
    search: string;
  }) {
    const skip = (page - 1) * limit;

    const searchQuery = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    // Total matching users count
    const totalUsers = await UserModel.countDocuments(searchQuery);

    // Total pages
    const totalPages = Math.ceil(totalUsers / limit);

    const users = await UserModel.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    return {
      data: users,
      totalUsers,
      totalPages,
    };
  }

  async getUserById(_id: string) {
    const user = await UserModel.findById({ _id }).exec();

    if (!user) {
        throw new Error("User not found");
    }

    return user;
  }

  async deleteUserById(_id: string) {
    const user = await UserModel.findByIdAndDelete({ _id }).exec();

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async updateUserById(_id: string, user: Partial<IUser>) {
    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id },
      { ...user },
      { new: true }
    ).exec();

    if (!updatedUser) {
      throw new Error("User update failed!");
    }

    return updatedUser;
  }

  async promoteUserToAdmin(_id: string) {
    const user = await UserModel.findById({ _id });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role == "admin" || user.role == "owner") {
      throw new Error(`User is already an ${user.role}.`);
    }

    user.role = "admin";
    await user.save();

    return user;
  }

async demoteAdminToUser(_id: string) {
    const user = await UserModel.findById({ _id });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role === "user") {
      throw new Error("User is already a regular user.");
    }

    user.role = "user";
    await user.save();

    return user;
  }
}

export default new UsersService();
