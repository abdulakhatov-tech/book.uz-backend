import { Router } from "express";
import { getStatistics } from "../../../controller/statistics";

const router = Router();

router.get('/', getStatistics)

export default router;