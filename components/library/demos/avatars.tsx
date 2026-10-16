"use client"

import { motion } from "framer-motion";

export function AvatarsDemo() {
  const letters = ["A", "B", "C", "D"]
  return (
    <div className="flex justify-center -space-x-3">
      {letters.map((l, i) => (
        <motion.span key={l} whileHover={{ y: -6, zIndex: 10 }} className="grid h-12 w-12 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-primary/80 to-primary/30 text-sm font-bold text-white" style={{ zIndex: letters.length - i }} aria-label={`Avatar exemple ${l}`}>
          {l}
        </motion.span>
      ))}
    </div>
  )
}
