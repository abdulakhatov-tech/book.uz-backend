import { UserModel } from "../../models";
import { IUser } from "../../types";

class UsersService {
    constructor() {}

    async getAllUsers() {
        const users = await UserModel.find().exec();

        if (!users.length) {
            throw new Error("No users found!");
        }

        return users;
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

    async updateUserById(_id: string, user: IUser) {
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

        if(user.role == "admin" || user.role == "owner") {
            throw new Error(`User is already an ${user.role}.`);
        } 

        user.role = "admin";
        await user.save();

        return user;
    }

    async demoteAdminToUser (_id: string) {
        const user = await UserModel.findById({ _id });

        if(!user) {
            throw new Error("User not found");
        }

        if(user.role === 'user') {
            throw new Error("User is already a regular user.");
        }

        user.role = "user";
        await user.save();

        return user;
    }
}

export default UsersService;