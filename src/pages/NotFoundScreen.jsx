import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

// Pantalla para cualquier URL que no corresponda a una ruta de la app.
export default function NotFoundScreen() {
  return (
    <>
      <PageHeader title="Página no encontrada" />
      <main className="page-content detail detail--empty">
        <p className="detail__empty-title">Esta pantalla no existe.</p>
        <p className="detail__empty-text">Revisá la dirección o volvé al inicio.</p>
        <Link to="/" className="button button--outline">
          Ir al inicio
        </Link>
      </main>
    </>
  );
}
