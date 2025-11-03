import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.png";

interface SplashArtProps {
  onComplete?: () => void;
}

export default function SplashArt({ onComplete }: SplashArtProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showLogoAnimation, setShowLogoAnimation] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setShowLogoAnimation(true);

          setTimeout(() => {
            setShouldNavigate(true);
            onComplete?.();
          }, 1000);

          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const handleAnimationComplete = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary to-primary-dark z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {shouldNavigate && (
            <Link to="/" className="absolute inset-0 z-50" aria-hidden="true" />
          )}

          <motion.div
            className="mb-8 relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: showLogoAnimation ? 1.2 : 1,
              rotate: 0,
            }}
            transition={{
              type: "spring",
              stiffness: showLogoAnimation ? 400 : 260,
              damping: showLogoAnimation ? 25 : 20,
              duration: showLogoAnimation ? 0.6 : 1,
            }}
          >
            {showLogoAnimation && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 bg-white/30 rounded-full animate-ping opacity-75"></div>
              </div>
            )}

            <motion.img
              src={Logo}
              alt="Centro Educacional Pinheiros"
              className="w-32 h-32 sm:w-40 sm:h-40 object-contain drop-shadow-2xl relative z-10"
              animate={
                showLogoAnimation
                  ? {
                      scale: [1, 1.1, 1],
                      y: [0, -10, 0],
                    }
                  : {}
              }
              transition={
                showLogoAnimation
                  ? {
                      duration: 0.8,
                      repeat: 1,
                      ease: "easeInOut",
                    }
                  : {}
              }
            />
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center font-primary mb-4 drop-shadow-lg px-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Centro Educacional Pinheiros
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-white/90 text-center font-secondary max-w-md mx-auto px-4 drop-shadow mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Educação que transforma vidas
          </motion.p>

          <motion.div
            className="w-64 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Progress
              value={progress}
              className="h-2 bg-white/30"
              gradient="linear-gradient(90deg, #10b981, #22c55e, #16a34a)"
            />
          </motion.div>

          <motion.p
            className="text-white/80 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {progress === 100
              ? "Pronto!"
              : `Inicializando... ${Math.floor(progress)}%`}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
