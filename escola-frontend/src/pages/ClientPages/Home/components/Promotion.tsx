import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AnimatedSection from "@/components/animations/AnimatedSection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PromotionSkeleton from "@/components/skeletons/PromotionSkeleton";
import { ImageSkeleton } from "@/components/skeletons/ImageSkeleton";
import promotionData from "./Promotion.json";

type Promotion = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
};

type PromotionProps = {
  isAdmin?: boolean;
};

export default function Promotion({ isAdmin = false }: PromotionProps) {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const now = new Date();
      const activePromotions = promotionData.promotions.filter(
        (promo: Promotion) => {
          const start = new Date(promo.startDate);
          const end = new Date(promo.endDate);
          return start <= now && end >= now;
        }
      );
      setPromotions(activePromotions);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div
      className={
        isAdmin ? "w-full bg-transparent" : "w-full bg-primary-light/10"
      }
    >
      <div
        className={`container mx-auto flex flex-col items-center justify-center text-center 
        ${isAdmin ? "py-0 px-2" : "py-20 px-4"}`}
      >
        <AnimatedSection direction="up">
          <div className={isAdmin ? "hidden" : "max-w-4xl mb-12"}>
            <h2 className="text-3xl sm:text-4xl font-bold font-primary text-primary-dark mb-6">
              Promoções e Oportunidades
            </h2>
            <p className="text-lg sm:text-xl font-secondary text-muted-dark">
              Confira nossas promoções para matrículas e condições especiais!
            </p>
          </div>
        </AnimatedSection>

        {loading ? (
          <PromotionSkeleton count={3} />
        ) : promotions.length === 0 ? (
          <div
            className={`w-full font-secondary max-w-5xl p-0 flex justify-center ${
              isAdmin ? "items-start h-30" : "items-center h-96"
            }`}
          >
            <p className="text-center text-lg text-muted-dark">
              Não há promoções disponíveis no momento.
            </p>
          </div>
        ) : (
          <Carousel className="w-full max-w-5xl relative">
            <CarouselContent>
              {promotions.map((promo, index) => (
                <CarouselItem
                  key={promo.id}
                  className="basis-full sm:basis-1/2 lg:basis-1/3 mb-4"
                >
                  <AnimatedSection direction="up" delay={index * 0.2}>
                    <Card
                      className="cursor-pointer brightness-75 hover:brightness-100 hover:animate-none animate-pulse overflow-hidden border-muted-light hover:border-primary shadow-lg hover:shadow-primary/40 w-[260px] h-[380px] mx-auto"
                      onClick={() => setSelectedPromotion(promo)}
                    >
                      <CardContent className="p-0 flex flex-col h-full">
                        <div className="flex-1">
                          <ImageSkeleton
                            src={promo.imageUrl}
                            alt={promo.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="bg-white p-3 text-sm font-secondary text-gray-700">
                          <p>
                            <strong>Início:</strong>{" "}
                            {formatDate(promo.startDate)}
                          </p>
                          <p>
                            <strong>Fim:</strong> {formatDate(promo.endDate)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                </CarouselItem>
              ))}
            </CarouselContent>

            {promotions.length > 1 && (
              <>
                <CarouselPrevious className="left-[0.5rem]" />
                <CarouselNext className="right-[0.5rem]" />
              </>
            )}
          </Carousel>
        )}

        <Dialog
          open={!!selectedPromotion}
          onOpenChange={() => setSelectedPromotion(null)}
        >
          <DialogContent className="max-w-lg overflow-y-auto">
            {selectedPromotion && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold font-primary text-primary-dark sm:line-clamp-2 line-clamp-4">
                    {selectedPromotion.name}
                  </DialogTitle>
                  <DialogDescription className="text-muted-dark font-secondary">
                    {selectedPromotion.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <ImageSkeleton
                    src={selectedPromotion.imageUrl}
                    alt={selectedPromotion.name}
                    className="w-full max-h-fit object-cover rounded-lg"
                  />
                  <div className="mt-4 text-text text-sm flex flex-col sm:items-start items-center">
                    <p>
                      <strong>Início:</strong>{" "}
                      {formatDate(selectedPromotion.startDate)}
                    </p>
                    <p>
                      <strong>Fim:</strong>{" "}
                      {formatDate(selectedPromotion.endDate)}
                    </p>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
