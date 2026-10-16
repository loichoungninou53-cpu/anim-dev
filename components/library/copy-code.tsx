"use client"

// Code original ANIM-DEV. Copie le code de la démo dans le presse-papiers.
import { useState } from "react"

export default function CopyCode({ code }: { code: string }) {
  const [ok, setOk] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code)
          setOk(true)
          setTimeout(() => setOk(false), 1800)
        } catch {
          setOk(false)
        }
      }}
      className="shrink-0 rounded-full border border-primary/30 bg-white/70 px-3 py-1 text-xs font-bold text-primary"
    >
      {ok ? "Copié ✓" : "Copier le code"}
    </button>
  )
}
