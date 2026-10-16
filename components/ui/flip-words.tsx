"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

// Code original ANIM-DEV. Fait défiler plusieurs mots au même endroit (Framer Motion, MIT).
export default function FlipWords({ words, interval = 2400, className }: { words: string[]; interval?: number; className?: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(() => setIndex((v) => (v + 1) % words.length), interval)
    return () => window.clearInterval(timer)
  }, [words.length, interval])

  return (
    <span className={cn("relative inline-block", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35 }}
          className="inline-block text-primary"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
