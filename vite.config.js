export default {
  build: {
      outDir: 'dist', // Output directory for build
      emptyOutDir: true, // Clean the output directory before building
      sourcemap: true, // Enable source map generation
      cssCodeSplit: false, // Prevent CSS code splitting
      rollupOptions: {
          input: 'src/assets/sass/base/main.scss',
          output: {
              assetFileNames: 'main-[hash][extname]',
          },
          external: (id) => {
              // Exclude images from being processed
              return id.includes('/images/');
          },
      },
  },
};

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
