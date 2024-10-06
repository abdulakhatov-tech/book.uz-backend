import { Request, Response } from "express";
import { apiErrorHandler } from "../../../errors";
import { PaymentMethodsService } from "../../../services";

const paymentMethodsService = new PaymentMethodsService();

export const getAllPaymentMethods = async (req: Request, res: Response) => {
  try {
    const data = await paymentMethodsService.getAllPaymentMethods();

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};
