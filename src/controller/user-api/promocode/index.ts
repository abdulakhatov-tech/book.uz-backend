import { Request, Response } from "express";

import { apiErrorHandler } from "../../../errors";
import { PromocodeService } from "../../../services";
import { promocodeSchema } from "../../../validators/promocode.validation";

const promocodeService = new PromocodeService();

export const getDiscountByPromocode = async (req: Request, res: Response) => {
  try {
    const { couponCode } = promocodeSchema.parse(req.body);

    const data = await promocodeService.getDiscountByPromocode(couponCode);

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (err) {
    return apiErrorHandler(res, err);
  }
};
