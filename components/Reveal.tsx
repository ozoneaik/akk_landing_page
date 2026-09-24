"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

// Fade-in + เลื่อนขึ้นเล็กน้อยเมื่อเลื่อนมาถึง
type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li";
};

export default function Reveal({ children, delay = 0, y = 24, className, as = "div" }: RevealProps) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
