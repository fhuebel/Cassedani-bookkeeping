'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import '../sign-in/auth.css';

export default function SetupPage() {
  const router = useRouter();
  const [name, setName] = useState('Cassedani Corp');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);
    const result = await authClient.signUp.email({ name, email, password, callbackURL: '/dashboard' });
    setLoading(false);
    if (result.error) {
      setError(result.error.message || 'Account creation is disabled. Temporarily set AUTH_DISABLE_SIGNUP=false.');
      return;
    }
    router.push('/dashboard');
    router.refresh();
  }

  return (
    <main className="authShell">
      <section className="authCard">
        <a className="authBrand" href="/"><span className="authLogo">C</span><span><b>Cassedani Corp</b><small>BOOKKEEPING & TAXES</small></span></a>
        <div className="authIntro"><span>FIRST OWNER ACCOUNT</span><h1>Set up access.</h1><p>Create the owner account once. After setup, turn AUTH_DISABLE_SIGNUP back to true.</p></div>
        <form onSubmit={submit} className="authForm">
          <label>Name<input required value={name} onChange={e => setName(e.target.value)} /></label>
          <label>Email address<input required type="email" value={email} onChange={e => setEmail(e.target.value)} /></label>
          <label>Password<input required minLength={10} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 10 characters" /></label>
          {error && <p className="authError">{error}</p>}
          <button type="submit" disabled={loading}>{loading ? 'Creating account…' : 'Create owner account →'}</button>
        </form>
        <p className="authFoot"><a href="/sign-in">Already have an account? Sign in</a></p>
      </section>
    </main>
  );
}
