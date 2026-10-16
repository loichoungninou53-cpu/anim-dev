"use client"

import {
  CheckCircle2,
  ClipboardList,
  Compass,
  FileText,
  Megaphone,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Store,
  Tag,
  Truck,
  type LucideIcon,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

export type ReceiveIconKey =
  | "compass"
  | "smartphone"
  | "search"
  | "shield"
  | "bag"
  | "truck"
  | "tag"
  | "clipboard"
  | "store"
  | "megaphone"
  | "file"

export type ReceiveItem = {
  kind: string
  title: string
  essence: string
  icon: ReceiveIconKey
}

const ICONS: Record<ReceiveIconKey, LucideIcon> = {
  compass: Compass,
  smartphone: Smartphone,
  search: Search,
  shield: ShieldCheck,
  bag: ShoppingBag,
  tag: Tag,
  clipboard: ClipboardList,
  truck: Truck,
  store: Store,
  megaphone: Megaphone,
  file: FileText,
}

type ReceiveSequenceProps = {
  items: ReceiveItem[]
  folderLabel: string
  folderMeta: string
}

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

// Position de la fiche dans le dossier et course de sortie (px).
const PAPER_TOP = 115
const PAPER_RISE = 230

/**
 * « Ce que tu reçois » :
 * - Sans JS ou avec « réduire les animations » : la liste reste statique et entièrement lisible.
 * - Avec JS : un dossier en verre collant. Chaque palier de défilement fait sortir une fiche
 *   avec son icône, son titre et son essentiel. Une fois toutes les fiches sorties, le dossier se dissout.
 * - La liste qui suit se dissout ligne par ligne en remontant.
 * Seuls transform et opacity sont animés.
 */
export default function ReceiveSequence({ items, folderLabel, folderMeta }: ReceiveSequenceProps) {
  const [motionOn, setMotionOn] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const folderRef = useRef<HTMLDivElement>(null)
  const sheetRefs = useRef<(HTMLDivElement | null)[]>([])
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setMotionOn(!mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (!motionOn) return
    let frame = 0

    const update = () => {
      frame = 0
      const vh = window.innerHeight

      const stage = stageRef.current
      if (stage) {
        const range = stage.offsetHeight - vh
        const p = range > 0 ? clamp(-stage.getBoundingClientRect().top / range) : 0
        // x va de 0 à N+1 : N fiches, puis une étape de dissolution du dossier.
        const x = p * (items.length + 1)

        sheetRefs.current.forEach((el, i) => {
          if (!el) return
          const t = clamp((x - i - 0.1) / 0.8)
          const e = easeOutCubic(t)
          const dir = i % 2 === 0 ? -1 : 1
          el.style.opacity = String(clamp(t * 3))
          el.style.transform = `translate3d(${dir * 6 * e}px, ${-PAPER_RISE * e}px, 0) rotate(${dir * -2.5 * e}deg)`
          el.style.zIndex = t > 0 ? String(30 + i) : "5"
        })

        const d = clamp(x - items.length)
        const folder = folderRef.current
        if (folder) {
          folder.style.opacity = String(1 - d * 0.85)
          folder.style.transform = `scale(${1 - d * 0.05})`
        }
      }

      const list = listRef.current
      if (list) {
        Array.from(list.children).forEach((node) => {
          const li = node as HTMLElement
          const top = li.getBoundingClientRect().top
          const v = clamp((vh * 0.45 - top) / (vh * 0.3))
          li.style.opacity = String(1 - v * 0.9)
          li.style.transform = `translate3d(0, ${-18 * v}px, 0) scale(${1 - 0.03 * v})`
        })
      }
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
  }, [motionOn, items.length])

  return (
    <>
      {motionOn && (
        <div ref={stageRef} className="relative" style={{ height: `${(items.length + 1) * 55}vh` }} aria-hidden="true">
          <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-5">
            <div ref={folderRef} className="relative" style={{ width: 300, height: 380 }}>
              {/* Dos du dossier */}
              <div className="absolute inset-0 rounded-[28px] border border-primary/25 bg-gradient-to-b from-primary/25 to-primary/45" />
              <div className="absolute -top-4 left-6 h-6 w-28 rounded-t-xl border border-b-0 border-primary/25 bg-primary/30" />

              {/* Fiches : chacune sort à son tour, avec son icône, son titre et son essentiel */}
              {items.map((item, i) => {
                const Icon = ICONS[item.icon]
                return (
                  <div
                    key={item.title}
                    ref={(el) => {
                      sheetRefs.current[i] = el
                    }}
                    className="absolute left-5 flex h-[260px] w-[260px] flex-col justify-between rounded-2xl bg-white p-6 opacity-0 shadow-xl shadow-primary/20"
                    style={{
                      top: PAPER_TOP,
                      backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 35px, rgba(225,42,31,0.10) 35px 36px)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-widest text-primary">{item.kind}</span>
                      <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                    </div>
                    <div>
                      <p className="text-lg font-extrabold leading-snug text-foreground">{item.title}</p>
                      <p className="mt-2 text-sm leading-snug text-foreground/65">{item.essence}</p>
                    </div>
                    <span className="text-xs font-semibold text-foreground/45">
                      {i + 1} / {items.length}
                    </span>
                  </div>
                )
              })}

              {/* Façade en verre, par-dessus les fiches */}
              <div
                className="glass-dark absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end rounded-[28px] p-6"
                style={{ top: PAPER_TOP + 5 }}
              >
                <p className="text-lg font-extrabold">{folderLabel}</p>
                <p className="text-xs text-foreground/60">{folderMeta}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Liste lisible sans JS ; se dissout en verre pendant le défilement si l'animation est active */}
      <ul
        ref={listRef}
        className="glass mx-auto mt-12 max-w-3xl space-y-4 rounded-[28px] p-7 text-sm will-change-[opacity,transform] sm:p-10"
      >
        {items.map((item) => {
          const Icon = ICONS[item.icon]
          return (
            <li key={item.title} className="flex items-start gap-3 border-b border-primary/10 pb-4 last:border-0 last:pb-0">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold">{item.title}</span>
                <span className="mt-0.5 block text-xs text-foreground/60">{item.essence}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </>
  )
}
