import Link from "next/link"
import { ArrowRight } from "lucide-react"
import {
  ContainerAnimated,
  ContainerInset,
  ContainerScroll,
  ContainerSticky,
  HeroButton,
  HeroVideo,
} from "@/components/ui/animated-video-on-scroll"
import MotionRoot from "@/components/motion-root"

// Démo : vidéo qui s'agrandit au défilement (composant Systaliko UI, licence MIT).
// Vidéo locale générée (public/video), aucun fichier de 21st.dev.
export default function VideoDefilement() {
  return (
    <MotionRoot>
      <main>
        <section aria-label="Démonstration vidéo au défilement">
          <ContainerScroll className="h-[350vh]">
            <ContainerSticky
              style={{
                background:
                  "radial-gradient(40% 40% at 50% 20%, #e12a1f 0%, #b91c1c 24%, #7f1d1d 50%, #2a0a09 90%)",
              }}
              className="px-6 py-10 text-white"
            >
              <ContainerAnimated className="space-y-4 text-center">
                <h1 className="text-5xl font-black tracking-tighter md:text-6xl">
                  La vidéo prend toute la place
                </h1>
                <p className="mx-auto max-w-[42ch] opacity-80">
                  Texte d'exemple : présente ici ton produit ou ta formation en une phrase claire.
                </p>
              </ContainerAnimated>

              <ContainerInset className="max-h-[450px] w-auto py-6">
                <HeroVideo
                  src="/video/hero-scroll.mp4"
                  poster="/video/hero-poster.jpg"
                  aria-label="Vidéo de démonstration, sans son"
                />
              </ContainerInset>

              <ContainerAnimated
                transition={{ delay: 0.4 }}
                outputRange={[-120, 0]}
                inputRange={[0, 0.7]}
                className="mx-auto mt-2 w-fit"
              >
                <HeroButton className="gap-2 text-sm font-bold text-white">
                  Commencer
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </HeroButton>
              </ContainerAnimated>
            </ContainerSticky>
          </ContainerScroll>
        </section>
        <nav className="bg-[#140a09] px-6 py-6 text-center text-sm text-white/80">
          <Link href="/bibliotheque" className="underline">Retour à la bibliothèque</Link>
        </nav>
      </main>
    </MotionRoot>
  )
}
