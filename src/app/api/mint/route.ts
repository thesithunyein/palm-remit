import { NextRequest, NextResponse } from 'next/server';
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from '@solana/spl-token';
import bs58 from 'bs58';

export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const RPC = 'https://api.devnet.solana.com';
const DECIMALS = 6;
const SEED_AMOUNT = 10_000;

/**
 * Step 2 of setup. GET /api/mint?secret=<base58 secretKey>
 *
 * Uses the funded keypair to:
 *   1. Create a fresh PUSD mint on devnet
 *   2. Mint 10,000 PUSD into the keypair's ATA
 *
 * Pre-req: keypair must be funded with at least ~0.1 SOL on devnet.
 */
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (!secret) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Missing ?secret=<base58 secretKey> query param.',
        hint: 'First call /api/setup to generate a keypair.',
      },
      { status: 400 }
    );
  }

  let payer: Keypair;
  try {
    payer = Keypair.fromSecretKey(bs58.decode(secret));
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid secret key (must be base58-encoded).' },
      { status: 400 }
    );
  }

  try {
    const connection = new Connection(RPC, 'confirmed');

    // Sanity check: balance must be enough for mint + ATA + tx fees.
    const balance = await connection.getBalance(payer.publicKey);
    if (balance < 0.05 * LAMPORTS_PER_SOL) {
      return NextResponse.json(
        {
          ok: false,
          error: `Wallet has insufficient SOL (${balance / LAMPORTS_PER_SOL} SOL).`,
          hint: `Fund ${payer.publicKey.toBase58()} via https://faucet.solana.com (devnet, 2 SOL), then retry this URL.`,
        },
        { status: 400 }
      );
    }

    // Create the mock PUSD mint (no freeze authority — true to PUSD design).
    const mint = await createMint(
      connection,
      payer,
      payer.publicKey,
      null,
      DECIMALS
    );

    // ATA + seed supply.
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    );
    const mintSig = await mintTo(
      connection,
      payer,
      mint,
      ata.address,
      payer,
      SEED_AMOUNT * 10 ** DECIMALS
    );

    return NextResponse.json({
      ok: true,
      mint: mint.toBase58(),
      decimals: DECIMALS,
      seedAmount: SEED_AMOUNT,
      sender: {
        publicKey: payer.publicKey.toBase58(),
        secretKeyBase58: secret,
      },
      mintTx: mintSig,
      explorer: `https://explorer.solana.com/tx/${mintSig}?cluster=devnet`,
      next: {
        envVarsToAdd: {
          NEXT_PUBLIC_RPC_URL: 'https://api.devnet.solana.com',
          NEXT_PUBLIC_CLUSTER: 'devnet',
          NEXT_PUBLIC_PUSD_MINT: mint.toBase58(),
          NEXT_PUBLIC_PUSD_DECIMALS: '6',
          NEXT_PUBLIC_APP_URL: 'https://palm-remit.vercel.app',
        },
        thenRedeploy: 'Vercel → Deployments → ⋯ → Redeploy',
        importIntoPhantom:
          'Phantom → Add wallet → Import private key → paste secretKeyBase58',
        switchPhantomToDevnet:
          'Phantom Settings → Developer Settings → Testnet Mode ON, network = Devnet',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'unknown error';
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}
