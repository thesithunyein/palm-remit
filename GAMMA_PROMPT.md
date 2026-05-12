# Gamma.app Deck Prompt — Palm Remit (12 slides)

> Open https://gamma.app → New → Generate → "Presentation" → Paste the
> prompt below verbatim. Set: 12 cards, Image style "Photorealistic",
> Tone "Professional", Theme "Dark / minimal".

---

## Paste this entire block into Gamma:

```
Create a 12-slide investor-grade pitch deck for "Palm Remit", a remittance dApp built on the Palm USD (PUSD) stablecoin on Solana. Aesthetic: Apple keynote — pure black background, generous whitespace, big bold sans-serif type, single accent color #4ade80 (palm green). Use SF Pro / Inter font. No clipart. Use one striking image per slide max — prefer real photography of migrant workers, hands holding phones, money transfer counters, late-night labor camps.

Slide 1 — Title
Headline: "Palm Remit"
Subhead: "Send money like sending a link."
Footer: "Palm USD × Superteam UAE Hackathon · 2026"

Slide 2 — The Problem (one line, full bleed)
Quote, italic, large: "I sent $500 home. The agent took $40. The bank held it for 5 days. My mother bought less rice this month."
Attribution: "— every remittance customer, every month"
Image: a migrant worker on a phone, late at night.

Slide 3 — The Market
Three giant numbers, equal weight, on one line:
$800B (Global remittance volume per year)
$40B (Sent from UAE alone)
6–8% (What Western Union charges)

Slide 4 — Why crypto failed (so far)
Title: "Crypto promised to fix this. It hasn't."
Three red ❌ bullets:
- USDC and USDT are freezable. Issuers can seize funds.
- Recipients need an exchange + KYC + bridges.
- The UX is broken. Try explaining seed phrases to your mom.

Slide 5 — Enter PUSD
Title: "PUSD is different."
Three green ✅ bullets:
- No freeze function
- No blacklist
- No pause
Tagline below: "Compliance lives at the permissioned mint/redeem layer only."

Slide 6 — But PUSD has a UX problem
Title: "Non-freezable doesn't matter if no one can use it."
Body: "Sending PUSD today still requires: wallets · public keys · gas · bridges · KYC at every step."
Image: phone screen showing a cryptic 44-character Solana address.

Slide 7 — Palm Remit
Title: "Palm Remit"
Subtitle: "A claim link. Three steps. Done."
Numbered list:
1. Sender signs once
2. Shares a link via WhatsApp
3. Recipient claims from any Solana wallet
Footer: "No accounts. No KYC for receiver. No gas for recipient. ~$0.0001 total fee."

Slide 8 — Live demo
Title: "Watch it work."
Subtitle: "4 seconds end-to-end. Devnet. Real PUSD."
QR code placeholder pointing to https://palm-remit.vercel.app
Loom link placeholder

Slide 9 — Architecture
Title: "Stateless escrow. No custom program."
Diagram: three nodes left-to-right with arrows between:
[Sender Wallet] → [Ephemeral Escrow Keypair] → [Recipient Wallet]
Bullet list:
- Ephemeral keypair generated per-send
- PUSD locked in keypair's ATA
- Claim secret = base58(secretKey)
- Recipient claim atomically: transfer + close ATA + sweep SOL
Tagline: "No Anchor program = no upgrade authority = no kill switch. Aligned with PUSD's 'no central authority' ethos."

Slide 10 — Pricing power
Title: "Why we win the market."
Comparison table:
| Provider | Fee | Settlement |
| Western Union | 7% | 1–5 days |
| Banks | 5% | 2–3 days |
| Wise | 1.5% | minutes-hours |
| Palm Remit | ~0% | 4 seconds |
Tagline: "Even capturing 0.5% of the UAE→Asia corridor = $200M+ ARR."

Slide 11 — Roadmap
Title: "What's next"
Four-stage timeline:
- Now: Devnet MVP, claim links, QR, share-to-WhatsApp
- Q3 2026: Mainnet launch with official PUSD, Twilio SMS delivery
- Q4 2026: UAE → INR / PKR / PHP off-ramp partnerships
- 2027: Mobile app, recurring sends, B2B invoicing API

Slide 12 — The ask
Title: "We're building the consumer UX layer for PUSD."
Subtitle: "What we want from Palm USD:"
Three bullets:
1. Pilot partnership with a regulated UAE on/off-ramp
2. Co-marketing into the UAE migrant worker community
3. PUSD treasury allocation for incentivized first-100K users
Footer: "palm-remit.vercel.app · github.com/thesithunyein/palm-remit"

Style notes:
- Every headline ≤ 8 words
- No paragraph longer than 2 sentences
- Massive type for hero numbers (slides 2, 3)
- Tight tracking, semibold weight
- Black background, white type, palm green (#4ade80) accents only
- No clutter, no icons except checkmark/X
```

---

## After Gamma generates:

1. Review each slide — Gamma sometimes paraphrases. **Reject any slide where it changed your numbers** ($800B, 6-8%, $40B, $200M ARR, 0.5%).
2. Replace any AI stock images with: photos from Unsplash searches like "migrant worker UAE", "money transfer agent", "labor camp dubai", "phone WhatsApp" (free, attribution-friendly).
3. Add your Loom URL to slide 8.
4. Export as PDF + share publicly viewable Gamma link.
5. Use both: PDF for download attachments, Gamma link for the live demo URL.

## Alternative: Pitch.com

If Gamma quality disappoints, paste the same prompt into Pitch.com or Tome.app. Both produce slightly different aesthetics — Pitch is more startup-fundraise-flavored (might fit better for judges from VC/operator backgrounds).

## If you have only 10 minutes

Use https://slidesgpt.com — paste the same prompt. Less polish, more speed.
