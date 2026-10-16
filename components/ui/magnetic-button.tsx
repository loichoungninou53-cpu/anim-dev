"use client"

import type { ReactNode } from "react"
import { useRef, type PointerEvent } from "react"
import { cn } from "@/lib/utils"

// Code original ANIM-DEV. Le bouton suit légèrement le pointeur (souris uniquement).
type MagneticButtonProps = {
  children: ReactNode
  className?: string
  href?: string
  strength?: number
  onClick?: () => void
}

export default function MagneticButton({ children, className, href, strength = 0.25, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ""
  }

  const classes = cn("inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold transition-[transform,box-shadow] duration-300 ease-out", className)

  if (href) {
    return (
      <a ref={ref} href={href} onPointerMove={onMove} onPointerLeave={onLeave} className={classes}>
        {children}
      </a>
    )
  }
  return (
    <button ref={ref} type="button" onClick={onClick} onPointerMove={onMove} onPointerLeave={onLeave} className={classes}>
      {children}
    </button>
  )
}
