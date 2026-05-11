import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Palm Remit — claim your PUSD';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const headline = 'PUSD';
  const sub = 'is ready to claim';

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
