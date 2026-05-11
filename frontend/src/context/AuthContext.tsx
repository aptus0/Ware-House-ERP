import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/domain';
import * as authService from '../services/authService';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStoredUser(): User | null {
  const raw = localStorage.getItem('warehousepro_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    localStorage.removeItem('warehousepro_user');
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readStoredUser());
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    async signIn(email: string, password: string) {
      setIsLoading(true);
      try {
        const response = await authService.login({ email, password });
        localStorage.setItem('warehousepro_token', response.token);
        localStorage.setItem('warehousepro_user', JSON.stringify(response.user));
        setUser(response.user);
      } finally {
        setIsLoading(false);
      }
    },
    async signOut() {
      setIsLoading(true);
      try {
        await authService.logout();
      } finally {
        localStorage.removeItem('warehousepro_token');
        localStorage.removeItem('warehousepro_user');
        setUser(null);
        setIsLoading(false);
      }
    },
  }), [isLoading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
