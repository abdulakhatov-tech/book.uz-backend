import { Request, Response, Router } from 'express';
import { apiErrorHandler } from '../../errors';
import { AuthorsService } from '../../services';
import { bodyRequirer } from '../../helpers';

const authorsService = new AuthorsService();

const requiredFields = ['fullName', 'biography']

const getAllAuthorsController = async(req: Request, res: Response) => {
    const { page = 1, limit = 20 } = req.query;

     // Convert page and limit to numbers and validate them
     const pageNumber = parseInt(page as string, 10);
     const limitNumber = parseInt(limit as string, 10);

     if (isNaN(pageNumber) || pageNumber < 1 || isNaN(limitNumber) || limitNumber < 1) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid pagination parameters'
        });
    }

    try {
        const data = await authorsService.getAllAuthors(pageNumber, limitNumber);

        res.status(200).json({
            status:'success',
            message: 'ok',
            ...data
        });
    } catch (error) {
        return apiErrorHandler(res, error);
    }
}

const createAuthorController = async(req: Request, res: Response) => {
    const body = req.body;

    const missingFields = await bodyRequirer({body, requiredFields});

    if(missingFields) {
        return res.status(400).json({
            status: 'error',
            message: missingFields
        });
    }

    try {
        const data = await authorsService.createAuthor(body);

        res.status(201).json({
            status:'success',
            message: 'ok',
            data
        });

    } catch(error) {
        return apiErrorHandler(res, error);
    }
}

const getAuthorByIdController = async(req: Request, res: Response) => {
    const { authorId } = req.params;

    if(!authorId) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid author ID'
        });
    }

    try {
        const data = await authorsService.getAuthorById(authorId);

        res.status(200).json({
            status:'success',
            message: 'ok',
            data
        });
    } catch(error) {
        return apiErrorHandler(res, error);
    }
}

const updateAuthorByIdController = async(req: Request, res: Response) => {
    const { authorId } = req.params;
    const body = req.body;

    if(!authorId) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid author ID'
        });
    }

    const missingFields = await bodyRequirer({body, requiredFields});

    if(missingFields) {
        return res.status(400).json({
            status: 'error',
            message: missingFields
        });
    }

    try {
        const data = await authorsService.updateAuthorById(authorId, body);

        res.status(200).json({
            status:'success',
            message: 'ok',
            data
        });
    } catch(error) {
        return apiErrorHandler(res, error);
    }
}

const deleteAuthorByIdController = async(req: Request, res: Response) => {
    const { authorId } = req.params;
    
    if(!authorId) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid author ID'
        });
    }

    try {
        await authorsService.deleteAuthorById(authorId);
        
        res.status(204).json({
            status:'success',
            message: 'ok'
        });


    } catch(error) {
        return apiErrorHandler(res, error);
    }
}

export {
    getAllAuthorsController as getAllAuthors,
    createAuthorController as createAuthor,
    getAuthorByIdController as getAuthorById,
    updateAuthorByIdController as updateAuthorById,
    deleteAuthorByIdController as deleteAuthorById
}