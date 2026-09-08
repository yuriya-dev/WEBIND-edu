"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface GsapRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade";
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
}

export default function GsapReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  stagger = 0,
  className = "",
}: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = ref.current;
    if (!el) return;

    let x = 0;
    let y = 0;

    if (direction === "up") y = 40;
    if (direction === "down") y = -40;
    if (direction === "left") x = 40;
    if (direction === "right") x = -40;

    const targets = stagger && el.children.length > 0 ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          x,
          y,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          stagger: stagger || 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [direction, delay, duration, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
