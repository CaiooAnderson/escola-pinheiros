import { promotionRepository } from "./promotionRepository";

export const promotionService = {
  getAll: () => promotionRepository.findAll(),
  getById: (id: string) => promotionRepository.findById(id),
  create: (data: any) => promotionRepository.create(data),
  update: (id: string, data: any) => promotionRepository.update(id, data),
  remove: (id: string) => promotionRepository.remove(id),
};