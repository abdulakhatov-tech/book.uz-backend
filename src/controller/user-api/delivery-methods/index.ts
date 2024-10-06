import { Request, Response } from "express";
import { apiErrorHandler } from "../../../errors";
import { DeliveryMethodsService } from "../../../services";

const deliveryMethodsService = new DeliveryMethodsService();

export const getAllDeliveryMethods = async (req: Request, res: Response) => {

  try {
    const data = await deliveryMethodsService.getAllDeliveryMethods()

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });

  } catch (error) {
    return apiErrorHandler(res, error);
  }
};
