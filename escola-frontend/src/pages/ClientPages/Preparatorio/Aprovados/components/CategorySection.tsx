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
import ApprovedCard from "./ApprovedCard";

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
  const filterAndSortApproved = (items: any[]) => {
    let filteredItems = items.filter((item) =>
      selectedYear === "all" ? true : item.year === selectedYear
    );

    if (sortOption === "year-asc") {
      filteredItems = filteredItems.sort(
        (a, b) => Number(a.year) - Number(b.year)
      );
    } else if (sortOption === "year-desc") {
      filteredItems = filteredItems.sort(
        (a, b) => Number(b.year) - Number(a.year)
      );
    } else if (sortOption === "position-asc") {
      filteredItems = filteredItems.sort((a, b) => {
        const posA = parseInt(a.position);
        const posB = parseInt(b.position);
        return posA - posB;
      });
    } else if (sortOption === "position-desc") {
      filteredItems = filteredItems.sort((a, b) => {
        const posA = parseInt(a.position);
        const posB = parseInt(b.position);
        return posB - posA;
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

  const filteredItems = filterAndSortApproved(category.items);

  return (
    <AccordionItem key={category.name} value={category.name}>
      <AccordionTrigger className="text-2xl font-semibold font-secondary">
        {category.name}
      </AccordionTrigger>
      <AccordionContent className="pt-4">
        {category.items.length === 0 ? (
          <p className="text-muted-dark font-secondary h-35 flex items-center justify-center">
            Nenhum aprovado nesta categoria
          </p>
        ) : filteredItems.length === 0 ? (
          <p className="text-muted-dark font-secondary h-35 flex items-center justify-center">
            Nenhum aprovado encontrado em {selectedYear}.
          </p>
        ) : (
          <Carousel className="w-full relative">
            <CarouselContent className="gap-4">
              {filteredItems.map((approved, idx) => (
                <ApprovedCard
                  key={approved.id}
                  approved={approved}
                  index={idx}
                />
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
