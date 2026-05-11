import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';
import { tokenStorage } from '../lib/tokenStorage';
import { User } from '../types';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = tokenStorage.get();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get<{ user: User }>('/me');
        setUser(response.data.user);
      } catch {
        tokenStorage.clear();
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function login(email: string, password: string) {
    const response = await api.post<{ token: string; user: User }>('/login', { email, password });
    tokenStorage.set(response.data.token);
    setUser(response.data.user);
  }

  async function logout() {
    try {
      await api.post('/logout');
    } finally {
      tokenStorage.clear();
      setUser(null);
    }
  }

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return value;
}
