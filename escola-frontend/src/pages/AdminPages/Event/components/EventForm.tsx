import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Checkbox } from "@/components/ui/checkbox";

export type EventCategory = {
  id: string;
  name: string;
};

export type Event = {
  id: string;
  name: string;
  image: string;
  imageUrl?: string;
  categories: EventCategory[];
  eventAt: string;
};

interface EventFormProps {
  event?: Event;
  isOpen: boolean;
  onSave: (data: FormData, id?: string) => void;
  onCancel: () => void;
}

const apiBase =
  import.meta.env.VITE_API_URL || "https://dirijasemcomplicar.onrender.com";

export default function EventForm({
  event,
  isOpen,
  onSave,
  onCancel,
}: EventFormProps) {
  const eventSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    image: event
      ? z.any().optional()
      : z.any().refine((file) => file instanceof File, {
          message: "A imagem é obrigatória",
        }),
    categories: z
      .array(z.string())
      .min(1, "Selecione pelo menos uma categoria"),
    eventAt: z.string().min(1, "A data do evento é obrigatória"),
  });

  type EventFormValues = z.infer<typeof eventSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
      image: undefined,
      categories: [],
      eventAt: "",
    },
  });

  const [preview, setPreview] = useState<string>(event?.imageUrl || "");
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [isEventPopoverOpen, setIsEventPopoverOpen] = useState(false);
  const eventAt = watch("eventAt");

  const toDayPickerDate = (isoDate: string) => {
    if (!isoDate) return undefined;
    const [year, month, day] = isoDate.split("-").map(Number);
    return new Date(year, month - 1, day, 12, 0, 0);
  };

  useEffect(() => {
    fetch(`${apiBase}/events/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.data || []))
      .catch(console.error);
  }, []);

  const apiDateToInput = (d?: string) => {
    if (!d) return "";
    if (d.includes("/")) {
      const [day, month, year] = d.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return d;
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        name: event?.name || "",
        image: undefined,
        categories: event?.categories?.map((c) => c.id) || [],
        eventAt: apiDateToInput(event?.eventAt),
      });
      setPreview(event?.imageUrl || "");
    }
  }, [isOpen, event, reset]);

  const onSubmit = (data: EventFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("eventAt", data.eventAt);

    data.categories.forEach((catId) => {
      formData.append("categoriesIds[]", catId);
    });

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    onSave(formData, event?.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event ? "Editar Evento" : "Novo Evento"}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="flex flex-col">
            <Label htmlFor="name">Nome do Evento</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Label>Imagem do Evento</Label>
            <div
              className="group w-40 h-40 border border-gray-300 hover:bg-primary-light/20 hover:border-primary-light rounded cursor-pointer relative overflow-hidden mx-auto"
              onClick={() => document.getElementById("imageInput")?.click()}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setPreview("")}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  <ImageUp className="w-12 h-12 transform transition-transform duration-300 group-hover:rotate-x-[-200deg]" />
                </div>
              )}

              <input
                id="imageInput"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image")}
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    const file = files[0];
                    setPreview(URL.createObjectURL(file));
                    setValue("image", file, { shouldValidate: true });
                  } else {
                    setPreview(event?.imageUrl || "");
                    setValue("image", undefined, { shouldValidate: true });
                  }
                }}
              />
            </div>
            {errors.image && !event && (
              <span className="text-red-500 text-center text-sm mt-1">
                {errors.image.message as string}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Label>Categoria(s)</Label>
            <div className="flex gap-4 flex-wrap mt-2">
              {categories.map((cat) => {
                const selected = watch("categories") || [];

                return (
                  <div key={cat.id} className="flex items-center gap-2">
                    <Checkbox
                      id={cat.id}
                      checked={selected.includes(cat.id)}
                      onCheckedChange={(checked) => {
                        const updated = checked
                          ? [...selected, cat.id]
                          : selected.filter((id: string) => id !== cat.id);

                        setValue("categories", updated, {
                          shouldValidate: true,
                        });
                      }}
                    />
                    <Label htmlFor={cat.id} className="cursor-pointer pb-0">
                      {cat.name}
                    </Label>
                  </div>
                );
              })}
            </div>
            {errors.categories && (
              <span className="text-red-500 text-sm mt-1">
                {errors.categories.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Label>Data do Evento</Label>
            <Popover
              open={isEventPopoverOpen}
              onOpenChange={setIsEventPopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal hover:bg-primary-light/20"
                >
                  <span className="flex items-center text-text">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {eventAt
                      ? format(
                          toDayPickerDate(eventAt)!,
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
                  selected={eventAt ? toDayPickerDate(eventAt) : undefined}
                  onSelect={(d) => {
                    if (d) {
                      const iso = d.toISOString().split("T")[0];
                      setValue("eventAt", iso, { shouldValidate: true });
                      setIsEventPopoverOpen(false);
                    }
                  }}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
            {errors.eventAt && (
              <span className="text-red-500 text-sm mt-1">
                {errors.eventAt.message}
              </span>
            )}
          </div>

          <div className="flex sm:justify-end justify-center gap-2 mt-4">
            <Button
              variant="destructive"
              type="button"
              className="w-30"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button type="submit" className="w-30">
              {event ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
