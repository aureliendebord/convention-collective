/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the webpack configuration for raw-loader
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
};

module.exports = nextConfig;