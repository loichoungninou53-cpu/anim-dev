"use client"

// Code original ANIM-DEV. Aucune dépendance : CSS intégré au composant (copier-coller).
export function AnimatedGradientDemo() {
  return (
    <div className="relative h-56 overflow-hidden rounded-2xl bg-white">
      <style>{`
        @keyframes anim-dev-mesh {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(8%, -6%, 0) scale(1.15); }
        }
        .anim-dev-blob { animation: anim-dev-mesh 12s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .anim-dev-blob { animation: none; } }
      `}</style>
      <div className="anim-dev-blob absolute -left-10 -top-10 h-72 w-72 rounded-full bg-[#e12a1f] opacity-40 blur-3xl" />
      <div className="anim-dev-blob absolute -bottom-16 right-0 h-80 w-80 rounded-full bg-[#ff8a6b] opacity-50 blur-3xl [animation-delay:-4s]" />
      <div className="anim-dev-blob absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-[#ffd0c4] opacity-60 blur-3xl [animation-delay:-8s]" />
      <p className="relative grid h-full place-items-center text-sm font-bold">Dégradé animé</p>
    </div>
  )
}
