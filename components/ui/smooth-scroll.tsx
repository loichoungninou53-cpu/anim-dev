"use client"

import Lenis from "lenis"
import { useEffect, type ReactNode } from "react"

// Bibliothèque : Lenis (MIT). Défilement fluide pour toute la page.
// Désactivé si l'utilisateur demande moins de mouvement.

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let frame = 0
    const loop = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
