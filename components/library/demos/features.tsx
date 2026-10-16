"use client"

import { motion } from "framer-motion";

const up = (i = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
})

const FEATURES = [
  { t: "Rapide", d: "Exemple de bénéfice." },
  { t: "Clair", d: "Exemple de bénéfice." },
  { t: "Simple", d: "Exemple de bénéfice." },
]

export function FeaturesDemo() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {FEATURES.map((f, i) => (
        <motion.div key={f.t} {...up(i)} whileHover={{ y: -6 }} className="glass rounded-2xl p-5">
          <div className="mb-3 h-9 w-9 rounded-xl bg-primary/15" aria-hidden />
          <p className="font-bold">{f.t}</p>
          <p className="mt-1 text-sm text-foreground/70">{f.d}</p>
        </motion.div>
      ))}
    </div>
  )
}
