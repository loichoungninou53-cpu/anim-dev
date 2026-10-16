"use client"

// Code original ANIM-DEV. Chiffres d'exemple uniquement : aucune donnée réelle.
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AnimatedNumber from "@/components/ui/animated-number"

const BARS = [40, 70, 55, 85, 60, 92]

export function ChartsDemo() {
  return (
    <div className="glass mx-auto flex h-48 max-w-md items-end gap-3 rounded-2xl p-5">
      {BARS.map((h, i) => (
        <motion.div key={i} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.6 }} style={{ height: `${h}%`, originY: 1 }} className="flex-1 rounded-t-lg bg-gradient-to-t from-primary to-primary/40" aria-label={`Barre exemple ${i + 1}`} />
      ))}
    </div>
  )
}

export function StatsDemo() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {[12, 48, 96].map((v, i) => (
        <div key={i} className="glass rounded-2xl p-5 text-center">
          <p className="text-3xl font-black"><AnimatedNumber value={v} /></p>
          <p className="mt-1 text-xs text-foreground/60">Indicateur exemple</p>
        </div>
      ))}
    </div>
  )
}

export function DashboardsDemo() {
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_2fr]">
      <div className="space-y-2">
        {["Exemple A", "Exemple B", "Exemple C"].map((t, i) => (
          <motion.div key={t} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-3 text-sm">{t}</motion.div>
        ))}
      </div>
      <div className="glass rounded-2xl p-4">
        <div className="flex h-32 items-end gap-2">
          {[30, 60, 45, 80, 55].map((h, i) => (
            <motion.div key={i} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} style={{ height: `${h}%`, originY: 1 }} className="flex-1 rounded-md bg-primary/70" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProgressDemo() {
  return (
    <div className="mx-auto max-w-sm space-y-3">
      {[35, 70].map((p) => (
        <div key={p}>
          <div className="mb-1 flex justify-between text-xs"><span>Progression exemple</span><span>{p} %</span></div>
          <div role="progressbar" aria-valuenow={p} aria-valuemin={0} aria-valuemax={100} className="h-2 overflow-hidden rounded-full bg-primary/15">
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: p / 100 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} style={{ originX: 0 }} className="h-full w-full rounded-full bg-primary" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function NumbersDemo() {
  return (
    <div className="text-center text-5xl font-black tabular-nums">
      <AnimatedNumber value={2026} />
      <p className="mt-2 text-xs font-normal text-foreground/60">Nombre animé (exemple)</p>
    </div>
  )
}

export function ToastsDemo() {
  const [items, setItems] = useState<number[]>([])
  const add = () => {
    const id = Date.now()
    setItems((s) => [...s, id])
    setTimeout(() => setItems((s) => s.filter((x) => x !== id)), 2600)
  }
  return (
    <div className="flex flex-col items-center gap-3">
      <button onClick={add} className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white">Afficher une notification</button>
      <div aria-live="polite" className="fixed bottom-4 right-4 z-50 flex w-72 flex-col gap-2">
        <AnimatePresence>
          {items.map((id) => (
            <motion.div key={id} layout initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} className="glass-dark rounded-xl px-4 py-3 text-sm">Message exemple</motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function AlertsDemo() {
  const [show, setShow] = useState(true)
  return (
    <div className="mx-auto max-w-md">
      <AnimatePresence>
        {show && (
          <motion.div role="alert" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center justify-between gap-3 rounded-xl border border-amber-500/40 bg-amber-50 px-4 py-3 text-sm">
            <span>Alerte exemple : ceci est un message de démonstration.</span>
            <button onClick={() => setShow(false)} className="rounded-full px-2 font-bold" aria-label="Fermer l'alerte">×</button>
          </motion.div>
        )}
      </AnimatePresence>
      {!show && <button onClick={() => setShow(true)} className="mt-2 text-sm underline">Réafficher</button>}
    </div>
  )
}

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

export function EmptyStatesDemo() {
  return (
    <div className="glass mx-auto flex max-w-sm flex-col items-center gap-3 rounded-2xl p-8 text-center">
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-2xl" aria-hidden>∅</motion.div>
      <p className="font-bold">Aucun élément (exemple)</p>
      <p className="text-sm text-foreground/70">Explication courte de l'état vide.</p>
    </div>
  )
}
