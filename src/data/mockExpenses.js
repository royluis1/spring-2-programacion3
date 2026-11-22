// Datos de prueba definidos manualmente: los mismos gastos que en el Sprint 1
// (src/data/expenses.js), con el agregado de notas para la pantalla de detalle.
const MOCK_EXPENSES = [
  {
    id: '1',
    description: 'Supermercado',
    amount: 25000,
    categoryId: 'alimentos',
    date: '18/11/2026',
    notes: 'Compra semanal.',
  },
  {
    id: '2',
    description: 'Combustible',
    amount: 18000,
    categoryId: 'transporte',
    date: '19/11/2026',
    notes: 'Tanque lleno.',
  },
  {
    id: '3',
    description: 'Internet',
    amount: 32000,
    categoryId: 'servicios',
    date: '20/11/2026',
    notes: 'Abono mensual del servicio de fibra.',
  },
  {
    id: '4',
    description: 'Farmacia',
    amount: 9500,
    categoryId: 'salud',
    date: '21/11/2026',
    notes: '',
  },
  {
    id: '5',
    description: 'Cine',
    amount: 12000,
    categoryId: 'ocio',
    date: '22/11/2026',
    notes: 'Dos entradas.',
  },
];

export function getExpenseById(id) {
  return MOCK_EXPENSES.find((expense) => expense.id === id);
}

export function getTotal(expenses) {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

export default MOCK_EXPENSES;
