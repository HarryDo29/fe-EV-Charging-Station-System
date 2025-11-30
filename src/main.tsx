import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { AuthProvider } from './context/AuthContext/AuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </CookiesProvider>
  </StrictMode>
)
