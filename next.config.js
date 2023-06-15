/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/login', destination: '/auth/login', permanent: true },
      { source: '/signup', destination: '/auth/login', permanent: true }
    ]
  }
}

module.exports = nextConfig
