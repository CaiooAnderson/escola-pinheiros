import { useEffect, useState } from "react";
import AdminHeader from "@/components/global/AdminHeader";
import FAQForm, { FAQ } from "./components/FAQForm";
import FAQList from "./components/FAQList";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminFAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/faqs`);
      if (!res.ok) throw new Error("Erro ao buscar perguntas");
      const data = await res.json();
      setFaqs(data.data || []);
    } catch {
      toast.error("Não foi possível carregar as perguntas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleSave = async (data: Omit<FAQ, "id">, id?: string) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      const res = await fetch(`${API_URL}/faqs${id ? `/${id}` : ""}`, {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errRes = await res.json().catch(() => ({}));
        throw new Error(errRes.message || "Erro ao salvar pergunta");
      }

      const json = await res.json();
      const savedFAQ = json.data;

      if (id) {
        setFaqs((prev) =>
          prev.map((f) => (f.id === savedFAQ.id ? savedFAQ : f))
        );
        toast.success("Pergunta atualizada!");
      } else {
        setFaqs((prev) => [...prev, savedFAQ]);
        toast.success("Pergunta criada!");
      }

      setIsFormOpen(false);
      setEditingFAQ(null);
    } catch (err: any) {
      toast.error(err.message || "Erro ao salvar pergunta");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      const res = await fetch(`${API_URL}/faqs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Erro ao deletar pergunta");

      setFaqs((prev) => prev.filter((f) => f.id !== id));
      toast.success("FAQ deletado!");
    } catch {
      toast.error("Erro ao deletar pergunta");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 py-20">
      <AdminHeader
        title="Perguntas Frequentes"
        buttonLabel="Nova Pergunta"
        onButtonClick={() => {
          setEditingFAQ(null);
          setIsFormOpen(true);
        }}
      />

      <FAQList
        faqs={faqs}
        loading={loading}
        onEdit={(faq) => {
          setEditingFAQ(faq);
          setIsFormOpen(true);
        }}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <FAQForm
          faq={editingFAQ || undefined}
          isOpen={isFormOpen}
          onSave={(data) => handleSave(data, editingFAQ?.id)}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingFAQ(null);
          }}
        />
      )}
    </div>
  );
}