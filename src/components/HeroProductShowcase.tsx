import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/* Rotating product showcase for the hero.
   Craft notes:
   - Images NEVER start upscaled (that was the source of the blur). Base scale is 1.0.
   - Ken Burns is a tiny slow crawl from 1.0 → 1.02 during display (barely 2%),
     enough to feel alive without visible bilinear softness.
   - Cross-fade + subtle exit drift, GPU-cheap (opacity + transform only).
   - Big curated pool so nothing feels loopy; start index rotates per session.
   - Hover pauses; tab-hidden pauses; reduced motion → static first slide.
*/

const SLIDES = [
  // Busch — 12 families with clean product photography
  { img: "/img/products/Cobra-Industry.png", name: "BUSCH COBRA Industry", type: "Dry screw vacuum pump" },
  { img: "/img/products/Busch-R5.png", name: "BUSCH R5", type: "Oil-lubricated rotary vane" },
  { img: "/img/products/Mink.png", name: "BUSCH Mink", type: "Dry claw vacuum pump" },
  { img: "/img/products/Cobra-Semicon.png", name: "BUSCH COBRA Semicon", type: "Dry screw — semiconductor" },
  { img: "/img/products/Busch-Fossa-Vacuum-Pumps.png", name: "BUSCH Fossa", type: "Scroll vacuum pump" },
  { img: "/img/products/Busch-Zebra-Vacuum-Pumps.png", name: "BUSCH Zebra", type: "Two-stage rotary vane" },
  { img: "/img/products/Busch-Panther-Rotary-Lobe-Blowers.png", name: "BUSCH Panther", type: "Rotary lobe blower" },
  { img: "/img/products/Busch-Dolphin-Vacuum-Pumps.png", name: "BUSCH Dolphin", type: "Liquid ring vacuum pump" },
  { img: "/img/products/Busch-Combi-Vacuum-Pumps.png", name: "BUSCH Combi", type: "Vacuum systems" },
  { img: "/img/products/Busch-Samos-Vacuum-Pumps.png", name: "BUSCH Samos", type: "Side channel blower" },
  { img: "/img/products/Huckepack.png", name: "BUSCH Huckepack", type: "Once-through oil" },
  { img: "/img/products/Panda_Puma.png", name: "BUSCH Panda & Puma", type: "Vacuum boosters" },
  { img: "/img/products/Seco.png", name: "BUSCH Seco", type: "Dry-running rotary vane" },
  { img: "/img/products/Tyr.png", name: "BUSCH Tyr", type: "Rotary lobe blower" },
  // Verderair — process pumps
  { img: "/img/products/Verderair-VA-25-HP.jpg", name: "VERDERAIR VA-25 HP", type: "High-pressure diaphragm pump" },
  { img: "/img/products/Verderair-VA-15-drum-pumps.jpg", name: "VERDERAIR VA-15", type: "Drum pump" },
  // Verderflex — peristaltic
  { img: "/img/products/Verderflex-Hose-Pump.jpg", name: "VERDERFLEX", type: "Peristaltic hose pump" },
  // Trundean — roots blowers
  { img: "/img/products/Trundean-TH-Type-Roots-Blower.jpg", name: "TRUNDEAN TH", type: "Roots blower" },
  { img: "/img/products/Trundean-THD-Type-Roots-Blower.jpg", name: "TRUNDEAN THD", type: "Roots blower" },
  // Vacutronic — oil-less piston
  { img: "/img/products/JP-90_120_140V.png", name: "VACUTRONIC JP", type: "Oil-less piston" },
  { img: "/img/products/DP-40C.png", name: "VACUTRONIC DP", type: "Oil-less piston compressor" },
  // Tonson — air motors
  { img: "/img/products/Tonson-Angle-bung-air-mixer1.png", name: "TONSON", type: "Air motor mixer" },
];

const DURATION_MS = 3500;

export default function HeroProductShowcase() {
  const reducedMotion = useReducedMotion();

  // Session-varying start so different visits (and consecutive views) don't always open on COBRA.
  const startIndex = useMemo(() => {
    if (typeof window === "undefined") return 0;
    return Math.floor(Math.random() * SLIDES.length);
  }, []);
  const [index, setIndex] = useState(startIndex);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reducedMotion || paused) return;
    let visible = document.visibilityState === "visible";
    const onVis = () => (visible = document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    const id = window.setInterval(() => {
      if (!visible) return;
      setIndex((i) => (i + 1) % SLIDES.length);
    }, DURATION_MS);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reducedMotion, paused]);

  // Preload the next couple of slides so the crossfade is never image-loading-in-the-open.
  useEffect(() => {
    for (let step = 1; step <= 2; step++) {
      const next = SLIDES[(index + step) % SLIDES.length];
      const preload = new Image();
      preload.src = next.img;
    }
  }, [index]);

  const slide = SLIDES[index];

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      tabIndex={-1}
    >
      <div className="relative overflow-hidden rounded-2xl border border-line bg-ground p-8 md:p-10">
        {/* Fixed-height stage so cross-fading images don't shift layout */}
        <div className="relative mx-auto h-[300px] w-full md:h-[340px]" aria-live="off">
          <AnimatePresence mode="sync" initial={false}>
            <motion.img
              key={slide.img}
              src={slide.img}
              alt={`${slide.name} — ${slide.type}`}
              // Start at natural size (no upscale, no blur).
              initial={{ opacity: 0, scale: 1 }}
              // During display: very subtle Ken Burns crawl to 1.02 — feels alive, stays crisp.
              animate={
                reducedMotion
                  ? { opacity: 1, scale: 1 }
                  : {
                      opacity: 1,
                      scale: 1.02,
                      transition: {
                        opacity: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                        scale: { duration: DURATION_MS / 1000 + 1.2, ease: [0.22, 1, 0.36, 1] },
                      },
                    }
              }
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 1.03, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }
              }
              className="absolute inset-0 mx-auto h-full w-auto max-w-full object-contain [image-rendering:high-quality]"
              draggable={false}
            />
          </AnimatePresence>
        </div>

        {/* Progress bar — one per slide, current one fills across the interval */}
        <div className="mt-6 flex justify-center gap-1" role="tablist" aria-label="Product showcase">
          {SLIDES.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.img}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Show ${s.name}`}
                onClick={() => setIndex(i)}
                className="group relative h-1 w-4 overflow-hidden rounded-full bg-neutral-200 transition-all hover:bg-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 data-[active=true]:w-8 data-[active=true]:bg-neutral-300"
                data-active={active}
              >
                {active && !reducedMotion && !paused && (
                  <motion.span
                    key={index}
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: DURATION_MS / 1000, ease: "linear" }}
                    className="absolute inset-0 block bg-neutral-800"
                  />
                )}
                {active && (paused || reducedMotion) && <span className="absolute inset-0 bg-neutral-800" />}
              </button>
            );
          })}
        </div>
      </div>

      <figcaption className="mt-3 flex items-center justify-between text-xs text-neutral-500">
        <motion.span
          key={slide.name}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-semibold text-neutral-700"
        >
          {slide.name} — {slide.type}
        </motion.span>
        <span>Genuine unit · full warranty</span>
      </figcaption>
    </motion.figure>
  );
}
