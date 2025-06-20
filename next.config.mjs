/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // ★ これを追加！
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
