import { Request, Response, NextFunction } from "express";

export function requireFile(fieldName = "image") {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.body && typeof req.body.image === "string") {
      return res.status(400).json({
        status: "error",
        message: `Image must be uploaded as a file in field "${fieldName}", not as text.`,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: `Image file is required in field "${fieldName}".`,
      });
    }
    next();
  };
}