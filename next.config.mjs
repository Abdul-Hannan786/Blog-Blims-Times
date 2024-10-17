/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "firebasestorage.googleapis.com",
          // Optionally, you can add pathname to restrict further:
          // pathname: "/v0/b/**",
        },
      ],
    },
  };
  
  export default nextConfig;
  