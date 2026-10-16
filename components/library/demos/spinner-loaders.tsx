"use client"

import { motion } from "framer-motion";

export function SpinnerLoadersDemo() {
  return (
    <div className="flex justify-center gap-10">
      <span className="h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary motion-safe:animate-spin" aria-label="Chargement" role="status" />
      <div className="flex gap-1.5" aria-label="Chargement" role="status">
        {[0, 1, 2].map((d) => (
          <span key={d} className="h-3 w-3 rounded-full bg-primary motion-safe:animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
        ))}
      </div>
    </div>
  )
}
