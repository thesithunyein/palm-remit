import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import {
  createAssociatedTokenAccountInstruction,
  createCloseAccountInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
  getAccount,
} from '@solana/spl-token';
import bs58 from 'bs58';
import { ESCROW_FUND_LAMPORTS, PUSD_DECIMALS } from './constants';

/**
 * Palm Remit escrow protocol (off-chain claim, on-chain custody).
 *
 * SEND:
 *  1. Generate a fresh ephemeral keypair `escrow`.
 *  2. Sender's wallet, in a single tx:
 *     a. Funds escrow's SOL account with rent + fee buffer.
 *     b. Creates escrow's PUSD ATA (sender pays rent).
 *     c. Transfers PUSD from sender ATA -> escrow ATA.
 *  3. Claim link = base58(escrow.secretKey). Sender shares with recipient.
 *
 * CLAIM:
 *  1. Recipient opens link, app reconstructs escrow keypair.
 *  2. Recipient connects wallet.
 *  3. Tx (signed by escrow + recipient):
 *     a. Creates recipient PUSD ATA if needed (recipient or escrow pays).
 *     b. Transfers PUSD from escrow ATA -> recipient ATA.
 *     c. Closes escrow ATA (rent refund -> recipient).
 *     d. Transfers remaining SOL from escrow -> recipient (close-out).
 *
 * Security model: bearer instrument. Anyone with the link can claim. Sender
 * must share the link via a secure channel. Identical to physical cash gift.
 */

export function encodeClaimSecret(escrow: Keypair): string {
  return bs58.encode(escrow.secretKey);
}

export function decodeClaimSecret(secret: string): Keypair {
  const bytes = bs58.decode(secret);
  return Keypair.fromSecretKey(bytes);
}

export interface BuildSendTxArgs {
  connection: Connection;
  sender: PublicKey;
  mint: PublicKey;
  amount: bigint; // raw token units (already scaled by decimals)
}

export interface BuildSendTxResult {
  transaction: Transaction;
  escrow: Keypair;
}

export async function buildSendTx({
  connection,
  sender,
  mint,
  amount,
}: BuildSendTxArgs): Promise<BuildSendTxResult> {
  const escrow = Keypair.generate();

  const senderAta = await getAssociatedTokenAddress(mint, sender);
  const escrowAta = await getAssociatedTokenAddress(mint, escrow.publicKey);

  const ixs: TransactionInstruction[] = [];

  // 1. Fund escrow with SOL for rent + fees so claim can be self-sufficient.
  ixs.push(
    SystemProgram.transfer({
      fromPubkey: sender,
      toPubkey: escrow.publicKey,
      lamports: ESCROW_FUND_LAMPORTS,
    })
  );

  // 2. Create escrow's PUSD ATA, sender pays the rent.
  ixs.push(
    createAssociatedTokenAccountInstruction(
      sender,
      escrowAta,
      escrow.publicKey,
      mint
    )
  );

  // 3. Transfer PUSD from sender -> escrow.
  ixs.push(
    createTransferCheckedInstruction(
      senderAta,
      mint,
      escrowAta,
      sender,
      amount,
      PUSD_DECIMALS
    )
  );

  const { blockhash } = await connection.getLatestBlockhash();
  const tx = new Transaction({ feePayer: sender, recentBlockhash: blockhash });
  tx.add(...ixs);

  return { transaction: tx, escrow };
}

export interface BuildClaimTxArgs {
  connection: Connection;
  escrow: Keypair;
  recipient: PublicKey;
  mint: PublicKey;
}

export interface EscrowSnapshot {
  amount: bigint;
  decimals: number;
  exists: boolean;
}

export async function readEscrow(
  connection: Connection,
  escrow: PublicKey,
  mint: PublicKey
): Promise<EscrowSnapshot> {
  const ata = await getAssociatedTokenAddress(mint, escrow);
  try {
    const acc = await getAccount(connection, ata);
    return {
      amount: acc.amount,
      decimals: PUSD_DECIMALS,
      exists: true,
    };
  } catch {
    return { amount: 0n, decimals: PUSD_DECIMALS, exists: false };
  }
}

export async function buildClaimTx({
  connection,
  escrow,
  recipient,
  mint,
}: BuildClaimTxArgs): Promise<Transaction> {
  const escrowAta = await getAssociatedTokenAddress(mint, escrow.publicKey);
  const recipientAta = await getAssociatedTokenAddress(mint, recipient);

  // Check if recipient already has ATA
  const recipientAtaInfo = await connection.getAccountInfo(recipientAta);

  // Read current escrow balance
  const escrowAcc = await getAccount(connection, escrowAta);
  const amount = escrowAcc.amount;

  const ixs: TransactionInstruction[] = [];

  if (!recipientAtaInfo) {
    // Escrow funds its own ATA creation for recipient using its SOL buffer.
    ixs.push(
      createAssociatedTokenAccountInstruction(
        escrow.publicKey,
        recipientAta,
        recipient,
        mint
      )
    );
  }

  // Transfer all PUSD from escrow ATA to recipient ATA.
  ixs.push(
    createTransferCheckedInstruction(
      escrowAta,
      mint,
      recipientAta,
      escrow.publicKey,
      amount,
      PUSD_DECIMALS
    )
  );

  // Close escrow ATA, send rent SOL to recipient.
  ixs.push(
    createCloseAccountInstruction(escrowAta, recipient, escrow.publicKey)
  );

  // Sweep remaining SOL from escrow keypair to recipient.
  // We use a System transfer with all but a small dust buffer.
  const escrowBal = await connection.getBalance(escrow.publicKey);
  if (escrowBal > 5000) {
    ixs.push(
      SystemProgram.transfer({
        fromPubkey: escrow.publicKey,
        toPubkey: recipient,
        lamports: escrowBal - 5000, // leave dust to keep tx valid
      })
    );
  }

  const { blockhash } = await connection.getLatestBlockhash();
  // Escrow pays its own fee — recipient needs zero SOL. This is the
  // "gasless claim" property that makes Palm Remit usable for people who
  // don't already hold crypto.
  const tx = new Transaction({
    feePayer: escrow.publicKey,
    recentBlockhash: blockhash,
  });
  tx.add(...ixs);
  // Escrow is the only required signer. Sign and return — caller can
  // submit via connection.sendRawTransaction without wallet interaction.
  tx.sign(escrow);
  return tx;
}
