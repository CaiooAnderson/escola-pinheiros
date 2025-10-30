import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [showPing, setShowPing] = useState(false);

  useEffect(() => {
    const duration = 4000;
    const steps = 100;
    const stepTime = duration / steps;

    const interval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(interval);

          setShowPing(true);

          return 100;
        }
        return prev + 1;
      });
    }, stepTime);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="relative mb-8">
        {showPing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-green-400 rounded-full animate-ping opacity-75"></div>
          </div>
        )}

        <div className="w-24 h-24 border-4 border-green-500 rounded-full flex items-center justify-center animate-spin relative z-10">
          <div className="w-16 h-16 border-r-4 border-green-500 rounded-full"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <span className="text-4xl font-bold text-green-600 font-primary">
            P
          </span>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6 font-primary text-green-700">
        Centro Educacional Pinheiros
      </h1>

      <div className="w-4/5 max-w-md">
        <Progress
          value={progress}
          gradient="linear-gradient(90deg, #10b981, #22c55e, #16a34a)"
          className="h-2 bg-gray-200"
        />

        <div className="text-center mt-2 text-sm text-green-600 font-medium">
          {progress}%
        </div>
      </div>

      {showPing && (
        <div className="mt-4 text-green-600 font-semibold animate-pulse">
          Pronto!
        </div>
      )}
    </div>
  );
}
