import { useEffect, useRef } from "react";
import Logo from "../../assets/logo.svg";
// ─────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────
type PhaseName =
  | "settle"
  | "shrink"
  | "disperse"
  | "orbit"
  | "gather"
  | "rebuild";

interface PhaseResult {
  phase: PhaseName;
  t: number;
}

// ─────────────────────────────────────────────────────────────
//  ANIMATION CONSTANTS
// ─────────────────────────────────────────────────────────────
const N: number = 14; // particle count
const R_BASE: number = 84; // ring radius px
const R_BREATH: number = 12; // breathing amplitude px
const P_CORE: number = 5.2; // particle core radius
const P_GLOW: number = 22; // glow halo radius
const LOGO_PX: number = 76; // logo render size

/** Phase durations in ms — total cycle ≈ 5 100 ms */
const DUR: Record<PhaseName, number> = {
  settle: 700,
  shrink: 900,
  disperse: 680,
  orbit: 1500,
  gather: 650,
  rebuild: 770,
};
const TOTAL: number = Object.values(DUR).reduce((a, b) => a + b, 0);

// ─────────────────────────────────────────────────────────────
//  EASING & MATH HELPERS
// ─────────────────────────────────────────────────────────────
const eio = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
const eo = (t: number): number => 1 - (1 - t) ** 3;
const lrp = (a: number, b: number, t: number): number => a + (b - a) * t;
const clamp = (v: number, lo = 0, hi = 1): number =>
  Math.min(hi, Math.max(lo, v));

// ─────────────────────────────────────────────────────────────
//  PHASE RESOLVER
// ─────────────────────────────────────────────────────────────
const PHASE_ORDER = Object.keys(DUR) as PhaseName[];

function phaseOf(ms: number): PhaseResult {
  let rem = ms;
  for (const k of PHASE_ORDER) {
    if (rem <= DUR[k]) return { phase: k, t: clamp(rem / DUR[k]) };
    rem -= DUR[k];
  }
  return { phase: "rebuild", t: 1 };
}

/** Pre-computed base angles — particles start at top (−90°) */
const BASE_ANGLES: number[] = Array.from(
  { length: N },
  (_, i) => (i / N) * Math.PI * 2 - Math.PI / 2,
);

// ─────────────────────────────────────────────────────────────
//  LOGO MARK  — dual concentric hexagons + spokes + centre dot
// ─────────────────────────────────────────────────────────────
function ApexMark(): React.ReactElement {
  const outerHex = "M24,3 L42.2,13.5 L42.2,34.5 L24,45 L5.8,34.5 L5.8,13.5 Z";
  const innerHex = "M24,12 L34.4,18 L34.4,30 L24,36 L13.6,30 L13.6,18 Z";
  const midHex = "M24,7.5 L38.3,16 L38.3,32 L24,40.5 L9.7,32 L9.7,16 Z";
  const ink = "#0c1628";

  // [x1, y1, x2, y2] — inner-hex vertex → outer-hex vertex pairs
  const spokes: Array<[number, number, number, number]> = [
    [24, 12, 24, 3],
    [34.4, 18, 42.2, 13.5],
    [34.4, 30, 42.2, 34.5],
    [24, 36, 24, 45],
    [13.6, 30, 5.8, 34.5],
    [13.6, 18, 5.8, 13.5],
  ];

  return (
    <svg
      viewBox="0 0 48 48"
      width={LOGO_PX}
      height={LOGO_PX}
      fill="none"
      className="block"
    >
      {/* Outer hexagon */}
      <path
        d={outerHex}
        stroke={ink}
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      {/* Mid hex — very faint fill for geometric depth */}
      <path d={midHex} fill={ink} fillOpacity="0.045" />
      {/* Inner hexagon */}
      <path
        d={innerHex}
        stroke={ink}
        strokeWidth="1.35"
        fill={ink}
        fillOpacity="0.07"
        strokeLinejoin="round"
      />
      {/* Spokes at 42% of the gap — subtle architectural detail */}
      {spokes.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={lrp(x1, x2, 0.42)}
          y2={lrp(y1, y2, 0.42)}
          stroke={ink}
          strokeWidth="1"
          strokeOpacity="0.25"
          strokeLinecap="round"
        />
      ))}
      {/* Centre anchor dot */}
      <circle cx="24" cy="24" r="3.6" fill={ink} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
