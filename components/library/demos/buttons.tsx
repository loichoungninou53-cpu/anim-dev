"use client"

import { motion } from "framer-motion";

export function ButtonsDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white">Survol et clic</motion.button>
      <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="glass rounded-full px-5 py-2 text-sm font-bold">Secondaire</motion.button>
    </div>
  )
}
