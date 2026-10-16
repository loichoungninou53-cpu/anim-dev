"use client"

import { useState } from "react";
import { motion } from "framer-motion";

export function SidebarsDemo() {
  const [open, setOpen] = useState(true)
  return (
    <div className="relative flex h-48 overflow-hidden rounded-2xl border border-primary/15 bg-white/60">
      <motion.aside animate={{ x: open ? 0 : -150 }} transition={{ type: "spring", stiffness: 300, damping: 32 }} className="glass w-40 shrink-0 space-y-2 p-3 text-sm">
        {["Accueil", "Projets", "Réglages"].map((x) => <p key={x} className="rounded-lg px-2 py-1 hover:bg-primary/10">{x}</p>)}
      </motion.aside>
      <button onClick={() => setOpen(!open)} className="m-3 h-fit rounded-full border px-3 py-1 text-xs">{open ? "Replier" : "Déplier"}</button>
    </div>
  )
}
