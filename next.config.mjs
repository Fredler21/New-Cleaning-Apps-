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
      {
        source: "/cleaning-hacks/8-undemanding-wd40-cleaning-hacks",
        destination: "/cleaning-hacks/8-easy-wd40-cleaning-hacks",
        permanent: true,
      },
      // Renamed post slugs — 301 the old indexed URLs to their current slugs
      // so Google recovers the existing index entry instead of dropping a 404.
      {
        source: "/cleaning-hacks/how-to-get-rid-of-bed-bugs",
        destination: "/cleaning-hacks/how-to-get-rid-of-bed-bugs-fast",
        permanent: true,
      },
      {
        source: "/cleaning-hacks/how-to-clean-hardwood-floors-without-damage",
        destination: "/cleaning-hacks/how-to-clean-hardwood-floors",
        permanent: true,
      },
      {
        source: "/cleaning-hacks/how-to-remove-yellow-armpit-stains",
        destination: "/cleaning-hacks/how-to-remove-yellow-armpit-stains-from-shirts",
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
