// Custom Hook para la instalación de la PWA. Se implementa en la US3 (#pwa-s2-us3).
export default function usePWAInstall() {
  return { canInstall: false, isIOS: false, isStandalone: false, install: () => {} };
}
