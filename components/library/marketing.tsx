"use client"

// Code original ANIM-DEV. Textes d'exemple uniquement (« Exemple »).
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const up = (i = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
})

export function HeroesDemo() {
  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center">
      <motion.p {...up(0)} className="text-xs font-bold uppercase tracking-widest text-primary">Exemple</motion.p>
      <motion.h3 {...up(1)} className="text-3xl font-black tracking-tight">Un titre qui arrive en douceur</motion.h3>
      <motion.p {...up(2)} className="max-w-md text-sm text-foreground/70">Texte d'accroche de démonstration.</motion.p>
      <motion.span {...up(3)} className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white">Bouton exemple</motion.span>
    </div>
  )
}

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

export function PricingDemo() {
  const [annual, setAnnual] = useState(false)
  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2 text-sm">
        <button onClick={() => setAnnual(false)} aria-pressed={!annual} className="rounded-full border px-4 py-1.5">Mensuel</button>
        <button onClick={() => setAnnual(true)} aria-pressed={annual} className="rounded-full border px-4 py-1.5">Annuel</button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {["Formule A", "Formule B"].map((n, i) => (
          <div key={n} className="glass rounded-2xl p-5">
            <p className="font-bold">{n}</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={String(annual) + i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-2 text-2xl font-black"
              >
                {annual ? "Tarif annuel (exemple)" : "Tarif mensuel (exemple)"}
              </motion.p>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

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

export function CtaDemo() {
  return (
    <motion.div {...up(0)} className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-primary p-6 text-white sm:flex-row">
      <p className="text-lg font-bold">Appel à l'action d'exemple</p>
      <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="rounded-full bg-white px-5 py-2 text-sm font-bold text-primary">
        Action
      </motion.span>
    </motion.div>
  )
}

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

export function NavbarsDemo() {
  const [active, setActive] = useState("Accueil")
  return (
    <nav aria-label="Exemple de navigation" className="glass flex justify-center gap-1 rounded-full p-1.5">
      {LINKS.map((l) => (
        <button key={l} onClick={() => setActive(l)} aria-current={active === l ? "page" : undefined} className="relative rounded-full px-4 py-1.5 text-sm">
          {active === l && (
            <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-primary/15" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
          )}
          <span className="relative">{l}</span>
        </button>
      ))}
    </nav>
  )
}

export function BackgroundsDemo() {
  return (
    <div className="relative h-56 overflow-hidden rounded-2xl border border-primary/15 bg-white/60">
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle,#e12a1f33_1px,transparent_1.5px)] [background-size:22px_22px] motion-safe:animate-[drift_14s_linear_infinite]" />
      <div className="absolute inset-0 grid place-items-center text-sm font-semibold">Fond à motif animé</div>
    </div>
  )
}

export function TextsDemo() {
  const words = "Chaque mot apparaît à son tour".split(" ")
  return (
    <p className="text-center text-3xl font-black tracking-tight">
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.5 }}
        >
          {w}&nbsp;
        </motion.span>
      ))}
    </p>
  )
}
