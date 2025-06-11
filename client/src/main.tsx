import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Theme } from '@radix-ui/themes'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AuthProvider } from './Auth/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme appearance='light'>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </Theme>
  </StrictMode>,
)
