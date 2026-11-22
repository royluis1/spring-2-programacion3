import { useState } from 'react';
import usePWAInstall from '../hooks/usePWAInstall';
import '../styles/install-banner.css';

// Banner de instalación:
// - Android / Chrome: botón "Instalar App" que abre el diálogo nativo (beforeinstallprompt).
// - iOS (Safari): instrucciones para instalar manualmente, solo si la app no está instalada.
export default function InstallBanner() {
  const { canInstall, showIOSInstructions, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || (!canInstall && !showIOSInstructions)) return null;

  return (
    <aside className="install-banner" aria-label="Instalar ExpenseTracker">
      <img className="install-banner__icon" src="/icons/icon-192.png" alt="" width="40" height="40" />
      <div className="install-banner__text">
        <p className="install-banner__title">Instalá ExpenseTracker</p>
        {canInstall ? (
          <p className="install-banner__subtitle">Usala como una app, incluso sin conexión.</p>
        ) : (
          <p className="install-banner__subtitle">
            Tocá <strong>Compartir</strong> y luego <strong>Agregar a la pantalla de inicio</strong>.
          </p>
        )}
      </div>
      <div className="install-banner__actions">
        {canInstall && (
          <button type="button" className="install-banner__install" onClick={install}>
            Instalar App
          </button>
        )}
        <button
          type="button"
          className="install-banner__close"
          onClick={() => setDismissed(true)}
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>
    </aside>
  );
}
