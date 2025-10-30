import { useState, useEffect } from "react";
import PromotionForm, { Promotion } from "./components/PromotionForm";
import PromotionList from "./components/PromotionList";
import AdminHeader from "@/components/global/AdminHeader";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminPromotion() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/promotions`);
      if (!res.ok) throw new Error("Erro ao buscar promoções");
      const data = await res.json();
      setPromotions(data);
    } catch (err) {
      toast.error("Não foi possível carregar as promoções");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleSavePromotion = async (formData: FormData) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      let res: Response;
      let savedPromotion: Promotion;

      if (selectedPromotion) {
        res = await fetch(`${API_URL}/promotions/${selectedPromotion.id}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        if (!res.ok) throw new Error("Erro ao atualizar promoção");
        savedPromotion = await res.json();

        setPromotions((prev) =>
          prev.map((p) => (p.id === savedPromotion.id ? savedPromotion : p))
        );
        toast.success("Promoção atualizada!");
      } else {
        res = await fetch(`${API_URL}/promotions`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        if (!res.ok) throw new Error("Erro ao criar promoção");
        savedPromotion = await res.json();

        setPromotions((prev) => [...prev, savedPromotion]);
        toast.success("Promoção criada!");
      }

      setIsFormOpen(false);
      setSelectedPromotion(null);
    } catch (err: any) {
      toast.error(err.message || "Erro ao salvar promoção");
    }
  };

  const handleDeletePromotion = async (id: string) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      const res = await fetch(`${API_URL}/promotions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erro ao deletar promoção");
      toast.success("Promoção deletada!");

      setPromotions((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      toast.error("Erro ao deletar promoção");
    }
  };

  const handleDeleteExpiredPromotions = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      const res = await fetch(`${API_URL}/promotions/clean/expired`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Erro ao remover promoções expiradas");

      toast.success(data.message);
      fetchPromotions();
    } catch (err: any) {
      toast.error(err.message || "Erro ao remover promoções expiradas");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 py-20">
      <AdminHeader
        title="Promoções"
        buttonLabel="Nova Promoção"
        onButtonClick={() => setIsFormOpen(true)}
      />

      <PromotionList
        promotions={promotions}
        loading={loading}
        onEdit={(promo) => {
          setSelectedPromotion(promo);
          setIsFormOpen(true);
        }}
        onDelete={handleDeletePromotion}
        onDeleteExpired={handleDeleteExpiredPromotions}
      />

      {isFormOpen && (
        <PromotionForm
          promotion={selectedPromotion ?? undefined}
          onSave={handleSavePromotion}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedPromotion(null);
          }}
          isOpen={isFormOpen}
        />
      )}
    </div>
  );
}
