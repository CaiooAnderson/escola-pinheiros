import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUp } from "lucide-react";

export type Feedback = {
  id: string;
  name: string;
  image: string;
  imageUrl?: string;
  rating: number;
  comment: string;
};

interface FeedbackFormProps {
  feedback?: Feedback;
  onSave: (data: FormData, id?: string) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export default function FeedbackForm({
  feedback,
  onSave,
  onCancel,
  isOpen,
}: FeedbackFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<{
    name: string;
    rating: number;
    comment: string;
    image?: FileList;
  }>({
    defaultValues: {
      name: feedback?.name || "",
      rating: feedback?.rating || 0,
      comment: feedback?.comment || "",
    },
  });

  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      reset({
        name: feedback?.name || "",
        rating: feedback?.rating || 0,
        comment: feedback?.comment || "",
      });
      setPreview(feedback?.imageUrl || "");
    }
  }, [isOpen, feedback, reset]);

  const onSubmit = (data: {
    name: string;
    rating: number;
    comment: string;
    image?: FileList;
  }) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("rating", String(data.rating));
    formData.append("comment", data.comment);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    onSave(formData, feedback?.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-h-[100vh] sm:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {feedback ? "Editar Feedback" : "Novo Feedback"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="flex flex-col">
            <Label htmlFor="name">Nome da pessoa</Label>
            <Input
              id="name"
              {...register("name", { required: "Nome obrigatório" })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="image">Foto da pessoa</Label>
            <div
              className="group w-20 h-20 rounded-full border border-gray-300 hover:border-secondary-light hover:bg-secondary-light/20 cursor-pointer relative overflow-hidden mx-auto transition-colors duration-300"
              onClick={() => document.getElementById("imageInput")?.click()}
            >
              {!preview && (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  <ImageUp className="w-10 h-10 transform transition-transform duration-300 group-hover:rotate-x-[-200deg]" />
                </div>
              )}
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              )}
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    const file = files[0];
                    setPreview(URL.createObjectURL(file));
                    setValue("image", files);
                  }
                }}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <Label htmlFor="rating">Avaliação</Label>
            <Input
              id="rating"
              type="number"
              step="0.5"
              min="1"
              max="5"
              {...register("rating", { valueAsNumber: true })}
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="comment">Comentário</Label>
            <Textarea
              id="comment"
              {...register("comment", { required: "Comentário obrigatório" })}
            />
            {errors.comment && (
              <span className="text-red-500 text-sm mt-1">
                {errors.comment.message}
              </span>
            )}
          </div>

          <div className="flex justify-center sm:justify-end gap-2 mt-4">
            <Button
              variant="destructive"
              type="button"
              className="w-30"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button type="submit" className="w-30">
              {feedback ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
