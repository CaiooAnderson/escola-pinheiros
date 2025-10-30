import { useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

interface FAQFormProps {
  faq?: FAQ;
  isOpen: boolean;
  onSave: (data: Omit<FAQ, "id">) => void;
  onCancel: () => void;
}

const faqSchema = z.object({
  question: z.string().nonempty("A pergunta é obrigatória"),
  answer: z.string().nonempty("A resposta é obrigatória"),
});

type FAQFormValues = z.infer<typeof faqSchema>;

export default function FAQForm({
  faq,
  isOpen,
  onSave,
  onCancel,
}: FAQFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FAQFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  useEffect(() => {
    if (faq) {
      reset({
        question: faq.question,
        answer: faq.answer,
      });
    } else {
      reset({
        question: "",
        answer: "",
      });
    }
  }, [faq, reset]);

  const onSubmit = (data: FAQFormValues) => {
    onSave(data);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-h-[100vh] sm:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{faq ? "Editar Pergunta" : "Nova Pergunta"}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div>
            <Label htmlFor="question">Pergunta</Label>
            <Input id="question" {...register("question")} />
            {errors.question && (
              <p className="text-red-500 text-sm">{errors.question.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="answer">Resposta</Label>
            <Textarea id="answer" rows={4} {...register("answer")} />
            {errors.answer && (
              <p className="text-red-500 text-sm">{errors.answer.message}</p>
            )}
          </div>

          <div className="flex sm:justify-end justify-center gap-2">
            <Button
              variant="destructive"
              type="button"
              className="w-30"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button type="submit" className="w-30">
              {faq ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
