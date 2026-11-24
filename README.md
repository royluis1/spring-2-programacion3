# ExpenseTracker PWA 💸

Versión **Progressive Web App** de ExpenseTracker, hecha con **React + Vite** para el
Sprint 2 del Proyecto Integrador de Programación III.

Es la misma aplicación del Sprint 1 ([ExpenseTracker con React Native y Expo](https://github.com/royluis1/ExpenseTracker)):
mismas pantallas, mismos datos y misma navegación. Esta versión se abre desde una URL, se instala
desde el navegador y funciona sin conexión. Los datos siguen definidos en el código (no hay
IndexedDB, localStorage, Context ni APIs remotas).

**Autor:** roy luis garro ([@royluis1](https://github.com/royluis1))

**URL pública (HTTPS):** https://spring-2-programacion3.vercel.app

---

## Tecnologías

| Herramienta | Uso | Equivalente en el Sprint 1 |
| --- | --- | --- |
| [Vite](https://vite.dev) + React (plantilla `react`, JavaScript) | Proyecto, servidor de desarrollo y build | Expo CLI + Metro |
| React Router | Navegación basada en la URL | React Navigation |
| vite-plugin-pwa (Workbox) | Genera y registra el Service Worker | — |
| react-icons (`io5`, Ionicons) | Íconos | @expo/vector-icons |
| Vercel / Netlify | Publicación con HTTPS | Expo Go |

## Cómo ejecutar

Requisitos: Node.js 20.19+ o 22.12+.

```bash
git clone https://github.com/royluis1/spring-2-programacion3.git
cd spring-2-programacion3
npm install
npm run dev
```

- `npm run dev` → http://localhost:5173 (con `npm run dev -- --host` se puede abrir desde el celular en la misma red Wi-Fi).
- `npm run build` → genera la versión de producción en `dist/` (incluye el Service Worker).
- `npm run preview` → sirve `dist/` en http://localhost:4173 para probar la PWA completa.

El Service Worker solo se genera en la versión de producción (`build` + `preview`), no en `npm run dev`.

### Publicar

- **Vercel:** Add New → Project → importar este repositorio. Detecta Vite solo (build `npm run build`, salida `dist`).
  La regla para que todas las rutas respondan con `index.html` está en `vercel.json`.
- **Netlify:** Add new site → Import an existing project. Build `npm run build`, carpeta `dist`.
  La regla está en `public/_redirects`.

## Estructura del proyecto

```
spring-2-programacion3/
├── index.html                 # Viewport (viewport-fit=cover), manifest y etiquetas para iOS
├── vite.config.js             # React + VitePWA (Service Worker)
├── vercel.json                # Rewrites de la SPA para Vercel
├── public/
│   ├── manifest.json          # Web App Manifest (único manifest de la app)
│   ├── icons/                 # 192, 512, maskable y apple-touch-icon
│   ├── favicon.svg
│   ├── robots.txt
│   └── _redirects             # Rewrites de la SPA para Netlify
├── docs/screenshots/          # Capturas para este README
└── src/
    ├── main.jsx               # Monta React con BrowserRouter
    ├── App.jsx
    ├── components/
    │   ├── ExpenseCard.jsx        tarjeta de un gasto (enlace al detalle)
    │   ├── CategoryBadge.jsx      nombre + color de la categoría
    │   ├── CategoryIcon.jsx       círculo con el ícono de la categoría
    │   ├── ExpensesTotal.jsx      total al final del listado
    │   ├── NewExpenseModal.jsx    formulario de alta (<dialog> + createPortal)
    │   ├── InstallBanner.jsx      banner "Instalar App" / instrucciones de iOS
    │   ├── BottomNav.jsx          barra de navegación inferior (NavLink)
    │   └── PageHeader.jsx         encabezado de cada pantalla con botón volver
    ├── pages/
    │   ├── HomeScreen.jsx
    │   ├── ExpensesScreen.jsx
    │   ├── ExpenseDetailScreen.jsx
    │   ├── SettingsScreen.jsx
    │   └── NotFoundScreen.jsx
    ├── router/AppRouter.jsx   # <Routes>
    ├── layouts/MainLayout.jsx # <Outlet> + BottomNav + modal de alta
    ├── hooks/usePWAInstall.js # beforeinstallprompt, iOS y modo standalone
    ├── data/                  # mockExpenses.js (mismos datos del Sprint 1) y categories.js
    ├── styles/                # Un archivo .css por pantalla/componente + global.css
    ├── assets/                # Ilustración de bienvenida (la misma del Sprint 1)
    └── utils/format.js        # formatCurrency (25000 → $25.000)
```

Carpetas y archivos agregados a la estructura propuesta:

- **`assets/`**: imágenes que se importan desde el código; Vite les agrega un hash al nombre para el caché.
- **`utils/`**: funciones que no son componentes, como `formatCurrency` (la misma del Sprint 1).
- **`data/categories.js`**: las categorías se usan en el listado, el detalle y el formulario.
- **`BottomNav`** y **`PageHeader`**: separan la barra inferior y el encabezado del layout y de las páginas, para reutilizarlos.
- **`CategoryIcon`** y **`ExpensesTotal`**: equivalentes a los componentes del bonus del Sprint 1.
- **`NotFoundScreen`**: en la web cualquiera puede escribir una URL inexistente, así que hace falta una pantalla para ese caso.

## Mapa de migración

| Sprint 1 — React Native (Expo) | Sprint 2 — React Web (PWA) | Dónde |
| --- | --- | --- |
| `App.js` + `NavigationContainer` | `main.jsx` + `BrowserRouter` | `src/main.jsx` |
| `StackNavigator.js` | `<Routes>` | `src/router/AppRouter.jsx` |
| `TabNavigator.js` | `<Outlet>` + `<NavLink>` | `src/layouts/MainLayout.jsx`, `src/components/BottomNav.jsx` |
| `NewExpenseModal.js` (`presentation: 'modal'`) | `<dialog>` + `createPortal` | `src/components/NewExpenseModal.jsx` |
| `navigation.navigate('ExpenseDetail', …)` | `<Link to="/expenses/1">` | `src/components/ExpenseCard.jsx` |
| `route.params` | `useParams()` | `src/pages/ExpenseDetailScreen.jsx` |
| `navigation.goBack()` | `navigate(-1)` | `src/pages/ExpenseDetailScreen.jsx` |
| `StyleSheet.create()` | Archivos `.css` | `src/styles/` |
| `SafeAreaView` | `env(safe-area-inset-*)` | `home.css`, `page.css`, `bottom-nav.css`, `modal.css` |
| `Pressable` / `TouchableOpacity` | `<button>` + `:active` | `buttons.css` |
| `keyboardType="numeric"` | `inputmode="decimal"` | `NewExpenseModal.jsx` |
| `Switch` | `<input type="checkbox" role="switch">` | `SettingsScreen.jsx` |
| `app.json` (nombre, ícono) | `public/manifest.json` | `public/` |
| `Alert.alert` | Mensaje temporal (`role="status"`) | `MainLayout.jsx` |

## Rutas

| Ruta | Pantalla |
| --- | --- |
| `/` | Bienvenida |
| `/expenses` | Listado de gastos |
| `/expenses/:id` | Detalle (se obtiene del id de la URL, funciona al recargar o compartir el enlace) |
| `/settings` | Ajustes |
| `*` | Página no encontrada |

El formulario de alta es un modal que se abre desde **Inicio** ("Registrar Nuevo Gasto") y desde **Gastos** (botón **+**).

## Los tres pilares de la PWA

- **Manifest** (`public/manifest.json`): nombre, `short_name`, descripción, `start_url`, `display: standalone`,
  orientación, colores e íconos (incluido uno `maskable`). En `index.html` están el enlace al manifest, el viewport con
  `viewport-fit=cover`, `theme-color` y las etiquetas `apple-mobile-web-app-*` + `apple-touch-icon`.
- **Service Worker** (`vite-plugin-pwa`, `manifest: false` para no generar un segundo manifest): pre-cachea el app shell
  (HTML, CSS, JS, íconos e imágenes) y responde cualquier ruta con `index.html` (`navigateFallback`), así la app
  abre y navega sin conexión, incluso entrando directo a `/expenses/2`.
- **Experiencia móvil**: `100dvh` (con `100vh` de respaldo), áreas seguras, barra inferior fija, controles de al menos
  44px, `:active` para la respuesta táctil (nada depende de `:hover`), `touch-action: manipulation` y teclado numérico.

**Instalación:** en Android/Chrome aparece el banner propio con el botón **Instalar App** (`usePWAInstall` captura
`beforeinstallprompt`). En iOS se muestran las instrucciones (Compartir → Agregar a la pantalla de inicio) y el banner
se oculta cuando la app se abre instalada (`navigator.standalone`).

## User Stories del Sprint 2

| Código | User Story | Estado |
| --- | --- | --- |
| #pwa-s2-us1 | Crear proyecto React con Vite | ✅ |
| #pwa-s2-us2 | Definir estructura del proyecto | ✅ |
| #pwa-s2-us3 | Configurar identidad e instalabilidad | ✅ |
| #main-s2-us4 | Migrar pantalla de bienvenida | ✅ |
| #main-s2-us5 | Migrar formulario de carga de gastos | ✅ |
| #main-s2-us6 | Migrar listado y detalle de gastos | ✅ |
| #pwa-s2-us7 | Integrar todas las vistas con navegación app-like | ✅ |
| #pwa-s2-us8 | Service Worker, modo offline y publicación | ✅ Publicada en Vercel |
| #pwa-s2-us9 | Bonus 2 | ✅ Parcial (ver abajo) |

Bonus realizado:

- Íconos Ionicons con `react-icons/io5`, los mismos que en el Sprint 1.
- Colores por categoría y total de gastos al final del listado.
- Transiciones CSS entre pantallas (desactivadas si el sistema pide reducir el movimiento).
- `touch-action: manipulation` en los elementos táctiles: elimina la espera del doble toque, los toques responden al instante.
- Lighthouse mejorado (100 en todas las categorías sobre la versión local; 96/100/100/100 sobre la URL publicada). El banner de instalación generaba un salto de layout
  (CLS 0,15) y ahora flota sobre la barra inferior. Además se corrigió el contraste de textos y colores de categoría
  y se agregó `robots.txt`.

## Capturas

### App instalada en el teléfono vs. Expo Go

| Pantalla | Expo Go (Sprint 1) | PWA instalada (Sprint 2) |
| --- | --- | --- |
| Bienvenida | <img src="docs/screenshots/telefono/expo-go-bienvenida.jpg" width="200"> | <img src="docs/screenshots/telefono/pwa-bienvenida.jpg" width="200"> |
| Listado | <img src="docs/screenshots/telefono/expo-go-listado.jpg" width="200"> | <img src="docs/screenshots/telefono/pwa-listado.jpg" width="200"> |
| Detalle | <img src="docs/screenshots/telefono/expo-go-detalle.jpg" width="200"> | <img src="docs/screenshots/telefono/pwa-detalle.jpg" width="200"> |
| Nuevo gasto | <img src="docs/screenshots/telefono/expo-go-formulario.jpg" width="200"> | <img src="docs/screenshots/telefono/pwa-formulario.jpg" width="200"> |
| Gasto registrado | <img src="docs/screenshots/telefono/expo-go-guardado.jpg" width="200"> | <img src="docs/screenshots/telefono/pwa-guardado.jpg" width="200"> |
| Ajustes | <img src="docs/screenshots/telefono/expo-go-ajustes.jpg" width="200"> | <img src="docs/screenshots/telefono/pwa-ajustes.jpg" width="200"> |

### Vista previa (navegador en tamaño de teléfono)

| Pantalla | Sprint 1 (React Native, vista web) | Sprint 2 (PWA) |
| --- | --- | --- |
| Bienvenida | <img src="docs/screenshots/sprint1/01-bienvenida.png" width="220"> | <img src="docs/screenshots/pwa/01-bienvenida.png" width="220"> |
| Listado | <img src="docs/screenshots/sprint1/02-listado.png" width="220"> | <img src="docs/screenshots/pwa/02-listado.png" width="220"> |
| Detalle | <img src="docs/screenshots/sprint1/03-detalle.png" width="220"> | <img src="docs/screenshots/pwa/03-detalle.png" width="220"> |
| Nuevo gasto | <img src="docs/screenshots/sprint1/04-formulario.png" width="220"> | <img src="docs/screenshots/pwa/04-formulario.png" width="220"> |
| Ajustes | <img src="docs/screenshots/sprint1/05-ajustes.png" width="220"> | <img src="docs/screenshots/pwa/05-ajustes.png" width="220"> |

Banner de instalación en iOS:

<img src="docs/screenshots/pwa/06-banner-ios.png" width="220">

### Lighthouse (Mobile)

![Informe de Lighthouse](docs/screenshots/lighthouse.png)

_Auditoría sobre la URL publicada (https://spring-2-programacion3.vercel.app), Lighthouse 13, modo Mobile: Performance 96, Accessibility 100, Best Practices 100, SEO 100._

## Diferencias entre ambas implementaciones

| Aspecto | React Native + Expo (Sprint 1) | PWA con React + Vite (Sprint 2) |
| --- | --- | --- |
| Cómo llega al teléfono | Expo Go (o una tienda de aplicaciones) | Una URL HTTPS; se instala desde el navegador, sin tienda |
| Elementos de la interfaz | Componentes nativos (`View`, `Text`, `FlatList`) | HTML semántico (`header`, `main`, `section`, `ul`, `article`, `dialog`) |
| Estilos | `StyleSheet` en JavaScript, sin cascada | Archivos CSS con cascada, variables, `:active`, `@media` y animaciones |
| Navegación | Pila y pestañas en memoria; se pasa el objeto por `params` | La URL es la fuente de verdad: enlaces compartibles, recarga y botón "atrás" del navegador |
| Modal | Pantalla del stack con `presentation: 'modal'` | `<dialog>` nativo + `createPortal`, animado con CSS y `::backdrop` |
| Listado | `FlatList` (virtualiza la lista) | `map()` sobre `<ul>` (renderiza todos los elementos) |
| Formulario | `TextInput` + validación manual | `<form>` con `onSubmit`, `required` y `pattern` (validación nativa del navegador) |
| Mensajes | `Alert.alert` nativo | Mensaje temporal en la interfaz (`role="status"`) |
| Áreas seguras | `SafeAreaProvider` y headers de React Navigation | `env(safe-area-inset-*)` + `viewport-fit=cover` |
| Funcionamiento offline | El código viene dentro de la app | Hace falta un Service Worker y Cache Storage |
| Identidad e instalación | `app.json` | `manifest.json` + etiquetas para iOS; en iOS la instalación es manual |
| Actualizaciones | Nueva versión desde Expo / tienda | Se publica y el Service Worker se actualiza solo en la siguiente carga |
| Acceso al dispositivo | APIs nativas amplias | Limitado a lo que permite el navegador (más restringido en iOS) |
| Colores de categoría | Originales | Un poco más oscuros para cumplir contraste 4.5:1 (Lighthouse) |
| Herramientas de depuración | Menú de desarrollo de Expo | DevTools (Application, Network) y Lighthouse |

## Trabajo en ramas

Cada User Story se desarrolló en su propia rama y se integró a `main` con un merge (`--no-ff`):

| Rama | Contenido |
| --- | --- |
| `feature/us2-estructura-proyecto` | Estructura de carpetas, rutas y datos de prueba |
| `feature/us3-instalabilidad` | Manifest, íconos, etiquetas iOS, `usePWAInstall` e `InstallBanner` |
| `feature/us4-pantalla-bienvenida` | Pantalla de bienvenida |
| `feature/us5-formulario-gastos` | Formulario en `<dialog>` (bottom sheet) |
| `feature/us6-listado-detalle` | Listado, detalle y deep linking |
| `feature/us7-navegacion` | Layout con Bottom Navigation Bar y Ajustes |
| `feature/us8-service-worker-offline` | Service Worker, offline y configuración de publicación |
| `feature/us9-bonus` | Íconos, total, transiciones y mejoras de Lighthouse |
| `docs/readme` | Este README y las capturas |

```bash
git log --oneline --graph
```
