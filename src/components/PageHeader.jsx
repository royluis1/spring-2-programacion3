import '../styles/page.css';

// Encabezado de cada pantalla (equivale al header que dibujaba React Navigation).
// - onBack: muestra el botón para volver.
// - action: elemento opcional a la derecha (por ejemplo el botón "+").
export default function PageHeader({ title, onBack, action }) {
  return (
    <header className="page-header">
      {onBack && (
        <button type="button" className="page-header__back" onClick={onBack} aria-label="Volver">
          <span aria-hidden="true">←</span>
        </button>
      )}
      <h1 className="page-header__title">{title}</h1>
      {action && <div className="page-header__action">{action}</div>}
    </header>
  );
}
