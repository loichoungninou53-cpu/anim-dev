"use client"

import { motion } from "framer-motion";

export function DashboardsDemo() {
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_2fr]">
      <div className="space-y-2">
        {["Exemple A", "Exemple B", "Exemple C"].map((t, i) => (
          <motion.div key={t} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-3 text-sm">{t}</motion.div>
        ))}
      </div>
      <div className="glass rounded-2xl p-4">
        <div className="flex h-32 items-end gap-2">
          {[30, 60, 45, 80, 55].map((h, i) => (
            <motion.div key={i} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} style={{ height: `${h}%`, originY: 1 }} className="flex-1 rounded-md bg-primary/70" />
          ))}
        </div>
      </div>
    </div>
  )
}
