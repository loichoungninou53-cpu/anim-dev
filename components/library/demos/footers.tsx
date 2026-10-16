"use client"

import { motion } from "framer-motion";

const up = (i = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
})

const LINKS = ["Accueil", "Programme", "Tarifs", "FAQ"]

export function FootersDemo() {
  return (
    <footer className="glass rounded-2xl p-6">
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        {LINKS.map((l, i) => (
          <motion.li key={l} {...up(i)}><a href="#" className="hover:text-primary">{l}</a></motion.li>
        ))}
      </ul>
      <p className="mt-4 text-center text-xs text-foreground/60">© Exemple</p>
    </footer>
  )
}
