import { Request, Response } from "express";
import * as feedbackService from "./feedbackServices";
import { s3Service } from "../../utils/s3Service";

export const createFeedback = async (req: Request, res: Response) => {
  try {
    const { name, rating, comment } = req.body;

    if (!name || !rating || !comment) {
      return res.status(400).json({
        status: "error",
        message: "Os campos 'name', 'rating' e 'comment' são obrigatórios.",
      });
    }

    const parsedRating = parseFloat(rating);
    if (
      isNaN(parsedRating) ||
      parsedRating < 1 ||
      parsedRating > 5 ||
      parsedRating * 2 !== Math.floor(parsedRating * 2)
    ) {
      return res.status(400).json({
        status: "error",
        message:
          "O campo 'rating' deve ser um número entre 1 e 5, aceitando apenas incrementos de 0.5.",
      });
    }

    const imageKey = req.file
      ? await s3Service.uploadFile(req.file, "Feedbacks")
      : undefined;

    const feedback = await feedbackService.createFeedback({
      name,
      image: imageKey || "",
      rating: parsedRating,
      comment,
    });

    const imageUrl = feedback.image
      ? await s3Service.getSignedUrl(feedback.image)
      : null;

    return res.status(201).json({
      status: "success",
      message: "Feedback criado com sucesso.",
      data: { ...feedback, imageUrl },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Erro ao criar feedback.",
      error,
    });
  }
};

export const getAllFeedbacks = async (req: Request, res: Response) => {
  try {
    const feedbacks = await feedbackService.getAllFeedbacks();

    const feedbacksWithUrls = await Promise.all(
      feedbacks.map(async (f) => ({
        ...f,
        imageUrl: f.image ? await s3Service.getSignedUrl(f.image) : null,
      }))
    );

    return res.json({
      status: "success",
      data: feedbacksWithUrls,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Erro ao buscar feedbacks.",
      error,
    });
  }
};

export const getFeedbackById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const feedback = await feedbackService.getFeedbackById(id);

    if (!feedback) {
      return res.status(404).json({
        status: "error",
        message: "Feedback não encontrado.",
      });
    }

    const feedbackWithUrl = {
      ...feedback,
      imageUrl: feedback.image
        ? await s3Service.getSignedUrl(feedback.image)
        : null,
    };

    return res.json({
      status: "success",
      data: feedbackWithUrl,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Erro ao buscar feedback.",
      error,
    });
  }
};

export const updateFeedback = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, rating, comment } = req.body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (comment) updateData.comment = comment;

    if (rating) {
      const parsedRating = parseFloat(rating);
      if (
        isNaN(parsedRating) ||
        parsedRating < 1 ||
        parsedRating > 5 ||
        parsedRating * 2 !== Math.floor(parsedRating * 2)
      ) {
        return res.status(400).json({
          status: "error",
          message:
            "O campo 'rating' deve ser um número entre 1 e 5, aceitando apenas incrementos de 0.5.",
        });
      }
      updateData.rating = parsedRating;
    }

    if (req.file) {
      const imageKey = await s3Service.uploadFile(req.file, "Feedbacks");
      updateData.image = imageKey;
    }

    const updatedFeedback = await feedbackService.updateFeedback(
      id,
      updateData
    );

    const feedbackWithUrl = {
      ...updatedFeedback,
      imageUrl: updatedFeedback.image
        ? await s3Service.getSignedUrl(updatedFeedback.image)
        : null,
    };

    return res.json({
      status: "success",
      message: "Feedback atualizado com sucesso.",
      data: feedbackWithUrl,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        status: "error",
        message: "Feedback não encontrado.",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Erro ao atualizar feedback.",
      error,
    });
  }
};

export const deleteFeedback = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await feedbackService.deleteFeedback(id);

    return res.json({
      status: "success",
      message: "Feedback deletado com sucesso.",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        status: "error",
        message: "Feedback não encontrado.",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Erro ao deletar feedback.",
      error,
    });
  }
};
