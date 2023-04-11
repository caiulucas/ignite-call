/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['pt-BR'],
    defaultLocale: 'pt-BR'
  }
};

module.exports = nextConfig;
