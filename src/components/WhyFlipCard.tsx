import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { Check, Plus, type LucideIcon } from "lucide-react";

/* Flip card for the "Why PDM" grid, after the six value blocks on putradekamandiri.com.
   What made the original feel cheap, and the fix for each:
   - Cards flipped the instant the cursor grazed them, so sweeping across the grid set off
     a wave of flips. Here a card waits for ~110ms of hover intent before it turns.
   - The rotating element was its own hover target, so its shrinking silhouette mid-turn
     dropped the cursor and the card jittered. Here the hover target is a static frame
     that never transforms.
   - The turn was a linear swap. Here one rotation value drives everything: a slow
     ease-in-out turn, a slight lift away from the page at the edge-on point, and real
     shading as each face turns away from the viewer.
   Touch: tap toggles. Keyboard: the round button on each face toggles and hands focus to
   the face that arrives; the hidden face is `inert`. Reduced motion: a plain cross-fade. */

export type WhyItem = {
  icon: LucideIcon;
  title: string;
  tagline: string;
  body: string;
  details: string[];
};

const TURN = { duration: 0.95, ease: [0.65, 0, 0.25, 1] as const };
const INTENT_MS = 110;
const RELEASE_MS = 70;

const TONES = {
  dark: {
    face: "bg-ink text-white",
    sub: "text-white/65",
    body: "text-white/80",
    rule: "border-white/15",
    iconWrap: "bg-brand-yellow text-black",
    check: "text-brand-yellow",
    ghost: "text-white/[0.05]",
    btn: "border-white/25 text-white hover:bg-white hover:text-black",
    glow: "bg-[radial-gradient(120%_80%_at_100%_0%,rgba(255,221,0,0.10),transparent_55%)]",
  },
  yellow: {
    face: "bg-brand-yellow text-black",
    sub: "text-black/65",
    body: "text-black/80",
    rule: "border-black/15",
    iconWrap: "bg-black text-brand-yellow",
    check: "text-black",
    ghost: "text-black/[0.06]",
    btn: "border-black/25 text-black hover:bg-black hover:text-brand-yellow",
    glow: "bg-[radial-gradient(120%_80%_at_100%_0%,rgba(255,255,255,0.35),transparent_55%)]",
  },
} as const;

const faceBase =
  "absolute inset-0 flex flex-col overflow-hidden rounded-2xl p-7 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";

