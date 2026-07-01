import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repoName = 'my-portfolio';
const basePath = isGithubPages ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: isGithubPages ? `${basePath}/` : undefined,
  reactCompiler: true,
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
  },
  trailingSlash: true,
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
