"use client"

import { motion } from "framer-motion";

export function CardsDemo() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {["Carte A", "Carte B"].map((t) => (
        <motion.div key={t} whileHover={{ y: -4, scale: 1.01 }} className="glass rounded-2xl p-5">
          <p className="font-bold">{t}</p>
          <p className="mt-1 text-sm text-foreground/70">Exemple de contenu de carte.</p>
        </motion.div>
      ))}
    </div>
  )
}
