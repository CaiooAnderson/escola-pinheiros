import { Request, Response, NextFunction } from "express";
import { eventService } from "./eventServices";
import { s3Service } from "../../utils/s3Service";

function formatDateToDayMonthYear(date: Date | string) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return d.toISOString().split("T")[0].split("-").reverse().join("/");
}

export const eventController = {
  requireFile(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
      return res.status(400).json({
        status: 400,
        message: "Campo 'image' é obrigatório e deve ser enviado como file.",
      });
    }
    next();
  },

  forbidTextImage(req: Request, res: Response, next: NextFunction) {
    if (req.body && typeof req.body.image === "string") {
      return res.status(400).json({
        status: 400,
        message: "Não envie 'image' como texto. Use upload de arquivo.",
      });
    }
    next();
  },

  async getAll(req: Request, res: Response) {
    try {
      const events = await eventService.getAll();

      const eventsWithUrls = await Promise.all(
        events.map(async (event) => ({
          ...event,
          imageUrl: await s3Service.getSignedUrl(event.image),
          eventAt: formatDateToDayMonthYear(event.eventAt),
        }))
      );

      res.status(200).json({
        status: 200,
        message: "Eventos listados com sucesso.",
        data: eventsWithUrls,
      });
    } catch {
      res.status(500).json({
        status: 500,
        message: "Erro ao buscar eventos.",
      });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const event = await eventService.getById(id);
      if (!event)
        return res.status(404).json({
          status: 404,
          message: "Evento não encontrado.",
        });

      const eventWithUrl = {
        ...event,
        imageUrl: await s3Service.getSignedUrl(event.image),
        eventAt: formatDateToDayMonthYear(event.eventAt),
      };

      res.status(200).json({
        status: 200,
        message: "Evento encontrado.",
        data: eventWithUrl,
      });
    } catch {
      res.status(500).json({
        status: 500,
        message: "Erro ao buscar evento.",
      });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { name, categoriesIds, eventAt } = req.body;

      if (!req.file) {
        return res.status(400).json({
          status: 400,
          message: "Campo 'image' é obrigatório.",
        });
      }

      const imageKey = await s3Service.uploadFile(req.file, "Eventos");

      const parsedCategories =
        typeof categoriesIds === "string"
          ? JSON.parse(categoriesIds)
          : categoriesIds;

      const parsedDate = new Date(eventAt);
      parsedDate.setHours(0, 0, 0, 0);

      const event = await eventService.create({
        name,
        image: imageKey,
        eventAt: parsedDate,
        categoriesIds: parsedCategories,
      });

      const imageUrl = event.image
        ? await s3Service.getSignedUrl(event.image)
        : null;

      res.status(201).json({
        status: 201,
        message: "Evento criado com sucesso.",
        data: {
          ...event,
          imageUrl,
          eventAt: formatDateToDayMonthYear(event.eventAt),
        },
      });
    } catch (err: any) {
      res.status(500).json({
        status: 500,
        message: "Erro ao criar evento.",
        error: err?.message ?? String(err),
      });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedData: any = { ...req.body };

      if (req.file) {
        const imageKey = await s3Service.uploadFile(req.file, "Eventos");
        updatedData.image = imageKey;
      }

      if (updatedData.eventAt) {
        const d = new Date(updatedData.eventAt);
        d.setHours(0, 0, 0, 0);
        updatedData.eventAt = d;
      }

      const event = await eventService.update(id, updatedData);

      const eventWithUrl = {
        ...event,
        imageUrl: await s3Service.getSignedUrl(event.image),
        eventAt: formatDateToDayMonthYear(event.eventAt),
      };

      res.status(200).json({
        status: 200,
        message: "Evento atualizado com sucesso.",
        data: eventWithUrl,
      });
    } catch (err: any) {
      if (err.code === "P2025") {
        return res.status(404).json({
          status: 404,
          message: "Evento não encontrado.",
        });
      }

      res.status(500).json({
        status: 500,
        message: "Erro ao atualizar evento.",
        error: err?.message ?? String(err),
      });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await eventService.remove(id);
      res.status(200).json({
        status: 200,
        message: "Evento deletado com sucesso.",
        data: deleted,
      });
    } catch (err: any) {
      if (err.code === "P2025") {
        return res.status(404).json({
          status: 404,
          message: "Evento não encontrado.",
        });
      }

      res.status(500).json({
        status: 500,
        message: "Erro ao deletar evento.",
        error: err?.message ?? String(err),
      });
    }
  },

  async getCategories(req: Request, res: Response) {
    try {
      const categories = await eventService.getCategories();
      res.status(200).json({
        status: 200,
        message: "Categorias listadas com sucesso.",
        data: categories,
      });
    } catch {
      res.status(500).json({
        status: 500,
        message: "Erro ao buscar categorias.",
      });
    }
  },
};
