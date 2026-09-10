'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import './auth.css';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);
    const result = await authClient.signIn.email({
      email,
      password,
      callbackURL: '/dashboard',
      rememberMe: true,
    });
    setLoading(false);
    if (result.error) {
      setError(result.error.message || 'Unable to sign in. Check your email and password.');
      return;
    }
    router.push('/dashboard');
    router.refresh();
  }

  return (
    <main className="authShell">
      <section className="authCard">
        <a className="authBrand" href="/">
          <span className="authLogo">C</span>
          <span><b>Cassedani Corp</b><small>BOOKKEEPING & TAXES</small></span>
        </a>
        <div className="authIntro">
          <span>OWNER PORTAL</span>
          <h1>Welcome back.</h1>
          <p>Sign in to access your private bookkeeping dashboard.</p>
        </div>
        <form onSubmit={submit} className="authForm">
          <label>Email address<input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></label>
          <label>Password<input required type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" /></label>
          {error && <p className="authError">{error}</p>}
          <button type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in →'}</button>
        </form>
        <p className="authFoot"><a href="/">← Back to Cassedani Corp</a></p>
      </section>
    </main>
  );
}
