import { Request, Response } from "express";
import { promotionService } from "./promotionServices";
import { s3Service } from "../../utils/s3Service";

export const promotionController = {
  async getAll(req: Request, res: Response) {
    try {
      const promotions = await promotionService.getAll();

      const promotionsWithUrls = await Promise.all(
        promotions.map(async (p) => ({
          ...p,
          imageUrl: p.image ? await s3Service.getSignedUrl(p.image) : null,
          startDate: p.startDate.toISOString().split("T")[0],
          endDate: p.endDate.toISOString().split("T")[0],
        }))
      );

      res.json(promotionsWithUrls);
    } catch (err) {
      res.status(500).json({ message: "Erro ao buscar promoções", error: err });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const promotion = await promotionService.getById(id);
      if (!promotion)
        return res.status(404).json({ message: "Promoção não encontrada." });

      const promotionWithUrl = {
        ...promotion,
        imageUrl: promotion.image
          ? await s3Service.getSignedUrl(promotion.image)
          : null,
        startDate: promotion.startDate.toISOString().split("T")[0],
        endDate: promotion.endDate.toISOString().split("T")[0],
      };

      res.json(promotionWithUrl);
    } catch (err) {
      res.status(500).json({ message: "Erro ao buscar promoção", error: err });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { name, description, startDate, endDate } = req.body;

      if (!name || !description || !startDate || !endDate) {
        return res.status(400).json({
          message:
            "Os campos 'name', 'description', 'startDate' e 'endDate' são obrigatórios",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message:
            "O campo 'image' é obrigatório e deve ser enviado como arquivo",
        });
      }

      const start = new Date(`${startDate}T00:00:00`);
      const end = new Date(`${endDate}T00:00:00`);

      const imageKey = await s3Service.uploadFile(req.file, "Promocoes");

      const promotion = await promotionService.create({
        name,
        description,
        startDate: start,
        endDate: end,
        image: imageKey,
      });

      const promotionWithUrl = {
        ...promotion,
        imageUrl: promotion.image
          ? await s3Service.getSignedUrl(promotion.image)
          : null,
        startDate: start.toISOString().split("T")[0],
        endDate: end.toISOString().split("T")[0],
      };

      res.status(201).json(promotionWithUrl);
    } catch (err: any) {
      res.status(500).json({
        message: "Erro ao criar promoção",
        error: err?.message ?? err,
      });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, startDate, endDate } = req.body;

      const existingPromotion = await promotionService.getById(id);
      if (!existingPromotion) {
        return res.status(404).json({ message: "Promoção não encontrada" });
      }

      const updateData: any = {};
      if (name) updateData.name = name;
      if (description) updateData.description = description;
      if (startDate) updateData.startDate = new Date(`${startDate}T00:00:00`);
      if (endDate) updateData.endDate = new Date(`${endDate}T00:00:00`);

      if (req.file) {
        const imageKey = await s3Service.uploadFile(req.file, "Promocoes");
        updateData.image = imageKey;
      }

      const promotion = await promotionService.update(id, updateData);

      const promotionWithUrl = {
        ...promotion,
        imageUrl: promotion.image
          ? await s3Service.getSignedUrl(promotion.image)
          : null,
        startDate: updateData.startDate
          ? updateData.startDate.toISOString().split("T")[0]
          : promotion.startDate.toISOString().split("T")[0],
        endDate: updateData.endDate
          ? updateData.endDate.toISOString().split("T")[0]
          : promotion.endDate.toISOString().split("T")[0],
      };

      res.json(promotionWithUrl);
    } catch (err: any) {
      res.status(500).json({
        message: "Erro ao atualizar promoção",
        error: err?.message ?? err,
      });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const existingPromotion = await promotionService.getById(id);
      if (!existingPromotion) {
        return res.status(404).json({ message: "Promoção não encontrada" });
      }

      await promotionService.remove(id);
      res.json({ message: "Promoção deletada com sucesso" });
    } catch (err: any) {
      res.status(500).json({
        message: "Erro ao deletar promoção",
        error: err?.message ?? err,
      });
    }
  },

  async cleanExpired(req: Request, res: Response) {
    try {
      const promotions = await promotionService.getAll();

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const expired = promotions.filter((p) => {
        const end = new Date(p.endDate);
        end.setHours(0, 0, 0, 0);
        return end < today;
      });

      if (expired.length === 0) {
        return res.json({ message: "Nenhuma promoção expirada encontrada." });
      }

      for (const promo of expired) {
        await promotionService.remove(promo.id);
      }

      res.json({
        message: `Foram removidas ${expired.length} promoções expiradas.`,
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao limpar promoções expiradas." });
    }
  },
};
