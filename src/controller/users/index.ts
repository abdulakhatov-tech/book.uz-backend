import { Request, Response } from "express";
import { apiErrorHandler } from "../../errors";
import { UsersService } from "../../services";

const usersService = new UsersService();

// user
const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const data = await usersService.getAllUsers();

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

const getUserByIdController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({
      status: "error",
      message: "Invalid user ID",
    });
  }

  try {
    const data = await usersService.getUserById(userId);

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

const deleteUserByIdController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({
      status: "error",
      message: "Invalid user ID",
    });
  }

  try {
    const data = await usersService.deleteUserById(userId);

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

const updateUserByIdController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const body = req.body;

  if (!userId) {
    res.status(400).json({
      status: "error",
      message: "Invalid user ID",
    });
  }

  try {
    const data = await usersService.updateUserById(userId, body);

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }

}

// user promotion
const promoteUserToAdminController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({
      status: "error",
      message: "Invalid user ID",
    });
  }

  try {
    const data = await usersService.promoteUserToAdmin(userId);

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

const demoteAdminToUserController = async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        status: "error",
        message: "Invalid user ID",
      });
    }

    try {
      const data = await usersService.demoteAdminToUser(userId);

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
  getUserByIdController as getUserByI,
  getAllUsersController as getAllUsers,
  deleteUserByIdController as deleteUserById,
  updateUserByIdController as updateUserById,
  promoteUserToAdminController as promoteUserToAdmin,
  demoteAdminToUserController as demoteAdminToUser
};
