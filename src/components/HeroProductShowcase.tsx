import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { asset } from "@/lib/utils";

/* Rotating product showcase for the hero.
   Craft notes:
   - Zero scale animation — even 2% upscale caused visible softness on the source rasters.
     Cross-fade only. Images render at (or below) their native size.
   - Stage height tuned to source-image height so browsers don't upscale.
   - Prev / Next arrows for manual navigation; auto-advance every 4s.
   - Big curated pool (22 units); start index randomised per session.
   - Hover pauses; tab-hidden pauses; reduced-motion → static first slide, no timer.
*/

const SLIDES = [
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
  { img: "/img/products/Verderflex-Hose-Pump.jpg", name: "VERDERFLEX", type: "Peristaltic hose pump" },
  { img: "/img/products/Trundean-TH-Type-Roots-Blower.jpg", name: "TRUNDEAN TH", type: "Roots blower" },
  { img: "/img/products/Trundean-THD-Type-Roots-Blower.jpg", name: "TRUNDEAN THD", type: "Roots blower" },
  { img: "/img/products/Tonson-Angle-bung-air-mixer1.png", name: "TONSON", type: "Air motor mixer" },
];

const DURATION_MS = 4000;

export default function HeroProductShowcase() {
  const reducedMotion = useReducedMotion();
  const startIndex = useMemo(
    () => (typeof window === "undefined" ? 0 : Math.floor(Math.random() * SLIDES.length)),
    [],
  );
  const [index, setIndex] = useState(startIndex);
  const [paused, setPaused] = useState(false);

  // Direction is only used to hint the fade — no big slide motion, just a tiny drift.
  const [direction, setDirection] = useState<1 | -1>(1);
  const step = (delta: 1 | -1) => {
    setDirection(delta);
    setIndex((i) => (i + delta + SLIDES.length) % SLIDES.length);
  };
  const jumpTo = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  useEffect(() => {
    if (reducedMotion || paused) return;
    let visible = document.visibilityState === "visible";
    const onVis = () => (visible = document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    const id = window.setInterval(() => {
      if (!visible) return;
      setDirection(1);
      setIndex((i) => (i + 1) % SLIDES.length);
    }, DURATION_MS);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reducedMotion, paused]);

  useEffect(() => {
    for (let s = 1; s <= 2; s++) {
      const next = SLIDES[(index + s) % SLIDES.length];
      const preload = new Image();
      preload.src = asset(next.img);
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
      tabIndex={-1}
    >
      <div className="relative overflow-hidden rounded-2xl border border-line bg-ground p-6 md:p-8">
        {/* Stage — 300px tall so 500x300 source images render 1:1, no upscale. */}
        <div className="relative mx-auto h-[300px] w-full" aria-live="off">
          <AnimatePresence mode="sync" initial={false} custom={direction}>
            <motion.img
              key={slide.img}
              src={asset(slide.img)}
              alt={`${slide.name} — ${slide.type}`}
              custom={direction}
              initial={{ opacity: 0, x: direction * 12 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
              }}
              exit={{
                opacity: 0,
                x: direction * -12,
                transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
              }}
              className="absolute inset-0 mx-auto h-full w-auto max-w-full object-contain"
              draggable={false}
            />
          </AnimatePresence>

        </div>

        {/* Control row — pill with dots + separate circular arrows, styled after refero reference */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous product"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-neutral-600 shadow-card transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2"
          >
            <ChevronLeft size={16} strokeWidth={2.4} />
          </button>

          <div
            className="flex items-center gap-1.5 rounded-full bg-white px-4 py-3 shadow-card"
            role="tablist"
            aria-label="Product showcase"
          >
            {SLIDES.map((s, i) => {
              const active = i === index;
              return (
                <button
                  key={s.img}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Show ${s.name}`}
                  onClick={() => jumpTo(i)}
                  data-active={active}
                  className="group relative h-1.5 w-1.5 overflow-hidden rounded-full bg-neutral-300 transition-all hover:bg-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 data-[active=true]:w-6 data-[active=true]:bg-neutral-300"
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

          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next product"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-neutral-600 shadow-card transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2"
          >
            <ChevronRight size={16} strokeWidth={2.4} />
          </button>
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
