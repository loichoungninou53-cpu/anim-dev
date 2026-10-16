"use client"

import { useState } from "react";
import { motion } from "framer-motion";

export function TogglesDemo() {
  const [on, setOn] = useState(false)
  return (
    <button role="switch" aria-checked={on} onClick={() => setOn(!on)} className={`relative flex h-7 w-12 items-center rounded-full p-1 transition-colors ${on ? "bg-primary" : "bg-foreground/20"}`}>
      <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 30 }} className={`h-5 w-5 rounded-full bg-white ${on ? "ml-auto" : ""}`} />
      <span className="sr-only">Interrupteur exemple</span>
    </button>
  )
}
