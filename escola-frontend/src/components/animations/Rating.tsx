import { Star } from "lucide-react";

export default function Rating({ value }: { value: number }) {
  return (
    <div className="flex justify-center">
      {Array.from({ length: 5 }).map((_, i) => {
        const full = value >= i + 1;
        const half = value > i && value < i + 1;

        return (
          <div key={i} className="relative w-5 h-5">
            <Star size={20} className="text-gray-300" />

            {(full || half) && (
              <div
                className={`absolute top-0 left-0 overflow-hidden`}
                style={{ width: half ? "50%" : "100%" }}
              >
                <Star size={20} className="fill-yellow-400 text-yellow-400" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}