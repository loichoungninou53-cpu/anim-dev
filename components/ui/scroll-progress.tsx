"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

// Code original ANIM-DEV. Barre fixe en haut de page, proportionnelle au défilement (transform seul).
export default function ScrollProgress({ className }: { className?: string }) {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden="true" className={cn("pointer-events-none fixed inset-x-0 top-0 z-50 h-1", className)}>
      <div ref={bar} className="h-full origin-left bg-primary" style={{ transform: "scaleX(0)" }} />
    </div>
  )
}
