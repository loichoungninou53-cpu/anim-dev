"use client"

import type { ReactNode } from "react"
import { useRef, type PointerEvent } from "react"
import { cn } from "@/lib/utils"

// Code original ANIM-DEV. La carte s'incline vers le pointeur (souris uniquement).
export default function TiltCard({ children, className, max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${-py * max}deg) rotateY(${px * max}deg)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ""
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={cn("transition-transform duration-300 ease-out will-change-transform", className)}>
      {children}
    </div>
  )
}
