// apiBase.ts — resolves the correct backend URL for the current environment.
// Works on localhost and GitHub Codespaces automatically.

export const getApiBase = (): string => {
  // In production (Vercel), set VITE_API_BASE to your deployed backend URL,
  // e.g. https://your-backend.onrender.com/api
  const envBase = import.meta.env.VITE_API_BASE;
  if (envBase) {
    return envBase;
  }

  const { hostname, protocol } = window.location;
  const codespacesMatch = hostname.match(/^(.*)-\d+\.app\.github\.dev$/);

  if (codespacesMatch) {
    return `${protocol}//${codespacesMatch[1]}-3001.app.github.dev/api`;
  }

  return 'http://localhost:3001/api';
};

export const API_BASE = getApiBase();
