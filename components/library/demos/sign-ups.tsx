"use client"

import { useState } from "react";
import { motion } from "framer-motion";

export function SignUpsDemo() {
  const [step, setStep] = useState(1)
  return (
    <div className="mx-auto max-w-xs space-y-4">
      <div className="h-1.5 overflow-hidden rounded-full bg-primary/15">
        <motion.div className="h-full origin-left rounded-full bg-primary" animate={{ scaleX: step / 3 }} transition={{ duration: 0.5 }} />
      </div>
      <p className="text-center text-sm">Étape {step} sur 3 (exemple)</p>
      <div className="flex gap-2">
        <button onClick={() => setStep((s) => Math.max(1, s - 1))} className="flex-1 rounded-xl border py-2 text-sm">Retour</button>
        <button onClick={() => setStep((s) => Math.min(3, s + 1))} className="flex-1 rounded-xl bg-primary py-2 text-sm font-bold text-white">Suivant</button>
      </div>
    </div>
  )
}
