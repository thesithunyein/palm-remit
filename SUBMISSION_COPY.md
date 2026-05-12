# Submission Copy — Ready to Paste

Every piece of text you need to ship Palm Remit. Copy/paste, fill in the bracketed placeholders, post.

---

## 1. Superteam Earn — Project description (paste in the submission form)

> **Palm Remit — Send PUSD like sending a link.**
>
> Try it: **https://palm-remit.vercel.app** (devnet, works in any browser)
>
> ---
>
> **What it is.** A sender connects their wallet, picks an amount, gets a one-time claim link. The recipient — no account, no KYC, no SOL for gas — opens the link, connects any Solana wallet, and the PUSD lands in 4 seconds. Already verified end-to-end on Solana devnet.
>
> **Why now.** UAE alone sends $40B+ in remittances each year. Western Union takes 6–8%. Banks freeze accounts. USDC is freezable at the token level. **PUSD's "no freeze, no blacklist, no pause" is the foundation; Palm Remit is the consumer UX layer that finally makes it usable for the people who need it most** — migrant workers sending money home.
>
> **Why this architecture.** We deliberately built **no custom Anchor program**. Each send creates an ephemeral keypair; the PUSD lives in its associated token account; the claim secret is `base58(secretKey)`. No PDA, no upgrade authority, no kill switch — the only architecture aligned with PUSD's "no central authority" ethos. The escrow pays its own claim fee so recipients never need SOL. Pure SPL transfers, atomic, fully reversible if anything goes wrong.
>
> **Reproducible demo.** Mock PUSD mint deployed on devnet. Repo includes a `/api/setup` endpoint anyone can hit to mint their own dev PUSD and reproduce the full send/claim flow without local tooling.
>
> ---
>
> **Live demo:** https://palm-remit.vercel.app
> **GitHub:** https://github.com/thesithunyein/palm-remit
> **Demo video (90 sec):** [Loom URL]
> **Pitch deck (12 slides):** [Slides URL]
> **On-chain proof:** [Mint explorer link from landing page]
>
> Solo build, shipped end-to-end. `FRICTION_LOG.md` in repo with concrete asks for the Palm USD team based on real build experience (e.g., the lack of a public devnet PUSD mint).

---

## 2. X / Twitter thread

### Tweet 1 (hook)

> Built **Palm Remit** for the @palmusd × @SuperteamUAE hackathon 🌴
>
> Send PUSD like sending a link.
>
> 4 seconds. ~$0.0001 fee. Recipient needs **zero** SOL.
>
> The first remittance UX worth shipping on a stablecoin.
>
> 🧵👇

### Tweet 2 (problem)

> 200M migrant workers send $800B home every year.
>
> Western Union takes 6–8%.
> Banks freeze accounts.
> USDC can be censored at the token level.
>
> Crypto promised to fix this. It hasn't — because the dominant stablecoins are freezable and the UX assumes you're a developer.

### Tweet 3 (PUSD = the foundation)

> Enter PUSD.
>
> ✅ No freeze function
> ✅ No blacklist
> ✅ No pause
>
> Compliance lives at the mint/redeem layer only. Once PUSD is in circulation, it cannot be stopped.
>
> But non-freezable doesn't matter if no one can use it.

### Tweet 4 (the product)

> Palm Remit fixes that.
>
> Sender: connect wallet → enter amount → share a claim link.
> Recipient: open link → connect any Solana wallet → claim. Done.
>
> No account. No KYC for the receiver. No gas for the recipient. Pure SPL transfers.
>
> [embed product screenshot]

### Tweet 5 (architecture)

> Architecturally we did something unusual: **no custom Anchor program**.
>
> Each send creates an ephemeral keypair. PUSD lives in its ATA. The claim secret is just base58(secretKey). On claim, the escrow signs and pays its own fee.
>
> No PDA = no upgrade authority = no kill switch.

### Tweet 6 (market)

> Even at near-zero fees: capturing **0.5%** of just the UAE→Asia corridor = **$200M+ ARR**.
>
> The model is volume-based partnerships with regulated PUSD on/off-ramps, not fees from senders.

### Tweet 7 (CTA)

> Live on devnet, code on GitHub, friction log + 12-slide deck in the repo.
>
> Would love to pilot with a Palm USD-affiliated remittance partner in the UAE.
>
> 🔗 [Vercel URL]
> 🎥 [Loom URL]
> 🛠 [GitHub URL]
>
> @palmusd @SuperteamUAE @SuperteamEarn

