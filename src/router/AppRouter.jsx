import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ExpenseDetailScreen from '../pages/ExpenseDetailScreen';
import ExpensesScreen from '../pages/ExpensesScreen';
import HomeScreen from '../pages/HomeScreen';
import SettingsScreen from '../pages/SettingsScreen';

// Enrutador raíz (equivale al StackNavigator del Sprint 1).
export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path="expenses" element={<ExpensesScreen />} />
        <Route path="expenses/:id" element={<ExpenseDetailScreen />} />
        <Route path="settings" element={<SettingsScreen />} />
      </Route>
    </Routes>
  );
}
