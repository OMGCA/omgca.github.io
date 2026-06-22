// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://omgca.github.io',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  },

  image: {
    // Sharp is auto-detected when installed — used by getImage() / <Image />
  }
});