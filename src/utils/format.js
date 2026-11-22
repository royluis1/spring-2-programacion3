// Formatea un número como monto en pesos con separador de miles. Ej: 25000 -> "$25.000"
// (misma función que en el Sprint 1).
export function formatCurrency(amount) {
  const rounded = Math.round(Number(amount) || 0);
  return '$' + String(rounded).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
