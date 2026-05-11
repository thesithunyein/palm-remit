import { NextResponse } from 'next/server';
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
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
 * One-shot devnet setup. GET /api/setup
 *
 * Generates a fresh keypair, airdrops devnet SOL, creates a mock PUSD mint,
 * and seeds the keypair with 10,000 PUSD. Returns:
 *   - mint address (paste into NEXT_PUBLIC_PUSD_MINT)
 *   - keypair secret (import into Phantom to use as sender wallet)
 *
 * Devnet-only. Safe to call multiple times — each call mints a brand new
 * token. After first successful run, set NEXT_PUBLIC_DISABLE_SETUP=1 in
 * Vercel env to lock the endpoint.
 */
export async function GET() {
  if (process.env.NEXT_PUBLIC_DISABLE_SETUP === '1') {
    return NextResponse.json(
      { error: 'Setup endpoint is disabled.' },
      { status: 403 }
    );
  }

  try {
    const connection = new Connection(RPC, 'confirmed');
    const payer = Keypair.generate();

    // Airdrop 2 SOL.
    const airSig = await connection.requestAirdrop(
      payer.publicKey,
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(airSig, 'confirmed');

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
        secretKeyBase58: bs58.encode(payer.secretKey),
        secretKeyArray: Array.from(payer.secretKey),
      },
      airdropTx: airSig,
      mintTx: mintSig,
      next: {
        envVarToSet: `NEXT_PUBLIC_PUSD_MINT=${mint.toBase58()}`,
        importIntoPhantom:
          'Phantom → Add wallet → Import private key → paste secretKeyBase58 above',
        thenSwitchPhantomTo: 'Devnet (Settings → Developer Settings → Testnet Mode → Devnet)',
        finally: 'Redeploy this Vercel project so the env var takes effect.',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'unknown error';
    return NextResponse.json(
      {
        ok: false,
        error: message,
        hint:
          message.includes('airdrop') || message.includes('429')
            ? 'Devnet airdrop is rate-limited. Wait 60s and retry, or use https://faucet.solana.com manually with the publicKey above.'
            : undefined,
      },
      { status: 500 }
    );
  }
}
