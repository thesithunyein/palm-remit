import { PublicKey } from '@solana/web3.js';

export const RPC_URL =
  process.env.NEXT_PUBLIC_RPC_URL || 'https://api.devnet.solana.com';

export const CLUSTER =
  (process.env.NEXT_PUBLIC_CLUSTER as 'devnet' | 'mainnet-beta') || 'devnet';

const PUSD_MINT_RAW = process.env.NEXT_PUBLIC_PUSD_MINT || '';

// Falls back to a placeholder so the app renders even before setup-devnet.
// The send/claim flows will surface a clear error if mint isn't configured.
export const PUSD_MINT = PUSD_MINT_RAW
  ? new PublicKey(PUSD_MINT_RAW)
  : null;

export const PUSD_DECIMALS = Number(
  process.env.NEXT_PUBLIC_PUSD_DECIMALS || '6'
);

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

// Rent + fee buffer airdropped to escrow keypair so the recipient can claim
// without needing any SOL of their own. ~0.003 SOL covers ATA rent + tx fees.
export const ESCROW_FUND_LAMPORTS = 3_000_000;
