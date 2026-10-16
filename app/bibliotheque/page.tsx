import type { ReactNode } from "react"
import { readFileSync } from "node:fs"
import path from "node:path"
import * as M from "@/components/library/marketing"
import * as U from "@/components/library/ui"
import * as F from "@/components/library/forms"
import * as D from "@/components/library/data"
import * as N from "@/components/library/nav"
import * as S from "@/components/library/shaders"
import MotionRoot from "@/components/motion-root"

// Bibliothèque ANIM-DEV : démos originales, une par catégorie. Code lu depuis les fichiers.
type Cat = { name: string; Demo: () => ReactNode }
type Group = { title: string; file: string; cats: Cat[] }

const GROUPS: Group[] = [
  {
    title: "Blocs marketing",
    file: "components/library/marketing.tsx",
    cats: [
      { name: "Heroes", Demo: M.HeroesDemo },
      { name: "Features", Demo: M.FeaturesDemo },
      { name: "Pricing", Demo: M.PricingDemo },
      { name: "Testimonials", Demo: M.TestimonialsDemo },
      { name: "Calls to action", Demo: M.CtaDemo },
      { name: "Footers", Demo: M.FootersDemo },
      { name: "Navbars", Demo: M.NavbarsDemo },
      { name: "Backgrounds", Demo: M.BackgroundsDemo },
      { name: "Shaders", Demo: S.ShadersDemo },
      { name: "Texts", Demo: M.TextsDemo },
    ],
  },
  {
    title: "Composants UI",
    file: "components/library/ui.tsx",
    cats: [
      { name: "Buttons", Demo: U.ButtonsDemo },
      { name: "AI chats", Demo: U.AiChatsDemo },
      { name: "Cards", Demo: U.CardsDemo },
      { name: "Inputs", Demo: U.InputsDemo },
      { name: "Tables", Demo: U.TablesDemo },
      { name: "Forms", Demo: U.FormsDemo },
      { name: "Dialogs", Demo: U.DialogsDemo },
      { name: "Tabs", Demo: U.TabsDemo },
      { name: "Avatars", Demo: U.AvatarsDemo },
      { name: "Badges", Demo: U.BadgesDemo },
    ],
  },
  {
    title: "Formulaires et sélecteurs",
    file: "components/library/forms.tsx",
    cats: [
      { name: "Sign ins", Demo: F.SignInsDemo },
      { name: "Sign ups", Demo: F.SignUpsDemo },
      { name: "Selects", Demo: F.SelectsDemo },
      { name: "Checkboxes", Demo: F.CheckboxesDemo },
      { name: "Radio groups", Demo: F.RadioGroupsDemo },
      { name: "Toggles", Demo: F.TogglesDemo },
      { name: "Sliders", Demo: F.SlidersDemo },
      { name: "Date pickers", Demo: F.DatePickersDemo },
      { name: "Calendars", Demo: F.CalendarsDemo },
      { name: "Text areas", Demo: F.TextAreasDemo },
    ],
  },
  {
    title: "Données et retours",
    file: "components/library/data.tsx",
    cats: [
      { name: "Charts & data viz", Demo: D.ChartsDemo },
      { name: "Stats & KPIs", Demo: D.StatsDemo },
      { name: "Dashboards", Demo: D.DashboardsDemo },
      { name: "Progress", Demo: D.ProgressDemo },
      { name: "Numbers", Demo: D.NumbersDemo },
      { name: "Toasts", Demo: D.ToastsDemo },
      { name: "Alerts", Demo: D.AlertsDemo },
      { name: "Notifications", Demo: D.NotificationsDemo },
      { name: "Spinner loaders", Demo: D.SpinnerLoadersDemo },
      { name: "Empty states", Demo: D.EmptyStatesDemo },
    ],
  },
  {
    title: "Navigation et mise en page",
    file: "components/library/nav.tsx",
    cats: [
      { name: "Sidebars", Demo: N.SidebarsDemo },
      { name: "Menus", Demo: N.MenusDemo },
      { name: "Dropdowns", Demo: N.DropdownsDemo },
      { name: "Paginations", Demo: N.PaginationsDemo },
      { name: "Docks", Demo: N.DocksDemo },
      { name: "Grids", Demo: N.GridsDemo },
      { name: "Lists", Demo: N.ListsDemo },
      { name: "Accordions", Demo: N.AccordionsDemo },
      { name: "Scroll areas", Demo: N.ScrollAreasDemo },
    ],
  },
]

const slug = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, "et").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

export default function Bibliotheque() {
  const total = GROUPS.reduce((n, g) => n + g.cats.length, 0)
  return (
    <MotionRoot>
    <main className="mx-auto max-w-5xl px-5 py-16">
      <p className="text-xs font-bold uppercase tracking-widest text-primary">ANIM-DEV · bibliothèque</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight">{total} catégories, une démo animée chacune</h1>
      <p className="mt-3 max-w-2xl text-foreground/70">
        Démos originales écrites pour ce projet (Tailwind, framer-motion MIT, WebGL). Les textes sont des exemples. Les animations
        n'utilisent que transform et opacity, et s'arrêtent avec « réduire les animations ».
      </p>

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

      {GROUPS.map((g) => {
        const code = readFileSync(path.join(process.cwd(), g.file), "utf8")
        return (
          <section key={g.title} className="mt-16" aria-labelledby={slug(g.title)}>
            <h2 id={slug(g.title)} className="text-2xl font-black">{g.title}</h2>
            <div className="mt-6 space-y-10">
              {g.cats.map((c) => (
                <article key={c.name} id={slug(c.name)} className="scroll-mt-24">
                  <h3 className="mb-3 text-lg font-bold">{c.name}</h3>
                  <div className="rounded-3xl border border-primary/15 bg-white/50 p-5 sm:p-8">
                    <c.Demo />
                  </div>
                </article>
              ))}
            </div>
            <details className="mt-8 rounded-2xl border border-primary/15 bg-white/60 p-4">
              <summary className="cursor-pointer text-sm font-bold">Code à copier · {g.file}</summary>
              <pre className="mt-4 max-h-96 overflow-auto rounded-xl bg-[#140a09] p-4 text-xs leading-relaxed text-white/85"><code>{code}</code></pre>
            </details>
          </section>
        )
      })}
    </main>
    </MotionRoot>
  )
}
