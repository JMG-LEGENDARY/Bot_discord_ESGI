import { defineConfig } from 'vite';

// En développement, les appels /api sont envoyés au serveur du tableau de bord
// (dashboard/serveur.py, port 8787). En production, c'est ce même serveur qui
// sert le site construit.
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8787'
    }
  }
});
