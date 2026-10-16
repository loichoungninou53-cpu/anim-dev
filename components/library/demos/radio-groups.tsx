"use client"

import { useState } from "react";
import { motion } from "framer-motion";

export function RadioGroupsDemo() {
  const opts = ["Choix 1", "Choix 2", "Choix 3"]
  const [v, setV] = useState(opts[0])
  return (
    <div role="radiogroup" aria-label="Exemple" className="mx-auto max-w-xs space-y-2">
      {opts.map((o) => (
        <button key={o} role="radio" aria-checked={v === o} onClick={() => setV(o)} className="glass flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm">
          <span className="relative grid h-4 w-4 place-items-center rounded-full border-2 border-primary">
            {v === o && <motion.span layoutId="radio-dot" className="h-2 w-2 rounded-full bg-primary" transition={{ type: "spring", stiffness: 500, damping: 35 }} />}
          </span>
          {o}
        </button>
      ))}
    </div>
  )
}
