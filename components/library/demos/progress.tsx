"use client"

import { motion } from "framer-motion";

export function ProgressDemo() {
  return (
    <div className="mx-auto max-w-sm space-y-3">
      {[35, 70].map((p) => (
        <div key={p}>
          <div className="mb-1 flex justify-between text-xs"><span>Progression exemple</span><span>{p} %</span></div>
          <div role="progressbar" aria-valuenow={p} aria-valuemin={0} aria-valuemax={100} className="h-2 overflow-hidden rounded-full bg-primary/15">
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: p / 100 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} style={{ originX: 0 }} className="h-full w-full rounded-full bg-primary" />
          </div>
        </div>
      ))}
    </div>
  )
}
