// main.tsx — Lab 5.2
// Wraps the app in both ClerkProvider (auth) and QueryClientProvider
// (TanStack Query server state management).
// The ReactQueryDevtools panel appears in development only, making it
// easy to inspect cache status, refetch triggers, and query states.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY in .env');
}

// Create a single QueryClient for the whole app.
// staleTime: 30s — data is considered fresh for 30 seconds after fetching,
// so switching between pages doesn't trigger unnecessary refetches.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,        // 30 seconds
      retry: 1,                    // retry failed requests once before showing error
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <App />
        {/* DevTools panel — only visible in development */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ClerkProvider>
  </React.StrictMode>
);
