import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'misypnhxhtkwqnvxzbpi.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'misypnhxhtkwqnvxzbpi.supabase.co',
      },
    ],
  },
};

export default nextConfig;
