/**
 * One-shot devnet setup for Palm Remit.
 *
 * Mints a mock PUSD SPL token on Solana devnet and seeds your wallet.
 * Use this if the official PUSD devnet mint is not yet available.
 *
 * Usage:
 *   1. Make sure you have a Solana CLI keypair at ~/.config/solana/id.json
 *      (or set SOLANA_KEYPAIR_PATH env var to point to one).
 *   2. Make sure that wallet has devnet SOL (`solana airdrop 2 --url devnet`).
 *   3. Run: `npm run setup-devnet`
 *   4. Copy the printed mint address into NEXT_PUBLIC_PUSD_MINT in .env.local.
 */
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
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const RPC = 'https://api.devnet.solana.com';
const DECIMALS = 6;
const SEED_AMOUNT = 10_000; // 10,000 PUSD into your wallet

function loadKeypair(): Keypair {
  const fromEnv = process.env.SOLANA_KEYPAIR_PATH;
  const candidates = [
    fromEnv,
    path.join(os.homedir(), '.config', 'solana', 'id.json'),
  ].filter(Boolean) as string[];

  for (const p of candidates) {
    if (fs.existsSync(p)) {
      const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
      return Keypair.fromSecretKey(Uint8Array.from(raw));
    }
  }
  throw new Error(
    'No Solana keypair found. Run `solana-keygen new` first or set SOLANA_KEYPAIR_PATH.'
  );
}

async function main() {
  const connection = new Connection(RPC, 'confirmed');
  const payer = loadKeypair();
  console.log('Payer:', payer.publicKey.toBase58());

  const balance = await connection.getBalance(payer.publicKey);
  console.log('Balance:', balance / LAMPORTS_PER_SOL, 'SOL');
  if (balance < 0.5 * LAMPORTS_PER_SOL) {
    console.log('Requesting airdrop…');
    const sig = await connection.requestAirdrop(
      payer.publicKey,
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(sig, 'confirmed');
  }

  console.log('Creating PUSD mint…');
  const mint = await createMint(
    connection,
    payer,
    payer.publicKey, // mint authority
    null, // no freeze authority — true to PUSD's design
    DECIMALS
  );
  console.log('Mint:', mint.toBase58());

  console.log('Creating ATA + minting seed supply…');
  const ata = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey
  );

  const sig = await mintTo(
    connection,
    payer,
    mint,
    ata.address,
    payer,
    SEED_AMOUNT * 10 ** DECIMALS
  );
  console.log('Mint tx:', sig);

  console.log('\n=== Setup complete ===');
  console.log(`NEXT_PUBLIC_PUSD_MINT=${mint.toBase58()}`);
  console.log(`Seeded: ${SEED_AMOUNT} PUSD into ${payer.publicKey.toBase58()}`);
  console.log('Add the line above to .env.local and restart the dev server.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
