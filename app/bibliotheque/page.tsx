import { readFileSync } from "node:fs"
import path from "node:path"
import type { ComponentType } from "react"
import Link from "next/link"
import CopyCode from "@/components/library/copy-code"
import MotionRoot from "@/components/motion-root"
import { HeroesDemo } from "@/components/library/demos/heroes"
import { FeaturesDemo } from "@/components/library/demos/features"
import { PricingDemo } from "@/components/library/demos/pricing"
import { TestimonialsDemo } from "@/components/library/demos/testimonials"
import { CtaDemo } from "@/components/library/demos/calls-to-action"
import { FootersDemo } from "@/components/library/demos/footers"
import { NavbarsDemo } from "@/components/library/demos/navbars"
import { BackgroundsDemo } from "@/components/library/demos/backgrounds"
import { GridBackgroundDemo } from "@/components/library/demos/grid-background"
import { AnimatedGradientDemo } from "@/components/library/demos/animated-gradient"
import { ShadersDemo } from "@/components/library/demos/shaders"
import { TextsDemo } from "@/components/library/demos/texts"
import { TextScrambleDemo } from "@/components/library/demos/text-scramble"
import { SpinningTextDemo } from "@/components/library/demos/spinning-text"
import { BlurFadeDemo } from "@/components/library/demos/blur-fade-mu"
import { ButtonsDemo } from "@/components/library/demos/buttons"
import { ShimmerButtonDemo } from "@/components/library/demos/shimmer-button-mu"
import { MagneticMpDemo } from "@/components/library/demos/magnetic-mp"
import { AiChatsDemo } from "@/components/library/demos/ai-chats"
import { CardsDemo } from "@/components/library/demos/cards"
import { TiltMpDemo } from "@/components/library/demos/tilt-mp"
import { SpotlightMpDemo } from "@/components/library/demos/spotlight-mp"
import { InputsDemo } from "@/components/library/demos/inputs"
import { TablesDemo } from "@/components/library/demos/tables"
import { FormsDemo } from "@/components/library/demos/forms"
import { DialogsDemo } from "@/components/library/demos/dialogs"
import { VaulDrawerDemo } from "@/components/library/demos/vaul-drawer"
import { TabsDemo } from "@/components/library/demos/tabs"
import { AvatarsDemo } from "@/components/library/demos/avatars"
import { BadgesDemo } from "@/components/library/demos/badges"
import { SignInsDemo } from "@/components/library/demos/sign-ins"
import { SignUpsDemo } from "@/components/library/demos/sign-ups"
import { SelectsDemo } from "@/components/library/demos/selects"
import { CheckboxesDemo } from "@/components/library/demos/checkboxes"
import { RadioGroupsDemo } from "@/components/library/demos/radio-groups"
import { TogglesDemo } from "@/components/library/demos/toggles"
import { SlidersDemo } from "@/components/library/demos/sliders"
import { DatePickersDemo } from "@/components/library/demos/date-pickers"
import { CalendarsDemo } from "@/components/library/demos/calendars"
import { TextAreasDemo } from "@/components/library/demos/text-areas"
import { ChartsDemo } from "@/components/library/demos/charts-et-data-viz"
import { StatsDemo } from "@/components/library/demos/stats-et-kpis"
import { DashboardsDemo } from "@/components/library/demos/dashboards"
import { ProgressDemo } from "@/components/library/demos/progress"
import { NumbersDemo } from "@/components/library/demos/numbers"
import { NumberTickerDemo } from "@/components/library/demos/number-ticker-mu"
import { SlidingNumberMpDemo } from "@/components/library/demos/sliding-number-mp"
import { ToastsDemo } from "@/components/library/demos/toasts"
import { SonnerToastsDemo } from "@/components/library/demos/sonner-toasts"
import { AlertsDemo } from "@/components/library/demos/alerts"
import { NotificationsDemo } from "@/components/library/demos/notifications"
import { SpinnerLoadersDemo } from "@/components/library/demos/spinner-loaders"
import { EmptyStatesDemo } from "@/components/library/demos/empty-states"
import { SidebarsDemo } from "@/components/library/demos/sidebars"
import { MenusDemo } from "@/components/library/demos/menus"
import { DropdownsDemo } from "@/components/library/demos/dropdowns"
import { PaginationsDemo } from "@/components/library/demos/paginations"
import { DocksDemo } from "@/components/library/demos/docks"
import { DockMpDemo } from "@/components/library/demos/dock-mp"
import { GridsDemo } from "@/components/library/demos/grids"
import { ListsDemo } from "@/components/library/demos/lists"
import { AccordionsDemo } from "@/components/library/demos/accordions"
import { ScrollAreasDemo } from "@/components/library/demos/scroll-areas"

// Bibliothèque ANIM-DEV. Chaque démo a son fichier autonome dans components/library/demos/
// avec un bouton « Copier le code ».
type Cat = { name: string; slug: string; Demo: ComponentType }
type Group = { title: string; cats: Cat[] }