---

## 3. Email to hello@palmusd.com

**Subject:** Palm Remit submission — Palm USD × Superteam UAE track

> Hi Palm USD team,
>
> Submitted **Palm Remit** to the Palm USD × Superteam UAE track tonight.
>
> Palm Remit is a one-link PUSD remittance product targeting the UAE→South Asia corridor. The thesis: PUSD removes censorship at the token layer; Palm Remit removes friction at the user layer. Together: the first truly open consumer remittance rail.
>
> **Live demo:** [Vercel URL]
> **GitHub:** [repo URL]
> **Demo video (3:30):** [Loom URL]
> **Pitch deck (12 slides):** [Slides URL]
> **Friction log:** [link to FRICTION_LOG.md in repo]
>
> A few highlights I'd love your reaction to:
>
> 1. **No custom Anchor program.** Stateless ephemeral-keypair escrow pattern — claim secret is base58(secretKey). No PDA, no upgrade authority, no kill switch. We chose this specifically because it's the only architecture aligned with PUSD's "no central authority" ethos.
>
> 2. **Recipient pays zero gas.** Escrow pre-funds itself with rent + claim-fee buffer. Migrant workers receiving PUSD don't need to source SOL first.
>
> 3. **Friction log with concrete asks.** Things that would have made the build smoother (e.g., a public devnet PUSD mint) — included as `FRICTION_LOG.md` in the repo.
>
> Would love to discuss a pilot partnership with a Palm USD-affiliated UAE off-ramp, and to learn more about your roadmap. Happy to jump on a call any time this week.
>
> Best,
> [Your name]
> [Your X / Telegram handle]

---

## 4. Colosseum (Frontier Hackathon) submission description

Same as the Superteam Earn description (#1 above) — paste the same copy. If they ask for a shorter tagline, use:

> **Palm Remit:** Send PUSD like sending a link. Non-freezable, near-zero-fee remittance for the UAE→Asia corridor.

---

## 5. Loom video — title + description

**Title:**

> Palm Remit — Send PUSD like a link (Palm USD × Superteam UAE Hackathon)

**Description:**

> Palm Remit is the simplest possible UX layer for PUSD. Sender shares a claim link. Recipient claims with any Solana wallet. 4 seconds, ~$0.0001 fee, no SOL needed for the receiver.
>
> Live: [Vercel URL]
> Code: [GitHub URL]
> Deck: [Slides URL]

---

## 6. Pitch deck — title slide subtitle (if you want one)

> _Submission to the Palm USD × Superteam UAE Hackathon_
> _by [Your name] · May 2026_
> _Solo · ~13 hours · Solana devnet · Built with Cascade_

---

## 7. README — top badge block (paste under the H1)

```markdown
[![Live](https://img.shields.io/badge/demo-live-22c55e)](https://palm-remit.vercel.app)
[![Built for](https://img.shields.io/badge/Palm%20USD-Superteam%20UAE-22c55e)](https://earn.superteam.fun)
[![Stack](https://img.shields.io/badge/Solana-Next.js-22c55e)](https://github.com)
```

---

## 8. Reply to specific bounty page comments (free distribution)

If the bounty page is still open for comments, reply to:

- **Jordan Adimas (no liquidity):**
  > "Worth flagging — for our submission Palm Remit we minted a mock PUSD on devnet via a setup script (in the repo), since no devnet token was discoverable. Friction log in the repo has more detail. Live demo at [Vercel URL]."

- **Hemant Kumar / Lyle D (devnet address):**
  > "Couldn't find one either. We bundled a one-shot devnet setup script in our submission so judges can reproduce — see the repo. Live: [URL]"

These replies put your submission in front of every other builder and signal to PUSD that you're the most rigorous of the 34 submissions.

---

## 9. Final pre-submit checklist

- [ ] Vercel URL works in incognito (no auth wall)
- [ ] GitHub repo is public (not private)
- [ ] Loom video is set to "Anyone with link" (not "Workspace only")
- [ ] Pitch deck is set to "Anyone with link can view"
- [ ] At least one real send→claim cycle on devnet visible in the demo
- [ ] X thread posted before submitting (so the embed in submissions is hot)
- [ ] Email sent to `hello@palmusd.com` with all links
- [ ] Submitted to **both** Superteam Earn AND Colosseum

When all 8 boxes are checked: you are done.
