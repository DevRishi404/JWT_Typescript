import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Theme } from '@radix-ui/themes'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme appearance='light'>
      <QueryClientProvider client={new QueryClient()}>
        <App />
      </QueryClientProvider>
    </Theme>
  </StrictMode>,
)
