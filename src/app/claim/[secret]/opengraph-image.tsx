import { ImageResponse } from 'next/og';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import bs58 from 'bs58';

export const runtime = 'edge';
export const alt = 'Palm Remit — claim your PUSD';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const RPC = process.env.NEXT_PUBLIC_RPC_URL || 'https://api.devnet.solana.com';
const MINT = process.env.NEXT_PUBLIC_PUSD_MINT;
const DECIMALS = Number(process.env.NEXT_PUBLIC_PUSD_DECIMALS || 6);

async function fetchAmount(secret: string): Promise<string | null> {
  if (!MINT) return null;
  try {
    const escrow = Keypair.fromSecretKey(bs58.decode(secret));
    const conn = new Connection(RPC, 'confirmed');
    const ata = await getAssociatedTokenAddress(
      new PublicKey(MINT),
      escrow.publicKey
    );
    const bal = await conn.getTokenAccountBalance(ata);
    const ui = bal.value.uiAmount ?? 0;
    return ui.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: ui % 1 === 0 ? 0 : 2,
    });
  } catch {
    return null;
  }
}

export default async function Image({
  params,
}: {
  params: { secret: string };
}) {
  const amount = await fetchAmount(params.secret);
  const headline = amount ?? 'PUSD';
  const sub = amount
    ? 'is ready to claim'
    : 'A claim link is waiting for you';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            'radial-gradient(circle at 30% 30%, rgba(74,222,128,0.3), transparent 60%), radial-gradient(circle at 80% 80%, rgba(34,197,94,0.2), transparent 55%), #000',
          padding: '80px',
          justifyContent: 'space-between',
          fontFamily: 'system-ui, sans-serif',
          color: 'white',
        }}
      >
        {/* top brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #4ade80, #16a34a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
            }}
          >
            🌴
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.5 }}>
            Palm Remit
          </div>
        </div>

        {/* center: amount + sub */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 16,
            marginTop: -40,
          }}
        >
          <div
            style={{
              fontSize: 36,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: 1,
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            You've received
          </div>
          <div
            style={{
              fontSize: 200,
              fontWeight: 700,
              letterSpacing: -8,
              lineHeight: 1,
              background: 'linear-gradient(135deg, #ffffff 0%, #86efac 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {headline}
          </div>
          <div style={{ fontSize: 36, color: 'rgba(255,255,255,0.7)' }}>
            {sub}
          </div>
        </div>

        {/* bottom CTA */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '16px 24px',
              borderRadius: 999,
              background: 'rgba(74,222,128,0.15)',
              border: '1px solid rgba(74,222,128,0.4)',
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: '#4ade80',
              }}
            />
            Tap link to claim → palm-remit.vercel.app
          </div>
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.4)' }}>
            Powered by PUSD on Solana
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
