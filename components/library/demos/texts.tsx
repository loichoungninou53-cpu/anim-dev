"use client"

import { motion } from "framer-motion";

export function TextsDemo() {
  const words = "Chaque mot apparaît à son tour".split(" ")
  return (
    <p className="text-center text-3xl font-black tracking-tight">
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.5 }}
        >
          {w}&nbsp;
        </motion.span>
      ))}
    </p>
  )
}
