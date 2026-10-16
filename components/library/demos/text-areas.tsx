"use client"

import { useState } from "react";

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
