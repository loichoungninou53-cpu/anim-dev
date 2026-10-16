# Licences et origine des composants ANIM-DEV

## Code original
Tous les composants de `components/ui/` marqués « Code original ANIM-DEV » sont écrits pour ce projet.
Ils s'inspirent de principes d'animation courants (halo, faisceau, inclinaison, barre de progression…).
Aucun code n'a été copié depuis 21st.dev ni depuis un autre catalogue de composants.

## Bibliothèques installées
| Paquet | Licence | Utilisé par |
|---|---|---|
| framer-motion | MIT | reveal.tsx, flip-words.tsx |
| gsap | Licence standard GreenSock (gratuite, voir gsap.com/standard-license) | gsap-text-reveal.tsx |
| lenis | MIT | smooth-scroll.tsx |
| @number-flow/react | MIT | animated-number.tsx |
| lucide-react | ISC | icônes |

## Note sur 21st.dev
Ses conditions indiquent que le code de chaque composant reste la propriété de son auteur. Le site ne publie pas de licence générale pour les composants. Une copie n'est donc permise que composant par composant, selon la licence de chaque auteur. Ce projet n'utilise aucun composant de 21st.dev.

## Bibliothèque (`components/library/`, `app/bibliotheque/`)

- 49 démos écrites pour ANIM-DEV (Tailwind, framer-motion, WebGL). Aucun code copié de 21st.dev ni d'une autre bibliothèque tierce.
- framer-motion (`motion` non installé séparément) : MIT.
- Textes et chiffres : exemples, étiquetés « Exemple ».
- Bibliothèques candidates non installées (licences vérifiées avec `npm view`, toutes MIT) : motion, @formkit/auto-animate, sonner, vaul, recharts, react-countup, embla-carousel-react, react-day-picker, cmdk, @radix-ui/react-accordion, three, lottie-react.

## Composants repris ou installés (mise à jour)

Chaque fichier de `components/library/demos/` garde en tête la mention de sa source.

| Démo (fichier) | Origine | Licence | Mode |
|---|---|---|---|
| grid-background | Magic UI `animated-grid-pattern` (magicuidesign/magicui) | MIT | Code repris |
| shimmer-button-mu | Magic UI `shimmer-button` | MIT | Code repris |
| number-ticker-mu | Magic UI `number-ticker` | MIT | Code repris |
| blur-fade-mu | Magic UI `blur-fade` | MIT | Code repris |
| text-scramble | Motion Primitives `text-scramble` (ibelick/motion-primitives) | MIT | Code repris |
| spinning-text | Motion Primitives `spinning-text` | MIT | Code repris (correction de type sur `ease`) |
| spotlight-mp | Motion Primitives `spotlight` | MIT | Code repris |
| dock-mp | Motion Primitives `dock` | MIT | Code repris (dépend de react-use-measure, MIT) |
| tilt-mp | Motion Primitives `tilt` | MIT | Code repris |
| magnetic-mp | Motion Primitives `magnetic` | MIT | Code repris |
| sliding-number-mp | Motion Primitives `sliding-number` | MIT | Code repris |
| sonner-toasts | Sonner (emilkowalski/sonner) | MIT | Dépendance npm `sonner` |
| vaul-drawer | Vaul (emilkowalski/vaul) | MIT | Dépendance npm `vaul` |
| animated-gradient | Code original ANIM-DEV | — | Aucune dépendance |

Dépendances npm ajoutées : `motion` 14.x (MIT), `sonner` (MIT), `vaul` (MIT), `react-use-measure` 2.x (MIT).

Non intégré :
- React Bits (DavidHDev/react-bits) : licence « MIT + Commons Clause », qui restreint la vente d'un produit dont la valeur dérive du logiciel. À valider avant usage commercial.
- Aceternity UI : licence propre, redistribution du code interdite. Le dépôt GitHub `aceternity/ui` cité n'existe pas.
- « Apple design » d'Emil Kowalski : c'est une skill (guide de principes pour agents IA, MIT), pas une bibliothèque de composants. Ses principes sont repris en six points reformulés sur la page bibliothèque.
