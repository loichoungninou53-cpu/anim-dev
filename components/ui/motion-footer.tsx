"use client"

import { ArrowUp, BookOpen, Calculator, CircleDollarSign, CircleHelp, Tag, Truck, type LucideIcon } from "lucide-react"
import { useRef, type ReactNode, type PointerEvent } from "react"
import { cn } from "@/lib/utils"

export type FooterIconKey = "book" | "tag" | "help" | "truck" | "calc" | "money"

export type FooterLink = { label: string; href: string; icon: FooterIconKey }
export type FooterNote = { icon: FooterIconKey; text: string }

type MotionFooterProps = {
  brand: string
  year: number
  headline: string
  marquee: string[]
  links: FooterLink[]
  notes: FooterNote[]
}

const ICONS: Record<FooterIconKey, LucideIcon> = {
  book: BookOpen,
  tag: Tag,
  help: CircleHelp,
  truck: Truck,
  calc: Calculator,
  money: CircleDollarSign,
}

/**
 * Bouton « magnétique » sans dépendance : il suit légèrement le pointeur (souris uniquement).
 * Désactivé si l'utilisateur demande moins de mouvement.
 */
function MagneticPill({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    el.style.transform = `translate3d(${x * 0.18}px, ${y * 0.25}px, 0)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ""
  }

  return (
    <a ref={ref} href={href} onPointerMove={onMove} onPointerLeave={onLeave} className={className}>
      {children}
    </a>
  )
}

/**
 * Pied de page : texte géant en fond, bandeau défilant, liens magnétiques avec icônes.
 * Le contenu est passé en props. Aucun lien vers une application ou un store.
 */
export default function MotionFooter({ brand, year, headline, marquee, links, notes }: MotionFooterProps) {
  return (
    <footer className="relative mt-8 overflow-hidden border-t border-primary/15 pt-16 text-foreground">
      {/* Bandeau défilant */}
      <div aria-hidden="true" className="overflow-hidden border-y border-primary/15 bg-white/50 py-3">
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap text-xs font-black uppercase tracking-[0.25em] text-foreground/55">
          {[...marquee, ...marquee].map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              {item}
              <span className="text-primary" aria-hidden="true">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Texte géant, décoratif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-4vw] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[13vw] font-black leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(225,42,31,0.18)]"
      >
        {brand.toUpperCase()}
      </div>

      <div className="relative mx-auto max-w-5xl px-5 pb-10">
        <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-black tracking-tight sm:text-6xl">{headline}</h2>

        <nav aria-label="Liens utiles" className="mt-10 flex flex-wrap justify-center gap-3">
          {links.map(({ label, href, icon }) => {
            const Icon = ICONS[icon]
            return (
              <MagneticPill
                key={label}
                href={href}
                className={cn(
                  "glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-[transform,box-shadow] duration-300 ease-out hover:shadow-xl hover:shadow-primary/20",
                )}
              >
                <Icon className="size-4 text-primary" aria-hidden="true" />
                {label}
              </MagneticPill>
            )
          })}
        </nav>

        <ul className="mx-auto mt-10 grid max-w-3xl gap-3 text-xs leading-relaxed text-foreground/65 sm:grid-cols-3">
          {notes.map(({ icon, text }) => {
            const Icon = ICONS[icon]
            return (
              <li key={text} className="glass flex items-start gap-3 rounded-2xl p-4">
                <Icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{text}</span>
              </li>
            )
          })}
        </ul>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary/15 pt-6 text-xs text-foreground/55 sm:flex-row">
          <span>
            © {year} {brand}. Tous droits réservés.
          </span>
          <a
            href="#top"
            aria-label="Revenir en haut de la page"
            className="glass grid size-11 place-items-center rounded-full text-primary transition hover:-translate-y-0.5"
          >
            <ArrowUp className="size-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
