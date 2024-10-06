import { Request, Response } from "express";
import { apiErrorHandler } from "../../../errors";
import { RegionsService } from "../../../services";

const regionsService = new RegionsService();

export const getAllRegions = async (req: Request, res: Response) => {
  try {
    const data = await regionsService.getAllRegions();

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};
