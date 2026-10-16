"use client"

// Code original ANIM-DEV. Aucun formulaire n'envoie de données.
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function SignInsDemo() {
  const [loading, setLoading] = useState(false)
  return (
    <form onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => setLoading(false), 1200) }} className="mx-auto max-w-xs space-y-3">
      <input aria-label="E-mail (exemple)" placeholder="E-mail (exemple)" className="w-full rounded-xl border border-primary/20 bg-white/70 px-3 py-2 text-sm outline-none focus:border-primary" />
      <input aria-label="Mot de passe (exemple)" type="password" placeholder="Mot de passe (exemple)" className="w-full rounded-xl border border-primary/20 bg-white/70 px-3 py-2 text-sm outline-none focus:border-primary" />
      <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2 text-sm font-bold text-white disabled:opacity-70">
        {loading && <span className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent motion-safe:animate-spin" />}
        {loading ? "Vérification…" : "Se connecter (exemple)"}
      </button>
    </form>
  )
}

export function SignUpsDemo() {
  const [step, setStep] = useState(1)
  return (
    <div className="mx-auto max-w-xs space-y-4">
      <div className="h-1.5 overflow-hidden rounded-full bg-primary/15">
        <motion.div className="h-full origin-left rounded-full bg-primary" animate={{ scaleX: step / 3 }} transition={{ duration: 0.5 }} />
      </div>
      <p className="text-center text-sm">Étape {step} sur 3 (exemple)</p>
      <div className="flex gap-2">
        <button onClick={() => setStep((s) => Math.max(1, s - 1))} className="flex-1 rounded-xl border py-2 text-sm">Retour</button>
        <button onClick={() => setStep((s) => Math.min(3, s + 1))} className="flex-1 rounded-xl bg-primary py-2 text-sm font-bold text-white">Suivant</button>
      </div>
    </div>
  )
}

const OPTIONS = ["Option A", "Option B", "Option C"]

export function SelectsDemo() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(OPTIONS[0])
  return (
    <div className="relative mx-auto max-w-xs">
      <button aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="flex w-full justify-between rounded-xl border border-primary/20 bg-white/70 px-3 py-2 text-sm">
        {value}<span aria-hidden>▾</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul role="listbox" initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6 }} className="glass absolute z-10 mt-2 w-full rounded-xl p-1 text-sm">
            {OPTIONS.map((o) => (
              <li key={o} role="option" aria-selected={o === value}>
                <button onClick={() => { setValue(o); setOpen(false) }} className="w-full rounded-lg px-3 py-2 text-left hover:bg-primary/10">{o}</button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export function CheckboxesDemo() {
  const items = ["Case A", "Case B"]
  const [on, setOn] = useState<Record<string, boolean>>({})
  return (
    <div className="flex justify-center gap-6">
      {items.map((i) => (
        <label key={i} className="flex cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" className="sr-only" checked={!!on[i]} onChange={(e) => setOn({ ...on, [i]: e.target.checked })} />
          <span className={`grid h-5 w-5 place-items-center rounded-md border-2 transition-colors ${on[i] ? "border-primary bg-primary" : "border-primary/40"}`}>
            <motion.svg viewBox="0 0 12 12" className="h-3 w-3" initial={false} animate={{ scale: on[i] ? 1 : 0, opacity: on[i] ? 1 : 0 }}>
              <path d="M2 6.5 5 9.5 10 3" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </span>
          {i}
        </label>
      ))}
    </div>
  )
}

export function RadioGroupsDemo() {
  const opts = ["Choix 1", "Choix 2", "Choix 3"]
  const [v, setV] = useState(opts[0])
  return (
    <div role="radiogroup" aria-label="Exemple" className="mx-auto max-w-xs space-y-2">
      {opts.map((o) => (
        <button key={o} role="radio" aria-checked={v === o} onClick={() => setV(o)} className="glass flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm">
          <span className="relative grid h-4 w-4 place-items-center rounded-full border-2 border-primary">
            {v === o && <motion.span layoutId="radio-dot" className="h-2 w-2 rounded-full bg-primary" transition={{ type: "spring", stiffness: 500, damping: 35 }} />}
          </span>
          {o}
        </button>
      ))}
    </div>
  )
}

export function TogglesDemo() {
  const [on, setOn] = useState(false)
  return (
    <button role="switch" aria-checked={on} onClick={() => setOn(!on)} className={`relative flex h-7 w-12 items-center rounded-full p-1 transition-colors ${on ? "bg-primary" : "bg-foreground/20"}`}>
      <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 30 }} className={`h-5 w-5 rounded-full bg-white ${on ? "ml-auto" : ""}`} />
      <span className="sr-only">Interrupteur exemple</span>
    </button>
  )
}

export function SlidersDemo() {
  const [v, setV] = useState(40)
  return (
    <div className="mx-auto max-w-xs">
      <label className="block text-sm">
        Valeur exemple : <span className="font-bold">{v}</span>
        <input type="range" min={0} max={100} value={v} onChange={(e) => setV(Number(e.target.value))} className="mt-3 w-full accent-[var(--color-primary,#e12a1f)]" />
      </label>
    </div>
  )
}

function Days({ selected, onPick }: { selected: number; onPick: (d: number) => void }) {
  return (
    <div className="grid grid-cols-7 gap-1 text-center text-sm">
      {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
        <button key={d} onClick={() => onPick(d)} className="relative aspect-square rounded-full" aria-pressed={selected === d}>
          {selected === d && <motion.span layoutId="day-pick" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 450, damping: 34 }} />}
          <span className={`relative ${selected === d ? "font-bold text-white" : ""}`}>{d}</span>
        </button>
      ))}
    </div>
  )
}

export function DatePickersDemo() {
  const [d, setD] = useState(12)
  return (
    <div className="glass mx-auto max-w-xs rounded-2xl p-4">
      <p className="mb-2 text-center text-sm font-bold">Jour choisi : {d}</p>
      <Days selected={d} onPick={setD} />
    </div>
  )
}

export function CalendarsDemo() {
  const [d, setD] = useState(5)
  return (
    <div className="glass mx-auto max-w-xs rounded-2xl p-4">
      <p className="mb-2 text-center text-sm font-bold">Mois d'exemple</p>
      <Days selected={d} onPick={setD} />
    </div>
  )
}

export function TextAreasDemo() {
  const [v, setV] = useState("")
  const max = 200
  return (
    <div className="mx-auto max-w-sm">
      <textarea
        value={v}
        maxLength={max}
        onChange={(e) => setV(e.target.value)}
        rows={2}
        placeholder="Écris un message d'exemple…"
        className="w-full resize-none rounded-xl border border-primary/20 bg-white/70 px-3 py-2 text-sm outline-none focus:border-primary"
        aria-describedby="ta-count"
      />
      <p id="ta-count" className="mt-1 text-right text-xs text-foreground/60">{v.length}/{max}</p>
      <p className="text-xs text-foreground/60">Rien n'est envoyé.</p>
    </div>
  )
}
