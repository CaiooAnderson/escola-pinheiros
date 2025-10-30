import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "key";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token ausente" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Token inválido" });
  }

  const token = parts[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;

    if (payload.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Acesso negado: apenas administradores" });
    }

    (req as any).admin = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
};
