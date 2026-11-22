import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import InstallBanner from '../components/InstallBanner';
import NewExpenseModal from '../components/NewExpenseModal';
import { formatCurrency } from '../utils/format';
import '../styles/layout.css';

// Layout persistente de la app (equivale al TabNavigator del Sprint 1).
// La Bottom Navigation Bar se agrega en la US7 (#pwa-s2-us7).
export default function MainLayout() {
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
      <Outlet context={{ openNewExpense }} />

      <p className="toast" role="status" aria-live="polite" data-visible={Boolean(toast)}>
        {toast}
      </p>

      <NewExpenseModal open={isModalOpen} onClose={closeNewExpense} onSave={handleSave} />
    </div>
  );
}
