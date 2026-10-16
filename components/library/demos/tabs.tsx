"use client"

import { useState } from "react";
import { motion } from "framer-motion";

export function TabsDemo() {
  const tabs = ["Aperçu", "Détails", "Notes"]
  const [t, setT] = useState(tabs[0])
  return (
    <div className="mx-auto max-w-sm">
      <div role="tablist" className="glass flex gap-1 rounded-full p-1">
        {tabs.map((x) => (
          <button key={x} role="tab" aria-selected={t === x} onClick={() => setT(x)} className="relative flex-1 rounded-full py-1.5 text-sm">
            {t === x && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-white shadow" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className="relative">{x}</span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-center text-sm">Contenu de l'onglet « {t} » (exemple).</p>
    </div>
  )
}
