import type { Metadata } from 'next';
import './globals.css';
import { SolanaProvider } from '@/components/wallet-provider';
import { Navbar } from '@/components/navbar';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  metadataBase: new URL('https://palm-remit.vercel.app'),
  title: 'Palm Remit — Send PUSD like sending a link',
  description:
    'Non-freezable money rails for the world. Send PUSD with a link, claim in seconds. Built on Solana for the Palm USD × Superteam UAE Hackathon.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Palm Remit — Send PUSD like sending a link',
    description:
      'Non-freezable money rails. Send PUSD with a link, claim in seconds.',
    type: 'website',
    url: 'https://palm-remit.vercel.app',
    siteName: 'Palm Remit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Palm Remit — Send PUSD like sending a link',
    description:
      'Non-freezable money rails. 4 seconds, ~$0.0001 fee. Built on Solana.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="noise relative min-h-screen bg-black font-sans text-white antialiased">
        <div className="aurora" aria-hidden />
        <SolanaProvider>
          <div className="relative z-10">
            <Navbar />
            <main>{children}</main>
          </div>
        </SolanaProvider>
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(20,20,20,0.9)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              color: '#fff',
              borderRadius: '14px',
            },
          }}
        />
      </body>
    </html>
  );
}
