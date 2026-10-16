"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACC = [
  { q: "Question exemple 1", a: "Réponse d'exemple 1." },
  { q: "Question exemple 2", a: "Réponse d'exemple 2." },
]

export function AccordionsDemo() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="mx-auto max-w-md space-y-2">
      {ACC.map((it, i) => (
        <div key={it.q} className="glass rounded-xl">
          <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="flex w-full justify-between px-4 py-3 text-left text-sm font-bold">
            {it.q}<span aria-hidden className={`transition-transform ${open === i ? "rotate-180" : ""}`}>▾</span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-4 text-sm text-foreground/70">
                <p className="pb-3">{it.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
