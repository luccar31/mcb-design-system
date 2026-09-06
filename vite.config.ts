import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import dts from 'vite-plugin-dts'

/** Ships the raw custom properties so a consumer can theme without the components. */
function emitTokensCss(): Plugin {
  return {
    name: 'mcb-emit-tokens-css',
    writeBundle() {
      copyFileSync(
        resolve(__dirname, 'src/tokens/tokens.css'),
        resolve(__dirname, 'dist/tokens.css'),
      )
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    emitTokensCss(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      rollupTypes: true,
      include: ['src'],
      exclude: ['src/**/*.stories.tsx'],
    }),
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
