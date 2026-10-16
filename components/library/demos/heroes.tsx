"use client"

import { motion } from "framer-motion";

const up = (i = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
})

export function HeroesDemo() {
  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center">
      <motion.p {...up(0)} className="text-xs font-bold uppercase tracking-widest text-primary">Exemple</motion.p>
      <motion.h3 {...up(1)} className="text-3xl font-black tracking-tight">Un titre qui arrive en douceur</motion.h3>
      <motion.p {...up(2)} className="max-w-md text-sm text-foreground/70">Texte d'accroche de démonstration.</motion.p>
      <motion.span {...up(3)} className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white">Bouton exemple</motion.span>
    </div>
  )
}
