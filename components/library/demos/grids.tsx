"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function GridsDemo() {
  const [filter, setFilter] = useState<"all" | "a" | "b">("all")
  const items = [1, 2, 3, 4, 5, 6].map((n) => ({ n, k: n % 2 ? "a" : "b" }))
  const shown = items.filter((i) => filter === "all" || i.k === filter)
  return (
    <div className="space-y-3">
      <div className="flex justify-center gap-2 text-sm">
        {(["all", "a", "b"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f} className={`rounded-full border px-3 py-1 ${filter === f ? "bg-primary text-white" : ""}`}>{f === "all" ? "Tous" : f === "a" ? "Groupe A" : "Groupe B"}</button>
        ))}
      </div>
      <motion.div layout className="grid grid-cols-3 gap-2">
        <AnimatePresence>
          {shown.map((i) => (
            <motion.div key={i.n} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="glass grid aspect-square place-items-center rounded-xl text-sm font-bold">{i.n}</motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
