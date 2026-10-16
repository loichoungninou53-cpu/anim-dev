"use client"

import { useState } from "react";
import { motion } from "framer-motion";

const LINKS = ["Accueil", "Programme", "Tarifs", "FAQ"]

export function NavbarsDemo() {
  const [active, setActive] = useState("Accueil")
  return (
    <nav aria-label="Exemple de navigation" className="glass flex justify-center gap-1 rounded-full p-1.5">
      {LINKS.map((l) => (
        <button key={l} onClick={() => setActive(l)} aria-current={active === l ? "page" : undefined} className="relative rounded-full px-4 py-1.5 text-sm">
          {active === l && (
            <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-primary/15" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
          )}
          <span className="relative">{l}</span>
        </button>
      ))}
    </nav>
  )
}
