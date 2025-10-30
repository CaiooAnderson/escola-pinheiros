import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ImageSkeletonProps {
  src?: string;
  alt: string;
  className?: string;
}

export const ImageSkeleton = ({
  src,
  alt,
  className = "",
}: ImageSkeletonProps) => {
  const [isLoading, setIsLoading] = useState(!!src);

  if (!src) {
    return (
      <div className={`${className} bg-muted flex items-center justify-center`}>
        <span className="text-muted-foreground text-sm">Sem imagem</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <Skeleton className="absolute inset-0 z-10 animate-pulse bg-muted/50 w-full h-full" />
      )}

      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover rounded-md ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  );
};
