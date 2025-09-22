// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
  
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Prevent ESLint from blocking production builds
  },
};

module.exports = nextConfig;
