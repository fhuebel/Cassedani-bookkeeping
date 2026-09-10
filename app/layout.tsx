import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cassedani Corp | Bookkeeping & Taxes',
  description: 'Bookkeeping and tax management dashboard for Cassedani Corp.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
