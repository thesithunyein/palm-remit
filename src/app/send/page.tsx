'use client';

import { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Copy, Loader2, Wallet, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';

import { APP_URL, PUSD_MINT } from '@/lib/constants';
import { buildSendTx, encodeClaimSecret } from '@/lib/escrow';
import { getPusdBalance, toRawAmount } from '@/lib/pusd';
import { cn, formatPusd } from '@/lib/utils';

type Stage = 'compose' | 'sending' | 'success';

export default function SendPage() {
  const { connection } = useConnection();
  const { publicKey, connected, sendTransaction } = useWallet();
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [balance, setBalance] = useState(0);
  const [stage, setStage] = useState<Stage>('compose');
  const [claimUrl, setClaimUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [txSig, setTxSig] = useState('');

  useEffect(() => {
    if (!publicKey || !PUSD_MINT) return;
    let mounted = true;
    getPusdBalance(connection, publicKey, PUSD_MINT).then((b) => {
      if (mounted) setBalance(b);
    });
    return () => {
      mounted = false;
    };
  }, [publicKey, connection, stage]);

  async function handleSend() {
    if (!publicKey || !PUSD_MINT) {
      toast.error('Connect a wallet and configure PUSD mint');
      return;
    }
    const value = Number(amount);
    if (!value || value <= 0) {
      toast.error('Enter an amount');
      return;
    }
    if (value > balance) {
      toast.error('Insufficient PUSD balance');
      return;
    }

    setStage('sending');
    try {
      const { transaction, escrow } = await buildSendTx({
        connection,
        sender: publicKey,
        mint: PUSD_MINT,
        amount: toRawAmount(value),
      });

      // Escrow doesn't sign the send tx — it only receives funds.
      // Sender's wallet is the sole signer.
      const sig = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(sig, 'confirmed');

      const secret = encodeClaimSecret(escrow);
      // Memo is encoded into the URL hash so it stays client-side only —
      // never hits server logs or analytics. Hash is base64url'd to avoid
      // breaking the URL with spaces or special characters.
      const memoHash = memo.trim()
        ? `#m=${btoa(unescape(encodeURIComponent(memo.trim())))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '')}`
        : '';
      const url = `${APP_URL}/claim/${secret}${memoHash}`;
      setClaimUrl(url);
      setTxSig(sig);
      setStage('success');
      toast.success('Sent! Share the link to claim.');
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || 'Transaction failed');
      setStage('compose');
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(claimUrl);
    setCopied(true);
    toast.success('Link copied');
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl flex-col px-6 pt-12 pb-24 sm:pt-20">
      <AnimatePresence mode="wait">
        {stage === 'compose' && (
          <motion.div
            key="compose"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-[44px] font-semibold leading-tight tracking-tighter sm:text-[56px]">
              Send PUSD
            </h1>
            <p className="mt-3 text-[16px] text-white/55">
              Create a one-time claim link. Anyone with the link can claim once.
            </p>

            <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] backdrop-blur-2xl">
              {/* Amount */}
              <div className="border-b border-white/5 p-8">
                <div className="text-[12px] uppercase tracking-wider text-white/40">
                  Amount
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-semibold tracking-tightest text-white/30">
                    $
                  </span>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-transparent font-display text-6xl font-semibold tracking-tightest text-white outline-none placeholder:text-white/20"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[13px] text-white/40">PUSD</span>
                  <button
                    onClick={() => setAmount(String(balance))}
                    disabled={!connected}
                    className="text-[13px] text-palm-400 transition hover:text-palm-300 disabled:opacity-40"
                  >
                    Balance: {formatPusd(balance)} · Max
                  </button>
                </div>
              </div>

              {/* Memo */}
              <div className="p-8">
                <div className="text-[12px] uppercase tracking-wider text-white/40">
                  Memo (optional)
                </div>
                <input
                  type="text"
                  placeholder="For mom · groceries"
                  maxLength={80}
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="mt-3 w-full bg-transparent text-[16px] text-white outline-none placeholder:text-white/30"
                />
              </div>
            </div>

            {/* Action */}
            <div className="mt-8">
              {!connected ? (
                <ConnectPrompt />
              ) : (
                <button
                  onClick={handleSend}
                  disabled={!amount || Number(amount) <= 0}
                  className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white text-[15px] font-semibold text-black transition hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/40"
                >
                  Create claim link
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </button>
              )}

              <div className="mt-4 flex items-center justify-center gap-2 text-[12px] text-white/40">
                <span>Network fee ~$0.0001</span>
                <span>·</span>
                <span>Settles in ~4 seconds</span>
              </div>
            </div>
          </motion.div>
        )}

        {stage === 'sending' && (
          <motion.div
            key="sending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[60vh] flex-col items-center justify-center text-center"
          >
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-palm-500/30" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-palm-500/20">
                <Loader2 className="h-7 w-7 animate-spin text-palm-300" />
              </div>
            </div>
            <h2 className="mt-8 font-display text-3xl font-semibold tracking-tight">
              Locking {formatPusd(Number(amount))} in escrow…
            </h2>
            <p className="mt-3 text-[15px] text-white/50">
              Confirming on Solana
            </p>
          </motion.div>
        )}

        {stage === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-palm-500/20 ring-4 ring-palm-500/10"
              >
                <Check className="h-7 w-7 text-palm-300" strokeWidth={3} />
              </motion.div>

              <h2 className="mt-8 font-display text-4xl font-semibold tracking-tighter">
                {formatPusd(Number(amount))} ready to claim
              </h2>
              <p className="mt-3 max-w-md text-[15px] text-white/55">
                Share this link with the recipient. They can claim from any
                Solana wallet.
              </p>
            </div>

            {/* QR + Link card */}
            <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8">
              <div className="flex justify-center rounded-2xl bg-white p-6">
                <QRCodeSVG value={claimUrl} size={180} level="M" />
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-4">
                <LinkIcon className="h-4 w-4 shrink-0 text-white/50" />
                <div className="truncate font-mono text-[12px] text-white/70">
                  {claimUrl}
                </div>
                <button
                  onClick={copyLink}
                  className="ml-auto flex h-8 shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 text-[12px] font-medium text-white transition hover:bg-white/15"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </>
                  )}
                </button>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <ShareButton
                  label="WhatsApp"
                  href={`https://wa.me/?text=${encodeURIComponent(`I sent you ${formatPusd(Number(amount))} via Palm Remit. Claim here: ${claimUrl}`)}`}
                />
                <ShareButton
                  label="SMS"
                  href={`sms:?body=${encodeURIComponent(`Palm Remit: claim ${formatPusd(Number(amount))} → ${claimUrl}`)}`}
                />
                <ShareButton
                  label="Email"
                  href={`mailto:?subject=${encodeURIComponent('Palm Remit')}&body=${encodeURIComponent(`Claim ${formatPusd(Number(amount))}: ${claimUrl}`)}`}
                />
              </div>
            </div>

            {txSig && (
              <a
                href={`https://explorer.solana.com/tx/${txSig}?cluster=devnet`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex items-center justify-center gap-2 text-[13px] text-white/40 transition hover:text-white/70"
              >
                View on Solana Explorer →
              </a>
            )}

            <button
              onClick={() => {
                setStage('compose');
                setAmount('');
                setMemo('');
                setClaimUrl('');
              }}
              className="mt-8 w-full rounded-2xl border border-white/10 bg-white/5 py-4 text-[14px] font-medium text-white transition hover:bg-white/10"
            >
              Send another
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!PUSD_MINT && (
        <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-[13px] text-amber-200/80">
          <strong>Setup required:</strong> Set NEXT_PUBLIC_PUSD_MINT in your
          .env.local. Run <code className="rounded bg-black/30 px-1.5 py-0.5">npm run setup-devnet</code> to mint a devnet PUSD.
        </div>
      )}
    </div>
  );
}

function ConnectPrompt() {
  return (
    <div className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] text-[14px] text-white/50">
      <Wallet className="h-4 w-4" />
      Connect a wallet to continue
    </div>
  );
}

function ShareButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[13px] font-medium text-white/80 transition',
        'hover:border-white/20 hover:bg-white/[0.06] hover:text-white'
      )}
    >
      {label}
    </a>
  );
}
