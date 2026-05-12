'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Wallet, LogOut, Copy, Check } from 'lucide-react';

export function WalletButton() {
  const { publicKey, connected, connecting, disconnect, wallet } = useWallet();
  const { setVisible } = useWalletModal();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className="inline-flex h-9 items-center gap-2 rounded-[10px] bg-white px-4 text-[13px] font-semibold text-black"
        disabled
      >
        <Wallet className="h-3.5 w-3.5" />
        Select Wallet
      </button>
    );
  }

  if (!connected || !publicKey) {
    return (
      <button
        onClick={() => setVisible(true)}
        disabled={connecting}
        className="inline-flex h-9 items-center gap-2 rounded-[10px] bg-white px-4 text-[13px] font-semibold text-black transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
      >
        <Wallet className="h-3.5 w-3.5" />
        {connecting ? 'Connecting…' : 'Select Wallet'}
      </button>
    );
  }

  const addr = publicKey.toBase58();
  const short = `${addr.slice(0, 4)}…${addr.slice(-4)}`;

  const copy = async () => {
    await navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.06] px-3.5 text-[13px] font-semibold text-white backdrop-blur-xl transition hover:bg-white/[0.1]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-palm-400 shadow-[0_0_8px_rgba(74,222,128,0.7)]" />
        {wallet?.adapter.name ?? 'Wallet'} · {short}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-11 z-50 w-56 overflow-hidden rounded-xl border border-white/10 bg-black/90 p-1 shadow-2xl backdrop-blur-xl">
            <button
              onClick={copy}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] text-white/80 hover:bg-white/5"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-palm-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? 'Copied' : 'Copy address'}
            </button>
            <button
              onClick={() => {
                setOpen(false);
                disconnect();
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] text-white/80 hover:bg-white/5"
            >
              <LogOut className="h-3.5 w-3.5" />
              Disconnect
            </button>
          </div>
        </>
      )}
    </div>
  );
}
