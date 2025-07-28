import path from 'path'
import type { NextConfig } from 'next'
import type { Configuration as WebpackConfiguration } from 'webpack'

const nextConfig: NextConfig = {
  // Autres options Next.js si besoin…
  webpack(
    config: WebpackConfiguration,
    options: { buildId: string; dev: boolean; isServer: boolean; webpack: any }
  ): WebpackConfiguration {
    // On s’assure que `resolve` existe
    config.resolve = config.resolve ?? {}
    config.resolve.alias = {
      ...config.resolve.alias,
      // Alias pour ton mini-app frame
      '@coinbase/onchainkit/frame': path.resolve(
        __dirname,
        'node_modules/@coinbase/onchainkit/dist/frame'
      ),
    }
    return config
  },
}

export default nextConfig
