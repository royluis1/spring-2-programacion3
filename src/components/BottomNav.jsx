import { NavLink } from 'react-router-dom';
import {
  IoHome,
  IoHomeOutline,
  IoList,
  IoListOutline,
  IoSettings,
  IoSettingsOutline,
} from 'react-icons/io5';
import '../styles/bottom-nav.css';

// Pestañas de la barra inferior (equivalen a las Tab.Screen del Sprint 1).
// Cada una tiene el ícono relleno (activa) y el de contorno (inactiva), como en el TabNavigator.
const TABS = [
  { to: '/', label: 'Inicio', end: true, icons: [IoHome, IoHomeOutline] },
  { to: '/expenses', label: 'Gastos', end: false, icons: [IoList, IoListOutline] },
  { to: '/settings', label: 'Ajustes', end: true, icons: [IoSettings, IoSettingsOutline] },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      <ul className="bottom-nav__list">
        {TABS.map(({ to, label, end, icons: [ActiveIcon, InactiveIcon] }) => (
          <li key={to}>
            {/* NavLink agrega la clase "active" y aria-current="page" a la pestaña actual.
                "Gastos" queda activa también en /expenses/:id (end: false). */}
            <NavLink to={to} end={end} className="bottom-nav__link">
              {({ isActive }) => (
                <>
                  {isActive ? <ActiveIcon aria-hidden="true" /> : <InactiveIcon aria-hidden="true" />}
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
