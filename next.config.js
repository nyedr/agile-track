/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["i.postimg.cc", "images.unsplash.com", "assets.example.com", "upload.wikimedia.org"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
};
