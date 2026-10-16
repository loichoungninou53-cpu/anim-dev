"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AlertsDemo() {
  const [show, setShow] = useState(true)
  return (
    <div className="mx-auto max-w-md">
      <AnimatePresence>
        {show && (
          <motion.div role="alert" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center justify-between gap-3 rounded-xl border border-amber-500/40 bg-amber-50 px-4 py-3 text-sm">
            <span>Alerte exemple : ceci est un message de démonstration.</span>
            <button onClick={() => setShow(false)} className="rounded-full px-2 font-bold" aria-label="Fermer l'alerte">×</button>
          </motion.div>
        )}
      </AnimatePresence>
      {!show && <button onClick={() => setShow(true)} className="mt-2 text-sm underline">Réafficher</button>}
    </div>
  )
}
