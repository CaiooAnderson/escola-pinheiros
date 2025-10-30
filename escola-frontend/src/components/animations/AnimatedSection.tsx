import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  animateOnMount?: boolean;
  className?: string;
};

export default function AnimatedSection({
  children,
  direction = "up",
  delay = 0,
  animateOnMount = false,
  className = "",
}: AnimatedSectionProps) {
  const [isInView, setIsInView] = useState(animateOnMount);
  const [shouldForce, setShouldForce] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      },
    },
  };

  useEffect(() => {
    if (animateOnMount) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setShouldForce(false);
        }
      },
      {
        rootMargin: "-50px 0px",
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animateOnMount]);

  useEffect(() => {
    if (animateOnMount) return;

    const timer = setTimeout(() => {
      if (ref.current && !isInView) {
        const rect = ref.current.getBoundingClientRect();
        const isAboveFold = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isAboveFold) {
          setShouldForce(true);
        }
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [animateOnMount, isInView]);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView || shouldForce ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}