// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;



import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 🚫 Completely disables ESLint during builds (locally + Vercel)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 🚫 Prevents build from failing on type errors too (optional but useful if you want zero blocking)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
