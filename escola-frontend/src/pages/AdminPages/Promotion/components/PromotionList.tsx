import PromotionItem from "./PromotionItem";
import { Promotion } from "./PromotionForm";
import { Button } from "@/components/ui/button";
import PromotionGridSkeleton from "@/components/skeletons/PromotionGridSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

interface PromotionListProps {
  promotions: Promotion[];
  loading?: boolean;
  onEdit: (promotion: Promotion) => void;
  onDelete: (id: string) => void;
  onDeleteExpired: () => void;
}

export default function PromotionList({
  promotions,
  loading = false,
  onEdit,
  onDelete,
  onDeleteExpired,
}: PromotionListProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-4 items-center">
        <PromotionGridSkeleton count={4} />

        <Skeleton className="h-10 w-40 mt-6" />
      </div>
    );
  }

  if (promotions.length === 0) {
    return (
      <p className="text-gray-500 text-center">
        Nenhuma promoção cadastrada ainda.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {promotions.map((promo) => (
          <PromotionItem
            key={promo.id}
            promotion={promo}
            onEdit={() => onEdit(promo)}
            onDelete={() => onDelete(promo.id)}
          />
        ))}
      </div>

      <Button
        variant="destructive"
        size="lg"
        onClick={onDeleteExpired}
        className="mt-6 px-6"
      >
        Remover Expiradas
      </Button>
    </div>
  );
}
