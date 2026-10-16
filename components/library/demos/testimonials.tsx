"use client"

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUOTES = ["« Témoignage fictif, exemple. »", "« Deuxième exemple de texte. »", "« Troisième exemple de texte. »"]

export function TestimonialsDemo() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 3500)
    return () => clearInterval(id)
  }, [])
  return (
    <figure className="glass mx-auto max-w-lg rounded-2xl p-7 text-center">
      <AnimatePresence mode="wait">
        <motion.blockquote key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-lg font-semibold">
          {QUOTES[i]}
        </motion.blockquote>
      </AnimatePresence>
      <figcaption className="mt-3 text-xs text-foreground/60">Exemple · non publié</figcaption>
    </figure>
  )
}
