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
    <div className="w-full relative pt-20 bg-gradient-to-b from-background to-primary overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40 z-0" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-32 bg-gradient-to-b from-white/5 via-transparent to-transparent blur-3xl z-0" />

      <Carousel
        className="w-full relative z-10"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {carouselImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-card/20 via-transparent to-card/30 rounded-none z-10 pointer-events-none" />

                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-full bg-gradient-to-r from-primary/80 from-60% to-transparent blur-md rounded-full opacity-50 pointer-events-none" />
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-full bg-gradient-to-l from-primary/80 from-60% to-transparent blur-md rounded-full opacity-50 pointer-events-none" />

                <div className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl relative">
                  <div className="absolute inset-0 -m-4">
                    <img
                      src={image.src}
                      alt=""
                      className="w-full h-full object-cover rounded-xl blur-2xl scale-105 opacity-60"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl shadow-black/30 p-2 md:p-3 lg:p-4">
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={image.src}
                        alt={image.alt || "Imagem de introdução"}
                        className="w-full h-auto object-contain rounded-lg transition-all duration-500 ease-out max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh] lg:max-h-[65vh] xl:max-h-[70vh]"
                        style={{
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                        }}
                      />

                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card/10 to-transparent rounded-b-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2 sm:left-4 md:left-6 z-30 border-2 border-white/20 bg-black/60 backdrop-blur-sm hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300 text-white" />
        <CarouselNext className="right-2 sm:right-4 md:right-6 z-30 border-2 border-white/20 bg-black/60 backdrop-blur-sm hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300 text-white" />
      </Carousel>
    </div>
  );
}
