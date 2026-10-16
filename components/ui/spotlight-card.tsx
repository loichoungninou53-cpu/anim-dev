"use client"

import type { ReactNode } from "react"
import { useRef, type PointerEvent } from "react"
import { cn } from "@/lib/utils"

// Code original ANIM-DEV. Une lumière suit le pointeur à l'intérieur de la carte.
export default function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--x", `${e.clientX - r.left}px`)
    el.style.setProperty("--y", `${e.clientY - r.top}px`)
  }

  return (
    <div ref={ref} onPointerMove={onMove} className={cn("group relative overflow-hidden rounded-3xl", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(260px_circle_at_var(--x,50%)_var(--y,50%),rgba(225,42,31,0.18),transparent_70%)]"
      />
      <div className="relative">{children}</div>
    </div>
  )
}
