"use client"

// Code original ANIM-DEV. Fait respecter « réduire les animations » à framer-motion (transform coupé, opacité conservée).
import type { ReactNode } from "react"
import { MotionConfig } from "framer-motion"

export default function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
