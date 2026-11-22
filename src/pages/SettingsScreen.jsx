import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import '../styles/settings.css';

// Interruptor accesible: un checkbox nativo con role="switch" (equivale al Switch del Sprint 1).
function SwitchRow({ id, title, subtitle, checked, onChange }) {
  return (
    <li className="settings__row">
      <label htmlFor={id} className="settings__text">
        <span className="settings__title">{title}</span>
        <span className="settings__subtitle">{subtitle}</span>
      </label>
      <input
        id={id}
        type="checkbox"
        role="switch"
        className="switch"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
    </li>
  );
}

function InfoRow({ title, value }) {
  return (
    <li className="settings__row">
      <span className="settings__title">{title}</span>
      <span className="settings__value">{value}</span>
    </li>
  );
}

export default function SettingsScreen() {
  // Opciones de ejemplo: todavía no se guardan, solo muestran cómo se verá la pantalla.
  const [notifications, setNotifications] = useState(true);
  const [monthlySummary, setMonthlySummary] = useState(false);

  return (
    <>
      <PageHeader title="Ajustes" />
      <main className="page-content settings">
        <section aria-labelledby="preferences-title">
          <h2 id="preferences-title" className="settings__section">
            Preferencias
          </h2>
          <ul className="settings__card">
            <SwitchRow
              id="setting-notifications"
              title="Notificaciones"
              subtitle="Recordatorios para cargar gastos"
              checked={notifications}
              onChange={setNotifications}
            />
            <SwitchRow
              id="setting-monthly-summary"
              title="Resumen mensual"
              subtitle="Recibir un resumen a fin de mes"
              checked={monthlySummary}
              onChange={setMonthlySummary}
            />
            <InfoRow title="Moneda" value="Peso argentino (ARS)" />
          </ul>
        </section>

        <section aria-labelledby="about-title">
          <h2 id="about-title" className="settings__section">
            Acerca de
          </h2>
          <ul className="settings__card">
            <InfoRow title="Versión" value="2.0.0 (Sprint 2 - PWA)" />
            <InfoRow title="Proyecto" value="Programación III" />
          </ul>
        </section>
      </main>
    </>
  );
}
