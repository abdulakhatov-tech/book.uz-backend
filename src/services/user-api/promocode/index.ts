import { PromocodeModel } from "../../../models";

class PromocodeService {
  constructor() {}

  async getDiscountByPromocode(couponCode: string) {
    const result = await PromocodeModel.findOne({ couponCode })
      .select("discount -_id")
      .exec();

      if(!result) {
        throw new Error("Invalid coupon code!");
      }

    return {
      discount: result?.discount,
      message: `Couponcode applied successfully. <strong>${result?.discount ?? 0}%</strong> discount has been applied to your total amount.`,
    };
  }
}

export default PromocodeService;
