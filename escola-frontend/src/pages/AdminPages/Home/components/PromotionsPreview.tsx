import Promotion from "@/pages/ClientPages/Home/components/Promotion";

export default function PromotionsPreview() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl text-center w-full font-semibold font-primary text-primary">
          Demonstração das Promoções
        </h2>
      </div>

      <div className="w-full">
        <Promotion isAdmin />
      </div>
    </section>
  );
}
