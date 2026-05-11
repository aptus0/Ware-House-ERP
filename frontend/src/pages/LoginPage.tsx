import { FormEvent, useState } from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const { signIn, isLoading } = useAuth();
  const [email, setEmail] = useState('admin@warehousepro.local');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    try {
      await signIn(email.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Giriş yapılamadı.');
    }
  }

  return (
    <main className="login-page">
      <section className="login-hero">
        <div className="login-hero__content">
          <BrandLogo />
          <h1>Depo operasyonlarını tek kurumsal panelde yönetin.</h1>
          <p>Stok, transfer, satın alma, sayım ve audit log süreçleri için güvenli ERP arayüzü.</p>
          <div className="login-features">
            <span><Icon name="shield" /> Sanctum uyumlu auth</span>
            <span><Icon name="activity" /> Canlı stok takip paneli</span>
            <span><Icon name="report" /> Yönetici raporları</span>
          </div>
        </div>
      </section>
      <section className="login-card" aria-label="Giriş formu">
        <div className="login-card__header">
          <BrandLogo compact />
          <div>
            <h2>Hoş geldiniz</h2>
            <p>WarehousePro ERP hesabınızla devam edin.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            E-posta
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
          </label>
          <label>
            Şifre
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required minLength={6} />
          </label>
          {error && <div className="form-error">{error}</div>}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Giriş yapılıyor...' : 'Güvenli Giriş Yap'}
          </Button>
        </form>
        <div className="demo-accounts">
          <strong>Demo hesaplar</strong>
          <span>admin@warehousepro.local / password</span>
          <span>manager@warehousepro.local / password</span>
          <span>operator@warehousepro.local / password</span>
        </div>
      </section>
    </main>
  );
}
