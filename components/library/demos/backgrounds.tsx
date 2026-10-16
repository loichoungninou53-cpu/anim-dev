"use client"

import { motion } from "framer-motion";

export function BackgroundsDemo() {
  return (
    <div className="relative h-56 overflow-hidden rounded-2xl border border-primary/15 bg-white/60">
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle,#e12a1f33_1px,transparent_1.5px)] [background-size:22px_22px] motion-safe:animate-[drift_14s_linear_infinite]" />
      <div className="absolute inset-0 grid place-items-center text-sm font-semibold">Fond à motif animé</div>
    </div>
  )
}
