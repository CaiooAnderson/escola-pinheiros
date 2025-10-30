import { eventRepository } from "./eventRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const eventService = {
  getAll: () => eventRepository.findAll(),
  getById: (id: string) => eventRepository.findById(id),
  create: (data: any) => eventRepository.create(data),
  update: (id: string, data: any) => eventRepository.update(id, data),
  remove: (id: string) => eventRepository.remove(id),

  getCategories: () => prisma.eventCategory.findMany(),
};
