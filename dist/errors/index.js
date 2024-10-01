"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = void 0;
const apiErrorHandler = (res, error) => {
    // Default status code and message
    let statusCode = error.statusCode || 500;
    let message = error.message || "Something went wrong";
    // Customizing error responses based on status codes
    switch (statusCode) {
        case 400:
            message = message || "Bad Request";
            break;
        case 401:
            message = message || "Unauthorized";
            break;
        case 403:
            message = message || "Forbidden";
            break;
        case 404:
            message = message || "Not Found";
            break;
        case 500:
            message = message || "Internal Server Error";
            break;
        default:
            statusCode = 500;
            message = "Something went wrong";
            break;
    }
    // Sending the response
    res.status(statusCode).json({
        status: "error",
        message,
    });
};
exports.apiErrorHandler = apiErrorHandler;
