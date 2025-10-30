import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Promotion } from "./PromotionForm";
import { ImageSkeleton } from "@/components/skeletons/ImageSkeleton";

interface PromotionItemProps {
  promotion: Promotion;
  onEdit: () => void;
  onDelete: () => void;
}

export default function PromotionItem({
  promotion,
  onEdit,
  onDelete,
}: PromotionItemProps) {
  const [open, setOpen] = useState(false);

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("pt-BR");
  };

  return (
    <>
      <div className="flex flex-col gap-0 rounded-xl w-[260px]">
        <div className="flex justify-end gap-2 mx-2">
          <Button
            size="sm"
            className="rounded-b-none"
            variant="outline"
            onClick={onEdit}
          >
            Editar
          </Button>
          <Button
            size="sm"
            className="rounded-b-none"
            variant="destructive"
            onClick={onDelete}
          >
            Deletar
          </Button>
        </div>

        <Card
          className="cursor-pointer overflow-hidden border-muted-light hover:border-primary shadow-lg hover:shadow-primary/40 w-[260px] h-[380px] mx-auto"
          onClick={() => setOpen(true)}
        >
          <CardContent className="flex flex-col h-full p-0">
            <div className="flex-1 min-h-0">
              {" "}
              <ImageSkeleton
                src={promotion.imageUrl}
                alt={promotion.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white p-3 text-sm font-secondary text-gray-700">
              <p>
                <strong>Início:</strong> {formatDate(promotion.startDate)}
              </p>
              <p>
                <strong>Fim:</strong> {formatDate(promotion.endDate)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-primary text-primary-dark sm:line-clamp-2 line-clamp-4">
              {promotion.name}
            </DialogTitle>
            <DialogDescription className="text-muted-dark font-secondary line-clamp-6">
              {promotion.description}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <ImageSkeleton
              src={promotion.imageUrl}
              alt={promotion.name}
              className="w-full max-h-fit object-cover rounded-lg"
            />
            <div className="mt-4 text-text text-sm flex flex-col sm:items-start items-center">
              <p>
                <strong>Início:</strong> {formatDate(promotion.startDate)}
              </p>
              <p>
                <strong>Fim:</strong> {formatDate(promotion.endDate)}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
