import { useOutletContext } from 'react-router-dom';
import ExpenseCard from '../components/ExpenseCard';
import PageHeader from '../components/PageHeader';
import MOCK_EXPENSES from '../data/mockExpenses';
import '../styles/expenses.css';

// Listado de gastos (equivale a ExpensesScreen.js con FlatList del Sprint 1).
export default function ExpensesScreen() {
  const { openNewExpense } = useOutletContext() ?? {};

  return (
    <>
      <PageHeader
        title="Mis gastos"
        action={
          <button
            type="button"
            className="icon-button icon-button--add"
            onClick={openNewExpense}
            aria-label="Agregar gasto"
          >
            <span aria-hidden="true">+</span>
          </button>
        }
      />
      <main className="page-content">
        <h2 className="page-subtitle">Últimos gastos</h2>
        <ul className="expenses-list">
          {MOCK_EXPENSES.map((expense) => (
            <li key={expense.id}>
              <ExpenseCard expense={expense} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
