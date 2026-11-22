import { Link, useOutletContext } from 'react-router-dom';
import welcomeIllustration from '../assets/welcome-illustration.png';
import MOCK_EXPENSES, { getTotal } from '../data/mockExpenses';
import '../styles/home.css';
import { formatCurrency } from '../utils/format';

const FEATURES = [
  'Registrá cada gasto en pocos segundos.',
  'Organizalos por categoría.',
  'Consultá cuánto gastaste en total.',
];

export default function HomeScreen() {
  // El layout comparte la acción para abrir el formulario (modal) con las páginas.
  const { openNewExpense } = useOutletContext() ?? {};
  const total = getTotal(MOCK_EXPENSES);

  return (
    <div className="home">
      <header className="home__header">
        <img
          className="home__illustration"
          src={welcomeIllustration}
          alt="Ilustración de una billetera con gastos"
          width="240"
          height="180"
        />
        <h1 className="home__title">ExpenseTracker</h1>
        <p className="home__welcome">¡Te damos la bienvenida!</p>
        <p className="home__description">
          ExpenseTracker es la app que te ayuda a registrar y consultar tus gastos personales para
          que sepas siempre en qué se va tu dinero.
        </p>
      </header>

      <main className="home__content">
        <section className="home__summary" aria-labelledby="summary-title">
          <h2 id="summary-title" className="home__summary-label">
            Total registrado
          </h2>
          <p className="home__summary-total">{formatCurrency(total)}</p>
          <p className="home__summary-count">{MOCK_EXPENSES.length} movimientos</p>
        </section>

        <section className="home__card" aria-labelledby="features-title">
          <h2 id="features-title" className="home__card-title">
            ¿Qué vas a poder hacer?
          </h2>
          <ul className="home__features">
            {FEATURES.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        <nav className="home__actions" aria-label="Accesos rápidos">
          <button type="button" className="button button--primary" onClick={openNewExpense}>
            Registrar Nuevo Gasto
          </button>
          <Link to="/expenses" className="button button--outline">
            Ver Listado Completo
          </Link>
        </nav>
      </main>
    </div>
  );
}
