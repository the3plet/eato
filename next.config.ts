import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow loading external images from source.unsplash.com used in the project
  images: {
    domains: ["images.unsplash.com", "source.unsplash.com","foodish-api.com"],
  },
};

export default nextConfig;