export default function WhyFlipCard({ item, tone }: { item: WhyItem; tone: "dark" | "yellow" }) {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const lastPointer = useRef<string>("mouse");
  const frontBtn = useRef<HTMLButtonElement>(null);
  const backBtn = useRef<HTMLButtonElement>(null);

  // One rotation value drives the turn, the lift, and the shading.
  const rot = useMotionValue(0);
  const scale = useTransform(rot, [0, 90, 180], [1, 0.955, 1]);
  const lift = useTransform(
    rot,
    [0, 90, 180],
    [
      "0 1px 2px rgba(16,24,40,0.06), 0 8px 24px rgba(16,24,40,0.08)",
      "0 30px 60px -12px rgba(16,24,40,0.35)",
      "0 1px 2px rgba(16,24,40,0.06), 0 8px 24px rgba(16,24,40,0.08)",
    ],
  );
  const frontShade = useTransform(rot, [0, 90], [0, 0.4]);
  const backShade = useTransform(rot, [90, 180], [0.4, 0]);

  useEffect(() => {
    if (reduce) return;
    const controls = animate(rot, flipped ? 180 : 0, TURN);
    return () => controls.stop();
  }, [flipped, reduce, rot]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const schedule = (next: boolean, ms: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setFlipped(next), ms);
  };

  const viaKeyboard = (next: boolean) => {
    setFlipped(next);
    // the arriving face loses `inert` on the next render; move focus onto it
    requestAnimationFrame(() => (next ? backBtn : frontBtn).current?.focus());
  };

  const front = TONES[tone];
  const back = TONES[tone === "dark" ? "yellow" : "dark"];
  const Icon = item.icon;

  return (
    <div
      className="relative h-[376px] [perspective:1800px]"
      onPointerDown={(e) => (lastPointer.current = e.pointerType)}
      onPointerEnter={(e) => e.pointerType === "mouse" && schedule(true, INTENT_MS)}
      onPointerLeave={(e) => e.pointerType === "mouse" && schedule(false, RELEASE_MS)}
      onClick={(e) => {
        if (lastPointer.current === "mouse") return;
        if ((e.target as HTMLElement).closest("button")) return;
        setFlipped((f) => !f);
      }}
    >
      {/* Shadow lives on a flat layer: on the rotating card it would turn edge-on and vanish */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl"
        style={reduce ? { boxShadow: lift.get() } : { boxShadow: lift, scale }}
      />
      <motion.div
        className="relative h-full w-full rounded-2xl [transform-style:preserve-3d]"
        style={reduce ? undefined : { rotateY: rot, scale }}
      >
        {/* ——— Front ——— */}
        <motion.div
          className={`${faceBase} ${front.face}`}
          inert={flipped}
          animate={reduce ? { opacity: flipped ? 0 : 1 } : undefined}
          transition={{ duration: 0.3 }}
        >
          <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${front.glow}`} />
          <Icon
            aria-hidden="true"
            strokeWidth={1.2}
            className={`pointer-events-none absolute -bottom-8 -right-8 h-56 w-56 ${front.ghost}`}
          />
          <div className={`relative flex h-11 w-11 items-center justify-center rounded-xl ${front.iconWrap}`}>
            <Icon size={21} strokeWidth={2} aria-hidden="true" />
          </div>
          <div className="relative mt-auto">
            <h3 className="font-display text-[1.65rem] font-bold leading-[1.1] tracking-tight">{item.title}</h3>
            <p className={`mt-2.5 max-w-[32ch] text-[15px] leading-snug ${front.sub}`}>{item.tagline}</p>
          </div>
          <div className="relative mt-6 flex items-center justify-between">
            <span className={`text-[11px] font-bold uppercase tracking-[0.16em] ${front.sub}`}>Details</span>
            <button
              ref={frontBtn}
              type="button"
              onClick={() => viaKeyboard(true)}
              aria-expanded={flipped}
              aria-label={`Show details: ${item.title}`}
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${front.btn}`}
            >
              <Plus size={16} strokeWidth={2.2} />
            </button>
          </div>
          {!reduce && (
            <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: frontShade }} />
          )}
        </motion.div>

        {/* ——— Back ——— */}
        <motion.div
          className={`${faceBase} ${back.face}`}
          style={reduce ? undefined : { transform: "rotateY(180deg)" }}
          inert={!flipped}
          initial={false}
          animate={reduce ? { opacity: flipped ? 1 : 0 } : undefined}
          transition={{ duration: 0.3 }}
        >
          <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${back.glow}`} />
          <div className="relative flex items-start justify-between gap-4">
            <h3 className="pt-1.5 font-display text-lg font-bold leading-tight tracking-tight">{item.title}</h3>
            <button
              ref={backBtn}
              type="button"
              onClick={() => viaKeyboard(false)}
              aria-label={`Hide details: ${item.title}`}
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${back.btn}`}
            >
              <Plus size={16} strokeWidth={2.2} className="rotate-45" />
            </button>
          </div>
          <p className={`relative mt-3 text-[13.5px] leading-relaxed ${back.body}`}>{item.body}</p>
          <ul className={`relative mt-auto space-y-2.5 border-t pt-4 ${back.rule}`}>
            {item.details.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-[13px] font-semibold leading-snug">
                <Check size={15} strokeWidth={2.6} className={`mt-px shrink-0 ${back.check}`} aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
          {!reduce && (
            <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: backShade }} />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
