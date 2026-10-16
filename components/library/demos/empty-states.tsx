"use client"

import { motion } from "framer-motion";

export function EmptyStatesDemo() {
  return (
    <div className="glass mx-auto flex max-w-sm flex-col items-center gap-3 rounded-2xl p-8 text-center">
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-2xl" aria-hidden>∅</motion.div>
      <p className="font-bold">Aucun élément (exemple)</p>
      <p className="text-sm text-foreground/70">Explication courte de l'état vide.</p>
    </div>
  )
}
