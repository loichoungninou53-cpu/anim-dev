"use client"

import { Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type PricingTier = {
  name: string
  price: string
  note: string
  features: readonly string[]
  recommended: boolean
}

type PricingSectionProps = {
  eyebrow: string
  title: string
  subtitle: string
  tiers: readonly PricingTier[]
  checkoutUrl: string
}

/**
 * Trois formules en éventail, comme des cartes tenues en main.
 * La formule active est au centre ; les deux autres s'appuient sur elle par le bas.
 * Un clic (ou Entrée) sur une carte latérale la fait venir au centre.
 * L'éventail se déploie une fois, au premier défilement. Sans JS, les cartes sont déjà en place.
 * Les boutons restent désactivés tant qu'aucune URL de commande n'est renseignée.
 */
export default function PricingSection({ eyebrow, title, subtitle, tiers, checkoutUrl }: PricingSectionProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [shown, setShown] = useState(false)
  const [settled, setSettled] = useState(false)
  // Index de la formule au centre. Par défaut : la formule recommandée.
  const [active, setActive] = useState(() => Math.max(0, tiers.findIndex((t) => t.recommended)))

  useEffect(() => {
    const root = rootRef.current
    setReady(true)
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
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
      { threshold: 0.3 },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [])

  // Le décalage d'entrée ne sert qu'au premier déploiement ; les clics suivants sont immédiats.
  useEffect(() => {
    if (!shown) return
    const timer = window.setTimeout(() => setSettled(true), 1400)
    return () => window.clearTimeout(timer)
  }, [shown])

  // Trois formules : 0 = centre, 1 = droite, 2 = gauche.
  const n = tiers.length
  const offsetOf = (i: number) => (i - active + n) % n
  const positionClass = (offset: number) =>
    offset === 0 ? "fan-center z-30" : offset === 1 ? "fan-side fan-right z-20" : "fan-side fan-left z-20"

  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">{eyebrow}</p>
        <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-3 text-sm text-foreground/60">{subtitle}</p>
      </div>

      <div
        ref={rootRef}
        className="fan-root mx-auto mt-12 grid max-w-5xl place-items-center overflow-x-clip py-10"
        data-fan={ready ? "ready" : undefined}
        data-shown={shown ? "true" : "false"}
        data-settled={settled ? "true" : "false"}
      >
        {tiers.map((tier, i) => {
          const offset = offsetOf(i)
          const isCenter = offset === 0
          return (
            <Card
              key={tier.name}
              role={isCenter ? undefined : "button"}
              tabIndex={isCenter ? undefined : 0}
              aria-label={isCenter ? undefined : `Afficher la formule ${tier.name}`}
              onClick={(e) => {
                if (isCenter) return
                e.preventDefault()
                setActive(i)
              }}
              onKeyDown={(e) => {
                if (isCenter || e.target !== e.currentTarget) return
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setActive(i)
                }
              }}
              className={cn(
                "fan-card glass-frost relative col-start-1 row-start-1 flex w-[min(58vw,340px)] flex-col rounded-3xl",
                positionClass(offset),
                !isCenter && "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                tier.recommended && "ring-1 ring-primary/35",
              )}
            >
              <div className="flex flex-1 flex-col" inert={!isCenter}>
                <CardHeader className="p-6 pb-4">
                  {tier.recommended && (
                    <span className="mb-3 inline-flex w-fit rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-md shadow-primary/30">
                      Recommandé
                    </span>
                  )}
                  <h3 className={cn("text-sm font-semibold", tier.recommended ? "text-primary" : "text-foreground/65")}>{tier.name}</h3>
                  <p className="mt-1 text-4xl font-extrabold tracking-tight text-foreground">{tier.price}</p>
                  <p className="mt-2 text-sm text-foreground/60">{tier.note}</p>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col p-6 pt-0">
                  <ul className="flex-1 space-y-3 text-sm">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    {checkoutUrl ? (
                      <a
                        href={checkoutUrl}
                        className={cn(
                          "flex w-full items-center justify-center rounded-2xl py-3.5 text-sm font-bold transition hover:-translate-y-0.5",
                          tier.recommended
                            ? "bg-[#1d6fd6] text-white shadow-lg shadow-[#1d6fd6]/35"
                            : "border border-primary/20 bg-white/70 text-primary",
                        )}
                      >
                        Je choisis {tier.name}
                      </a>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="block w-full rounded-2xl bg-foreground/10 py-3.5 text-center text-sm font-bold text-foreground/55"
                      >
                        {tier.recommended ? "Commande bientôt disponible" : "Bientôt disponible"}
                      </span>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
