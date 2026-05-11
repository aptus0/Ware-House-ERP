import { AppShell } from './layouts/AppShell';
import { LoginPage } from './pages/LoginPage';
import { useAuth } from './context/AuthContext';

export function App() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AppShell /> : <LoginPage />;
}
