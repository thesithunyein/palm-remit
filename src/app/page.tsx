'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Lock,
  Zap,
  Globe,
  ShieldCheck,
  Send,
  Link as LinkIcon,
  Check,
  X,
  Github,
  Twitter,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-32 sm:pt-32 sm:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] font-medium text-white/70 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-palm-400 shadow-[0_0_10px_rgba(74,222,128,0.6)]" />
            Live on Solana devnet · Built for Palm USD
          </div>

          <h1 className="font-display text-[56px] font-semibold leading-[1.02] tracking-tightest text-white sm:text-[88px]">
            Send money like
            <br />
            <span className="bg-gradient-to-r from-palm-300 via-palm-400 to-palm-200 bg-clip-text text-transparent">
              sending a link.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-[18px] leading-relaxed text-white/60 sm:text-[20px]">
            Palm Remit lets you send PUSD to anyone, anywhere — no account, no
            phone number on file, no waiting. Non-freezable money rails for
            the world's $800B remittance market.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/send"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-black transition hover:scale-[1.02] hover:bg-white/90 active:scale-[0.98]"
            >
              Send PUSD
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#how"
              className="inline-flex h-12 items-center rounded-full border border-white/15 bg-white/5 px-6 text-[15px] font-medium text-white backdrop-blur-xl transition hover:bg-white/10"
            >
              How it works
            </a>
          </div>
        </motion.div>

        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-24 max-w-3xl"
        >
          <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-palm-500/30 via-cyan-500/20 to-palm-500/30 opacity-60 blur-2xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-1 backdrop-blur-2xl">
            <div className="rounded-[24px] bg-black/40 p-8 sm:p-12">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <div className="text-[12px] uppercase tracking-wider text-white/40">
                    Send
                  </div>
                  <div className="font-display text-5xl font-semibold tracking-tighter text-white">
                    $500.00
                  </div>
                  <div className="text-[13px] text-white/50">PUSD · Solana</div>
                </div>
                <div className="flex flex-col gap-2 sm:items-end">
                  <div className="text-[12px] uppercase tracking-wider text-white/40">
                    Fee
                  </div>
                  <div className="font-display text-5xl font-semibold tracking-tighter text-palm-400">
                    $0.0001
                  </div>
                  <div className="text-[13px] text-white/50">Settles in 4s</div>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <LinkIcon className="h-4 w-4 text-white/50" />
                <div className="truncate font-mono text-[13px] text-white/60">
                  palm.so/claim/8gT…fK2nQ
                </div>
                <div className="ml-auto rounded-full bg-palm-500/20 px-2.5 py-1 text-[11px] font-semibold text-palm-300">
                  Ready to claim
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Why PUSD */}
      <section id="why" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 text-center">
          <div className="text-[13px] font-semibold uppercase tracking-widest text-palm-400">
            Why PUSD
          </div>
          <h2 className="mt-4 font-display text-[44px] font-semibold leading-tight tracking-tighter sm:text-[56px]">
            Money that can't be stopped.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] text-white/55">
            Migrant workers send $800B home each year. Western Union charges
            6–8%. Banks freeze accounts arbitrarily. PUSD changes that.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Non-freezable"
            description="No freeze authority. No blacklist. No pause. Compliance lives at the mint/redeem layer, not in your wallet."
          />
          <FeatureCard
            icon={<Zap className="h-5 w-5" />}
            title="4-second settlement"
            description="Solana finality. Faster than a card swipe, cheaper than a stamp. $0.0001 per transfer."
          />
          <FeatureCard
            icon={<Globe className="h-5 w-5" />}
            title="No account needed"
            description="Recipient just needs a link and a wallet. No KYC for the receiver, no bank, no waiting."
          />
        </div>
      </section>

      {/* How */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 text-center">
          <div className="text-[13px] font-semibold uppercase tracking-widest text-palm-400">
            How it works
          </div>
          <h2 className="mt-4 font-display text-[44px] font-semibold leading-tight tracking-tighter sm:text-[56px]">
            Three steps. Done.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Step
            n="01"
            icon={<Send className="h-5 w-5" />}
            title="Connect & send"
            description="Connect your Solana wallet, enter an amount in PUSD."
          />
          <Step
            n="02"
            icon={<LinkIcon className="h-5 w-5" />}
            title="Share the link"
            description="Palm Remit creates a one-time claim link. Send it via WhatsApp, SMS, anywhere."
          />
          <Step
            n="03"
            icon={<Lock className="h-5 w-5" />}
            title="Recipient claims"
            description="They open the link, connect a wallet, and the PUSD is theirs. Forever."
          />
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-palm-950/40 via-black to-black p-12 sm:p-20">
          <div className="grid gap-12 sm:grid-cols-3">
            <Stat value="$800B" label="Annual remittance market" />
            <Stat value="$40B" label="Sent from UAE alone" />
            <Stat value="6–8%" label="What incumbents charge. We charge ~0%" />
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 text-center">
          <div className="text-[13px] font-semibold uppercase tracking-widest text-palm-400">
            How we compare
          </div>
          <h2 className="mt-4 font-display text-[44px] font-semibold leading-tight tracking-tighter sm:text-[56px]">
            Same money. Different rails.
          </h2>
        </div>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
          <div className="grid grid-cols-5 gap-px bg-white/5 text-[13px] sm:text-[14px]">
            {/* header row */}
            <div className="bg-black p-4 sm:p-6 text-white/40 uppercase tracking-wider text-[11px]">
              Provider
            </div>
            <div className="bg-black p-4 sm:p-6 text-white/40 uppercase tracking-wider text-[11px] text-center">
              Fee
            </div>
            <div className="bg-black p-4 sm:p-6 text-white/40 uppercase tracking-wider text-[11px] text-center">
              Settles in
            </div>
            <div className="bg-black p-4 sm:p-6 text-white/40 uppercase tracking-wider text-[11px] text-center">
              Receiver KYC
            </div>
            <div className="bg-black p-4 sm:p-6 text-white/40 uppercase tracking-wider text-[11px] text-center">
              Censor-proof
            </div>

            <CompareRow name="Western Union" fee="6–8%" time="1–5 days" kyc={true} censor={false} />
            <CompareRow name="Banks (SWIFT)" fee="3–6%" time="2–3 days" kyc={true} censor={false} />
            <CompareRow name="Wise" fee="0.5–1.5%" time="minutes–hours" kyc={true} censor={false} />
            <CompareRow name="USDC over Solana" fee="~$0" time="seconds" kyc={true} censor={false} />
            <CompareRow
              name="Palm Remit"
              fee="~$0"
              time="4 seconds"
              kyc={false}
              censor={true}
              highlight
            />
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-widest text-palm-400">
              Architecture
            </div>
            <h2 className="mt-4 font-display text-[44px] font-semibold leading-tight tracking-tighter sm:text-[56px]">
              No program.
              <br />
              No kill switch.
            </h2>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/55">
              We don't deploy an Anchor program. Each send mints a fresh
              ephemeral keypair whose only job is to hold PUSD until claimed.
              The claim secret is the keypair's private key, base58-encoded.
            </p>
            <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-white/55">
              No PDA. No upgrade authority. No admin function. The escrow even
              pays its own claim fee — recipients never need SOL.
            </p>
            <p className="mt-4 max-w-lg text-[15px] italic leading-relaxed text-palm-300/70">
              The only architecture aligned with PUSD's "no central authority"
              ethos.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-palm-500/30 via-transparent to-cyan-500/20 opacity-50 blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/40 p-8 backdrop-blur-2xl">
              <ArchNode label="Sender wallet" sub="Signs send tx" tone="white" />
              <ArchArrow label="1 transfer + create ATA" />
              <ArchNode
                label="Ephemeral escrow"
                sub="Per-send keypair · Holds PUSD"
                tone="palm"
              />
              <ArchArrow label="Claim link = base58(secretKey)" />
              <ArchNode
                label="Recipient wallet"
                sub="Receives PUSD · Pays $0 gas"
                tone="white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-32 text-center">
        <h2 className="font-display text-[56px] font-semibold leading-[1.05] tracking-tightest sm:text-[88px]">
          Send your first
          <br />
          <span className="bg-gradient-to-r from-palm-300 to-palm-500 bg-clip-text text-transparent">
            $1 today.
          </span>
        </h2>
        <div className="mt-10">
          <Link
            href="/send"
            className="group inline-flex h-14 items-center gap-2 rounded-full bg-white px-8 text-[16px] font-semibold text-black transition hover:scale-[1.02] active:scale-[0.98]"
          >
            Open Palm Remit
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="text-[13px] text-white/40">
            Palm Remit · Built for the Palm USD × Superteam UAE Hackathon
          </div>
          <div className="flex items-center gap-5 text-[13px] text-white/40">
            <a
              href="https://github.com/thesithunyein/palm-remit"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
            <a
              href="https://twitter.com/thesithunyein"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              <Twitter className="h-3.5 w-3.5" /> Twitter
            </a>
            <Link href="/send" className="hover:text-white">
              Try it
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CompareRow({
  name,
  fee,
  time,
  kyc,
  censor,
  highlight,
}: {
  name: string;
  fee: string;
  time: string;
  kyc: boolean;
  censor: boolean;
  highlight?: boolean;
}) {
  const cellBase = highlight
    ? 'bg-gradient-to-r from-palm-500/10 to-palm-500/5'
    : 'bg-black/40';
  const text = highlight ? 'text-white' : 'text-white/70';
  return (
    <>
      <div className={`${cellBase} p-4 sm:p-6 font-semibold ${text}`}>
        {highlight && (
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-palm-400" />
        )}
        {name}
      </div>
      <div className={`${cellBase} p-4 sm:p-6 text-center ${text}`}>{fee}</div>
      <div className={`${cellBase} p-4 sm:p-6 text-center ${text}`}>{time}</div>
      <div className={`${cellBase} p-4 sm:p-6 text-center`}>
        {kyc ? (
          <X className="mx-auto h-4 w-4 text-red-400/80" />
        ) : (
          <Check className="mx-auto h-4 w-4 text-palm-400" />
        )}
      </div>
      <div className={`${cellBase} p-4 sm:p-6 text-center`}>
        {censor ? (
          <Check className="mx-auto h-4 w-4 text-palm-400" />
        ) : (
          <X className="mx-auto h-4 w-4 text-red-400/80" />
        )}
      </div>
    </>
  );
}

function ArchNode({
  label,
  sub,
  tone,
}: {
  label: string;
  sub: string;
  tone: 'white' | 'palm';
}) {
  const accent =
    tone === 'palm'
      ? 'border-palm-400/40 bg-palm-500/10'
      : 'border-white/15 bg-white/5';
  return (
    <div
      className={`rounded-2xl border ${accent} px-5 py-4 backdrop-blur-xl`}
    >
      <div className="text-[15px] font-semibold tracking-tight text-white">
        {label}
      </div>
      <div className="mt-1 text-[12px] text-white/50">{sub}</div>
    </div>
  );
}

function ArchArrow({ label }: { label: string }) {
  return (
    <div className="my-2 flex items-center gap-3 px-2">
      <div className="h-6 w-px bg-gradient-to-b from-white/30 to-white/5" />
      <div className="text-[11px] uppercase tracking-widest text-white/40">
        {label}
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 transition hover:border-white/20">
      <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-palm-300">
        {icon}
      </div>
      <h3 className="mb-2 text-[17px] font-semibold tracking-tight">{title}</h3>
      <p className="text-[14px] leading-relaxed text-white/55">{description}</p>
    </div>
  );
}

function Step({
  n,
  icon,
  title,
  description,
}: {
  n: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition hover:border-white/20">
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-[13px] text-white/30">{n}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-palm-500/10 text-palm-300">
          {icon}
        </div>
      </div>
      <h3 className="mb-2 text-[17px] font-semibold tracking-tight">{title}</h3>
      <p className="text-[14px] leading-relaxed text-white/55">{description}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-[64px] font-semibold tracking-tightest text-white sm:text-[80px]">
        {value}
      </div>
      <div className="mt-2 text-[14px] text-white/50">{label}</div>
    </div>
  );
}
