# Demo Video Script — 90-Second Cut (PRIMARY)

> **Use this version for the Loom submission.** Judges review 30+ projects;
> 90 seconds beats 3:30 every time. The longer cut in `DEMO_SCRIPT.md` is
> kept as a fallback for an extended pitch session.

**Length target:** 90 seconds (under 1:30 — Loom display caps your viewer in 90s peak attention)
**Resolution:** 1080p, browser at 110% zoom
**Tools:** Loom (free) + 2 Phantom wallets (one for sender, one for recipient — both on devnet)

---

## Pre-record (5 min)

- [ ] Both Phantom profiles on **Devnet**
- [ ] Sender wallet has the seeded 10,000 PUSD (from `/api/setup` flow)
- [ ] Open **two browser windows side-by-side**: left = sender (`/send`), right = recipient (incognito, blank)
- [ ] Phone in airplane mode, second monitor off, mic test
- [ ] Tab title bar reads `Palm Remit` (no `localhost:3000` artifacts — use the live Vercel URL)

---

## Script — beat-by-beat

### 0:00 – 0:08 — The hook (8 sec)

> **[Show landing page. Hero in full. Don't speak for the first second.]**
>
> "200 million migrant workers send 800 billion dollars home every year — and lose 50 billion to fees and frozen accounts.
>
> This is **Palm Remit**."

**On-screen:** Hero text "Send money like sending a link."

---

### 0:08 – 0:18 — Why PUSD, in one line (10 sec)

> **[Scroll to Why PUSD section. 1-second pause on the three checkmarks.]**
>
> "PUSD is the only USD stablecoin on Solana with **no freeze, no blacklist, no pause**. Censorship-resistant by design.
>
> Palm Remit is the consumer UX layer that makes it usable."

---

### 0:18 – 0:50 — Live send (32 sec)

> **[Click "Send PUSD". Compose page loads.]**
>
> "I'm in Dubai. Sending 5 dollars to my mother in Manila."

> **[Click Connect → Phantom approves → balance shows.]**

> **[Type 5 in amount field.]**

> **[Click "Create claim link" → Phantom modal → Approve.]**
>
> "One transaction. The app generates an ephemeral keypair, locks 5 PUSD into its associated token account, and pre-funds it with enough SOL so my mother pays zero gas later."

> **[Success screen with QR + claim link.]**
>
> "Done. Four seconds. Total fee: a hundredth of a cent."

> **[Click Copy on the claim link.]**

---

### 0:50 – 1:15 — Live claim (25 sec)

> **[Switch to right window — incognito. Paste link. Hit enter.]**
>
> "Mother receives the link via WhatsApp. She opens it. No account. No KYC. Just the amount, ready to claim."

> **[Connect a different Phantom profile. Click Claim.]**
>
> "She connects any Solana wallet. The escrow co-signs, transfers the PUSD, closes its account, sweeps the leftover SOL to her — all atomic."

> **[Phantom approves → success screen with checkmark.]**
>
> "Five PUSD. In her wallet. Forever. **Non-freezable**."

---

### 1:15 – 1:30 — The kill shot (15 sec)

> **[Click "View on Solana Explorer" — show real tx.]**
>
> "On-chain. Solana devnet. Reproducible — the live deployment is in the description.
>
> PUSD removes censorship at the token layer. Palm Remit removes friction at the user layer.
>
> The first truly open remittance rail."

> **[Cut to logo. Hold 1 second. End.]**

---

## Editing rules

- **No filler words.** "Um", "so", "basically" → cut every single one.
- **No silence over 0.5 sec** (except intentional pauses at 0:00 and 1:30).
- **Hard cut between scenes**, no transition effects.
- **Captions burned in** — Loom auto-captions, leave on. ~30% of judges watch muted.
- **First 3 seconds = no logo intro.** Get to "200 million migrant workers..." inside the first second.

## Loom upload settings

- **Title:** `Palm Remit — Send PUSD like a link (Palm USD × Superteam UAE)`
- **Description:**
  > Live: https://palm-remit.vercel.app
  > Code: https://github.com/thesithunyein/palm-remit
  > Deck: [URL]
- **Sharing:** Anyone with link — no password, no workspace lock
- **Thumbnail:** Custom thumbnail of the hero "Send money like sending a link" frame

## Post-record self-review

Watch your own video twice:
1. **Mute it** — does the screen flow tell the story alone?
2. **Listen with screen off** — does the narration tell the story alone?

If either fails, re-record the failing section. Both must pass.
