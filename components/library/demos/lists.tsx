"use client"

import { motion } from "framer-motion";

export function ListsDemo() {
  const rows = ["Élément un", "Élément deux", "Élément trois"]
  return (
    <ul className="glass mx-auto max-w-sm divide-y divide-primary/10 rounded-2xl text-sm">
      {rows.map((r, i) => (
        <motion.li key={r} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ x: 4 }} className="flex items-center gap-3 px-4 py-3">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-xs" aria-hidden>{i + 1}</span>
          {r}
        </motion.li>
      ))}
    </ul>
  )
}
