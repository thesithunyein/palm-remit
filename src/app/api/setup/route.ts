import { NextResponse } from 'next/server';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Step 1 of setup. GET /api/setup
 *
 * Generates a fresh keypair and returns it. You then fund it via:
 *   https://faucet.solana.com (paste the publicKey, request 2 SOL devnet)
 *
 * After funding, call /api/mint?secret=<secretKeyBase58> to create the
 * PUSD mint and seed your wallet with 10,000 PUSD.
 */
export async function GET() {
  const kp = Keypair.generate();
  const publicKey = kp.publicKey.toBase58();
  const secretKeyBase58 = bs58.encode(kp.secretKey);
  const origin =
    process.env.NEXT_PUBLIC_APP_URL || 'https://palm-remit.vercel.app';

  return NextResponse.json({
    ok: true,
    step: '1 of 2',
    keypair: {
      publicKey,
      secretKeyBase58,
    },
    next: {
      '1_fundThisAddress': {
        url: 'https://faucet.solana.com',
        amount: '2 SOL',
        network: 'devnet',
        publicKey,
      },
      '2_thenCallThis': `${origin}/api/mint?secret=${secretKeyBase58}`,
      '3_finalStep':
        'After /api/mint succeeds, copy the mint into Vercel env NEXT_PUBLIC_PUSD_MINT, redeploy, import secretKeyBase58 into Phantom (Devnet).',
    },
    warning:
      'KEEP the secretKeyBase58 — it is your dev sender wallet. Anyone with it can spend the funded SOL + PUSD on devnet.',
  });
}
