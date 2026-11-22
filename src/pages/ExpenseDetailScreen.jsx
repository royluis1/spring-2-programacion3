import { Link, useNavigate, useParams } from 'react-router-dom';
import CategoryBadge from '../components/CategoryBadge';
import CategoryIcon from '../components/CategoryIcon';
import PageHeader from '../components/PageHeader';
import { getExpenseById } from '../data/mockExpenses';
import '../styles/detail.css';
import { formatCurrency } from '../utils/format';

// Detalle de un gasto. En el Sprint 1 recibía el objeto por route.params;
// acá la URL es la fuente de verdad: se busca el gasto por el id de /expenses/:id.
export default function ExpenseDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const expense = getExpenseById(id);

  // Volver con navigate(-1). Si se entró directo por el enlace (no hay historial
  // dentro de la app), se va al listado para no salir de la aplicación.
  const goBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate('/expenses', { replace: true });
    }
  };

  if (!expense) {
    return (
      <>
        <PageHeader title="Detalle del gasto" onBack={goBack} />
        <main className="page-content detail detail--empty">
          <p className="detail__empty-title">No encontramos el gasto que buscás.</p>
          <p className="detail__empty-text">Puede que el enlace sea incorrecto o que el gasto ya no exista.</p>
          <Link to="/expenses" className="button button--outline">
            Ir al listado
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Detalle del gasto" onBack={goBack} />
      <main className="page-content detail">
        <section className="detail__header" aria-labelledby="detail-title">
          <CategoryIcon categoryId={expense.categoryId} size={72} />
          <h2 id="detail-title" className="detail__description">
            {expense.description}
          </h2>
          <p className="detail__amount">{formatCurrency(expense.amount)}</p>
        </section>

        <dl className="detail__card">
          <div className="detail__row">
            <dt>Categoría</dt>
            <dd>
              <CategoryBadge categoryId={expense.categoryId} />
            </dd>
          </div>
          <div className="detail__row">
            <dt>Fecha</dt>
            <dd>{expense.date}</dd>
          </div>
          <div className="detail__row detail__row--notes">
            <dt>Notas</dt>
            <dd>{expense.notes || 'Sin notas.'}</dd>
          </div>
        </dl>

        <button type="button" className="button button--outline" onClick={goBack}>
          Volver al listado
        </button>
      </main>
    </>
  );
}
