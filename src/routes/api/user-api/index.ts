import { Router } from "express";
import { getAllRegions } from "../../../controller/user-api/regions";
import { getAllDeliveryMethods } from '../../../controller/user-api/delivery-methods';
import { getAllDistrictsRelatedToRegions } from "../../../controller/user-api/districts";
import { getAllPaymentMethods } from "../../../controller/user-api/payment-methods";

const router = Router();

router.get('/regions', getAllRegions)
router.get('/districts/:regionId', getAllDistrictsRelatedToRegions)
router.get('/delivery-methods', getAllDeliveryMethods)
router.get('/payment-methods', getAllPaymentMethods)

export default router