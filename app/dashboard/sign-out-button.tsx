'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();
  return <button className="signOut" onClick={async () => { await authClient.signOut(); router.push('/sign-in'); router.refresh(); }}>Sign out</button>;
}
