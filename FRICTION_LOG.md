# Friction Log — Palm Remit

Honest notes from building on PUSD during the hackathon.

## What worked well

- **PUSD's "no freeze, no blacklist" design is a genuine product differentiator.** The pitch writes itself once you understand what it unlocks for remittances. We didn't have to invent a story — the token's properties *are* the story.
- **Solana's standard SPL semantics** mean PUSD just works with `@solana/spl-token` out of the box. No custom adapters needed.
- **Token-2022 / classic Token** — both supported by `getAssociatedTokenAddress` with the right program ID. (We assumed classic in this MVP; trivial to extend.)

## What was confusing

- **No public devnet PUSD mint at the time of building.** Multiple comments on the bounty page asked for the mint address (16+ days before our build) and we couldn't find an official answer. We worked around this by minting a mock PUSD on devnet via `scripts/setup-devnet.ts` — fine for a hackathon, but a real builder onboarding would stall here.
- **Token program version ambiguity.** It's not stated whether mainnet PUSD is on `TOKEN_PROGRAM_ID` (classic) or `TOKEN_2022_PROGRAM_ID`. This affects every `getAssociatedTokenAddress` call. Should be in the docs.
- **Compliance posture for builders.** "Permissioned mint/redeem" is a clear concept, but a one-pager covering "what builders should and shouldn't do with PUSD" (e.g., are bearer-instrument flows like ours OK? what about pseudonymous sends?) would speed up legal review and reduce builder hesitation.
- **No discoverable Twitter / TG resource list** for builders. Several comments on the bounty page asked for "official resources" with no posted reply during the build window.

## What we'd love from Palm USD

1. **Devnet mint** — public, documented, pre-seeded faucet for hackers.
2. **Builder docs page** — token program version, decimals, official mint addresses (mainnet + devnet), permitted use-case guidance.
3. **TypeScript helper / SDK** — a thin `@palmusd/sdk` (even just constants + a few helpers) would signal investment in builders.
4. **Mainnet liquidity routes** — the comment thread mentioned no swap liquidity. For consumer products like Palm Remit to launch, recipients need a clear path from PUSD → local currency. A canonical list of integrated on/off-ramps (and their corridors) would be huge.
5. **Compliance one-pager** — short doc covering "what builders should keep in mind" given the permissioned mint/redeem model.

## Time spent

| Phase | Hours |
|-------|-------|
| Spec + scope | 1.0 |
| Architecture (escrow design) | 0.5 |
| Frontend (landing + send + claim) | 5.5 |
| Devnet setup script | 0.5 |
| Polish + animations | 1.5 |
| Pitch deck + demo + README | 2.5 |
| Deploy + recording | 1.5 |
| **Total** | **~13** |

## What we'd build next

If we had another week:

- **Twilio SMS delivery** — drop a phone number, recipient gets a text with the claim link. This is the killer UX for actual migrant-worker remittances.
- **Reverse claim** — recipient generates a "request link", sender pays. Useful for invoicing.
- **Recurring sends** — set-it-and-forget-it monthly remittance via a tiny Anchor program with delegate authority. Would require Palm USD's blessing on the compliance side.
- **Off-ramp partner integration** — pick one corridor (UAE → INR), integrate one regulated partner, prove unit economics on a real $1k transfer.
