import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globla.css';
import { ThemeProvider } from './context/theme/ThemeContext.tsx';
import { LanguageProvider } from './context/language/LanguageProvider.tsx';
import { AuthProvider } from './context/auth/AuthProvider.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Rotas } from './routes/routes.tsx';
import './lib/i18n/i18n.ts';
import { CartProvider } from './context/cart/CartProvider.tsx';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 2 } },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <BrowserRouter>
                <Rotas />
              </BrowserRouter>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
