import { Request, Response } from "express";
import { faqService } from "./faqServices";

export const faqController = {
  async getAll(req: Request, res: Response) {
    const faqs = await faqService.getAll();
    return res.json({ status: "success", data: faqs });
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const faq = await faqService.getById(id);
    if (!faq) {
      return res
        .status(404)
        .json({ status: "error", message: "FAQ não encontrada." });
    }
    return res.json({ status: "success", data: faq });
  },

  async create(req: Request, res: Response) {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "Questão e resposta são obrigatórias.",
        });
    }
    const faq = await faqService.create({ question, answer });
    return res.status(201).json({ status: "success", data: faq });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { question, answer } = req.body;

    try {
      const faq = await faqService.update(id, { question, answer });
      return res.json({ status: "success", data: faq });
    } catch {
      return res
        .status(404)
        .json({ status: "error", message: "FAQ não encontrada." });
    }
  },

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await faqService.remove(id);
      return res.json({
        status: "success",
        message: "FAQ deletada com sucesso.",
      });
    } catch {
      return res
        .status(404)
        .json({ status: "error", message: "FAQ não encontrada." });
    }
  },
};
