import Event from "@/pages/ClientPages/Event/Events";

export default function EventPreview() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl text-center w-full font-semibold font-primary text-primary">
          Demonstração de Eventos
        </h2>
      </div>

      <Event isAdmin />
    </section>
  );
}
