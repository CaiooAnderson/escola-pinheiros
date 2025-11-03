import { useEffect, useState } from "react";
import AnimatedSection from "@/components/animations/AnimatedSection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Image, Wallpaper } from "lucide-react";
import MarqueeEffect from "@/components/animations/MarqueeEffect";
import { toast } from "sonner";
import {
  EventSkeleton,
  EventSkeletonAdmin,
} from "@/components/skeletons/EventSkeleton";
import { ImageSkeleton } from "@/components/skeletons/ImageSkeleton";

type EventItem = {
  id: string;
  name: string;
  category: string;
  date: string;
  year: string;
  imageUrl: string;
};

type EventsProps = {
  isAdmin?: boolean;
};

type Category = {
  name: string;
  items: EventItem[];
};

export default function Events({ isAdmin = false }: EventsProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [imgFit, setImgFit] = useState<"cover" | "contain">("cover");
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/events`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Erro ao buscar eventos");

        const eventsList = data.data || data;
        const grouped: Record<string, EventItem[]> = {};

        eventsList.forEach((event: any) => {
          event.categories.forEach((c: any) => {
            if (!grouped[c.name]) grouped[c.name] = [];

            let dateObj = new Date(event.eventAt);
            if (isNaN(dateObj.getTime()) && typeof event.eventAt === "string") {
              const parts = event.eventAt.split("/");
              if (parts.length === 3) {
                const [day, month, year] = parts;
                dateObj = new Date(`${year}-${month}-${day}`);
              }
            }

            const formattedDate = !isNaN(dateObj.getTime())
              ? new Intl.DateTimeFormat("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }).format(dateObj)
              : event.eventAt;

            const yearStr = !isNaN(dateObj.getTime())
              ? dateObj.getFullYear().toString()
              : "";

            grouped[c.name].push({
              id: event.id,
              name: event.name,
              category: c.name,
              date: formattedDate,
              year: yearStr,
              imageUrl: event.imageUrl,
            });
          });
        });

        const categoriesArr: Category[] = Object.entries(grouped).map(
          ([name, items]) => ({ name, items })
        );

        setCategories(categoriesArr);
        setOpenAccordions(categoriesArr.map((cat) => cat.name));
      } catch (err) {
        toast.error("Erro ao buscar eventos");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getYears = () => {
    const allYears = categories.flatMap((cat) =>
      cat.items.map((event) => event.year).filter(Boolean)
    );
    return Array.from(new Set(allYears)).sort((a, b) => Number(b) - Number(a));
  };

  return (
    <div
      className={
        isAdmin
          ? "w-full bg-transparent py-0 px-2"
          : "container mx-auto py-30 px-4"
      }
    >
      <AnimatedSection direction="up" animateOnMount>
        {!isAdmin && (
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark font-primary text-center mb-12">
            Nossos Eventos
          </h1>
        )}
      </AnimatedSection>

      {loading ? (
        isAdmin ? (
          <EventSkeletonAdmin />
        ) : (
          <EventSkeleton />
        )
      ) : categories.length === 0 ? (
        <div
          className={`w-full flex justify-center ${
            isAdmin ? "items-start h-30" : "items-center"
          }`}
        >
          <p className="font-secondary text-lg text-muted-dark text-center">
            Não há eventos disponíveis no momento.
          </p>
        </div>
      ) : (
        <>
          {!isAdmin && (
            <div className="flex sm:flex-row flex-col items-end justify-end mb-2 gap-2">
              <Select
                onValueChange={(val) => setSelectedYear(val)}
                value={selectedYear}
              >
                <SelectTrigger className="w-45">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os anos</SelectItem>
                  {getYears().map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(val) => setSortOption(val)}
                value={sortOption}
              >
                <SelectTrigger className="w-45">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="hidden" value="default">
                    Filtrar por
                  </SelectItem>
                  <SelectItem value="date-asc">Data do evento ↑</SelectItem>
                  <SelectItem value="date-desc">Data do evento ↓</SelectItem>
                  <SelectItem value="name-asc">Nome A-Z</SelectItem>
                  <SelectItem value="name-desc">Nome Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Accordion
            type="multiple"
            className="space-y-6"
            value={openAccordions}
            onValueChange={setOpenAccordions}
          >
            {categories.map((category) => {
              let filteredItems = category.items.filter((item) =>
                selectedYear === "all" ? true : item.year === selectedYear
              );

              if (sortOption === "date-asc") {
                filteredItems = filteredItems.sort((a, b) => {
                  const dateA = new Date(a.date.split("/").reverse().join("-"));
                  const dateB = new Date(b.date.split("/").reverse().join("-"));
                  return dateA.getTime() - dateB.getTime();
                });
              } else if (sortOption === "date-desc") {
                filteredItems = filteredItems.sort((a, b) => {
                  const dateA = new Date(a.date.split("/").reverse().join("-"));
                  const dateB = new Date(b.date.split("/").reverse().join("-"));
                  return dateB.getTime() - dateA.getTime();
                });
              } else if (sortOption === "name-asc") {
                filteredItems = filteredItems.sort((a, b) =>
                  a.name.localeCompare(b.name)
                );
              } else if (sortOption === "name-desc") {
                filteredItems = filteredItems.sort((a, b) =>
                  b.name.localeCompare(a.name)
                );
              }

              return (
                <AccordionItem key={category.name} value={category.name}>
                  <AccordionTrigger className="text-2xl font-semibold font-secondary">
                    {category.name}
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    {category.items.length === 0 ? (
                      <p className="text-muted-dark font-secondary h-35 flex items-center justify-center">
                        Nenhum evento nesta categoria
                      </p>
                    ) : filteredItems.length === 0 ? (
                      <p className="text-muted-dark font-secondary h-35 flex items-center justify-center">
                        Nenhum evento encontrado em {selectedYear}.
                      </p>
                    ) : (
                      <Carousel className="w-full relative">
                        <CarouselContent className="gap-4">
                          {filteredItems.map((event, idx) => (
                            <AnimatedSection
                              key={`${event.id}-${idx}`}
                              direction="up"
                              delay={idx * 0.1}
                            >
                              <CarouselItem className="snap-start w-37.5 flex-none">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Card className="cursor-pointer w-37.5 h-37.5">
                                      <CardContent className="p-0 w-full h-full relative">
                                        <ImageSkeleton
                                          src={event.imageUrl}
                                          alt={event.name}
                                          className="w-full h-full object-cover rounded"
                                        />
                                        <div className="absolute inset-0 rounded-md bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center">
                                          <span className="text-white font-semibold text-center p-2 overflow-hidden text-ellipsis whitespace-nowrap">
                                            {event.name}
                                          </span>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </DialogTrigger>

                                  <DialogContent className="max-w-lg rounded-xl p-6 shadow-primary-dark">
                                    <DialogHeader>
                                      <DialogTitle>
                                        <div className="line-clamp-1 leading-normal flex justify-center sm:justify-start">
                                          <MarqueeEffect className="sm:max-w-112 max-w-60">
                                            {event.name}
                                          </MarqueeEffect>
                                        </div>
                                      </DialogTitle>
                                      <DialogDescription className="text-sm text-muted-foreground flex flex-col">
                                        <span>Categoria: {event.category}</span>
                                        <span>
                                          Data do evento: {event.date}
                                        </span>
                                      </DialogDescription>
                                    </DialogHeader>

                                    <ImageSkeleton
                                      src={event.imageUrl}
                                      alt={event.name}
                                      className={`mt-4 mx-auto rounded-lg object-${imgFit} sm:w-100 sm:h-100 w-60 h-60`}
                                    />

                                    <div className="flex justify-center gap-4 mt-4">
                                      <button
                                        onClick={() => setImgFit("contain")}
                                      >
                                        <Wallpaper
                                          className={`w-6 h-6 cursor-pointer ${
                                            imgFit === "contain"
                                              ? "text-primary"
                                              : "text-gray-700"
                                          }`}
                                        />
                                      </button>
                                      <button
                                        onClick={() => setImgFit("cover")}
                                      >
                                        <Image
                                          className={`w-6 h-6 cursor-pointer ${
                                            imgFit === "cover"
                                              ? "text-primary"
                                              : "text-gray-700"
                                          }`}
                                        />
                                      </button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </CarouselItem>
                            </AnimatedSection>
                          ))}
                        </CarouselContent>

                        {filteredItems.length >= 1 && (
                          <>
                            <CarouselPrevious className="left-[0.5rem]" />
                            <CarouselNext className="right-[0.5rem]" />
                          </>
                        )}
                      </Carousel>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </>
      )}
    </div>
  );
}
