import { Request, Response } from "express";
import { OrdersService } from "../../services";
import { apiErrorHandler } from "../../errors";
import {
  OrderValidatorSchema,
  OrderIdValidationSchema,
  OrderStatusValidationSchema,
} from "../../validators/orders";
import { UserIdValidator } from "../../validators/users";

export const getAllOrders = async(req: Request, res: Response) => {
  try{
    const data = await OrdersService.getAllOrders();

    res.status(200).json({
      status: "success",
      message: "ok",
      data
    })
  } catch (error) {
    return apiErrorHandler(res, error);
  }

}

export const createOrder = async (req: Request, res: Response) => {
  try {
    const body = OrderValidatorSchema.parse(req.body);

    const data = await OrdersService.createOrder(body);

    res.status(201).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = UserIdValidator.parse(req.params);

    const data = await OrdersService.getUserOrders(userId);

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = OrderIdValidationSchema.parse(req.params);
    const { status } = OrderStatusValidationSchema.parse(req.body);

    const data = await OrdersService.updateOrderStatus(orderId, status);

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};
