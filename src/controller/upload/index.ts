import fs from "fs/promises"; // Use promises version of fs
import { Request, Response } from "express";
import { apiErrorHandler } from "../../errors";
import cloudinary from "../../config/cloudinaryConfig";

// Extend Request interface to include multer's file
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const uploadImage = async (req: MulterRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "book-uz",
    });

    // Remove the file from the local filesystem asynchronously
    await fs.unlink(req.file.path);

    // Respond with the image URL
    return res.status(200).json({
      message: "success",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    return apiErrorHandler(res, error);
  }
};

export { uploadImage };
