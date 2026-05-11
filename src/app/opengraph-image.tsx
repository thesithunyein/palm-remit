import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Palm Remit — Send PUSD like sending a link';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            'radial-gradient(circle at 20% 30%, rgba(74,222,128,0.25), transparent 55%), radial-gradient(circle at 85% 75%, rgba(34,197,94,0.18), transparent 50%), #000',
          padding: '80px',
          justifyContent: 'space-between',
          fontFamily: 'system-ui, sans-serif',
          color: 'white',
        }}
      >
        {/* top: brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #4ade80, #16a34a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
            }}
          >
            🌴
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: -0.5 }}>
            Palm Remit
          </div>
        </div>

        {/* middle: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Send money like</span>
            <span
              style={{
                background:
                  'linear-gradient(135deg, #86efac 0%, #22c55e 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              sending a link.
            </span>
          </div>
          <div
            style={{
              fontSize: 30,
              color: 'rgba(255,255,255,0.6)',
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Non-freezable money rails. Send PUSD with a link, claim in seconds.
          </div>
        </div>

        {/* bottom: stats + tag */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ display: 'flex', gap: 56 }}>
            <Stat value="4s" label="settlement" />
            <Stat value="~$0" label="recipient gas" />
            <Stat value="0%" label="fees" />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 22,
              color: 'rgba(255,255,255,0.5)',
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
            Built on Solana · Palm USD × Superteam UAE
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1 }}>
        {value}
      </div>
      <div
        style={{
          fontSize: 20,
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}
      >
        {label}
      </div>
    </div>
  );
}
