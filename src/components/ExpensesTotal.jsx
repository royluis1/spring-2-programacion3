import { getTotal } from '../data/mockExpenses';
import { formatCurrency } from '../utils/format';
import '../styles/expenses-total.css';

// Tarjeta con el total de gastos al final del listado (equivale a ExpensesTotal.js del Sprint 1).
export default function ExpensesTotal({ expenses }) {
  return (
    <section className="expenses-total" aria-label="Total de gastos">
      <div>
        <p className="expenses-total__label">Total de gastos</p>
        <p className="expenses-total__count">{expenses.length} registros</p>
      </div>
      <p className="expenses-total__amount">{formatCurrency(getTotal(expenses))}</p>
    </section>
  );
}
