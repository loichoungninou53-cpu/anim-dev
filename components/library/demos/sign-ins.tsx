"use client"

import { useState } from "react";
import { motion } from "framer-motion";

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
