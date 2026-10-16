"use client"

// Code original ANIM-DEV.
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function SidebarsDemo() {
  const [open, setOpen] = useState(true)
  return (
    <div className="relative flex h-48 overflow-hidden rounded-2xl border border-primary/15 bg-white/60">
      <motion.aside animate={{ x: open ? 0 : -150 }} transition={{ type: "spring", stiffness: 300, damping: 32 }} className="glass w-40 shrink-0 space-y-2 p-3 text-sm">
        {["Accueil", "Projets", "Réglages"].map((x) => <p key={x} className="rounded-lg px-2 py-1 hover:bg-primary/10">{x}</p>)}
      </motion.aside>
      <button onClick={() => setOpen(!open)} className="m-3 h-fit rounded-full border px-3 py-1 text-xs">{open ? "Replier" : "Déplier"}</button>
    </div>
  )
}

const MENU = ["Profil", "Préférences", "Aide"]

export function MenusDemo() {
  const [a, setA] = useState(MENU[0])
  return (
    <ul role="menu" className="glass mx-auto max-w-xs space-y-1 rounded-2xl p-2 text-sm">
      {MENU.map((m) => (
        <li key={m} role="none" className="relative">
          {a === m && <motion.span layoutId="menu-hl" className="absolute inset-0 rounded-lg bg-primary/12" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
          <button role="menuitem" onMouseEnter={() => setA(m)} onFocus={() => setA(m)} className="relative w-full rounded-lg px-3 py-2 text-left">{m}</button>
        </li>
      ))}
    </ul>
  )
}

export function DropdownsDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative mx-auto w-fit">
      <button aria-expanded={open} onClick={() => setOpen(!open)} className="rounded-full border px-4 py-2 text-sm">Options ▾</button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, scale: 0.94, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94 }} style={{ originY: 0 }} className="glass absolute left-0 mt-2 w-44 rounded-xl p-1 text-sm">
            {["Modifier", "Dupliquer", "Supprimer"].map((x) => <button key={x} onClick={() => setOpen(false)} className="block w-full rounded-lg px-3 py-2 text-left hover:bg-primary/10">{x}</button>)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

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

const DOCK = ["◐", "◓", "◑", "◒", "◔"]

export function DocksDemo() {
  return (
    <div className="glass mx-auto flex w-fit items-end gap-3 rounded-2xl px-4 py-3">
      {DOCK.map((d) => (
        <motion.button key={d} whileHover={{ scale: 1.35, y: -8 }} transition={{ type: "spring", stiffness: 400, damping: 18 }} className="grid h-10 w-10 place-items-center rounded-xl bg-white/80 text-lg shadow" aria-label={`Élément exemple ${d}`}>
          {d}
        </motion.button>
      ))}
    </div>
  )
}

export function GridsDemo() {
  const [filter, setFilter] = useState<"all" | "a" | "b">("all")
  const items = [1, 2, 3, 4, 5, 6].map((n) => ({ n, k: n % 2 ? "a" : "b" }))
  const shown = items.filter((i) => filter === "all" || i.k === filter)
  return (
    <div className="space-y-3">
      <div className="flex justify-center gap-2 text-sm">
        {(["all", "a", "b"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f} className={`rounded-full border px-3 py-1 ${filter === f ? "bg-primary text-white" : ""}`}>{f === "all" ? "Tous" : f === "a" ? "Groupe A" : "Groupe B"}</button>
        ))}
      </div>
      <motion.div layout className="grid grid-cols-3 gap-2">
        <AnimatePresence>
          {shown.map((i) => (
            <motion.div key={i.n} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="glass grid aspect-square place-items-center rounded-xl text-sm font-bold">{i.n}</motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export function ListsDemo() {
  const rows = ["Élément un", "Élément deux", "Élément trois"]
  return (
    <ul className="glass mx-auto max-w-sm divide-y divide-primary/10 rounded-2xl text-sm">
      {rows.map((r, i) => (
        <motion.li key={r} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ x: 4 }} className="flex items-center gap-3 px-4 py-3">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-xs" aria-hidden>{i + 1}</span>
          {r}
        </motion.li>
      ))}
    </ul>
  )
}

const ACC = [
  { q: "Question exemple 1", a: "Réponse d'exemple 1." },
  { q: "Question exemple 2", a: "Réponse d'exemple 2." },
]

export function AccordionsDemo() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="mx-auto max-w-md space-y-2">
      {ACC.map((it, i) => (
        <div key={it.q} className="glass rounded-xl">
          <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="flex w-full justify-between px-4 py-3 text-left text-sm font-bold">
            {it.q}<span aria-hidden className={`transition-transform ${open === i ? "rotate-180" : ""}`}>▾</span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-4 text-sm text-foreground/70">
                <p className="pb-3">{it.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export function ScrollAreasDemo() {
  return (
    <div className="relative mx-auto max-w-md">
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 [scrollbar-color:var(--color-primary,#e12a1f)_transparent]">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="glass grid h-32 w-40 shrink-0 snap-start place-items-center rounded-2xl text-sm font-bold">Carte {i + 1}</div>
        ))}
      </div>
      <p className="text-center text-xs text-foreground/60">Glisse horizontalement (exemple)</p>
    </div>
  )
}
