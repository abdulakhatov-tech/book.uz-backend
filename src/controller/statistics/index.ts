import { Request, Response } from "express";

import { apiErrorHandler } from "../../errors";
import { StatisticsService } from "../../services";

export const getStatistics = async (req: Request, res: Response) => {
  try {
    const data = await StatisticsService.getStatistics();

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};
