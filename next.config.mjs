/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '202.62.144.165',
        port: '53284',
        pathname: '/Storage/**', // This should be forward slashes and match the folder structure
      },
    ],
  },
};

export default nextConfig;
