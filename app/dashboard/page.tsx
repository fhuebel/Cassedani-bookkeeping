import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import SignOutButton from './sign-out-button';
import './dashboard.css';

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/sign-in');

  const [clients, invoices, transactions] = await Promise.all([
    prisma.client.count(),
    prisma.invoice.count(),
    prisma.transaction.count(),
  ]);

  return (
    <main className="secureDashboard">
      <header className="secureHeader">
        <a href="/" className="secureBrand"><span>C</span><div><b>Cassedani Corp</b><small>PRIVATE OWNER PORTAL</small></div></a>
        <div className="secureUser"><span>{session.user.name}</span><SignOutButton /></div>
      </header>
      <section className="secureWelcome">
        <span>PRIVATE DASHBOARD</span>
        <h1>Welcome back, {session.user.name}.</h1>
        <p>Your account is authenticated. This dashboard is now protected and ready for the bookkeeping data layer.</p>
      </section>
      <section className="secureCards">
        <article><small>CLIENTS</small><strong>{clients}</strong><p>Client records</p></article>
        <article><small>TRANSACTIONS</small><strong>{transactions}</strong><p>Bookkeeping entries</p></article>
        <article><small>INVOICES</small><strong>{invoices}</strong><p>Invoice records</p></article>
      </section>
      <section className="securePanel">
        <div><span>AUTHENTICATION</span><h2>Your private area is active.</h2><p>Sign-in sessions are stored in the database, and this page verifies the current session on the server before showing bookkeeping information.</p></div>
        <a href="/">Back to public website →</a>
      </section>
    </main>
  );
}
