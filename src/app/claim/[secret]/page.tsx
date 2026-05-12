'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, ShieldCheck, Wallet, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

import { PUSD_DECIMALS, PUSD_MINT } from '@/lib/constants';
import {
  buildClaimTx,
  decodeClaimSecret,
  readEscrow,
} from '@/lib/escrow';
import { formatPusd } from '@/lib/utils';

type Stage = 'loading' | 'ready' | 'claiming' | 'claimed' | 'empty' | 'error';

export default function ClaimPage() {
  const params = useParams<{ secret: string }>();
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [stage, setStage] = useState<Stage>('loading');
  const [amount, setAmount] = useState(0);
  const [escrow, setEscrow] = useState<Keypair | null>(null);
  const [error, setError] = useState('');
  const [txSig, setTxSig] = useState('');
  const [memo, setMemo] = useState('');

  // Decode the optional memo from URL hash (client-side only, never sent
  // to the server). Hash format: #m=<base64url>.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    const match = hash.match(/[#&]m=([^&]+)/);
    if (!match) return;
    try {
      const b64 = match[1].replace(/-/g, '+').replace(/_/g, '/');
      const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
      const decoded = decodeURIComponent(escape(atob(padded)));
      if (decoded) setMemo(decoded.slice(0, 80));
    } catch {
      // Bad encoding — silently ignore.
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!params?.secret || !PUSD_MINT) {
        setStage('error');
        setError('Missing claim secret or PUSD mint not configured');
        return;
      }
      try {
        const kp = decodeClaimSecret(params.secret);
        if (!mounted) return;
        setEscrow(kp);
        const snap = await readEscrow(connection, kp.publicKey, PUSD_MINT);
        if (!mounted) return;
        if (!snap.exists || snap.amount === 0n) {
          setStage('empty');
          return;
        }
        setAmount(Number(snap.amount) / 10 ** snap.decimals);
        setStage('ready');
      } catch (e: any) {
        setError(e?.message || 'Invalid claim link');
        setStage('error');
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [params?.secret, connection]);

  async function handleClaim() {
    if (!publicKey || !escrow || !PUSD_MINT) return;
    setStage('claiming');
    try {
      const tx = await buildClaimTx({
        connection,
        escrow,
        recipient: publicKey,
        mint: PUSD_MINT,
      });
      // Escrow has fully signed and pays its own fee.
      // Submit raw — recipient never has to sign or hold SOL.
      const sig = await connection.sendRawTransaction(tx.serialize(), {
        skipPreflight: false,
        preflightCommitment: 'confirmed',
      });
      await connection.confirmTransaction(sig, 'confirmed');
      setTxSig(sig);
      setStage('claimed');
      toast.success(`Claimed ${formatPusd(amount)}`);
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || 'Claim failed');
      setStage('ready');
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl flex-col px-6 pt-12 pb-24 sm:pt-20">
      <AnimatePresence mode="wait">
        {stage === 'loading' && (
          <Center key="loading">
            <Loader2 className="h-7 w-7 animate-spin text-white/40" />
            <p className="mt-4 text-[14px] text-white/50">Loading claim…</p>
          </Center>
        )}

        {stage === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] font-medium text-white/60">
              You've received PUSD
            </div>
            <h1 className="mt-6 font-display text-[80px] font-semibold leading-none tracking-tightest sm:text-[120px]">
              {formatPusd(amount)}
            </h1>
            <p className="mt-4 text-[16px] text-white/55">
              Sent via Palm Remit · Solana
            </p>

            {memo && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="mt-8 max-w-md rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left backdrop-blur-xl"
              >
                <div className="text-[11px] font-semibold uppercase tracking-widest text-palm-400">
                  Note from sender
                </div>
                <div className="mt-1.5 text-[15px] leading-snug text-white/85">
                  “{memo}”
                </div>
              </motion.div>
            )}

            <div className="mt-16 w-full max-w-md">
              {!connected ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="text-[14px] text-white/50">
                    Connect a Solana wallet to claim
                  </div>
                  <ConnectInline />
                </div>
              ) : (
                <button
                  onClick={handleClaim}
                  className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white text-[15px] font-semibold text-black transition hover:scale-[1.01] active:scale-[0.99]"
                >
                  Claim {formatPusd(amount)}
                  <Check className="h-4 w-4" strokeWidth={3} />
                </button>
              )}
            </div>

            <div className="mt-8 flex items-center gap-2 text-[12px] text-white/40">
              <ShieldCheck className="h-3.5 w-3.5" />
              Non-custodial · You receive directly to your wallet
            </div>
          </motion.div>
        )}

        {stage === 'claiming' && (
          <Center key="claiming">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-palm-500/30" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-palm-500/20">
                <Loader2 className="h-7 w-7 animate-spin text-palm-300" />
              </div>
            </div>
            <h2 className="mt-8 font-display text-3xl font-semibold tracking-tight">
              Claiming…
            </h2>
          </Center>
        )}

        {stage === 'claimed' && (
          <motion.div
            key="claimed"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-palm-500/20 ring-4 ring-palm-500/10"
            >
              <Check className="h-9 w-9 text-palm-300" strokeWidth={3} />
            </motion.div>
            <h2 className="mt-8 font-display text-5xl font-semibold tracking-tightest">
              {formatPusd(amount)} received
            </h2>
            <p className="mt-3 text-[15px] text-white/55">
              The PUSD is now in your wallet.
            </p>
            {txSig && (
              <a
                href={`https://explorer.solana.com/tx/${txSig}?cluster=devnet`}
                target="_blank"
                rel="noreferrer"
                className="mt-8 text-[13px] text-white/40 transition hover:text-white/70"
              >
                View on Solana Explorer →
              </a>
            )}
            <a
              href="/"
              className="mt-8 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-[14px] font-medium text-white transition hover:bg-white/10"
            >
              Send your own
            </a>
          </motion.div>
        )}

        {stage === 'empty' && (
          <Center key="empty">
            <AlertCircle className="h-10 w-10 text-white/30" />
            <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight">
              Already claimed
            </h2>
            <p className="mt-3 max-w-sm text-center text-[14px] text-white/50">
              This claim link has already been used or has expired.
            </p>
          </Center>
        )}

        {stage === 'error' && (
          <Center key="error">
            <AlertCircle className="h-10 w-10 text-red-400/60" />
            <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight">
              Invalid link
            </h2>
            <p className="mt-3 max-w-sm text-center text-[14px] text-white/50">
              {error}
            </p>
          </Center>
        )}
      </AnimatePresence>
    </div>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[60vh] flex-col items-center justify-center"
    >
      {children}
    </motion.div>
  );
}

function ConnectInline() {
  return (
    <div className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 text-[14px] text-white/70">
      <Wallet className="h-4 w-4" />
      Use the Connect Wallet button at the top
    </div>
  );
}
