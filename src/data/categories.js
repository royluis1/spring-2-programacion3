// Categorías disponibles (las mismas que en el Sprint 1).
const CATEGORIES = [
  { id: 'alimentos', name: 'Alimentos', color: '#E67E22' },
  { id: 'transporte', name: 'Transporte', color: '#2980B9' },
  { id: 'servicios', name: 'Servicios', color: '#8E44AD' },
  { id: 'salud', name: 'Salud', color: '#C0392B' },
  { id: 'ocio', name: 'Ocio', color: '#16A085' },
  { id: 'otros', name: 'Otros', color: '#7F8C8D' },
];

export function getCategory(id) {
  return CATEGORIES.find((category) => category.id === id);
}

export default CATEGORIES;
