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
