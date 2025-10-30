import { PrismaClient, Promotion } from "@prisma/client";

const prisma = new PrismaClient();

export const promotionRepository = {
  async findAll(): Promise<Promotion[]> {
    return prisma.promotion.findMany();
  },

  async findById(id: string): Promise<Promotion | null> {
    return prisma.promotion.findUnique({ where: { id } });
  },

  async create(data: Omit<Promotion, "id" | "createdAt" | "updatedAt">): Promise<Promotion> {
    return prisma.promotion.create({ data });
  },

  async update(id: string, data: Partial<Promotion>): Promise<Promotion> {
    return prisma.promotion.update({ where: { id }, data });
  },

  async remove(id: string): Promise<Promotion> {
    return prisma.promotion.delete({ where: { id } });
  },
};