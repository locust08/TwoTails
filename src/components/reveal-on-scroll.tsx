"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

function joinClasses(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function RevealOnScroll({
  children,
  className,
  delayMs = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  direction?: "up" | "left" | "right";
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setVisible(true);
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={joinClasses(
        "reveal-section",
        direction === "left" && "reveal-section-left",
        direction === "right" && "reveal-section-right",
        visible && "reveal-section-visible",
        className,
      )}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
