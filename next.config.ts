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
      { source: "/wiki/linux/mongoDB", destination: "/wiki/linux/mongodb", permanent: true },
    ];
  },
};

export default nextConfig;
