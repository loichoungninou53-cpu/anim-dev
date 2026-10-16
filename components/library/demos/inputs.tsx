"use client"

import { useState } from "react";
import { motion } from "framer-motion";

export function InputsDemo() {
  const [v, setV] = useState("")
  const [focus, setFocus] = useState(false)
  const lifted = focus || v.length > 0
  return (
    <label className="relative block max-w-sm">
      <motion.span
        animate={{ y: lifted ? -22 : 0, scale: lifted ? 0.8 : 1 }}
        className="pointer-events-none absolute left-3 top-3 origin-left text-sm text-foreground/60"
      >
        Adresse e-mail (exemple)
      </motion.span>
      <input
        value={v}
        onChange={(e) => setV(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="w-full rounded-xl border border-primary/20 bg-white/70 px-3 pb-2 pt-4 text-sm outline-none focus:border-primary"
      />
      <motion.span initial={false} animate={{ scaleX: focus ? 1 : 0 }} className="absolute bottom-0 left-3 right-3 h-0.5 origin-left bg-primary" />
    </label>
  )
}
