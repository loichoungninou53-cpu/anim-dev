"use client"

import { motion } from "framer-motion";

const ROWS = [["Ligne 1", "Exemple", "Actif"], ["Ligne 2", "Exemple", "En attente"], ["Ligne 3", "Exemple", "Actif"]]

export function TablesDemo() {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/15 bg-white/60">
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase text-foreground/60"><tr><th className="p-3">Nom</th><th className="p-3">Type</th><th className="p-3">Statut</th></tr></thead>
        <tbody>
          {ROWS.map((r, i) => (
            <motion.tr key={r[0]} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="border-t border-primary/10 hover:bg-primary/5">
              {r.map((c) => <td key={c} className="p-3">{c}</td>)}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
