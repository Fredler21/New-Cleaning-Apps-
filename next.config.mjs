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
      //
      // Exception, and the reason for it. baseboard-cleaning-hacks-that-save-time
      // was already retired into how-to-clean-baseboards via previousSlugs, and
      // the build contains no page for it, yet production kept serving a
      // prerendered copy: 200, X-Vercel-Cache HIT, Age ~17h, X-Matched-Path on
      // the retired slug. Vercel had not evicted the prerender for a route that
      // no longer exists, so Google saw two live pages on one topic, each with a
      // self-referencing canonical. That is textbook cannibalization and a
      // plausible cause of "Crawled - currently not indexed" on both URLs.
      // A redirect here is evaluated during routing, ahead of the static cache,
      // so it wins regardless of what is still cached. Every other retired slug
      // was verified as correctly 308ing and needs no entry.
      {
        source: "/cleaning-hacks/baseboard-cleaning-hacks-that-save-time",
        destination: "/cleaning-hacks/how-to-clean-baseboards",
        permanent: true,
      },
      {
        source: "/author/sarah-mitchell",
        destination: "/author/fredler-pierre-louis",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
