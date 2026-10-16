"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLayoutEffect, useRef } from "react"
import { cn } from "@/lib/utils"

// Bibliothèque : GSAP + ScrollTrigger (licence GreenSock « standard », gratuite).
gsap.registerPlugin(ScrollTrigger)

type GsapTextRevealProps = {
  text: string
  className?: string
}

/**
 * Révèle un texte mot par mot au défilement. Chaque mot monte depuis une fenêtre masquée.
 * Le texte reste lisible pour les lecteurs d'écran (aria-label), et les mots sont visibles
 * si JavaScript ou les animations sont désactivés.
 * Animations : transform et opacity uniquement.
 */
export default function GsapTextReveal({ text, className }: GsapTextRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll<HTMLElement>("[data-word]")
      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.04,
          ease: "power3.out",
          duration: 0.9,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <p ref={ref} aria-label={text} className={cn("text-balance leading-tight", className)}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true" className="mr-[0.25em] inline-block overflow-hidden align-bottom">
          <span data-word className="inline-block">
            {word}
          </span>
        </span>
      ))}
    </p>
  )
}
