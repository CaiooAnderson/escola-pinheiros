import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUp, CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export type Promotion = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  startDate: string;
  endDate: string;
};

const promotionSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  image: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, "Arquivo inválido"),
  startDate: z.string().min(1, "A data de início é obrigatória"),
  endDate: z.string().min(1, "A data de término é obrigatória"),
});

type PromotionFormData = z.infer<typeof promotionSchema>;

interface PromotionFormProps {
  promotion?: Promotion & { previewUrl?: string };
  onSave: (promotionData: FormData) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export default function PromotionForm({
  promotion,
  onSave,
  onCancel,
  isOpen,
}: PromotionFormProps) {
  const [preview, setPreview] = useState<string>("");

  const {
    handleSubmit,
    setValue,
    reset,
    register,
    watch,
    formState: { errors },
  } = useForm<PromotionFormData>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      name: promotion?.name || "",
      description: promotion?.description || "",
      image: undefined,
      startDate: promotion?.startDate || "",
      endDate: promotion?.endDate || "",
    },
  });

  useEffect(() => {
    if (promotion) {
      reset({
        name: promotion.name,
        description: promotion.description,
        image: undefined,
        startDate: promotion.startDate,
        endDate: promotion.endDate,
      });
      setPreview(promotion.previewUrl || promotion.imageUrl || "");
    } else {
      reset({
        name: "",
        description: "",
        image: undefined,
        startDate: "",
        endDate: "",
      });
      setPreview("");
    }
  }, [promotion, reset]);

  const onSubmit = (data: PromotionFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);

    if (data.image) {
      formData.append("image", data.image as File);
    }

    onSave(formData);
  };

  const [isStartPopoverOpen, setIsStartPopoverOpen] = useState(false);
  const [isEndPopoverOpen, setIsEndPopoverOpen] = useState(false);
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const toDayPickerDate = (isoDate: string) => {
    if (!isoDate) return undefined;
    const [year, month, day] = isoDate.split("-").map(Number);
    return new Date(year, month - 1, day, 12, 0, 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-h-[100vh] sm:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {promotion ? "Editar Promoção" : "Nova Promoção"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="flex flex-col">
            <Label htmlFor="name">Nome da promoção</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" {...register("description")} />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="image">Imagem da promoção</Label>
            <div
              className="group sm:w-70 sm:h-90 w-50 h-70 border border-gray-300 rounded cursor-pointer relative overflow-hidden mx-auto hover:bg-secondary-light/20 hover:border-secondary-light transition-colors duration-300"
              onClick={() => document.getElementById("imageInput")?.click()}
            >
              {!preview ? (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  <ImageUp className="w-12 h-12 transform transition-transform duration-300 group-hover:rotate-x-[-200deg]" />
                </div>
              ) : (
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
                  const file = e.target.files?.[0];
                  if (file) {
                    setValue("image", file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>

            {typeof errors.image?.message === "string" && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <Label>Data de início</Label>
            <Popover
              open={isStartPopoverOpen}
              onOpenChange={setIsStartPopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outlineSecondary"
                  className="w-full justify-start text-left font-normal"
                >
                  <span className="flex items-center text-text">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate
                      ? format(
                          toDayPickerDate(startDate)!,
                          "dd 'de' MMMM 'de' yyyy",
                          { locale: ptBR }
                        )
                      : "Selecione a data"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start" side="top">
                <Calendar
                  mode="single"
                  selected={startDate ? toDayPickerDate(startDate) : undefined}
                  onSelect={(d) => {
                    if (d) {
                      const iso = d.toISOString().split("T")[0];
                      setValue("startDate", iso);
                      setIsStartPopoverOpen(false);
                    }
                  }}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <Label>Data de término</Label>
            <Popover open={isEndPopoverOpen} onOpenChange={setIsEndPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outlineSecondary"
                  className="w-full justify-start text-left font-normal"
                >
                  <span className="flex items-center text-text">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate
                      ? format(
                          toDayPickerDate(endDate)!,
                          "dd 'de' MMMM 'de' yyyy",
                          { locale: ptBR }
                        )
                      : "Selecione a data"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start" side="top">
                <Calendar
                  mode="single"
                  selected={endDate ? toDayPickerDate(endDate) : undefined}
                  onSelect={(d) => {
                    if (d) {
                      const iso = d.toISOString().split("T")[0];
                      setValue("endDate", iso);
                      setIsEndPopoverOpen(false);
                    }
                  }}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate.message}</p>
            )}
          </div>

          <DialogFooter className="flex flex-row justify-center sm:justify-end gap-2 mt-4">
            <Button
              variant="destructive"
              className="w-30"
              type="button"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button className="w-30" type="submit">
              {promotion ? "Atualizar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
