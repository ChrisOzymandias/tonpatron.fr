import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: ['console', 'debugger'],
    pure: ['console.log', 'console.info', 'console.debug', 'console.warn']
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    target: 'esnext',
    modulePreload: {
      polyfill: false
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 3,
        unsafe: true,
        unsafe_arrows: true,
        unsafe_methods: true
      }
    },
    cssMinify: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'core': ['react', 'react-dom', 'react-router-dom'],
          'firebase': {
            include: [/firebase\/.*/]
          },
          'utils': {
            include: [/date-fns|lodash|uuid|dompurify|marked/]
          },
          'ui': {
            include: [/lucide-react|react-dropzone|react-helmet-async|react-simple-maps/]
          }
        },
        inlineDynamicImports: false,
        compact: true,
        format: 'es',
        generatedCode: {
          arrowFunctions: true,
          constBindings: true,
          objectShorthand: true,
          symbols: false
        }
      },
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      },
    },
    assetsInlineLimit: 8192,
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    },
  },
});