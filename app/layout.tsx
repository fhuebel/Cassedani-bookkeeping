import './globals.css';
import './public.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cassedani Corp | Bookkeeping & Taxes',
  description: 'Professional bookkeeping, tax preparation, and business support from Cassedani Corp.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
