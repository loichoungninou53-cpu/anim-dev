import Link from "next/link"
import type { ReactNode } from "react"
import { readFileSync } from "node:fs"
import path from "node:path"
import AnimatedNumber from "@/components/ui/animated-number"
import DottedTrailCursor from "@/components/ui/dotted-trail-cursor"
import GlassFolder from "@/components/ui/glass-folder-cards"
import GsapTextReveal from "@/components/ui/gsap-text-reveal"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import MotionFooter from "@/components/ui/motion-footer"
import PricingSection from "@/components/ui/pricing-section"
import ReceiveSequence, { type ReceiveItem } from "@/components/ui/receive-sequence"
import SmoothScroll from "@/components/ui/smooth-scroll"
import { Reveal } from "@/components/reveal"
import AuroraBackground from "@/components/ui/aurora-background"
import BorderBeam from "@/components/ui/border-beam"
import FlipWords from "@/components/ui/flip-words"
import MagneticButton from "@/components/ui/magnetic-button"
import Marquee from "@/components/ui/marquee"
import ScrollProgress from "@/components/ui/scroll-progress"
import SpotlightCard from "@/components/ui/spotlight-card"
import TextShimmer from "@/components/ui/text-shimmer"
import TiltCard from "@/components/ui/tilt-card"
import MotionRoot from "@/components/motion-root"

// Le code affiché est lu directement dans les fichiers : il reste identique au composant.
function source(file: string) {
  return readFileSync(path.join(process.cwd(), file), "utf8")
}

type Entry = {
  id: string
  name: string
  library: string
  licence: string
  file: string
  description: string
}

function Section({ entry, framed = true, children }: { entry: Entry; framed?: boolean; children: ReactNode }) {
  const code = source(entry.file)
  return (
    <section id={entry.id} className="scroll-mt-24 border-t border-primary/15 py-16">
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{entry.library}</span>
          <span className="rounded-full bg-foreground/5 px-3 py-1 text-foreground/70">{entry.licence}</span>
          <span className="rounded-full bg-foreground/5 px-3 py-1 font-mono font-medium text-foreground/70">{entry.file}</span>
        </div>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight">{entry.name}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/70">{entry.description}</p>

        <div className={framed ? "mt-8 overflow-x-clip rounded-[28px] border border-primary/15 bg-white/40 p-6 sm:p-10" : "mt-8"}>
          {children}
        </div>

        <details className="mt-4 rounded-2xl border border-primary/15 bg-white/60">
          <summary className="cursor-pointer px-5 py-4 text-sm font-bold">Code à copier · {entry.file}</summary>
          <pre className="max-h-[480px] overflow-auto border-t border-primary/15 p-5 text-xs leading-relaxed">
            <code>{code}</code>
          </pre>
        </details>
      </div>
    </section>
  )
}

const exampleFiles = [
  { name: "Fiche exemple 1", meta: "Exemple" },
  { name: "Fiche exemple 2", meta: "Exemple" },
  { name: "Fiche exemple 3", meta: "Exemple" },
]

const sheets: ReceiveItem[] = [
  { kind: "Exemple 01", title: "Premier contenu", essence: "Le premier élément, qui sort du dossier.", icon: "compass" },
  { kind: "Exemple 02", title: "Deuxième contenu", essence: "Chaque palier de défilement en révèle un autre.", icon: "search" },
  { kind: "Exemple 03", title: "Troisième contenu", essence: "Une icône et une ligne d'essentiel par fiche.", icon: "shield" },
]

const tiers = [
  { name: "Formule A", price: "Prix à définir", note: "Exemple de description.", features: ["Exemple de fonctionnalité", "Autre exemple"], recommended: false },
  { name: "Formule B", price: "Prix à définir", note: "Exemple de description.", features: ["Exemple de fonctionnalité", "Autre exemple", "Un troisième exemple"], recommended: true },
  { name: "Formule C", price: "Prix à définir", note: "Exemple de description.", features: ["Exemple de fonctionnalité"], recommended: false },
]

