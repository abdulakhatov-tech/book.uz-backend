import { Request, Response } from "express";

import { apiErrorHandler } from "../../errors";
import { bodyRequirer } from "../../helpers";
import { NewsService } from "../../services";

const requiredFields = ["title", "imgUrl", "type", "content"];

const newsService = new NewsService();

const getAll = async (req: Request, res: Response) => {
  try {
    const data = await newsService.getAll();

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (err) {
    return apiErrorHandler(res, err);
  }
};

const getById = async (req: Request, res: Response) => {
  const { newsId } = req.params;

  if (!newsId) {
    return res.status(400).json({
      status: "error",
      message: "Invalid news ID",
    });
  }

  try {
    const data = await newsService.getById(newsId);

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (err) {
    return apiErrorHandler(res, err);
  }
};

const create = async (req: Request, res: Response) => {
  const body = req.body;

  const missingFields = await bodyRequirer({ body, requiredFields });

  if (missingFields) {
    return res.status(400).json({
      status: "error",
      message: missingFields,
    });
  }

  const { type, book } = body;

  if (type === "newBook" && !book) {
    return res.status(400).json({
      status: "error",
      message: "New book announcements must include a book reference",
    });
  }

  try {
    const data = await newsService.create(body);

    res.status(201).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

const updateById = async (req: Request, res: Response) => {
  const { newsId } = req.params;
  const body = req.body;

  if (!newsId) {
    return res.status(400).json({
      status: "error",
      message: "Invalid news ID",
    });
  }

  const { type, book } = body;

  if (type === "newBook" && !book) {
    return res.status(400).json({
      status: "error",
      message: "New book announcements must include a book reference",
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
    const data = await newsService.updateById(newsId, body);

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

const deleteById = async (req: Request, res: Response) => {
  const { newsId } = req.params;

  if (!newsId) {
    return res.status(400).json({
      status: "error",
      message: "Invalid news ID",
    });
  }

  try {
    const data = await newsService.deleteById(newsId);

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

export { create, getAll, getById, updateById, deleteById };
