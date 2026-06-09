/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async redirects() {
    return [
      {
        source: "/posts",
        destination: "/cleaning-hacks",
        permanent: true,
      },
      {
        source: "/posts/:slug",
        destination: "/cleaning-hacks/:slug",
        permanent: true,
      },
      // NOTE: renamed *post* slugs are handled by the `previousSlugs` field on
      // each post (see src/types/post.ts), which 308-redirects old URLs to the
      // current slug. Add retired slugs there, not here.
      {
        source: "/author/sarah-mitchell",
        destination: "/author/fredler-pierre-louis",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
