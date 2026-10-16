"use client"

import { useState } from "react";
import { motion } from "framer-motion";

const MENU = ["Profil", "Préférences", "Aide"]

export function MenusDemo() {
  const [a, setA] = useState(MENU[0])
  return (
    <ul role="menu" className="glass mx-auto max-w-xs space-y-1 rounded-2xl p-2 text-sm">
      {MENU.map((m) => (
        <li key={m} role="none" className="relative">
          {a === m && <motion.span layoutId="menu-hl" className="absolute inset-0 rounded-lg bg-primary/12" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
          <button role="menuitem" onMouseEnter={() => setA(m)} onFocus={() => setA(m)} className="relative w-full rounded-lg px-3 py-2 text-left">{m}</button>
        </li>
      ))}
    </ul>
  )
}
