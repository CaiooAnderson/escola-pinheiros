import prisma from "../../config/db";

export const createFeedback = (data: {
  name: string;
  image: string;
  rating: number;
  comment: string;
}) => {
  return prisma.feedback.create({ data });
};

export const getAllFeedbacks = () => {
  return prisma.feedback.findMany();
};

export const getFeedbackById = (id: string) => {
  return prisma.feedback.findUnique({ where: { id } });
};

export const updateFeedback = (id: string, data: any) => {
  return prisma.feedback.update({ where: { id }, data });
};

export const deleteFeedback = (id: string) => {
  return prisma.feedback.delete({ where: { id } });
};