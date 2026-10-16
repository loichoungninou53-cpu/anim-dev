"use client"

import { useState } from "react";
import { motion } from "framer-motion";

export function PaginationsDemo() {
  const [p, setP] = useState(1)
  return (
    <nav aria-label="Pagination exemple" className="flex items-center justify-center gap-1 text-sm">
      <button onClick={() => setP((v) => Math.max(1, v - 1))} className="rounded-full px-3 py-1.5" aria-label="Page précédente">‹</button>
      {[1, 2, 3, 4].map((n) => (
        <button key={n} onClick={() => setP(n)} aria-current={p === n ? "page" : undefined} className="relative h-9 w-9 rounded-full">
          {p === n && <motion.span layoutId="page-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 450, damping: 34 }} />}
          <span className={`relative ${p === n ? "font-bold text-white" : ""}`}>{n}</span>
        </button>
      ))}
      <button onClick={() => setP((v) => Math.min(4, v + 1))} className="rounded-full px-3 py-1.5" aria-label="Page suivante">›</button>
    </nav>
  )
}
