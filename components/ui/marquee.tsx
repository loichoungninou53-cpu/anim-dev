import { cn } from "@/lib/utils"

// Code original ANIM-DEV. Bandeau défilant en boucle (classe animate-marquee de globals.css).
export default function Marquee({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap text-sm font-bold uppercase tracking-[0.25em] text-foreground/60">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            {item}
            <span className="text-primary" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
