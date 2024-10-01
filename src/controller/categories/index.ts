import { Request, Response } from "express";

import { apiErrorHandler } from "../../errors";
import { CategoriesService } from "../../services";

const categoriesService = new CategoriesService();

const getNewAgeLibraryBooksController = async (req: Request, res: Response) => {
    try {
        const books = await categoriesService.getNewAgeLibraryBooks();

        res.status(200).json({
            status:'success',
            message: 'ok',
            data: {
                imgUrl: "",
                name: "Yangi Asr Kutubxonasi",
                books,
            }
        });
    } catch(error) {
        return apiErrorHandler(res, error);
    }
}

const getNewlyArrivedBooksController = async (req:Request, res: Response) => {
    try {
        const books = await categoriesService.getNewlyArrivedBooks();

        res.status(200).json({
            status:'success',
            message: 'ok',
            data: {
                imgUrl: "",
                name: "Yangi kelgan kitoblar",
                books,
            }
        });
    } catch(error) {
        return apiErrorHandler(res, error);
    }
}

const getRecentlyPublishedBooksController = async (req:Request, res: Response) => {
    try {
        const books = await categoriesService.getRecentlyPublishedBooks();

        res.status(200).json({
            status:'success',
            message: 'ok',
            data: {
                imgUrl: "",
                name: "Yangi nashr qilingan kitoblar",
                books,
            }
        });
    } catch(error) {
        return apiErrorHandler(res, error);
    }
};

export { 
    getNewAgeLibraryBooksController as getNewAgeLibraryBooks,
    getNewlyArrivedBooksController as getNewlyArrivedBooks,
    getRecentlyPublishedBooksController as getRecentlyPublishedBooks
};