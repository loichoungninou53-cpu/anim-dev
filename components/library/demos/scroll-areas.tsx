"use client"



export function ScrollAreasDemo() {
  return (
    <div className="relative mx-auto max-w-md">
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 [scrollbar-color:var(--color-primary,#e12a1f)_transparent]">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="glass grid h-32 w-40 shrink-0 snap-start place-items-center rounded-2xl text-sm font-bold">Carte {i + 1}</div>
        ))}
      </div>
      <p className="text-center text-xs text-foreground/60">Glisse horizontalement (exemple)</p>
    </div>
  )
}
