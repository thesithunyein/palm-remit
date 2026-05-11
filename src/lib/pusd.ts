import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token';
import { PUSD_DECIMALS } from './constants';

export async function getPusdBalance(
  connection: Connection,
  owner: PublicKey,
  mint: PublicKey
): Promise<number> {
  try {
    const ata = await getAssociatedTokenAddress(mint, owner);
    const acc = await getAccount(connection, ata);
    return Number(acc.amount) / 10 ** PUSD_DECIMALS;
  } catch {
    return 0;
  }
}

export function toRawAmount(human: number): bigint {
  // Avoid float issues for typical 2-dp amounts.
  const fixed = human.toFixed(PUSD_DECIMALS);
  const [whole, frac = ''] = fixed.split('.');
  const padded = (frac + '0'.repeat(PUSD_DECIMALS)).slice(0, PUSD_DECIMALS);
  return BigInt(whole) * BigInt(10 ** PUSD_DECIMALS) + BigInt(padded);
}
