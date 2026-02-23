import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PageContextProvider } from './Contexts/PageContext.jsx'

createRoot(document.getElementById('root')).render(
  <PageContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </PageContextProvider>
)
