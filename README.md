# Palm Remit

> **Send money like sending a link.**
> Non-freezable money rails for the world's $800B remittance market — built on Solana with PUSD.

[Live demo →](https://palm-remit.vercel.app) · [Demo video →](#) · [X thread →](#)

---

## Why Palm Remit

UAE alone sends **$40B+ in remittances every year** — to India, Pakistan, the Philippines, Bangladesh, Egypt. The incumbents (Western Union, MoneyGram, banks) charge **6–8% in fees**, freeze accounts arbitrarily, and take days to settle.

Crypto stablecoins promised to fix this. They didn't, because:

- **USDC and USDT are freezable.** Issuers can — and do — block transfers and seize funds.
- **Recipients need a wallet, an exchange account, KYC,** and the technical know-how to bridge from crypto to local cash.
- **The UX is broken.** Sending crypto to a relative who has never used it is a non-starter.

**PUSD is different.** It's a USD-pegged stablecoin on Solana with **no freeze function, no blacklist, no pause**. Compliance is enforced at the permissioned mint/redeem layer only — meaning once PUSD is in circulation, it can't be stopped.

**Palm Remit makes PUSD usable by anyone.** Send a link. The recipient claims with any Solana wallet. 4 seconds, ~$0.0001 fee, no account.

---

## The thesis

> PUSD removes censorship at the token layer. Palm Remit removes friction at the user layer. Together: the first truly open, low-cost remittance rail.

---

## How it works

```
  Sender                                       Recipient
  ──────                                       ─────────
  1. Connect wallet
  2. Enter amount + memo
  3. Sign one tx that:
       • Creates ephemeral escrow keypair
       • Funds escrow with rent + fee buffer
       • Transfers PUSD into escrow ATA
  4. Receive shareable claim link
       │
       │ (shared via WhatsApp / SMS / etc.)
       ▼
  ────────────────────────────────────────►   5. Open link
                                                6. Connect any Solana wallet
                                                7. Sign claim tx — escrow co-signs
                                                   • PUSD goes to recipient
                                                   • Escrow ATA closed (rent → recipient)
                                                   • Remaining SOL → recipient
                                                8. Done. PUSD in their wallet.
```

The recipient pays **zero gas** — the sender funds the escrow with enough SOL to cover the recipient's eventual claim transaction.

### Security model

Bearer instrument. Anyone who has the link can claim. This is by design — same as a physical cash gift card or a bearer bond. Senders share links via secure channels (WhatsApp, Signal, in person). One-time use; once claimed, the link is dead.

---

## Tech stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + Framer Motion (Apple-grade UI)
- **@solana/web3.js** + **@solana/spl-token** (no custom Anchor program needed — escrow is a vanilla SPL ATA owned by an ephemeral keypair, claim secret = base58 of that keypair)
- **@solana/wallet-adapter** (Phantom, Solflare)
- Deployed on **Vercel**

### Why no Anchor program?

For this use case, an Anchor program would add complexity without any security benefit. The ephemeral-keypair-as-escrow pattern is:

1. **Stateless** — no PDA accounting, no upgrade authority risk.
2. **Composable** — works with every existing wallet, no custom IDL.
3. **Censorship-aligned** — there's no program account that can be revoked or upgraded.

This matches PUSD's "no central kill switch" ethos.

---

## Run locally

```bash
git clone https://github.com/<you>/palm-remit
cd palm-remit
npm install
cp .env.example .env.local

# Mint a mock devnet PUSD (skip if official devnet PUSD becomes available)
npm run setup-devnet
# → copy the printed NEXT_PUBLIC_PUSD_MINT into .env.local

npm run dev
```

Open `http://localhost:3000` and connect a Phantom wallet set to **devnet**.

---

## Project structure

```
src/
├── app/
│   ├── page.tsx              Landing page
│   ├── send/page.tsx         Send flow (compose → sending → success)
│   ├── claim/[secret]/       Claim flow (loading → ready → claimed)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── navbar.tsx
│   └── wallet-provider.tsx   Solana wallet adapter setup
└── lib/
    ├── constants.ts          RPC, mint, decimals, env wiring
    ├── escrow.ts             Send/claim tx builders, secret enc/dec
    ├── pusd.ts               Balance + amount helpers
    └── utils.ts              cn(), formatters
scripts/
└── setup-devnet.ts           One-shot mock PUSD deployment
```

---

## Roadmap

| Phase | Milestone |
|-------|-----------|
| **Now (hackathon)** | Devnet MVP, claim links, QR, share-to-WhatsApp |
| **Q3 2026** | Mainnet launch with official PUSD mint, Twilio SMS delivery |
| **Q4 2026** | Off-ramp partnerships in UAE → INR/PKR/PHP corridors |
| **Q1 2027** | Mobile app (React Native), recurring sends, group send |
| **Q2 2027** | Merchant API for cross-border B2B invoicing |

---

## What we're asking for

PUSD's biggest unlock isn't DeFi — it's **real people sending real money home**. Palm Remit is the simplest possible UX for that. With Palm USD's mint partners (compliant on-ramps in UAE) and Palm Remit's UX (zero-friction claim links), we can capture even **0.5% of the UAE→Asia corridor** and that's a $200M+ ARR business.

We'd love to pilot with a Palm USD-affiliated remittance partner and become the default consumer-facing UX layer for PUSD.

---

## Built for

**Palm USD × Superteam UAE — Frontier Hackathon Track.**

Friction log included in [`FRICTION_LOG.md`](./FRICTION_LOG.md).

---

## License

MIT
