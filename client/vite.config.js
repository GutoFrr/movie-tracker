import { resolve } from 'path';

export default {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        movie: resolve(__dirname, 'movie.html'),
      },
    },
  },
};
