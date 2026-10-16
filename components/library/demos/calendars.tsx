"use client"

import { useState } from "react";
import { motion } from "framer-motion";

function Days({ selected, onPick }: { selected: number; onPick: (d: number) => void }) {
  return (
    <div className="grid grid-cols-7 gap-1 text-center text-sm">
      {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
        <button key={d} onClick={() => onPick(d)} className="relative aspect-square rounded-full" aria-pressed={selected === d}>
          {selected === d && <motion.span layoutId="day-pick" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 450, damping: 34 }} />}
          <span className={`relative ${selected === d ? "font-bold text-white" : ""}`}>{d}</span>
        </button>
      ))}
    </div>
  )
}

export function CalendarsDemo() {
  const [d, setD] = useState(5)
  return (
    <div className="glass mx-auto max-w-xs rounded-2xl p-4">
      <p className="mb-2 text-center text-sm font-bold">Mois d'exemple</p>
      <Days selected={d} onPick={setD} />
    </div>
  )
}
