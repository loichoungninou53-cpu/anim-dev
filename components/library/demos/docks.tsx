"use client"

import { motion } from "framer-motion";

const DOCK = ["◐", "◓", "◑", "◒", "◔"]

export function DocksDemo() {
  return (
    <div className="glass mx-auto flex w-fit items-end gap-3 rounded-2xl px-4 py-3">
      {DOCK.map((d) => (
        <motion.button key={d} whileHover={{ scale: 1.35, y: -8 }} transition={{ type: "spring", stiffness: 400, damping: 18 }} className="grid h-10 w-10 place-items-center rounded-xl bg-white/80 text-lg shadow" aria-label={`Élément exemple ${d}`}>
          {d}
        </motion.button>
      ))}
    </div>
  )
}
