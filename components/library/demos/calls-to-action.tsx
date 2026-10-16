"use client"

import { motion } from "framer-motion";

const up = (i = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
})

export function CtaDemo() {
  return (
    <motion.div {...up(0)} className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-primary p-6 text-white sm:flex-row">
      <p className="text-lg font-bold">Appel à l'action d'exemple</p>
      <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="rounded-full bg-white px-5 py-2 text-sm font-bold text-primary">
        Action
      </motion.span>
    </motion.div>
  )
}
