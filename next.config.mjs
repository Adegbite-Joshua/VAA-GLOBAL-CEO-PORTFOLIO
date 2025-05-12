/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com', 'via.placeholder.com'],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add this to prevent MongoDB from being bundled with client code
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'mongodb' package on the client to prevent this error
      config.resolve.fallback = {
        mongodb: false,
        'mongodb-client-encryption': false,
        '@mongodb-js/zstd': false,
        '@aws-sdk/credential-providers': false,
        'snappy': false,
        'aws4': false,
        'kerberos': false,
        'supports-color': false,
        'bson-ext': false,
        'mongodb-client-encryption': false,
      }
    }
    return config
  },
}

export default nextConfig
