"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ToastsDemo() {
  const [items, setItems] = useState<number[]>([])
  const add = () => {
    const id = Date.now()
    setItems((s) => [...s, id])
    setTimeout(() => setItems((s) => s.filter((x) => x !== id)), 2600)
  }
  return (
    <div className="flex flex-col items-center gap-3">
      <button onClick={add} className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white">Afficher une notification</button>
      <div aria-live="polite" className="fixed bottom-4 right-4 z-50 flex w-72 flex-col gap-2">
        <AnimatePresence>
          {items.map((id) => (
            <motion.div key={id} layout initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} className="glass-dark rounded-xl px-4 py-3 text-sm">Message exemple</motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
