import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

interface MarqueeEffectProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  gap?: number;
}

export default function MarqueeEffect({
  children,
  className = "",
  speed = 50,
  gap = 32,
}: MarqueeEffectProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [active, setActive] = useState(false);

  const recalc = () => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const containerW = container.clientWidth;
    const textW = measure.scrollWidth;
    setOverflowing(textW > containerW + 1);
    if (textW <= containerW + 1 && active) {
      setActive(false);
    }
  };

  useLayoutEffect(() => {
    recalc();
  }, [children]);

  useEffect(() => {
    const onResize = () => recalc();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const textWidth = measureRef.current?.scrollWidth || 0;
  const distance = Math.max(0, textWidth + gap);
  const duration = speed > 0 ? distance / speed : 8;

  const handleClick = () => {
    if (!overflowing) return;
    setActive((s) => !s);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full ${className}`}
      onClick={handleClick}
      style={{ cursor: overflowing ? "pointer" : "default" }}
    >
      <span
        ref={measureRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          left: 0,
          top: 0,
        }}
        aria-hidden
      >
        {children}
      </span>

      {!active || !overflowing ? (
        <span className="block truncate">{children}</span>
      ) : (
        <div
          className="marquee-wrapper"
          style={
            {
              ["--marquee-distance" as any]: `${distance}px`,
              ["--marquee-duration" as any]: `${duration}s`,
              ["--marquee-gap" as any]: `${gap}px`,
            } as React.CSSProperties
          }
        >
          <div className="marquee-track">
            <span className="marquee-item">{children}</span>
            <span className="marquee-item">{children}</span>
          </div>
        </div>
      )}
    </div>
  );
}
