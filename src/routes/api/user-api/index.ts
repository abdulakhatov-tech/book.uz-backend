import { Router } from "express";

import { verifyToken } from "../../../middlewares/verifyToken";
import { getAllRegions } from "../../../controller/user-api/regions";
import { getAllPaymentMethods } from "../../../controller/user-api/payment-methods";
import { getAllDeliveryMethods } from "../../../controller/user-api/delivery-methods";
import { getAllDistrictsRelatedToRegions } from "../../../controller/user-api/districts";
import { getDiscountByPromocode } from "../../../controller/user-api/promocode";

const router = Router();

router.get("/regions", verifyToken, getAllRegions);
router.get(
  "/districts/:regionId",
  verifyToken,
  getAllDistrictsRelatedToRegions
);
router.get("/delivery-methods", verifyToken, getAllDeliveryMethods);
router.get("/payment-methods", verifyToken, getAllPaymentMethods);
router.post("/apply-coupon", verifyToken, getDiscountByPromocode);

export default router;
