import { Request, Response } from "express";

import {
  UpdateUserBodyValidator,
  UserIdValidator,
} from "../../validators/users";
import { IUser } from "../../types";
import { UsersService } from "../../services";
import { apiErrorHandler } from "../../errors";
import { PaginationQueryValidator } from "../../validators/pagination";

// get all users
const getAll = async (req: Request, res: Response) => {
  try {
    const { page, limit, search } = PaginationQueryValidator.parse(req.query);

    const data = await UsersService.getAllUsers({
      page,
      limit,
      search: String(search)
    });

    res.status(200).json({
      status: "success",
      message: "ok",
      ...data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

// get user by id
const getById = async (req: Request, res: Response) => {
  try {
    // Validate userId in req.params
    const { userId } = UserIdValidator.parse(req.params);

    const data = await UsersService.getUserById(userId);

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

// delete user by id
const deleteById = async (req: Request, res: Response) => {
  try {
    // Validate userId in req.params
    const { userId } = UserIdValidator.parse(req.params);

    await UsersService.deleteUserById(userId);

    res.status(200).json({
      status: "success",
      message: "ok",
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

// update user by id
const updateById = async (req: Request, res: Response) => {
  try {
    // Validate userId and body in req
    const { userId } = UserIdValidator.parse(req.params);
    const body = UpdateUserBodyValidator.parse(req.body);

    const data = await UsersService.updateUserById(
      userId,
      body as Partial<IUser>
    );

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

// user promotion
const promoteUserToAdmin = async (req: Request, res: Response) => {
  try {
    // Validate userId in req.params
    const { userId } = UserIdValidator.parse(req.params);

    const data = await UsersService.promoteUserToAdmin(userId);

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

// admin demotion
const demoteAdminToUser = async (req: Request, res: Response) => {
  try {
    // Validate userId in req.params
    const { userId } = UserIdValidator.parse(req.params);

    const data = await UsersService.demoteAdminToUser(userId);

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

export {
  getAll,
  getById,
  deleteById,
  updateById,
  demoteAdminToUser,
  promoteUserToAdmin,
};
