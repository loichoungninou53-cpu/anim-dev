import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

// Code original ANIM-DEV. Un faisceau lumineux tourne autour du contour (rotation seule).
type BorderBeamProps = {
  children: ReactNode
  className?: string
  color?: string
}

export default function BorderBeam({ children, className, color = "#e12a1f" }: BorderBeamProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl p-px", className)}>
      <span
        aria-hidden="true"
        className="beam-spin pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[220%] -translate-x-1/2 -translate-y-1/2"
        style={{ background: `conic-gradient(from 0deg, transparent 0deg, transparent 300deg, ${color} 340deg, transparent 360deg)` }}
      />
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-background">{children}</div>
    </div>
  )
}
