"use client"

import { useState } from "react";
import { motion } from "framer-motion";

export function CheckboxesDemo() {
  const items = ["Case A", "Case B"]
  const [on, setOn] = useState<Record<string, boolean>>({})
  return (
    <div className="flex justify-center gap-6">
      {items.map((i) => (
        <label key={i} className="flex cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" className="sr-only" checked={!!on[i]} onChange={(e) => setOn({ ...on, [i]: e.target.checked })} />
          <span className={`grid h-5 w-5 place-items-center rounded-md border-2 transition-colors ${on[i] ? "border-primary bg-primary" : "border-primary/40"}`}>
            <motion.svg viewBox="0 0 12 12" className="h-3 w-3" initial={false} animate={{ scale: on[i] ? 1 : 0, opacity: on[i] ? 1 : 0 }}>
              <path d="M2 6.5 5 9.5 10 3" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </span>
          {i}
        </label>
      ))}
    </div>
  )
}
