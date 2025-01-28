/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.module.rules.push({
        test: /components\/ui/,
        loader: 'ignore-loader',
      });
    }
    return config;
  },
  images: {
    domains: ['via.placeholder.com', 'localhost'],
  },
}
export default nextConfig;
