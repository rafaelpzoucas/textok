import type { NextConfig } from 'next'

const nextConfig = {
  /* config options here */
  experimental: {
    // Ignora o erro relacionado ao useSearchParams sem Suspense
    missingSuspenseWithCSRBailout: false,
  },
} as NextConfig

export default nextConfig
