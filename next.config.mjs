/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages serves a folder of files, not a running Node server, so the
  // whole site is written out at build time instead of rendered per request.
  output: 'export',

  // Static export has no server left to answer with a 301, so the one redirect
  // this site needs moved to public/_redirects, which Cloudflare reads directly.
};

export default nextConfig;
