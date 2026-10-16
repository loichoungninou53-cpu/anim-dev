"use client"

import AnimatedNumber from "@/components/ui/animated-number";

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
