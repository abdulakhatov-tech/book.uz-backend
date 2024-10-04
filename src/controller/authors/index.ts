import { Request, Response, Router } from "express";
import { apiErrorHandler } from "../../errors";
import { AuthorsService } from "../../services";
import { authorIdSchema, authorPaginationQuerySchema, createAuthorSchema, updateAuthorSchema } from "../../validators/authors.validation";

const authorsService = new AuthorsService();

const getAllAuthorsController = async (req: Request, res: Response) => {
  
  try {
    const { page, limit, search } = authorPaginationQuerySchema.parse(req.query);

    const data = await authorsService.getAllAuthors({
      page,
      limit,
      search: String(search)
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

const createAuthorController = async (req: Request, res: Response) => {
  
  try {
    const body =  createAuthorSchema.parse(req.body);

    const data = await authorsService.createAuthor(body);

    res.status(201).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

const getAuthorByIdController = async (req: Request, res: Response) => {
  try {
    const { authorId } = authorIdSchema.parse(req.params);

    const data = await authorsService.getAuthorById(authorId);

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

const updateAuthorByIdController = async (req: Request, res: Response) => {
  
  try {
    const { authorId } = authorIdSchema.parse(req.params);
    const body = updateAuthorSchema.parse(req.body);

    const data = await authorsService.updateAuthorById(authorId, body);

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

const deleteAuthorByIdController = async (req: Request, res: Response) => {
   try {
    const { authorId } = authorIdSchema.parse(req.params);

    await authorsService.deleteAuthorById(authorId);

    res.status(204).json({
      status: "success",
      message: "ok",
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

const getAuthorBooksController = async (req: Request, res: Response) => {
  try {
    const { authorId } = authorIdSchema.parse(req.params);

    const data = await authorsService.getAuthorBooks(authorId);

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
  getAllAuthorsController as getAllAuthors,
  createAuthorController as createAuthor,
  getAuthorByIdController as getAuthorById,
  updateAuthorByIdController as updateAuthorById,
  deleteAuthorByIdController as deleteAuthorById,
  getAuthorBooksController as getAuthorBooks,
};