const GROUPS: Group[] = [
  {
    title: "Blocs marketing",
    cats: [
      { name: "Heroes", slug: "heroes", Demo: HeroesDemo },
      { name: "Features", slug: "features", Demo: FeaturesDemo },
      { name: "Pricing", slug: "pricing", Demo: PricingDemo },
      { name: "Testimonials", slug: "testimonials", Demo: TestimonialsDemo },
      { name: "Calls to action", slug: "calls-to-action", Demo: CtaDemo },
      { name: "Footers", slug: "footers", Demo: FootersDemo },
      { name: "Navbars", slug: "navbars", Demo: NavbarsDemo },
      { name: "Backgrounds", slug: "backgrounds", Demo: BackgroundsDemo },
      { name: "Grille animée (Magic UI)", slug: "grid-background", Demo: GridBackgroundDemo },
      { name: "Dégradé animé", slug: "animated-gradient", Demo: AnimatedGradientDemo },
      { name: "Shaders", slug: "shaders", Demo: ShadersDemo },
      { name: "Texts", slug: "texts", Demo: TextsDemo },
      { name: "Texte brouillé (Motion Primitives)", slug: "text-scramble", Demo: TextScrambleDemo },
      { name: "Texte circulaire (Motion Primitives)", slug: "spinning-text", Demo: SpinningTextDemo },
      { name: "Blur fade (Magic UI)", slug: "blur-fade-mu", Demo: BlurFadeDemo },
    ],
  },
  {
    title: "Composants UI",
    cats: [
      { name: "Buttons", slug: "buttons", Demo: ButtonsDemo },
      { name: "Bouton brillant (Magic UI)", slug: "shimmer-button-mu", Demo: ShimmerButtonDemo },
      { name: "Bouton magnétique (Motion Primitives)", slug: "magnetic-mp", Demo: MagneticMpDemo },
      { name: "AI chats", slug: "ai-chats", Demo: AiChatsDemo },
      { name: "Cards", slug: "cards", Demo: CardsDemo },
      { name: "Carte inclinable (Motion Primitives)", slug: "tilt-mp", Demo: TiltMpDemo },
      { name: "Spotlight (Motion Primitives)", slug: "spotlight-mp", Demo: SpotlightMpDemo },
      { name: "Inputs", slug: "inputs", Demo: InputsDemo },
      { name: "Tables", slug: "tables", Demo: TablesDemo },
      { name: "Forms", slug: "forms", Demo: FormsDemo },
      { name: "Dialogs", slug: "dialogs", Demo: DialogsDemo },
      { name: "Tiroir (Vaul)", slug: "vaul-drawer", Demo: VaulDrawerDemo },
      { name: "Tabs", slug: "tabs", Demo: TabsDemo },
      { name: "Avatars", slug: "avatars", Demo: AvatarsDemo },
      { name: "Badges", slug: "badges", Demo: BadgesDemo },
    ],
  },
  {
    title: "Formulaires et sélecteurs",
    cats: [
      { name: "Sign ins", slug: "sign-ins", Demo: SignInsDemo },
      { name: "Sign ups", slug: "sign-ups", Demo: SignUpsDemo },
      { name: "Selects", slug: "selects", Demo: SelectsDemo },
      { name: "Checkboxes", slug: "checkboxes", Demo: CheckboxesDemo },
      { name: "Radio groups", slug: "radio-groups", Demo: RadioGroupsDemo },
      { name: "Toggles", slug: "toggles", Demo: TogglesDemo },
      { name: "Sliders", slug: "sliders", Demo: SlidersDemo },
      { name: "Date pickers", slug: "date-pickers", Demo: DatePickersDemo },
      { name: "Calendars", slug: "calendars", Demo: CalendarsDemo },
      { name: "Text areas", slug: "text-areas", Demo: TextAreasDemo },
    ],
  },
  {
    title: "Données et retours",
    cats: [
      { name: "Charts & data viz", slug: "charts-et-data-viz", Demo: ChartsDemo },
      { name: "Stats & KPIs", slug: "stats-et-kpis", Demo: StatsDemo },
      { name: "Dashboards", slug: "dashboards", Demo: DashboardsDemo },
      { name: "Progress", slug: "progress", Demo: ProgressDemo },
      { name: "Numbers", slug: "numbers", Demo: NumbersDemo },
      { name: "Compteur (Magic UI)", slug: "number-ticker-mu", Demo: NumberTickerDemo },
      { name: "Chiffres glissants (Motion Primitives)", slug: "sliding-number-mp", Demo: SlidingNumberMpDemo },
      { name: "Toasts", slug: "toasts", Demo: ToastsDemo },
      { name: "Toasts (Sonner)", slug: "sonner-toasts", Demo: SonnerToastsDemo },
      { name: "Alerts", slug: "alerts", Demo: AlertsDemo },
      { name: "Notifications", slug: "notifications", Demo: NotificationsDemo },
      { name: "Spinner loaders", slug: "spinner-loaders", Demo: SpinnerLoadersDemo },
      { name: "Empty states", slug: "empty-states", Demo: EmptyStatesDemo },
    ],
  },
  {
    title: "Navigation et mise en page",
    cats: [
      { name: "Sidebars", slug: "sidebars", Demo: SidebarsDemo },
      { name: "Menus", slug: "menus", Demo: MenusDemo },
      { name: "Dropdowns", slug: "dropdowns", Demo: DropdownsDemo },
      { name: "Paginations", slug: "paginations", Demo: PaginationsDemo },
      { name: "Docks", slug: "docks", Demo: DocksDemo },
      { name: "Dock (Motion Primitives)", slug: "dock-mp", Demo: DockMpDemo },
      { name: "Grids", slug: "grids", Demo: GridsDemo },
      { name: "Lists", slug: "lists", Demo: ListsDemo },
      { name: "Accordions", slug: "accordions", Demo: AccordionsDemo },
      { name: "Scroll areas", slug: "scroll-areas", Demo: ScrollAreasDemo },
    ],
  },
]

