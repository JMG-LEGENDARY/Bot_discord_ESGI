import { defineConfig } from 'vite';

// En développement, les appels /api sont envoyés au serveur du tableau de bord
// (dashboard/serveur.py, port 8787). En production, c'est ce même serveur qui
// sert le site construit.
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8787'
    }
  },
  build: {
    rolldownOptions: {
      output: {
        // Bibliothèques (three.js, GSAP) dans des fichiers à part : elles ne
        // changent presque jamais, le navigateur les garde en cache. Après une
        // mise à jour du site, le visiteur ne retélécharge que notre code.
        codeSplitting: {
          groups: [
            { name: 'three', test: /node_modules[\\/]three[\\/]/, priority: 2 },
            { name: 'gsap', test: /node_modules[\\/]gsap[\\/]/, priority: 1 }
          ]
        }
      }
    }
  }
});
