import { Request, Response } from "express";
import { apiErrorHandler } from "../../errors";
import { BooksService } from "../../services";
import { bodyRequirer } from "../../helpers";

const requiredFields = [
  "name",
  "genre",
  "author",
  "amount",
  "bookPrice",
  "language",
  "cover",
  "numberOfPage",
  "state",
  "year",
  "barcode",
  "description",
  "imgUrl",
  "additionalImages",
];

const booksService = new BooksService();

const getAll = async (req: Request, res: Response) => {
  try {
    const {
      page = "1",
      limit = "9",
      genreIds = "",
      fromPrice = "0",
      toPrice = "1000000",
      language = "",
      authorIds = "",
      sort = "createdAt",
      asc = "-1",
    } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const fromPriceNum = parseFloat(fromPrice as string);
    const toPriceNum = parseFloat(toPrice as string);
    const ascNum = parseInt(asc as string, 10);

    // Construct filters, only include if defined and valid
    const filters: Record<string, any> = {};

    if (genreIds) filters.genreIds = genreIds;
    if (!isNaN(fromPriceNum)) filters.fromPrice = fromPriceNum;
    if (!isNaN(toPriceNum)) filters.toPrice = toPriceNum;
    if (language) filters.language = language;
    if (authorIds) filters.authorIds = authorIds;

    const { books, totalBooks, totalPages } = await booksService.getAllBooks({
      page: pageNum,
      limit: limitNum,
      sort,
      asc: ascNum,
      filters,
    });

    // Return a well-structured JSON response
    return res.status(200).json({
      status: "success",
      message: "Books fetched successfully",
      data: books || [],
      pagination: {
        totalBooks,
        totalPages,
        currentPage: pageNum,
        limit: limitNum,
      },
    });
  } catch (error) {
    // Handle errors with proper context
    return apiErrorHandler(res, error);
  }
};

const getById = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  if (!bookId) {
    return res.status(400).json({
      status: "error",
      message: "Invalid book ID",
    });
  }

  try {
    const data = await booksService.getBookById(bookId);

    res.status(200).json({
      status: "success",
      message: "ok",
      data,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
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

  try {
    const data = await booksService.createBook(body);

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
  const { bookId } = req.params;
  const body = req.body;

  const missingFields = await bodyRequirer({ body, requiredFields });

  if (missingFields) {
    return res.status(400).json({
      status: "error",
      message: missingFields,
    });
  }

  try {
    const data = await booksService.updateBookById(bookId, body);
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
  const { bookId } = req.params;
  try {
    await booksService.deleteBookById(bookId);

    res.status(204).json({
      status: "success",
      message: "ok",
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

export { getAll, create, updateById, deleteById, getById };
