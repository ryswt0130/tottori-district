/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // ★ これを追加！
  images: {
    unoptimized: true,
  },
}

export default nextConfig
