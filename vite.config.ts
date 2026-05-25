import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // @/ resolves to src/ — use in all imports instead of deep relative paths
      // e.g.  import { useCart } from '@/features/cart/CartContext'
      '@': path.resolve(__dirname, './src'),
    },
  },
})
