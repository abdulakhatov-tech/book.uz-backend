import { Response } from "express";
import { z } from "zod";

export const apiErrorHandler = (res: Response, error: any) => {

  if (error instanceof z.ZodError) {
    return res.status(400).json({
      status: "error",
      message: error.errors.map(e => e.message).join(", "),
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