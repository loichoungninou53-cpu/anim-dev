import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

// Code original ANIM-DEV. Un reflet traverse le texte en boucle (classe .text-shimmer dans globals.css).
export default function TextShimmer({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("text-shimmer", className)}>{children}</span>
}
