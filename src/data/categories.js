import { IoCar, IoCart, IoFilm, IoMedkit, IoPricetag, IoWifi } from 'react-icons/io5';

// Categorías disponibles (las mismas que en el Sprint 1).
// Los íconos son del set Ionicons, el mismo que usaba Expo Vector Icons.
// Los colores son versiones un poco más oscuras de los del Sprint 1 para que el texto
// tenga un contraste de al menos 4.5:1 sobre fondo blanco (accesibilidad / Lighthouse).
const CATEGORIES = [
  { id: 'alimentos', name: 'Alimentos', color: '#B85C00', Icon: IoCart },
  { id: 'transporte', name: 'Transporte', color: '#1F6FA8', Icon: IoCar },
  { id: 'servicios', name: 'Servicios', color: '#8E44AD', Icon: IoWifi },
  { id: 'salud', name: 'Salud', color: '#C0392B', Icon: IoMedkit },
  { id: 'ocio', name: 'Ocio', color: '#0E7C66', Icon: IoFilm },
  { id: 'otros', name: 'Otros', color: '#5F6B66', Icon: IoPricetag },
];

export function getCategory(id) {
  return CATEGORIES.find((category) => category.id === id);
}

export default CATEGORIES;
