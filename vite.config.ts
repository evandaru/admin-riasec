import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import react from '@vitejs/plugin-react'
import adonisjs from '@adonisjs/vite/client'

export default defineConfig({
  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: 'inertia/app/ssr.tsx' } }),
    react(),
    adonisjs({
      entrypoints: ['inertia/app/app.tsx'],
      reload: ['resources/views/**/*.edge'],
    }),
  ],

  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/inertia/`,
    },
  },

  server: {
    /** ✅ Allow semua host yang penting */
    allowedHosts: true, // 🔥 Paling gampang, terima dari semua domain/ip

    /** ✅ Open ke semua network interface */
    host: true, // Atau bisa pakai '0.0.0.0'

    /** ✅ Port boleh bebas, pastikan gak bentrok */
    port: 3333, // Optional, sesuain sama backend lo atau kebutuhan

    /** ✅ Enable CORS kalau frontend & backend pisah */
    cors: {
      origin: ['https://karir1.fauzanhasyim.my.id'],
      credentials: true,
    },
  },
})
