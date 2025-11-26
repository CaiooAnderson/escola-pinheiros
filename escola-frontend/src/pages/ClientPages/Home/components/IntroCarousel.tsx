import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type ImageItem = { id: string; src: string; alt?: string };

const imagesModules = (import.meta as any).glob(
  "/src/assets/introducao/*.{jpg,JPG,png,PNG,webp,jpeg,JPEG}",
  { eager: true }
);

const carouselImages: ImageItem[] = Object.entries(imagesModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, mod], i) => {
    const src = ((mod as any).default || (mod as any)) as string;
    return { id: `intro-${i}`, src } as ImageItem;
  });

export default function IntroCarousel() {
  return (
    <div className="w-full relative pt-20 bg-primary-light/10">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {carouselImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="w-full flex items-center justify-center bg-background/5 p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
                  <img
                    src={image.src}
                    alt={image.alt || "Imagem de introdução"}
                    className="w-full h-auto object-contain rounded-lg shadow-lg max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh] lg:max-h-[65vh] xl:max-h-[70vh]"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2 sm:left-4 md:left-6 text-white bg-primary hover:bg-primary-dark" />
        <CarouselNext className="right-2 sm:right-4 md:right-6 text-white bg-primary hover:bg-primary-dark" />
      </Carousel>
    </div>
  );
}
