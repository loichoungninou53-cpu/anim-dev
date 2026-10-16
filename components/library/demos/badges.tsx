"use client"

import { motion } from "framer-motion";

export function BadgesDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold">
        <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span>
        Exemple actif
      </span>
      <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">Nouveau (exemple)</span>
    </div>
  )
}
