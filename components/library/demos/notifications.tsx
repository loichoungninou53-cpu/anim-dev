"use client"

import { useState } from "react";
import { motion } from "framer-motion";

export function NotificationsDemo() {
  const [n, setN] = useState(3)
  return (
    <div className="glass mx-auto max-w-xs rounded-2xl p-4">
      <button onClick={() => setN((v) => v + 1)} className="relative text-sm font-bold">
        Notifications (exemple)
        <motion.span key={n} initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 14 }} className="ml-2 inline-grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-xs text-white">{n}</motion.span>
      </button>
      <p className="mt-2 text-xs text-foreground/60">Clique pour ajouter une notification d'exemple.</p>
    </div>
  )
}
