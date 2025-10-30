import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import multer from "multer";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("ErrorHandler:", err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Erro na validação",
      issues: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        error: "Arquivo muito grande. Máximo de 5MB permitido.",
      });
    }
    return res.status(400).json({
      error: "Upload error",
      details: err.message,
    });
  }

  if ((err as any)?.code === "INVALID_FILE_TYPE") {
    return res.status(400).json({
      error: "Tipo de imagem inválida. Use webp, jpg, jpeg, png ou svg.",
    });
  }

  if (typeof err === "object" && err !== null && "code" in err && "clientVersion" in err) {
    return res.status(500).json({
      error: "Database error",
      details: (err as any).message,
    });
  }

  return res.status((err as any)?.status || 500).json({
    error: (err as any)?.message || "Erro do Servidor Interno",
  });
}