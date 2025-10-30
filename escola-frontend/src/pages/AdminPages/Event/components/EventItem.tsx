import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Event } from "./EventForm";
import { useState } from "react";
import MarqueeEffect from "@/components/animations/MarqueeEffect";
import { ImageSkeleton } from "@/components/skeletons/ImageSkeleton";

interface EventItemProps {
  event: Event;
  onEditClick: () => void;
  onDelete: () => void;
}

export default function EventItem({
  event,
  onEditClick,
  onDelete,
}: EventItemProps) {
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    if (dateStr.includes("/")) return dateStr;
    if (dateStr.includes("-")) {
      const [year, month, day] = dateStr.split("-");
      return `${day}-${month}-${year}`;
    }
    return dateStr;
  };

  return (
    <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer border-muted-light hover:border-primary w-48 h-48">
          <CardContent className="p-0 w-full h-full relative">
            <ImageSkeleton
              src={event.imageUrl || event.image}
              alt={event.name}
              className="w-full h-full object-cover rounded"
            />
            <div className="absolute inset-0 rounded-md bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center">
              <span className="text-white font-semibold text-center p-2 overflow-hidden text-ellipsis whitespace-nowrap">
                {event.name}
              </span>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-lg rounded-xl p-6 shadow-primary-dark">
        <DialogHeader>
          <DialogTitle className="line-clamp-1 leading-normal flex justify-center sm:justify-start">
            <MarqueeEffect className="sm:max-w-112 max-w-60">
              {event.name}
            </MarqueeEffect>
          </DialogTitle>
          <DialogDescription className="flex flex-col">
            <div>
              Categorias: {event.categories.map((c) => c.name).join(", ")}{" "}
            </div>
            <div>Data do evento: {formatDate(event.eventAt)}</div>
          </DialogDescription>
        </DialogHeader>

        <ImageSkeleton
          src={event.imageUrl || event.image}
          alt={event.name}
          className="sm:w-100 sm:h-100 w-60 h-60 mt-4 mx-auto rounded-lg object-cover"
        />

        <div className="flex justify-end gap-2 mt-4">
          <Button size="sm" variant="default" onClick={onEditClick}>
            Editar
          </Button>
          <Button size="sm" variant="destructive" onClick={onDelete}>
            Deletar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
