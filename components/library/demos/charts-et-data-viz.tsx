"use client"

import { motion } from "framer-motion";

const BARS = [40, 70, 55, 85, 60, 92]

export function ChartsDemo() {
  return (
    <div className="glass mx-auto flex h-48 max-w-md items-end gap-3 rounded-2xl p-5">
      {BARS.map((h, i) => (
        <motion.div key={i} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.6 }} style={{ height: `${h}%`, originY: 1 }} className="flex-1 rounded-t-lg bg-gradient-to-t from-primary to-primary/40" aria-label={`Barre exemple ${i + 1}`} />
      ))}
    </div>
  )
}
