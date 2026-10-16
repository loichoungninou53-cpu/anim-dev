"use client"

import AnimatedNumber from "@/components/ui/animated-number";

export function NumbersDemo() {
  return (
    <div className="text-center text-5xl font-black tabular-nums">
      <AnimatedNumber value={2026} />
      <p className="mt-2 text-xs font-normal text-foreground/60">Nombre animé (exemple)</p>
    </div>
  )
}
