import { useEffect, useState } from "react";
import FeedbackForm, { Feedback } from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import AdminHeader from "@/components/global/AdminHeader";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/feedbacks`);
      if (!res.ok) throw new Error("Erro ao buscar feedbacks");
      const data = await res.json();
      setFeedbacks(data.data || []);
    } catch (err) {
      toast.error("Não foi possível carregar os feedbacks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSaveFeedback = async (payload: FormData, id?: string) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      const res = await fetch(`${API_URL}/feedbacks${id ? `/${id}` : ""}`, {
        method: id ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      if (!res.ok) {
        const errRes = await res.json().catch(() => ({}));
        throw new Error(errRes.message || "Erro ao salvar feedback");
      }

      const json = await res.json();
      const savedFeedback = json.data;

      if (id) {
        setFeedbacks((prev) =>
          prev.map((f) => (f.id === savedFeedback.id ? savedFeedback : f))
        );
        toast.success("Feedback atualizado!");
      } else {
        setFeedbacks((prev) => [...prev, savedFeedback]);
        toast.success("Feedback criado!");
      }

      setIsFormOpen(false);
      setSelectedFeedback(null);
    } catch (err: any) {
      toast.error(err.message || "Erro ao salvar feedback");
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      const res = await fetch(`${API_URL}/feedbacks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erro ao deletar feedback");

      setFeedbacks((prev) => prev.filter((f) => f.id !== id));
      toast.success("Feedback deletado!");
    } catch (err) {
      toast.error("Erro ao deletar feedback");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 py-30">
      <AdminHeader
        title="Feedbacks"
        buttonLabel="Novo Feedback"
        onButtonClick={() => setIsFormOpen(true)}
      />

      <FeedbackList
        feedbacks={feedbacks}
        loading={loading}
        onEdit={(fb) => {
          setSelectedFeedback(fb);
          setIsFormOpen(true);
        }}
        onDelete={handleDeleteFeedback}
      />

      {isFormOpen && (
        <FeedbackForm
          feedback={selectedFeedback ?? undefined}
          onSave={handleSaveFeedback}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedFeedback(null);
          }}
          isOpen={isFormOpen}
        />
      )}
    </div>
  );
}
