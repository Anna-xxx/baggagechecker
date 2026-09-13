export type BagType = 'personal' | 'carryon' | 'checked';

const FACE_FILL: Record<BagType, string> = { carryon: '#cff5ec', personal: '#e7effc', checked: '#fdf1dc' };
const SIDE_FILL: Record<BagType, string> = { carryon: '#b8efe1', personal: '#d5e3fb', checked: '#f8e3bd' };
const FACE_STROKE: Record<BagType, string> = { carryon: '#5eddc4', personal: '#93b4ef', checked: '#e9b969' };
const INK_COLOR: Record<BagType, string> = { carryon: '#0b5f56', personal: '#1b4694', checked: '#7a5406' };
const CAPTION: Record<BagType, string> = { carryon: 'carry-on', personal: 'personal item', checked: 'checked bag' };

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

/**
 * The front and side view of the entered bag, drawn to scale.
 * Shared by Home and the Size Checker so the two pages can't drift into
 * showing the same bag differently — each type keeps its own silhouette
 * (strap and pocket for a personal item, ribs for a carry-on, straps and
 * corner guards for a checked bag) rather than one shape in three colours.
 */
export function BagDiagram({
  type,
  w,
  h,
  d,
  widthLabel,
  heightLabel,
  depthLabel,
  minHeight = 260,
}: {
  type: BagType;
  w: number;
  h: number;
  d: number;
  widthLabel: string;
  heightLabel: string;
  depthLabel: string;
  minHeight?: number;
}) {
  const targetHeight = 90 + ((clamp(h, 10, 100) - 10) / 90) * 130;
  const scale = targetHeight / h;
  const boxW = Math.max(92, Math.round(w * scale));
  const boxH = Math.round(targetHeight);
  const depthW = Math.max(30, Math.round(d * scale));

  const showHandle = type !== 'personal';
  const showStrap = type === 'personal';
  const showWheels = type !== 'personal';
  const showRibs = type === 'carryon';
  const showPocket = type === 'personal';
  const showStraps = type === 'checked';
  const showCorners = type === 'checked';
  const faceRadius = type === 'personal' ? 16 : 10;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 16, flexWrap: 'wrap', minHeight }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative', width: boxW, height: boxH }}>
          {showHandle && (
            <div style={{ position: 'absolute', left: '50%', top: -15, transform: 'translateX(-50%)', width: '34%', height: 18, border: '3px solid #94a3b8', borderBottom: 'none', borderRadius: '9px 9px 0 0' }} />
          )}
          {showStrap && (
            <div style={{ position: 'absolute', left: '50%', top: -16, transform: 'translateX(-50%)', width: '52%', height: 20, border: '3px solid #94a3b8', borderBottom: 'none', borderRadius: '999px 999px 0 0' }} />
          )}
          <div style={{ position: 'absolute', inset: 0, background: FACE_FILL[type], border: `2px solid ${FACE_STROKE[type]}`, borderRadius: faceRadius, overflow: 'hidden' }}>
            {showRibs && (
              <>
                <div style={{ position: 'absolute', left: '24%', top: 0, bottom: 0, width: 2, background: 'rgba(15,28,46,.10)' }} />
                <div style={{ position: 'absolute', right: '24%', top: 0, bottom: 0, width: 2, background: 'rgba(15,28,46,.10)' }} />
              </>
            )}
            {showPocket && <div style={{ position: 'absolute', left: '16%', right: '16%', bottom: '12%', height: '26%', border: '2px solid rgba(15,28,46,.14)', borderRadius: 8 }} />}
            {showStraps && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: '22%', height: 7, background: 'rgba(185,129,7,.35)' }} />
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: '22%', height: 7, background: 'rgba(185,129,7,.35)' }} />
              </>
            )}
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 12, fontWeight: 700, color: INK_COLOR[type], textAlign: 'center', lineHeight: 1.6, whiteSpace: 'nowrap' }}>
              <div>W {widthLabel}</div>
              <div>H {heightLabel}</div>
            </div>
          </div>
          {showWheels && (
            <>
              <div style={{ position: 'absolute', left: '18%', bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />
              <div style={{ position: 'absolute', right: '18%', bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />
            </>
          )}
          {showCorners && (
            <>
              <div style={{ position: 'absolute', left: -1, bottom: -1, width: 16, height: 16, borderLeft: '4px solid #b98107', borderBottom: '4px solid #b98107', borderRadius: '0 0 0 10px' }} />
              <div style={{ position: 'absolute', right: -1, bottom: -1, width: 16, height: 16, borderRight: '4px solid #b98107', borderBottom: '4px solid #b98107', borderRadius: '0 0 10px 0' }} />
            </>
          )}
        </div>
        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{CAPTION[type]}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div style={{ position: 'relative', width: depthW, height: boxH }}>
          {showHandle && <div style={{ position: 'absolute', left: '50%', top: -15, transform: 'translateX(-50%)', width: 4, height: 18, borderRadius: 2, background: '#94a3b8' }} />}
          <div style={{ position: 'absolute', inset: 0, background: SIDE_FILL[type], border: `2px solid ${FACE_STROKE[type]}`, borderRadius: faceRadius }} />
          {showWheels && (
            <>
              <div style={{ position: 'absolute', left: 2, bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />
              <div style={{ position: 'absolute', right: 2, bottom: -8, width: 11, height: 11, borderRadius: '50%', background: '#475569' }} />
            </>
          )}
          <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 12, fontWeight: 700, color: INK_COLOR[type], whiteSpace: 'nowrap' }}>D {depthLabel}</span>
        </div>
        <span style={{ fontSize: 11, color: '#8494a8', fontWeight: 600 }}>depth</span>
      </div>
    </div>
  );
}
