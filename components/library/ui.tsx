"use client"

// Code original ANIM-DEV. Aucune donnée envoyée : formulaires et boutons sont des exemples.
import { useEffect, useState, type FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function ButtonsDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white">Survol et clic</motion.button>
      <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="glass rounded-full px-5 py-2 text-sm font-bold">Secondaire</motion.button>
    </div>
  )
}

export function AiChatsDemo() {
  const msgs = [
    { me: true, t: "Exemple de question ?" },
    { me: false, t: "Exemple de réponse, affichée message par message." },
  ]
  const [n, setN] = useState(0)
  useEffect(() => {
    if (n >= msgs.length) return
    const id = setTimeout(() => setN((v) => v + 1), 900)
    return () => clearTimeout(id)
  }, [n, msgs.length])
  return (
    <div className="mx-auto flex max-w-sm flex-col gap-2 rounded-2xl bg-white/60 p-4">
      <AnimatePresence initial={false}>
        {msgs.slice(0, n).map((m, i) => (
          <motion.p key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.me ? "ml-auto bg-primary text-white" : "glass"}`}>{m.t}</motion.p>
        ))}
      </AnimatePresence>
      {n < msgs.length && (
        <div className="flex gap-1 p-2" aria-label="En train d'écrire">
          {[0, 1, 2].map((d) => (
            <span key={d} className="h-1.5 w-1.5 rounded-full bg-foreground/50 motion-safe:animate-bounce" style={{ animationDelay: `${d * 0.12}s` }} />
          ))}
        </div>
      )}
    </div>
  )
}

export function CardsDemo() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {["Carte A", "Carte B"].map((t) => (
        <motion.div key={t} whileHover={{ y: -4, scale: 1.01 }} className="glass rounded-2xl p-5">
          <p className="font-bold">{t}</p>
          <p className="mt-1 text-sm text-foreground/70">Exemple de contenu de carte.</p>
        </motion.div>
      ))}
    </div>
  )
}

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

const ROWS = [["Ligne 1", "Exemple", "Actif"], ["Ligne 2", "Exemple", "En attente"], ["Ligne 3", "Exemple", "Actif"]]

export function TablesDemo() {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/15 bg-white/60">
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase text-foreground/60"><tr><th className="p-3">Nom</th><th className="p-3">Type</th><th className="p-3">Statut</th></tr></thead>
        <tbody>
          {ROWS.map((r, i) => (
            <motion.tr key={r[0]} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="border-t border-primary/10 hover:bg-primary/5">
              {r.map((c) => <td key={c} className="p-3">{c}</td>)}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function FormsDemo() {
  const [err, setErr] = useState(false)
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const ok = String(f.get("nom") ?? "").trim().length > 1
    setErr(!ok)
    setSent(ok)
  }
  return (
    <form onSubmit={submit} noValidate className="mx-auto max-w-sm space-y-3">
      <motion.input
        name="nom"
        aria-invalid={err}
        aria-label="Nom (exemple)"
        placeholder="Ton nom (exemple)"
        animate={err ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className={`w-full rounded-xl border bg-white/70 px-3 py-2 text-sm outline-none ${err ? "border-red-600" : "border-primary/20"}`}
      />
      <button className="w-full rounded-xl bg-primary py-2 text-sm font-bold text-white">Valider (aucun envoi)</button>
      <p className="min-h-5 text-center text-xs" role="status">
        {err && "Indique au moins 2 caractères."}
        {sent && "Exemple validé localement. Rien n'a été envoyé."}
      </p>
    </form>
  )
}

export function DialogsDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="text-center">
      <button onClick={() => setOpen(true)} className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white">Ouvrir le dialogue</button>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.div role="dialog" aria-modal="true" aria-label="Exemple de dialogue" onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} className="glass-dark w-full max-w-sm rounded-2xl p-6 text-left">
              <p className="font-bold">Dialogue d'exemple</p>
              <p className="mt-2 text-sm">Contenu de démonstration.</p>
              <button onClick={() => setOpen(false)} className="mt-4 rounded-full border px-4 py-1.5 text-sm">Fermer</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function TabsDemo() {
  const tabs = ["Aperçu", "Détails", "Notes"]
  const [t, setT] = useState(tabs[0])
  return (
    <div className="mx-auto max-w-sm">
      <div role="tablist" className="glass flex gap-1 rounded-full p-1">
        {tabs.map((x) => (
          <button key={x} role="tab" aria-selected={t === x} onClick={() => setT(x)} className="relative flex-1 rounded-full py-1.5 text-sm">
            {t === x && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-white shadow" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className="relative">{x}</span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-center text-sm">Contenu de l'onglet « {t} » (exemple).</p>
    </div>
  )
}

export function AvatarsDemo() {
  const letters = ["A", "B", "C", "D"]
  return (
    <div className="flex justify-center -space-x-3">
      {letters.map((l, i) => (
        <motion.span key={l} whileHover={{ y: -6, zIndex: 10 }} className="grid h-12 w-12 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-primary/80 to-primary/30 text-sm font-bold text-white" style={{ zIndex: letters.length - i }} aria-label={`Avatar exemple ${l}`}>
          {l}
        </motion.span>
      ))}
    </div>
  )
}

export function BadgesDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold">
        <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span>
        Exemple actif
      </span>
      <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">Nouveau (exemple)</span>
    </div>
  )
}
