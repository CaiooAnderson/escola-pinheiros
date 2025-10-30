import { PrismaClient, Event } from "@prisma/client";

const prisma = new PrismaClient();

export const eventRepository = {
  async findAll(): Promise<Event[]> {
    return prisma.event.findMany({
      include: { categories: true },
    });
  },

  async findById(id: string): Promise<Event | null> {
    return prisma.event.findUnique({
      where: { id },
      include: { categories: true },
    });
  },

  async create(data: {
    name: string;
    image: string;
    eventAt: Date;
    categoriesIds: string[];
  }): Promise<Event> {
    return prisma.event.create({
      data: {
        name: data.name,
        image: data.image,
        eventAt: data.eventAt,
        categories: {
          connect: data.categoriesIds.map((id) => ({ id })),
        },
      },
      include: { categories: true },
    });
  },

  async update(
    id: string,
    data: {
      name?: string;
      image?: string;
      eventAt?: Date;
      categoriesIds?: string[];
    }
  ): Promise<Event> {
    return prisma.event.update({
      where: { id },
      data: {
        name: data.name,
        image: data.image,
        eventAt: data.eventAt,
        ...(data.categoriesIds && {
          categories: { set: data.categoriesIds.map((id) => ({ id })) },
        }),
      },
      include: { categories: true },
    });
  },

  async remove(id: string): Promise<Event> {
    return prisma.event.delete({ where: { id } });
  },
};
