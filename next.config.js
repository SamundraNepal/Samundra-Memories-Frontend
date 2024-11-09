module.exports = {
  reactStrictMode: false, // Disable Strict Mode

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/Storage/**', // This should be forward slashes and match the folder structure
      },
    ],
  },
};
