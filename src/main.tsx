import { StrictMode } from 'react'
import { registerSW } from 'virtual:pwa-register'

let refreshing = false;
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
}

registerSW({
  immediate: true,
  onRegistered(r) {
    if (r) {
      setInterval(() => {
        r.update();
      }, 60 * 60 * 1000); // Check for updates every hour
    }
  },
  onNeedRefresh() {
    window.location.reload();
  },
  onOfflineReady() {},
})
import { createRoot } from 'react-dom/client'
import './i18n/i18n'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
