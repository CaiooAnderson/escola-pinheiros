import { useEffect, useState } from "react";
import AdminHeader from "@/components/global/AdminHeader";
import EventForm, { Event, EventCategory } from "./components/EventForm";
import EventList from "./components/EventList";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminEvent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/events`);
      if (!res.ok) throw new Error("Erro ao buscar eventos");
      const data = await res.json();
      setEvents(data.data || []);
    } catch {
      toast.error("Não foi possível carregar os eventos");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/events/categories`);
      const data = await res.json();
      setCategories(data.data || []);
    } catch {
      toast.error("Não foi possível carregar as categorias");
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchCategories();
  }, []);

  const handleSave = async (payload: FormData, id?: string) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      const url = id ? `${API_URL}/events/${id}` : `${API_URL}/events`;
      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });

      if (!res.ok) {
        const errRes = await res.json().catch(() => ({}));
        throw new Error(errRes.message || "Erro ao salvar evento");
      }

      const savedEvent = (await res.json()).data;

      if (id) {
        setEvents((prev) =>
          prev.map((a) => (a.id === savedEvent.id ? savedEvent : a))
        );
        toast.success("Evento atualizado!");
      } else {
        setEvents((prev) => [...prev, savedEvent]);
        toast.success("Evento criado!");
      }

      setIsFormOpen(false);
      setEditingEvent(null);
    } catch (err: any) {
      toast.error(err.message || "Erro ao salvar evento");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Erro ao deletar evento");

      setEvents((prev) => prev.filter((a) => a.id !== id));
      toast.success("Evento deletado!");
    } catch {
      toast.error("Erro ao deletar evento");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 py-20">
      <AdminHeader
        title="Eventos"
        buttonLabel="Novo Evento"
        onButtonClick={() => {
          setEditingEvent(null);
          setIsFormOpen(true);
        }}
      />

      <EventList
        events={events}
        categories={categories}
        loading={loading}
        onEditClick={(a) => {
          setEditingEvent(a);
          setIsFormOpen(true);
        }}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <EventForm
          event={editingEvent ?? undefined}
          isOpen={isFormOpen}
          onSave={handleSave}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingEvent(null);
          }}
        />
      )}
    </div>
  );
}
