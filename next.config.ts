import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Le contenu Markdown est lu au build : on l'embarque dans les fonctions serverless.
  outputFileTracingIncludes: {
    "/wiki/**": ["./content/wiki/**/*.md"],
  },
  async redirects() {
    return [
      // Anciennes URLs VitePress
      { source: "/archives/:slug", destination: "/wiki/archives/:slug", permanent: true },
      // /wiki/linux/mongoDB → mongodb est géré dans proxy.ts : les redirections de Next.js
      // ignorent la casse, ici la règle bouclerait sur la nouvelle adresse elle-même.
      // La page Outils a été retirée.
      { source: "/tools", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
