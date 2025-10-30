import { Request, Response } from "express";
import { loginService } from "./authServices";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "key";
const JWT_EXPIRES_IN = "12h";

export const authController = {
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email e senha são obrigatórios" });
      }

      const isValid = loginService(email, password);
      if (!isValid) {
        return res.status(401).json({ message: "Email ou senha inválidos" });
      }

      const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
      });
      res.json({ token, role: "admin" });
    } catch (err) {
      res.status(500).json({ message: "Erro ao fazer login", error: err });
    }
  },
};
