import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Feedback } from "./FeedbackForm";
import Rating from "@/components/animations/Rating";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Smile } from "lucide-react";
import MarqueeEffect from "@/components/animations/MarqueeEffect";

interface FeedbackItemProps {
  feedback: Feedback;
  onEdit: () => void;
  onDelete: () => void;
}

export default function FeedbackItem({
  feedback,
  onEdit,
  onDelete,
}: FeedbackItemProps) {
  const MAX_LENGTH = 120;
  const isLong = feedback.comment.length > MAX_LENGTH;
  const preview = isLong
    ? feedback.comment.slice(0, MAX_LENGTH) + "..."
    : feedback.comment;

  return (
    <div className="flex flex-col gap-0 rounded-xl">
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

      <Card className="overflow-hidden border-muted-light hover:border-primary shadow-lg hover:shadow-primary/40 w-72 h-90 mx-auto">
        <CardContent className="flex flex-col items-center text-center p-6">
          <Avatar className="w-20 h-20 mb-4">
            <AvatarImage src={feedback.imageUrl} alt={feedback.name} />
            <AvatarFallback className="flex items-center justify-center bg-gray-200">
              <Smile className="w-10 h-10 text-gray-400" />
            </AvatarFallback>
          </Avatar>

          <h3 className="text-lg font-bold font-primary text-primary-dark mb-2">
            <MarqueeEffect className="sm:max-w-60 max-w-50">
              {feedback.name}
            </MarqueeEffect>
          </h3>

          <div className="mb-4">
            <Rating value={feedback.rating} />
          </div>

          <div className="flex flex-col items-center">
            <p className="text-muted-dark font-secondary italic text-center">
              "{preview}"
            </p>

            {isLong && (
              <Dialog>
                <DialogTrigger asChild>
                  <button className="mt-2 text-primary font-semibold hover:underline cursor-pointer">
                    Ler mais
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                  <DialogHeader className="flex flex-col items-center text-center gap-2">
                    <Avatar className="w-20 h-20 mb-2">
                      <AvatarImage
                        src={feedback.imageUrl}
                        alt={feedback.name}
                      />
                      <AvatarFallback className="flex items-center justify-center bg-gray-200">
                        <Smile className="w-10 h-10 text-gray-400" />
                      </AvatarFallback>
                    </Avatar>
                    <DialogTitle className="text-xl font-bold text-center font-primary text-primary-dark line-clamp-1">
                      <MarqueeEffect className="sm:max-w-80 max-w-60">
                        {feedback.name}
                      </MarqueeEffect>
                    </DialogTitle>
                    <Rating value={feedback.rating} />
                  </DialogHeader>
                  <DialogDescription className="text-muted-dark font-secondary leading-relaxed text-center">
                    "{feedback.comment}"
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
