import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import InstallBanner from '../components/InstallBanner';
import NewExpenseModal from '../components/NewExpenseModal';
import { formatCurrency } from '../utils/format';
import '../styles/layout.css';

// Layout persistente de la app (equivale al TabNavigator del Sprint 1):
// las páginas se dibujan en el <Outlet> y la Bottom Navigation Bar queda siempre visible.
// También maneja el formulario de alta (modal) y el mensaje temporal al guardar.
export default function MainLayout() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState('');

  const openNewExpense = useCallback(() => setIsModalOpen(true), []);
  const closeNewExpense = useCallback(() => setIsModalOpen(false), []);

  const handleSave = useCallback((expense) => {
    setIsModalOpen(false);
    setToast(
      `Gasto registrado: ${expense.name} ${formatCurrency(expense.amount)} (${expense.category}). ` +
        'En este Sprint los datos todavía no se guardan.'
    );
  }, []);

  // El mensaje temporal desaparece solo después de unos segundos.
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(''), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="app-layout">
      <InstallBanner />

      {/* Las páginas reciben la acción para abrir el formulario mediante useOutletContext(). */}
      {/* La key cambia con la ruta: cada pantalla nueva entra con una animación CSS. */}
      <div key={location.pathname} className="page-transition">
        <Outlet context={{ openNewExpense }} />
      </div>

      <p className="toast" role="status" aria-live="polite" data-visible={Boolean(toast)}>
        {toast}
      </p>

      <BottomNav />

      <NewExpenseModal open={isModalOpen} onClose={closeNewExpense} onSave={handleSave} />
    </div>
  );
}
