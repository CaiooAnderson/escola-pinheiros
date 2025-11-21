import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Rating from "@/components/animations/Rating";
import { Smile } from "lucide-react";
import MarqueeEffect from "@/components/animations/MarqueeEffect";
import { FeedbackSkeleton } from "@/components/skeletons/FeedbackSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import feedbackData from "./Feedback.json";
import AnimatedSection from "@/components/animations/AnimatedSection";

import caioAnderson from "@/assets/depoimentos/caio-anderson.jpeg";

type FeedbackItem = {
  id: string;
  name: string;
  comment: string;
  rating: number;
  image: string;
};

type FeedbackProps = {
  className?: string;
  isAdmin?: boolean;
};

const imageMap: { [key: string]: string } = {
  "caio-anderson": caioAnderson,
};

export default function Feedback({
  className,
  isAdmin = false,
}: FeedbackProps) {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  const MAX_LENGTH = 120;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFeedbacks(feedbackData.feedbacks);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getImageSrc = (imageName: string) => {
    return imageMap[imageName] || "";
  };

  return (
    <div className={`w-full bg-background ${className}`}>
      <div
        className={`container mx-auto flex flex-col items-center justify-center ${
          className?.includes("px-0") ? "px-0" : "px-4"
        } ${className}`}
      >
        {!isAdmin && (
          <AnimatedSection direction="down" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold font-primary text-primary-dark mb-12 text-center">
              Depoimentos
            </h2>
          </AnimatedSection>
        )}

        {loading ? (
          <FeedbackSkeleton count={3} />
        ) : feedbacks.length === 0 ? (
          <AnimatedSection direction="fade" delay={0.2}>
            <div
              className={`w-full max-w-4xl p-0 flex justify-center rounded-xl ${
                isAdmin ? "items-start h-30" : "items-center h-74"
              }`}
            >
              <p className="text-center font-secondary text-lg text-muted-dark">
                Não há depoimentos disponíveis no momento.
              </p>
            </div>
          </AnimatedSection>
        ) : (
          <AnimatedSection direction="scale" delay={0.2}>
            <Carousel className="w-full lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-72">
              <CarouselContent>
                {feedbacks.map((fb, index) => {
                  const isLong = fb.comment.length > MAX_LENGTH;
                  const preview = isLong
                    ? fb.comment.slice(0, MAX_LENGTH) + "..."
                    : fb.comment;
                  const imageSrc = getImageSrc(fb.image);

                  return (
                    <CarouselItem
                      key={fb.id}
                      className="basis-full md:basis-2/4 lg:basis-1/3 mb-4"
                    >
                      <AnimatedSection direction="up" delay={0.3 + index * 0.1}>
                        <Card className="overflow-hidden border-muted-light hover:border-primary shadow-md hover:shadow-primary/40 w-72 h-90 mx-auto">
                          <CardContent className="flex flex-col items-center text-center p-6">
                            <Avatar className="w-20 h-20 mb-4">
                              <AvatarImage src={imageSrc} alt={fb.name} />
                              <AvatarFallback className="flex items-center justify-center bg-gray-200">
                                <Smile className="w-10 h-10 text-gray-400" />
                              </AvatarFallback>
                            </Avatar>

                            <h3 className="text-lg font-bold font-primary text-primary-dark mb-2">
                              <MarqueeEffect className="sm:max-w-60 max-w-50">
                                {fb.name}
                              </MarqueeEffect>
                            </h3>

                            <div className="mb-4">
                              <Rating value={fb.rating} />
                            </div>

                            <div className="flex flex-col items-center">
                              <p className="text-muted-dark font-secondary italic text-center">
                                "{preview}"
                              </p>

                              {isLong && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <button className="mt-2 text-primary font-semibold hover:underline cursor-pointer">
                                      Ler mais
                                    </button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                                    <DialogHeader className="flex flex-col items-center text-center gap-2">
                                      <Avatar className="w-20 h-20 mb-2">
                                        <AvatarImage
                                          src={imageSrc}
                                          alt={fb.name}
                                        />
                                        <AvatarFallback className="flex items-center justify-center bg-gray-200">
                                          <Smile className="w-10 h-10 text-gray-400" />
                                        </AvatarFallback>
                                      </Avatar>
                                      <DialogTitle className="text-xl font-bold text-center font-primary text-primary-dark line-clamp-1">
                                        <MarqueeEffect className="sm:max-w-80 max-w-60">
                                          {fb.name}
                                        </MarqueeEffect>
                                      </DialogTitle>
                                      <Rating value={fb.rating} />
                                    </DialogHeader>
                                    <DialogDescription className="text-muted-dark font-secondary leading-relaxed text-center">
                                      "{fb.comment}"
                                    </DialogDescription>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </AnimatedSection>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <CarouselPrevious className="left-2 sm:left-4" />
              <CarouselNext className="right-2 sm:right-4" />
            </Carousel>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
