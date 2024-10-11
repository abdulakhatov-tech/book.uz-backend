import { Request, Response } from "express";

import { apiErrorHandler } from "../../errors";
import { BannersService } from "../../services";
import { PaginationQueryValidator } from "../../validators/pagination";
import {
  BannerIdValidator,
  CreateBannerValidator,
  UpdateBannerValidator,
} from "../../validators/banners";

export const getAll = async (req: Request, res: Response) => {
  try {
    const { page, limit } = PaginationQueryValidator.parse(req.query);

    const data = await BannersService.getAll({
      page,
      limit
    });

    res.status(200).json({
      status: "success",
      message: "ok",
      ...data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const body = CreateBannerValidator.parse(req.body);

    const data = await BannersService.create(body);

    res.status(201).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

export const updateById = async (req: Request, res: Response) => {
  try {
    const { bannerId } = BannerIdValidator.parse(req.params);
    const body = UpdateBannerValidator.parse(req.body);

    const data = await BannersService.updateById(bannerId, body);

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const { bannerId } = BannerIdValidator.parse(req.params);

    await BannersService.deleteById(bannerId);

    res.status(204).json({
      status: "success",
      message: "ok",
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};
