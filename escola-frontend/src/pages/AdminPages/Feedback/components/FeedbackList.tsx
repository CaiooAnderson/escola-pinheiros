import FeedbackItem from "./FeedbackItem";
import { Feedback } from "./FeedbackForm";
import { FeedbackGridSkeleton } from "@/components/skeletons/FeedbackGridSkeleton";

interface FeedbackListProps {
  feedbacks: Feedback[];
  loading?: boolean;
  onEdit: (feedback: Feedback) => void;
  onDelete: (id: string) => void;
}

export default function FeedbackList({
  feedbacks,
  loading = false,
  onEdit,
  onDelete,
}: FeedbackListProps) {
  if (loading) {
    return <FeedbackGridSkeleton count={8} />;
  }

  if (feedbacks.length === 0) {
    return (
      <p className="text-gray-500 text-center">
        Nenhum feedback cadastrado ainda.
      </p>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
      {feedbacks.map((fb) => (
        <FeedbackItem
          key={fb.id}
          feedback={fb}
          onEdit={() => onEdit(fb)}
          onDelete={() => onDelete(fb.id)}
        />
      ))}
    </div>
  );
}