import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  define: {
    global: {},   
    require: 'undefined',  
  },
  resolve: {
    alias: {
      "isomorphic-fetch": "cross-fetch",
    },
  },
});
