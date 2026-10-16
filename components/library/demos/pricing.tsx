"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PricingDemo() {
  const [annual, setAnnual] = useState(false)
  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2 text-sm">
        <button onClick={() => setAnnual(false)} aria-pressed={!annual} className="rounded-full border px-4 py-1.5">Mensuel</button>
        <button onClick={() => setAnnual(true)} aria-pressed={annual} className="rounded-full border px-4 py-1.5">Annuel</button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {["Formule A", "Formule B"].map((n, i) => (
          <div key={n} className="glass rounded-2xl p-5">
            <p className="font-bold">{n}</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={String(annual) + i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-2 text-2xl font-black"
              >
                {annual ? "Tarif annuel (exemple)" : "Tarif mensuel (exemple)"}
              </motion.p>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
