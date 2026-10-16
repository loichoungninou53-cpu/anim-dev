"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function DialogsDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="text-center">
      <button onClick={() => setOpen(true)} className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white">Ouvrir le dialogue</button>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.div role="dialog" aria-modal="true" aria-label="Exemple de dialogue" onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} className="glass-dark w-full max-w-sm rounded-2xl p-6 text-left">
              <p className="font-bold">Dialogue d'exemple</p>
              <p className="mt-2 text-sm">Contenu de démonstration.</p>
              <button onClick={() => setOpen(false)} className="mt-4 rounded-full border px-4 py-1.5 text-sm">Fermer</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
