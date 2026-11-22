import { useCallback, useEffect, useState } from 'react';

// Detecta iPhone / iPad (los iPad modernos se presentan como "MacIntel" con pantalla táctil).
function detectIOS() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return /iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

// La app está "instalada" si se abrió en modo standalone (Android/escritorio)
// o desde la pantalla de inicio en iOS (navigator.standalone).
function detectStandalone() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

/**
 * Custom Hook para la instalación de la PWA.
 * - Captura el evento beforeinstallprompt (Chrome / Android) para mostrar un botón propio.
 * - Informa si el dispositivo es iOS, donde la instalación es manual (Compartir → Agregar a inicio).
 * - Informa si la app ya se está ejecutando instalada.
 */
export default function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(detectStandalone);
  const [isIOS] = useState(detectIOS);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Evitamos el mini-infobar del navegador y guardamos el evento para usarlo con nuestro botón.
      event.preventDefault();
      setDeferredPrompt(event);
    };
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
    };
    const displayMode = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = () => setIsStandalone(detectStandalone());

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    displayMode.addEventListener('change', handleDisplayModeChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      displayMode.removeEventListener('change', handleDisplayModeChange);
    };
  }, []);

  const install = useCallback(async () => {
    if (!deferredPrompt) return false;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    // El evento solo puede usarse una vez.
    setDeferredPrompt(null);
    return outcome === 'accepted';
  }, [deferredPrompt]);

  return {
    canInstall: Boolean(deferredPrompt) && !isStandalone,
    showIOSInstructions: isIOS && !isStandalone,
    isIOS,
    isStandalone,
    install,
  };
}