const libraries = [
  { name: "Motion (Framer Motion)", pkg: "framer-motion", licence: "MIT", use: "Apparition au défilement (Reveal)" },
  { name: "GSAP + ScrollTrigger", pkg: "gsap", licence: "Licence standard GreenSock (gratuite)", use: "Texte révélé mot par mot" },
  { name: "Lenis", pkg: "lenis", licence: "MIT", use: "Défilement fluide" },
  { name: "NumberFlow", pkg: "@number-flow/react", licence: "MIT", use: "Compteurs animés" },
  { name: "Lucide", pkg: "lucide-react", licence: "ISC", use: "Icônes" },
]

export default function Home() {
  return (
    <MotionRoot>
    <main className="relative overflow-x-clip">
      <ScrollProgress />
      {/* Accueil */}
      <header className="relative mx-auto max-w-5xl px-5 pt-10">
        <nav className="glass flex items-center justify-between rounded-full px-5 py-3 text-sm font-bold">
          <span>ANIM-DEV</span>
          <a href="#installation" className="text-primary">Installer</a>
        </nav>
      </header>

      <section className="relative mx-auto mt-6 max-w-5xl px-5">
        <div className="relative h-[70vh] min-h-[420px] overflow-hidden rounded-[32px] border border-primary/15 bg-white/40">
          <DottedTrailCursor className="grid h-full place-items-center" colorA="#e12a1f" colorB="#ff8a6b" backgroundColor="#fff3f1">
            <div className="flex flex-col items-center px-6 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Bibliothèque d'animations</p>
              <h1 className="mt-4 text-6xl font-black tracking-tighter sm:text-8xl">ANIM-DEV</h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/70">
                Des composants animés à copier dans tes projets Next.js, Tailwind CSS et TypeScript. Chacun est montré en direct, avec son code.
              </p>
              <Link href="/bibliotheque" className="mt-3 block text-sm font-bold text-primary underline">Voir la bibliothèque complète (49 catégories)</Link>
              <a href="#composants" className="mt-8">
                <LiquidButton size="lg">Voir les composants</LiquidButton>
              </a>
            </div>
          </DottedTrailCursor>
        </div>
      </section>

      {/* Installation */}
      <section id="installation" className="scroll-mt-24 mx-auto max-w-5xl px-5 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight">Installation</h2>
        <p className="mt-2 text-sm text-foreground/70">Prérequis : Next.js (App Router), Tailwind CSS v4, TypeScript. Structure shadcn : composants dans <code>components/ui</code>, utilitaire <code>cn</code> dans <code>lib/utils.ts</code>.</p>
        <pre className="mt-6 overflow-x-auto rounded-2xl border border-primary/15 bg-white/60 p-5 text-xs leading-relaxed">
          <code>{`npm install framer-motion lucide-react clsx tailwind-merge class-variance-authority @radix-ui/react-slot gsap lenis @number-flow/react`}</code>
        </pre>
        <p className="mt-4 text-sm text-foreground/70">
          Copie <code>lib/utils.ts</code> et les tokens de <code>app/globals.css</code>, puis chaque composant depuis <code>components/ui</code>.
        </p>
      </section>

      {/* Composants */}
      <div id="composants" />

      <Section
        entry={{ id: "dotted-trail-cursor", name: "Curseur en traînée de points", library: "WebGL (sans dépendance)", licence: "Ton code", file: "components/ui/dotted-trail-cursor.tsx", description: "Une traînée de points qui suit le pointeur, rendue en WebGL. Le fond et les couleurs se règlent par props." }}
      >
        <div className="relative h-80 overflow-hidden rounded-2xl">
          <DottedTrailCursor className="grid h-full place-items-center" colorA="#e12a1f" colorB="#ff8a6b" backgroundColor="#fff3f1">
            <div className="flex items-center justify-center text-center">
              <p className="text-2xl font-extrabold">Bouge la souris ici</p>
            </div>
          </DottedTrailCursor>
        </div>
      </Section>

      <Section
        entry={{ id: "liquid-glass-button", name: "Bouton verre liquide", library: "Tailwind + Radix Slot", licence: "Ton code", file: "components/ui/liquid-glass-button.tsx", description: "Bouton au rendu verre, avec tailles et variantes. Compatible avec les liens via un composant client." }}
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <LiquidButton size="sm">Petit</LiquidButton>
          <LiquidButton size="lg">Moyen</LiquidButton>
          <LiquidButton size="xxl">Grand</LiquidButton>
        </div>
      </Section>

      <Section
        entry={{ id: "glass-folder-cards", name: "Dossier en verre", library: "Canvas 2D (sans dépendance)", licence: "Ton code", file: "components/ui/glass-folder-cards.tsx", description: "Un dossier en verre dépoli avec un arrière généré, des fichiers qui se déploient et un menu d'actions." }}
      >
        <div className="flex justify-center">
          <GlassFolder label="Dossier exemple" meta="3 fichiers" action="add" files={exampleFiles} width={300} />
        </div>
      </Section>

      <Section
        framed={false}
        entry={{ id: "receive-sequence", name: "Séquence de fiches au défilement", library: "Intersection Observer + sticky", licence: "Ton code", file: "components/ui/receive-sequence.tsx", description: "Un dossier collant : chaque défilement fait sortir une fiche. Liste de repli lisible sans JavaScript." }}
      >
        <ReceiveSequence items={sheets} folderLabel="Dossier exemple" folderMeta="3 fiches" />
      </Section>

      <Section
        entry={{ id: "pricing-section", name: "Éventail de cartes tarifaires", library: "Tailwind + IntersectionObserver", licence: "Ton code", file: "components/ui/pricing-section.tsx", description: "Trois cartes en verre dépoli qui se déploient comme une main. Un clic sur une carte latérale la place au centre." }}
      >
        <PricingSection eyebrow="Exemple" title="Trois formules d'exemple" subtitle="Textes et prix à remplacer." tiers={tiers} checkoutUrl="" />
      </Section>

      <Section
        entry={{ id: "gsap-text-reveal", name: "Révélation de texte mot par mot", library: "GSAP + ScrollTrigger", licence: "Licence standard GreenSock (gratuite)", file: "components/ui/gsap-text-reveal.tsx", description: "Chaque mot monte depuis une fenêtre masquée au défilement. Le texte reste accessible aux lecteurs d'écran." }}
      >
        <GsapTextReveal text="Chaque mot apparaît au moment où il entre dans l'écran." className="text-4xl font-extrabold tracking-tight sm:text-5xl" />
      </Section>

      <Section
        entry={{ id: "animated-number", name: "Compteur animé", library: "NumberFlow", licence: "MIT", file: "components/ui/animated-number.tsx", description: "Un nombre qui se déroule quand il entre dans l'écran. Valeur d'exemple." }}
      >
        <p className="text-center text-6xl font-black tracking-tight">
          <AnimatedNumber value={128} suffix=" éléments" />
        </p>
      </Section>

      <Section
        entry={{ id: "reveal", name: "Apparition au défilement", library: "Motion (Framer Motion)", licence: "MIT", file: "components/reveal.tsx", description: "Enveloppe n'importe quel bloc : montée douce, fondu et netteté, joués une seule fois." }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal className="glass rounded-3xl p-6">
            <p className="font-bold">Bloc 1</p>
            <p className="mt-2 text-sm text-foreground/70">Exemple de contenu.</p>
          </Reveal>
          <Reveal delay={0.15} className="glass rounded-3xl p-6">
            <p className="font-bold">Bloc 2</p>
            <p className="mt-2 text-sm text-foreground/70">Exemple avec délai.</p>
          </Reveal>
        </div>
      </Section>

      <Section
        framed={false}
        entry={{ id: "smooth-scroll", name: "Défilement fluide", library: "Lenis", licence: "MIT", file: "components/ui/smooth-scroll.tsx", description: "Enveloppe la page pour lisser la molette. Désactivé avec « réduire les animations ». Non activé dans cette vitrine pour ne pas gêner les autres démos." }}
      >
        <SmoothScroll>
          <p className="rounded-2xl border border-primary/15 bg-white/60 p-5 text-sm text-foreground/70">
            Place <code>{"<SmoothScroll>"}</code> autour du contenu de <code>app/layout.tsx</code> pour l'activer sur tout le site.
          </p>
        </SmoothScroll>
      </Section>

      {/* Bibliothèque : entrée visible depuis l'accueil */}
      <section id="bibliotheque-accueil" className="scroll-mt-24 mx-auto max-w-5xl px-5 py-16">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Nouveau · bibliothèque</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight">49 catégories d'animations, une démo chacune</h2>
        <p className="mt-3 max-w-2xl text-foreground/70">Blocs marketing, composants UI, formulaires, données, navigation. Chaque démo a son code à copier.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Blocs marketing", "10"],
            ["Composants UI", "10"],
            ["Formulaires", "10"],
            ["Données et retours", "10"],
            ["Navigation", "9"],
          ].map(([t, n]) => (
            <Link key={t} href="/bibliotheque" className="glass rounded-2xl p-4 transition-transform hover:-translate-y-1">
              <span className="block text-sm font-bold">{t}</span>
              <span className="mt-1 block text-xs text-foreground/60">{n} démos</span>
            </Link>
          ))}
        </div>
        <Link href="/bibliotheque" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-bold text-white">Ouvrir la bibliothèque</Link>
      </section>

      {/* Animations originales ajoutées */}
      <Section
        entry={{ id: "aurora-background", name: "Fond aurore", library: "CSS (sans dépendance)", licence: "Code original ANIM-DEV", file: "components/ui/aurora-background.tsx", description: "Des halos colorés qui dérivent lentement derrière le contenu." }}
      >
        <AuroraBackground className="flex h-72 items-center justify-center rounded-2xl">
          <p className="text-2xl font-extrabold">Le fond bouge, le texte reste lisible.</p>
        </AuroraBackground>
      </Section>

      <Section
        entry={{ id: "border-beam", name: "Contour lumineux", library: "CSS (sans dépendance)", licence: "Code original ANIM-DEV", file: "components/ui/border-beam.tsx", description: "Un faisceau lumineux qui tourne autour d'une carte." }}
      >
        <BorderBeam className="mx-auto max-w-md">
          <div className="p-8 text-center">
            <p className="font-bold">Carte à contour animé</p>
            <p className="mt-2 text-sm text-foreground/70">Exemple de contenu.</p>
          </div>
        </BorderBeam>
      </Section>

      <Section
        entry={{ id: "magnetic-button", name: "Bouton magnétique", library: "JavaScript natif", licence: "Code original ANIM-DEV", file: "components/ui/magnetic-button.tsx", description: "Le bouton suit légèrement le pointeur, puis revient en place." }}
      >
        <div className="flex justify-center">
          <MagneticButton href="#composants" className="glass text-primary">Bouton qui suit la souris</MagneticButton>
        </div>
      </Section>

      <Section
        entry={{ id: "text-shimmer", name: "Texte à reflet", library: "CSS (sans dépendance)", licence: "Code original ANIM-DEV", file: "components/ui/text-shimmer.tsx", description: "Un reflet traverse le texte en boucle. Le style est dans globals.css." }}
      >
        <p className="text-center text-4xl font-black tracking-tight">
          <TextShimmer className="text-primary">Un reflet qui traverse le titre</TextShimmer>
        </p>
      </Section>

      <Section
        entry={{ id: "tilt-card", name: "Carte inclinable", library: "JavaScript natif", licence: "Code original ANIM-DEV", file: "components/ui/tilt-card.tsx", description: "La carte s'incline vers le pointeur, en perspective." }}
      >
        <div className="flex justify-center">
          <TiltCard className="glass w-72 rounded-3xl p-7">
            <p className="font-bold">Carte qui s'incline</p>
            <p className="mt-2 text-sm text-foreground/70">Déplace la souris sur la carte.</p>
          </TiltCard>
        </div>
      </Section>

      <Section
        entry={{ id: "spotlight-card", name: "Carte à lumière", library: "CSS + JavaScript natif", licence: "Code original ANIM-DEV", file: "components/ui/spotlight-card.tsx", description: "Une lumière suit le pointeur à l'intérieur de la carte." }}
      >
        <SpotlightCard className="glass mx-auto max-w-md p-7">
          <p className="font-bold">Survole cette carte</p>
          <p className="mt-2 text-sm text-foreground/70">La lumière suit ta souris.</p>
        </SpotlightCard>
      </Section>

      <Section
        entry={{ id: "flip-words", name: "Mots qui défilent", library: "Motion (Framer Motion)", licence: "MIT", file: "components/ui/flip-words.tsx", description: "Plusieurs mots se succèdent à la même place. Arrêt avec « réduire les animations »." }}
      >
        <p className="text-center text-4xl font-black tracking-tight">
          Une bibliothèque pour <FlipWords words={["Next.js", "Tailwind", "TypeScript"]} />
        </p>
      </Section>

      <Section
        entry={{ id: "marquee", name: "Bandeau défilant", library: "CSS (sans dépendance)", licence: "Code original ANIM-DEV", file: "components/ui/marquee.tsx", description: "Un bandeau de texte qui défile en boucle." }}
      >
        <Marquee items={["Aurore", "Contour lumineux", "Bouton magnétique", "Reflet", "Carte inclinable"]} />
      </Section>

      <Section
        framed={false}
        entry={{ id: "scroll-progress", name: "Barre de progression", library: "JavaScript natif", licence: "Code original ANIM-DEV", file: "components/ui/scroll-progress.tsx", description: "Une barre fixe en haut de la page qui suit ta progression. Elle est active sur cette vitrine." }}
      >
        <p className="rounded-2xl border border-primary/15 bg-white/60 p-5 text-sm text-foreground/70">Regarde la barre rouge en haut de l'écran pendant que tu défiles.</p>
      </Section>

      {/* Bibliothèques */}
      <section id="bibliotheques" className="scroll-mt-24 mx-auto max-w-5xl px-5 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight">Bibliothèques utilisées</h2>
        <p className="mt-2 text-sm text-foreground/70">Chaque bibliothèque est installée et utilisée par un composant ci-dessus.</p>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-primary/15 bg-white/60">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-primary/15 text-xs uppercase tracking-widest text-foreground/60">
              <tr>
                <th className="px-5 py-3">Bibliothèque</th>
                <th className="px-5 py-3">Paquet</th>
                <th className="px-5 py-3">Licence</th>
                <th className="px-5 py-3">Sert à</th>
              </tr>
            </thead>
            <tbody>
              {libraries.map((lib) => (
                <tr key={lib.pkg} className="border-b border-primary/10 last:border-0">
                  <td className="px-5 py-3 font-bold">{lib.name}</td>
                  <td className="px-5 py-3 font-mono text-xs">{lib.pkg}</td>
                  <td className="px-5 py-3">{lib.licence}</td>
                  <td className="px-5 py-3">{lib.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <MotionFooter
        brand="ANIM-DEV"
        year={2026}
        headline="Copie, colle, anime."
        marquee={["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion", "GSAP", "Lenis", "Accessible"]}
        links={[
          { label: "Installation", href: "#installation", icon: "book" },
          { label: "Composants", href: "#composants", icon: "tag" },
          { label: "Bibliothèques", href: "#bibliotheques", icon: "help" },
        ]}
        notes={[
          { icon: "truck", text: "Chaque composant respecte « réduire les animations »." },
          { icon: "calc", text: "Animations en transform et opacity, sauf exceptions documentées." },
          { icon: "money", text: "Démos illustratives : textes et prix d'exemple à remplacer." },
        ]}
      />
    </main>
    </MotionRoot>
  )
}
