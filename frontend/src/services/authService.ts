import { demoUsers } from '../data/mockData';
import type { User } from '../types/domain';
import { request } from './httpClient';

const ENABLE_MOCK = import.meta.env.VITE_ENABLE_MOCK !== 'false';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  if (ENABLE_MOCK) {
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    const user = demoUsers.find((item) => item.email === payload.email) ?? demoUsers[0];
    if (payload.password.length < 6) {
      throw new Error('Şifre en az 6 karakter olmalıdır.');
    }
    return { user, token: `mock-token-${user.id}` };
  }

  return request<AuthResponse>('/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function logout(): Promise<void> {
  if (!ENABLE_MOCK) {
    await request('/logout', { method: 'POST' });
  }
}
