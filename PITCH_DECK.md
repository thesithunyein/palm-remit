# Palm Remit — Pitch Deck

> 12 slides. Copy each into Google Slides / Keynote with the visual notes below.
> Theme: Apple keynote — black background, generous whitespace, big type, single accent color (palm green `#4ade80`). Use SF Pro / Inter.

---

## Slide 1 — Title

**Visual:** Black background. Centered logo (palm leaf in green gradient circle). Below it:

> # Palm Remit
> **Send money like sending a link.**
>
> _Palm USD × Superteam UAE Hackathon · 2026_

**Speaker note (10s):** "Palm Remit. Send money like sending a link. Built on PUSD."

---

## Slide 2 — The reality

**Visual:** Single full-bleed photo: a migrant worker on a phone, late at night, in a labor camp.

> ### "I sent $500 home. The agent took $40. The bank held it for 5 days. My mother bought less rice this month."
>
> — every remittance customer, every month

**Note (15s):** "This is who we're building for. 200 million migrant workers send $800B home every year. They lose $50B+ to fees alone."

---

## Slide 3 — The market

**Visual:** Three giant numbers, equal weight, clean grid.

| $800B | $40B | 6–8% |
|---|---|---|
| Global remittance volume | Sent from UAE alone | What WU charges |

**Note (15s):** "The global remittance market is $800 billion. UAE alone sends $40 billion. Western Union charges 6 to 8 percent. We charge effectively zero."

---

## Slide 4 — Why crypto failed (so far)

**Visual:** Three columns with red ❌ and grey muted text.

> ### Crypto promised to fix this. It hasn't.
>
> ❌ **USDC / USDT are freezable.** Issuers seize funds.
> ❌ **Recipients need an exchange + KYC + bridges.**
> ❌ **The UX is broken.** Try explaining seed phrases to your mom.

**Note (20s):** "Crypto promised to disrupt remittances. It didn't, because the dominant stablecoins are freezable, the off-ramp is broken, and the UX assumes you're a developer."

---

## Slide 5 — Enter PUSD

**Visual:** PUSD logo, big, centered. Three checkmarks below.

> ### PUSD is different.
>
> ✅ **No freeze function**
> ✅ **No blacklist**
> ✅ **No pause**
>
> Compliance lives at the **mint/redeem layer only**.

**Note (15s):** "PUSD changes that. No freeze. No blacklist. No pause. Compliance is enforced at the permissioned mint and redeem layer — once PUSD is in circulation, it can't be stopped."

---

## Slide 6 — But PUSD has a UX problem

**Visual:** Phone mockup showing a Solana wallet with cryptic addresses.

> ### Non-freezable doesn't matter if no one can use it.
>
> Sending PUSD today still requires:
> wallets · public keys · gas · bridges · KYC at every step

**Note (15s):** "But here's the catch. PUSD inherits crypto's UX problem. To send PUSD to your mother, she needs a wallet, a public key, devnet SOL for gas, and the technical fluency to bridge to local currency. That's not a remittance product."

---

## Slide 7 — Palm Remit

**Visual:** Live screenshot of the send page. Big "$500" amount input.

> ### Palm Remit
>
> A claim link. Three steps. Done.
>
> 1. Sender signs once
> 2. Shares a link via WhatsApp
> 3. Recipient claims from any Solana wallet
>
> **No accounts. No KYC for receiver. No gas for recipient. ~$0.0001 total fee.**

**Note (20s):** "Palm Remit is the simplest possible UX for sending PUSD. Sender signs once, shares a link, recipient claims from any wallet. No account creation. No KYC for the receiver. No gas. Roughly one hundredth of a cent in fees."

---

## Slide 8 — Live demo

**Visual:** Loom thumbnail / GIF of the actual product flow.

> ### Watch it work.
>
> [Loom link →]
>
> **4 seconds end-to-end. Devnet. Real PUSD.**

**Note (10s):** "Here's the live demo. Four seconds. Devnet. Real PUSD."

---

## Slide 9 — How (architecture)

**Visual:** Clean architecture diagram. Three nodes: Sender Wallet → Ephemeral Escrow Keypair (PUSD ATA) → Recipient Wallet.

> ### Stateless escrow. No custom program.
>
> - Ephemeral keypair generated per-send
> - PUSD locked in keypair's ATA
> - Claim secret = base58(secretKey)
> - Recipient claim atomically: transfer + close ATA + sweep SOL
>
> **No Anchor program = no upgrade authority = no kill switch.**
> Aligned with PUSD's "no central authority" ethos.

**Note (20s):** "Architecturally, we use no custom Anchor program. Each send creates an ephemeral keypair. The PUSD lives in that keypair's associated token account. The claim secret is just the base58-encoded private key. There's no PDA, no program, no upgrade authority — which means there's no kill switch. This is the only architecture aligned with PUSD's censorship-resistant ethos."

---

## Slide 10 — Why we win the market

**Visual:** Bar chart: WU 7%, Banks 5%, Wise 1.5%, **Palm Remit 0.0%**.

> ### Pricing power.
>
> | Provider | Fee | Settlement |
> |---|---|---|
> | Western Union | 7% | 1–5 days |
> | Banks | 5% | 2–3 days |
> | Wise | 1.5% | minutes-hours |
> | **Palm Remit** | **~0%** | **4 seconds** |
>
> Even capturing **0.5%** of the UAE→Asia corridor = **$200M+ ARR**.

**Note (15s):** "Even at near-zero fees, capturing half a percent of just the UAE-to-Asia corridor is a 200 million dollar revenue business. We don't need fees from senders — the model is volume-based partnerships with regulated off-ramps."

---

## Slide 11 — Roadmap

**Visual:** Four-stage timeline.

> ### What's next
>
> **Now** — Devnet MVP, claim links, QR, share-to-WhatsApp
> **Q3 2026** — Mainnet launch with official PUSD, Twilio SMS delivery
> **Q4 2026** — UAE → INR / PKR / PHP off-ramp partnerships
> **2027** — Mobile app, recurring sends, B2B invoicing API

**Note (15s):** "Today, devnet MVP. Q3, mainnet with the real PUSD mint and SMS delivery via Twilio. Q4, off-ramp partnerships in the UAE-to-South Asia corridor. 2027, mobile app and B2B invoicing API."

---

## Slide 12 — The ask

**Visual:** Big bold text. Single call to action.

> ### We're building the consumer UX layer for PUSD.
>
> What we want from Palm USD:
>
> 1. Pilot partnership with a regulated UAE on/off-ramp
> 2. Co-marketing into the UAE migrant worker community
> 3. PUSD treasury allocation for incentivized first-100K users
>
> **palmremit.com** · github.com/sithu/palm-remit · [@palmremit]

**Note (20s):** "We're building the consumer UX layer that finally makes PUSD usable for the people who need it most. We're asking for a pilot partnership with a regulated UAE off-ramp, co-marketing into the migrant worker community, and a treasury allocation to seed the first hundred thousand users. Thank you."

---

## Total speaking time: ~3 minutes 30 seconds

Buffer of ~1:30 for transitions. Fits well under 5-min cap.
