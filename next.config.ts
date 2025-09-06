import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.unsplash.com', 
      'randomuser.me',
      // Add your Supabase project domain here
      // 'your-project.supabase.co'
    ],
  },
};

export default nextConfig;
