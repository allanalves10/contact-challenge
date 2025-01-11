import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyles } from './styles/globalStyles.ts'
import { ToastContainer } from 'react-toastify'
import { AuthenticationProvider } from './context/authenticationContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthenticationProvider>
      <App />
      <GlobalStyles />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthenticationProvider>
  </StrictMode>,
)
