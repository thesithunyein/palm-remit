<div align="center">
  <img src="public/favicon.svg" width="72" height="72" alt="Palm Remit" />

  <h1>Palm Remit</h1>

  <p><strong>Send money like sending a link.</strong></p>
  <p>Non-freezable remittance rails on Solana. Built natively for <a href="https://palmusd.com">PUSD</a>.</p>

  <p>
    <a href="https://palm-remit.vercel.app"><img alt="Live demo" src="https://img.shields.io/badge/demo-live-22c55e?style=flat-square" /></a>
    <a href="https://palm-remit.vercel.app/send"><img alt="Try it" src="https://img.shields.io/badge/try-send%20%245-22c55e?style=flat-square" /></a>
    <img alt="Built on" src="https://img.shields.io/badge/Solana-devnet-9945FF?style=flat-square" />
    <img alt="Stack" src="https://img.shields.io/badge/Next.js-14-000000?style=flat-square" />
    <img alt="License" src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" />
  </p>

  <p><a href="https://palm-remit.vercel.app"><strong>palm-remit.vercel.app →</strong></a></p>
</div>

---

## Try it in 30 seconds

1. Open [**palm-remit.vercel.app**](https://palm-remit.vercel.app)
2. Connect a Phantom wallet on **Devnet**
3. Send $5 PUSD → copy the link → open in incognito → claim with any wallet

> No setup. No CLI. The mock PUSD mint is already live on Solana devnet.
> Reproduce locally? Hit `/api/setup` and `/api/mint` (instructions below).

---

## The problem

200 million migrant workers send **$800 billion** home every year — and lose **$50B+** to fees and frozen accounts. The current options:

| | Fee | Settlement | KYC | Censor-proof |
| --- | --- | --- | --- | --- |
| Western Union | 6–8% | 1–5 days | yes | no |
| Banks (SWIFT) | 5% | 2–3 days | yes | no |
| Wise | 1.5% | minutes–hours | yes | no |
| USDC | ~0% | seconds | varies | **no — freezable** |
| **Palm Remit + PUSD** | **~0%** | **4 seconds** | **none for receiver** | **yes** |

Crypto promised to fix this. It hasn't — because the dominant stablecoins are freezable and the UX assumes you're a developer.

---

## Why PUSD changes things

PUSD is the only major USD stablecoin on Solana that ships with:

- ✅ **No freeze function**
- ✅ **No blacklist**
- ✅ **No pause**

Compliance lives at the permissioned mint/redeem layer only. Once PUSD is in circulation, it cannot be stopped.

**PUSD removes censorship at the token layer. Palm Remit removes friction at the user layer.** Together: the first truly open consumer remittance rail.

---

## How it works

```
  Sender (Dubai)                                  Recipient (Manila)
  ──────────────                                  ──────────────────
  1. Connect wallet
  2. Enter amount + memo
  3. Sign one tx that:
        • Generates ephemeral escrow keypair
        • Funds escrow with rent + fee buffer (~0.003 SOL)
        • Transfers PUSD into escrow's ATA
  4. Get a claim link
        │
        │ (WhatsApp / SMS / in-person QR)
        ▼
  ──────────────────────────────────────►        5. Open the link
                                                   6. Connect any Solana wallet
                                                   7. Tap "Claim" — escrow co-signs:
                                                       • PUSD → recipient ATA
                                                       • Escrow ATA closed (rent → recipient)
                                                       • Sweep leftover SOL → recipient
                                                   8. Done. ~4 seconds. Zero gas paid.
```

**The recipient never holds SOL.** The sender pre-funds the escrow with exactly enough lamports for ATA rent + tx fees, so claiming is gasless from the recipient's perspective.

---

## What makes this submission different

> Most submissions are forks of generic dApp templates. This one is purpose-built for PUSD's exact ethos.

- **No custom Anchor program.** The escrow is a vanilla SPL associated token account owned by a fresh ephemeral keypair per send. The "claim secret" is just `base58(secretKey)`. No PDA, no upgrade authority, no kill switch — the only architecture aligned with PUSD's "no central authority" design.
- **Gasless for the recipient.** They don't need SOL, an exchange account, or any prior crypto experience. Open link → connect wallet → done.
- **Reproducible by judges in one click.** Hit `/api/setup` then `/api/mint` to spin up your own mock PUSD on devnet — no Solana CLI, no local toolchain.
- **Designed for a real corridor.** Hero rotates through the actual UAE → South Asia migrant-worker remittance corridors (Manila, Karachi, Dhaka, Kerala, Kathmandu, Colombo). This isn't a generic crypto demo — it's a remittance product targeting a $200B+ ARR market.
- **Privacy-preserving memos.** Memos are encoded in the URL hash (`#m=...`), client-side only — they never reach our server logs or analytics.
- **On-chain proof, surfaced.** The landing page links the live mock PUSD mint on Solana Explorer. Judges can verify it's real, not vaporware.

---

## Tech

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) + TypeScript | Edge OG images, server actions, fast routing |
| UI | Tailwind CSS + Framer Motion + Lucide icons | Apple-grade polish without a design system bloat |
| Solana | `@solana/web3.js` + `@solana/spl-token` | Direct SPL — no Anchor program needed |
| Wallet | `@solana/wallet-adapter-react` (Phantom, Solflare) | Custom button for reliable connected-state UI |
| Hosting | Vercel | Edge runtime for OG image, Node runtime for setup APIs |

