import { Outlet } from 'react-router-dom';
import InstallBanner from '../components/InstallBanner';

// Layout persistente de la app (equivale al TabNavigator del Sprint 1).
// La Bottom Navigation Bar se agrega en la US7 (#pwa-s2-us7).
export default function MainLayout() {
  return (
    <>
      <InstallBanner />
      <Outlet />
    </>
  );
}
