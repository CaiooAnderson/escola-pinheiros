import FAQItem from "./FAQItem";
import { FAQ } from "./FAQForm";
import FAQGridSkeleton from "@/components/skeletons/FAQGridSkeleton";

interface FAQListProps {
  faqs: FAQ[];
  loading?: boolean;
  onEdit: (faq: FAQ) => void;
  onDelete: (id: string) => void;
}

export default function FAQList({
  faqs,
  loading = false,
  onEdit,
  onDelete,
}: FAQListProps) {
  if (loading) {
    return <FAQGridSkeleton count={5} />;
  }

  if (faqs.length === 0) {
    return (
      <p className="text-gray-500 text-center">
        Nenhuma pergunta cadastrada ainda.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <FAQItem
          key={faq.id}
          faq={faq}
          onEdit={() => onEdit(faq)}
          onDelete={() => onDelete(faq.id)}
        />
      ))}
    </div>
  );
}