//  CANVAS PARTICLE RENDERER
//  Pure canvas ops — called inside RAF, zero React state touched
// ─────────────────────────────────────────────────────────────
function drawParticles(
  ctx: CanvasRenderingContext2D,
  CX: number,
  CY: number,
  pAlpha: number,
  pRad: number,
  pOff: number,
): void {
  if (pAlpha < 0.004) return;

  // Faint orbit-ring guide that breathes with the particles
  ctx.beginPath();
  ctx.arc(CX, CY, pRad, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(26,79,206,${pAlpha * 0.09})`;
  ctx.lineWidth = 1;
  ctx.stroke();

  for (let i = 0; i < N; i++) {
    const angle = BASE_ANGLES[i] + pOff;
    const px = CX + Math.cos(angle) * pRad;
    const py = CY + Math.sin(angle) * pRad;

    // Outer glow halo
    const glow = ctx.createRadialGradient(px, py, 0, px, py, P_GLOW);
    glow.addColorStop(0, `rgba(100,162,255,${pAlpha * 0.44})`);
    glow.addColorStop(0.45, `rgba(26, 79,206,${pAlpha * 0.14})`);
    glow.addColorStop(1, `rgba(26, 79,206,0)`);
    ctx.beginPath();
    ctx.arc(px, py, P_GLOW, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    // Core — subtle inner gradient (bright → royal blue)
    const core = ctx.createRadialGradient(px, py, 0, px, py, P_CORE);
    core.addColorStop(0, `rgba(90, 152, 255,${pAlpha})`);
    core.addColorStop(1, `rgba(20,  68, 196,${pAlpha})`);
    ctx.beginPath();
    ctx.arc(px, py, P_CORE, 0, Math.PI * 2);
    ctx.fillStyle = core;
    ctx.fill();

    // Specular highlight — top-left micro-glint
    ctx.beginPath();
    ctx.arc(px - 1.4, py - 1.7, P_CORE * 0.38, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${pAlpha * 0.78})`;
    ctx.fill();
  }
}

// ─────────────────────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function FintechLoader(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const logoEl = logoRef.current;
    if (!canvas || !logoEl) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CX = canvas.width / 2;
    const CY = canvas.height / 2;

    function frame(ts: number): void {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) % TOTAL;
      const { phase, t } = phaseOf(elapsed);

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // ── Per-phase state ─────────────────────────────────
      let lScale: number = 1;
      let lAlpha: number = 1;
      let pAlpha: number = 0;
      let pRad: number = 0;
      let pOff: number = 0;

      switch (phase) {
        case "settle":
          // Logo rests at full size; particles dormant
          break;

        case "shrink": {
          lScale = lrp(1, 0.04, eio(t));
          lAlpha = lrp(1, 0, Math.pow(t, 0.55)); // fades slightly ahead of scale
          break;
        }

        case "disperse":
          lScale = 0;
          lAlpha = 0;
          pAlpha = eo(t);
          pRad = lrp(2, R_BASE, eo(t));
          pOff = 0;
          break;

        case "orbit":
          lAlpha = 0;
          pAlpha = 1;
          pRad = R_BASE + R_BREATH * Math.sin(t * Math.PI * 2); // single breath
          pOff = t * ((Math.PI * 2) / 3); // 120° total sweep
          break;

        case "gather": {
          const ORBIT_END = (Math.PI * 2) / 3;
          lAlpha = 0;
          pAlpha = lrp(1, 0, Math.pow(t, 0.7));
          pRad = lrp(R_BASE, 1.5, eio(t));
          pOff = ORBIT_END; // hold final orbit angle while collapsing
          break;
        }

        case "rebuild": {
          lScale = lrp(0.04, 1, eo(t));
          lAlpha = lrp(0, 1, eo(t));
          break;
        }
      }

      // ── Draw particles on canvas ─────────────────────────
      drawParticles(ctx!, CX, CY, pAlpha, pRad, pOff);

      // ── Mutate logo DOM directly — no setState in hot path ──
      logoEl.style.transform = `scale(${lScale})`;
      logoEl.style.opacity = String(Math.max(0, lAlpha));

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* ── Fonts + reset ─────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow: hidden; }
        @keyframes sonar {
          0%,100% { opacity: 0.28; transform: scale(1);    }
          50%      { opacity: 0.90; transform: scale(1.38); }
        }
      `}</style>

      {/* ── Background page (blurred by overlay) ─────────── */}

      {/* ── Glassmorphism loader overlay ──────────────────── */}
      <div
        className="fixed inset-0 flex flex-col items-center justify-center z-50 pointer-events-auto"
        style={{
          background: "transparent",
          overflow: "hidden",
        }}
      >
        {/* Radial inner vignette — adds subtle depth to the frosted panel */}
        <div
          className="absolute inset-0 pointer-events-none"
          // style={{
          //   background:
          //     "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 55%, rgba(210,225,248,0.28) 100%)",
          // }}
        />

        {/* ── Animation stage ────────────────────────────── */}
        <div className="relative shrink-0" style={{ width: 280, height: 280 }}>
          {/* Canvas — particles (z below logo) */}
          <canvas
            ref={canvasRef}
            width={280}
            height={280}
            className="absolute inset-0 z-10"
          />

          {/* Logo wrapper — z above particles, mutated directly by RAF */}
          <div
            ref={logoRef}
            className="absolute inset-0 flex items-center justify-center z-20"
            style={{
              willChange: "transform, opacity",
              transformOrigin: "center center",
            }}
          >
            <img src={Logo} alt="Logo" height={LOGO_PX} width={LOGO_PX} />
          </div>
        </div>
      </div>
    </>
  );
}
