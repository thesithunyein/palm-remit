# How to Ship Palm Remit (your final ~14 hours)

Cascade has built the entire codebase, deck outline, demo script, and friction log. Your job is to turn it on, record it, and submit. Follow these steps **in order** — most are auto-runnable.

---

## Step 1 — Push to GitHub (5 min)

```bash
cd C:\Users\sithu\palm-remit
git init
git add .
git commit -m "feat: Palm Remit — Send PUSD like a link (Palm USD x Superteam UAE)"
```

Then on github.com:
1. Create new public repo `palm-remit`
2. Copy the remote URL
3. Run:
```bash
git remote add origin https://github.com/<you>/palm-remit.git
git branch -M main
git push -u origin main
```

---

## Step 2 — Deploy to Vercel (5 min)

1. Go to https://vercel.com/new
2. Import the `palm-remit` repo
3. Framework preset: **Next.js** (auto-detected)
4. **Don't add env vars yet** — deploy first to get the URL
5. After deploy, copy your URL (e.g. `palm-remit.vercel.app`)
6. Add env vars in Vercel project settings:
   ```
   NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
   NEXT_PUBLIC_CLUSTER=devnet
   NEXT_PUBLIC_PUSD_MINT=<we mint this in step 3>
   NEXT_PUBLIC_PUSD_DECIMALS=6
   NEXT_PUBLIC_APP_URL=https://palm-remit.vercel.app
   ```
7. Redeploy (will auto-redeploy on next push, or click "Redeploy" in Vercel)

---

## Step 3 — Mint mock devnet PUSD (10 min)

You need a Solana CLI keypair. If you don't have one:

```bash
# Install Solana CLI if needed: https://docs.solana.com/cli/install-solana-cli-tools
solana-keygen new -o ~/.config/solana/id.json
solana config set --url devnet
solana airdrop 2
```

Then in `palm-remit/`:

```bash
npm install
npm run setup-devnet
```

Output will print a line like:
```
NEXT_PUBLIC_PUSD_MINT=8gT9...fK2nQ
```

Copy that. Paste into:
- `.env.local` (for local dev)
- Vercel project env vars (Settings → Environment Variables)

Trigger a Vercel redeploy.

> **Optional:** Before this step, send a single email to `hello@palmusd.com` asking
> "Is there an official PUSD devnet mint? Building Palm Remit for the hackathon and
> would prefer to use the real mint if available." If they reply with one, use it
> instead of your mock. Either way, document the choice in your friction log.

---

## Step 4 — Smoke-test the live site (10 min)

On your phone/laptop with Phantom set to devnet:
1. Open https://palm-remit.vercel.app
2. Connect wallet (the one you seeded with mock PUSD)
3. Send $5 — verify claim link appears
4. Open the link in incognito, connect a different Phantom profile (or Solflare)
5. Claim — verify PUSD lands

If it works end-to-end, you're ready to record. If anything breaks, ping Cascade with the error and we'll fix.

---

## Step 5 — Record the Loom (45 min)

Open `DEMO_SCRIPT.md`. Follow it line by line. Goals:
- **Under 4 minutes** (cap is 5; under-cap signals discipline)
- **First take usually wins** — don't perfectionism-trap. Re-record once at most.
- **1080p**, browser zoomed to ~110%
- **Title:** "Palm Remit — Send PUSD like a link (Palm USD × Superteam UAE Hackathon)"

Get the public Loom link.

---

## Step 6 — Build the deck (60 min)

Open `PITCH_DECK.md`. 12 slides, all content + speaker notes pre-written.

1. Open Google Slides → "Blank presentation"
2. Set theme to **dark / black**
3. For each slide, paste the content + apply visual notes
4. Use **SF Pro Display** or **Inter** as font
5. Single accent color: `#4ade80` (palm green)
6. Export as PDF
7. Upload to Google Slides public, get share link

---

## Step 7 — Distribute on X (5 min)

Post on Twitter/X:

```
Built Palm Remit for the @palmusd × @SuperteamUAE hackathon 🌴

Send PUSD like sending a link.
4 seconds. ~$0.0001 fee. Non-freezable. No account for the receiver.

The first remittance UX worth shipping on a stablecoin.

🔗 palm-remit.vercel.app
🎥 [Loom link]
🛠 github.com/<you>/palm-remit
```

Tag: `@palmusd` `@SuperteamUAE` `@SuperteamEarn`. Reply to your own tweet with the demo Loom embed.

---

## Step 8 — Submit (15 min)

On Superteam Earn (the bounty page):

| Field | What to paste |
|-------|---------------|
| Project link | `https://palm-remit.vercel.app` |
| GitHub | `https://github.com/<you>/palm-remit` |
| Demo video | [Loom link] |
| Pitch deck | [Google Slides link, set to "Anyone with link can view"] |
| Description | Lift the README "Why Palm Remit" + thesis sections |

Then on Colosseum (Frontier Hackathon submission), do the same.

Email `hello@palmusd.com` (proactive = remembered):

```
Subject: Palm Remit submission — Palm USD × Superteam UAE track

Hi team,

Submitted Palm Remit to the Palm USD track. It's a one-link PUSD remittance
product targeting the UAE→South Asia corridor.

Live: https://palm-remit.vercel.app
Code: https://github.com/<you>/palm-remit
Demo: [Loom]
Deck: [Slides]
Friction log: in repo at FRICTION_LOG.md

Would love feedback and to discuss a pilot partnership.

— Sithu
```

---

## Step 9 — Submit to Frontier main track too (10 min)

You're encouraged to multi-submit. The same GitHub + Loom + deck can go to the main Colosseum hackathon under a payments/consumer category. **Free shot at additional prizes.**

---

## You're done.

Total active work after Cascade's build: **~3 hours** (ship + record + deck + submit). You have **~14 hours**. Sleep, eat, then execute.

Probability honest check, post-shipping:
- **Top 3:** ~50–55% (well-built, well-pitched, narrow story, real working demo, friction log adds polish)
- **1st place:** ~25%

Maximize 1st by:
- Recording the demo with energy (sleep first)
- Posting the X thread early so PUSD team sees it before judging closes
- Including 2–3 real test sends/claims in the demo (not just one) to show robustness
