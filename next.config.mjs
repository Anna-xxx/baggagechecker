/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/luggage-sizes',
        destination: '/luggage-guide',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
