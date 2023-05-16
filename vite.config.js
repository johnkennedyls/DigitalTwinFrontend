import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodeResolve } from '@rollup/plugin-node-resolve'
// https://vitejs.dev/config/
export default defineConfig({
  define:{
    global: 'window'
  },
  base: '/dashboard/', 
  build: {
    rollupOptions: {
      external: ['jss-plugin-window'],
    },
  },
  plugins: [react(), nodeResolve()],
})
