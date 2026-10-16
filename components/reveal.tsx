"use client"

import { motion, type HTMLMotionProps } from "framer-motion"

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number
}

// Apparition au défilement : montée douce + fondu, joué une seule fois.
export function Reveal({ delay = 0, children, className, ...props }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
