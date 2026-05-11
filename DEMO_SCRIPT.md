# Demo Video Script — Palm Remit

**Length:** 3:30 (under Loom's 5-min hard cap; signals discipline to judges)
**Tools:** Loom (free) + 2 Phantom wallet profiles set to devnet
**Resolution:** 1080p, browser zoomed to 110% for legibility

---

## Pre-record checklist

- [ ] Both wallets funded with devnet SOL (`solana airdrop 2`)
- [ ] Sender wallet has 10,000 mock PUSD seeded via `npm run setup-devnet`
- [ ] `.env.local` configured with the printed `NEXT_PUBLIC_PUSD_MINT`
- [ ] App running at `localhost:3000` (or deployed Vercel URL — even better)
- [ ] Browser tabs cleaned up — only `localhost:3000` and one explorer tab
- [ ] Phone in airplane mode, second monitor cleared
- [ ] Sound check: clean mic, no fan noise

---

## Scene-by-scene script

### 0:00 – 0:20 — Hook + thesis

**[Show landing page — hero in full]**

> "200 million migrant workers send 800 billion dollars home every year.
> Western Union takes 6 to 8 percent. Banks freeze accounts.
> Crypto promised to fix this — but USDC is freezable, and your mom doesn't have a Phantom wallet.
>
> This is **Palm Remit**. Send PUSD like you'd send a link."

---

### 0:20 – 0:40 — Why PUSD

**[Scroll to "Why PUSD" section, hover the three cards]**

> "PUSD is the only USD stablecoin on Solana with no freeze function, no blacklist, no pause.
> Compliance lives at the mint and redeem layer — once PUSD is out, it cannot be stopped.
>
> That censorship resistance is the foundation. The UX is what we built on top."

---

### 0:40 – 1:30 — Live send

**[Click "Send PUSD". Compose page loads.]**

> "I'm a sender in Dubai. I want to send 500 dollars to my mother in Manila."

**[Click "Connect Wallet" → Phantom approves → balance shows 10,000 PUSD]**

> "Wallet connected. 10,000 PUSD balance — devnet."

**[Type 500 in amount field. Type "For mom · groceries" in memo.]**

> "500 dollars. Memo for context."

**[Click "Create claim link"]**

> "One transaction. The app generates an ephemeral escrow keypair, locks the PUSD into its associated token account, and pre-funds it with enough SOL so the recipient pays zero gas later."

**[Phantom confirmation modal → approve]**

**[Loading state → success state with QR + link]**

> "Done. 4 seconds. Total fee: a hundredth of a cent.
> Palm Remit gives me a one-time claim link, plus a QR for in-person handoff."

---

### 1:30 – 2:30 — Live claim

**[Click "Copy" — paste link in URL bar in incognito with second wallet]**

> "Now I'm my mother in Manila. She receives the link via WhatsApp."

**[Open link → claim page loads, shows "$500.00 ready to claim"]**

> "She doesn't need an account. She doesn't need to know what an address is. She just connects any Solana wallet she has."

**[Click "Connect Wallet" — second Phantom profile, devnet]**

**[Click "Claim $500.00"]**

> "One tap. The transaction is co-signed by the escrow keypair (which our app holds via the link), atomically transfers all PUSD into her wallet, closes the escrow account so she gets the rent back, and sweeps the leftover SOL to her too."

**[Phantom approves → success state with checkmark]**

> "Done. She now holds 500 PUSD. Forever. Non-freezable. Non-blockable. Hers."

---

### 2:30 – 3:00 — On-chain proof

**[Click "View on Solana Explorer". Show the tx — instructions list, amounts hidden by SPL semantics]**

> "Here's the on-chain proof. Real Solana devnet, real PUSD SPL token, real transfer. Reproducible by any judge with the public Vercel deployment."

---

### 3:00 – 3:30 — Vision + close

**[Cut back to landing page footer / roadmap section]**

> "Today: devnet MVP. Q3: mainnet launch with the official PUSD mint and Twilio SMS delivery.
> Q4: off-ramp partnerships in the UAE-to-South Asia corridor. By 2027, mobile app and B2B invoicing.
>
> Even capturing half a percent of just the UAE-to-Asia corridor is a 200 million dollar business.
>
> PUSD removes censorship at the token layer. Palm Remit removes friction at the user layer. Together: the first truly open remittance rail.
>
> **palm-remit.vercel.app**. Code on GitHub. Built for Palm USD and Superteam UAE."

**[Fade to logo + URL]**

---

## Post-record checklist

- [ ] First 10 seconds grip — re-record if hook feels flat
- [ ] No long silences — trim to keep pace
- [ ] Loom title: "Palm Remit — Send PUSD like a link (Palm USD × Superteam UAE Hackathon)"
- [ ] Loom description: paste 2-line thesis + GitHub URL
- [ ] Generate Loom share link — public, no password
- [ ] Add link to README badge + submission form
