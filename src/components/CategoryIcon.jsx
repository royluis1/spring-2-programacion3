import { IoHelp } from 'react-icons/io5';
import { getCategory } from '../data/categories';
import '../styles/category-icon.css';

// Círculo con el ícono de la categoría pintado con su color (equivale a CategoryIcon.js del Sprint 1).
export default function CategoryIcon({ categoryId, size = 44 }) {
  const category = getCategory(categoryId);
  const Icon = category ? category.Icon : IoHelp;
  const color = category ? category.color : 'var(--color-text-secondary)';

  return (
    <span
      className="category-icon"
      style={{ '--icon-color': color, '--icon-size': `${size}px` }}
      aria-hidden="true"
    >
      <Icon />
    </span>
  );
}
