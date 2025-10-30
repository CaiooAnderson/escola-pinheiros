import { faqRepository } from "./faqRepository";

export const faqService = {
  getAll: () => faqRepository.findAll(),
  getById: (id: string) => faqRepository.findById(id),
  create: (data: { question: string; answer: string }) => faqRepository.create(data),
  update: (id: string, data: { question?: string; answer?: string }) =>
    faqRepository.update(id, data),
  remove: (id: string) => faqRepository.remove(id),
};