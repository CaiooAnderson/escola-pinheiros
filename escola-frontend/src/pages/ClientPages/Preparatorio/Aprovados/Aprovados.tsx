import { useEffect, useState } from "react";
import AnimatedSection from "@/components/animations/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { EventSkeleton } from "@/components/skeletons/EventSkeleton";
import FloatButton from "@/components/global/FloatButton";
import { Filters, CategorySection, ApprovedModal } from "./components";
import approvedData from "./Aprovados.json";

type ApprovedItem = {
  id: string;
  name: string;
  category: string;
  year: string;
  position: string;
  institution: string;
  imageUrl: string;
  testimony?: string;
  socialLink?: string;
};

type Category = {
  name: string;
  items: ApprovedItem[];
};

const approvedImages = import.meta.glob(
  "/src/assets/aprovados/*.{jpg,JPG,png,PNG,jpeg,JPEG}",
  { eager: true }
);

export default function Aprovados() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [selectedApproved, setSelectedApproved] = useState<ApprovedItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getImageUrl = (imageName: string) => {
    const imagePath = `/src/assets/aprovados/${imageName}`;

    for (const [path, module] of Object.entries(approvedImages)) {
      if (path.includes(imageName)) {
        return (module as any).default;
      }
    }

    return imagePath;
  };

  useEffect(() => {
    const loadApproved = () => {
      try {
        const approvedList = approvedData.approved;
        const grouped: Record<string, ApprovedItem[]> = {};

        approvedList.forEach((approved: any) => {
          if (!grouped[approved.category]) {
            grouped[approved.category] = [];
          }

          const imageUrl = getImageUrl(approved.imageUrl);

          grouped[approved.category].push({
            id: approved.id,
            name: approved.name,
            category: approved.category,
            year: approved.year,
            position: approved.position,
            institution: approved.institution,
            imageUrl: imageUrl,
            testimony: approved.testimony,
            socialLink: approved.socialLink,
          });
        });

        const categoriesArr: Category[] = Object.entries(grouped).map(
          ([name, items]) => ({ name, items })
        );

        setCategories(categoriesArr);
        setOpenAccordions(categoriesArr.map((cat) => cat.name));
      } catch (err) {
        console.error("Erro ao carregar aprovados:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      loadApproved();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getYears = () => {
    const allYears = categories.flatMap((cat) =>
      cat.items.map((approved) => approved.year).filter(Boolean)
    );
    return Array.from(new Set(allYears)).sort((a, b) => Number(b) - Number(a));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApproved(null);
  };

  return (
    <div className="container mx-auto py-30 px-4">
      <AnimatedSection direction="up" animateOnMount>
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark font-primary text-center mb-4">
          Nossos Aprovados
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Conheça os alunos que conquistaram sua vaga nas melhores instituições
          através do nosso preparatório
        </p>
      </AnimatedSection>

      {loading ? (
        <EventSkeleton />
      ) : categories.length === 0 ? (
        <div className="w-full flex justify-center items-center h-40">
          <p className="font-secondary text-lg text-muted-dark text-center">
            Não há aprovados disponíveis no momento.
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

      <ApprovedModal
        approved={selectedApproved}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <FloatButton />
    </div>
  );
}
