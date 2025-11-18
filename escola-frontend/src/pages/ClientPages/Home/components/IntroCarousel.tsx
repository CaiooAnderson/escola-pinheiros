import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type ImageItem = { id: string; src: string; alt?: string };

const imagesModules = (import.meta as any).glob(
  "/src/assets/introducao/*.{jpg,JPG,png,PNG,jpeg,JPEG}",
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
    <div className="w-full relative mt-20">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {carouselImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="w-full aspect-[16/9] md:h-[80vh] h-[40vh] bg-background/5 flex items-center justify-center">
                <img
                  src={image.src}
                  className="sm:h-full w-fit h-60 object-fit sm:w-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 md:left-6 text-white bg-primary hover:bg-primary-dark" />
        <CarouselNext className="right-4 md:right-6 text-white bg-primary hover:bg-primary-dark" />
      </Carousel>
    </div>
  );
}
