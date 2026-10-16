import type { NextConfig } from "next";

// Export statique : le dossier out/ se dépose tel quel sur un hébergement, ou se colle dans Systeme.io.
// BASE_PATH : à définir pour GitHub Pages sans domaine personnalisé, par exemple BASE_PATH=/nom-du-depot.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
