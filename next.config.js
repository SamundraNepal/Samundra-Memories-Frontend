module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.1.0.1",
        port: "8000", // Make sure the port matches your image source
        pathname: `/Storage/Images/**`, // Allow all images under this path
      },
    ],
  },
};
