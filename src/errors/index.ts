import { Response } from "express";
import { z } from "zod";

export const apiErrorHandler = (res: Response, error: any) => {

  if (error instanceof z.ZodError) {
    const zodErrors = error.errors.map((err) => ({
      path: err.path.join('.'), // Join the path array to make it readable (e.g., 'user.name')
      message: err.message,
    }));

    return res.status(400).json({
      status: "error",
      message: "Validation error",
      errors: zodErrors, // Return detailed field-specific errors
    });
  }

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