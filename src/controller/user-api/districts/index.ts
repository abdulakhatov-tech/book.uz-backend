import { Request, Response } from "express";
import { apiErrorHandler } from "../../../errors";
import { DistrictsService } from "../../../services";
import { regionIdSchema } from "../../../validators/districts.validation";

const districtsService = new DistrictsService();

export const getAllDistrictsRelatedToRegions = async (
  req: Request,
  res: Response
) => {
  try {
    const { regionId } = regionIdSchema.parse(req.params);

    const data = await districtsService.getAllDistricts(regionId);

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};
