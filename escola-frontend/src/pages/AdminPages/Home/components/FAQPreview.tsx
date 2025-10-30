import { Link } from "react-router-dom";
import FAQ from "@/pages/ClientPages/FAQ/FAQ";
import { useEffect, useState } from "react";

export default function FAQPreview() {
  const [totalFaqs, setTotalFaqs] = useState(0);

  useEffect(() => {
    const fetchFaqsCount = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/faqs`);
        const data = await res.json();
        if (res.ok) setTotalFaqs(data.data?.length || data.length);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFaqsCount();
  }, []);

  return (
    <section className="mb-12">
      <h2 className="text-3xl text-center font-semibold font-primary text-primary mb-6">
        Demonstração das FAQs
      </h2>
      <FAQ isAdmin limit={6} />
      {totalFaqs > 6 && (
        <div className="flex justify-center mt-6">
          <Link
            to="/admin/faq"
            className="text-primary hover:brightness-150 transition-colors text-base font-medium"
          >
            Ver mais
          </Link>
        </div>
      )}
    </section>
  );
}
