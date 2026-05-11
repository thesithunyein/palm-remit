'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Leaf } from 'lucide-react';

const WalletButton = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-palm-400 to-palm-600 shadow-lg shadow-palm-500/20">
            <Leaf className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-white">
            Palm Remit
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/send"
            className="text-[14px] text-white/60 transition hover:text-white"
          >
            Send
          </Link>
          <Link
            href="/#how"
            className="text-[14px] text-white/60 transition hover:text-white"
          >
            How it works
          </Link>
          <Link
            href="/#why"
            className="text-[14px] text-white/60 transition hover:text-white"
          >
            Why PUSD
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <WalletButton
            style={{
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '10px',
              height: '36px',
              padding: '0 14px',
              fontSize: '13px',
              fontWeight: 600,
              lineHeight: '36px',
            }}
          />
        </div>
      </div>
    </header>
  );
}
