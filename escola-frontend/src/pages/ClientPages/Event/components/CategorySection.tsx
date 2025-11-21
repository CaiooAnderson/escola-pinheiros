import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EventCard from "./EventCard";

interface CategorySectionProps {
  category: {
    name: string;
    items: any[];
  };
  selectedYear: string;
  sortOption: string;
}

export default function CategorySection({
  category,
  selectedYear,
  sortOption,
}: CategorySectionProps) {
  const filterAndSortEvents = (items: any[]) => {
    let filteredItems = items.filter((item) =>
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

    return filteredItems;
  };

  const filteredItems = filterAndSortEvents(category.items);

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
                <EventCard key={event.id} event={event} index={idx} />
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
}
