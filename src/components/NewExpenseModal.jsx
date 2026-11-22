import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import CATEGORIES from '../data/categories';
import '../styles/modal.css';

/**
 * Formulario de alta de un gasto (equivale a NewExpenseModal.js del Sprint 1,
 * que era una pantalla con presentation: 'modal').
 * Usa el elemento nativo <dialog> con showModal() y se renderiza con createPortal
 * directamente dentro de <body>, fuera del árbol de la página actual.
 */
export default function NewExpenseModal({ open, onClose, onSave }) {
  const dialogRef = useRef(null);
  const formRef = useRef(null);

  // Sincroniza la prop "open" con el estado nativo del <dialog>.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      formRef.current.reset();
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // El <dialog> también se cierra con la tecla Escape o el gesto "atrás":
  // avisamos al padre para que su estado quede sincronizado.
  useEffect(() => {
    const dialog = dialogRef.current;
    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const category = CATEGORIES.find((item) => item.id === data.get('category'));
    const expense = {
      name: data.get('name').trim(),
      amount: Number(String(data.get('amount')).replace(',', '.')),
      category: category.name,
    };
    // Todavía no se guarda la información: solo mostramos lo que se cargó.
    console.log('Gasto a guardar:', expense);
    onSave(expense);
  };

  // Tocar el fondo oscuro (fuera de la hoja) también cierra el modal.
  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) onClose();
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className="sheet"
      aria-labelledby="new-expense-title"
      onClick={handleBackdropClick}
    >
      <form ref={formRef} className="sheet__form" onSubmit={handleSubmit}>
        <div className="sheet__handle" aria-hidden="true" />
        <h2 id="new-expense-title" className="sheet__title">
          Nuevo gasto
        </h2>
        <p className="sheet__subtitle">Completá los datos del nuevo gasto.</p>

        <div className="field">
          <label htmlFor="expense-name" className="field__label">
            Nombre del gasto
          </label>
          <input
            id="expense-name"
            name="name"
            type="text"
            className="field__input"
            placeholder="Ej: Supermercado"
            autoComplete="off"
            enterKeyHint="next"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="expense-amount" className="field__label">
            Monto
          </label>
          <input
            id="expense-amount"
            name="amount"
            type="text"
            inputMode="decimal"
            pattern="[0-9]+([.,][0-9]{1,2})?"
            title="Ingresá un número, por ejemplo 25000 o 1500,50"
            className="field__input"
            placeholder="Ej: 25000"
            autoComplete="off"
            enterKeyHint="done"
            required
          />
        </div>

        <fieldset className="field chips">
          <legend className="field__label">Categoría</legend>
          <div className="chips__list">
            {CATEGORIES.map((category, index) => (
              <label key={category.id} className="chip" style={{ '--chip-color': category.color }}>
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  defaultChecked={index === 0}
                  className="chip__input"
                />
                <span className="chip__text">{category.name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="sheet__actions">
          <button type="submit" className="button button--primary">
            Guardar
          </button>
          <button type="button" className="button button--outline" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </dialog>,
    document.body
  );
}
