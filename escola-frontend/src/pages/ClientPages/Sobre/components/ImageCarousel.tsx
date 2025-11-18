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
    return { id: `sobre-${i}`, src } as ImageItem;
  });

export default function ImageCarousel() {
  return (
    <div className="w-full relative my-16">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {carouselImages.map((image) => (
            <CarouselItem key={image.id} className="basis-full md:basis-1/3">
              <div className="w-full aspect-square bg-background/5 flex items-center justify-center p-2">
                <img
                  src={image.src}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                  alt=""
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
