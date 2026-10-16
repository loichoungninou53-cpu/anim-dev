"use client"

import NumberFlow from "@number-flow/react"
import { useEffect, useRef, useState } from "react"

// Bibliothèque : @number-flow/react (MIT).

type AnimatedNumberProps = {
  value: number
  prefix?: string
  suffix?: string
  className?: string
}

/**
 * Compteur qui se déroule quand il entre dans l'écran.
 * Avec « réduire les animations », la valeur finale s'affiche directement.
 */
export default function AnimatedNumber({ value, prefix, suffix, className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <span ref={ref} className={className}>
      <NumberFlow value={shown ? value : 0} prefix={prefix} suffix={suffix} locales="fr-FR" />
    </span>
  )
}