### Why no Anchor program

We deliberately rejected the "deploy a program" path. For this use case it adds:

1. ❌ Complexity (PDA accounting, IDL maintenance)
2. ❌ Risk (upgrade authority, program owner could censor)
3. ❌ User friction (custom IDL means custom wallets / explorers don't decode it)

The ephemeral-keypair pattern is **stateless, composable, and aligned with PUSD's no-kill-switch ethos**.

---

## Reproduce locally

```bash
git clone https://github.com/thesithunyein/palm-remit
cd palm-remit
npm install
cp .env.example .env.local

# Option A — use the deployed setup endpoints (no Solana CLI needed):
#   GET https://palm-remit.vercel.app/api/setup    # generate keypair
#   fund the publicKey via https://faucet.solana.com (devnet, 2 SOL)
#   GET https://palm-remit.vercel.app/api/mint?secret=<base58>
#   copy the returned mint into NEXT_PUBLIC_PUSD_MINT

# Option B — local script (requires Solana CLI keypair OR auto-generates one):
npm run setup-devnet

npm run dev
```

Visit `http://localhost:3000` with Phantom set to **Devnet**.

### Required env vars

```env
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_CLUSTER=devnet
NEXT_PUBLIC_PUSD_MINT=<from setup script>
NEXT_PUBLIC_PUSD_DECIMALS=6
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Project structure

```
src/
├── app/
│   ├── page.tsx                       # Landing (hero, comparison, architecture)
│   ├── send/page.tsx                  # Compose → sending → success
│   ├── claim/[secret]/page.tsx        # Loading → ready → claimed
│   ├── claim/[secret]/opengraph-image.tsx   # Per-link social preview
│   ├── opengraph-image.tsx            # Default OG image
│   ├── api/setup/route.ts             # Step 1: generate funded keypair
│   ├── api/mint/route.ts              # Step 2: mint mock PUSD
│   └── layout.tsx
├── components/
│   ├── navbar.tsx
│   ├── wallet-button.tsx              # Custom button — reliable connected state
│   └── wallet-provider.tsx
└── lib/
    ├── constants.ts                   # Env wiring
    ├── escrow.ts                      # Send/claim tx builders
    ├── pusd.ts                        # Balance + amount helpers
    └── utils.ts
```

---

## Roadmap

| Phase | Milestone |
|---|---|
| **Now** (hackathon) | Devnet MVP · claim links · QR · WhatsApp share · gasless claims |
| **Q3 2026** | Mainnet with official PUSD mint · Twilio SMS delivery · sender memos |
| **Q4 2026** | UAE → INR / PKR / PHP / BDT off-ramp partnerships |
| **Q1 2027** | Mobile app (React Native) · recurring sends · group send |
| **Q2 2027** | Merchant API for B2B cross-border invoicing |

---

## The ask

PUSD's biggest unlock isn't DeFi — it's **real people sending real money home**.

Palm Remit is the simplest possible UX for that. Capturing even **0.5% of the UAE → Asia corridor** is a **$200M+ ARR** business. We'd love to:

1. **Pilot** with a Palm USD-affiliated regulated UAE off-ramp.
2. **Co-market** into the migrant-worker community in the GCC.
3. **Become** the default consumer UX layer for PUSD.

---

## Built for

**Palm USD × Superteam UAE — Frontier Hackathon Track.**

Honest builder feedback (with concrete asks for the Palm USD team) is in [`FRICTION_LOG.md`](./FRICTION_LOG.md).

---

## License

MIT
