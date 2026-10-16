"use client"

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

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
