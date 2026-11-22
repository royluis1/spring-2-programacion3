import { useOutletContext } from 'react-router-dom';

export default function ExpensesScreen() {
  const { openNewExpense } = useOutletContext() ?? {};

  return (
    <>
      <header>
        <h1>Mis gastos</h1>
        <button type="button" onClick={openNewExpense} aria-label="Agregar gasto">
          +
        </button>
      </header>
      <main />
    </>
  );
}
