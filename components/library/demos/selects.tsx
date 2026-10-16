"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OPTIONS = ["Option A", "Option B", "Option C"]

export function SelectsDemo() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(OPTIONS[0])
  return (
    <div className="relative mx-auto max-w-xs">
      <button aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="flex w-full justify-between rounded-xl border border-primary/20 bg-white/70 px-3 py-2 text-sm">
        {value}<span aria-hidden>▾</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul role="listbox" initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6 }} className="glass absolute z-10 mt-2 w-full rounded-xl p-1 text-sm">
            {OPTIONS.map((o) => (
              <li key={o} role="option" aria-selected={o === value}>
                <button onClick={() => { setValue(o); setOpen(false) }} className="w-full rounded-lg px-3 py-2 text-left hover:bg-primary/10">{o}</button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
