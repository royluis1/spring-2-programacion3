import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/format';
import CategoryBadge from './CategoryBadge';
import CategoryIcon from './CategoryIcon';
import '../styles/expense-card.css';

// Tarjeta de un gasto del listado (equivale a ExpenseItem.js del Sprint 1).
// Toda la tarjeta es un enlace al detalle: /expenses/:id
export default function ExpenseCard({ expense }) {
  return (
    <article className="expense-card">
      <Link to={`/expenses/${expense.id}`} className="expense-card__link">
        <CategoryIcon categoryId={expense.categoryId} />
        <div className="expense-card__info">
          <h2 className="expense-card__description">{expense.description}</h2>
          <CategoryBadge categoryId={expense.categoryId} />
        </div>
        <p className="expense-card__amount">{formatCurrency(expense.amount)}</p>
      </Link>
    </article>
  );
}
