import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: 'src/assets/sass/base/main.scss',
        'buttons-all': 'src/assets/sass/components/buttons/_buttons-all.scss'
      },
      output: {
        assetFileNames: '[name]-[hash][extname]'
      }
    }
  },
  plugins: [
    {
      name: 'exclude-non-assets',
      generateBundle(_, bundle) {
        for (const file in bundle) {
          if (file.endsWith('.php') || file.endsWith('.html')) {
            delete bundle[file];
          }
        }
      },
    },
  ],
});



  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