const PRINCIPES = [
  "Le mouvement part de l'action : le bouton réagit au toucher, avant toute autre animation.",
  "Les animations sont interruptibles : l'utilisateur peut changer d'avis en cours de route.",
  "Les gestes suivent des ressorts (spring) plutôt que des durées fixes.",
  "Un seul élément principal bouge à la fois. Peu d'effets, mais bien placés.",
  "Seuls transform et opacity animent : c'est plus fluide, et « réduire les animations » est respecté.",
  "Chaque action a un retour visuel immédiat : état pressé, chargement, confirmation.",
]

const slug = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, "et").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export default function Bibliotheque() {
  const total = GROUPS.reduce((n, g) => n + g.cats.length, 0)
  return (
    <MotionRoot>
    <main className="mx-auto max-w-5xl px-5 py-16">
      <p className="text-xs font-bold uppercase tracking-widest text-primary">ANIM-DEV · bibliothèque</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight">{total} catégories, une démo copiable chacune</h1>
      <p className="mt-3 max-w-2xl text-foreground/70">
        Clique sur « Copier le code » pour récupérer le fichier complet, puis colle-le dans <code>components/library/demos/</code>.
        Les dépendances sont indiquées dans chaque fichier (framer-motion, motion, sonner, vaul, react-use-measure : toutes MIT).
        Les textes sont des exemples. Les démos reprises d'autres projets gardent leur mention d'origine. <Link href="/video-defilement" className="font-bold text-primary underline">Démo vidéo au défilement</Link>.
      </p>

      <section aria-labelledby="principes" className="glass mt-8 rounded-2xl p-6">
        <h2 id="principes" className="text-lg font-black">Six principes d'animation</h2>
        <p className="mt-1 text-xs text-foreground/60">Inspirés de l'approche Apple décrite dans la skill « apple-design » d'Emil Kowalski (licence MIT), reformulés.</p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm">
          {PRINCIPES.map((p) => <li key={p}>{p}</li>)}
        </ol>
      </section>

      <nav aria-label="Catégories" className="glass mt-8 rounded-2xl p-5">
        {GROUPS.map((g) => (
          <div key={g.title} className="mb-3 last:mb-0">
            <p className="text-xs font-bold uppercase text-foreground/60">{g.title}</p>
            <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {g.cats.map((c) => (
                <li key={c.name}><a href={`#${slug(c.name)}`} className="hover:text-primary">{c.name}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {GROUPS.map((g) => (
        <section key={g.title} className="mt-16" aria-labelledby={slug(g.title)}>
          <h2 id={slug(g.title)} className="text-2xl font-black">{g.title}</h2>
          <div className="mt-6 space-y-10">
            {g.cats.map((c) => {
              const file = `components/library/demos/${c.slug}.tsx`
              const code = readFileSync(path.join(process.cwd(), file), "utf8")
              return (
                <article key={c.name} id={slug(c.name)} className="scroll-mt-24">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold">{c.name}</h3>
                    <CopyCode code={code} />
                  </div>
                  <div className="rounded-3xl border border-primary/15 bg-white/50 p-5 sm:p-8">
                    <c.Demo />
                  </div>
                  <details className="mt-3 rounded-2xl border border-primary/15 bg-white/60 p-4">
                    <summary className="cursor-pointer text-sm font-bold">Code à copier · {file}</summary>
                    <pre className="mt-4 max-h-96 overflow-auto rounded-xl bg-[#140a09] p-4 text-xs leading-relaxed text-white/85"><code>{code}</code></pre>
                  </details>
                </article>
              )
            })}
          </div>
        </section>
      ))}
    </main>
    </MotionRoot>
  )
}
