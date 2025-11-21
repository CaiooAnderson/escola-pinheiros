import { useEffect, useState } from "react";
import AnimatedSection from "@/components/animations/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import {
  EventSkeleton,
  EventSkeletonAdmin,
} from "@/components/skeletons/EventSkeleton";
import FloatButton from "@/components/global/FloatButton";
import { Filters, CategorySection, EventModal } from "./components";
import eventsData from "./Events.json";

type EventItem = {
  id: string;
  name: string;
  category: string;
  date: string;
  year: string;
  imageUrl: string;
  photosLink?: string;
  description?: string;
};

type EventsProps = {
  isAdmin?: boolean;
};

type Category = {
  name: string;
  items: EventItem[];
};

const eventImages = import.meta.glob(
  "/src/assets/eventos/*.{jpg,JPG,png,PNG,jpeg,JPEG}",
  { eager: true }
);

export default function Events({ isAdmin = false }: EventsProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getImageUrl = (imageName: string) => {
    const imagePath = `/src/assets/eventos/${imageName}`;

    for (const [path, module] of Object.entries(eventImages)) {
      if (path.includes(imageName)) {
        return (module as any).default;
      }
    }

    return imagePath;
  };

  useEffect(() => {
    const loadEvents = () => {
      try {
        const eventsList = eventsData.events;
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

            const imageUrl = getImageUrl(event.imageUrl);

            grouped[c.name].push({
              id: event.id,
              name: event.name,
              category: c.name,
              date: formattedDate,
              year: yearStr,
              imageUrl: imageUrl,
              photosLink: event.photosLink,
              description: event.description,
            });
          });
        });

        const categoriesArr: Category[] = Object.entries(grouped).map(
          ([name, items]) => ({ name, items })
        );

        setCategories(categoriesArr);
        setOpenAccordions(categoriesArr.map((cat) => cat.name));
      } catch (err) {
        console.error("Erro ao carregar eventos:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      loadEvents();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getYears = () => {
    const allYears = categories.flatMap((cat) =>
      cat.items.map((event) => event.year).filter(Boolean)
    );
    return Array.from(new Set(allYears)).sort((a, b) => Number(b) - Number(a));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
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
          <Filters
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            sortOption={sortOption}
            onSortChange={setSortOption}
            years={getYears()}
            isAdmin={isAdmin}
          />

          <Accordion
            type="multiple"
            className="space-y-6"
            value={openAccordions}
            onValueChange={setOpenAccordions}
          >
            {categories.map((category) => (
              <CategorySection
                key={category.name}
                category={category}
                selectedYear={selectedYear}
                sortOption={sortOption}
              />
            ))}
          </Accordion>
        </>
      )}

      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <FloatButton />
    </div>
  );
}
