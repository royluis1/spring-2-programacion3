import { getCategory } from '../data/categories';
import '../styles/category-badge.css';

// Etiqueta con el nombre y el color de la categoría de un gasto.
export default function CategoryBadge({ categoryId }) {
  const category = getCategory(categoryId);
  const color = category ? category.color : 'var(--color-text-secondary)';

  return (
    <span className="category-badge" style={{ '--badge-color': color }}>
      {category ? category.name : 'Sin categoría'}
    </span>
  );
}
