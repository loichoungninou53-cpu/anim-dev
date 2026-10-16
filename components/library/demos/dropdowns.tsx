"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function DropdownsDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative mx-auto w-fit">
      <button aria-expanded={open} onClick={() => setOpen(!open)} className="rounded-full border px-4 py-2 text-sm">Options ▾</button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, scale: 0.94, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94 }} style={{ originY: 0 }} className="glass absolute left-0 mt-2 w-44 rounded-xl p-1 text-sm">
            {["Modifier", "Dupliquer", "Supprimer"].map((x) => <button key={x} onClick={() => setOpen(false)} className="block w-full rounded-lg px-3 py-2 text-left hover:bg-primary/10">{x}</button>)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
