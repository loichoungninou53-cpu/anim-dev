"use client"

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AiChatsDemo() {
  const msgs = [
    { me: true, t: "Exemple de question ?" },
    { me: false, t: "Exemple de réponse, affichée message par message." },
  ]
  const [n, setN] = useState(0)
  useEffect(() => {
    if (n >= msgs.length) return
    const id = setTimeout(() => setN((v) => v + 1), 900)
    return () => clearTimeout(id)
  }, [n, msgs.length])
  return (
    <div className="mx-auto flex max-w-sm flex-col gap-2 rounded-2xl bg-white/60 p-4">
      <AnimatePresence initial={false}>
        {msgs.slice(0, n).map((m, i) => (
          <motion.p key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.me ? "ml-auto bg-primary text-white" : "glass"}`}>{m.t}</motion.p>
        ))}
      </AnimatePresence>
      {n < msgs.length && (
        <div className="flex gap-1 p-2" aria-label="En train d'écrire">
          {[0, 1, 2].map((d) => (
            <span key={d} className="h-1.5 w-1.5 rounded-full bg-foreground/50 motion-safe:animate-bounce" style={{ animationDelay: `${d * 0.12}s` }} />
          ))}
        </div>
      )}
    </div>
  )
}
