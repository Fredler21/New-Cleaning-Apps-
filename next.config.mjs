/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ];
  },
};

export default nextConfig;
