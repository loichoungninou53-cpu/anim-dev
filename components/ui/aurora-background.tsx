import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

// Code original ANIM-DEV. Halos colorés qui dérivent lentement (transform et opacity).
type AuroraBackgroundProps = {
  children?: ReactNode
  className?: string
  colors?: string[]
}

export default function AuroraBackground({
  children,
  className,
  colors = ["#e12a1f", "#ff8a6b", "#ffc2b5"],
}: AuroraBackgroundProps) {
  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {colors.map((color, i) => (
          <span
            key={color}
            className="aurora-blob absolute size-[55%] rounded-full opacity-50 blur-3xl"
            style={{ background: color, top: `${10 + i * 18}%`, left: `${8 + i * 22}%`, animationDelay: `${-i * 4}s` }}
          />
        ))}
      </div>
      {children}
    </div>
  )
}
