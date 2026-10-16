"use client"

// Source : emilkowalski/sonner (licence MIT). Installé avec : npm install sonner
import { Toaster, toast } from "sonner"

export function SonnerToastsDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Toaster richColors position="bottom-right" />
      <button
        type="button"
        onClick={() => toast("Message exemple", { description: "Notification de démonstration." })}
        className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white"
      >
        Afficher un toast
      </button>
    </div>
  )
}
