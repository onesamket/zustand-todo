import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast';
import { UpdateDialog } from './components/Form/update-form.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <main>

      <App />
      <Toaster position='bottom-right' />
      <UpdateDialog />
    </main>
  </React.StrictMode>,
)
