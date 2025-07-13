
import { createRoot } from 'react-dom/client'
import App from './app'
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
createRoot(document.getElementById('root')!).render(
    <App />
)
