import { PrismaClient, FAQ } from "@prisma/client";

const prisma = new PrismaClient();

export const faqRepository = {
  async findAll(): Promise<FAQ[]> {
    return prisma.fAQ.findMany();
  },

  async findById(id: string): Promise<FAQ | null> {
    return prisma.fAQ.findUnique({ where: { id } });
  },

  async create(data: Omit<FAQ, "id">): Promise<FAQ> {
    return prisma.fAQ.create({ data });
  },

  async update(id: string, data: Partial<FAQ>): Promise<FAQ> {
    return prisma.fAQ.update({ where: { id }, data });
  },

  async remove(id: string): Promise<FAQ> {
    return prisma.fAQ.delete({ where: { id } });
  },
};