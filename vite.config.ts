import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import dts from 'vite-plugin-dts'

/**
 * Storybook builds through this same file, so anything that only makes sense
 * for the package — emitting dist/ — has to sit out that build or it fails.
 */
function libraryOnly(plugin: Plugin): Plugin {
  return { ...plugin, apply: (config) => Boolean(config.build?.lib) }
}

/** Ships the raw custom properties so a consumer can theme without the components. */
function emitTokensCss(): Plugin {
  let outDir = 'dist'
  return {
    name: 'mcb-emit-tokens-css',
    configResolved(config) {
      outDir = config.build.outDir
    },
    writeBundle() {
      copyFileSync(
        resolve(__dirname, 'src/tokens/tokens.css'),
        resolve(__dirname, outDir, 'tokens.css'),
      )
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    libraryOnly(emitTokensCss()),
    libraryOnly(
      dts({
        tsconfigPath: './tsconfig.build.json',
        rollupTypes: true,
        include: ['src'],
        exclude: ['src/**/*.stories.tsx'],
      }) as Plugin,
    ),
  ],
  build: {
    // One stylesheet instead of one per chunk: consumers import it once.
    cssCodeSplit: false,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'McbDesignSystem',
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: (asset) =>
          asset.names?.[0]?.endsWith('.css')
            ? 'mcb-design-system.css'
            : 'assets/[name][extname]',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
  },
})
