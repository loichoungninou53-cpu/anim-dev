"use client"

import { useState } from "react";

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
