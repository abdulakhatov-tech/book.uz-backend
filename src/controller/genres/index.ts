import { Request, Response } from "express";

import { bodyRequirer } from "../../helpers";
import { apiErrorHandler } from "../../errors";
import { GenresService } from "../../services";

const genresService = new GenresService();
const requiredFields = ["name"];

const getAll = async (req: Request, res: Response) => {
  try {
    const data = await genresService.getAll();

    res.status(200).json({
      status: "success",
      message: "ok",
      data
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

const getById = async (req: Request, res: Response) => {
  const { genreId } = req.params;

  if (!genreId) {
    return res.status(400).json({
      status: "error",
      message: "Invalid genre ID",
    });
  }

  try {
    const data = await genresService.getById(genreId);

    res.status(200).json({
      status: "success",
      message: "ok",
      data
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

const create = async (req: Request, res: Response) => {
  const body = req.body;

  // Checking for missing required fields using the bodyRequirer helper
  const missingFields = await bodyRequirer({ body, requiredFields });

  // If there are missing fields, respond with a 400 error
  if (missingFields) {
    return res.status(400).json({
      status: "error",
      message: missingFields,
    });
  }

  try {
    const data = await genresService.create(body);

    res.status(201).json({
      status: "success",
      message: "ok",
      data
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

const updateById = async (req: Request, res: Response) => {
  const { genreId } = req.params;
  const body = req.body;

  if (!genreId) {
    return res.status(400).json({
      status: "error",
      message: "Invalid genre ID",
    });
  }

  // Checking for missing required fields using the bodyRequirer helper
  const missingFields = await bodyRequirer({ body, requiredFields });

  // If there are missing fields, respond with a 400 error
  if (missingFields) {
    return res.status(400).json({
      status: "error",
      message: missingFields,
    });
  }

  try {
    const data = await genresService.updateById(
      genreId,
      body
    );

    res.status(200).json({
      status: "success",
      message: "ok",
      data
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

const deleteById = async (req: Request, res: Response) => {
  const { genreId } = req.params;

  if (!genreId) {
    return res.status(400).json({
      status: "error",
      message: "Invalid genre ID",
    });
  }

  try {
    const data = await genresService.deleteById(
      genreId
    );

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

export {
  create ,
  getAll,
  getById ,
  updateById ,
  deleteById ,
};
