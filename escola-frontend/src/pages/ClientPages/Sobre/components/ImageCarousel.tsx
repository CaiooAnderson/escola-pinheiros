import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ImageSkeleton } from "@/components/skeletons/ImageSkeleton";

type ImageItem = {
  id: string;
  src: string;
  alt?: string;
  loaded?: boolean;
  importFn?: () => Promise<any>;
};

const imagesModules = import.meta.glob(
  "/src/assets/fotos_escola/*.{jpg,JPG,png,PNG,jpeg,JPEG}",
  { eager: false }
) as Record<string, () => Promise<any>>;

export default function ImageCarousel() {
  const [carouselImages, setCarouselImages] = useState<ImageItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [visibleImages, setVisibleImages] = useState<Set<string>>(new Set());
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    const loadImageList = async () => {
      const entries = Object.entries(imagesModules).sort(([a], [b]) =>
        a.localeCompare(b, undefined, { numeric: true })
      );

      try {
        const imageList: ImageItem[] = entries.map(([, importFn], i) => ({
          id: `sobre-${i}`,
          src: "",
          alt: "Imagem da escola",
          loaded: false,
          importFn,
        }));

        if (mounted) setCarouselImages(imageList);
      } catch (err) {
        console.error("Erro ao carregar lista de imagens:", err);
      }
    };

    loadImageList();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (carouselImages.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const imageId = entry.target.getAttribute("data-image-id");
          if (!imageId) return;

          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleImages((prev) => new Set(prev).add(imageId));
            }, 1000);
          }
        });
      },
      {
        root: carouselRef.current,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    const imageElements = document.querySelectorAll("[data-image-id]");
    imageElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [carouselImages.length]);

  useEffect(() => {
    const loadVisibleImages = async () => {
      const imagesToLoad = Array.from(visibleImages);

      for (const imageId of imagesToLoad) {
        const imageIndex = carouselImages.findIndex(
          (img) => img.id === imageId
        );
        if (imageIndex === -1 || carouselImages[imageIndex].loaded) continue;

        try {
          const image = carouselImages[imageIndex];
          if (!image.importFn) continue;

          const mod = await image.importFn();
          const src = (mod && (mod.default ?? mod)) as string;

          setCarouselImages((prev) =>
            prev.map((img, idx) =>
              idx === imageIndex ? { ...img, src, loaded: true } : img
            )
          );
        } catch (err) {
          console.error(`Erro ao carregar imagem ${imageId}:`, err);
        }
      }
    };

    if (visibleImages.size > 0) {
      loadVisibleImages();
    }
  }, [visibleImages, carouselImages]);

  const openImageModal = (image: ImageItem) => {
    if (image.loaded && image.src) {
      setSelectedImage(image);
    }
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeImageModal();
  };

  return (
    <>
      <div className="w-full relative my-16" ref={carouselRef}>
        <Carousel
          className="w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {carouselImages.map((image) => (
              <CarouselItem
                key={image.id}
                className="basis-full md:basis-2/3 lg:basis-1/3"
              >
                <div
                  className="w-full bg-background/5 flex items-center justify-center p-2 cursor-pointer"
                  onClick={() => openImageModal(image)}
                  data-image-id={image.id}
                >
                  {image.loaded && image.src ? (
                    <ImageSkeleton
                      src={image.src}
                      alt={image.alt || "Imagem da escola"}
                      className="w-120 h-80 object-cover rounded-lg shadow-md transition-opacity duration-200 brightness-50 hover:brightness-100 hover:shadow-primary"
                    />
                  ) : (
                    <div className="w-120 h-80 flex items-center justify-center bg-muted rounded-lg">
                      <div className="text-muted-foreground text-sm">
                        Carregando...
                      </div>
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-4 md:left-6 text-white bg-primary hover:bg-primary-dark" />
          <CarouselNext className="right-4 md:right-6 text-white bg-primary hover:bg-primary-dark" />
        </Carousel>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2"
          onClick={closeImageModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label="Fechar imagem"
        >
          <div
            className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="default"
              size="icon"
              className="absolute top-2 right-2 z-10 text-white rounded-lg p-2"
              onClick={closeImageModal}
              aria-label="Fechar imagem"
            >
              <X className="h-6 w-6" />
            </Button>

            <img
              src={selectedImage.src}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              alt={selectedImage.alt || "Imagem da escola em tela cheia"}
            />
          </div>
        </div>
      )}
    </>
  );
}
